import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';

function compile(path) {
  return ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
}
const policy = { exports: {} };
vm.runInNewContext(compile('app/analytics-policy.ts'), { exports: policy.exports, URL });
const p = policy.exports;

test('consent fails closed, expires and rejects future or malformed records', () => {
  for (const raw of [null, 'broken', '{}', '{"allowed":"yes","at":100}', JSON.stringify({allowed:true,at:201})]) assert.equal(p.readConsent(raw,200),null);
  assert.equal(p.readConsent(JSON.stringify({allowed:false,at:100}),200),false);
  assert.equal(p.readConsent(JSON.stringify({allowed:true,at:100}),200),true);
  assert.equal(p.readConsent(JSON.stringify({allowed:true,at:100}),100+p.consentLifetime),null);
});
test('only public routes are measured, across all three languages', () => {
  for (const path of ['/','/seo/','/en/seo/','/es/geo/','/seo/technische-seo/']) assert.equal(p.publicPath(path),true,path);
  for (const path of ['/campaign-engine/','/api/scan','/unknown/person@example.com','/en/campaign-engine/']) assert.equal(p.publicPath(path),false,path);
});
test('destinations never disclose form contents or contact details', () => {
  const origin='https://slimmerdangisteren.nl';
  for (const [href,expected] of [
    ['mailto:person@example.com?body=PRIVATE','email'],['tel:+31612345678','phone'],
    ['https://wa.me/31612345678?text=PRIVATE','whatsapp'],['https://calendly.com/user/private?email=PRIVATE','appointment'],
    ['/seo/?email=PRIVATE#PRIVATE','/seo/'],['https://external.example/private?token=PRIVATE','external.example'],
  ]) assert.equal(p.destination(href,origin).target,expected);
  assert.equal(p.safeLabel('Mail person@example.com or +31 6 1234 5678'),'Mail [email] or [phone]');
});

function mount({consent=null,path='/seo/',host='slimmerdangisteren.nl'}={}) {
  const scripts=[], commands=[], listeners={}, effects=[], output={};
  const loc={hostname:host,origin:`https://${host}`,pathname:path,reload(){}};
  const document={title:'SEO marketingbureau',referrer:'https://example.com/?private=secret',cookie:'',head:{appendChild(s){scripts.push(s);}},createElement(){return {};},addEventListener(n,f){listeners[n]=f;},removeEventListener(){}};
  const window={dataLayer:commands,addEventListener(){},removeEventListener(){}};
  vm.runInNewContext(compile('app/analytics.tsx'), {exports:output,require(name){
    if(name==='react') return {useEffect(f){effects.push(f);},useState(value){return [value,()=>{}];}};
    if(name==='next/navigation') return {usePathname(){return path;}};
    if(name==='./analytics-policy') return {...p,measurementId:'G-TEST123'};
    if(name==='react/jsx-runtime') return {jsx(){},jsxs(){}};
    throw Error(name);
  },window,document,location:loc,localStorage:{getItem(){return consent;}},URL,Element:class{},setTimeout(f){f();},clearTimeout(){}});
  output.Analytics(); effects.forEach(f=>f());
  return {scripts,commands,output};
}
test('no Google request or event before consent, after rejection, or on private/local pages',()=>{
  for(const options of [{},{consent:JSON.stringify({allowed:false,at:Date.now()})},{consent:JSON.stringify({allowed:true,at:Date.now()}),path:'/campaign-engine/'},{consent:JSON.stringify({allowed:true,at:Date.now()}),host:'localhost'}]) {
    const r=mount(options); r.output.trackEvent('button_click'); assert.equal(r.scripts.length,0); assert.equal(r.commands.length,0);
  }
});
test('consent loads one tag, one clean pageview, and separates prepared email from a lead',()=>{
  const r=mount({consent:JSON.stringify({allowed:true,at:Date.now()})});
  assert.equal(r.scripts.length,1);
  const commands=r.commands.map(c=>Array.from(c));
  assert.equal(commands.filter(c=>c[0]==='event' && c[1]==='page_view').length,1);
  const config=commands.find(c=>c[0]==='config')[2];
  assert.equal(config.send_page_view,false);
  assert.equal(config.page_referrer,'https://example.com');
  r.output.trackEvent('form_email_prepared',{form_id:'seo-scan'});
  assert.equal(r.commands.filter(c=>c[1]==='generate_lead').length,0);
  assert.equal(r.commands.at(-1)[2].page_location,'https://slimmerdangisteren.nl/seo/');
});
