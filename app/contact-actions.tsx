"use client";

import { Text, useLanguage, type LocalizedString } from "./language";

const t = (nl: string, en: string, es: string): LocalizedString => ({ nl, en, es });

export const calendlyUrl = "https://calendly.com/buitenhuisj004/bmc-sessie";
export const whatsappUrl =
  "https://wa.me/31610175027?text=Hoi%20Jimmy%2C%20ik%20wil%20graag%20even%20sparren%20over%20Slimmer%20dan%20Gisteren.";

const mailSubjects = {
  en: "Question about Slimmer dan Gisteren",
  es: "Pregunta sobre Slimmer dan Gisteren",
  nl: "Vraag over Slimmer dan Gisteren",
};

export function useMailUrl() {
  const { language } = useLanguage();
  return `mailto:jimmy@slimmerdangisteren.nl?subject=${encodeURIComponent(mailSubjects[language])}`;
}

export function ContactDock() {
  const mailUrl = useMailUrl();

  return (
    <aside className="contact-dock" aria-label="Contactopties">
      <a className="contact-dock-primary" href={calendlyUrl} aria-label="Plan een strategiegesprek via Calendly">
        <Text value={t("Plan gesprek", "Plan call", "Agenda llamada")} />
      </a>
      <a href={whatsappUrl} aria-label="Stuur een WhatsApp bericht">WhatsApp</a>
      <a href={mailUrl} aria-label="Stuur een e-mail naar Jimmy">Mail</a>
    </aside>
  );
}

export function ContactActionGroup({
  className = "",
  primaryLabel,
}: {
  className?: string;
  primaryLabel?: LocalizedString | string;
}) {
  const mailUrl = useMailUrl();

  return (
    <div className={`contact-action-wrap ${className}`}>
      <div className="contact-action-group">
        <a className="button primary" href={calendlyUrl} aria-label="Plan een strategiegesprek via Calendly">
          <Text value={primaryLabel ?? t("Plan kennismaking", "Book an introduction", "Agenda una llamada")} />
        </a>
        <a className="button ghost" href={whatsappUrl} aria-label="Stuur een WhatsApp bericht">
          WhatsApp
        </a>
        <a className="button ghost" href={mailUrl} aria-label="Stuur een e-mail naar Jimmy">
          Mail
        </a>
      </div>
      <p className="contact-microcopy">
        <Text value={t(
          "Vrijblijvend. Reactie meestal binnen een werkdag.",
          "No obligation. Usually a reply within one working day.",
          "Sin compromiso. Normalmente respuesta en un dia laborable.",
        )} />
      </p>
    </div>
  );
}
