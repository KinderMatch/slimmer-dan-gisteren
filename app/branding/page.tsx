import { ContentGallery, PageHero, SiteShell, VideoGrid } from "../site-content";

export const metadata = {
  title: "Social media - Slimmer dan Gisteren",
  description:
    "Online zichtbaarheid, social media beheer, social advertising en videocases door Slimmer dan Gisteren.",
};

export default function BrandingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Online zichtbaarheid"
        title="Social media beheer en advertising voor merken die zichtbaar willen groeien."
        intro="Een sterke digitale aanwezigheid helpt jouw doelgroep je merk te vinden, herkennen en vertrouwen."
        cta="Kennismaken"
      />

      <section className="section narrow">
        <blockquote className="intro-quote">
          In het huidige marketinglandschap is alleen een mooi product hebben
          niet meer genoeg. De drukke winkelstraat waar klanten jouw merk
          vinden, is het internet.
        </blockquote>
      </section>

      <section className="section media-band">
        <div className="section-heading">
          <p className="eyebrow">Videocases</p>
          <h2>Klantcases social advertising.</h2>
        </div>
        <VideoGrid />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Contentkalender</p>
          <h2>Voorbeelden van social content.</h2>
        </div>
        <ContentGallery />
      </section>
    </SiteShell>
  );
}
