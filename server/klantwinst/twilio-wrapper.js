// The deployed runtime requires the native Response instance with a string body.
exports.handler = function(context, event, callback) {
  const allowed = ["https://slimmerdangisteren.nl", "https://www.slimmerdangisteren.nl"];
  if (!allowed.includes(event.request?.headers?.origin)) {
    const denied = new Twilio.Response();
    denied.setStatusCode(403);
    denied.appendHeader("Content-Type", "application/json");
    denied.setBody(JSON.stringify({error:"origin"}));
    return callback(null, denied);
  }
  // Compatibility correction for the already deployed v3 private asset.
  const mailFetch = (url, options) => {
    if (url === "https://comms.twilio.com/v1/Emails") {
      const payload = JSON.parse(options.body);
      payload.content.html = "{{ mail_html | default: 'Klantwinst-check' }}";
      payload.content.text = "{{ mail_text | default: 'Klantwinst-check' }}";
      for (const recipient of payload.to) {
        const vars = recipient.variables;
        if (payload.content.subject === "Je gratis Klantwinst-check is aangevraagd") {
          const next = "Heb je nog geen datum gekozen? Plan je gratis analysegesprek van twintig minuten via https://calendly.com/buitenhuisj004/bmc-sessie . Al ingepland? Calendly stuurt je apart de afspraakbevestiging. Lukt plannen niet? Jimmy neemt binnen twee werkdagen persoonlijk contact met je op.";
          vars.mail_text = vars.mail_text.replace(/Ik bekijk je website, aanbod en doel\..*?reageren\./, next);
          vars.mail_html = vars.mail_html.replace(/<p>Ik bekijk je website, aanbod en doel\.[\s\S]*?<\/p>/, '<p>Heb je nog geen datum gekozen? <a href="https://calendly.com/buitenhuisj004/bmc-sessie" style="color:#25608a;font-weight:bold">Kies een datum en tijd voor je gratis analysegesprek</a>.</p><p>Al ingepland? Calendly stuurt je apart de afspraakbevestiging. Lukt plannen niet? Jimmy neemt binnen twee werkdagen persoonlijk contact met je op.</p>');
        } else {
          vars.mail_text = vars.mail_text.replace("Reageer uiterlijk binnen twee werkdagen om het analysegesprek van maximaal twintig minuten te plannen.", "De aanvrager kan direct een gesprek boeken via Calendly. Controleer de afspraakbevestiging voordat je een nieuw moment voorstelt. Neem binnen twee werkdagen contact op als er nog geen afspraak staat.");
          vars.mail_html = vars.mail_html.replace("reageer uiterlijk binnen twee werkdagen om het analysegesprek van maximaal twintig minuten te plannen.", "de aanvrager kan direct een gesprek boeken via Calendly. Controleer de afspraakbevestiging voordat je een nieuw moment voorstelt. Neem binnen twee werkdagen contact op als er nog geen afspraak staat.");
        }
      }
      options = {...options, body:JSON.stringify(payload)};
    }
    return fetch(url, options);
  };
  const handler = require(Runtime.getAssets()["/klantwinst-receiver-v3.js"].path).createHandler({Twilio, fetch:mailFetch});
  return handler(context,event,(error,response)=>{
    if(error)return callback(error);
    response.setBody(JSON.stringify(response.getResponse().body));
    callback(null,response);
  });
};
