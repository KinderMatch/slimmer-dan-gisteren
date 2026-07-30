import {
  AdsPerformanceLab,
  GoogleAdsOverview,
  PageHero,
  SiteShell,
  Testimonials,
  VideoShowcase,
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
      <div className="service-premium service-premium-ads">
        <PageHero
          eyebrow={t("Advertenties", "Advertising", "Anuncios")}
          title={t("Campagnes die helder worden voordat ze groeien.", "Campaigns that become clear before they grow.", "Campañas claras antes de crecer.")}
          intro={t(
            "Advertenties werken pas als strategie, creatie, landingspagina, tracking en rapportage hetzelfde verhaal vertellen.",
            "Advertising works when strategy, creative, landing page, tracking and reporting tell the same story.",
            "Los anuncios funcionan cuando estrategia, creatividad, landing page, tracking e informes cuentan la misma historia.",
          )}
          cta={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")}
          tone="ads"
        />

        <section className="section ads-video-section premium-first-panel">
          <div className="section-heading">
            <p className="eyebrow"><Text value={t("Zelfstandigen Bouw", "Zelfstandigen Bouw", "Zelfstandigen Bouw")} /></p>
            <h2><Text value={t("Advertentiecreatie die direct bij de campagne hoort.", "Ad creative that belongs directly to the campaign.", "Creatividad publicitaria conectada directamente a la campaña.")} /></h2>
            <p>
              <Text value={t(
                "Deze pagina gebruikt bewust de Zelfstandigen Bouw-video's: herkenbare social-first advertenties die campagne en doelgroep zichtbaar maken.",
                "This page deliberately uses the Zelfstandigen Bouw videos: recognizable social-first ads that make the campaign and audience visible.",
                "Esta página usa intencionadamente los videos de Zelfstandigen Bouw: anuncios social-first reconocibles que muestran campaña y público.",
              )} />
            </p>
          </div>
          <VideoShowcase compact />
        </section>

        <section className="section ads-studio-section">
          <AdsPerformanceLab />
        </section>

        <section className="section narrow premium-editorial-section">
          <p className="eyebrow"><Text value={t("Aanpak", "Approach", "Enfoque")} /></p>
          <h2><Text value={t("Van klikken naar inzicht. Van inzicht naar betere campagnes.", "From clicks to insight. From insight to better campaigns.", "De clics a insights. De insights a mejores campañas.")} /></h2>
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

        <section className="section soft premium-reviews-section">
          <div className="section-heading">
            <p className="eyebrow"><Text value={t("Reviews", "Reviews", "Reseñas")} /></p>
            <h2><Text value={t("Wat klanten zeggen over slimmer adverteren.", "What clients say about smarter advertising.", "Lo que dicen los clientes sobre anunciar mejor.")} /></h2>
          </div>
          <Testimonials />
        </section>
      </div>
    </SiteShell>
  );
}
