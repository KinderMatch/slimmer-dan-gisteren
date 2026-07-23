import {
  PageHero,
  SiteShell,
  WebsiteCaseWall,
  WebsiteManagementShowcase,
  WebsiteWorkflow,
} from "../site-content";
import { Text } from "../language";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

export const metadata = {
  title: "Websitebeheer en SEO - Slimmer dan Gisteren",
  description:
    "Websitebeheer, websites maken, SEO en vindbaarheid verbeteren door Slimmer dan Gisteren.",
};

export default function WebsitePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={t("Website uitbesteden", "Outsource your website", "Externalizar tu web")}
        title={t("Websitebeheer en SEO zonder ruis.", "Website management and SEO without noise.", "Gestión web y SEO sin ruido.")}
        intro={t(
          "Voor ondernemers die hun website willen laten beheren, verbeteren, campagneklaar houden en beter vindbaar willen maken zonder gedoe tussen meerdere partijen.",
          "For entrepreneurs who want their website managed, improved, campaign-ready and easier to find without hassle between multiple parties.",
          "Para emprendedores que quieren gestionar, mejorar y preparar su web para campañas, con mejor visibilidad y sin líos entre varias partes.",
        )}
        cta={t("Plan kennismaking", "Book an introduction", "Agenda una llamada")}
        tone="website"
      />

      <section className="section website-management-section">
        <WebsiteManagementShowcase />
      </section>

      <section className="section soft">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Werkwijze", "Process", "Método")} /></p>
          <h2><Text value={t("Websitebeheer met duidelijke rolverdeling.", "Website management with clear responsibilities.", "Gestión web con responsabilidades claras.")} /></h2>
        </div>
        <WebsiteWorkflow />
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow"><Text value={t("Cases", "Cases", "Casos")} /></p>
          <h2><Text value={t("Websites in beheer of samenwerking.", "Websites managed or supported.", "Webs gestionadas o en colaboración.")} /></h2>
          <p>
            <Text value={t(
              "De cases blijven scanbaar zonder de pagina te belasten met meerdere live embeds tegelijk.",
              "The cases stay easy to scan without overloading the page with too many live embeds at once.",
              "Los casos siguen siendo fáciles de revisar sin cargar la página con demasiadas vistas en vivo a la vez.",
            )} />
          </p>
        </div>
        <WebsiteCaseWall />
      </section>

      <section className="section website-benefits-section">
        <div className="advantage-grid">
          <article>
            <h3><Text value={t("Snel contact & directe oplossingen", "Fast contact & direct solutions", "Contacto rápido y soluciones directas")} /></h3>
            <p><Text value={t("We reageren snel, geven duidelijke uitleg en lossen problemen gericht op.", "We respond quickly, explain clearly and solve problems in a focused way.", "Respondemos rápido, explicamos con claridad y resolvemos problemas de forma concreta.")} /></p>
          </article>
          <article>
            <h3><Text value={t("SEO & vindbaarheid", "SEO & visibility", "SEO y visibilidad")} /></h3>
            <p><Text value={t("We verbeteren de technische basis, contentstructuur en meetbaarheid zodat uw website beter gevonden kan worden.", "We improve the technical foundation, content structure and measurability so your website can be found more easily.", "Mejoramos la base técnica, la estructura de contenido y la medición para que tu web pueda encontrarse mejor.")} /></p>
          </article>
          <article>
            <h3><Text value={t("Alles-in-een service", "All-in-one service", "Servicio todo en uno")} /></h3>
            <p><Text value={t("Website maken, beheren, SEO verbeteren en optimaliseren vanuit een praktische samenwerking.", "Building, managing, improving SEO and optimizing your website through a practical collaboration.", "Crear, gestionar, mejorar el SEO y optimizar tu web desde una colaboración práctica.")} /></p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
