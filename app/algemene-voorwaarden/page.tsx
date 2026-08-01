import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { Text } from "../language";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "../seo";
import { SiteShell } from "../site-content";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

const termsSections = [
  {
    title: t("1. Toepasselijkheid", "1. Applicability", "1. Aplicabilidad"),
    body: t(
      "Deze algemene voorwaarden zijn van toepassing op alle offertes, werkzaamheden en overeenkomsten van Slimmer dan Gisteren, tenzij schriftelijk anders is afgesproken.",
      "These terms apply to all proposals, work and agreements by Slimmer dan Gisteren, unless agreed otherwise in writing.",
      "Estas condiciones se aplican a todas las propuestas, trabajos y acuerdos de Slimmer dan Gisteren, salvo que se acuerde lo contrario por escrito.",
    ),
  },
  {
    title: t("2. Diensten", "2. Services", "2. Servicios"),
    body: t(
      "Slimmer dan Gisteren helpt met websites, advertenties, SEO, content creatie, strategie, tracking en optimalisatie. De exacte werkzaamheden worden vastgelegd in de offerte, opdrachtbevestiging of schriftelijke afspraak.",
      "Slimmer dan Gisteren supports websites, advertising, SEO, content creation, strategy, tracking and optimisation. The exact work is defined in the proposal, confirmation or written agreement.",
      "Slimmer dan Gisteren ayuda con webs, anuncios, SEO, creación de contenido, estrategia, tracking y optimización. El trabajo exacto se define en la propuesta, confirmación o acuerdo escrito.",
    ),
  },
  {
    title: t("3. Samenwerking", "3. Collaboration", "3. Colaboración"),
    body: t(
      "Voor een goede uitvoering levert de klant tijdig de benodigde informatie, toegang, feedback en materialen aan. Vertraging door ontbrekende input kan invloed hebben op planning en oplevering.",
      "For proper execution, the client provides required information, access, feedback and materials on time. Delays caused by missing input may affect planning and delivery.",
      "Para una buena ejecución, el cliente facilita a tiempo la información, accesos, feedback y materiales necesarios. Los retrasos por falta de input pueden afectar la planificación y entrega.",
    ),
  },
  {
    title: t("4. Offertes en betaling", "4. Proposals and payment", "4. Propuestas y pago"),
    body: t(
      "Offertes zijn vrijblijvend totdat ze schriftelijk zijn bevestigd. Facturen worden betaald binnen de afgesproken betalingstermijn. Bij te late betaling kan Slimmer dan Gisteren werkzaamheden opschorten.",
      "Proposals are non-binding until confirmed in writing. Invoices are paid within the agreed payment term. In case of late payment, Slimmer dan Gisteren may pause work.",
      "Las propuestas no son vinculantes hasta su confirmación por escrito. Las facturas se pagan dentro del plazo acordado. En caso de retraso, Slimmer dan Gisteren puede pausar el trabajo.",
    ),
  },
  {
    title: t("5. Oplevering en wijzigingen", "5. Delivery and changes", "5. Entrega y cambios"),
    body: t(
      "Slimmer dan Gisteren werkt zorgvuldig en resultaatgericht. Extra wensen buiten de afgesproken scope kunnen als meerwerk worden berekend na overleg.",
      "Slimmer dan Gisteren works carefully and with a focus on results. Additional requests outside the agreed scope may be charged as extra work after consultation.",
      "Slimmer dan Gisteren trabaja con cuidado y orientación a resultados. Las solicitudes adicionales fuera del alcance acordado pueden cobrarse como trabajo extra tras consulta.",
    ),
  },
  {
    title: t("6. Resultaten", "6. Results", "6. Resultados"),
    body: t(
      "Marketingresultaten zijn afhankelijk van markt, budget, aanbod, concurrentie, input en looptijd. Slimmer dan Gisteren spant zich in voor verbetering, maar garandeert geen specifieke posities, omzet of advertentieresultaten.",
      "Marketing results depend on market, budget, offer, competition, input and duration. Slimmer dan Gisteren works to improve performance, but does not guarantee specific rankings, revenue or advertising results.",
      "Los resultados de marketing dependen del mercado, presupuesto, oferta, competencia, input y duración. Slimmer dan Gisteren trabaja para mejorar, pero no garantiza posiciones, ingresos o resultados publicitarios específicos.",
    ),
  },
  {
    title: t("7. Intellectueel eigendom", "7. Intellectual property", "7. Propiedad intelectual"),
    body: t(
      "Rechten op geleverde concepten, ontwerpen, teksten, foto's, video's en campagnes gaan over zoals afgesproken. Niet-betaalde of niet-gekozen voorstellen blijven eigendom van Slimmer dan Gisteren.",
      "Rights to delivered concepts, designs, copy, photos, videos and campaigns transfer as agreed. Unpaid or unused proposals remain the property of Slimmer dan Gisteren.",
      "Los derechos sobre conceptos, diseños, textos, fotos, vídeos y campañas se transfieren según lo acordado. Las propuestas no pagadas o no elegidas siguen siendo propiedad de Slimmer dan Gisteren.",
    ),
  },
  {
    title: t("8. Aansprakelijkheid", "8. Liability", "8. Responsabilidad"),
    body: t(
      "Slimmer dan Gisteren is alleen aansprakelijk voor directe schade die aantoonbaar het gevolg is van een toerekenbare tekortkoming. Aansprakelijkheid is beperkt tot het bedrag dat voor de betreffende opdracht is betaald.",
      "Slimmer dan Gisteren is only liable for direct damage demonstrably caused by an attributable failure. Liability is limited to the amount paid for the relevant assignment.",
      "Slimmer dan Gisteren solo es responsable por daños directos demostrablemente causados por un incumplimiento atribuible. La responsabilidad se limita al importe pagado por el encargo correspondiente.",
    ),
  },
  {
    title: t("9. Contact", "9. Contact", "9. Contacto"),
    body: t(
      "Vragen over deze voorwaarden kunnen worden gestuurd naar jimmy@slimmerdangisteren.nl.",
      "Questions about these terms can be sent to jimmy@slimmerdangisteren.nl.",
      "Las preguntas sobre estas condiciones pueden enviarse a jimmy@slimmerdangisteren.nl.",
    ),
  },
];

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Algemene voorwaarden van Slimmer dan Gisteren voor websites, advertenties, SEO, content creatie en samenwerking.",
  alternates: {
    canonical: "/algemene-voorwaarden/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Algemene voorwaarden | Slimmer dan Gisteren",
    description:
      "Voorwaarden voor samenwerking met Slimmer dan Gisteren.",
    url: absoluteUrl("/algemene-voorwaarden/"),
    siteName,
    locale: "nl_NL",
    type: "website",
  },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Algemene voorwaarden", path: "/algemene-voorwaarden/" },
        ])}
      />
      <SiteShell>
        <article className="legal-page">
          <header>
            <p className="eyebrow"><Text value={t("Juridisch", "Legal", "Legal")} /></p>
            <h1><Text value={t("Algemene voorwaarden", "Terms and conditions", "Condiciones generales")} /></h1>
            <p>
              <Text value={t(
                "Voor websites, advertenties, SEO, content creatie en samenwerking met Slimmer dan Gisteren.",
                "For websites, advertising, SEO, content creation and collaboration with Slimmer dan Gisteren.",
                "Para webs, anuncios, SEO, creación de contenido y colaboración con Slimmer dan Gisteren.",
              )} />
            </p>
            <span><Text value={t("Laatst bijgewerkt: 1 augustus 2026", "Last updated: 1 August 2026", "Última actualización: 1 de agosto de 2026")} /></span>
          </header>

          <div className="legal-sections">
            {termsSections.map((section) => (
              <section key={section.title.nl}>
                <h2><Text value={section.title} /></h2>
                <p><Text value={section.body} /></p>
              </section>
            ))}
          </div>
        </article>
      </SiteShell>
    </>
  );
}
