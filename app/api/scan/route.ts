import { getRuntimeEnv } from "@/runtime-env";

type ScanRequest = {
  fields?: Record<string, string>;
  pageSlug?: string;
  pageTitle?: string;
  pageUrl?: string;
};

const notificationEmail = "jimmy@slimmerdangisteren.nl";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ScanRequest;
    const fields = body.fields ?? {};
    const email = normalizeEmail(fields["E-mailadres"] || fields["Email"] || "");
    const name = clean(fields.Naam || "");
    const website = clean(fields["Website URL"] || fields.Website || "");

    if (!name || !email || !website) {
      return Response.json({ error: "missing_required_fields" }, { status: 400 });
    }

    const pageTitle = clean(body.pageTitle || "SEO-scan");
    const pageUrl = clean(body.pageUrl || body.pageSlug || "");
    const rows = Object.entries(fields)
      .filter(([, value]) => clean(value))
      .map(([label, value]) => ({ label: clean(label), value: clean(value) }));
    const summary = rows.map((row) => `${row.label}: ${row.value}`).join("\n");

    const notification = await sendEmail({
      to: notificationEmail,
      replyTo: email,
      subject: `Nieuwe aanvraag: ${pageTitle}`,
      text: [
        "Nieuwe formulierinzending via slimmerdangisteren.nl",
        "",
        summary,
        pageUrl ? `\nPagina: ${pageUrl}` : "",
      ].join("\n"),
      html: renderInternalEmail({ pageTitle, pageUrl, rows }),
    });

    if (!notification.ok) {
      return Response.json({ error: notification.error || "notification_failed" }, { status: 502 });
    }

    const confirmation = await sendEmail({
      to: email,
      subject: "We hebben je aanvraag ontvangen",
      text: [
        `Hoi ${name},`,
        "",
        "Bedankt voor je aanvraag. We hebben je website ontvangen en nemen binnen 3 werkdagen contact met je op.",
        "",
        "Groet,",
        "Jimmy",
        "Slimmer dan Gisteren",
      ].join("\n"),
      html: renderConfirmationEmail(name),
    });

    if (!confirmation.ok) {
      return Response.json({ error: confirmation.error || "confirmation_failed" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "scan_submit_failed" }, { status: 500 });
  }
}

async function sendEmail(input: { to: string; subject: string; text: string; html: string; replyTo?: string }) {
  const env = getRuntimeEnv();
  const apiKey = env.SENDGRID_API_KEY;
  const from = env.SENDGRID_FROM_EMAIL || notificationEmail;
  const fromName = env.SENDGRID_FROM_NAME || "Jimmy Buitenhuis";

  if (!apiKey) return { ok: false, error: "SENDGRID_API_KEY_missing" };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: input.to }] }],
      from: { email: from, name: fromName },
      reply_to: { email: input.replyTo || from, name: input.replyTo ? input.replyTo : fromName },
      subject: input.subject,
      content: [
        { type: "text/plain", value: input.text },
        { type: "text/html", value: input.html },
      ],
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `sendgrid_${response.status}` };
  }

  return { ok: true };
}

function renderInternalEmail(input: { pageTitle: string; pageUrl: string; rows: Array<{ label: string; value: string }> }) {
  return `
    <div style="font-family:Arial,sans-serif;color:#08243a;line-height:1.55;">
      <p style="margin:0 0 10px;color:#005b82;font-size:12px;font-weight:900;text-transform:uppercase;">Nieuwe aanvraag</p>
      <h1 style="margin:0 0 18px;font-size:28px;line-height:1.1;">${escapeHtml(input.pageTitle)}</h1>
      <table style="width:100%;border-collapse:collapse;">
        ${input.rows
          .map(
            (row) => `
              <tr>
                <td style="padding:10px;border:1px solid #d6e7f1;font-weight:700;vertical-align:top;">${escapeHtml(row.label)}</td>
                <td style="padding:10px;border:1px solid #d6e7f1;">${escapeHtml(row.value).replaceAll("\n", "<br />")}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      ${input.pageUrl ? `<p style="margin-top:16px;">Pagina: <a href="${escapeHtml(input.pageUrl)}">${escapeHtml(input.pageUrl)}</a></p>` : ""}
    </div>
  `;
}

function renderConfirmationEmail(name: string) {
  return `
    <div style="font-family:Arial,sans-serif;color:#08243a;line-height:1.65;">
      <p style="margin:0 0 10px;color:#005b82;font-size:12px;font-weight:900;text-transform:uppercase;">Slimmer dan Gisteren</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.1;">We hebben je aanvraag ontvangen</h1>
      <p>Hoi ${escapeHtml(name)},</p>
      <p>Bedankt voor je aanvraag. We hebben je website ontvangen en nemen binnen 3 werkdagen contact met je op.</p>
      <p>Groet,<br />Jimmy<br />Slimmer dan Gisteren</p>
    </div>
  `;
}

function normalizeEmail(value: string) {
  const email = clean(value).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function clean(value: string) {
  return String(value || "").trim();
}

function escapeHtml(value: string) {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
