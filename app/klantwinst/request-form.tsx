"use client";

import { useEffect, useState, type FormEvent } from "react";
import { trackEvent } from "../analytics";
import styles from "./page.module.css";

export function KlantwinstForm() {
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = ["Hoi Jimmy,", "", "Ik vraag graag de gratis Klantwinst-check aan.", "", ...["Naam", "E-mailadres", "Website", "Product of dienst", "Doel"].map(label => `${label}: ${String(data.get(label) || "").trim()}`), "", "Pagina: https://slimmerdangisteren.nl/klantwinst/"].join("\n");
    setDraft(`mailto:jimmy@slimmerdangisteren.nl?subject=${encodeURIComponent("Aanvraag gratis Klantwinst-check")}&body=${encodeURIComponent(body)}`);
    trackEvent("form_email_prepared", { form_id: "klantwinst-check" });
  }
  return <form className={styles.form} onSubmit={prepare} onChange={() => setDraft("")} aria-labelledby="form-title">
    <h3 id="form-title">Vraag de gratis check aan</h3>
    <p>Vul je gegevens in. We zetten een aanvraagmail klaar die je zelf vanuit je e-mailprogramma verstuurt.</p>
    <label htmlFor="kw-name">Naam<input id="kw-name" name="Naam" autoComplete="name" required maxLength={150} /></label>
    <label htmlFor="kw-email">E-mailadres<input id="kw-email" name="E-mailadres" type="email" autoComplete="email" required maxLength={254} /><small>Hierop reageren we om het analysegesprek te plannen.</small></label>
    <label htmlFor="kw-site">Website<input id="kw-site" name="Website" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} placeholder="jouwbedrijf.nl" required maxLength={300} /></label>
    <label htmlFor="kw-offer">Welk product of welke dienst wil je laten beoordelen?<input id="kw-offer" name="Product of dienst" required maxLength={300} /><small>Kies één aanbod waarop we ons richten.</small></label>
    <label htmlFor="kw-goal">Wat wil je bereiken?<textarea id="kw-goal" name="Doel" rows={3} required maxLength={1200} placeholder="Bijvoorbeeld: meer passende intakeafspraken." /></label>
    <p className={styles.formPrivacy}>Alle velden zijn verplicht. Deel geen klantgegevens, medische informatie of wachtwoorden. We gebruiken je gegevens om je aanvraag te behandelen. <a href="/privacy/">Lees de privacyverklaring</a>.</p>
    <button className={styles.cta} type="submit" disabled={!ready}>Zet mijn aanvraagmail klaar <span aria-hidden="true">↗</span></button>
    {draft && <div className={styles.draft} role="status"><strong>Je aanvraagmail staat klaar. Er is nog niets verzonden.</strong><p>Open de mail met de knop hieronder en verstuur deze zelf. We streven naar een reactie binnen één werkdag; uiterlijk binnen twee werkdagen na ontvangst.</p><a href={draft} className={styles.cta}>Open en verstuur mijn aanvraag <span aria-hidden="true">↗</span></a><p>Geen e-mailprogramma? Mail je website, aanbod en doel naar <a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a>.</p></div>}
    <noscript><p>Dit formulier heeft JavaScript nodig om je mail klaar te zetten. Mail je website, aanbod en doel naar <a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a>.</p></noscript>
    <p className={styles.formPrivacy}>Met deze aanvraag ga je geen betaalde samenwerking aan.</p>
  </form>;
}
