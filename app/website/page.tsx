import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { languageAlternates } from "../i18n";
import { absoluteUrl, breadcrumbJsonLd, defaultOgImage, serviceJsonLd, siteName } from "../seo";
import {
  PageHero,
  SiteShell,
  WebsiteCaseWall,
  WebsiteManagementShowcase,
  WebsiteWorkflow,
} from "../site-content";
import { EmphasisText, Text } from "../language";
import type { Language } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata: Metadata = {
  title: "Website Laten Maken, Websitebeheer en SEO",
  description:
    "Website laten maken of websitebeheer uitbesteden? Slimmer dan Gisteren helpt met beheer, SEO, tracking, conversie en betere vindbaarheid.",
  robots: { index: false, follow: true },
  alternates: languageAlternates("/website/"),
  keywords: [
    "website laten maken",
    "websitebeheer uitbesteden",
    "SEO uitbesteden",
    "vindbaarheid website verbeteren",
    "website optimalisatie",
    "website laten beheren",
  ],
  openGraph: {
    title: "Website laten maken, websitebeheer en SEO",
    description:
      "Een beheerbare websitebasis voor SEO, campagnes, content en conversie.",
    url: absoluteUrl("/website/"),
    siteName,
    images: [{ url: absoluteUrl(defaultOgImage), alt: "Websitecase Slimmer dan Gisteren" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function WebsitePage({ initialLanguage = "nl" }: { initialLanguage?: Language } = {}) {
  return (
    <>
      <JsonLd locale={initialLanguage}
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Website laten maken en SEO", path: "/website/" },
          ]),
          serviceJsonLd("/website/"),
        ]}
      />
      <SiteShell initialLanguage={initialLanguage} premiumNavigation>
        <div className="service-premium service-premium-website">
        <PageHero
          eyebrow={t("Websites", "Websites", "Webs")}
          title={t("Een website die [[rust]] brengt. En beter gevonden wordt.", "A website that creates [[calm]]. And gets found.", "Una web que aporta [[calma]]. Y se encuentra mejor.")}
          intro={t(
            "Geen losse pagina's of technische ruis. Een beheerbaar fundament voor SEO, campagnes, content en conversie.",
            "No loose pages or technical noise. A manageable foundation for SEO, campaigns, content and conversion.",
            "Sin páginas sueltas ni ruido técnico. Una base gestionable para SEO, campañas, contenido y conversión.",
          )}
          cta={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")}
          tone="website"
        />
          <nav className="service-page-index" aria-label={initialLanguage === "nl" ? "Op deze pagina" : initialLanguage === "en" ? "On this page" : "En esta página"}>
            <a href="#beheer"><Text value={t("Websitebeheer", "Website management", "Gestión web")} /></a>
            <a href="#aanpak"><Text value={t("Werkwijze", "Process", "Método")} /></a>
            <a href="#projecten"><Text value={t("Projecten", "Projects", "Proyectos")} /></a>
            <a href="#voordelen"><Text value={t("Voordelen", "Benefits", "Ventajas")} /></a>
          </nav>


        <section id="beheer" className="section website-management-section premium-first-panel">
          <WebsiteManagementShowcase />
        </section>

        <section id="aanpak" className="section soft premium-editorial-section">
          <div className="section-heading">
            <p className="eyebrow"><Text value={t("Werkwijze", "Process", "Método")} /></p>
            <h2><EmphasisText value={t("Websitebeheer met [[duidelijke rolverdeling]].", "Website management with [[clear responsibilities]].", "Gestión web con [[responsabilidades claras]].")} /></h2>
          </div>
          <WebsiteWorkflow />
        </section>

        <section id="projecten" className="section premium-case-section">
          <div className="section-heading">
            <p className="eyebrow"><Text value={t("Live cases", "Live cases", "Casos en vivo")} /></p>
            <h2><EmphasisText value={t("Websites horen [[zichtbaar]] te zijn. Niet verstopt in tekst.", "Websites should be [[visible]]. Not hidden in text.", "Las webs deben [[verse]]. No esconderse en texto.")} /></h2>
            <p>
              <Text value={t(
                "Alle websitecases blijven aanwezig, maar rustiger gepresenteerd: live, scanbaar en passend bij de dienst.",
                "All website cases remain present, but presented with more calm: live, scannable and relevant to the service.",
                "Todos los casos web siguen presentes, pero con más calma: en vivo, fáciles de revisar y relevantes para el servicio.",
              )} />
            </p>
          </div>
          <WebsiteCaseWall />
        </section>

        <section id="voordelen" className="section website-benefits-section premium-benefits-section">
          <div className="advantage-grid">
            <article>
              <h3><Text value={t("Snel contact & directe oplossingen", "Fast contact & direct solutions", "Contacto rápido y soluciones directas")} /></h3>
              <p><Text value={t("We reageren snel, geven duidelijke uitleg en lossen problemen gericht op.", "We respond quickly, explain clearly and solve problems in a focused way.", "Respondemos rápido, explicamos con claridad y resolvemos problemas de forma concreta.")} /></p>
            </article>
            <article>
              <h3><EmphasisText value={t("[[SEO]] & vindbaarheid", "[[SEO]] & visibility", "[[SEO]] y visibilidad")} /></h3>
              <p><Text value={t("We verbeteren de technische basis, contentstructuur en meetbaarheid zodat uw website beter gevonden kan worden.", "We improve the technical foundation, content structure and measurability so your website can be found more easily.", "Mejoramos la base técnica, la estructura de contenido y la medición para que tu web pueda encontrarse mejor.")} /></p>
            </article>
            <article>
              <h3><Text value={t("Alles-in-een service", "All-in-one service", "Servicio todo en uno")} /></h3>
              <p><Text value={t("Website maken, beheren, SEO verbeteren en optimaliseren vanuit een praktische samenwerking.", "Building, managing, improving SEO and optimizing your website through a practical collaboration.", "Crear, gestionar, mejorar el SEO y optimizar tu web desde una colaboración práctica.")} /></p>
            </article>
          </div>
        </section>
        </div>
      </SiteShell>
    </>
  );
}
