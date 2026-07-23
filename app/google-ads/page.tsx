import { GoogleAdsCards, PageHero, SiteShell, Testimonials } from "../site-content";

export const metadata = {
  title: "Google Ads - Slimmer dan Gisteren",
  description:
    "Google Ads beheer, strategie, tracking, optimalisatie en rapportage door Slimmer dan Gisteren.",
};

export default function GoogleAdsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Google Ads"
        title="Beter vindbaar worden voor meer naamsbekendheid of conversies."
        intro="Breng vraag en aanbod snel bij elkaar met campagnes die meetbaar, begrijpelijk en continu geoptimaliseerd zijn."
        cta="Slim uitbesteden"
      />

      <section className="section narrow">
        <h2>Wat kun je verwachten?</h2>
        <p>
          Wij nemen het volledige beheer van jouw Google Ads uit handen. Van
          strategie en campagne-opzet tot optimalisatie en rapportage: alles is
          gericht op maximale zichtbaarheid, meer klikken en hogere conversie.
        </p>
      </section>

      <section className="section">
        <GoogleAdsCards />
      </section>

      <section className="section soft">
        <div className="section-heading">
          <p className="eyebrow">Klantcases</p>
          <h2>Wat klanten van Google Ads bij Slimmer dan Gisteren vinden.</h2>
        </div>
        <Testimonials />
      </section>
    </SiteShell>
  );
}
