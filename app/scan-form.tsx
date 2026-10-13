"use client";

import { useState, type FormEvent } from "react";

type ScanFormProps = {
  fields: string[];
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

export function ScanForm({ fields, formId, includePrivacyConsent = false, pageTitle, pageSlug, submitLabel }: ScanFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) || "").trim()]));
    const fallbackMail = buildFallbackMail(values, pageTitle, typeof window !== "undefined" ? window.location.href : pageSlug);

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
      setMessage("Bedankt. We hebben je aanvraag ontvangen en nemen binnen 3 werkdagen contact met je op.");
    } catch {
      setState("error");
      setMessage("Het automatische formulier kon niet verzenden. Open je e-mailprogramma om je aanvraag direct naar jimmy@slimmerdangisteren.nl te sturen.");
      window.location.href = fallbackMail;
    }
  }

  return (
    <form
      action="/api/scan"
      method="post"
      onSubmit={handleSubmit}
      toolautosubmit="false"
      tooldescription={`Vraag een scan of strategiesessie aan voor ${pageTitle}.`}
      toolname={`${formId}-aanvraag`}
    >
      {fields.map((field) => {
        const fieldId = `${formId}-${field.toLowerCase().replaceAll(" ", "-")}`;
        const isTextarea = field.toLowerCase().includes("bericht") || field.toLowerCase().includes("doel");
        return (
          <label htmlFor={fieldId} key={field}>
            <span>{field}</span>
            {isTextarea ? (
              <textarea id={fieldId} name={field} rows={4} toolparamdescription={fieldDescription(field)} />
            ) : (
              <input
                autoCapitalize={inputMode(field) === "url" ? "none" : undefined}
                autoComplete={autoComplete(field)}
                autoCorrect={inputMode(field) === "url" ? "off" : undefined}
                id={fieldId}
                inputMode={inputMode(field)}
                name={field}
                placeholder={inputMode(field) === "url" ? "bijv. slimmerdangisteren.nl of https://..." : undefined}
                required={isRequired(field)}
                toolparamdescription={fieldDescription(field)}
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
            toolparamdescription="Bevestiging dat de aanvraag volgens het privacybeleid mag worden verwerkt."
            type="checkbox"
          />
          <span>Ik ga akkoord met verwerking volgens het privacybeleid.</span>
        </label>
      ) : null}
      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Versturen..." : submitLabel}
      </button>
      {message ? (
        <p className={`focus-form-status ${state === "success" ? "success" : "error"}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function buildFallbackMail(values: Record<string, string>, pageTitle: string, pageUrl: string) {
  const rows = Object.entries(values)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const subject = encodeURIComponent(`Nieuwe aanvraag: ${pageTitle}`);
  const body = encodeURIComponent(
    [
      "Hoi Jimmy,",
      "",
      "Ik wil graag een scan aanvragen.",
      "",
      rows,
      pageUrl ? `\nPagina: ${pageUrl}` : "",
    ].join("\n"),
  );

  return `mailto:jimmy@slimmerdangisteren.nl?subject=${subject}&body=${body}`;
}
