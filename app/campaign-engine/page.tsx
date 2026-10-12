"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo, useState } from "react";

const sampleCsv = `email,voornaam,bedrijf,functie,vacature_haakje,persoonlijke_observatie,status
naam@bedrijf.nl,Sanne,Voorbeeld BV,Marketing medewerker,"Ik zag dat content en zichtbaarheid duidelijk terugkomen in de vacature.","jullie behoefte aan structurele zichtbaarheid zonder elke week opnieuw content te bedenken",active`;

const tabs = ["Overzicht", "Import", "Planning", "Leads", "Afmeldingen", "Log"] as const;

type Tab = (typeof tabs)[number];
type ApiResult = Record<string, unknown>;
type LeadInput = Record<string, string>;
type Row = Record<string, string | number | null>;
type DashboardState = {
  leadCounts?: Array<{ status: string; count: number }>;
  mailCounts?: Array<{ status: string; count: number }>;
  leads?: Row[];
  scheduled?: Row[];
  suppressions?: Row[];
  events?: Row[];
};

export default function CampaignEnginePage() {
  const [token, setToken] = useState("");
  const [csv, setCsv] = useState(sampleCsv);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [sendTime, setSendTime] = useState("09:15");
  const [activeTab, setActiveTab] = useState<Tab>("Overzicht");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [state, setState] = useState<DashboardState | null>(null);
  const [busy, setBusy] = useState(false);
  const leads = useMemo(() => parseCsv(csv), [csv]);
  const activeLeads = leads.filter((lead) => normalizeStatus(lead.status) === "active");
  const stateLeadCounts = countMap(state?.leadCounts);
  const stateMailCounts = countMap(state?.mailCounts);
  const scheduled = state?.scheduled ?? [];
  const dueQueued = scheduled.filter((row) => row.status === "queued" && String(row.scheduled_at ?? "") <= new Date().toISOString()).length;

  async function api(path: string, options: { method?: string; body?: Record<string, unknown> } = {}) {
    setBusy(true);
    setResult(null);
    try {
      const response = await fetch(path, {
        method: options.method ?? "POST",
        headers: {
          "content-type": "application/json",
          "x-campaign-admin-token": token,
        },
        body: options.method === "GET" ? undefined : JSON.stringify(options.body ?? {}),
      });
      const data = (await response.json().catch(() => ({ error: "invalid_response" }))) as ApiResult;
      const nextResult = { status: response.status, ...data };
      setResult(nextResult);
      return nextResult;
    } finally {
      setBusy(false);
    }
  }

  async function refresh() {
    const data = await api("/api/campaign/state", { method: "GET" });
    setState(data as DashboardState);
  }

  async function runAction(path: string, body: Record<string, unknown>) {
    const data = await api(path, { body });
    setResult(data);
    if (token) await refresh();
  }

  async function updateLead(id: string, status: string) {
    await api("/api/campaign/leads", { method: "PATCH", body: { id, status, detail: "campaign_dashboard" } });
    await refresh();
  }

  return (
    <main className="campaign-engine-page">
      <header className="campaign-engine-hero">
        <Link className="campaign-engine-brand" href="/">
          <img src="/assets/logo.png" alt="" />
          <span>Slimmer dan Gisteren</span>
        </Link>
        <div>
          <p className="campaign-engine-kicker">Content Engine</p>
          <h1>Campagnebeheer voor vacature-leads</h1>
          <p>
            Importeer leads, plan de vijfdelige reeks, verstuur alleen wat due is en stop automatisch bij afmelding
            of geen interesse.
          </p>
        </div>
        <img className="campaign-engine-portrait" src="/assets/jimmy-buitenhuis.png" alt="Jimmy Buitenhuis" />
      </header>

      <section className="campaign-engine-toolbar">
        <div>
          <label htmlFor="token">Admin-token</label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="CAMPAIGN_ADMIN_TOKEN"
          />
        </div>
        <button disabled={busy || !token} onClick={refresh}>
          Refresh dashboard
        </button>
      </section>

      <nav className="campaign-engine-tabs" aria-label="Campagne tabs">
        {tabs.map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Overzicht" ? (
        <section className="campaign-engine-grid">
          <div className="campaign-engine-panel">
            <div className="campaign-engine-stats">
              <Metric label="actieve leads" value={stateLeadCounts.active ?? activeLeads.length} />
              <Metric label="queued mails" value={stateMailCounts.queued ?? 0} />
              <Metric label="nu due" value={dueQueued} />
              <Metric label="verzonden" value={stateMailCounts.sent ?? 0} />
              <Metric label="failed" value={stateMailCounts.failed ?? 0} />
              <Metric label="afgemeld" value={(stateLeadCounts.unsubscribed ?? 0) + (stateLeadCounts.not_interested ?? 0)} />
            </div>
          </div>

          <div className="campaign-engine-panel">
            <p className="campaign-engine-kicker">Workflow</p>
            <div className="campaign-engine-timeline">
              <Timeline day="0" title="Awareness · vacature-signaal" />
              <Timeline day="3" title="Interest · verborgen kosten" />
              <Timeline day="6" title="Desire · mechanisme" />
              <Timeline day="10" title="Action · aanbodkeuze" />
              <Timeline day="14" title="Close · relevant of stoppen" />
            </div>
            <div className="campaign-engine-actions">
              <button disabled={busy || !token} onClick={() => runAction("/api/campaign/process", { dryRun: true, limit: 25 })}>
                Dry run due mails
              </button>
              <button disabled={busy || !token} onClick={() => runAction("/api/campaign/process", { dryRun: false, limit: 25 })}>
                Verstuur due mails
              </button>
            </div>
            <Result result={result} />
          </div>
        </section>
      ) : null}

      {activeTab === "Import" ? (
        <section className="campaign-engine-grid wide-left">
          <div className="campaign-engine-panel">
            <label htmlFor="leads">Leadlijst CSV</label>
            <textarea id="leads" value={csv} onChange={(event) => setCsv(event.target.value)} spellCheck={false} />
            <p className="campaign-engine-help">
              Kolommen: `email`, `voornaam`, `bedrijf`, `functie`, `vacature_haakje`,
              `persoonlijke_observatie`, `status`.
            </p>
          </div>
          <div className="campaign-engine-panel">
            <div className="campaign-engine-stats compact">
              <Metric label="in CSV" value={leads.length} />
              <Metric label="actief" value={activeLeads.length} />
              <Metric label="uitgesloten" value={leads.length - activeLeads.length} />
            </div>
            <div className="campaign-engine-controls">
              <div>
                <label htmlFor="start">Startdatum</label>
                <input id="start" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
              </div>
              <div>
                <label htmlFor="time">Tijd</label>
                <select id="time" value={sendTime} onChange={(event) => setSendTime(event.target.value)}>
                  <option value="09:15">09:15</option>
                  <option value="10:30">10:30</option>
                  <option value="13:15">13:15</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>
            <div className="campaign-engine-actions">
              <button disabled={busy || !token} onClick={() => runAction("/api/campaign/leads", { leads })}>
                Leads importeren
              </button>
              <button disabled={busy || !token} onClick={() => runAction("/api/campaign/schedule", { startDate, sendTime })}>
                Planning maken
              </button>
            </div>
            <Result result={result} />
          </div>
        </section>
      ) : null}

      {activeTab === "Planning" ? (
        <DataPanel
          title="Planning"
          rows={scheduled}
          columns={["scheduled_at", "email", "company", "step", "subject", "status", "sent_at", "last_error"]}
          empty="Nog geen planning geladen. Klik eerst op Refresh dashboard."
        />
      ) : null}

      {activeTab === "Leads" ? (
        <DataPanel
          title="Leads"
          rows={state?.leads ?? []}
          columns={["email", "first_name", "company", "role", "status", "source", "updated_at"]}
          empty="Nog geen leads geladen."
          renderActions={(row) => (
            <div className="campaign-engine-row-actions">
              <button onClick={() => updateLead(String(row.id), "active")} disabled={busy || !token}>Actief</button>
              <button onClick={() => updateLead(String(row.id), "not_interested")} disabled={busy || !token}>Geen interesse</button>
              <button onClick={() => updateLead(String(row.id), "unsubscribed")} disabled={busy || !token}>Afmelden</button>
            </div>
          )}
        />
      ) : null}

      {activeTab === "Afmeldingen" ? (
        <DataPanel
          title="Afmeldingen en suppressions"
          rows={state?.suppressions ?? []}
          columns={["email", "reason", "created_at"]}
          empty="Nog geen afmeldingen."
        />
      ) : null}

      {activeTab === "Log" ? (
        <DataPanel
          title="Campagnelog"
          rows={state?.events ?? []}
          columns={["created_at", "email", "type", "detail"]}
          empty="Nog geen events."
        />
      ) : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Timeline({ day, title }: { day: string; title: string }) {
  return (
    <div>
      <span>Dag {day}</span>
      <strong>{title}</strong>
    </div>
  );
}

function Result({ result }: { result: ApiResult | null }) {
  return (
    <div className="campaign-engine-result">
      <p className="campaign-engine-kicker">Resultaat</p>
      <pre>{result ? JSON.stringify(result, null, 2) : "Nog geen actie uitgevoerd."}</pre>
    </div>
  );
}

function DataPanel({
  title,
  rows,
  columns,
  empty,
  renderActions,
}: {
  title: string;
  rows: Row[];
  columns: string[];
  empty: string;
  renderActions?: (row: Row) => ReactNode;
}) {
  return (
    <section className="campaign-engine-panel campaign-engine-table-panel">
      <div className="campaign-engine-table-heading">
        <div>
          <p className="campaign-engine-kicker">{title}</p>
          <h2>{rows.length} regels</h2>
        </div>
      </div>
      <div className="campaign-engine-table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => <th key={column}>{label(column)}</th>)}
              {renderActions ? <th>Acties</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row, index) => (
              <tr key={String(row.id ?? `${row.email}-${index}`)}>
                {columns.map((column) => <td key={column}>{formatValue(row[column])}</td>)}
                {renderActions ? <td>{renderActions(row)}</td> : null}
              </tr>
            )) : (
              <tr><td colSpan={columns.length + (renderActions ? 1 : 0)}>{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function parseCsv(text: string): LeadInput[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) ?? [];
  return rows
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()])))
    .filter((lead) => lead.email);
}

function countMap(rows?: Array<{ status: string; count: number }>) {
  return Object.fromEntries((rows ?? []).map((row) => [row.status, Number(row.count)])) as Record<string, number>;
}

function normalizeStatus(status: unknown) {
  const value = String(status || "active").trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
  if (["afgemeld", "unsubscribe", "unsubscribed"].includes(value)) return "unsubscribed";
  if (["geen_interesse", "geeninteresse", "not_interested", "niet_interessant"].includes(value)) return "not_interested";
  return "active";
}

function label(value: string) {
  return value.replaceAll("_", " ");
}

function formatValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}
