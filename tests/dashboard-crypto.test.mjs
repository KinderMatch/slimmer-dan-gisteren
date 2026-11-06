import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createKeyring,seal,open} from '../scripts/dashboard-delivery/crypto.mjs';
test('Passwords, customer isolation, tamper detection and passwordless refresh',async()=>{
 const password='test-only-random-password-1';
 const ring=await createKeyring('test-client',password);
 const bundle=await seal('<html>Private customer figures</html>',ring);
 assert.equal(await open(bundle,ring,password),'<html>Private customer figures</html>');
 await assert.rejects(open(bundle,ring,'wrong-password'));
 await assert.rejects(open({...bundle,client:'other-client'},ring,password));
 const changed=Buffer.from(bundle.ciphertext,'base64');changed[0]^=1;
 await assert.rejects(open({...bundle,ciphertext:changed.toString('base64')},ring,password));
 const refreshed=await seal('<html>Updated figures</html>',JSON.parse(JSON.stringify(ring)));
 assert.equal(await open(refreshed,ring,password),'<html>Updated figures</html>');
 assert.notEqual(bundle.iv,refreshed.iv);
 assert.equal(JSON.stringify(bundle).includes('Private customer figures'),false);
 assert.equal(JSON.stringify(ring).includes(password),false);
 assert.equal('d' in ring.publicKey,false);
});
