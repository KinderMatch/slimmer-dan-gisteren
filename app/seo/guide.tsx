import { localizeServiceTree, translateCopy, localizedHref } from "../localize-service-tree";
import type { Language } from "../language";
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { SiteShell } from "../site-content";
import { JsonLd } from "../json-ld";
import { breadcrumbJsonLd } from "../seo";
import contentDates from "../content-dates.json";

export function SeoGuide({ title, intro, path, children, locale = "nl" }: { locale?: Language; title: string; intro: string; path: string; children: ReactNode }) {
  const modified = (contentDates as Record<string, string>)[localizedHref(path, locale)] ?? "2026-10-26";
  const dateLabel = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(modified));
  const sections = Children.toArray(children).filter(isValidElement) as ReactElement<{ children?: ReactNode; id?: string }>[];
  const navigation = sections.map((section, index) => {
    const heading = Children.toArray(section.props.children).find(child => isValidElement(child) && child.type === "h2") as ReactElement<{ children?: ReactNode }> | undefined;
    return { id: section.props.id ?? `onderdeel-${index + 1}`, label: heading?.props.children, section };
  });
  return <SiteShell premiumNavigation initialLanguage={locale}><JsonLd data={breadcrumbJsonLd([{name:"Home",path:localizedHref("/",locale)},{name:"SEO",path:localizedHref("/seo/",locale)},{name:translateCopy(title,locale),path:localizedHref(path,locale)}])}/>
    {localizeServiceTree(
    <div className="service-premium focus-premium-page focus-compact-page focus-seo-page seo-guide">
      <section className="section focus-seo-depth"><div className="focus-seo-depth-heading">
        <nav className="seo-breadcrumbs" aria-label="Broodkruimel"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/seo/">SEO</a><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>
        <p className="eyebrow">SEO in de praktijk</p><h1>{title}</h1><p>{intro}</p>
        <p>Uitgegeven door <a href="/seo/#seo-uitbesteden">Slimmer dan Gisteren</a> · <time dateTime={modified}>{dateLabel}</time></p>
        <p><a href="/seo/">Bekijk onze SEO-diensten en werkwijze</a></p>
      </div></section>
      <nav className="section focus-seo-jumps" aria-label="In deze handleiding">
        {navigation.map(({ id, label }) => label ? <a key={id} href={`#${id}`}>{label}</a> : null)}
      </nav>
      {navigation.map(({ id, section }) => cloneElement(section, { id, key: id }))}
      <section className="section focus-seo-depth"><h2>Maak je bevindingen uitvoerbaar</h2><p>Gebruik ons <a href="/downloads/seo-verbeterplan.csv" download>SEO-verbeterplan voor Excel of Google Sheets (CSV)</a> om per pagina de klantvraag, het bewijs, de actie en de controle vast te leggen. Het bevat drie fictieve voorbeelden en een lege werkregel; vervang ze door je eigen bevindingen.</p><p>Wil je onderzoek en uitvoering samen oppakken? Bekijk <a href="/seo/#seo-diensten">de werkzaamheden en concrete oplevering van ons SEO-traject</a>.</p></section>
      <section className="section focus-seo-depth"><h2>Hulp bij de uitvoering?</h2><p>Jimmy Buitenhuis helpt je vanuit Diemen, online of bij jou op locatie, met onderzoek en uitvoering. We bespreken eerst je website en doelen en spreken daarna de werkzaamheden af.</p><div className="focus-premium-actions"><a className="button primary" href="/seo/#seo-scan">Vraag een persoonlijke SEO check aan</a><a className="button ghost" href="/seo/#seo-kosten">Kosten en afspraken</a></div></section>
    </div>, locale)}
  </SiteShell>;
}
