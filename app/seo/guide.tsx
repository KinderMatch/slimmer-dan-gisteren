import type { ReactNode } from "react";
import { SiteShell } from "../site-content";
import { JsonLd } from "../json-ld";
import { breadcrumbJsonLd } from "../seo";

export function SeoGuide({ title, intro, path, children }: { title: string; intro: string; path: string; children: ReactNode }) {
  return <SiteShell premiumNavigation><JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"SEO",path:"/seo/"},{name:title,path}])}/>
    <div className="service-premium focus-premium-page focus-compact-page focus-seo-page seo-guide">
      <section className="section focus-seo-depth"><div className="focus-seo-depth-heading">
        <p className="eyebrow">SEO in de praktijk</p><h1>{title}</h1><p>{intro}</p>
        <p>Door Slimmer dan Gisteren · <time dateTime="2026-10-26">26 oktober 2026</time></p>
        <p><a href="/seo/">Bekijk onze SEO-diensten en werkwijze</a></p>
      </div></section>
      {children}
      <section className="section focus-seo-depth"><h2>Hulp bij de uitvoering?</h2><p>Jimmy Buitenhuis helpt je vanuit Diemen, online of bij jou op locatie, met onderzoek en uitvoering. We bespreken eerst je website en doelen en spreken daarna de werkzaamheden af.</p><div className="focus-premium-actions"><a className="button primary" href="/seo/#seo-scan">Vraag contact aan over een SEO-scan</a><a className="button ghost" href="/seo/#seo-kosten">Kosten en afspraken</a></div><p>Deze uitleg is beschikbaar in het Nederlands. Via de taalkeuze ga je naar onze Engelstalige of Spaanstalige SEO-dienstpagina.</p></section>
    </div>
  </SiteShell>;
}
