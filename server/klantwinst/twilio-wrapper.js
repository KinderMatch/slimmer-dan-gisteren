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
