import {
  AdsPerformanceLab,
  GoogleAdsOverview,
  PageHero,
  SiteShell,
  Testimonials,
} from "../site-content";
import { Text } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata = {
  title: "Advertenties - Slimmer dan Gisteren",
  description:
    "Advertentiebeheer, strategie, tracking, optimalisatie en rapportage door Slimmer dan Gisteren.",
};

export default function AdvertentiesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={t("Advertenties", "Advertising", "Anuncios")}
        title={t("Advertenties uitbesteden zonder black box.", "Outsource advertising without a black box.", "Externaliza tus anuncios sin caja negra.")}
        intro={t(
          "Je advertenties leveren pas rust op als zoekvraag, landingspagina, tracking en rapportage logisch samenwerken.",
          "Your ads only bring clarity when search demand, landing page, tracking and reporting work together logically.",
          "Tus anuncios solo aportan tranquilidad cuando demanda, landing page, tracking e informes trabajan juntos de forma lógica.",
        )}
        cta={t("Plan kennismaking", "Book an introduction", "Agenda una llamada")}
        tone="ads"
      />

      <section className="section ads-studio-section">
        <AdsPerformanceLab />
      </section>

      <section className="section narrow">
        <p className="eyebrow"><Text value={t("Aanpak", "Approach", "Enfoque")} /></p>
        <h2><Text value={t("Van klikken naar inzicht, en van inzicht naar betere campagnes.", "From clicks to insight, and from insight to better campaigns.", "De clics a insights, y de insights a mejores campañas.")} /></h2>
        <p>
          <Text value={t(
            "Slimmer dan Gisteren neemt strategie, campagne-opzet, conversietracking, optimalisatie en rapportage uit handen. Zo weet je niet alleen dat er advertenties draaien, maar ook wat ze opleveren en waar verbetering zit.",
            "Slimmer dan Gisteren handles strategy, campaign setup, conversion tracking, optimization and reporting. That way you do not just know ads are running, but also what they deliver and where improvement is possible.",
            "Slimmer dan Gisteren se encarga de estrategia, configuración de campañas, tracking de conversiones, optimización e informes. Así no solo sabes que los anuncios están activos, sino qué generan y dónde mejorar.",
          )} />
        </p>
      </section>

      <section className="section ads-section">
        <GoogleAdsOverview />
      </section>

      <section className="section soft">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Reviews", "Reviews", "Reseñas")} /></p>
          <h2><Text value={t("Wat klanten zeggen over slimmer adverteren.", "What clients say about smarter advertising.", "Lo que dicen los clientes sobre anunciar mejor.")} /></h2>
        </div>
        <Testimonials />
      </section>
    </SiteShell>
  );
}
