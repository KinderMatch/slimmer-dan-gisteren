"use client";

import { useLanguage, type Language } from "./language";
import { pathForLanguage } from "./i18n";
import { formCopy } from "./translations/form-copy";
import { useEffect, useState, type FormEvent } from "react";

type ScanFormProps = {
  fields: string[];
  language?: Language;
  delivery?: "server" | "email";
  formId: string;
  includePrivacyConsent?: boolean;
  pageTitle: string;
  pageSlug: string;
  submitLabel: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function inputType(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("e-mail") || normalized.includes("email")) return "email";
  if (normalized.includes("telefoon")) return "tel";
  return "text";
}

function inputMode(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("website") || normalized.includes("url") || normalized.includes("domein")) return "url";
  if (normalized.includes("telefoon")) return "tel";
  if (normalized.includes("e-mail") || normalized.includes("email")) return "email";
  return undefined;
}

function autoComplete(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("e-mail") || normalized.includes("email")) return "email";
  if (normalized.includes("telefoon")) return "tel";
  if (normalized.includes("voornaam") || normalized === "naam") return "name";
  if (normalized.includes("naam")) return "organization";
  if (normalized.includes("website") || normalized.includes("url") || normalized.includes("domein")) return "url";
  return undefined;
}

function isRequired(field: string) {
  const normalized = field.toLowerCase();
  return ["naam", "bedrijfsnaam", "e-mailadres", "email", "website"].some((part) => normalized.includes(part));
}

function fieldDescription(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("naam")) return "Naam van de contactpersoon of het bedrijf.";
  if (normalized.includes("mail")) return "E-mailadres waarop Slimmer dan Gisteren kan reageren.";
  if (normalized.includes("telefoon")) return "Telefoonnummer voor opvolging via bellen of WhatsApp.";
  if (normalized.includes("website") || normalized.includes("url") || normalized.includes("domein")) {
    return "Website of domeinnaam waarvoor de scan wordt aangevraagd.";
  }
  if (normalized.includes("doel") || normalized.includes("bericht")) return "Korte toelichting op de gewenste groei, campagne of scan.";
  return `Informatie voor het veld ${field}.`;
}

export function ScanForm({ language: requestedLanguage, delivery = "server", fields, formId, includePrivacyConsent = false, pageTitle, pageSlug, submitLabel }: ScanFormProps) {
  const { language: contextLanguage } = useLanguage();
  const language = requestedLanguage ?? contextLanguage;
  const tr = (text: string) => language === "nl" ? text : formCopy[text]?.[language] ?? text;
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) || "").trim()]));
    const fallbackMail = buildFallbackMail(values, pageTitle, typeof window !== "undefined" ? window.location.href : pageSlug, tr);

    if (delivery === "email") {
      setEmailDraft(fallbackMail);
      setState("idle");
      setMessage(tr("Je aanvraag staat klaar. Open de e-mail hieronder en verstuur deze zelf. Er is nog niets verzonden."));
      return;
    }

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fields: values,
          pageSlug,
          pageTitle,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("scan_submit_failed");
      }

      form.reset();
      setState("success");
      setMessage(tr("Bedankt. We hebben je aanvraag ontvangen en nemen binnen 3 werkdagen contact met je op."));
    } catch {
      setState("error");
      setMessage(tr("Het automatische formulier kon niet verzenden. Open je e-mailprogramma om je aanvraag direct naar jimmy@slimmerdangisteren.nl te sturen."));
      window.location.href = fallbackMail;
    }
  }

  return (
    <form
      action={delivery === "email" ? undefined : "/api/scan"}
      method="post"
      onSubmit={handleSubmit}
      onChange={delivery === "email" ? () => { setEmailDraft(""); setMessage(""); } : undefined}
      toolautosubmit="false"
      tooldescription={delivery === "email" ? (language === "en" ? `Prepare a request email for ${pageTitle}. The visitor sends it personally.` : language === "es" ? `Prepara un correo de solicitud para ${pageTitle}. El visitante lo envía personalmente.` : `Stel een aanvraagmail op voor ${pageTitle}. De bezoeker verstuurt deze zelf.`) : (language === "en" ? `Request a review or strategy session for ${pageTitle}.` : language === "es" ? `Solicita un análisis o una sesión estratégica para ${pageTitle}.` : `Vraag een scan of strategiesessie aan voor ${pageTitle}.`)}
      toolname={`${formId}-aanvraag`}
    >
      {delivery === "email" ? <p>{tr("Vul je gegevens in om een aanvraagmail klaar te zetten. Je verstuurt deze daarna vanuit je eigen e-mailprogramma. Liever direct contact?")} <a href="mailto:jimmy@slimmerdangisteren.nl">{tr("Mail Jimmy")}</a>.</p> : null}
      {fields.map((field) => {
        const fieldId = `${formId}-${field.toLowerCase().replaceAll(" ", "-")}`;
        const isTextarea = field.toLowerCase().includes("bericht") || field.toLowerCase().includes("doel");
        return (
          <label htmlFor={fieldId} key={field}>
            <span>{tr(field)}{isRequired(field) ? " *" : tr(" (optioneel)")}</span>
            {isTextarea ? (
              <textarea id={fieldId} name={field} rows={4} toolparamdescription={tr(fieldDescription(field))} />
            ) : (
              <input
                autoCapitalize={inputMode(field) === "url" ? "none" : undefined}
                autoComplete={autoComplete(field)}
                autoCorrect={inputMode(field) === "url" ? "off" : undefined}
                id={fieldId}
                inputMode={inputMode(field)}
                name={field}
                placeholder={inputMode(field) === "url" ? tr("bijv. slimmerdangisteren.nl of https://...") : undefined}
                required={isRequired(field)}
                toolparamdescription={tr(fieldDescription(field))}
                type={inputType(field)}
              />
            )}
          </label>
        );
      })}
      {includePrivacyConsent ? (
        <label className="growth-checkbox" htmlFor={`${formId}-privacy`}>
          <input
            id={`${formId}-privacy`}
            name="privacy"
            toolparamdescription={tr("Bevestiging dat de aanvraag volgens het privacybeleid mag worden verwerkt.")}
            type="checkbox"
          />
          <span>{tr("Ik ga akkoord met verwerking volgens het privacybeleid.")}</span>
        </label>
      ) : null}
      <button type="submit" disabled={state === "submitting" || (delivery === "email" && !ready)}>
        {state === "submitting" ? tr("Versturen...") : submitLabel}
      </button>
      {emailDraft ? <a className="button primary" href={emailDraft}>{tr("Open mijn aanvraag in e-mail")}</a> : null}
      {delivery === "email" ? <><p>{tr("* Verplicht. We gebruiken je gegevens om op je aanvraag te reageren.")} <a href={pathForLanguage("/privacy/", language)}>{tr("Privacybeleid")}</a>.</p><noscript><p>{tr("Stuur je website en vraag naar")} <a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a>.</p></noscript></> : null}
      {message ? (
        <p className={`focus-form-status ${state === "error" ? "error" : "success"}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function buildFallbackMail(values: Record<string, string>, pageTitle: string, pageUrl: string, tr: (text: string) => string) {
  const rows = Object.entries(values)
    .filter(([, value]) => value)
    .map(([label, value]) => `${tr(label)}: ${value}`)
    .join("\n");

  const subject = encodeURIComponent(`${tr("Nieuwe aanvraag:")} ${pageTitle}`);
  const body = encodeURIComponent(
    [
      tr("Hoi Jimmy,"),
      "",
      tr("Ik wil graag een scan aanvragen."),
      "",
      rows,
      pageUrl ? `\n${tr("Pagina:")} ${pageUrl}` : "",
    ].join("\n"),
  );

  return `mailto:jimmy@slimmerdangisteren.nl?subject=${subject}&body=${body}`;
}
