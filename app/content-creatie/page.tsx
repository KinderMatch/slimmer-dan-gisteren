import {
  ArtistContentShowcase,
  BrandingStudio,
  ContentGallery,
  PageHero,
  SiteShell,
  TravelContentShowcase,
  WeddingContentShowcase,
} from "../site-content";
import { Text } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata = {
  title: "Content creatie - Slimmer dan Gisteren",
  description:
    "Content creatie, artiestencontent, eventvideo, reiscontent, fotografie, videografie en online zichtbaarheid door Slimmer dan Gisteren.",
};

export default function ContentCreatiePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={t("Content creatie", "Content creation", "Creación de contenido")}
        title={t("Content creatie & online zichtbaarheid", "Content creation & online visibility", "Creación de contenido y visibilidad online")}
        intro={t(
          "Content werkt pas goed als video, social posts en campagneformats herkenbaar bij hetzelfde merk horen.",
          "Content only works well when video, social posts and campaign formats clearly belong to the same brand.",
          "El contenido funciona cuando video, redes sociales y campañas se sienten como una misma marca.",
        )}
        cta={t("Plan kennismaking", "Book an introduction", "Agenda una llamada")}
        tone="branding"
      />

      <section className="section brand-intro">
        <div>
          <p className="eyebrow"><Text value={t("Content creatie", "Content creation", "Creación de contenido")} /></p>
          <h2><Text value={t("Merkwaarde bouwen waar klanten kijken.", "Build brand value where customers are watching.", "Construye valor de marca donde miran tus clientes.")} /></h2>
        </div>
        <blockquote className="intro-quote">
          <Text value={t(
            "In het huidige marketinglandschap is alleen een mooi product hebben niet meer genoeg.",
            "In today's marketing landscape, having a beautiful product is no longer enough.",
            "En el panorama actual de marketing, tener un buen producto ya no es suficiente.",
          )} />
        </blockquote>
        <p>
          <Text value={t(
            "Het is belangrijk om jouw doelgroep te bereiken en merkwaarde te creëren voor jouw product, dienst of onderneming. Een sterke digitale aanwezigheid zorgt dat je merk niet onopgemerkt blijft en dat content, advertenties en website elkaar versterken.",
            "It is important to reach your target audience and create brand value for your product, service or company. A strong digital presence ensures your brand does not go unnoticed and that content, advertising and website reinforce each other.",
            "Es importante llegar a tu público objetivo y crear valor de marca para tu producto, servicio o empresa. Una presencia digital sólida evita que tu marca pase desapercibida y hace que contenido, anuncios y web se refuercen entre sí.",
          )} />
        </p>
      </section>

      <section className="section branding-studio-section">
        <BrandingStudio />
      </section>

      <section className="section content-section">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Contentkalender", "Content calendar", "Calendario de contenido")} /></p>
          <h2><Text value={t("Social posts die campagnes visueel doortrekken.", "Social posts that visually extend campaigns.", "Posts sociales que prolongan visualmente las campañas.")} /></h2>
          <p>
            <Text value={t(
              "Een selectie van contentvormen die laten zien hoe campagnes worden doorvertaald naar herkenbare social posts.",
              "A selection of content formats that show how campaigns are translated into recognizable social posts.",
              "Una selección de formatos que muestra cómo las campañas se transforman en posts sociales reconocibles.",
            )} />
          </p>
        </div>
        <ContentGallery />
      </section>

      <section className="section travel-content-section">
        <TravelContentShowcase />
      </section>

      <section className="section artist-content-section">
        <ArtistContentShowcase />
      </section>

      <section className="section wedding-content-section">
        <WeddingContentShowcase />
      </section>
    </SiteShell>
  );
}
