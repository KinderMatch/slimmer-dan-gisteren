import {
  DisciplineRunway,
  HomeContentShowreel,
  HomeWorkGrid,
  ProofStrip,
  ServiceRows,
  SiteShell,
  Testimonials,
} from "./site-content";
import { HomeFocusVideo } from "./home-focus-video";
import { Text } from "./language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export default function Home() {
  return (
    <SiteShell>
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow"><Text value={t("Groei begint met vandaag", "Growth starts today", "El crecimiento empieza hoy")} /></p>
          <h1><Text value={t("Marketing die rust brengt en groei zichtbaar maakt.", "Marketing that brings clarity and makes growth visible.", "Marketing que aporta claridad y hace visible el crecimiento.")} /></h1>
          <p>
            <Text value={t(
              "Slimmer dan Gisteren helpt ondernemers met websitebeheer, advertenties en content creatie die overzicht, meetbaarheid en resultaat brengen.",
              "Slimmer dan Gisteren helps entrepreneurs with website management, advertising and content creation that bring clarity, measurability and results.",
              "Slimmer dan Gisteren ayuda a emprendedores con gestión web, anuncios y creación de contenido que aportan claridad, medición y resultados.",
            )} />
          </p>
          <div className="actions">
            <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
              <Text value={t("Kennismaken", "Introduction", "Conocernos")} />
            </a>
            <a className="button ghost" href="https://wa.me/31610175027">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="home-showcase" aria-label="Diensten en cases">
          <div className="home-command">
            <div className="command-top">
              <span><Text value={t("Actieve focus", "Active focus", "Foco activo")} /></span>
              <strong><Text value={t("Website / Advertenties / Content", "Website / Advertising / Content", "Web / Anuncios / Contenido")} /></strong>
            </div>
            <HomeFocusVideo />
            <div className="command-bottom">
              <span><Text value={t("50% minder advertentiekosten in klantcase", "50% lower ad spend in a client case", "50% menos inversión publicitaria en un caso cliente")} /></span>
              <span><Text value={t("7 websites in beheer of samenwerking", "7 websites managed or supported", "7 webs gestionadas o en colaboración")} /></span>
            </div>
          </div>
        </div>
      </section>

      <ProofStrip />

      <section className="section runway-section">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Alles in beeld", "Everything in view", "Todo visible")} /></p>
          <h2><Text value={t("De drie diensten moeten meteen zichtbaar voelen.", "The three services should feel visible immediately.", "Los tres servicios deben sentirse visibles al instante.")} /></h2>
        </div>
        <DisciplineRunway />
      </section>

      <section className="section work-showcase-section">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Werk in beeld", "Work in view", "Trabajo visible")} /></p>
          <h2><Text value={t("Een site moet direct laten zien wat er gebeurt.", "A site should immediately show what is happening.", "Una web debe mostrar de inmediato lo que está ocurriendo.")} /></h2>
          <p>
            <Text value={t(
              "Een combinatie van campagnes, social content en beheerwerk, zodat bezoekers niet alleen lezen wat Slimmer dan Gisteren doet, maar het meteen zien.",
              "A combination of campaigns, social content and management work, so visitors do not just read what Slimmer dan Gisteren does but see it right away.",
              "Una combinación de campañas, contenido social y gestión, para que los visitantes no solo lean qué hace Slimmer dan Gisteren, sino que lo vean al momento.",
            )} />
          </p>
        </div>
        <HomeWorkGrid />
      </section>

      <section className="section home-content-showreel-section">
        <HomeContentShowreel />
      </section>

      <section className="service-stage">
        <div className="stage-heading">
          <p className="eyebrow"><Text value={t("Wat we doen", "What we do", "Qué hacemos")} /></p>
          <h2><Text value={t("We bouwen aan het systeem achter je online groei.", "We build the system behind your online growth.", "Construimos el sistema detrás de tu crecimiento online.")} /></h2>
          <p>
            <Text value={t(
              "Website, vindbaarheid, advertenties en content moeten elkaar versterken. Daarom laten we op de homepage meteen zien hoe beheer, campagnes en beeld samen resultaat maken.",
              "Website, visibility, advertising and content should strengthen each other. That is why the homepage shows how management, campaigns and visuals work together to create results.",
              "Web, visibilidad, anuncios y contenido deben reforzarse entre sí. Por eso la homepage muestra cómo gestión, campañas e imagen trabajan juntos para generar resultados.",
            )} />
          </p>
        </div>
        <ServiceRows />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Reviews", "Reviews", "Reseñas")} /></p>
          <h2><Text value={t("Wat klanten zeggen over Slimmer dan Gisteren.", "What clients say about Slimmer dan Gisteren.", "Lo que dicen los clientes sobre Slimmer dan Gisteren.")} /></h2>
        </div>
        <Testimonials />
      </section>
    </SiteShell>
  );
}
