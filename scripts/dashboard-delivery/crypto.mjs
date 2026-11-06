import {webcrypto, randomBytes, createHash} from 'node:crypto';
import {gzipSync, gunzipSync} from 'node:zlib';
const {subtle}=webcrypto;
const text=new TextEncoder();
const b64=value=>Buffer.from(value).toString('base64');
const bytes=value=>Buffer.from(value,'base64');
export const context=(client,keyId,purpose)=>text.encode(`sdg-dashboard-v1:${client}:${keyId}:${purpose}`);
async function passwordKey(password,salt,iterations){
 const material=await subtle.importKey('raw',text.encode(password),'PBKDF2',false,['deriveKey']);
 return subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function createKeyring(client,password){
 if(!/^[a-z][a-z0-9-]+$/.test(client)||password.length<20)throw Error('A strong client-specific password is required.');
 const pair=await subtle.generateKey({name:'RSA-OAEP',modulusLength:3072,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['encrypt','decrypt']);
 const publicKey=await subtle.exportKey('jwk',pair.publicKey);
 const keyId=createHash('sha256').update(JSON.stringify(publicKey)).digest('hex').slice(0,24);
 const salt=randomBytes(16),iv=randomBytes(12),iterations=600000;
 const key=await passwordKey(password,salt,iterations);
 const privateBytes=await subtle.exportKey('pkcs8',pair.privateKey);
 const encrypted=await subtle.encrypt({name:'AES-GCM',iv,additionalData:context(client,keyId,'private')},key,privateBytes);
 return {version:1,client,keyId,publicKey,kdf:{name:'PBKDF2',hash:'SHA-256',iterations,salt:b64(salt)},privateKey:{algorithm:'AES-GCM',iv:b64(iv),ciphertext:b64(encrypted)}};
}
export async function seal(html,keyring){
 const {client,keyId}=keyring;
 const publicKey=await subtle.importKey('jwk',keyring.publicKey,{name:'RSA-OAEP',hash:'SHA-256'},false,['encrypt']);
 const key=await subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt']);
 const raw=await subtle.exportKey('raw',key),iv=randomBytes(12);
 const encrypted=await subtle.encrypt({name:'AES-GCM',iv,additionalData:context(client,keyId,'content')},key,gzipSync(Buffer.from(html)));
 const wrapped=await subtle.encrypt({name:'RSA-OAEP',label:context(client,keyId,'content-key')},publicKey,raw);
 return {version:1,client,keyId,compression:'gzip',algorithm:'AES-GCM',iv:b64(iv),wrappedKey:b64(wrapped),ciphertext:b64(encrypted)};
}
export async function open(bundle,keyring,password){
 if(bundle.client!==keyring.client||bundle.keyId!==keyring.keyId)throw Error('Client/key mismatch');
 const key=await passwordKey(password,bytes(keyring.kdf.salt),keyring.kdf.iterations);
 const priv=await subtle.decrypt({name:'AES-GCM',iv:bytes(keyring.privateKey.iv),additionalData:context(keyring.client,keyring.keyId,'private')},key,bytes(keyring.privateKey.ciphertext));
 const privateKey=await subtle.importKey('pkcs8',priv,{name:'RSA-OAEP',hash:'SHA-256'},false,['decrypt']);
 const raw=await subtle.decrypt({name:'RSA-OAEP',label:context(bundle.client,bundle.keyId,'content-key')},privateKey,bytes(bundle.wrappedKey));
 const contentKey=await subtle.importKey('raw',raw,{name:'AES-GCM'},false,['decrypt']);
 const decrypted=await subtle.decrypt({name:'AES-GCM',iv:bytes(bundle.iv),additionalData:context(bundle.client,bundle.keyId,'content')},contentKey,bytes(bundle.ciphertext));
 return gunzipSync(Buffer.from(decrypted)).toString('utf8');
}
