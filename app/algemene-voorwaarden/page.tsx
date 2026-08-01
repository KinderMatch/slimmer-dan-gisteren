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
      "Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachtbevestigingen, facturen, abonnementen, eenmalige opdrachten en werkzaamheden van Slimmer dan Gisteren, tenzij schriftelijk anders is afgesproken. Afwijkende afspraken gelden alleen wanneer deze per e-mail, offerte of overeenkomst zijn bevestigd.",
      "These terms apply to all proposals, confirmations, invoices, subscriptions, one-off assignments and work by Slimmer dan Gisteren, unless agreed otherwise in writing. Deviating agreements only apply when confirmed by email, proposal or contract.",
      "Estas condiciones se aplican a todas las propuestas, confirmaciones, facturas, suscripciones, encargos únicos y trabajos de Slimmer dan Gisteren, salvo acuerdo escrito en contrario. Los acuerdos distintos solo son válidos si se confirman por email, propuesta o contrato.",
    ),
  },
  {
    title: t("2. Opdracht en scope", "2. Assignment and scope", "2. Encargo y alcance"),
    body: t(
      "Slimmer dan Gisteren levert diensten op het gebied van websites, websitebeheer, SEO, advertenties, content creatie, strategie, tracking, rapportage en optimalisatie. Wat precies binnen de opdracht valt, wordt bepaald door de offerte, opdrachtbevestiging, e-mailafspraak of factuuromschrijving. Werkzaamheden die daarbuiten vallen, gelden als meerwerk.",
      "Slimmer dan Gisteren provides services for websites, website management, SEO, advertising, content creation, strategy, tracking, reporting and optimisation. The exact scope is determined by the proposal, confirmation, email agreement or invoice description. Work outside that scope is considered additional work.",
      "Slimmer dan Gisteren presta servicios de webs, gestión web, SEO, anuncios, creación de contenido, estrategia, tracking, reporting y optimización. El alcance exacto se determina por la propuesta, confirmación, acuerdo por email o descripción de la factura. El trabajo fuera de ese alcance se considera trabajo adicional.",
    ),
  },
  {
    title: t("3. Eenmalige opdrachten", "3. One-off assignments", "3. Encargos únicos"),
    body: t(
      "Eenmalige opdrachten, zoals een website, fotoshoot, video, campagne-opzet of losse optimalisatie, eindigen na oplevering van de afgesproken werkzaamheden. Extra correctierondes, nieuwe wensen, uitbreiding van pagina's, aanvullende edits of werkzaamheden na oplevering vallen buiten de oorspronkelijke opdracht, tenzij anders afgesproken.",
      "One-off assignments, such as a website, shoot, video, campaign setup or separate optimisation, end after delivery of the agreed work. Extra revision rounds, new requests, additional pages, extra edits or work after delivery fall outside the original assignment unless agreed otherwise.",
      "Los encargos únicos, como una web, sesión de fotos, vídeo, configuración de campaña u optimización puntual, finalizan tras la entrega del trabajo acordado. Rondas extra, nuevas solicitudes, páginas adicionales, edits extra o trabajo posterior quedan fuera del encargo original salvo acuerdo distinto.",
    ),
  },
  {
    title: t("4. Doorlopende werkzaamheden", "4. Ongoing work", "4. Trabajo recurrente"),
    body: t(
      "Bij doorlopende werkzaamheden, zoals websitebeheer, advertentiebeheer, SEO, contentbeheer, rapportage of optimalisatie, loopt de samenwerking per maand of per afgesproken periode. Deze werkzaamheden worden periodiek uitgevoerd en gefactureerd zolang de samenwerking doorloopt.",
      "For ongoing work, such as website management, advertising management, SEO, content management, reporting or optimisation, the collaboration runs monthly or for the agreed period. This work is performed and invoiced periodically while the collaboration continues.",
      "Para trabajos recurrentes, como gestión web, gestión de anuncios, SEO, gestión de contenido, reporting u optimización, la colaboración se desarrolla mensualmente o por el periodo acordado. Este trabajo se realiza y factura periódicamente mientras continúe la colaboración.",
    ),
  },
  {
    title: t("5. Stilzwijgende verlenging en opzegging", "5. Automatic renewal and cancellation", "5. Renovación automática y cancelación"),
    body: t(
      "Doorlopende samenwerkingen worden na afloop van de afgesproken periode stilzwijgend verlengd met telkens dezelfde periode, tenzij schriftelijk of per e-mail wordt opgezegd. Voor zakelijke klanten geldt een opzegtermijn van één kalendermaand, tenzij anders afgesproken. Voor consumenten gelden altijd de wettelijke regels; na verlenging kan doorgaans worden opgezegd met een maximale opzegtermijn van één maand.",
      "Ongoing collaborations are automatically renewed after the agreed period for the same period, unless cancelled in writing or by email. For business clients, a notice period of one calendar month applies unless agreed otherwise. Consumers always retain their statutory rights; after renewal, cancellation is generally possible with a maximum notice period of one month.",
      "Las colaboraciones recurrentes se renuevan automáticamente tras el periodo acordado por el mismo periodo, salvo cancelación por escrito o email. Para clientes empresariales se aplica un preaviso de un mes natural, salvo acuerdo distinto. Los consumidores conservan siempre sus derechos legales; tras una renovación normalmente pueden cancelar con un preaviso máximo de un mes.",
    ),
  },
  {
    title: t("6. Facturatie en betaling", "6. Invoicing and payment", "6. Facturación y pago"),
    body: t(
      "Facturen worden per e-mail verzonden en moeten binnen de op de factuur vermelde betalingstermijn worden betaald. Bij te late betaling kan Slimmer dan Gisteren werkzaamheden opschorten totdat openstaande facturen zijn voldaan. Eventuele externe kosten, zoals advertentiebudget, hosting, plug-ins, licenties, domeinen of stockmateriaal, zijn voor rekening van de klant tenzij anders afgesproken.",
      "Invoices are sent by email and must be paid within the payment term stated on the invoice. In case of late payment, Slimmer dan Gisteren may pause work until outstanding invoices have been paid. External costs such as advertising budget, hosting, plugins, licences, domains or stock material are paid by the client unless agreed otherwise.",
      "Las facturas se envían por email y deben pagarse dentro del plazo indicado en la factura. En caso de retraso, Slimmer dan Gisteren puede pausar el trabajo hasta que las facturas pendientes estén pagadas. Costes externos como presupuesto publicitario, hosting, plugins, licencias, dominios o material stock corren por cuenta del cliente salvo acuerdo distinto.",
    ),
  },
  {
    title: t("7. Input, toegang en feedback", "7. Input, access and feedback", "7. Input, acceso y feedback"),
    body: t(
      "De klant levert tijdig de benodigde informatie, bestanden, toegang tot systemen, advertentieaccounts, websiteomgevingen, beeldmateriaal, feedback en goedkeuringen aan. Vertraging door ontbrekende input of late feedback kan invloed hebben op planning, oplevering en resultaten.",
      "The client provides the required information, files, system access, advertising accounts, website environments, media, feedback and approvals on time. Delays caused by missing input or late feedback may affect planning, delivery and results.",
      "El cliente facilita a tiempo la información, archivos, accesos, cuentas publicitarias, entornos web, material visual, feedback y aprobaciones necesarias. Los retrasos por falta de input o feedback tardío pueden afectar planificación, entrega y resultados.",
    ),
  },
  {
    title: t("8. Meerwerk en wijzigingen", "8. Additional work and changes", "8. Trabajo adicional y cambios"),
    body: t(
      "Aanpassingen, spoedwerk, extra correctierondes, nieuwe pagina's, aanvullende campagnes, extra edits of werkzaamheden buiten de afgesproken scope kunnen als meerwerk worden gefactureerd. Slimmer dan Gisteren communiceert dit vooraf wanneer redelijkerwijs duidelijk is dat werkzaamheden buiten de bestaande afspraak vallen.",
      "Changes, urgent work, extra revision rounds, new pages, additional campaigns, extra edits or work outside the agreed scope may be invoiced as additional work. Slimmer dan Gisteren communicates this in advance when it is reasonably clear that the work falls outside the existing agreement.",
      "Cambios, trabajo urgente, rondas extra, nuevas páginas, campañas adicionales, edits extra o trabajo fuera del alcance acordado pueden facturarse como trabajo adicional. Slimmer dan Gisteren lo comunica previamente cuando sea razonablemente claro que el trabajo queda fuera del acuerdo existente.",
    ),
  },
  {
    title: t("9. Resultaten en inspanningsverplichting", "9. Results and best efforts", "9. Resultados y obligación de medios"),
    body: t(
      "Marketingresultaten zijn afhankelijk van markt, budget, aanbod, concurrentie, timing, input, platformbeleid en looptijd. Slimmer dan Gisteren werkt zorgvuldig en resultaatgericht, maar garandeert geen specifieke posities in Google, omzet, leads, advertentieresultaten of groei.",
      "Marketing results depend on market, budget, offer, competition, timing, input, platform policies and duration. Slimmer dan Gisteren works carefully and with a focus on results, but does not guarantee specific Google rankings, revenue, leads, advertising results or growth.",
      "Los resultados de marketing dependen del mercado, presupuesto, oferta, competencia, timing, input, políticas de plataformas y duración. Slimmer dan Gisteren trabaja con cuidado y orientación a resultados, pero no garantiza posiciones específicas en Google, ingresos, leads, resultados publicitarios o crecimiento.",
    ),
  },
  {
    title: t("10. Intellectueel eigendom en portfolio", "10. Intellectual property and portfolio", "10. Propiedad intelectual y portfolio"),
    body: t(
      "Rechten op geleverde concepten, ontwerpen, teksten, foto's, video's, campagnes en websites gaan over zoals afgesproken en nadat de betreffende facturen zijn betaald. Niet-betaalde of niet-gekozen voorstellen blijven eigendom van Slimmer dan Gisteren. Slimmer dan Gisteren mag geleverd werk gebruiken als portfolio, tenzij vooraf schriftelijk anders is afgesproken.",
      "Rights to delivered concepts, designs, copy, photos, videos, campaigns and websites transfer as agreed and after the relevant invoices have been paid. Unpaid or unused proposals remain the property of Slimmer dan Gisteren. Slimmer dan Gisteren may use delivered work in its portfolio unless agreed otherwise in writing beforehand.",
      "Los derechos sobre conceptos, diseños, textos, fotos, vídeos, campañas y webs se transfieren según lo acordado y una vez pagadas las facturas correspondientes. Las propuestas no pagadas o no elegidas siguen siendo propiedad de Slimmer dan Gisteren. Slimmer dan Gisteren puede usar el trabajo entregado en su portfolio salvo acuerdo previo por escrito.",
    ),
  },
  {
    title: t("11. Accounts en externe platformen", "11. Accounts and external platforms", "11. Cuentas y plataformas externas"),
    body: t(
      "De klant blijft verantwoordelijk voor eigen accounts, domeinen, hosting, advertentieaccounts, betaalmethodes, platformvoorwaarden en toegang van derden. Slimmer dan Gisteren is niet verantwoordelijk voor storingen, beleidswijzigingen, afkeuringen, blokkades of wijzigingen bij externe platformen zoals Google, Meta, hostingpartijen of plug-inleveranciers.",
      "The client remains responsible for their own accounts, domains, hosting, advertising accounts, payment methods, platform terms and third-party access. Slimmer dan Gisteren is not responsible for outages, policy changes, rejections, blocks or changes by external platforms such as Google, Meta, hosting providers or plugin suppliers.",
      "El cliente sigue siendo responsable de sus cuentas, dominios, hosting, cuentas publicitarias, métodos de pago, condiciones de plataformas y acceso de terceros. Slimmer dan Gisteren no es responsable de fallos, cambios de política, rechazos, bloqueos o cambios de plataformas externas como Google, Meta, proveedores de hosting o plugins.",
    ),
  },
  {
    title: t("12. Aansprakelijkheid", "12. Liability", "12. Responsabilidad"),
    body: t(
      "Slimmer dan Gisteren is alleen aansprakelijk voor directe schade die aantoonbaar het gevolg is van een toerekenbare tekortkoming. Aansprakelijkheid is beperkt tot het bedrag dat voor de betreffende opdracht of de laatste factuurperiode is betaald. Indirecte schade, gevolgschade, gemiste omzet, gemiste besparingen en schade door platformwijzigingen zijn uitgesloten voor zover wettelijk toegestaan.",
      "Slimmer dan Gisteren is only liable for direct damage demonstrably caused by an attributable failure. Liability is limited to the amount paid for the relevant assignment or the latest invoice period. Indirect damage, consequential damage, lost revenue, missed savings and damage caused by platform changes are excluded to the extent permitted by law.",
      "Slimmer dan Gisteren solo es responsable por daños directos demostrablemente causados por un incumplimiento atribuible. La responsabilidad se limita al importe pagado por el encargo correspondiente o el último periodo facturado. Se excluyen daños indirectos, daños consecuenciales, ingresos perdidos, ahorros no realizados y daños por cambios de plataforma en la medida permitida por la ley.",
    ),
  },
  {
    title: t("13. Contact en opzegging", "13. Contact and cancellation", "13. Contacto y cancelación"),
    body: t(
      "Vragen, wijzigingen en opzeggingen kunnen per e-mail worden gestuurd naar jimmy@slimmerdangisteren.nl. Een opzegging is pas verwerkt nadat deze per e-mail is bevestigd.",
      "Questions, changes and cancellations can be sent by email to jimmy@slimmerdangisteren.nl. A cancellation is only processed after it has been confirmed by email.",
      "Preguntas, cambios y cancelaciones pueden enviarse por email a jimmy@slimmerdangisteren.nl. Una cancelación solo se procesa después de ser confirmada por email.",
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
