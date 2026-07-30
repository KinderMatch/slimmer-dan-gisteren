import Link from "next/link";
import type { ReactNode } from "react";

import { ArtistEventShowcase } from "./artist-event-showcase";
import { ContentGallery as InteractiveContentGallery } from "./content-gallery";
import { LanguageProvider, LanguageToggle, type LocalizedString, Text } from "./language";
import { MediaLightbox } from "./media-lightbox";

export { VideoShowcase } from "./video-showcase";

const t = (nl: string, en: string, es = en): LocalizedString => ({ nl, en, es });

export const services = [
  {
    kicker: t("Website & SEO", "Website & SEO", "Web y SEO"),
    title: t("Website laten maken, beheren en beter vindbaar maken.", "Build, manage and improve the visibility of your website.", "Crear, gestionar y mejorar la visibilidad de tu web."),
    href: "/website/",
    summary: t(
      "Van live websitecases tot praktisch beheer: pagina's aanpassen, techniek netjes houden, SEO verbeteren en zorgen dat je website klaarstaat voor campagnes.",
      "From live website cases to practical management: updating pages, keeping the technical side clean, improving SEO and making sure your website is ready for campaigns.",
      "Desde casos web en vivo hasta gestión práctica: actualizar páginas, mantener la técnica ordenada, mejorar SEO y preparar la web para campañas.",
    ),
    proof: t("Website, beheer en SEO", "Website, management and SEO", "Web, gestión y SEO"),
  },
  {
    kicker: t("Advertenties", "Advertising", "Anuncios"),
    title: t("Campagnes die meetbaar nieuwe aanvragen opleveren.", "Campaigns that measurably generate new enquiries.", "Campañas que generan solicitudes medibles."),
    href: "/advertenties/",
    summary: t(
      "Advertenties werken pas goed als strategie, landingspagina, tracking en rapportage kloppen. Daarom sturen we op aanvragen, kosten en duidelijke maandelijkse inzichten.",
      "Advertising only works properly when strategy, landing page, tracking and reporting line up. That is why we optimize for enquiries, cost and clear monthly insight.",
      "Los anuncios funcionan bien cuando estrategia, página de destino, tracking e informes están alineados. Por eso optimizamos solicitudes, costes e información clara cada mes.",
    ),
    proof: t("Strategie, tracking en optimalisatie", "Strategy, tracking and optimization", "Estrategia, tracking y optimización"),
  },
  {
    kicker: t("Content creatie", "Content creation", "Creación de contenido"),
    title: t("Video, fotografie en social content die je verhaal laat zien.", "Video, photography and social content that show your story.", "Video, fotografía y contenido social que muestran tu historia."),
    href: "/content-creatie/",
    summary: t(
      "Van zakelijke videocases tot reiscontent, artiesten, evenementen en B2C-verhalen: beeld dat meteen gevoel geeft en bruikbaar is voor website, socials en advertenties.",
      "From business video cases to travel content, artists, events and B2C stories: visuals that immediately create feeling and work across website, social and advertising.",
      "Desde videos empresariales hasta viajes, artistas, eventos e historias B2C: contenido visual que transmite emoción y sirve para web, redes y anuncios.",
    ),
    proof: t("Video, fotografie en social formats", "Video, photography and social formats", "Video, fotografía y formatos sociales"),
  },
];

const navItems = [
  { label: t("Website", "Website", "Web"), href: "/website/" },
  { label: t("Advertenties", "Advertising", "Anuncios"), href: "/advertenties/" },
  { label: t("Content creatie", "Content creation", "Creación de contenido"), href: "/content-creatie/" },
];

const websites = [
  { title: "Zelfstandigen Bouw", url: "https://www.zelfstandigenbouw.nl/" },
  { title: "Trouwshots.nl", url: "https://trouwshots.nl/" },
  { title: "Nieuwbouw Makelaar Spanje", url: "https://www.nieuwbouwmakelaarspanje.com/" },
  { title: "Limisan", url: "https://limisan.nl/" },
  { title: "Kozijnrubbers (Externe websitebouwer FEKA)", url: "https://kozijnrubbers.nl/" },
  { title: "Spanje Advies", url: "https://spanje-advies.nl/" },
  { title: "Paul Seuntjens", url: "https://paulseuntjens.nl/" },
];

const googleAdsItems = [
  {
    title: t("Strategie", "Strategy", "Estrategia"),
    body: t(
      "Slimmer dan Gisteren helpt bij het ontwikkelen van een doordachte strategie voor campagnes over verschillende kanalen. Dit zorgt voor overzicht en een optimale aanpak om nieuwe klanten aan te trekken. Op basis van de doelstellingen wordt een heldere koers uitgezet die aansluit bij de groeiambities van de organisatie.",
      "Slimmer dan Gisteren helps develop a thoughtful strategy for campaigns across multiple channels. This creates clarity and the right approach for attracting new customers. Based on the goals, a clear direction is set that matches the organization's growth ambitions.",
      "Slimmer dan Gisteren ayuda a desarrollar una estrategia pensada para campañas en distintos canales. Esto aporta claridad y el enfoque adecuado para atraer nuevos clientes. Según los objetivos, se define una dirección clara alineada con las ambiciones de crecimiento.",
    ),
  },
  {
    title: t("Inrichten accounts", "Account setup", "Configuración de cuentas"),
    body: t(
      "Van het aanmaken en juist instellen tot het koppelen en inrichten van advertentieaccounts, websites, analytics en meer. Slimmer dan Gisteren regelt het volledig.",
      "From creating and configuring accounts to connecting advertising accounts, websites, analytics and more. Slimmer dan Gisteren takes care of the full setup.",
      "Desde crear y configurar correctamente hasta conectar cuentas publicitarias, webs, analytics y más. Slimmer dan Gisteren se encarga de toda la configuración.",
    ),
  },
  {
    title: t("Conversie tracking", "Conversion tracking", "Tracking de conversiones"),
    body: t(
      "Slimmer dan Gisteren zorgt voor correcte conversietoewijzing aan campagnes. Resultaten worden meetbaar gemaakt en inzichtelijk vertaald naar ROAS en groeikansen.",
      "Slimmer dan Gisteren makes sure conversions are correctly attributed to campaigns. Results become measurable and are translated into ROAS and growth opportunities.",
      "Slimmer dan Gisteren se asegura de que las conversiones se atribuyan correctamente a las campañas. Los resultados se vuelven medibles y se traducen en ROAS y oportunidades de crecimiento.",
    ),
  },
  {
    title: t("Campagne optimalisatie", "Campaign optimization", "Optimización de campañas"),
    body: t(
      "Met audits en advies zorgt Slimmer dan Gisteren voor betere campagneprestaties, nu en in de toekomst. Campagnes worden klaargestoomd voor duurzame resultaten.",
      "Through audits and advice, Slimmer dan Gisteren improves campaign performance now and in the future. Campaigns are prepared for sustainable results.",
      "Con auditorías y asesoramiento, Slimmer dan Gisteren mejora el rendimiento de campañas ahora y en el futuro. Las campañas se preparan para resultados sostenibles.",
    ),
  },
  {
    title: t("Performance meeting", "Performance meeting"),
    body: t(
      "Inzichtelijk maken van de maandelijkse performance en begrijpen wat de cijfers betekenen.",
      "Making monthly performance clear and understanding what the numbers actually mean.",
      "Hacer claro el rendimiento mensual y entender qué significan realmente los datos.",
    ),
  },
];

const websiteWorkflow = [
  {
    title: t("Beheer zonder ruis", "Management without noise", "Gestión sin ruido"),
    body: t(
      "Een duidelijk aanspreekpunt voor aanpassingen, updates en praktische websitevragen.",
      "One clear point of contact for changes, updates and practical website questions.",
      "Un punto de contacto claro para cambios, actualizaciones y preguntas prácticas sobre la web.",
    ),
  },
  {
    title: t("Samenwerking met bouwers", "Working with developers", "Colaboración con desarrolladores"),
    body: t(
      "Websitebeheer kan rechtstreeks via Slimmer dan Gisteren of in samenwerking met een externe websitebouwer.",
      "Website management can be handled directly by Slimmer dan Gisteren or together with an external website developer.",
      "La gestión web puede hacerse directamente con Slimmer dan Gisteren o junto a un desarrollador externo.",
    ),
  },
  {
    title: t("Klaar voor marketing", "Ready for marketing", "Lista para marketing"),
    body: t(
      "De website blijft bruikbaar voor campagnes, tracking, conversie en groei.",
      "The website stays useful for campaigns, tracking, conversion and growth.",
      "La web sigue siendo útil para campañas, tracking, conversión y crecimiento.",
    ),
  },
];

const testimonials = [
  {
    name: "Kozijnrubbers.nl",
    text: t(
      "Sinds we samen werken met Slimmer dan Gisteren is onze onlinemarketing naar een hoger niveau getild. Niet alleen zijn onze marketingkosten aanzienlijk gedaald, we trekken ook duidelijk meer bezoekers naar onze website. Het team denkt proactief mee, legt helder uit welke strategieën zij inzetten en waarom, en heeft ons echt geholpen om marketing beter te begrijpen. Dankzij hun expertise voelen we ons sterker in onze keuzes en zien we concrete resultaten. Een absolute aanrader voor wie slimmer wil groeien.",
      "Since working with Slimmer dan Gisteren, our online marketing has been taken to a higher level. Our marketing costs have dropped significantly and we clearly attract more visitors to our website. The team thinks proactively, explains which strategies they use and why, and has helped us understand marketing better. Thanks to their expertise we feel stronger in our decisions and see concrete results. Highly recommended for anyone who wants to grow smarter.",
    ),
  },
  {
    name: "Rob en Rene",
    text: t(
      "Slimmer dan Gisteren werd ons aangeraden door onze websitebouwer en we hebben met 50% minder advertentiekosten hetzelfde of betere resultaten per maand, dan onze vorige marketingpartij.",
      "Slimmer dan Gisteren was recommended by our website developer. With 50% lower advertising costs, we now achieve the same or better monthly results than with our previous marketing agency.",
    ),
  },
  {
    name: "Pauwel",
    text: t(
      "Als makelaar in Spaans vastgoed had ik moeite om de online ontwikkeling bij te benen. Door in zee te gaan met Slimmer dan Gisteren heb ik vandaag de dag nog steeds profijt van online leads, die daadwerkelijk waardevol zijn. Dat niet alleen; ik begrijp het marketinglandschap beter. Ik maak gebruik van de marketingdiensten; marketingstrategie, advertenties, social ads en website optimalisatie vanaf maart 2023.",
      "As a real estate agent in Spanish property, I struggled to keep up with online developments. By working with Slimmer dan Gisteren, I still benefit from online leads that are genuinely valuable. On top of that, I understand the marketing landscape better. Since March 2023 I have used their marketing services: strategy, advertising, social ads and website optimization.",
    ),
  },
  {
    name: "Joris",
    text: t(
      "Aangedragen door een vriend van mij, die al bij Slimmer dan Gisteren aangesloten zat. De goede verhalen waar gemaakt, want ontvang nu meer leads en hoef niet alles meer uit eigen netwerk te halen. Erg belangrijk voor duurzaamheid van mijn bedrijfsvoering.",
      "A friend who was already working with Slimmer dan Gisteren referred me. The good stories turned out to be true: I now receive more leads and no longer have to get everything from my own network. That is very important for the sustainability of my business.",
    ),
  },
];

const videos = [
  {
    title: "Zelfstandigen Bouw - hondenhok",
    src: "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - schilder",
    src: "https://videos.files.wordpress.com/kQCILAhM/zelfstandigen-bouw_commercial_rbv_schilder_final_1x1_social.mp4",
  },
  {
    title: "Zelfstandigen Bouw - auto",
    src: "https://videos.files.wordpress.com/2MO1QuZC/zelfstandigen-bouw_commercial_rbv_auto_final_1x1_social.mp4",
  },
  {
    title: "The Gym Republic",
    src: "https://videos.files.wordpress.com/JEXpAg8v/the-gym-republic-v1.mp4",
  },
  {
    title: "Massaclaim",
    src: "https://videos.files.wordpress.com/AJxtK3QH/massaclaim-airbnb-servicekostenterug.mp4",
  },
  {
    title: "Daelenbroek Makelaardij",
    src: "https://videos.files.wordpress.com/0Bey1EBn/daelenbroek-3-ja-makelaardij.mp4",
  },
];

const contentImages = [
  { src: "/assets/content-zb.png", alt: t("Contentvoorbeeld Zelfstandigen Bouw", "Content example for Zelfstandigen Bouw", "Ejemplo de contenido para Zelfstandigen Bouw") },
  { src: "/assets/content-nxchange.png", alt: t("Contentvoorbeeld Nxchange", "Content example for Nxchange", "Ejemplo de contenido para Nxchange") },
  { src: "/assets/content-color-run.png", alt: t("The Color Run content creatie voorbeeld", "The Color Run content creation example", "Ejemplo de contenido para The Color Run") },
  { src: "/assets/content-airbnb.png", alt: t("HealthyFest content creatie voorbeeld", "HealthyFest content creation example", "Ejemplo de contenido para HealthyFest") },
  { src: "/assets/content-maasclaim.png", alt: t("ChickShack Valencia content creatie voorbeeld", "ChickShack Valencia content creation example", "Ejemplo de contenido para ChickShack Valencia") },
];

const travelVideos = [
  { title: "Siargao", label: t("Island story", "Island story", "Historia de isla"), src: "/assets/travel/siargao-preview.mov", fullSrc: "/assets/travel/full/siargao-full.m4v" },
  { title: "K'gari & Noosa", label: t("Coastal campaign", "Coastal campaign", "Campaña costera"), src: "/assets/travel/kgari-noosa-preview.mov", fullSrc: "/assets/travel/full/kgari-noosa-full.m4v" },
  { title: "Whitsundays", label: t("Destination film", "Destination film", "Video de destino"), src: "/assets/travel/whitsundays-preview.mov", fullSrc: "/assets/travel/full/whitsundays-full.m4v" },
  { title: "Great Barrier Reef", label: t("Experience content", "Experience content", "Contenido de experiencia"), src: "/assets/travel/dive-cairns-preview.mov", fullSrc: "/assets/travel/full/dive-cairns-full.m4v" },
  { title: "Huacachina & Paracas", label: t("Travel reel", "Travel reel", "Reel de viaje"), src: "/assets/travel/huacacina-paracas-preview.mov", fullSrc: "/assets/travel/full/huacacina-paracas-full.m4v" },
];

const weddingCase = {
  title: "Nordin & Kyra",
  image: "/assets/wedding/airfoto.jpg",
  video: "/assets/wedding/nordin-kyra-preview.mov",
  fullVideo: "https://videos.files.wordpress.com/E5ahlDJ7/trouwerij-nordin-kyra-v3-h264.mp4",
};

const artistVideos = [
  { title: "Dave Dekker", label: t("Artiest content", "Artist content", "Contenido para artista"), src: "/assets/dave-dekker/dave-1-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-1-full.mov" },
  { title: "De Rode Loper", label: t("Event registratie", "Event recording", "Registro de evento"), src: "/assets/dave-dekker/dave-3-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-3-full.mov" },
  { title: "Beurs van Berlage", label: t("Live moment", "Live moment", "Momento en vivo"), src: "/assets/dave-dekker/dave-4-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-4-full.mov" },
  { title: "Performance cut", label: t("Social video", "Social video", "Video social"), src: "/assets/dave-dekker/dave-5-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-5-full.mov" },
];

const artistPhotos = [
  { src: "/assets/dave-dekker/photos/event-01.jpg", alt: t("Panelgesprek tijdens De Rode Loper bij de Beurs van Berlage", "Panel discussion during De Rode Loper at the Beurs van Berlage", "Panel durante De Rode Loper en la Beurs van Berlage") },
  { src: "/assets/dave-dekker/photos/event-02.jpg", alt: t("Publiek filmt het eventmoment tijdens De Rode Loper", "Audience filming the event moment during De Rode Loper", "Público grabando el momento durante De Rode Loper") },
  { src: "/assets/dave-dekker/photos/event-03.jpg", alt: t("Eventfotografie met publiek en sprekers in de zaal", "Event photography with audience and speakers in the room", "Fotografía de evento con público y ponentes en la sala") },
  { src: "/assets/dave-dekker/photos/event-04.jpg", alt: t("Publiek in de zaal tijdens een artiesten- en eventmoment", "Audience in the room during an artist and event moment", "Público en la sala durante un momento artístico y de evento") },
  { src: "/assets/dave-dekker/photos/event-05.jpg", alt: t("Muzikant achter de piano tijdens De Rode Loper", "Musician at the piano during De Rode Loper", "Músico al piano durante De Rode Loper") },
  { src: "/assets/dave-dekker/photos/event-06.jpg", alt: t("Panelleden tijdens het gesprek op het podium", "Panel members during the on-stage conversation", "Panelistas durante la conversación en el escenario") },
  { src: "/assets/dave-dekker/photos/event-07.jpg", alt: t("Volle zaal bij Dave Dekker en De Rode Loper", "Full room at Dave Dekker and De Rode Loper", "Sala llena en Dave Dekker y De Rode Loper") },
  { src: "/assets/dave-dekker/photos/event-08.jpg", alt: t("Close-up van sprekers tijdens het event", "Close-up of speakers during the event", "Primer plano de ponentes durante el evento") },
  { src: "/assets/dave-dekker/photos/event-09.jpg", alt: t("Vraag uit het publiek tijdens De Rode Loper", "Question from the audience during De Rode Loper", "Pregunta del público durante De Rode Loper") },
  { src: "/assets/dave-dekker/photos/event-10.jpg", alt: t("Panelgesprek met microfoonmoment op het podium", "Panel discussion with a microphone moment on stage", "Panel con momento de micrófono en el escenario") },
  { src: "/assets/dave-dekker/photos/event-11.jpg", alt: t("Overzicht van de zaal en het podium tijdens Dave Dekker", "Overview of the room and stage during Dave Dekker", "Vista general de la sala y el escenario durante Dave Dekker") },
  { src: "/assets/dave-dekker/photos/event-12.jpg", alt: t("Spreker met microfoon tijdens het panelgesprek", "Speaker with microphone during the panel discussion", "Ponente con micrófono durante el panel") },
  { src: "/assets/dave-dekker/photos/event-13.jpg", alt: t("Breed overzicht van publiek en podium in de Beurs van Berlage", "Wide view of audience and stage at the Beurs van Berlage", "Vista amplia del público y escenario en la Beurs van Berlage") },
  { src: "/assets/dave-dekker/photos/event-14.jpg", alt: t("Moderator met microfoon tijdens De Rode Loper", "Moderator with microphone during De Rode Loper", "Moderador con micrófono durante De Rode Loper") },
  { src: "/assets/dave-dekker/photos/event-15.jpg", alt: t("Panelleden en publiek tijdens het event", "Panel members and audience during the event", "Panelistas y público durante el evento") },
];

const proofItems = [
  { value: "50%", label: t("minder advertentiekosten in klantcase", "lower ad spend in a client case", "menos inversión publicitaria en un caso cliente") },
  { value: "7", label: t("websites in beheer of samenwerking", "websites managed or supported", "webs gestionadas o en colaboración") },
  { value: "3", label: t("kanalen: website, ads en social", "channels: website, ads and social", "canales: web, anuncios y social") },
];

function videoPreviewSrc(src: string) {
  return `${src}#t=0.001`;
}

export const homeHeroVideoSrc = videoPreviewSrc(videos[3].src);

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <header className="site-header">
        <Link className="brand" href="/">
          <img src="/assets/logo.png" alt="Slimmer dan Gisteren" />
          <span>Slimmer dan Gisteren</span>
        </Link>
        <nav aria-label="Hoofdnavigatie">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Text value={item.label} />
            </Link>
          ))}
        </nav>
        <LanguageToggle />
        <a className="header-cta" href="https://wa.me/31610175027">
          <Text value={t("Contact", "Contact", "Contacto")} />
        </a>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-video">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src={videoPreviewSrc(videos[5].src)} type="video/mp4" />
          </video>
          <div>
            <p className="eyebrow"><Text value={t("Klaar om slimmer te groeien?", "Ready to grow smarter?", "¿Listo para crecer de forma más inteligente?")} /></p>
            <h2><Text value={t("Laat website, advertenties en content samenwerken.", "Let your website, advertising and content work together.", "Haz que tu web, tus anuncios y tu contenido trabajen juntos.")} /></h2>
            <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
              <Text value={t("Plan kennismaking", "Book an introduction", "Agenda una llamada")} />
            </a>
          </div>
        </div>
        <div className="footer-brand">
          <img src="/assets/logo.png" alt="" />
          <div>
            <p>Slimmer dan Gisteren</p>
            <span><Text value={t("Groei begint met vandaag.", "Growth starts today.", "El crecimiento empieza hoy.")} /></span>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/website/"><Text value={t("Website", "Website", "Web")} /></Link>
          <Link href="/advertenties/"><Text value={t("Advertenties", "Advertising", "Anuncios")} /></Link>
          <Link href="/content-creatie/"><Text value={t("Content creatie", "Content creation", "Creación de contenido")} /></Link>
          <a href="https://calendly.com/buitenhuisj004/bmc-sessie"><Text value={t("Kennismaken", "Introduction", "Conocernos")} /></a>
        </div>
      </footer>
    </LanguageProvider>
  );
}

export function HomeWorkGrid() {
  const workItems = [
    {
      type: "video",
      title: "Zelfstandigen Bouw - hondenhok",
      label: t("Video advertentie", "Video ad", "Anuncio en video"),
      src: videos[0].src,
    },
    {
      type: "video",
      title: "Zelfstandigen Bouw - schilder",
      label: t("Campagnevariant", "Campaign variant", "Variante de campaña"),
      src: videos[1].src,
    },
    {
      type: "video",
      title: "Zelfstandigen Bouw - auto",
      label: t("Social cutdown", "Social cutdown", "Versión para redes"),
      src: videos[2].src,
    },
    {
      type: "video",
      title: "The Gym Republic",
      label: t("Brand video", "Brand video", "Video de marca"),
      src: videos[3].src,
    },
    {
      type: "video",
      title: "Massaclaim",
      label: t("Campagnevideo", "Campaign video", "Video de campaña"),
      src: videos[4].src,
    },
    {
      type: "video",
      title: "Daelenbroek Makelaardij",
      label: t("Lokale zichtbaarheid", "Local visibility", "Visibilidad local"),
      src: videos[5].src,
    },
    {
      type: "image",
      title: t("Contentkalender", "Content calendar", "Calendario de contenido"),
      label: t("Social content", "Social content", "Contenido social"),
      src: "/assets/content-zb.png",
    },
    {
      type: "image",
      title: "Nxchange",
      label: t("Contentvoorbeeld", "Content example", "Ejemplo de contenido"),
      src: "/assets/content-nxchange.png",
    },
  ];

  return (
    <div className="home-work-grid">
      {workItems.map((item, index) => (
        <MediaLightbox
          className={`work-tile ${index === 0 ? "large" : ""}`}
          key={`${typeof item.title === "string" ? item.title : item.title.nl}-${index}`}
          label={item.label}
          src={item.src}
          title={item.title}
          type={item.type as "image" | "video"}
        >
          {item.type === "video" ? (
            <video autoPlay loop muted playsInline preload="metadata">
              <source src={videoPreviewSrc(item.src)} type="video/mp4" />
            </video>
          ) : (
            <img src={item.src} alt={typeof item.title === "string" ? item.title : item.title.nl} loading="lazy" />
          )}
          <div>
            <span><Text value={item.label} /></span>
            <h3><Text value={item.title} /></h3>
          </div>
        </MediaLightbox>
      ))}
    </div>
  );
}

export function KitchenPanels() {
  return (
    <div className="kitchen-panels">
      <article className="kitchen-panel ads-panel">
        <div className="kitchen-copy">
          <span><Text value={t("Adverteren", "Advertising", "Publicidad")} /></span>
          <h3><Text value={t("Campagnes die meetbaar blijven.", "Campaigns that stay measurable.", "Campañas que siguen siendo medibles.")} /></h3>
          <p><Text value={t("Strategie, inrichting, tracking en optimalisatie worden zichtbaar gemaakt in een dashboard-achtige laag.", "Strategy, setup, tracking and optimization are made visible in a dashboard-like layer.", "Estrategia, configuración, tracking y optimización se visualizan en una capa tipo dashboard.")} /></p>
        </div>
        <div className="mini-dashboard" aria-hidden="true">
          <div>
            <span>ROAS</span>
            <strong>+38%</strong>
          </div>
          <div>
            <span>CPA</span>
            <strong>-50%</strong>
          </div>
          <div className="mini-bars">
            <i style={{ height: "38%" }} />
            <i style={{ height: "58%" }} />
            <i style={{ height: "44%" }} />
            <i style={{ height: "76%" }} />
            <i style={{ height: "88%" }} />
          </div>
        </div>
      </article>

      <article className="kitchen-panel website-panel">
        <div className="kitchen-copy">
          <span><Text value={t("Websites", "Websites", "Webs")} /></span>
          <h3><Text value={t("Beheer en cases die direct te bekijken zijn.", "Management and cases you can view directly.", "Gestión y casos que puedes ver directamente.")} /></h3>
          <p><Text value={t("Geen abstract verhaal, maar zichtbare websites, beheer en marketingklaar fundament.", "No abstract story, but visible websites, management and a marketing-ready foundation.", "No una historia abstracta, sino webs visibles, gestión y una base preparada para marketing.")} /></p>
        </div>
        <div className="browser-preview" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
          </div>
          <iframe title="Zelfstandigen Bouw preview" src="https://www.zelfstandigenbouw.nl/" loading="lazy" />
        </div>
      </article>

      <article className="kitchen-panel content-panel">
        <div className="kitchen-copy">
          <span><Text value={t("Content creatie", "Content creation", "Creación de contenido")} /></span>
          <h3><Text value={t("Video en social content in dezelfde stijl.", "Video and social content in one style.", "Video y contenido social con el mismo estilo.")} /></h3>
          <p><Text value={t("Beeld, campagne en kanaal sluiten op elkaar aan, zodat bezoekers meteen zien waarvoor ze aankloppen.", "Visuals, campaign and channel fit together so visitors immediately see what you can help with.", "Imagen, campaña y canal encajan para que los visitantes vean al instante qué puedes ofrecer.")} /></p>
        </div>
        <div className="content-strip">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src={videoPreviewSrc(videos[4].src)} type="video/mp4" />
          </video>
          <img src="/assets/content-nxchange.png" alt="" loading="lazy" />
        </div>
      </article>
    </div>
  );
}

export function DisciplineRunway() {
  const runwayItems = [
    {
      kicker: t("Advertenties", "Advertising", "Anuncios"),
      title: t("Vraag en aanbod sneller bij elkaar.", "Connecting demand and supply faster.", "Conectar demanda y oferta más rápido."),
      body: t(
        "Campagnes worden ingericht met tracking, rapportage en maandelijkse optimalisatie.",
        "Campaigns are set up with tracking, reporting and monthly optimization.",
        "Las campañas se configuran con tracking, informes y optimización mensual.",
      ),
      href: "/advertenties/",
      visual: "ads",
      video: videos[4].src,
    },
    {
      kicker: t("Websites", "Websites", "Webs"),
      title: t("Een basis die beheerbaar blijft.", "A foundation that stays manageable.", "Una base que sigue siendo gestionable."),
      body: t(
        "Websites, beheer en samenwerking met bouwers worden zichtbaar gemaakt via live cases.",
        "Websites, management and collaboration with developers are shown through live cases.",
        "Las webs, la gestión y la colaboración con desarrolladores se muestran con casos en vivo.",
      ),
      href: "/website/",
      visual: "website",
      video: videos[0].src,
    },
    {
      kicker: t("Content creatie", "Content creation", "Creación de contenido"),
      title: t("Video en social als bewijs van het werk.", "Video and social as proof of the work.", "Video y redes como prueba del trabajo."),
      body: t(
        "De contentvoorbeelden en videocases geven meteen gevoel bij de campagnes.",
        "The content examples and video cases immediately give a feel for the campaigns.",
        "Los ejemplos de contenido y los casos en video transmiten enseguida la sensación de las campañas.",
      ),
      href: "/content-creatie/",
      visual: "content",
      video: videos[2].src,
    },
  ];

  return (
    <div className="discipline-runway">
      {runwayItems.map((item, index) => (
        <Link className={`runway-item ${item.visual}`} href={item.href} key={item.href}>
          <div className="runway-copy">
            <span>{String(index + 1).padStart(2, "0")} / <Text value={item.kicker} /></span>
            <h3><Text value={item.title} /></h3>
            <p><Text value={item.body} /></p>
          </div>
          <div className="runway-visual" aria-hidden="true">
            {item.visual === "ads" ? (
              <div className="runway-video-card">
                <video muted playsInline preload="metadata">
                  <source src={videoPreviewSrc(item.video)} type="video/mp4" />
                </video>
                <strong><Text value={t("Advertenties + creative", "Advertising + creative", "Anuncios + creatividad")} /></strong>
              </div>
            ) : item.visual === "website" ? (
              <div className="runway-website-card">
                <iframe title="Websitecase Zelfstandigen Bouw" src={websites[0].url} loading="lazy" />
                <span><Text value={t("Live website", "Live website", "Web en vivo")} /></span>
              </div>
            ) : (
              <>
                <video muted playsInline preload="metadata">
                  <source src={videoPreviewSrc(item.video)} type="video/mp4" />
                </video>
                <img src="/assets/content-airbnb.png" alt="" loading="lazy" />
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WebsiteFeatureCase() {
  return (
    <div className="website-feature-case">
      <div className="website-feature-copy">
        <p className="eyebrow"><Text value={t("Uit de praktijk", "From practice", "Desde la práctica")} /></p>
        <h2><Text value={t("Websitebeheer wordt sterker als marketing meteen mee kan kijken.", "Website management becomes stronger when marketing can look along from the start.", "La gestión web mejora cuando marketing puede participar desde el principio.")} /></h2>
        <p>
          <Text value={t(
            "De website is niet alleen een online visitekaartje. Hij moet bruikbaar blijven voor campagnes, tracking, aanpassingen en duidelijke samenwerking tussen ondernemer, bouwer en marketing.",
            "A website is not just an online business card. It needs to stay useful for campaigns, tracking, changes and clear collaboration between the entrepreneur, developer and marketing.",
            "Una web no es solo una tarjeta de presentación online. Tiene que seguir funcionando para campañas, tracking, cambios y una colaboración clara entre empresa, desarrollador y marketing.",
          )} />
        </p>
        <div className="case-tags">
          <span><Text value={t("Beheer", "Management", "Gestión")} /></span>
          <span>Tracking</span>
          <span><Text value={t("Campagneklaar", "Campaign-ready", "Lista para campañas")} /></span>
        </div>
      </div>
      <div className="website-live-frame">
        <div>
          <span><Text value={t("Live websitecase", "Live website case", "Caso web en vivo")} /></span>
          <strong>Zelfstandigen Bouw</strong>
          <small><Text value={t("Live preview", "Live preview", "Vista previa en vivo")} /></small>
        </div>
        <iframe title="Zelfstandigen Bouw live preview" src={websites[0].url} loading="lazy" />
      </div>
    </div>
  );
}

export function WebsiteManagementShowcase() {
  const caseCards = websites.slice(0, 7);

  return (
    <div className="website-management-showcase">
      <div className="management-copy">
        <p className="eyebrow"><Text value={t("Websitebeheer in de praktijk", "Website management in practice", "Gestión web en la práctica")} /></p>
        <h2><Text value={t("Beheer, SEO en campagnes moeten op dezelfde pagina samenkomen.", "Management, SEO and campaigns should come together on the same page.", "Gestión, SEO y campañas deben unirse en la misma página.")} /></h2>
        <p>
          <Text value={t(
            "Website uitbesteden betekent niet alleen iets laten bouwen. Het gaat om een omgeving die blijft werken: pagina's aanpassen, SEO verbeteren, tracking controleren, conversiepunten bewaken en snel kunnen schakelen wanneer campagnes of content veranderen.",
            "Outsourcing your website is not just about having something built. It is about an environment that keeps working: adjusting pages, improving SEO, checking tracking, monitoring conversion points and moving quickly when campaigns or content change.",
            "Externalizar tu web no es solo dejar que alguien la construya. Se trata de un entorno que sigue funcionando: ajustar páginas, mejorar SEO, revisar tracking, vigilar puntos de conversión y actuar rápido cuando cambian campañas o contenido.",
          )} />
        </p>
        <div className="management-actions">
          <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
            <Text value={t("Plan kennismaking", "Book an introduction", "Agenda una llamada")} />
          </a>
          <a className="button ghost" href="https://wa.me/31610175027">
            <Text value={t("Direct contact", "Direct contact", "Contacto directo")} />
          </a>
        </div>
      </div>

      <div className="management-suite" aria-label="Websitebeheer overzicht">
        <div className="management-browser">
          <div className="management-browser-top">
            <span><Text value={t("Live websitebeheer", "Live website management", "Gestión web en vivo")} /></span>
            <strong>{websites[0].title}</strong>
          </div>
          <iframe title={`${websites[0].title} beheer preview`} src={websites[0].url} loading="lazy" />
        </div>

        <div className="management-side">
          <div className="management-status-card">
            <span>Status</span>
            <strong><Text value={t("Campagneklaar", "Campaign-ready", "Lista para campañas")} /></strong>
            <p><Text value={t("Updates, SEO-basis, conversiepunten en tracking onder controle.", "Updates, SEO basics, conversion points and tracking under control.", "Actualizaciones, base SEO, puntos de conversión y tracking bajo control.")} /></p>
          </div>
          <div className="management-task-grid">
            <span><Text value={t("SEO-basis", "SEO basics", "Base SEO")} /></span>
            <span>Tracking</span>
            <span>Content</span>
            <span><Text value={t("Mobiel", "Mobile", "Móvil")} /></span>
          </div>
          <div className="management-case-list">
            {caseCards.map((site, index) => (
              <article key={site.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{site.title}</strong>
                <small><Text value={t("In beheer", "Managed", "En gestión")} /></small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebsiteOperationsBoard() {
  const featuredSites = websites.slice(0, 4);

  return (
    <div className="website-operations-board">
      <div className="operations-copy">
        <p className="eyebrow"><Text value={t("Websitewerk in beeld", "Website work in view", "Trabajo web en pantalla")} /></p>
        <h2><Text value={t("Niet één voorbeeld, maar een beheeromgeving met meerdere live websites.", "Not one example, but a management environment with multiple live websites.", "No un solo ejemplo, sino un entorno de gestión con varias webs en vivo.")} /></h2>
        <p>
          <Text value={t(
            "De pagina laat nu beter zien wat websitebeheer betekent: meerdere klantomgevingen, snelle aanpassingen, campagneklaar houden en samenwerken met externe bouwers wanneer dat logisch is.",
            "The page now shows more clearly what website management means: multiple client environments, quick changes, keeping sites campaign-ready and working with external developers when that makes sense.",
            "La página muestra mejor qué significa la gestión web: varios entornos de clientes, cambios rápidos, preparación para campañas y colaboración con desarrolladores externos cuando tiene sentido.",
          )} />
        </p>
      </div>
      <div className="operations-grid">
        {featuredSites.map((site, index) => (
          <article className={index === 0 ? "operations-site primary" : "operations-site"} key={site.title}>
            <div>
              <span>{String(index + 1).padStart(2, "0")} / <Text value={t("Live case", "Live case", "Caso en vivo")} /></span>
              <strong>{site.title}</strong>
            </div>
            {index === 0 ? (
              <iframe title={`${site.title} compacte preview`} src={site.url} loading="lazy" />
            ) : (
              <div className="operations-card-copy">
                <p><Text value={t("Websitecase in beheer of samenwerking.", "Website case managed or supported.", "Caso web en gestión o colaboración.")} /></p>
                <span><Text value={t("Live preview op deze pagina", "Live preview on this page", "Vista previa en vivo en esta página")} /></span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export function AdsCaseStudio() {
  return (
    <div className="ads-case-studio">
      <div className="ads-case-copy">
        <p className="eyebrow"><Text value={t("Campagnekamer", "Campaign room", "Sala de campañas")} /></p>
        <h2><Text value={t("Niet alleen advertenties aanzetten, maar begrijpen wat werkt.", "Not just turning ads on, but understanding what works.", "No solo activar anuncios, sino entender qué funciona.")} /></h2>
        <p>
          <Text value={t(
            "Van strategie en accountinrichting tot conversietracking en performance meeting. De pagina laat nu meer zien hoe de dienst voelt: meetbaar, overzichtelijk en concreet.",
            "From strategy and account setup to conversion tracking and performance meetings. The page now shows more clearly how the service feels: measurable, structured and concrete.",
            "Desde estrategia y configuración de cuentas hasta tracking de conversiones y reuniones de rendimiento. La página muestra mejor cómo se siente el servicio: medible, claro y concreto.",
          )} />
        </p>
      </div>
      <div className="ads-console" aria-hidden="true">
        <div className="ads-console-top">
          <span>Performance</span>
          <strong><Text value={t("Advertentiebeheer", "Ad management", "Gestión de anuncios")} /></strong>
        </div>
        <div className="ads-console-grid">
          <div>
            <span><Text value={t("Klantcase", "Client case", "Caso cliente")} /></span>
            <strong>50%</strong>
            <small><Text value={t("minder advertentiekosten", "lower ad spend", "menos inversión publicitaria")} /></small>
          </div>
          <div>
            <span>Tracking</span>
            <strong>ROAS</strong>
            <small><Text value={t("correct toegewezen", "correctly attributed", "atribuido correctamente")} /></small>
          </div>
          <div>
            <span>Focus</span>
            <strong>Leads</strong>
            <small><Text value={t("zichtbaar per maand", "visible per month", "visibles por mes")} /></small>
          </div>
        </div>
        <div className="ads-console-flow">
          {googleAdsItems.map((item, index) => (
            <span key={item.title.nl}>{String(index + 1).padStart(2, "0")} <Text value={item.title} /></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdsPerformanceLab() {
  return (
    <div className="ads-performance-lab">
      <div className="performance-lab-copy">
        <p className="eyebrow"><Text value={t("Advertentiebeheer", "Ad management", "Gestión de anuncios")} /></p>
        <h2><Text value={t("Geen losse campagnes, maar een helder systeem voor groei.", "No loose campaigns, but a clear system for growth.", "No campañas sueltas, sino un sistema claro para crecer.")} /></h2>
        <p>
          <Text value={t(
            "De focus ligt op zoekvraag, conversie, tracking en maandelijkse bijsturing. Zo weet je waar budget naartoe gaat, wat resultaat oplevert en welke stappen nodig zijn om campagnes slimmer te maken.",
            "The focus is on search demand, conversion, tracking and monthly steering. That way you know where budget goes, what delivers results and which steps are needed to make campaigns smarter.",
            "El foco está en la demanda de búsqueda, conversión, tracking y ajustes mensuales. Así sabes a dónde va el presupuesto, qué genera resultados y qué pasos hacen las campañas más inteligentes.",
          )} />
        </p>
      </div>

      <div className="performance-dashboard" aria-label="Advertentiebeheer dashboard">
        <div className="performance-top">
          <span><Text value={t("Campagneoverzicht", "Campaign overview", "Resumen de campaña")} /></span>
          <strong><Text value={t("Zoekvraag naar resultaat", "Search demand to result", "De demanda a resultado")} /></strong>
        </div>
        <div className="performance-score">
          <div>
            <span><Text value={t("Klantcase", "Client case", "Caso cliente")} /></span>
            <strong>50%</strong>
            <small><Text value={t("minder advertentiekosten", "lower ad spend", "menos inversión publicitaria")} /></small>
          </div>
          <div>
            <span><Text value={t("Conversies", "Conversions", "Conversiones")} /></span>
            <strong><Text value={t("Meetbaar", "Measurable", "Medible")} /></strong>
            <small><Text value={t("tracking en toewijzing op orde", "tracking and attribution in order", "tracking y atribución en orden")} /></small>
          </div>
        </div>
        <div className="performance-funnel">
          {[
            t("Zoekvraag", "Search demand", "Demanda"),
            t("Campagne", "Campaign", "Campaña"),
            t("Landingspagina", "Landing page", "Página de destino"),
            t("Conversie", "Conversion", "Conversión"),
            t("Rapportage", "Reporting", "Informes"),
          ].map((item, index) => (
            <div key={item.nl}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong><Text value={item} /></strong>
            </div>
          ))}
        </div>
        <div className="performance-bars" aria-hidden="true">
          <i style={{ height: "42%" }} />
          <i style={{ height: "58%" }} />
          <i style={{ height: "46%" }} />
          <i style={{ height: "74%" }} />
          <i style={{ height: "84%" }} />
          <i style={{ height: "92%" }} />
        </div>
      </div>
    </div>
  );
}

export function BrandingStudio() {
  const socialVideos = [videos[0], videos[1], videos[2], videos[3], videos[4], videos[5]];

  return (
    <div className="branding-studio">
      <div className="branding-studio-copy">
        <p className="eyebrow"><Text value={t("Content studio", "Content studio", "Estudio de contenido")} /></p>
        <h2><Text value={t("Content creatie moet voelen als een levende beeldbank.", "Content creation should feel like a living image library.", "La creación de contenido debe sentirse como una biblioteca visual viva.")} /></h2>
        <p>
          <Text value={t(
            "Hier horen alle videocases en contentbeelden samen te komen: formats, campagnevarianten, herkenbare social posts en beeld dat snel duidelijk maakt wat een merk wil vertellen.",
            "This is where all video cases and content visuals come together: formats, campaign variants, recognizable social posts and imagery that quickly makes clear what a brand wants to communicate.",
            "Aquí se unen todos los casos de video e imágenes de contenido: formatos, variantes de campaña, posts reconocibles y visuales que muestran rápido qué quiere comunicar una marca.",
          )} />
        </p>
      </div>
      <div className="branding-studio-grid">
        {socialVideos.map((video, index) => (
          <MediaLightbox
            className={index === 0 ? "brand-video-tile lead" : "brand-video-tile"}
            key={video.src}
            label={t("Videoformat", "Video format", "Formato de video")}
            src={video.src}
            title={video.title}
            type="video"
          >
            <video muted playsInline preload="metadata">
              <source src={videoPreviewSrc(video.src)} type="video/mp4" />
            </video>
            <div>
              <span>{String(index + 1).padStart(2, "0")} / <Text value={t("Videoformat", "Video format", "Formato de video")} /></span>
              <strong>{video.title}</strong>
            </div>
          </MediaLightbox>
        ))}
        {contentImages.slice(0, 4).map((image, index) => (
          <MediaLightbox
            alt={image.alt}
            className="brand-image-tile"
            key={image.src}
            label={t("Social post", "Social post", "Post social")}
            src={image.src}
            title={image.alt}
            type="image"
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>{String(index + 1).padStart(2, "0")} / <Text value={t("Social post", "Social post", "Post social")} /></figcaption>
          </MediaLightbox>
        ))}
      </div>
    </div>
  );
}

export function TravelContentShowcase() {
  return (
    <div className="travel-showcase">
      <div className="travel-copy">
        <p className="eyebrow"><Text value={t("Voor reisorganisaties", "For travel organizations", "Para organizaciones de viaje")} /></p>
        <h2><Text value={t("Destination content die direct zin geeft om te vertrekken.", "Destination content that instantly makes people want to leave.", "Contenido de destino que da ganas de viajar al instante.")} /></h2>
        <p>
          <Text value={t(
            "Voor reismerken, retreats, tours en accommodaties kan content veel sneller gevoel overbrengen dan tekst. Deze reisbeelden laten zien hoe sfeer, locatie en ervaring in korte formats gebruikt kunnen worden voor social, advertenties en website.",
            "For travel brands, retreats, tours and accommodations, content can communicate feeling much faster than text. These travel visuals show how atmosphere, location and experience can be used in short formats for social, advertising and website.",
            "Para marcas de viaje, retreats, tours y alojamientos, el contenido transmite emoción mucho más rápido que el texto. Estas imágenes muestran cómo ambiente, ubicación y experiencia pueden usarse en formatos cortos para redes, anuncios y web.",
          )} />
        </p>
      </div>
      <div className="travel-video-grid">
        {travelVideos.map((video, index) => (
          <MediaLightbox
            className={index === 0 ? "travel-video-card lead" : "travel-video-card"}
            fullSrc={video.fullSrc}
            key={video.src}
            label={video.label}
            src={video.src}
            title={video.title}
            type="video"
          >
            <video autoPlay loop muted playsInline preload="metadata">
              <source src={video.fullSrc ?? video.src} />
            </video>
            <div>
              <span><Text value={video.label} /></span>
              <strong>{video.title}</strong>
            </div>
          </MediaLightbox>
        ))}
      </div>
    </div>
  );
}

export function HomeContentShowreel() {
  const items = [
    travelVideos[2],
    travelVideos[3],
    {
      title: weddingCase.title,
      label: t("B2C videografie", "B2C videography", "Videografía B2C"),
      fullSrc: weddingCase.fullVideo,
      src: weddingCase.video,
    },
  ];

  return (
    <div className="home-content-showreel">
      <div className="home-content-copy">
        <p className="eyebrow"><Text value={t("Content creatie breder ingezet", "Content creation used more broadly", "Creación de contenido aplicada de forma más amplia")} /></p>
        <h2><Text value={t("Van reisorganisaties tot persoonlijke verhalen.", "From travel organizations to personal stories.", "Desde organizaciones de viaje hasta historias personales.")} /></h2>
        <p>
          <Text value={t(
            "Content creatie draait om gevoel snel zichtbaar maken. Daarom tonen we ook destination content en B2C videografie naast de zakelijke cases.",
            "Content creation is about making feeling visible quickly. That is why we also show destination content and B2C videography alongside the business cases.",
            "La creación de contenido consiste en hacer visible una sensación rápidamente. Por eso mostramos también contenido de destino y videografía B2C junto a los casos empresariales.",
          )} />
        </p>
        <Link href="/content-creatie/" className="button ghost">
          <Text value={t("Bekijk content creatie", "View content creation", "Ver creación de contenido")} />
        </Link>
      </div>
      <div className="home-content-reel-grid">
        {items.map((item, index) => (
          <MediaLightbox
            className={index === 0 ? "home-content-reel-card lead" : "home-content-reel-card"}
            fullSrc={item.fullSrc}
            key={item.src}
            label={item.label}
            src={item.src}
            title={item.title}
            type="video"
          >
            <video autoPlay loop muted playsInline preload="metadata">
              <source src={item.fullSrc ?? item.src} />
            </video>
            <div>
              <span><Text value={item.label} /></span>
              <strong>{item.title}</strong>
            </div>
          </MediaLightbox>
        ))}
      </div>
    </div>
  );
}

export function WeddingContentShowcase() {
  return (
    <div className="wedding-showcase">
      <MediaLightbox
        alt={t("Luchtfoto van trouwlocatie", "Aerial photo of wedding venue", "Foto aérea del lugar de la boda")}
        className="wedding-photo"
        label={t("Fotografie", "Photography", "Fotografía")}
        src={weddingCase.image}
        title={t("Luchtfoto trouwlocatie", "Aerial photo of wedding venue", "Foto aérea del lugar de la boda")}
        type="image"
      >
        <img src={weddingCase.image} alt="Luchtfoto van trouwlocatie" loading="lazy" />
        <figcaption><Text value={t("Fotografie", "Photography", "Fotografía")} /></figcaption>
      </MediaLightbox>
      <div className="wedding-copy">
        <p className="eyebrow"><Text value={t("B2C content creatie", "B2C content creation", "Creación de contenido B2C")} /></p>
        <h2><Text value={t("Fotografie en videografie voor momenten die persoonlijk blijven.", "Photography and videography for moments that stay personal.", "Fotografía y videografía para momentos que siguen siendo personales.")} /></h2>
        <p>
          <Text value={t(
            "Naast zakelijke content kan dezelfde beeldtaal ook worden ingezet voor particulieren. Denk aan bruiloften, events en persoonlijke verhalen waarbij sfeer, locatie en emotie de kern vormen.",
            "Besides business content, the same visual language can also be used for private clients. Think weddings, events and personal stories where atmosphere, location and emotion are at the core.",
            "Además del contenido empresarial, el mismo lenguaje visual también puede usarse para particulares. Piensa en bodas, eventos e historias personales donde ambiente, ubicación y emoción son lo central.",
          )} />
        </p>
      </div>
      <MediaLightbox className="wedding-video" fullSrc={weddingCase.fullVideo} label={t("Videografie", "Videography", "Videografía")} src={weddingCase.video} title={weddingCase.title} type="video">
        <video autoPlay loop muted playsInline preload="metadata">
          <source src={weddingCase.fullVideo} />
        </video>
        <div>
          <span><Text value={t("Videografie", "Videography", "Videografía")} /></span>
          <strong>{weddingCase.title}</strong>
        </div>
      </MediaLightbox>
    </div>
  );
}

export function ArtistContentShowcase() {
  return (
    <div className="artist-showcase">
      <div className="artist-copy">
        <p className="eyebrow"><Text value={t("Artiesten & evenementen", "Artists & events", "Artistas y eventos")} /></p>
        <h2><Text value={t("Content voor optredens, releases en eventmomenten.", "Content for performances, releases and event moments.", "Contenido para actuaciones, lanzamientos y momentos de evento.")} /></h2>
        <p>
          <Text value={t(
            "Voor artiesten en evenementen draait content om energie, herkenning en timing. Korte performance-cuts en registratiebeelden kunnen worden gebruikt voor social, aankondigingen, aftermovies en zichtbaarheid rondom een optreden of event.",
            "For artists and events, content is about energy, recognition and timing. Short performance cuts and event recordings can be used for social, announcements, aftermovies and visibility around a performance or event.",
            "Para artistas y eventos, el contenido gira en torno a energía, reconocimiento y timing. Cortes cortos de actuación y registros del evento sirven para redes, anuncios, aftermovies y visibilidad alrededor de una actuación o evento.",
          )} />
        </p>
        <a
          className="button ghost"
          href="https://www.youtube.com/playlist?list=PLjvgjmEP8Z4pFX7Y4nYDkyHdy6-JKyt3B"
        >
          <Text value={t("Bekijk playlist", "View playlist", "Ver playlist")} />
        </a>
      </div>
      <ArtistEventShowcase photos={artistPhotos} videos={artistVideos} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  cta,
  tone = "default",
}: {
  eyebrow: LocalizedString | string;
  title: LocalizedString | string;
  intro: LocalizedString | string;
  cta: LocalizedString | string;
  tone?: "default" | "website" | "ads" | "branding";
}) {
  return (
    <section className={`hero page-hero ${tone}`}>
      <div className="hero-copy">
        <p className="eyebrow"><Text value={eyebrow} /></p>
        <h1><Text value={title} /></h1>
        <p><Text value={intro} /></p>
        <div className="actions">
          <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
            <Text value={cta} />
          </a>
          <a className="button ghost" href="https://wa.me/31610175027">
            <Text value={t("Direct contact", "Direct contact", "Contacto directo")} />
          </a>
        </div>
      </div>
      <HeroProof tone={tone} />
    </section>
  );
}

export function HeroProof({ tone = "default" }: { tone?: "default" | "website" | "ads" | "branding" }) {
  const lead =
    tone === "ads"
      ? t("Van klik naar inzicht", "From click to insight", "Del clic al insight")
      : tone === "branding"
        ? t("Van zichtbaarheid naar herkenning", "From visibility to recognition", "De visibilidad a reconocimiento")
        : tone === "website"
          ? t("Van beheer naar groei", "From management to growth", "De gestión a crecimiento")
          : t("Eerst overzicht, dan groei", "Clarity first, then growth", "Primero claridad, luego crecimiento");

  return (
    <aside className={`hero-proof ${tone}`} aria-label="Resultaat en aanpak">
      <div className="proof-topline">
        <span><Text value={lead} /></span>
        <strong><Text value={t("Slim uitbesteden", "Smart outsourcing", "Externalización inteligente")} /></strong>
      </div>
      <div className="proof-metrics">
        {proofItems.map((item) => (
          <div key={item.label.nl}>
            <strong>{item.value}</strong>
            <span><Text value={item.label} /></span>
          </div>
        ))}
      </div>
      {tone === "ads" ? (
        <div className="hero-bars" aria-hidden="true">
          <span style={{ height: "42%" }} />
          <span style={{ height: "56%" }} />
          <span style={{ height: "48%" }} />
          <span style={{ height: "72%" }} />
          <span style={{ height: "86%" }} />
        </div>
      ) : tone === "website" ? (
        <div className="hero-browser-card" aria-hidden="true">
          <div>
            <span />
            <span />
            <span />
          </div>
          <strong><Text value={t("Websitebeheer", "Website management", "Gestión web")} /></strong>
          <p><Text value={t("Updates, beheer, tracking en campagnegereed.", "Updates, management, tracking and campaign-ready.", "Actualizaciones, gestión, tracking y preparación para campañas.")} /></p>
        </div>
      ) : (
        <div className="proof-stack">
          <img src="/assets/content-zb.png" alt="Social content case" />
          <img src="/assets/content-nxchange.png" alt="Content creatie case" />
        </div>
      )}
    </aside>
  );
}

export function WebsitePortfolio({ compact = false }: { compact?: boolean }) {
  const items = compact ? websites.slice(0, 4) : websites;

  return (
    <div className={compact ? "portfolio compact" : "portfolio"}>
      {items.map((site) => (
        <article className="portfolio-item" key={site.title}>
          <div className="portfolio-top">
            <div>
              <span><Text value={t("Websitecase", "Website case", "Caso web")} /></span>
              <h3>{site.title}</h3>
            </div>
            <small><Text value={t("Live preview", "Live preview", "Vista previa en vivo")} /></small>
          </div>
          <iframe title={site.title} src={site.url} loading="lazy" />
        </article>
      ))}
    </div>
  );
}

export function WebsiteCaseWall({ compact = false }: { compact?: boolean }) {
  const items = compact ? websites.slice(0, 3) : websites;

  return (
    <div className={compact ? "website-wall compact" : "website-wall"}>
      {items.map((site, index) => (
        <article className={compact ? "website-tile" : "website-tile case-card"} key={site.title}>
          <div className="website-tile-copy">
            <span>{String(index + 1).padStart(2, "0")} / <Text value={t("Websitecase", "Website case", "Caso web")} /></span>
            <h3>{site.title}</h3>
            <small><Text value={t("Live preview", "Live preview", "Vista previa en vivo")} /></small>
          </div>
          <iframe title={`${site.title} live preview`} src={site.url} loading="lazy" />
        </article>
      ))}
    </div>
  );
}

export function GoogleAdsCards() {
  return (
    <div className="card-grid">
      {googleAdsItems.map((item) => (
        <article className="info-card" key={item.title.nl}>
          <span>{String(indexLabel(item.title)).padStart(2, "0")}</span>
          <h3><Text value={item.title} /></h3>
          <p><Text value={item.body} /></p>
        </article>
      ))}
    </div>
  );
}

export function GoogleAdsOverview() {
  return (
    <div className="ads-overview">
      <div className="ads-board">
        <div className="ads-board-top">
          <span><Text value={t("Advertentiebeheer", "Ad management", "Gestión de anuncios")} /></span>
          <strong><Text value={t("Van klik naar meetbare groei", "From click to measurable growth", "Del clic al crecimiento medible")} /></strong>
        </div>
        <div className="ads-chart" aria-hidden="true">
          <span style={{ height: "36%" }} />
          <span style={{ height: "52%" }} />
          <span style={{ height: "44%" }} />
          <span style={{ height: "68%" }} />
          <span style={{ height: "76%" }} />
          <span style={{ height: "88%" }} />
        </div>
        <div className="ads-metrics">
          <div>
            <strong>ROAS</strong>
            <span><Text value={t("Inzichtelijk vertaald", "Clearly translated", "Traducido con claridad")} /></span>
          </div>
          <div>
            <strong>Tracking</strong>
            <span><Text value={t("Correct gekoppeld", "Correctly connected", "Conectado correctamente")} /></span>
          </div>
          <div>
            <strong><Text value={t("Rapportage", "Reporting", "Informes")} /></strong>
            <span><Text value={t("Elke maand helder", "Clear every month", "Claro cada mes")} /></span>
          </div>
        </div>
      </div>
      <div className="ads-flow">
        {googleAdsItems.map((item, index) => (
          <article key={item.title.nl}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3><Text value={item.title} /></h3>
            <p><Text value={item.body} /></p>
          </article>
        ))}
      </div>
    </div>
  );
}

function indexLabel(title: LocalizedString) {
  return googleAdsItems.findIndex((item) => item.title.nl === title.nl) + 1;
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <div className="reviews-showcase">
      <blockquote className="review-feature">
        <p><Text value={featured.text} /></p>
        <cite>{featured.name}</cite>
      </blockquote>
      <div className="review-list">
        {rest.map((testimonial) => (
          <blockquote key={testimonial.name}>
            <p><Text value={testimonial.text} /></p>
            <cite>{testimonial.name}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Bewijs">
      {proofItems.map((item) => (
        <div key={item.label.nl}>
          <strong>{item.value}</strong>
          <span><Text value={item.label} /></span>
        </div>
      ))}
    </section>
  );
}

export function ServiceRows() {
  return (
    <div className="service-rows">
      {services.map((service) => (
        <Link href={service.href} className="service-row" key={service.href}>
          <span><Text value={service.kicker} /></span>
          <h3><Text value={service.title} /></h3>
          <p><Text value={service.summary} /></p>
          <strong><Text value={service.proof} /></strong>
        </Link>
      ))}
    </div>
  );
}

export function ServiceSteps() {
  return (
    <div className="process-grid">
      {[
        [t("Inventariseren", "Audit", "Analizar"), t("Wat staat er, wat werkt al en waar lekt resultaat weg?", "What is already there, what works and where is result leaking away?", "¿Qué hay ya, qué funciona y dónde se pierden resultados?")],
        [t("Inrichten", "Set up", "Configurar"), t("Tracking, content, campagnes en websitebeheer helder neerzetten.", "Set up tracking, content, campaigns and website management clearly.", "Configurar con claridad tracking, contenido, campañas y gestión web.")],
        [t("Verbeteren", "Improve", "Mejorar"), t("Elke maand sturen op prestaties, snelheid en begrijpelijke cijfers.", "Steer every month on performance, speed and understandable numbers.", "Ajustar cada mes según rendimiento, velocidad y datos comprensibles.")],
      ].map(([title, body]) => (
        <article key={title.nl}>
          <span />
          <h3><Text value={title} /></h3>
          <p><Text value={body} /></p>
        </article>
      ))}
    </div>
  );
}

export function WebsiteWorkflow() {
  return (
    <div className="website-workflow">
      {websiteWorkflow.map((item, index) => (
        <article key={item.title.nl}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3><Text value={item.title} /></h3>
          <p><Text value={item.body} /></p>
        </article>
      ))}
    </div>
  );
}

export function VideoGrid({ limit }: { limit?: number }) {
  return (
    <div className="video-grid">
      {(limit ? videos.slice(0, limit) : videos).map((video) => (
        <article className="video-card" key={video.src}>
          <video controls preload="auto" playsInline>
            <source src={videoPreviewSrc(video.src)} type="video/mp4" />
          </video>
          <h3>{video.title}</h3>
        </article>
      ))}
    </div>
  );
}

export function ContentGallery() {
  return <InteractiveContentGallery images={contentImages} />;
}
