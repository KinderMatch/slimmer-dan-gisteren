export type CampaignLead = {
  id: string;
  email: string;
  firstName: string;
  company: string;
  role: string;
  vacancyHook: string;
  personalObservation: string;
  status: string;
  unsubscribeToken: string;
};

export const campaignSteps = [
  { step: 1, day: 0, template: "01-vacature-trigger", subject: "Vraag over jullie vacature voor {{functie}}" },
  { step: 2, day: 3, template: "02-marketing-wordt-tweede-baan", subject: "Wat content vaak duurder maakt dan verwacht" },
  { step: 3, day: 6, template: "03-een-gesprek-meerdere-kanalen", subject: "Zo haal je meer uit één goed gesprek" },
  { step: 4, day: 10, template: "04-content-engine-pakketten", subject: "Welke Content Engine past bij {{bedrijf}}?" },
  { step: 5, day: 14, template: "05-laatste-check", subject: "Relevant voor nu, of zal ik stoppen?" },
];

export function renderSubject(template: string, lead: CampaignLead) {
  return template
    .replaceAll("{{functie}}", lead.role)
    .replaceAll("{{bedrijf}}", lead.company)
    .replaceAll("{{voornaam}}", lead.firstName);
}

export function renderText(step: number, lead: CampaignLead, unsubscribeUrl: string) {
  const greeting = `Hi ${lead.firstName || "daar"},`;
  const bodies: Record<number, string> = {
    1: `${greeting}\n\nIk zag dat ${lead.company} zoekt naar een ${lead.role}. ${lead.vacancyHook}\n\nZo'n vacature is vaak een signaal dat zichtbaarheid, content of commerciële groei belangrijker wordt. De gewenste uitkomst is simpel: structureel zichtbaar zijn, zonder dat iemand intern elke week opnieuw hoeft te bedenken wat er gepost, gemaild of gepromoot moet worden.\n\nDaarvoor is de Content Engine gemaakt. Eén goed gesprek per maand wordt vertaald naar content voor social media, e-mail, website en paid social.\n\nZou het logisch zijn om te kijken of dit naast jullie vacature past?`,
    2: `${greeting}\n\nWat content vaak duurder maakt dan verwacht, is niet één losse post. Het is de herhaling.\n\nIedere week opnieuw: onderwerp kiezen, input ophalen, tekst schrijven, redigeren, geschikt maken voor social, mail, website en eventueel ads. Daardoor voelt marketing snel als een tweede baan.\n\nDe Content Engine verlaagt die inspanning door de input aan de voorkant goed op te halen en daarna door te vertalen naar meerdere kanalen.`,
    3: `${greeting}\n\nDe meeste bedrijven hebben genoeg kennis, klantverhalen en commerciële inzichten in huis. De vraag is alleen: hoe maak je daar consequent content van?\n\nOns mechanisme is bewust klein gehouden: interview, inzichten, content, distributie. Uit één gesprek maken we input voor social, e-mail, website en paid social. Voor ${lead.company} zou ik vooral kijken naar ${lead.personalObservation}.\n\nDaardoor wordt de kans groter dat content ook echt blijft lopen, omdat het niet afhankelijk is van losse inspiratie.`,
    4: `${greeting}\n\nOmdat jullie vacature voor ${lead.role} raakt aan groei, zichtbaarheid of communicatie, stuur ik kort de opties. De Content Engine begint bij €395 per maand en groeit mee met hoeveel kanalen je wilt bedienen.\n\nStart is logisch als je vooral structureel zichtbaar wilt worden. Groei is meestal de meest gebruikte variant wanneer social, e-mail, website en advertentiehooks samen moeten lopen. Partner past wanneer content ook cases, sales en paid social structureel moet voeden.\n\nZal ik aangeven welke variant op basis van jullie vacature het meest logisch lijkt?`,
    5: `${greeting}\n\nLaatste check van mijn kant.\n\nIk mailde omdat jullie vacature voor ${lead.role} erop wijst dat ${lead.company} bezig is met groei, zichtbaarheid of extra marketingcapaciteit.\n\nAls content intern al goed loopt, laat ik het hierbij. Als posts, mails, blogs of advertentie-invalshoeken wel blijven liggen, kan de Content Engine een lichte eerste stap zijn: één gesprek, meerdere contentstukken, minder losse marketingdruk.\n\nIs dit relevant voor nu, of zal ik je niet meer hierover mailen?`,
  };

  return `${bodies[step]}\n\nGeen interesse? Reageer met "geen interesse" of meld je af: ${unsubscribeUrl}`;
}

export function renderHtml(step: number, lead: CampaignLead, unsubscribeUrl: string, origin: string) {
  const subject = renderSubject(campaignSteps[step - 1]?.subject ?? "Content Engine", lead);
  const logoUrl = `${origin}/assets/logo.png`;
  const portraitUrl = `${origin}/assets/jimmy-buitenhuis.png`;
  const headline: Record<number, string> = {
    1: `Vraag over jullie vacature voor ${escapeHtml(lead.role)}`,
    2: "Wat content duurder maakt dan verwacht.",
    3: "Meer output uit één goed gesprek.",
    4: "Welke Content Engine past?",
    5: "Relevant voor nu, of stoppen?",
  };
  const body = renderBody(step, lead);

  return `<!doctype html>
<html lang="nl">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
  <body style="margin:0;padding:0;background:#111111;color:#f4f0ea;font-family:Inter,Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111111;">
      <tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:660px;border:1px solid rgba(244,240,234,0.14);background:#171717;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:28px 30px 24px;background:linear-gradient(135deg,#111111 0%,#171717 54%,#0f1724 100%);">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><img src="${logoUrl}" width="44" height="44" alt="Slimmer dan Gisteren" style="display:block;border-radius:50%;background:#e5f7fd;"></td><td align="right" style="font-size:12px;line-height:18px;color:#7db7ff;font-weight:800;text-transform:uppercase;">Content Engine</td></tr></table>
            <div style="height:2px;width:120px;margin:28px 0 24px;background:linear-gradient(90deg,#2563eb,#7db7ff);"></div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;padding-right:22px;"><h1 style="margin:0;font-size:36px;line-height:1.02;letter-spacing:0;color:#f4f0ea;font-weight:900;">${headline[step]}</h1></td><td width="116" style="vertical-align:top;"><img src="${portraitUrl}" width="104" height="104" alt="Jimmy Buitenhuis" style="display:block;width:104px;height:104px;border-radius:8px;object-fit:cover;border:1px solid rgba(125,183,255,0.34);"></td></tr></table>
          </td></tr>
          ${body}
          <tr><td style="padding:0 30px 30px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(244,240,234,0.12);background:rgba(244,240,234,0.06);border-radius:8px;"><tr><td width="82" style="padding:16px 0 16px 16px;vertical-align:middle;"><img src="${portraitUrl}" width="66" height="66" alt="Jimmy Buitenhuis" style="display:block;width:66px;height:66px;border-radius:50%;object-fit:cover;border:1px solid rgba(125,183,255,0.34);"></td><td style="padding:16px 16px 16px 14px;vertical-align:middle;"><p style="margin:0;color:#f4f0ea;font-size:16px;line-height:1.35;font-weight:900;">Jimmy Buitenhuis</p><p style="margin:4px 0 0;color:rgba(244,240,234,0.64);font-size:13px;line-height:1.45;">Slimmer dan Gisteren · Content, advertenties en websites</p></td></tr></table></td></tr>
          <tr><td style="padding:22px 30px;border-top:1px solid rgba(244,240,234,0.12);font-size:12px;line-height:18px;color:rgba(244,240,234,0.52);">Geen interesse? Reageer met "geen interesse" of <a href="${unsubscribeUrl}" style="color:#7db7ff;">meld je hier af</a>.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function renderBody(step: number, lead: CampaignLead) {
  const first = escapeHtml(lead.firstName || "daar");
  const company = escapeHtml(lead.company);
  const role = escapeHtml(lead.role);
  const hook = escapeHtml(lead.vacancyHook);
  const observation = escapeHtml(lead.personalObservation);

  if (step === 4) {
    return `<tr><td style="padding:24px 30px 8px;"><p style="margin:0 0 20px;font-size:17px;line-height:1.65;color:rgba(244,240,234,0.76);">Hi ${first}, omdat jullie vacature voor ${role} raakt aan groei, zichtbaarheid of communicatie, stuur ik je kort de drie varianten. De keuze hangt vooral af van hoeveel kanalen structureel gevuld moeten worden.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid rgba(125,183,255,0.24);background:rgba(125,183,255,0.08);border-radius:8px;"><tr><td style="padding:18px;color:#f4f0ea;font-size:15px;line-height:1.55;"><strong style="color:#7db7ff;">Aanbodlogica</strong><br>Meer zichtbaarheid, minder wekelijkse denkdruk, sneller naar bruikbare content, met een kleine maandelijkse basis.</td></tr></table>${priceCard("Start", "€395", "Voor structurele zichtbaarheid: 1 interview, social content en 1 extra contentvorm.", false)}${priceCard("Groei", "€595", "Meest gebruikt: planning, social, e-mail, website/blog en advertentiehooks.", true)}${priceCard("Partner", "€795", "Voor meerdere commerciële doelen: strategie, klantcases, salescontent en paid-social copy.", false)}</td></tr><tr><td style="padding:18px 30px 34px;"><a href="mailto:jimmy@slimmerdangisteren.nl?subject=Welk%20Content%20Engine%20pakket%20past%3F" style="display:inline-block;background:#f4f0ea;color:#111111;text-decoration:none;border-radius:999px;padding:15px 22px;font-weight:900;font-size:15px;">Welke variant past?</a><p style="margin:18px 0 0;font-size:15px;line-height:1.6;color:rgba(244,240,234,0.64);">Ik kan op basis van jullie vacature kort aangeven wat logisch is. Geen lange call nodig.</p></td></tr>`;
  }

  const copy: Record<number, string> = {
    1: `Hi ${first}, ik zag dat ${company} zoekt naar een <strong style="color:#f4f0ea;">${role}</strong>. ${hook}<br><br>Zo'n vacature is vaak een signaal dat zichtbaarheid, content of commerciële groei belangrijker wordt. De gewenste uitkomst is simpel: structureel zichtbaar zijn, zonder dat iemand intern elke week opnieuw hoeft te bedenken wat er gepost, gemaild of gepromoot moet worden.`,
    2: `Hi ${first}, wat content vaak duurder maakt dan verwacht, is niet één losse post. Het is de herhaling.<br><br>Iedere week opnieuw: onderwerp kiezen, input ophalen, tekst schrijven, redigeren, geschikt maken voor social, mail, website en eventueel ads. Daardoor voelt marketing snel als een tweede baan.`,
    3: `Hi ${first}, de meeste bedrijven hebben genoeg kennis, klantverhalen en commerciële inzichten in huis. De vraag is alleen: hoe maak je daar consequent content van?<br><br>Voor ${company} zou ik vooral kijken naar ${observation}.`,
    5: `Hi ${first}, laatste check van mijn kant. Ik mailde omdat jullie vacature voor ${role} erop wijst dat ${company} bezig is met groei, zichtbaarheid of extra marketingcapaciteit.<br><br>Als content intern al goed loopt, laat ik het hierbij. Als posts, mails, blogs of advertentie-invalshoeken wel blijven liggen, kan de Content Engine een lichte eerste stap zijn.`,
  };

  return `<tr><td style="padding:24px 30px 18px;"><p style="margin:0 0 20px;font-size:17px;line-height:1.65;color:rgba(244,240,234,0.76);">${copy[step]}</p>${offerBlock(step)}</td></tr><tr><td style="padding:0 30px 34px;"><a href="${ctaHref(step)}" style="display:inline-block;background:#f4f0ea;color:#111111;text-decoration:none;border-radius:999px;padding:15px 22px;font-weight:900;font-size:15px;">${ctaLabel(step)}</a><p style="margin:18px 0 0;font-size:15px;line-height:1.6;color:rgba(244,240,234,0.64);">${ctaMicrocopy(step)}</p></td></tr>`;
}

function offerBlock(step: number) {
  const blocks: Record<number, string> = {
    1: `<strong style="color:#7db7ff;">Gewenste uitkomst</strong><br>Structureel zichtbaar worden zonder dat content intern een losse wekelijkse taak blijft.`,
    2: `<strong style="color:#7db7ff;">Minder inspanning</strong><br>Eén keer input ophalen, daarna vertalen naar social, e-mail, website en paid-social invalshoeken.`,
    3: `<strong style="color:#7db7ff;">Mechanisme</strong><br>Interview &rarr; inzichten &rarr; content &rarr; distributie. Klein genoeg om vol te houden, breed genoeg om meerdere kanalen te voeden.`,
    5: `<strong style="color:#7db7ff;">Lage drempel</strong><br>Antwoord met "relevant" als ik kort mee mag kijken, of met "geen interesse" als ik je eruit mag halen.`,
  };
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(125,183,255,0.24);background:rgba(125,183,255,0.08);border-radius:8px;"><tr><td style="padding:18px;color:#f4f0ea;font-size:15px;line-height:1.55;">${blocks[step]}</td></tr></table>`;
}

function ctaHref(step: number) {
  if (step === 2) return "mailto:jimmy@slimmerdangisteren.nl?subject=Voorbeeld%20Content%20Engine";
  if (step === 5) return "mailto:jimmy@slimmerdangisteren.nl?subject=Content%20Engine%20-%20relevant%20of%20stoppen%3F";
  return "https://calendly.com/buitenhuisj004/bmc-sessie";
}

function ctaLabel(step: number) {
  if (step === 2) return "Stuur een voorbeeld";
  if (step === 3) return "Plan een korte sessie";
  if (step === 5) return "Relevant of stoppen?";
  return "Kort sparren?";
}

function ctaMicrocopy(step: number) {
  if (step === 1) return "Dan kijk ik mee of de Content Engine logisch naast jullie vacature past.";
  if (step === 2) return "Dan zie je meteen hoe één interview wordt omgezet naar meerdere stukken content.";
  if (step === 3) return "Geen grote strategiepresentatie, gewoon kort kijken waar content nu blijft liggen.";
  if (step === 5) return "Eén woord terugsturen is genoeg: relevant, later of geen interesse.";
  return "";
}

function priceCard(name: string, price: string, text: string, highlighted: boolean) {
  const bg = highlighted ? "rgba(125,183,255,0.08)" : "rgba(244,240,234,0.06)";
  const border = highlighted ? "rgba(125,183,255,0.34)" : "rgba(244,240,234,0.14)";
  const badge = highlighted ? `<div style="padding:9px 18px;background:#2563eb;color:#ffffff;font-size:12px;line-height:18px;font-weight:900;text-transform:uppercase;">Meest gebruikt</div>` : "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;border:1px solid ${border};background:${bg};border-radius:8px;overflow:hidden;">${badge}<tr><td style="padding:18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td><strong style="display:block;color:#f4f0ea;font-size:20px;line-height:1.2;">${name}</strong></td><td align="right" style="color:#7db7ff;font-size:20px;font-weight:900;">${price}</td></tr></table><p style="margin:10px 0 0;color:rgba(244,240,234,0.7);font-size:15px;line-height:1.6;">${text}</p></td></tr></table>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
