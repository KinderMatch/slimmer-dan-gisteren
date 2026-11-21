export type KlantwinstSubmission = {
  name: string;
  email: string;
  website: string;
  offer: string;
  goal: string;
};

export type SubmissionValidation =
  | { ok: true; value: KlantwinstSubmission }
  | { ok: false; fields: Partial<Record<keyof KlantwinstSubmission, string>> };

const limits = { name: 150, email: 254, website: 300, offer: 300, goal: 1200 };

export function validateSubmission(input: unknown): SubmissionValidation {
  const source = input && typeof input === "object" && !Array.isArray(input)
    ? input as Record<string, unknown> : {};
  const fields: Partial<Record<keyof KlantwinstSubmission, string>> = {};
  const value = {} as KlantwinstSubmission;
  for (const key of Object.keys(limits) as Array<keyof KlantwinstSubmission>) {
    const raw = source[key];
    value[key] = typeof raw === "string" ? raw.trim() : "";
    if (!value[key] || value[key].length > limits[key] || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value[key])) {
      fields[key] = "Vul dit veld in binnen het aangegeven maximum.";
    }
  }
  value.email = value.email.toLowerCase();
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.email) || /[\r\n]/.test(value.email)) {
    fields.email = "Vul een geldig e-mailadres in.";
  }
  if (/[\r\n]/.test(value.name)) fields.name = "Vul je naam op één regel in.";
  try {
    const website = new URL(/^[a-z][a-z\d+.-]*:/i.test(value.website) ? value.website : `https://${value.website}`);
    if (!["https:", "http:"].includes(website.protocol) || website.username || website.password || !website.hostname.includes(".")) throw new Error();
    if (/[\s<>]/.test(value.website)) throw new Error();
    // The website is stored as supplied and is never fetched by the mail service.
  } catch {
    fields.website = "Vul een website in, bijvoorbeeld jouwbedrijf.nl.";
  }
  return Object.keys(fields).length ? { ok: false, fields } : { ok: true, value };
}

export const klantwinstMailbox = "jimmy@slimmerdangisteren.nl";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function emailLayout(title: string, content: string) {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#edf4fa;color:#08243a;font-family:Arial,sans-serif;line-height:1.65"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:24px 12px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:auto;background:white"><tr><td style="padding:24px;background:#08243a;color:white;font-size:20px;font-weight:bold">Slimmer dan Gisteren</td></tr><tr><td style="padding:28px 24px;font-size:16px"><h1 style="font-size:26px;line-height:1.25;margin:0 0 24px">${escapeHtml(title)}</h1>${content}</td></tr></table></td></tr></table></body></html>`;
}

type TransactionalMail = { to: string; replyTo: string; subject: string; text: string; html: string };

export function buildKlantwinstEmails(data: KlantwinstSubmission, reference: string): { notification: TransactionalMail; confirmation: TransactionalMail } {
  const rows = [["Naam", data.name], ["E-mailadres", data.email], ["Website", data.website], ["Product of dienst", data.offer], ["Doel", data.goal]];
  const confirmationTitle = "Je gratis Klantwinst-check is aangevraagd";
  return {
    notification: {
      to: klantwinstMailbox,
      replyTo: data.email,
      subject: "Nieuwe aanvraag: gratis Klantwinst-check",
      text: ["Nieuwe aanvraag via slimmerdangisteren.nl/klantwinst/", "", ...rows.map(([label, value]) => `${label}: ${value}`), "", `Referentie: ${reference}`, "", "Reageer uiterlijk binnen twee werkdagen om het analysegesprek van maximaal twintig minuten te plannen.", "Reageer via het e-mailadres van de aanvrager hierboven."].join("\n"),
      html: emailLayout("Nieuwe aanvraag voor de Klantwinst-check", `<p>Een bezoeker heeft de gratis Klantwinst-check aangevraagd.</p><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th scope="row" style="padding:10px 8px;border-bottom:1px solid #d0dfeb;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:10px 8px;border-bottom:1px solid #d0dfeb;overflow-wrap:anywhere">${escapeHtml(value).replaceAll("\n", "<br>")}</td></tr>`).join("")}</table><p><strong>Volgende stap:</strong> reageer uiterlijk binnen twee werkdagen om het analysegesprek van maximaal twintig minuten te plannen.</p><p>Reageer via het e-mailadres van de aanvrager hierboven.</p><p style="font-size:14px;color:#506879">Referentie: ${escapeHtml(reference)}</p>`),
    },
    confirmation: {
      to: data.email,
      replyTo: klantwinstMailbox,
      subject: confirmationTitle,
      text: [`Hoi ${data.name},`, "", "Bedankt voor je aanvraag voor de gratis Klantwinst-check.", "", "Ik bekijk je website, aanbod en doel. Binnen twee werkdagen ontvang je een persoonlijke reactie van mij om het analysegesprek te plannen. Ik streef ernaar binnen één werkdag te reageren.", "", "In het gesprek van maximaal twintig minuten bespreken wij je advertentie, de route naar een aanvraag of aankoop en de kwaliteit van je aanvragen. Je neemt inzicht en concrete vervolgstappen mee.", "", "De check is gratis en vrijblijvend. Je gaat met deze aanvraag geen betaalde samenwerking aan.", "", "Wil je alvast iets aanvullen? Beantwoord gerust deze e-mail. Deel geen wachtwoorden, accounttoegang of gegevens van jouw klanten.", "", "Groet,", "Jimmy Buitenhuis", "Slimmer dan Gisteren", klantwinstMailbox, "+31 6 10175027", "", `Referentie: ${reference}`].join("\n"),
      html: emailLayout(confirmationTitle, `<p>Hoi ${escapeHtml(data.name)},</p><p>Bedankt voor je aanvraag voor de gratis Klantwinst-check.</p><p>Ik bekijk je website, aanbod en doel. <strong>Binnen twee werkdagen ontvang je een persoonlijke reactie van mij</strong> om het analysegesprek te plannen. Ik streef ernaar binnen één werkdag te reageren.</p><p>In het gesprek van maximaal twintig minuten bespreken wij:</p><ul><li>Spreekt je advertentie de juiste mensen aan?</li><li>Wordt interesse ook een aanvraag of aankoop?</li><li>Hoe herken je welke aanvragen bij jouw aanbod passen?</li></ul><p>Je neemt <strong>inzicht en concrete vervolgstappen</strong> mee.</p><p>De check is gratis en vrijblijvend. Je gaat met deze aanvraag geen betaalde samenwerking aan.</p><p>Wil je alvast iets aanvullen? Beantwoord gerust deze e-mail. Deel geen wachtwoorden, accounttoegang of gegevens van jouw klanten.</p><p>Groet,<br><strong>Jimmy Buitenhuis</strong><br>Slimmer dan Gisteren<br><a href="mailto:${klantwinstMailbox}" style="color:#2563eb">${klantwinstMailbox}</a><br>+31 6 10175027</p><p style="font-size:14px;color:#506879">Referentie: ${escapeHtml(reference)}</p>`),
    },
  };
}

// Content is passed as Liquid variables, so user text is never parsed as a template.
export function twilioEmailPayload(mail: TransactionalMail) {
  return {
    from: { address: klantwinstMailbox, name: "Jimmy | Slimmer dan Gisteren" },
    to: [{ address: mail.to, variables: { mail_html: mail.html, mail_text: mail.text } }],
    content: { subject: mail.subject, html: "{{ mail_html | default: 'Klantwinst-check' }}", text: "{{ mail_text | default: 'Klantwinst-check' }}" },
  };
}
