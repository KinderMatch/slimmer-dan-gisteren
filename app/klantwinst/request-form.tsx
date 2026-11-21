"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { BookingPanel } from "./booking-panel";
import { trackEvent } from "../analytics";
import { validateSubmission, type KlantwinstSubmission } from "./submission";
import styles from "./page.module.css";

const endpoint = "https://klantwinst-formulier-8864.twil.io/aanvragen";
export function KlantwinstForm() {
  const [state, setState] = useState<"loading" | "idle" | "sending" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [contact, setContact] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof KlantwinstSubmission, string>>>({});
  const startedAt = useRef(0);
  const attempt = useRef({ id: "", data: "" });
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => { startedAt.current = Date.now(); setState("idle"); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || state === "success") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const check = validateSubmission(Object.fromEntries(fields));
    if (!check.ok) {
      setErrors(check.fields);
      const first = Object.keys(check.fields)[0];
      (form.elements.namedItem(first) as HTMLInputElement)?.focus();
      return;
    }
    setErrors({}); setMessage(""); setState("sending");
    const serialized = JSON.stringify(check.value);
    if (attempt.current.data !== serialized) attempt.current = { id: crypto.randomUUID(), data: serialized };
    try {
      const res = await fetch(endpoint, {
        method: "POST", credentials: "omit", signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.value, submissionId: attempt.current.id, startedAt: startedAt.current, companyFax: String(fields.get("companyFax") || "") }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        if (res.status === 422 && result.fields) setErrors(result.fields);
        throw new Error(res.status === 429 ? "Er zijn te veel aanvragen kort achter elkaar verstuurd. Probeer het later opnieuw of mail Jimmy rechtstreeks." : "Wij kunnen je aanvraag nu niet bevestigen. Je gegevens blijven ingevuld. Probeer opnieuw of mail Jimmy rechtstreeks.");
      }
      setReference(result.reference); setContact({ name: check.value.name, email: check.value.email }); setState("success");
      trackEvent("generate_lead", { form_id: "klantwinst-check" });
      requestAnimationFrame(() => status.current?.focus());
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error && !["TimeoutError", "TypeError", "AbortError"].includes(error.name) ? error.message : "Wij kunnen je aanvraag nu niet bevestigen. Probeer opnieuw; dezelfde aanvraag wordt niet dubbel verstuurd. Je kunt Jimmy ook rechtstreeks mailen.");
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  const errorProps = (key: keyof KlantwinstSubmission) => ({ "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `kw-${key}-error` : undefined });
  const errorText = (key: keyof KlantwinstSubmission) => errors[key] && <small id={`kw-${key}-error`} className={styles.fieldError}>{errors[key]}</small>;
  return <form className={`${styles.form} ${state === "success" ? styles.formSuccess : ""}`} onSubmit={submit} aria-labelledby="form-title" aria-busy={state === "sending"}>
    <h3 id="form-title">{state === "success" ? "Plan je gratis analysegesprek" : "Vraag de gratis check aan"}</h3>
    {state === "success" ? <><div className={styles.draft} role="status" tabIndex={-1} ref={status}>
      <strong>Bedankt, je aanvraag is ontvangen.</strong>
      <p>Je gegevens zijn opgeslagen. Kies hieronder direct een datum en tijd voor je analysegesprek.</p>
      <p>Je ontvangt ook een bevestiging per e-mail. Niets ontvangen? Controleer je spammap. Je aanvraag is opgeslagen.</p>
      <small>Referentie: {reference}</small>
    </div><BookingPanel name={contact.name} email={contact.email} /></> : <>
      <p>Deel je website, aanbod en doel. Na het versturen kun je direct een geschikt moment kiezen in Calendly. Jimmy bereidt je analyse voor.</p>
      <label htmlFor="kw-name">Naam<input id="kw-name" name="name" autoComplete="name" required maxLength={150} {...errorProps("name")} />{errorText("name")}</label>
      <label htmlFor="kw-email">E-mailadres<input id="kw-email" name="email" type="email" autoComplete="email" required maxLength={254} {...errorProps("email")} /><small>Hierop ontvang je de bevestiging en onze persoonlijke reactie.</small>{errorText("email")}</label>
      <label htmlFor="kw-site">Website<input id="kw-site" name="website" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="jouwbedrijf.nl" required maxLength={300} {...errorProps("website")} />{errorText("website")}</label>
      <label htmlFor="kw-offer">Welk product of welke dienst wil je laten beoordelen?<input id="kw-offer" name="offer" required maxLength={300} {...errorProps("offer")} /><small>Kies één aanbod waarop wij ons richten.</small>{errorText("offer")}</label>
      <label htmlFor="kw-goal">Wat wil je bereiken?<textarea id="kw-goal" name="goal" rows={3} required maxLength={1200} placeholder="Bijvoorbeeld: meer passende intakeafspraken." {...errorProps("goal")} />{errorText("goal")}</label>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="kw-fax">Laat dit veld leeg<input id="kw-fax" name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
      <p className={styles.formPrivacy}>Alle velden zijn verplicht. Deel geen klantgegevens, medische informatie of wachtwoorden. Wij gebruiken je gegevens om je aanvraag te behandelen. Na verzending openen wij Calendly om je afspraak te plannen; je naam en e-mailadres vullen wij daar alvast in. <a href="/privacy/">Lees de privacyverklaring</a>.</p>
      <button className={styles.cta} type="submit" disabled={state === "loading" || state === "sending"}>{state === "sending" ? "Je aanvraag wordt verstuurd…" : "Vraag mijn gratis Klantwinst-check aan"}<span aria-hidden="true">↗</span></button>
      {state === "error" && <div className={styles.formError} role="alert" tabIndex={-1} ref={status}><strong>{message}</strong><p>Mail je website, aanbod en doel naar <a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a>.</p></div>}
      <noscript><p>Dit formulier heeft JavaScript nodig. Mail je website, aanbod en doel naar <a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a>.</p></noscript>
    </>}
    <p className={styles.formPrivacy}>Gratis en vrijblijvend. Met deze aanvraag ga je geen betaalde samenwerking aan.</p>
  </form>;
}
