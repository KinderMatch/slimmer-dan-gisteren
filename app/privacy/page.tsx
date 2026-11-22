import type { Metadata } from "next";
import { languageAlternates } from "../i18n";

import { JsonLd } from "../json-ld";
import { Text } from "../language";
import type { Language } from "../language";
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
    title: t("Klantwinst-check aanvragen", "Klantwinst-check applications", "Solicitudes Klantwinst-check"),
    body: t(
      "Bij een aanvraag verwerken wij je naam, e-mailadres, website, aanbod en doel om je aanvraag te behandelen en het analysegesprek te plannen. Twilio verwerkt en bewaart de formulierinzending en verstuurt de ontvangstbevestiging en onze melding. Deze verwerking vindt plaats in de Verenigde Staten. De formulieropslag vervalt na 180 dagen; eventuele vervolgcorrespondentie valt onder de overige bewaartermijnen. Voor spambeveiliging gebruiken wij tijdelijke tellers en een niet leesbare afleiding van je e-mailadres. Na verzending kun je je gesprek via Calendly plannen. Hiervoor laden wij de Calendly-planner en vullen wij je naam en e-mailadres alvast in. Calendly verwerkt je boeking en verstuurt de afspraakbevestiging. Je wordt niet automatisch ingeschreven voor nieuwsbrieven of reclamemails.",
      "When you apply, we process your name, email, website, offer and goal to handle your application and schedule the analysis call. Twilio stores the form submission and sends your receipt and our notification. Processing takes place in the United States. Form records expire after 180 days; subsequent correspondence is covered by the other retention periods. Spam protection uses temporary counters and a keyed hash of your email address. After submitting, you can book through Calendly. We load its scheduler and pre-fill your name and email address. Calendly processes the booking and sends the appointment confirmation. We do not automatically subscribe you to newsletters or marketing emails.",
      "Al solicitar la revision, tratamos tu nombre, email, web, oferta y objetivo para gestionar la solicitud y concertar la llamada. Twilio guarda el formulario y envia la confirmacion y nuestra notificacion. El tratamiento se realiza en Estados Unidos. Los registros del formulario caducan a los 180 dias; la correspondencia posterior se rige por los demas plazos. La proteccion antispam utiliza contadores temporales y un hash con clave del email. Tras enviar, puedes reservar con Calendly. Cargamos su agenda y rellenamos tu nombre y email. Calendly procesa la reserva y envia la confirmacion de la cita. No te suscribimos automaticamente a boletines ni publicidad.",
    ),
  },
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
      "Alleen na jouw toestemming laden we Google Analytics 4. Daarmee meten we paginaweergaven, taal, knoppen en contactacties, zoals klikken op telefoon, e-mail, WhatsApp en afspraken. Formulierinhoud, e-mailadressen en telefoonnummers sturen we niet mee als meetgegevens. Een klik is geen bevestigde aanvraag. Advertentiepersonalisatie staat uit. Je keuze wordt 180 dagen in je browser bewaard; Analytics-cookies hebben een ingestelde looptijd van 180 dagen. Via Cookievoorkeuren kun je toestemming altijd weigeren of intrekken. Bij intrekking stoppen we de meting en verwijderen we de Analytics-cookies op dit domein. Google kan gegevens buiten de EER verwerken; zie ook het privacybeleid van Google. Voor de Klantwinst-pagina vragen wij apart toestemming voor de Meta-pixel. Die meet paginaweergaven en succesvol opgeslagen aanvragen voor de beoordeling van Instagram- en Facebook-advertenties. Een klik of het openen van Calendly telt niet als aanvraag. Wij sturen geen naam, e-mailadres, telefoonnummer of formulierinhoud als meetvelden naar Meta en gebruiken geen geavanceerde matching. Meta ontvangt wel technische gegevens, zoals IP-adres, browser, pagina-adres en cookie-identificatoren, en kan die koppelen aan een Meta-account. Meta kan gegevens buiten de EER verwerken en gebruiken volgens het Meta-privacybeleid. De cookies _fbp en, na een advertentieklik, _fbc kunnen circa 90 dagen blijven staan. Je aparte advertentiekeuze wordt 180 dagen bewaard. Via Cookievoorkeuren kun je beide categorieën afzonderlijk weigeren of intrekken; dan stoppen wij de betreffende meting en verwijderen wij de bijbehorende cookies op dit domein.",
      "We load Google Analytics 4 only with your consent. It measures page views, language, buttons and contact actions, including phone, email, WhatsApp and appointment clicks. We do not send form contents, email addresses or phone numbers as measurement data. A click is not a confirmed enquiry. Advertising personalisation is disabled. Your choice is stored in your browser for 180 days; Analytics cookies have a configured lifetime of 180 days. You can reject or withdraw consent at any time via Cookie preferences. On withdrawal, we stop measurement and remove Analytics cookies on this domain. Google may process data outside the EEA; see also Google's privacy policy. On the Klantwinst page, we request separate consent for Meta Pixel to measure page views and successfully saved enquiries for Instagram and Facebook ad measurement. Clicks and opening Calendly are not enquiries. We do not send names, email addresses, phone numbers or form contents as measurement fields to Meta, and do not use advanced matching. Meta receives technical data such as IP address, browser, page URL and cookie identifiers, which it may link to a Meta account. Meta may process data outside the EEA and use it under its privacy policy. The _fbp and, after an ad click, _fbc cookies may last around 90 days. Your separate advertising choice is stored for 180 days. Cookie preferences lets you reject or withdraw each category separately; we then stop the relevant measurement and remove its cookies on this domain.",
      "Solo cargamos Google Analytics 4 con tu consentimiento. Medimos visitas, idioma, botones y acciones de contacto, incluidos clics de teléfono, correo, WhatsApp y citas. No enviamos el contenido de formularios, direcciones de correo ni números de teléfono como datos de medición. Un clic no es una solicitud confirmada. La personalización publicitaria está desactivada. Tu elección se guarda en el navegador durante 180 días; las cookies de Analytics tienen una duración configurada de 180 días. Puedes rechazar o retirar tu consentimiento desde Preferencias de cookies. Al retirarlo, detenemos la medición y eliminamos las cookies de Analytics de este dominio. Google puede tratar datos fuera del EEE; consulta también su política de privacidad. En Klantwinst pedimos consentimiento separado para Meta Pixel, que mide visitas y solicitudes guardadas para evaluar anuncios de Instagram y Facebook. Los clics y abrir Calendly no cuentan como solicitudes. No enviamos nombres, correos, teléfonos ni contenido del formulario como campos de medición y no usamos coincidencia avanzada. Meta recibe datos técnicos, como IP, navegador, URL e identificadores de cookies, que puede vincular a una cuenta Meta. Puede tratar datos fuera del EEE según su política de privacidad. Las cookies _fbp y, tras un clic publicitario, _fbc pueden durar unos 90 días. Guardamos tu elección publicitaria durante 180 días. Puedes rechazar o retirar cada categoría en Preferencias de cookies; detenemos la medición correspondiente y eliminamos sus cookies en este dominio.",
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
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Slimmer dan Gisteren voor websitebezoek, contact, offertes, opdrachten, analytics en klantgegevens.",
  alternates: languageAlternates("/privacy/"),
  robots: {
    index: false,
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

export default function PrivacyPage({ initialLanguage = "nl" }: { initialLanguage?: Language } = {}) {
  return (
    <>
      <JsonLd locale={initialLanguage}
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy/" },
        ])}
      />
      <SiteShell initialLanguage={initialLanguage}>
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
            <span><Text value={t("Laatst bijgewerkt: 27 oktober 2026", "Last updated: 27 October 2026", "Última actualización: 27 de octubre de 2026")} /></span>
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
