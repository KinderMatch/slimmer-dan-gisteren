import { unsubscribe } from "../../../campaign-engine/service";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return new Response(unsubscribeHtml("Afmelden niet gelukt", "Er ontbreekt een afmeldcode."), {
      status: 400,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const result = await unsubscribe(token, "unsubscribed");
  return new Response(
    unsubscribeHtml(
      result.ok ? "Je bent afgemeld" : "Afmelden niet gelukt",
      result.ok
        ? "Je ontvangt geen opvolgmails meer vanuit deze Content Engine campagne."
        : "Deze afmeldlink is niet gevonden of is verlopen.",
    ),
    { status: result.ok ? 200 : 404, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

function unsubscribeHtml(title: string, message: string) {
  return `<!doctype html>
<html lang="nl">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
  <body style="margin:0;background:#111111;color:#f4f0ea;font-family:Inter,Arial,Helvetica,sans-serif;">
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;">
      <section style="max-width:560px;border:1px solid rgba(244,240,234,.14);border-radius:8px;background:#171717;padding:32px;">
        <p style="margin:0 0 10px;color:#7db7ff;font-size:12px;font-weight:900;text-transform:uppercase;">Slimmer dan Gisteren</p>
        <h1 style="margin:0 0 14px;font-size:38px;line-height:1.05;">${title}</h1>
        <p style="margin:0;color:rgba(244,240,234,.72);font-size:17px;line-height:1.6;">${message}</p>
      </section>
    </main>
  </body>
</html>`;
}
