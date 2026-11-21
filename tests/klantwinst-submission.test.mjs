import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/klantwinst/submission.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: module.exports, URL });
const { validateSubmission, buildKlantwinstEmails, twilioEmailPayload } = module.exports;
const valid = { name: 'Ada de Vries', email: 'ADA@example.com', website: 'voorbeeld.nl', offer: 'Zakelijk advies', goal: 'Meer passende aanvragen.' };

test('incomplete or malformed submissions cannot trigger automatic emails', () => {
  for (const input of [null, [], {}, { ...valid, email: 'bad\nBcc: victim@example.com' }, { ...valid, website: 'javascript:alert(1)' }, { ...valid, goal: 'x'.repeat(1201) }, { ...valid, name: { text: 'Ada' } }, { ...valid, website: 'https://user:password@voorbeeld.nl/' }]) assert.equal(validateSubmission(input).ok, false);
  assert.equal(validateSubmission(valid).value.email, 'ada@example.com');
});

test('notification escapes submitted markup; confirmation never repeats arbitrary lead text', () => {
  const value = validateSubmission({ ...valid, goal: '<img src=x onerror=alert(1)> FREE GIFT' }).value;
  const { notification, confirmation } = buildKlantwinstEmails(value, 'KW-EXAMPLE');
  assert.ok(notification.html.includes('&lt;img'));
  assert.ok(!notification.html.includes('<img src=x'));
  assert.ok(!confirmation.html.includes('FREE GIFT'));
  assert.ok(!confirmation.text.includes('FREE GIFT'));
  assert.equal(notification.to, 'jimmy@slimmerdangisteren.nl');
  assert.equal(notification.replyTo, 'ada@example.com');
  assert.equal(confirmation.replyTo, 'jimmy@slimmerdangisteren.nl');
  assert.match(confirmation.text, /Binnen twee werkdagen/);
  assert.match(confirmation.text, /geen betaalde samenwerking/);
});

test('Twilio payload uses fixed sender and treats submitted content as literal data', () => {
  const { notification } = buildKlantwinstEmails(validateSubmission({ ...valid, goal: '{{ secret }}' }).value, 'KW-EXAMPLE');
  const payload = twilioEmailPayload(notification);
  assert.equal(payload.from.address, 'jimmy@slimmerdangisteren.nl');
  assert.equal(payload.to[0].address, 'jimmy@slimmerdangisteren.nl');
  assert.equal(payload.content.html, "{{ mail_html | default: 'Klantwinst-check' }}");
  assert.equal(payload.content.text, "{{ mail_text | default: 'Klantwinst-check' }}");
  assert.ok(payload.to[0].variables.mail_html.includes('{{ secret }}'));
  assert.ok(!notification.text.includes('Beantwoord deze e-mail om rechtstreeks'));
});
