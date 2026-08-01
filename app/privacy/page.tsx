import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { Text } from "../language";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "../seo";
import { SiteShell } from "../site-content";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

const privacyHighlights = [
  {
    title: t("Heldere verwerking", "Clear processing", "Tratamiento claro"),
    body: t(
      "Persoonsgegevens worden alleen gebruikt voor contact, offertes, uitvoering van opdrachten, administratie, wettelijke verplichtingen en verbetering van de website.",
      "Personal data is only used for contact, proposals, carrying out assignments, administration, legal obligations and improving the website.",
      "Los datos personales solo se utilizan para contacto, propuestas, ejecucion de encargos, administracion, obligaciones legales y mejora del sitio web.",
    ),
  },
  {
    title: t("Geen verkoop van data", "No sale of data", "Sin venta de datos"),
    body: t(
      "Slimmer dan Gisteren verkoopt geen persoonsgegevens aan derden.",
      "Slimmer dan Gisteren does not sell personal data to third parties.",
      "Slimmer dan Gisteren no vende datos personales a terceros.",
    ),
  },
  {
    title: t("Rechten via e-mail", "Rights by email", "Derechos por email"),
    body: t(
      "Verzoeken over inzage, correctie, verwijdering of bezwaar kunnen naar jimmy@slimmerdangisteren.nl.",
      "Requests about access, correction, deletion or objection can be sent to jimmy@slimmerdangisteren.nl.",
      "Las solicitudes de acceso, correccion, eliminacion u oposicion pueden enviarse a jimmy@slimmerdangisteren.nl.",
    ),
  },
];

const privacySections = [
  {
    title: t("1. Verantwoordelijke", "1. Controller", "1. Responsable"),
    body: t(
      "Slimmer dan Gisteren is verantwoordelijk voor de verwerking van persoonsgegevens via deze website en in het contact met klanten, prospects en leveranciers. Voor vragen over privacy kan contact worden opgenomen via jimmy@slimmerdangisteren.nl.",
      "Slimmer dan Gisteren is responsible for processing personal data through this website and in contact with clients, prospects and suppliers. Privacy questions can be sent to jimmy@slimmerdangisteren.nl.",
      "Slimmer dan Gisteren es responsable del tratamiento de datos personales a traves de este sitio web y en el contacto con clientes, prospectos y proveedores. Las preguntas sobre privacidad pueden enviarse a jimmy@slimmerdangisteren.nl.",
    ),
  },
  {
    title: t("2. Welke gegevens worden verwerkt", "2. Data processed", "2. Datos tratados"),
    body: t(
      "Afhankelijk van het contact kunnen naam, bedrijfsnaam, e-mailadres, telefoonnummer, berichtinhoud, factuurgegevens, projectinformatie, websitegegevens, accounttoegang, technische gegevens zoals IP-adres en informatie over websitegebruik worden verwerkt.",
      "Depending on the contact, name, company name, email address, phone number, message content, invoice details, project information, website data, account access, technical data such as IP address and information about website use may be processed.",
      "Segun el contacto, pueden tratarse nombre, empresa, email, telefono, contenido del mensaje, datos de facturacion, informacion del proyecto, datos web, acceso a cuentas, datos tecnicos como IP e informacion sobre el uso del sitio.",
    ),
  },
  {
    title: t("3. Doeleinden", "3. Purposes", "3. Finalidades"),
    body: t(
      "Gegevens worden gebruikt om vragen te beantwoorden, afspraken te plannen, offertes te maken, opdrachten uit te voeren, websites, advertenties en content te beheren, facturen te sturen, administratie bij te houden, wettelijke verplichtingen na te komen en de website en dienstverlening te verbeteren.",
      "Data is used to answer questions, schedule appointments, prepare proposals, carry out assignments, manage websites, advertising and content, send invoices, keep administration, comply with legal obligations and improve the website and services.",
      "Los datos se usan para responder preguntas, planificar citas, preparar propuestas, ejecutar encargos, gestionar webs, anuncios y contenido, enviar facturas, mantener administracion, cumplir obligaciones legales y mejorar el sitio y los servicios.",
    ),
  },
  {
    title: t("4. Grondslagen", "4. Legal bases", "4. Bases legales"),
    body: t(
      "De verwerking vindt plaats op basis van uitvoering van een overeenkomst, voorbereiding op een overeenkomst, wettelijke verplichtingen, toestemming of gerechtvaardigd belang, zoals normale bedrijfsvoering, beveiliging, klantcontact en verbetering van de dienstverlening.",
      "Processing is based on performance of a contract, steps before entering into a contract, legal obligations, consent or legitimate interest, such as normal business operations, security, client contact and improving services.",
      "El tratamiento se basa en la ejecucion de un contrato, pasos previos al contrato, obligaciones legales, consentimiento o interes legitimo, como operacion normal, seguridad, contacto con clientes y mejora de servicios.",
    ),
  },
  {
    title: t("5. Cookies, analytics en tracking", "5. Cookies, analytics and tracking", "5. Cookies, analitica y tracking"),
    body: t(
      "De website kan functionele cookies en privacyvriendelijke analyse- of trackingtechnieken gebruiken om de website goed te laten werken, prestaties te meten en conversiepunten te begrijpen. Voor advertentie- of marketingcookies wordt waar nodig toestemming gevraagd.",
      "The website may use functional cookies and privacy-friendly analytics or tracking technologies to make the website work properly, measure performance and understand conversion points. Consent is requested where required for advertising or marketing cookies.",
      "El sitio puede usar cookies funcionales y tecnologias de analitica o tracking respetuosas con la privacidad para funcionar correctamente, medir rendimiento y entender puntos de conversion. Cuando sea necesario se solicita consentimiento para cookies publicitarias o de marketing.",
    ),
  },
  {
    title: t("6. Delen met derden", "6. Sharing with third parties", "6. Compartir con terceros"),
    body: t(
      "Persoonsgegevens worden alleen gedeeld met derden wanneer dat nodig is voor de dienstverlening, administratie, hosting, e-mail, planning, analytics, advertentieplatformen, betaalverwerking, boekhouding of wettelijke verplichtingen. Met verwerkers worden passende afspraken gemaakt.",
      "Personal data is only shared with third parties when necessary for services, administration, hosting, email, scheduling, analytics, advertising platforms, payment processing, accounting or legal obligations. Appropriate agreements are made with processors.",
      "Los datos personales solo se comparten con terceros cuando es necesario para servicios, administracion, hosting, email, planificacion, analitica, plataformas publicitarias, pagos, contabilidad u obligaciones legales. Se establecen acuerdos adecuados con encargados.",
    ),
  },
  {
    title: t("7. Bewaartermijnen", "7. Retention periods", "7. Plazos de conservacion"),
    body: t(
      "Gegevens worden niet langer bewaard dan nodig is voor het doel waarvoor ze zijn verzameld, tenzij een wettelijke bewaarplicht geldt. Administratieve en fiscale gegevens worden bewaard volgens de wettelijke termijnen. Project- en contactgegevens kunnen langer worden bewaard wanneer dat nodig is voor beheer, bewijs of continuiteit.",
      "Data is not kept longer than necessary for the purpose for which it was collected, unless a legal retention obligation applies. Administrative and tax data is kept according to statutory periods. Project and contact data may be kept longer when needed for management, evidence or continuity.",
      "Los datos no se conservan mas tiempo del necesario para el fin para el que fueron recogidos, salvo obligacion legal. Los datos administrativos y fiscales se conservan segun plazos legales. Datos de proyecto y contacto pueden conservarse mas tiempo si es necesario para gestion, prueba o continuidad.",
    ),
  },
  {
    title: t("8. Beveiliging", "8. Security", "8. Seguridad"),
    body: t(
      "Slimmer dan Gisteren neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik, onbevoegde toegang en ongewenste openbaarmaking. Toegang tot klantomgevingen wordt zo zorgvuldig mogelijk beheerd.",
      "Slimmer dan Gisteren takes appropriate technical and organisational measures to protect personal data against loss, misuse, unauthorised access and unwanted disclosure. Access to client environments is managed as carefully as possible.",
      "Slimmer dan Gisteren aplica medidas tecnicas y organizativas adecuadas para proteger datos personales contra perdida, uso indebido, acceso no autorizado y divulgacion no deseada. El acceso a entornos de clientes se gestiona con cuidado.",
    ),
  },
  {
    title: t("9. Rechten van betrokkenen", "9. Data subject rights", "9. Derechos de las personas"),
    body: t(
      "Je hebt recht op inzage, correctie, verwijdering, beperking, overdraagbaarheid en bezwaar voor zover de wet dat toestaat. Ook kan toestemming worden ingetrokken. Een verzoek kan worden gestuurd naar jimmy@slimmerdangisteren.nl. Er kan om identificatie worden gevraagd voordat een verzoek wordt behandeld.",
      "You have the right to access, correction, deletion, restriction, portability and objection where permitted by law. Consent can also be withdrawn. Requests can be sent to jimmy@slimmerdangisteren.nl. Identification may be requested before a request is handled.",
      "Tienes derecho de acceso, correccion, eliminacion, limitacion, portabilidad y oposicion cuando la ley lo permita. Tambien puedes retirar consentimiento. Las solicitudes pueden enviarse a jimmy@slimmerdangisteren.nl. Puede solicitarse identificacion antes de tramitar una solicitud.",
    ),
  },
  {
    title: t("10. Klachten", "10. Complaints", "10. Reclamaciones"),
    body: t(
      "Wanneer je vindt dat persoonsgegevens niet zorgvuldig worden verwerkt, neem dan eerst contact op via jimmy@slimmerdangisteren.nl. Daarnaast heb je het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
      "If you believe personal data is not processed carefully, please first contact jimmy@slimmerdangisteren.nl. You also have the right to lodge a complaint with the Dutch Data Protection Authority.",
      "Si consideras que los datos personales no se tratan cuidadosamente, contacta primero con jimmy@slimmerdangisteren.nl. Tambien tienes derecho a presentar una reclamacion ante la autoridad neerlandesa de proteccion de datos.",
    ),
  },
  {
    title: t("11. Wijzigingen", "11. Changes", "11. Cambios"),
    body: t(
      "Deze privacyverklaring kan worden aangepast wanneer de website, dienstverlening of wetgeving verandert. De meest recente versie staat altijd op deze pagina.",
      "This privacy statement may be updated when the website, services or law changes. The latest version is always available on this page.",
      "Esta declaracion de privacidad puede actualizarse cuando cambien el sitio, los servicios o la ley. La version mas reciente estara siempre en esta pagina.",
    ),
  },
];

export const metadata: Metadata = {
  title: "Privacyverklaring | Slimmer dan Gisteren",
  description:
    "Privacyverklaring van Slimmer dan Gisteren voor websitebezoek, contact, offertes, opdrachten, analytics en klantgegevens.",
  alternates: {
    canonical: "/privacy/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacyverklaring | Slimmer dan Gisteren",
    description:
      "Hoe Slimmer dan Gisteren persoonsgegevens verwerkt voor websitebezoek, contact, offertes, opdrachten en dienstverlening.",
    url: absoluteUrl("/privacy/"),
    siteName,
    locale: "nl_NL",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy/" },
        ])}
      />
      <SiteShell>
        <article className="legal-page">
          <header>
            <p className="eyebrow"><Text value={t("Privacy", "Privacy", "Privacidad")} /></p>
            <h1><Text value={t("Privacyverklaring", "Privacy statement", "Declaracion de privacidad")} /></h1>
            <p>
              <Text value={t(
                "Voor websitebezoek, contact, offertes, opdrachten, analytics en samenwerking met Slimmer dan Gisteren.",
                "For website visits, contact, proposals, assignments, analytics and working with Slimmer dan Gisteren.",
                "Para visitas al sitio, contacto, propuestas, encargos, analitica y colaboracion con Slimmer dan Gisteren.",
              )} />
            </p>
            <span><Text value={t("Laatst bijgewerkt: 1 augustus 2026", "Last updated: 1 August 2026", "Ultima actualizacion: 1 de agosto de 2026")} /></span>
          </header>

          <div className="legal-summary" aria-label="Belangrijkste privacyafspraken">
            {privacyHighlights.map((item) => (
              <section key={item.title.nl}>
                <h2><Text value={item.title} /></h2>
                <p><Text value={item.body} /></p>
              </section>
            ))}
          </div>

          <div className="legal-sections">
            {privacySections.map((section) => (
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
