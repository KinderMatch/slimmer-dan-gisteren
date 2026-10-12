"use client";

import { useState, type FormEvent } from "react";

type ScanFormProps = {
  fields: string[];
  formId: string;
  pageTitle: string;
  pageSlug: string;
  submitLabel: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function inputType(field: string) {
  const normalized = field.toLowerCase();
  if (normalized.includes("e-mail") || normalized.includes("email")) return "email";
  if (normalized.includes("website") || normalized.includes("url")) return "url";
  if (normalized.includes("telefoon")) return "tel";
  return "text";
}

function isRequired(field: string) {
  const normalized = field.toLowerCase();
  return ["naam", "bedrijfsnaam", "e-mailadres", "email", "website"].some((part) => normalized.includes(part));
}

export function ScanForm({ fields, formId, pageTitle, pageSlug, submitLabel }: ScanFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(fields.map((field) => [field, String(formData.get(field) || "").trim()]));

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
      setMessage("Er ging iets mis met verzenden. Probeer het opnieuw of mail direct naar jimmy@slimmerdangisteren.nl.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        const fieldId = `${formId}-${field.toLowerCase().replaceAll(" ", "-")}`;
        const isTextarea = field.toLowerCase().includes("bericht") || field.toLowerCase().includes("doel");
        return (
          <label htmlFor={fieldId} key={field}>
            <span>{field}</span>
            {isTextarea ? (
              <textarea id={fieldId} name={field} rows={4} />
            ) : (
              <input id={fieldId} name={field} type={inputType(field)} required={isRequired(field)} />
            )}
          </label>
        );
      })}
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
