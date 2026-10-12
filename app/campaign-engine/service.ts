import { getRuntimeEnv } from "@/runtime-env";
import { campaignSteps, renderHtml, renderSubject, renderText, type CampaignLead } from "./templates";

type LeadInput = {
  email: string;
  voornaam?: string;
  bedrijf?: string;
  functie?: string;
  vacature_haakje?: string;
  persoonlijke_observatie?: string;
  status?: string;
  source?: string;
};

type D1Result<T = unknown> = { results?: T[] };

export function requireAdmin(request: Request) {
  const env = getRuntimeEnv();
  const configured = env.CAMPAIGN_ADMIN_TOKEN;
  if (!configured) {
    throw new Response("CAMPAIGN_ADMIN_TOKEN is not configured", { status: 503 });
  }
  const token = request.headers.get("x-campaign-admin-token");
  if (token !== configured) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export function getCampaignDb() {
  const env = getRuntimeEnv();

  if (!env.DB) {
    throw new Response("D1 binding DB is not configured", { status: 503 });
  }
  return env.DB;
}

export async function ensureCampaignSchema() {
  const db = getCampaignDb();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS campaign_leads (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      first_name TEXT NOT NULL DEFAULT '',
      company TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      vacancy_hook TEXT NOT NULL DEFAULT '',
      personal_observation TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      unsubscribe_token TEXT NOT NULL UNIQUE,
      source TEXT NOT NULL DEFAULT 'vacature',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS campaign_suppressions (
      email TEXT PRIMARY KEY,
      reason TEXT NOT NULL DEFAULT 'unsubscribed',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS campaign_scheduled_emails (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      step INTEGER NOT NULL,
      campaign_slug TEXT NOT NULL DEFAULT 'content-engine-vacature-leads',
      template TEXT NOT NULL,
      subject TEXT NOT NULL,
      scheduled_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'queued',
      provider_message_id TEXT,
      last_error TEXT,
      sent_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(lead_id, step)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS campaign_events (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      email TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL,
      detail TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_campaign_scheduled_due ON campaign_scheduled_emails(status, scheduled_at)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_campaign_leads_status ON campaign_leads(status)"),
  ]);
}

export async function importLeads(input: LeadInput[]) {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  let imported = 0;
  let skipped = 0;

  for (const row of input) {
    const email = normalizeEmail(row.email);
    if (!email) {
      skipped += 1;
      continue;
    }
    const status = normalizeStatus(row.status);
    const id = crypto.randomUUID();
    const token = crypto.randomUUID();
    await db
      .prepare(`INSERT INTO campaign_leads (
        id, email, first_name, company, role, vacancy_hook, personal_observation, status, unsubscribe_token, source, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(email) DO UPDATE SET
        first_name = excluded.first_name,
        company = excluded.company,
        role = excluded.role,
        vacancy_hook = excluded.vacancy_hook,
        personal_observation = excluded.personal_observation,
        status = excluded.status,
        source = excluded.source,
        updated_at = CURRENT_TIMESTAMP`)
      .bind(
        id,
        email,
        row.voornaam ?? "",
        row.bedrijf ?? "",
        row.functie ?? "",
        row.vacature_haakje ?? "",
        row.persoonlijke_observatie ?? "",
        status,
        token,
        row.source ?? "vacature",
      )
      .run();
    imported += 1;
  }

  return { imported, skipped };
}

export async function listCampaignState() {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  const [leadCounts, mailCounts, leads, scheduled, suppressions, events] = await Promise.all([
    db.prepare("SELECT status, COUNT(*) AS count FROM campaign_leads GROUP BY status").all<{ status: string; count: number }>(),
    db.prepare("SELECT status, COUNT(*) AS count FROM campaign_scheduled_emails GROUP BY status").all<{ status: string; count: number }>(),
    db
      .prepare(`SELECT id, email, first_name, company, role, status, source, created_at, updated_at
        FROM campaign_leads
        ORDER BY updated_at DESC
        LIMIT 250`)
      .all(),
    db
      .prepare(`SELECT e.id, e.step, e.template, e.subject, e.scheduled_at, e.status, e.sent_at, e.last_error,
          l.email, l.first_name, l.company, l.role
        FROM campaign_scheduled_emails e
        JOIN campaign_leads l ON l.id = e.lead_id
        ORDER BY e.scheduled_at ASC
        LIMIT 500`)
      .all(),
    db.prepare("SELECT email, reason, created_at FROM campaign_suppressions ORDER BY created_at DESC LIMIT 250").all(),
    db.prepare("SELECT email, type, detail, created_at FROM campaign_events ORDER BY created_at DESC LIMIT 250").all(),
  ]);

  return {
    leadCounts: rows(leadCounts),
    mailCounts: rows(mailCounts),
    leads: rows(leads),
    scheduled: rows(scheduled),
    suppressions: rows(suppressions),
    events: rows(events),
  };
}

export async function updateLeadStatus(input: { id?: string; email?: string; status: string; detail?: string }) {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  const status = normalizeStatus(input.status);
  const row = input.id
    ? await db.prepare("SELECT * FROM campaign_leads WHERE id = ?").bind(input.id).first<CampaignLeadRow>()
    : await db.prepare("SELECT * FROM campaign_leads WHERE email = ?").bind(normalizeEmail(input.email || "")).first<CampaignLeadRow>();

  if (!row) {
    return { ok: false, error: "lead_not_found" };
  }

  const email = normalizeEmail(row.email);
  const statements = [
    db.prepare("UPDATE campaign_leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(status, row.id),
    db.prepare("INSERT INTO campaign_events (id, lead_id, email, type, detail) VALUES (?, ?, ?, ?, ?)").bind(
      crypto.randomUUID(),
      row.id,
      email,
      status,
      input.detail || "manual_update",
    ),
  ];

  if (status !== "active") {
    statements.push(
      db.prepare("INSERT OR REPLACE INTO campaign_suppressions (email, reason, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)").bind(email, status),
      db.prepare("UPDATE campaign_scheduled_emails SET status = 'skipped', last_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ? AND status = 'queued'").bind(
        status,
        row.id,
      ),
    );
  } else {
    statements.push(db.prepare("DELETE FROM campaign_suppressions WHERE email = ?").bind(email));
  }

  await db.batch(statements);
  return { ok: true, email, status };
}

export async function scheduleCampaign(input: { startDate: string; sendTime?: string; campaignSlug?: string }) {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  const campaignSlug = input.campaignSlug || "content-engine-vacature-leads";
  const sendTime = input.sendTime || "09:15";
  const leadsResult = await db
    .prepare(`SELECT l.* FROM campaign_leads l
      LEFT JOIN campaign_suppressions s ON s.email = l.email
      WHERE l.status = 'active' AND s.email IS NULL`)
    .all<CampaignLeadRow>();
  const leads = (leadsResult as D1Result<CampaignLeadRow>).results ?? [];
  let created = 0;

  for (const leadRow of leads) {
    const lead = mapLead(leadRow);
    for (const step of campaignSteps) {
      const scheduledAt = `${addDays(input.startDate, step.day)}T${sendTime}:00.000Z`;
      const result = await db
        .prepare(`INSERT INTO campaign_scheduled_emails (
          id, lead_id, step, campaign_slug, template, subject, scheduled_at, status, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', CURRENT_TIMESTAMP)
        ON CONFLICT(lead_id, step) DO UPDATE SET
          campaign_slug = excluded.campaign_slug,
          template = excluded.template,
          subject = excluded.subject,
          scheduled_at = CASE
            WHEN campaign_scheduled_emails.status = 'sent' THEN campaign_scheduled_emails.scheduled_at
            ELSE excluded.scheduled_at
          END,
          status = CASE
            WHEN campaign_scheduled_emails.status = 'sent' THEN 'sent'
            ELSE 'queued'
          END,
          last_error = CASE
            WHEN campaign_scheduled_emails.status = 'sent' THEN campaign_scheduled_emails.last_error
            ELSE NULL
          END,
          updated_at = CURRENT_TIMESTAMP`)
        .bind(crypto.randomUUID(), lead.id, step.step, campaignSlug, step.template, renderSubject(step.subject, lead), scheduledAt)
        .run();
      if (result.meta.changes > 0) created += 1;
    }
  }

  return { leads: leads.length, scheduled: created };
}

export async function processDue(input: { origin: string; limit?: number; dryRun?: boolean }) {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  const limit = Math.min(Math.max(input.limit ?? 25, 1), 100);
  const dueResult = await db
    .prepare(`SELECT e.*, l.email, l.first_name, l.company, l.role, l.vacancy_hook, l.personal_observation, l.status AS lead_status, l.unsubscribe_token
      FROM campaign_scheduled_emails e
      JOIN campaign_leads l ON l.id = e.lead_id
      LEFT JOIN campaign_suppressions s ON s.email = l.email
      WHERE e.status = 'queued' AND e.scheduled_at <= ? AND s.email IS NULL
      ORDER BY e.scheduled_at ASC
      LIMIT ?`)
    .bind(new Date().toISOString(), limit)
    .all<DueEmailRow>();
  const due = (dueResult as D1Result<DueEmailRow>).results ?? [];
  let sent = 0;
  let wouldSend = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of due) {
    if (row.lead_status !== "active") {
      await markScheduled(row.id, "skipped", "lead_not_active");
      skipped += 1;
      continue;
    }
    const lead = mapDueLead(row);
    const unsubscribeUrl = `${input.origin}/api/campaign/unsubscribe?token=${encodeURIComponent(lead.unsubscribeToken)}`;
    const text = renderText(row.step, lead, unsubscribeUrl);
    const html = renderHtml(row.step, lead, unsubscribeUrl, input.origin);
    if (input.dryRun) {
      wouldSend += 1;
      continue;
    }
    const result = await sendEmail({ to: lead.email, subject: row.subject, text, html });
    if (result.ok) {
      await db
        .prepare("UPDATE campaign_scheduled_emails SET status = 'sent', sent_at = CURRENT_TIMESTAMP, provider_message_id = ?, last_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
        .bind(result.messageId ?? null, row.id)
        .run();
      await event(lead.id, lead.email, "sent", `step_${row.step}`);
      sent += 1;
    } else {
      await markScheduled(row.id, "failed", result.error || "send_failed");
      await event(lead.id, lead.email, "failed", result.error || "send_failed");
      failed += 1;
    }
  }

  return { processed: due.length, wouldSend, sent, skipped, failed, dryRun: Boolean(input.dryRun) };
}

export async function unsubscribe(token: string, reason = "unsubscribed") {
  await ensureCampaignSchema();
  const db = getCampaignDb();
  const result = await db.prepare("SELECT * FROM campaign_leads WHERE unsubscribe_token = ?").bind(token).first<CampaignLeadRow>();
  if (!result) {
    return { ok: false };
  }
  const email = normalizeEmail(result.email);
  await db.batch([
    db.prepare("UPDATE campaign_leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(reason, result.id),
    db.prepare("INSERT OR REPLACE INTO campaign_suppressions (email, reason, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)").bind(email, reason),
    db.prepare("UPDATE campaign_scheduled_emails SET status = 'skipped', last_error = ?, updated_at = CURRENT_TIMESTAMP WHERE lead_id = ? AND status = 'queued'").bind(reason, result.id),
    db.prepare("INSERT INTO campaign_events (id, lead_id, email, type, detail) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), result.id, email, reason, "unsubscribe_link"),
  ]);
  return { ok: true, email };
}

async function sendEmail(input: { to: string; subject: string; text: string; html: string }) {
  const env = getRuntimeEnv();
  const apiKey = env.SENDGRID_API_KEY;
  const from = env.SENDGRID_FROM_EMAIL || "jimmy@slimmerdangisteren.nl";
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
      reply_to: { email: from, name: fromName },
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
  return { ok: true, messageId: response.headers.get("x-message-id") };
}

async function markScheduled(id: string, status: string, error: string) {
  await getCampaignDb()
    .prepare("UPDATE campaign_scheduled_emails SET status = ?, last_error = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(status, error, id)
    .run();
}

async function event(leadId: string, email: string, type: string, detail = "") {
  await getCampaignDb()
    .prepare("INSERT INTO campaign_events (id, lead_id, email, type, detail) VALUES (?, ?, ?, ?, ?)")
    .bind(crypto.randomUUID(), leadId, email, type, detail)
    .run();
}

function addDays(dateValue: string, days: number) {
  const date = new Date(`${dateValue}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function normalizeEmail(email: string) {
  return String(email || "").trim().toLowerCase();
}

function normalizeStatus(status?: string) {
  const value = String(status || "active").trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
  if (["afgemeld", "unsubscribe", "unsubscribed"].includes(value)) return "unsubscribed";
  if (["geen_interesse", "geeninteresse", "not_interested", "niet_interessant"].includes(value)) return "not_interested";
  return "active";
}

function rows<T>(result: unknown): T[] {
  return ((result as D1Result<T>).results ?? []) as T[];
}

type CampaignLeadRow = {
  id: string;
  email: string;
  first_name: string;
  company: string;
  role: string;
  vacancy_hook: string;
  personal_observation: string;
  status: string;
  unsubscribe_token: string;
};

type DueEmailRow = CampaignLeadRow & {
  id: string;
  lead_id: string;
  step: number;
  subject: string;
  lead_status: string;
};

function mapLead(row: CampaignLeadRow): CampaignLead {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    company: row.company,
    role: row.role,
    vacancyHook: row.vacancy_hook,
    personalObservation: row.personal_observation,
    status: row.status,
    unsubscribeToken: row.unsubscribe_token,
  };
}

function mapDueLead(row: DueEmailRow): CampaignLead {
  return {
    id: row.lead_id,
    email: row.email,
    firstName: row.first_name,
    company: row.company,
    role: row.role,
    vacancyHook: row.vacancy_hook,
    personalObservation: row.personal_observation,
    status: row.lead_status,
    unsubscribeToken: row.unsubscribe_token,
  };
}
