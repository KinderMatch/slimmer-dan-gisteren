import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, siteName } from "../seo";
import {
  ArtistContentShowcase,
  BrandingStudio,
  ContentGallery,
  PageHero,
  SiteShell,
  TravelContentShowcase,
  WeddingContentShowcase,
} from "../site-content";
import { EmphasisText, Text } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata: Metadata = {
  title: "Content Creatie, Fotografie en Videografie",
  description:
    "Content creatie uitbesteden? Slimmer dan Gisteren maakt fotografie, videografie, social content, reiscontent, eventvideo en artiestencontent.",
  alternates: {
    canonical: "/content-creatie/",
  },
  keywords: [
    "content creatie",
    "content creatie uitbesteden",
    "videografie",
    "fotografie",
    "social content",
    "event video",
    "reiscontent",
    "artiestencontent",
    "merkwaarde creëren",
  ],
  openGraph: {
    title: "Content creatie, fotografie en videografie",
    description:
      "Video, fotografie, social posts, reiscontent, events en persoonlijke verhalen in één herkenbare beeldtaal.",
    url: absoluteUrl("/content-creatie/"),
    siteName,
    images: [{ url: absoluteUrl("/assets/dave-dekker/photos/event-13.jpg"), alt: "Content creatie en eventfotografie" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function ContentCreatiePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Content creatie", path: "/content-creatie/" },
          ]),
          serviceJsonLd("/content-creatie/"),
          faqJsonLd([
            {
              question: "Welke content maakt Slimmer dan Gisteren?",
              answer:
                "Slimmer dan Gisteren maakt video, fotografie, social posts, reiscontent, eventvideo, trouwvideo's en artiestencontent.",
            },
            {
              question: "Is content creatie geschikt voor bedrijven en particulieren?",
              answer:
                "Ja. De focus ligt op B2B content voor merken en organisaties, maar B2C fotografie en videografie zoals bruiloften en persoonlijke verhalen kunnen ook worden opgepakt.",
            },
          ]),
        ]}
      />
      <SiteShell>
        <div className="service-premium service-premium-content">
        <PageHero
          eyebrow={t("Content creatie", "Content creation", "Creación de contenido")}
          title={t("Beeld dat laat voelen waarom een [[merk]] ertoe doet.", "Visuals that show why a [[brand]] matters.", "Imagen que muestra por qué una [[marca]] importa.")}
          intro={t(
            "Video, fotografie, social posts, reiscontent, events en persoonlijke verhalen komen samen in één herkenbare beeldtaal.",
            "Video, photography, social posts, travel content, events and personal stories come together in one recognizable visual language.",
            "Video, fotografía, posts, contenido de viaje, eventos e historias personales se unen en un lenguaje visual reconocible.",
          )}
          cta={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")}
          tone="branding"
        />

        <section className="section brand-intro premium-editorial-section">
          <div>
            <p className="eyebrow"><Text value={t("Content creatie", "Content creation", "Creación de contenido")} /></p>
            <h2><EmphasisText value={t("[[Merkwaarde]] bouwen waar klanten kijken.", "Build [[brand value]] where customers are watching.", "Construye [[valor de marca]] donde miran tus clientes.")} /></h2>
          </div>
          <blockquote className="intro-quote">
            <Text value={t(
              "In het huidige marketinglandschap is alleen een mooi product hebben niet meer genoeg.",
              "In today's marketing landscape, having a beautiful product is no longer enough.",
              "En el panorama actual de marketing, tener un buen producto ya no es suficiente.",
            )} />
          </blockquote>
          <p>
            <EmphasisText value={t(
              "Het is belangrijk om jouw doelgroep te bereiken en [[merkwaarde]] te creëren voor jouw product, dienst of onderneming. Een sterke digitale aanwezigheid zorgt dat je merk niet onopgemerkt blijft en dat content, advertenties en website elkaar versterken.",
              "It is important to reach your target audience and create [[brand value]] for your product, service or company. A strong digital presence ensures your brand does not go unnoticed and that content, advertising and website reinforce each other.",
              "Es importante llegar a tu público objetivo y crear [[valor de marca]] para tu producto, servicio o empresa. Una presencia digital sólida evita que tu marca pase desapercibida y hace que contenido, anuncios y web se refuercen entre sí.",
            )} />
          </p>
        </section>

        <section className="section branding-studio-section premium-first-panel">
          <BrandingStudio />
        </section>

        <section className="section content-section premium-case-section">
          <div className="section-heading">
            <p className="eyebrow"><Text value={t("Contentkalender", "Content calendar", "Calendario de contenido")} /></p>
            <h2><EmphasisText value={t("Social posts die campagnes [[visueel]] doortrekken.", "Social posts that [[visually]] extend campaigns.", "Posts sociales que prolongan [[visualmente]] las campañas.")} /></h2>
            <p>
              <Text value={t(
                "Alle social contentbeelden blijven klikbaar en vergrootbaar, zodat bezoekers de voorbeelden echt kunnen bekijken.",
                "All social content visuals remain clickable and enlargeable, so visitors can truly inspect the examples.",
                "Todas las piezas sociales siguen siendo clicables y ampliables, para que los visitantes puedan ver los ejemplos de verdad.",
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
        </div>
      </SiteShell>
    </>
  );
}
