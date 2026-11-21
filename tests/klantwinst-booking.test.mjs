import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { buildSync } from 'esbuild';
const code=buildSync({entryPoints:['app/klantwinst/booking.ts'],bundle:true,platform:'node',format:'cjs',write:false}).outputFiles[0].text;
const module={exports:{}};vm.runInNewContext(code,{module,exports:module.exports});
const {isBookingConfirmation,klantwinstBookingUrl}=module.exports;
test('booking confirmation requires the exact Calendly origin, event and embedded window',()=>{
 const frame={},event={origin:'https://calendly.com',source:frame,data:{event:'calendly.event_scheduled'}};
 assert.equal(klantwinstBookingUrl,'https://calendly.com/buitenhuisj004/bmc-sessie');
 assert.equal(isBookingConfirmation(event,frame),true);
 for(const change of [{origin:'https://calendly.com.evil.example'},{source:{}},{data:{event:'calendly.date_and_time_selected'}},{data:null}])assert.equal(isBookingConfirmation({...event,...change},frame),false);
 assert.equal(isBookingConfirmation(event,null),false);
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
    for(const state of ['formSuccess','booking','bookingCopy','bookingWidget','formError','fieldError']) {
      assert.ok(new RegExp('\\._'+state+'_[a-zA-Z0-9_]+').test(published),`Missing dynamic style: ${state}`);
    }
    assert.match(published,/:has\([^)]*formSuccess/);
    assert.match(published,/min-width:320px/);
  } finally { await fs.rm(root,{recursive:true,force:true}); }
});
