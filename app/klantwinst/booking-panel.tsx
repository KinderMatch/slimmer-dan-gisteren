"use client";

import { BookingSteps } from "./booking-steps";
import { klantwinstBookingLink } from "./booking";
import styles from "./page.module.css";

export function BookingPanel({ name, email, reference }: { name: string; email: string; reference: string }) {
  return <section className={styles.booking} aria-labelledby="kw-booking-title">
    <div className={styles.bookingCopy}>
      <BookingSteps current={2} />
      <h3 id="kw-booking-title">Kies een datum en tijd voor je gratis Klantwinst-check.</h3>
      <p>De planner opent in een nieuw tabblad. Je naam en e-mailadres zijn alvast ingevuld. Kies een moment en bevestig je afspraak.</p>
      <p><a className={styles.bookingCta} href={klantwinstBookingLink(name, email)} target="_blank" rel="noopener noreferrer">Open de planner <span aria-hidden="true">↗</span></a></p>
      <p className={styles.bookingReassurance}>Geen nieuw tabblad geopend? Gebruik de knop hierboven. Het gesprek duurt maximaal 20 minuten en is via Google Meet.</p>
      <p className={styles.bookingReassurance}>Nog geen passend moment? Je aanvraag blijft opgeslagen. Jimmy neemt binnen twee werkdagen contact met je op. De boekingslink staat ook in je bevestigingsmail.</p>
      <small className={styles.bookingReference}>Referentie van je aanvraag: {reference}</small>
    </div>
  </section>;
}
