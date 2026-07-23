import { PageHero, SiteShell, WebsitePortfolio } from "../site-content";

export const metadata = {
  title: "Websitebeheer - Slimmer dan Gisteren",
  description:
    "Websitebeheer, websites maken en websites marketingklaar houden door Slimmer dan Gisteren.",
};

export default function WebsitePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Websitebeheer"
        title="Websites maken, beheren en optimaliseren zonder ruis."
        intro="In opdracht beheren wij bestaande websites of maken wij websites in samenwerking met ondernemers en externe bouwers."
        cta="Website uitbesteden"
      />

      <section className="section narrow">
        <p>
          Vaak ontstaat er ruis tussen marketing en websitebouwer. Daarom helpt
          Slimmer dan Gisteren met websitebeheer, optimalisatie en praktische
          verbeteringen vanuit een aanspreekpunt.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h2>Enkele websites uit beheer en samenwerking.</h2>
        </div>
        <WebsitePortfolio />
      </section>

      <section className="section">
        <div className="advantage-grid">
          <article>
            <h3>Snel contact & directe oplossingen</h3>
            <p>We reageren snel, geven duidelijke uitleg en lossen problemen gericht op.</p>
          </article>
          <article>
            <h3>Marketing gereed</h3>
            <p>Websites worden niet alleen mooi, maar ook klaar voor campagnes en conversie.</p>
          </article>
          <article>
            <h3>Alles-in-een service</h3>
            <p>Website maken, beheren en optimaliseren vanuit een praktische samenwerking.</p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
