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
