import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync('app/meta-pixel.ts','utf8');
function mount({host='slimmerdangisteren.nl',path='/klantwinst/',search=''}={}) {
 const scripts=[],exports={},window={};
 vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,window,location:{hostname:host,pathname:path,search},document:{cookie:'',createElement(){return {dataset:{}};},head:{appendChild(s){scripts.push(s);}}}});
 return {scripts,api:exports,commands:()=>window.fbq?.queue||[]};
}
const ref='KW-12345678-1234-4123-8123-123456789abc';
test('Meta never loads or queues leads before consent, on local/private routes or URLs containing contact details',()=>{
 for(const options of [{},{host:'localhost'},{path:'/campaign-engine/'},{search:'?email=private%40example.com'}]) {
  const r=mount(options); if(Object.keys(options).length)r.api.setMetaConsent(true);
  r.api.trackSavedApplication(ref);assert.equal(r.scripts.length,0);assert.equal(r.commands().length,0);
 }
});
test('Meta initializes once with manual events and no advanced matching; saved lead is deduplicated',()=>{
 const r=mount();r.api.setMetaConsent(true);r.api.setMetaConsent(true);
 assert.equal(r.scripts.length,1);
 assert.equal(r.commands().filter(c=>c[2]==='PageView').length,1);
 assert.deepEqual(Array.from(r.commands().find(c=>c[0]==='init')),['init','2626092657841574']);
 assert.deepEqual(Array.from(r.commands().find(c=>c[0]==='set')),['set','autoConfig',false,'2626092657841574']);
 r.api.trackSavedApplication('private@example.com');r.api.trackSavedApplication(ref);r.api.trackSavedApplication(ref);
 const leads=r.commands().filter(c=>c[2]==='Lead');assert.equal(leads.length,1);
 assert.equal(leads[0][4].eventID,ref);assert.equal(leads[0][3].content_name,'Gratis Klantwinst-check');
 assert.equal(JSON.stringify(r.commands()).includes('email'),false);
 r.api.setMetaConsent(false);r.api.trackSavedApplication('KW-22345678-1234-4123-8123-123456789abc');
 assert.equal(r.commands().filter(c=>c[2]==='Lead').length,1);assert.equal(r.commands().at(-1)[1],'revoke');
});
test('an application received before consent is not replayed upon later consent',()=>{
 const r=mount();r.api.trackSavedApplication(ref);r.api.setMetaConsent(true);
 assert.equal(r.commands().filter(c=>c[2]==='Lead').length,0);
});
test('the form reports a Meta lead only after the receiver confirms storage',()=>{
 const form=fs.readFileSync('app/klantwinst/request-form.tsx','utf8');
 assert.ok(form.indexOf('if (!res.ok || !result.ok)')<form.indexOf('trackSavedApplication(result.reference)'));
 assert.equal((form.match(/trackSavedApplication\(result.reference\)/g)||[]).length,1);
 const booking=fs.readFileSync('app/klantwinst/booking-panel.tsx','utf8');assert.doesNotMatch(booking,/trackSavedApplication/);
});
