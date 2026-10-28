import type { Metadata } from "next";
import type { Language } from "../language";
import { SiteShell } from "../site-content";
import { JsonLd } from "../json-ld";
import { absoluteUrl, breadcrumbJsonLd } from "../seo";
import { languageAlternates, pathForLanguage } from "../i18n";
import content from "./landing-content.json";

type Topic = keyof typeof content;
const labels = {
  nl: { more: "SEO verdieping", contact: "Bespreek je website", overview: "Alle SEO-diensten", nav: "Op deze pagina", questions: "Veelgestelde vragen", next: "Van inzicht naar uitvoering", nextText: "Bespreek je website en doelen rechtstreeks met Jimmy. We bepalen samen welke werkzaamheden passen; uitvoering begint na afspraken over omvang en kosten.", read: "Lees verder", source: "Officiële achtergrond", related: "Verder met je SEO-aanpak" },
  en: { more: "SEO in detail", contact: "Discuss your website", overview: "All SEO services", nav: "On this page", questions: "Frequently asked questions", next: "From insight to implementation", nextText: "Discuss your website and goals directly with Jimmy. Together we decide which tasks fit; implementation starts after scope and costs are agreed.", read: "Read more", source: "Official guidance", related: "Continue your SEO work" },
  es: { more: "SEO en detalle", contact: "Hablemos de tu web", overview: "Todos los servicios SEO", nav: "En esta página", questions: "Preguntas frecuentes", next: "Del análisis a la ejecución", nextText: "Habla directamente con Jimmy sobre tu web y objetivos. Juntos decidimos qué tareas encajan; la ejecución comienza tras acordar alcance y costes.", read: "Leer más", source: "Orientación oficial", related: "Continúa con tu estrategia SEO" },
};
export function landingMetadata(topic: Topic, locale: Language = "nl"): Metadata {
  const data = content[topic], i = locale === "nl" ? 0 : locale === "en" ? 1 : 2;
  const path = `/seo/${data.slug}/`;
  return { title: data.metaTitle[i], description: data.description[i], alternates: { ...languageAlternates(path), canonical: pathForLanguage(path, locale) }, openGraph: { title: data.title[i], description: data.description[i], url: absoluteUrl(pathForLanguage(path, locale)), type: "website" } };
}
export function SeoLanding({ topic, locale = "nl" }: { topic: Topic; locale?: Language }) {
  const data = content[topic], i = locale === "nl" ? 0 : locale === "en" ? 1 : 2, l = labels[locale];
  const t = (value: string[]) => value[i];
  const href = (path: string) => pathForLanguage(path, locale);
  const other = content[topic === "local" ? "outsource" : "local"];
  const related = [
    { path: `/seo/${other.slug}/`, title: t(other.title), text: t(other.description) },
    { path: "/seo/technische-seo/", title: ["Technische SEO", "Technical SEO", "SEO técnico"][i], text: ["Controleer bereikbaarheid, indexering en gebruik op mobiel.", "Check crawl access, indexing and mobile usability.", "Comprueba el rastreo, la indexación y el uso en móviles."][i] },
    { path: "/seo/zoekwoordenonderzoek/", title: ["Zoekwoordenonderzoek", "Keyword research", "Investigación de palabras clave"][i], text: ["Koppel de juiste zoekvraag aan de juiste pagina.", "Match the right query to the right page.", "Asocia cada búsqueda con la página adecuada."][i] },
  ];
  return <SiteShell premiumNavigation initialLanguage={locale}>
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: href("/") }, { name: "SEO", path: href("/seo/") }, { name: t(data.title), path: href(`/seo/${data.slug}/`) }])} />
    <div className="seo-landing">
      <header className="sl-hero"><div className="sl-wrap">
        <nav className="sl-crumb" aria-label="Breadcrumb"><a href={href("/")}>Home</a><span>/</span><a href={href("/seo/")}>SEO</a><span>/</span><span>{t(data.title).split(":")[0]}</span></nav>
        <p className="sl-eyebrow">{l.more}</p><h1>{t(data.title)}</h1><p className="sl-intro">{t(data.intro)}</p>
        <div className="sl-actions"><a className="sl-button" href={href("/seo/#seo-scan")}>{l.contact}<span aria-hidden="true"> ↗</span></a><a className="sl-textlink" href={href("/seo/")}>{l.overview}</a></div>
        <ol className="sl-route" aria-label={l.nav}>{data.steps.map((step, n) => <li key={n}><span aria-hidden="true">0{n + 1}</span>{t(step)}</li>)}</ol>
      </div></header>
      <div className="sl-wrap sl-body"><nav className="sl-index" aria-label={l.nav}><strong>{l.nav}</strong>{data.sections.map((section, n) => <a href={`#${section.id}`} key={section.id}><span aria-hidden="true">0{n+1}</span>{t(section.heading)}</a>)}<a href="#vragen">{l.questions}</a></nav>
      <div className="sl-content">{data.sections.map((section, n) => <section id={section.id} key={section.id} className="sl-section"><p className="sl-eyebrow">0{n+1}</p><h2>{t(section.heading)}</h2>{section.paragraphs.map((p, j) => <p key={j}>{t(p)}</p>)}{'cards' in section && section.cards ? <div className="sl-cards">{section.cards.map((card, j) => <article key={j}><h3>{t(card[0])}</h3><p>{t(card[1])}</p></article>)}</div> : null}</section>)}
      <section id="vragen" className="sl-section sl-faq"><h2>{l.questions}</h2>{data.faq.map((item, n) => <details key={n}><summary>{t(item[0])}</summary><p>{t(item[1])}</p></details>)}</section>
      <aside className="sl-source"><span>{l.source}: </span><a href={data.source}>{t(data.sourceLabel)}</a>{"additionalSources" in data ? data.additionalSources.map(source => <span key={source.url}>{" · "}<a href={source.url}>{t(source.label)}</a></span>) : null}</aside>
      <section className="sl-contact"><h2>{l.next}</h2><p>{l.nextText}</p><div className="sl-actions"><a className="sl-button" href={href("/seo/#seo-scan")}>{l.contact}</a><a className="sl-textlink" href={href("/seo/")}>{l.overview}</a></div></section></div></div>
      <section className="sl-wrap sl-related"><h2>{l.related}</h2><div className="sl-cards">{related.map(item => <a key={item.path} href={href(item.path)}><h3>{item.title}</h3><p>{item.text}</p><span>{l.read} <span aria-hidden="true">↗</span></span></a>)}</div></section>
    </div>
  </SiteShell>;
}
