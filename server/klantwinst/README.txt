Klantwinst form receiver

Frontend: existing GitHub Pages site; no mail credentials in client code.
Receiver: https://klantwinst-formulier-8864.twil.io/aanvragen
Twilio Service: ZS5d3e9ca1048bd2e3d29f81626a157125
Environment: ZEfc1193839f2eb2a593180fbc153e5d68
Storage: Sync IS80a17338c3814158a4cd9a08ed3d7c95, ACL enabled.
Maps: inzendingen (applications), beveiliging (temporary counters).

Deployment:
Bundle receiver.cjs with esbuild --bundle --platform=node --format=cjs.
Upload the bundle as a PRIVATE asset. Current path: /klantwinst-receiver-v3.js.
Use twilio-wrapper.js as the public /aanvragen Function (Node 22).
Pass Twilio explicitly into createHandler. Pass the native Response to callback with a JSON string body. Returning getResponse() produces a JSON envelope without real HTTP CORS/status headers. The wrapper supplies required Liquid default filters and updates the v3 confirmation copy with the Calendly link. New source bundles already include that copy.
Deploy All after saving both files. Never upload credentials or put them in this repository.
Twilio injects account credentials only into the server-side context.

Operations:
A success response means the application was stored, not that an email was delivered.
Each stored application contains per-mail status and, when accepted, operationId.
Accepted email operations must be checked in Twilio Email Logs for delivery.
A rejected/unknown/pending mail needs review; resubmitting the same submissionId never resends a mail.
Use the notification's applicant email address to respond; Twilio Email does not currently expose a Reply-To field.

Retention and limits:
Application TTL 180 days. Security counter TTL at most two days.
No raw IP addresses are collected by this code; Twilio restricts forwarding headers.
Maximum 100 applications/day globally, 20/hour globally, 2/address/day.
Honeypot, elapsed-time validation, input length/type checks, exact CORS allowlist.
These limits reduce abuse but do not replace a managed CAPTCHA/WAF for high-volume campaigns.
Only confirmed storage triggers the consent-dependent generate_lead analytics event; no form values go to analytics.

Scheduling: the successful application opens the existing Calendly event bmc-sessie. Availability and booking settings come directly from Calendly. The site prefills name/email after the disclosed form action. Calendly sends appointment details and reschedule/cancellation links. The browser only acknowledges a scheduling message from the actual Calendly iframe, once; no booking data is copied into Sync. Changing the event URL requires updating booking.ts and redeploying the email bundle.
