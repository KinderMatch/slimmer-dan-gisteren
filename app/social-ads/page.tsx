import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { languageAlternates } from "../i18n";
import { absoluteUrl, breadcrumbJsonLd, defaultOgImage, serviceJsonLd, siteName } from "../seo";
import {
  AdsPerformanceLab,
  GoogleAdsOverview,
  PageHero,
  SiteShell,
  Testimonials,
  VideoShowcase,
} from "../site-content";
import { EmphasisText, Text } from "../language";
import type { Language } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata: Metadata = {
  title: "Social Ads Uitbesteden en Campagnebeheer",
  description:
    "Social Ads uitbesteden? Slimmer dan Gisteren helpt met strategie, campagnebeheer, tracking, landingspagina's, optimalisatie en rapportage.",
  alternates: languageAlternates("/social-ads/"),
  keywords: [
    "Social Ads uitbesteden",
    "Meta Ads uitbesteden",
    "LinkedIn Ads",
    "social advertising",
    "campagnebeheer",
    "conversietracking",
    "advertentie optimalisatie",
  ],
  openGraph: {
    title: "Social Ads uitbesteden en campagnebeheer",
    description:
      "Social campagnes waarin strategie, tracking, landingspagina en rapportage hetzelfde verhaal vertellen.",
    url: absoluteUrl("/social-ads/"),
    siteName,
    images: [{ url: absoluteUrl(defaultOgImage), alt: "Social Ads case Zelfstandigen Bouw" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function SocialAdsPage({ initialLanguage = "nl" }: { initialLanguage?: Language } = {}) {
  return (
    <>
      <JsonLd locale={initialLanguage}
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Social Ads", path: "/social-ads/" },
          ]),
          serviceJsonLd("/social-ads/"),
        ]}
      />
      <SiteShell initialLanguage={initialLanguage} premiumNavigation>
        <div className="service-premium service-premium-ads">
          <PageHero
            eyebrow={t("Social Ads", "Social Ads", "Social Ads")}
            title={t("Campagnes die [[helder]] worden voordat ze groeien.", "Campaigns that become [[clear]] before they grow.", "Campañas [[claras]] antes de crecer.")}
            intro={t(
              "Social Ads werken pas als strategie, creatie, landingspagina, tracking en rapportage hetzelfde verhaal vertellen.",
              "Social Ads work when strategy, creative, landing page, tracking and reporting tell the same story.",
              "Social Ads funcionan cuando estrategia, creatividad, landing page, tracking e informes cuentan la misma historia.",
            )}
            cta={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")}
            tone="ads"
          />
          <nav className="service-page-index" aria-label={initialLanguage === "nl" ? "Op deze pagina" : initialLanguage === "en" ? "On this page" : "En esta página"}>
            <a href="#creatie"><Text value={t("Advertentiecreatie", "Ad creative", "Creatividad")} /></a>
            <a href="#beheer"><Text value={t("Campagnebeheer", "Campaign management", "Gestión")} /></a>
            <a href="#aanpak"><Text value={t("Aanpak", "Approach", "Enfoque")} /></a>
            <a href="#meting"><Text value={t("Meting", "Measurement", "Medición")} /></a>
            <a href="#reviews"><Text value={t("Reviews", "Reviews", "Reseñas")} /></a>
          </nav>


          <section id="creatie" className="section ads-video-section premium-first-panel">
            <div className="section-heading">
              <p className="eyebrow"><Text value={t("Zelfstandigen Bouw", "Zelfstandigen Bouw", "Zelfstandigen Bouw")} /></p>
              <h2><EmphasisText value={t("Advertentiecreatie die direct bij de [[campagne]] hoort.", "Ad creative that belongs directly to the [[campaign]].", "Creatividad publicitaria conectada directamente a la [[campaña]].")} /></h2>
              <p>
                <Text value={t(
                  "De advertenties voor Zelfstandigen Bouw laten zien hoe een herkenbare situatie wordt vertaald naar een korte video voor zelfstandige bouwprofessionals. Bekijk de voorbeelden om de stijl, doelgroep en boodschap te beoordelen.",
                  "The ads for Zelfstandigen Bouw show how a recognizable situation becomes a short video for self-employed construction professionals. Watch the examples to assess the style, audience and message.",
                  "Los anuncios para Zelfstandigen Bouw muestran cómo una situación reconocible se convierte en un vídeo corto para profesionales autónomos de la construcción. Mira los ejemplos para valorar el estilo, el público y el mensaje.",
                )} />
              </p>
            </div>
            <VideoShowcase compact excludeSrcs={["/assets/campaigns/zb-hondenhok.mp4"]} />
          </section>

          <section id="beheer" className="section ads-studio-section">
            <AdsPerformanceLab />
          </section>

          <section id="aanpak" className="section narrow premium-editorial-section">
            <p className="eyebrow"><Text value={t("Aanpak", "Approach", "Enfoque")} /></p>
            <h2><EmphasisText value={t("Van klikken naar [[inzicht]]. Van inzicht naar betere campagnes.", "From clicks to [[insight]]. From insight to better campaigns.", "De clics a [[insights]]. De insights a mejores campañas.")} /></h2>
            <p>
              <Text value={t(
                "Slimmer dan Gisteren neemt strategie, campagne-opzet, conversietracking, optimalisatie en rapportage uit handen. Zo weet je niet alleen dat er advertenties draaien, maar ook wat ze opleveren en waar verbetering zit.",
                "Slimmer dan Gisteren handles strategy, campaign setup, conversion tracking, optimization and reporting. That way you do not just know ads are running, but also what they deliver and where improvement is possible.",
                "Slimmer dan Gisteren se encarga de estrategia, configuración de campañas, tracking de conversiones, optimización e informes. Así no solo sabes que los anuncios están activos, sino qué generan y dónde mejorar.",
              )} />
            </p>
          </section>

          <section id="meting" className="section ads-section">
            <GoogleAdsOverview />
          </section>

          <section id="reviews" className="section soft premium-reviews-section">
            <div className="section-heading">
              <p className="eyebrow"><Text value={t("Reviews", "Reviews", "Reseñas")} /></p>
              <h2><EmphasisText value={t("Wat klanten zeggen over [[slimmer adverteren]].", "What clients say about [[smarter advertising]].", "Lo que dicen los clientes sobre [[anunciar mejor]].")} /></h2>
            </div>
            <Testimonials />
            <p><Text value={t(
              "De genoemde kostenbesparing komt uit de klantreview van Rob en Rene over advertentiebeheer. Het is een ervaring van die klant, geen toezegging voor iedere campagne. Voor een eigen vergelijking bekijken we periode, budget, kanaal en gemeten aanvragen samen.",
              "The advertising cost reduction comes from Rob and Rene’s review of advertising management. It reflects that client’s experience, not a promise for every campaign. For your own comparison, we assess the period, budget, channel and measured enquiries together.",
              "La reducción del coste publicitario procede de la reseña de Rob y Rene sobre gestión de anuncios. Refleja la experiencia de ese cliente, no una promesa para todas las campañas. Para tu comparación evaluamos juntos el periodo, el presupuesto, el canal y las solicitudes medidas.",
            )} /></p>
          </section>
        </div>
      </SiteShell>
    </>
  );
}
