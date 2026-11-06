import {readdir,readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(process.argv[2]||'public/dashboard');
assert.deepEqual((await readdir(root)).sort(),['index.html','kozijnrubbers','mkb-advies','unlock.js']);
for(const client of ['mkb-advies','kozijnrubbers']){
 const dir=join(root,client);
 assert.deepEqual((await readdir(dir)).sort(),['bundle.json','frame.html','index.html','keyring.json']);
 const ring=JSON.parse(await readFile(join(dir,'keyring.json'),'utf8'));
 const bundle=JSON.parse(await readFile(join(dir,'bundle.json'),'utf8'));
 assert.equal(ring.client,client);assert.equal(bundle.client,client);assert.equal(ring.keyId,bundle.keyId);
 assert.equal(ring.kdf.iterations,600000);assert.equal(ring.kdf.hash,'SHA-256');assert.equal(bundle.algorithm,'AES-GCM');
 assert.equal(ring.publicKey.kty,'RSA');assert.equal(Buffer.from(ring.publicKey.n,'base64url').length,384);
 for(const secret of ['d','p','q','dp','dq','qi'])assert.equal(secret in ring.publicKey,false);
 assert.equal(Buffer.from(bundle.iv,'base64').length,12);assert.equal(Buffer.from(ring.kdf.salt,'base64').length,16);
 assert.ok(Buffer.from(bundle.ciphertext,'base64').length>1000);
 for(const name of ['index.html','frame.html']){
  const text=await readFile(join(dir,name),'utf8');
  assert.match(text,/noindex,nofollow,noarchive/);
  assert.doesNotMatch(text,/data-app-reviewed-snapshot|Google Ads via Supermetrics/);
 }
}
console.log('Dashboard publication contains encrypted client data only; separate keys and no plaintext sources.');
