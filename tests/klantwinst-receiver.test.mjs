import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
const source = buildSync({entryPoints:['server/klantwinst/receiver.cjs'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
const module = {exports:{}};
class TwilioResponse { headers={}; setStatusCode(v){this.status=v} appendHeader(k,v){this.headers[k]=v} setBody(v){this.body=v} getResponse(){return {statusCode:this.status,headers:this.headers,body:this.body}} }
vm.runInNewContext(source,{module,exports:module.exports,require:createRequire(import.meta.url),Buffer,URL,URLSearchParams,AbortSignal,console});
const good = { name:'Test',email:'test@example.com',website:'voorbeeld.nl',offer:'Testdienst',goal:'Meer geschikte aanvragen',submissionId:'31dd433b-8922-4e5b-b60a-234678abc901',startedAt:1000,request:{headers:{origin:'https://slimmerdangisteren.nl','content-type':'application/json'}} };
function setup(options={}) {
  const rows=new Map(); let sends=0; let writes=0;
  const answer=(status,body)=>({status,ok:status>=200&&status<300,json:async()=>body});
  const fake=async(url,request={})=>{
    if(url==='https://comms.twilio.com/v1/Emails'){
      sends++; const payload=JSON.parse(request.body); assert.equal(payload.from.address,'jimmy@slimmerdangisteren.nl');
      assert.ok(rows.has('inzendingen/'+good.submissionId),'persist before sending');
      return answer(options.mailFailure?400:202,{operationId:'op-'+sends});
    }
    const match=url.match(/\/Maps\/([^/]+)\/Items(?:\/(.+))?$/); assert.ok(match,url);
    const key=match[1]+'/'+decodeURIComponent(match[2]||''); const old=rows.get(key);
    if(request.method==='GET')return answer(old?200:404,old||{});
    const data=new URLSearchParams(request.body);
    if(!match[2]){
      if(options.storageFailure)return answer(503,{});
      const full=match[1]+'/'+data.get('Key');if(rows.has(full))return answer(409,{});
      const row={data:JSON.parse(data.get('Data')),revision:'1',ttl:Number(data.get('Ttl'))};rows.set(full,row);writes++;return answer(201,row);
    }
    if(request.headers['If-Match']&&request.headers['If-Match']!==old.revision)return answer(412,{});
    const row={...old,data:JSON.parse(data.get('Data')),revision:String(Number(old.revision)+1)}; rows.set(key,row);writes++;return answer(200,row);
  };
  const handler=module.exports.createHandler({fetch:fake,now:()=>10000,Twilio:{Response:TwilioResponse}});
  const run=(input=good)=>new Promise((resolve,reject)=>handler({ACCOUNT_SID:'fake',AUTH_TOKEN:'fake'},structuredClone(input),(error,result)=>error?reject(error):resolve(result)));
  return {run,rows,fetch:fake,createHandler:options=>module.exports.createHandler({fetch:fake,now:()=>10000,...options}),get sends(){return sends},get writes(){return writes}};
}
test('rejects untrusted origins, malformed headers/input and bot fields before storage or mail',async()=>{
  const x=setup();
  for(const change of [{request:{headers:{origin:'https://evil.example','content-type':'application/json'}}},{request:{headers:{origin:'https://slimmerdangisteren.nl','content-type':['application/json']}}},{email:'wrong'},{companyFax:'spam'},{submissionId:'invalid'}])assert.ok((await x.run({...good,...change})).status>=400);
  assert.equal(x.sends,0);assert.equal(x.writes,0);
});
test('persists first, sends two mails once and handles retries without duplication or PII response',async()=>{
  const x=setup();const first=await x.run(); assert.equal(first.status,200);assert.equal(first.body.ok,true);assert.equal(x.sends,2);
  assert.ok(!JSON.stringify(first.body).includes(good.email));assert.equal(first.headers['Cache-Control'],'no-store');
  assert.equal((await x.run()).status,200);assert.equal(x.sends,2);
  assert.equal((await x.run({...good,goal:'different'})).status,409);assert.equal(x.sends,2);
  const record=x.rows.get('inzendingen/'+good.submissionId);assert.equal(record.ttl,15552000);assert.equal(record.data.notification.status,'accepted');
});
test('storage errors never send mail or report a successful application',async()=>{
  const x=setup({storageFailure:true});assert.equal((await x.run()).status,503);assert.equal(x.sends,0);
});
test('mail rejection preserves the application and records rejection without automatic duplicates',async()=>{
  const x=setup({mailFailure:true});assert.equal((await x.run()).status,200);assert.equal(x.rows.get('inzendingen/'+good.submissionId).data.confirmation.status,'rejected');
  await x.run();assert.equal(x.sends,2);
});
test('email rate limits persist across changed submission IDs',async()=>{
  const x=setup(); await x.run();await x.run({...good,submissionId:'31dd433b-8922-4e5b-b60a-234678abc902'});
  const third=await x.run({...good,submissionId:'31dd433b-8922-4e5b-b60a-234678abc903'});assert.equal(third.status,429);assert.equal(x.sends,4);
});

test('production wrapper passes a native Response with JSON string body and CORS to the callback',async()=>{
  const x=setup(), outer={exports:{}};
  vm.runInNewContext(fs.readFileSync('server/klantwinst/twilio-wrapper.js','utf8'),{fetch:x.fetch,exports:outer.exports,require:()=>({createHandler:x.createHandler}),Runtime:{getAssets:()=>({'/klantwinst-receiver-v3.js':{path:'private'}})},Twilio:{Response:TwilioResponse}});
  const run=(context,event)=>new Promise((resolve,reject)=>outer.exports.handler(context,event,(error,result)=>error?reject(error):resolve(result)));
  const denied=await run({},{});assert.equal(denied.status,403);assert.equal(x.sends,0);
  const result=await run({ACCOUNT_SID:'fake',AUTH_TOKEN:'fake'},structuredClone(good));assert.equal(result.status,200);assert.equal(JSON.parse(result.body).ok,true);assert.equal(result.headers['Access-Control-Allow-Origin'],'https://slimmerdangisteren.nl');assert.equal(x.sends,2);
});

test('deployed legacy mail adapter adds the scheduling link while keeping personal content literal',async()=>{
  const outer={exports:{}}, sent=[];
  const legacy={from:{address:'jimmy@slimmerdangisteren.nl'},to:[{address:'jimmy@slimmerdangisteren.nl',variables:{mail_html:'<p>Hoi Ada &lt;test&gt;,</p><p>Ik bekijk je website, aanbod en doel. <strong>Binnen twee werkdagen ontvang je een persoonlijke reactie van mij</strong> om het analysegesprek te plannen. Ik streef ernaar binnen één werkdag te reageren.</p>',mail_text:'Hoi Ada,\nIk bekijk je website, aanbod en doel. Binnen twee werkdagen ontvang je een persoonlijke reactie van mij om het analysegesprek te plannen. Ik streef ernaar binnen één werkdag te reageren.'}}],content:{subject:'Je gratis Klantwinst-check is aangevraagd'}};
  const base={createHandler:({fetch})=>async(_context,_event,callback)=>{
    await fetch('https://comms.twilio.com/v1/Emails',{body:JSON.stringify(legacy)});
    const response=new TwilioResponse();response.setStatusCode(200);response.setBody({ok:true});callback(null,response);
  }};
  vm.runInNewContext(fs.readFileSync('server/klantwinst/twilio-wrapper.js','utf8'),{exports:outer.exports,fetch:async(_url,options)=>{sent.push(JSON.parse(options.body));return {}},require:()=>base,Runtime:{getAssets:()=>({'/klantwinst-receiver-v3.js':{path:'private'}})},Twilio:{Response:TwilioResponse}});
  await new Promise((resolve,reject)=>outer.exports.handler({},good,(error,result)=>error?reject(error):resolve(result)));
  const vars=sent[0].to[0].variables;
  assert.ok(vars.mail_html.includes('https://calendly.com/buitenhuisj004/bmc-sessie'));
  assert.ok(vars.mail_text.includes('https://calendly.com/buitenhuisj004/bmc-sessie'));
  assert.ok(vars.mail_html.includes('Ada &lt;test&gt;'));
  assert.ok(!vars.mail_html.includes('om het analysegesprek te plannen'));
});
