'use strict';
const crypto = require('node:crypto');
const { validateSubmission, buildKlantwinstEmails, twilioEmailPayload } = require('../../app/klantwinst/submission.ts');
const ORIGINS = ['https://slimmerdangisteren.nl', 'https://www.slimmerdangisteren.nl'];
const SERVICE = 'IS80a17338c3814158a4cd9a08ed3d7c95';
const TTL = 180 * 86400;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// No public read/list endpoint. Credentials exist only inside Twilio's runtime.
exports.createHandler = function createHandler({ fetch: fetcher = globalThis.fetch, now = Date.now, Twilio: TwilioApi } = {}) {
  return async function handler(context, event, callback) {
    const headers = event.request?.headers || {};
    const origin = headers.origin;
    const response = (status, body) => {
      const r = new TwilioApi.Response();
      r.setStatusCode(status);
      r.appendHeader('Content-Type', 'application/json; charset=utf-8');
      r.appendHeader('Cache-Control', 'no-store');
      r.appendHeader('Vary', 'Origin');
      if (ORIGINS.includes(origin)) r.appendHeader('Access-Control-Allow-Origin', origin);
      r.setBody(body);
      return callback(null, r);
    };
    if (!ORIGINS.includes(origin)) return response(403, { error: 'origin' });
    if (typeof headers['content-type'] !== 'string' || !headers['content-type'].startsWith('application/json')) return response(415, { error: 'content_type' });
    if (!context.ACCOUNT_SID || !context.AUTH_TOKEN) return response(503, { error: 'unavailable' });
    if (JSON.stringify(event).length > 12000) return response(413, { error: 'too_large' });
    if (event.companyFax) return response(422, { error: 'invalid_request' });
    const check = validateSubmission(event);
    if (!check.ok) return response(422, { fields: check.fields });
    if (!UUID.test(event.submissionId || '') || !Number.isFinite(event.startedAt) || now() - event.startedAt < 1800 || now() - event.startedAt > 86400000) {
      return response(422, { error: 'invalid_request' });
    }

    const signal = AbortSignal.timeout(8200);
    const auth = 'Basic ' + Buffer.from(context.ACCOUNT_SID + ':' + context.AUTH_TOKEN).toString('base64');
    const hash = text => crypto.createHmac('sha256', context.AUTH_TOKEN).update(text).digest('hex');
    const id = event.submissionId.toLowerCase();
    const digest = hash(JSON.stringify(check.value));
    const reference = 'KW-' + id;
    let stored = false;
    const api = async (url, method = 'GET', data, extra = {}) => {
      const res = await fetcher(url, { method, signal, headers: { Authorization: auth, ...(data ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}), ...extra }, ...(data ? { body: new URLSearchParams(data).toString() } : {}) });
      let body; try { body = await res.json(); } catch { body = {}; }
      if (!res.ok) { const e = new Error('provider'); e.status = res.status; throw e; }
      return body;
    };
    const base = map => `https://sync.twilio.com/v1/Services/${SERVICE}/Maps/${map}/Items`;
    const item = (map, key) => base(map) + '/' + encodeURIComponent(key);
    const fetchItem = async (map, key) => {
      try { return await api(item(map, key)); } catch (e) { if (e.status === 404) return null; throw e; }
    };
    // Atomic, expiring counters. Fail closed if the storage service is unavailable.
    const limit = async (key, maximum, ttl) => {
      for (let i = 0; i < 3; i++) {
        let old = await fetchItem('beveiliging', key);
        if (!old) {
          try { await api(base('beveiliging'), 'POST', { Key: key, Data: JSON.stringify({ count: 1 }), Ttl: String(ttl) }); return; }
          catch (e) { if (e.status === 409) continue; throw e; }
        }
        if (old.data.count >= maximum) { const e = new Error('rate'); e.status = 429; throw e; }
        try {
          await api(item('beveiliging', key), 'POST', { Data: JSON.stringify({ count: old.data.count + 1 }) }, { 'If-Match': old.revision }); return;
        } catch (e) { if ([409, 412].includes(e.status)) continue; throw e; }
      }
      const e = new Error('rate'); e.status = 429; throw e;
    };

    try {
      const old = await fetchItem('inzendingen', id);
      if (old) return old.data.digest === digest ? response(200, { ok: true, reference }) : response(409, { error: 'changed_submission' });
      // Twilio does not expose forwarding/IP headers. Use global and hashed-email caps.
      const day = Math.floor(now() / 86400000), hour = Math.floor(now() / 3600000);
      await Promise.all([
        limit('day-' + day, 100, 172800),
        limit('mail-' + hash(check.value.email) + '-' + day, 2, 172800),
        limit('hour-' + hour, 20, 7200),
      ]);
      const record = { ...check.value, digest, receivedAt: new Date(now()).toISOString(), reference, notification: { status: 'pending' }, confirmation: { status: 'pending' } };
      try { await api(base('inzendingen'), 'POST', { Key: id, Data: JSON.stringify(record), Ttl: String(TTL) }); stored = true; }
      catch (e) {
        if (e.status !== 409) throw e;
        const concurrent = await fetchItem('inzendingen', id);
        return concurrent?.data.digest === digest ? response(200, { ok: true, reference }) : response(409, { error: 'changed_submission' });
      }
      // Only the create winner sends messages. Retries never send a second copy.
      const mails = buildKlantwinstEmails(check.value, reference);
      const send = async kind => {
        try {
          const res = await fetcher('https://comms.twilio.com/v1/Emails', { method: 'POST', signal, headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(twilioEmailPayload(mails[kind])) });
          const result = await res.json();
          if (res.status !== 202) return { status: 'rejected', httpStatus: res.status, providerError: JSON.stringify(result).slice(0, 1000) };
          // Accepted is not a delivery claim. Operation IDs can be checked in Twilio.
          return { status: 'accepted', operationId: result.operationId || null };
        } catch { return { status: 'unknown' }; }
      };
      [record.notification, record.confirmation] = await Promise.all([send('notification'), send('confirmation')]);
      await api(item('inzendingen', id), 'POST', { Data: JSON.stringify(record) });
      return response(200, { ok: true, reference });
    } catch (e) {
      // A saved application remains valid even if an email fails. No PII or secrets in logs.
      if (stored) { console.warn('Klantwinst: application stored; email status requires review', reference); return response(200, { ok: true, reference }); }
      return response(e.status === 429 ? 429 : 503, { error: e.status === 429 ? 'rate_limited' : 'unavailable' });
    }
  };
};
exports.handler = exports.createHandler();
