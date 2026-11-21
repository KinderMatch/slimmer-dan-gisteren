import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { buildSync } from 'esbuild';
const code=buildSync({entryPoints:['app/klantwinst/booking.ts'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports,URL});
const {isBookingConfirmation,isCalendlyMessage,klantwinstBookingUrl,klantwinstBookingLink,prepareBookingTab}=module.exports;
test('booking confirmation requires the exact Calendly origin, event and embedded window',()=>{
 const frame={},event={origin:'https://calendly.com',source:frame,data:{event:'calendly.event_scheduled'}};
 assert.equal(klantwinstBookingUrl,'https://calendly.com/buitenhuisj004/bmc-sessie');
 assert.equal(isBookingConfirmation(event,frame),true);
 for(const change of [{origin:'https://calendly.com.evil.example'},{source:{}},{data:{event:'calendly.date_and_time_selected'}},{data:null}])assert.equal(isBookingConfirmation({...event,...change},frame),false);
 assert.equal(isBookingConfirmation(event,null),false);
 assert.equal(isCalendlyMessage({...event,data:{event:'calendly.event_type_viewed'}},frame),true);
 assert.equal(isCalendlyMessage({...event,origin:'https://evil.example',data:{event:'calendly.event_type_viewed'}},frame),false);
});


test('publication keeps the dynamic scheduling layout and form status styles',async()=>{
  const fs=await import('node:fs/promises');
  const {tmpdir}=await import('node:os');
  const {join}=await import('node:path');
  const {execFileSync}=await import('node:child_process');
  const root=await fs.mkdtemp(join(tmpdir(),'kw-published-css-'));
  try {
    const cssRoot='dist/client/_next/static/css';
    const files=(await fs.readdir(cssRoot)).filter(name=>name.endsWith('.css'));
    const css=(await Promise.all(files.map(name=>fs.readFile(join(cssRoot,name),'utf8')))).join('\n');
    await fs.mkdir(join(root,'_next/static/css'),{recursive:true});
    await fs.writeFile(join(root,'_next/static/css/fixture.css'),css);
    await fs.writeFile(join(root,'index.html'),await fs.readFile('dist/server/prerendered-routes/klantwinst/index.html','utf8'));
    execFileSync(process.execPath,['scripts/trim-published-css.mjs',root],{stdio:'pipe'});
    const published=await fs.readFile(join(root,'_next/static/css/fixture.css'),'utf8');
    for(const state of ['formSuccess','booking','bookingCopy','bookingWidget','formError','fieldError','bookingSteps','bookingLoading','bookingNotice','bookingCta']) {
      assert.ok(new RegExp('\\._'+state+'_[a-zA-Z0-9_]+').test(published),`Missing dynamic style: ${state}`);
    }
    assert.match(published,/:has\([^)]*formSuccess/);
    assert.match(published,/min-width:320px/);
  } finally { await fs.rm(root,{recursive:true,force:true}); }
});


test('the application anchor goes straight to the form and presents both steps',async()=>{
 const {readFile}=await import('node:fs/promises');
 const html=await readFile('dist/server/prerendered-routes/klantwinst/index.html','utf8');
 assert.match(html,/<form[^>]*id="klantwinst-check"/);
 assert.doesNotMatch(html,/<section[^>]*id="klantwinst-check"/);
 assert.match(html,/Je aanvraag in twee stappen/);
 assert.match(html,/Moment kiezen/);
});

test('the embedded and fallback booking link both retain encoded contact details',()=>{
 const url=new URL(klantwinstBookingLink("  Jan de Vries & Co  ","jan+check@example.com"));
 assert.match(url.href,/name=Jan%20de%20Vries%20%26%20Co/);
 assert.equal(url.origin,"https://calendly.com");
 assert.equal(url.pathname,"/buitenhuisj004/bmc-sessie");
 assert.equal(url.searchParams.get("name"),"Jan de Vries & Co");
 assert.equal(url.searchParams.get("email"),"jan+check@example.com");
 assert.equal(url.searchParams.get("hide_event_type_details"),"1");
});

test('the new tab stays blank until storage succeeds and closes on failure',()=>{
 let opened=[],navigated=[],closed=0;
 const tab={opener:{},document:{title:"",body:{textContent:""}},closed:false,location:{replace:url=>navigated.push(url)},close(){closed++;this.closed=true}};
 const pending=prepareBookingTab({open:(...args)=>{opened=args;return tab;}});
 assert.deepEqual(opened,["about:blank","_blank"]);
 assert.equal(tab.opener,null);
 assert.equal(navigated.length,0);
 pending.complete("Jimmy Buitenhuis","jimmy@example.com");
 assert.equal(new URL(navigated[0]).searchParams.get("email"),"jimmy@example.com");
 pending.close(); assert.equal(closed,1);
 const blocked=prepareBookingTab({open:()=>null});
 assert.doesNotThrow(()=>blocked.complete("Jimmy","jimmy@example.com"));
 assert.doesNotThrow(()=>blocked.close());
});
