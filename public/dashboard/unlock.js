const client=document.documentElement.dataset.client;
const form=document.querySelector('form');
const field=document.querySelector('#password');
const status=document.querySelector('#status');
const submit=document.querySelector('#submit');
const login=document.querySelector('#login');
const viewer=document.querySelector('#viewer');
const frame=document.querySelector('iframe');
const enc=new TextEncoder();
const bytes=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
const context=(keyId,purpose)=>enc.encode(`sdg-dashboard-v1:${client}:${keyId}:${purpose}`);
async function read(name){
 const response=await fetch(`./${name}`,{cache:'no-store',credentials:'omit',redirect:'error'});
 if(!response.ok)throw Error('De dashboardbestanden zijn tijdelijk niet beschikbaar. Probeer het later opnieuw.');
 return response.json();
}
document.querySelector('#show').addEventListener('change',event=>{field.type=event.target.checked?'text':'password';});
document.querySelector('#lock').addEventListener('click',()=>{
 frame.src='./frame.html';
 viewer.hidden=true;login.hidden=false;status.textContent='Het dashboard is vergrendeld.';field.focus();
});
form.addEventListener('submit',async event=>{
 event.preventDefault();submit.disabled=true;status.textContent='Wachtwoord controleren…';
 let password=field.value;field.value='';
 try{
  if(!crypto.subtle||!window.DecompressionStream)throw Error('Open dit dashboard in een recente versie van Safari, Chrome, Edge of Firefox.');
  const ring=await read('keyring.json');
  if(ring.version!==1||ring.client!==client||ring.kdf.iterations!==600000)throw Error('De beveiligingsinstellingen van dit dashboard zijn niet geldig.');
  const material=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);password='';
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:bytes(ring.kdf.salt),iterations:ring.kdf.iterations},material,{name:'AES-GCM',length:256},false,['decrypt']);
  let privateBytes;
  try{privateBytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(ring.privateKey.iv),additionalData:context(ring.keyId,'private')},key,bytes(ring.privateKey.ciphertext));}
  catch{throw Error('Het wachtwoord klopt niet. Probeer het opnieuw.');}
  status.textContent='Dashboard openen…';
  const bundle=await read('bundle.json');
  if(bundle.version!==1||bundle.client!==client||bundle.keyId!==ring.keyId||bundle.compression!=='gzip')throw Error('De dashboardgegevens horen niet bij deze toegang.');
  const privateKey=await crypto.subtle.importKey('pkcs8',privateBytes,{name:'RSA-OAEP',hash:'SHA-256'},false,['decrypt']);
  const raw=await crypto.subtle.decrypt({name:'RSA-OAEP',label:context(ring.keyId,'content-key')},privateKey,bytes(bundle.wrappedKey));
  const contentKey=await crypto.subtle.importKey('raw',raw,{name:'AES-GCM'},false,['decrypt']);
  const compressed=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(bundle.iv),additionalData:context(ring.keyId,'content')},contentKey,bytes(bundle.ciphertext));
  const html=await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  await new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(Error('Het dashboardvenster reageert niet. Probeer het opnieuw.')),15000);
   frame.onload=()=>{clearTimeout(timer);frame.onload=null;resolve();};
   frame.src='./frame.html';
  });
  const doc=frame.contentDocument;
  if(!doc)throw Error('Het dashboardvenster is niet beschikbaar.');
  doc.open();doc.write(html);doc.close();
  login.hidden=true;viewer.hidden=false;status.textContent='';
 }catch(error){status.textContent=error instanceof Error?error.message:'Het dashboard kon niet worden geopend.';field.focus();}
 finally{password='';submit.disabled=false;}
});
