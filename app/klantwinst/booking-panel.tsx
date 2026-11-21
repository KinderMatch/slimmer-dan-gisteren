"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics";
import { isBookingConfirmation, klantwinstBookingUrl } from "./booking";
import styles from "./page.module.css";

type CalendlyWidget = { initInlineWidget(options: { url: string; parentElement: HTMLElement; prefill: { name: string; email: string }; resize: boolean }): void };
declare global { interface Window { Calendly?: CalendlyWidget } }
let loader: Promise<CalendlyWidget> | undefined;
function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (!loader) loader = new Promise<CalendlyWidget>((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => { script.remove(); reject(new Error("Calendly unavailable")); }, 20000);
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => { window.clearTimeout(timeout); window.Calendly ? resolve(window.Calendly) : reject(new Error("Calendly unavailable")); };
    script.onerror = () => { window.clearTimeout(timeout); script.remove(); reject(new Error("Calendly unavailable")); };
    document.head.appendChild(script);
  }).catch(error => { loader = undefined; throw error; });
  return loader;
}

export function BookingPanel({ name, email }: { name: string; email: string }) {
  const widget = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const confirmed = useRef(false);
  const [failed, setFailed] = useState(false);
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const host = widget.current;
    if (!host) return;
    let stopped = false;
    const listener = (event: MessageEvent) => {
      if (confirmed.current || !isBookingConfirmation(event, host.querySelector("iframe")?.contentWindow)) return;
      confirmed.current = true;
      setBooked(true);
      trackEvent("schedule_appointment", { form_id: "klantwinst-check", provider: "calendly" });
      requestAnimationFrame(() => heading.current?.focus());
    };
    const observer = new MutationObserver(() => host.querySelector("iframe")?.setAttribute("title", "Plan je gratis Klantwinst-check via Calendly"));
    observer.observe(host, { childList: true });
    window.addEventListener("message", listener);
    loadCalendly().then(calendly => {
      if (stopped) return;
      const url = new URL(klantwinstBookingUrl);
      url.searchParams.set("hide_event_type_details", "1");
      url.searchParams.set("primary_color", "25608a");
      calendly.initInlineWidget({ url: url.toString(), parentElement: host, prefill: { name, email }, resize: true });
    }).catch(() => { if (!stopped) setFailed(true); });
    return () => { stopped = true; observer.disconnect(); window.removeEventListener("message", listener); host.replaceChildren(); };
  }, [name, email]);
  return <section className={styles.booking} aria-labelledby="kw-booking-title">
    <div className={styles.bookingCopy}>
      <p className={styles.eyebrow}>VOLGENDE STAP</p>
      <h3 id="kw-booking-title" ref={heading} tabIndex={-1}>{booked ? "Je gesprek is ingepland." : "Kies een datum en tijd voor je gratis check."}</h3>
      <p>{booked ? "Calendly stuurt je de afspraakbevestiging met de datum, het tijdstip en de link voor het gesprek. Via die bevestiging kun je de afspraak ook verplaatsen of annuleren." : "Plan hieronder je analysegesprek van 20 minuten. Je ziet de actuele beschikbaarheid uit Jimmy’s Calendly-agenda. Je naam en e-mailadres zijn alvast ingevuld."}</p>
      {failed && <p role="alert">De planner kon niet worden geladen. Je aanvraag is wel opgeslagen. Open Calendly via de link hieronder om je gesprek te plannen.</p>}
    </div>
    {!failed && <div ref={widget} className={styles.bookingWidget} />}
    <div className={styles.bookingCopy}>
      <p><a href={klantwinstBookingUrl} target="_blank" rel="noopener noreferrer">Open de planner in een apart tabblad</a></p>
      {!booked && <p>Geen passend moment? Je aanvraag blijft bewaard. Jimmy neemt binnen twee werkdagen persoonlijk contact met je op; wij streven naar één werkdag.</p>}
    </div>
  </section>;
}
