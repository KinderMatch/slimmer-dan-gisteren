"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics";
import { BookingSteps } from "./booking-steps";
import { isCalendlyMessage, isBookingConfirmation, klantwinstBookingUrl } from "./booking";
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

export function BookingPanel({ name, email, reference }: { name: string; email: string; reference: string }) {
  const widget = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const confirmed = useRef(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const host = widget.current;
    if (!host) return;
    let stopped = false;
    const timeout = window.setTimeout(() => { if (!stopped) setFailed(true); }, 20000);
    const listener = (event: MessageEvent) => {
      const frame = host.querySelector("iframe")?.contentWindow;
      if (!isCalendlyMessage(event, frame)) return;
      if (["calendly.event_type_viewed", "calendly.date_and_time_selected", "calendly.event_scheduled"].includes(event.data.event)) {
        setReady(true); window.clearTimeout(timeout);
      }
      if (confirmed.current || !isBookingConfirmation(event, frame)) return;
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
    }).catch(() => { if (!stopped) { window.clearTimeout(timeout); setFailed(true); } });
    return () => { stopped = true; window.clearTimeout(timeout); observer.disconnect(); window.removeEventListener("message", listener); host.replaceChildren(); };
  }, [name, email]);
  return <section className={styles.booking} aria-labelledby="kw-booking-title">
    <div className={styles.bookingCopy}>
      <BookingSteps current={booked ? "complete" : 2} />
      <h3 id="kw-booking-title" ref={heading} tabIndex={-1}>{booked ? "Je gesprek is ingepland." : "Kies een moment voor je gratis Klantwinst-check."}</h3>
      <p>{booked ? "Calendly stuurt je de afspraakbevestiging. Daarin staan de datum, de tijd en de link voor je gesprek. Via die mail kun je ook verplaatsen of annuleren." : "20 minuten via Google Meet. Je gegevens zijn alvast ingevuld."}</p>
      {!ready && !failed && <p className={styles.bookingLoading} role="status"><span className={styles.bookingSpinner} aria-hidden="true" />Beschikbare momenten worden geladen…</p>}
      {failed && <p role="alert">De planner kon niet worden geladen. Je aanvraag is opgeslagen. Open Calendly via de link hieronder om je gesprek te plannen.</p>}
    </div>
    {!failed && <div ref={widget} className={styles.bookingWidget} data-loading={!ready || undefined} aria-hidden={!ready || undefined} />}
    <div className={styles.bookingCopy}>
      {!booked && <>
        <p className={styles.bookingFallback}><a href={klantwinstBookingUrl} target="_blank" rel="noopener noreferrer">Werkt de planner niet? Open Calendly in een nieuw tabblad</a></p>
        <p className={styles.bookingReassurance}>Nog geen passend moment? Je aanvraag blijft opgeslagen. Jimmy neemt binnen twee werkdagen contact met je op. De boekingslink staat ook in je bevestigingsmail.</p>
      </>}
      <small className={styles.bookingReference}>Referentie van je aanvraag: {reference}</small>
    </div>
  </section>;
}
