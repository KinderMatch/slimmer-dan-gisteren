"use client";

import Link from "next/link";

import { ContactActionGroup, ContactDock } from "./contact-actions";
import { pathForLanguage } from "./i18n";
import { EmphasisText, LanguageProvider, LanguageToggle, Text, useLanguage, type Language, type LocalizedString } from "./language";
import { MediaLightbox } from "./media-lightbox";
import { ScrollProgress } from "./scroll-experience";

const t = (nl: string, en: string, es: string): LocalizedString => ({ nl, en, es });

const services = [
  {
    label: "01",
    href: "/seo/",
    title: t("SEO / GEO", "SEO / GEO", "SEO / GEO"),
    body: t(
      "Beter vindbaar worden in Google en AI-antwoorden met een sterke basis van techniek, content, autoriteit en conversie.",
      "Become more visible in Google and AI answers with a strong foundation of technology, content, authority and conversion.",
      "Ser más visible en Google y respuestas de IA con una base sólida de técnica, contenido, autoridad y conversión.",
    ),
    media: "/assets/seo-google-search.gif",
    type: "image",
  },
  {
    label: "02",
    href: "/google-ads/",
    title: t("Google Ads", "Google Ads", "Google Ads"),
    body: t(
      "Search, Shopping, Performance Max en remarketing gericht op rendement.",
      "Search, Shopping, Performance Max and remarketing focused on return.",
      "Search, Shopping, Performance Max y remarketing enfocados en rendimiento.",
    ),
    media: "/assets/google-ads.gif",
    fallbackMedia: "/assets/optimized/content-maasclaim.jpg",
    type: "image",
  },
  {
    label: "03",
    href: "/social-ads/",
    title: t("Social Ads", "Social Ads", "Social Ads"),
    body: t(
      "Social campagnes die aandacht omzetten in aanvragen.",
      "Social campaigns that turn attention into enquiries.",
      "Campañas sociales que convierten atención en solicitudes.",
    ),
    media: "https://videos.files.wordpress.com/2MO1QuZC/zelfstandigen-bouw_commercial_rbv_auto_final_1x1_social.mp4#t=0.001",
    type: "video",
  },
  {
    label: "04",
    href: "/content-creatie/",
    title: t("Social media", "Social media", "Social media"),
    body: t(
      "Content die campagnes visueel sterker maakt.",
      "Content that makes campaigns visually stronger.",
      "Contenido que fortalece campañas visualmente.",
    ),
    media: "/assets/travel/kgari-noosa-preview.mov",
    type: "plain-video",
  },
];

const cases = [
  {
    title: "Zelfstandigen Bouw",
    discipline: t("Advertenties + content + websitefundament", "Advertising + content + website foundation", "Anuncios + contenido + base web"),
    image: "/assets/optimized/content-zb.jpg",
  },
  {
    title: "The Color Run",
    discipline: t("Content systeem", "Content system", "Sistema de contenido"),
    image: "/assets/optimized/content-color-run.jpg",
  },
  {
    title: "Rode Loper",
    discipline: t("Eventfotografie & content", "Event photography & content", "Fotografia de eventos y contenido"),
    image: "/assets/dave-dekker/photos/event-13.jpg",
  },
];

const archive = [
  { kind: "image", src: "/assets/optimized/content-nxchange.jpg", label: "Nxchange" },
  { kind: "image", src: "/assets/optimized/content-airbnb.jpg", label: "HealthyFest" },
  { kind: "video", src: "/assets/travel/siargao-preview.mov", fullSrc: "/assets/travel/full/siargao-full.m4v", label: "Siargao" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-01.jpg", label: "Rode Loper" },
  { kind: "video", src: "/assets/dave-dekker/dave-5-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-5-full.mov", label: "De Rode Loper" },
  { kind: "image", src: "/assets/optimized/content-maasclaim.jpg", label: "ChickShack Valencia" },
  { kind: "video", src: "/assets/travel/whitsundays-preview.mov", fullSrc: "/assets/travel/full/whitsundays-full.m4v", label: "Whitsundays" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-12.jpg", label: "Event photography" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-11.jpg", label: "Event photography" },
  { kind: "video", src: "/assets/wedding/nordin-kyra-preview.mov", fullSrc: "https://videos.files.wordpress.com/E5ahlDJ7/trouwerij-nordin-kyra-v3-h264.mp4", label: "Wedding film" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-02.jpg", label: "Audience moment" },
  { kind: "video", src: "/assets/dave-dekker/dave-1-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-1-full.mov", label: "Artiest video" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-14.jpg", label: "Live registratie" },
];

const testimonials = [
  {
    quote: t(
      "Niet alleen zijn onze marketingkosten aanzienlijk gedaald, we trekken ook duidelijk meer bezoekers naar onze website.",
      "Our marketing costs have dropped significantly and we clearly attract more visitors to our website.",
      "Nuestros costes de marketing han bajado considerablemente y atraemos claramente más visitantes a la web.",
    ),
    name: "Kozijnrubbers.nl",
    result: t("Lagere kosten. Meer bezoekers.", "Lower costs. More visitors.", "Menos costes. Más visitas."),
    discipline: t("Advertenties + optimalisatie", "Advertising + optimisation", "Anuncios + optimización"),
  },
  {
    quote: t(
      "Ik ontvang nu meer leads en hoef niet alles meer uit mijn eigen netwerk te halen. Erg belangrijk voor de duurzaamheid van mijn bedrijfsvoering.",
      "I now receive more leads and no longer have to get everything from my own network. That is important for the sustainability of my business.",
      "Ahora recibo más leads y ya no tengo que depender solo de mi propia red. Eso es importante para la sostenibilidad de mi negocio.",
    ),
    name: "Joris",
    result: t("Meer leads", "More leads", "Más leads"),
    discipline: t("Website + advertenties", "Website + advertising", "Web + anuncios"),
  },
];

function Media({ item, className = "" }: { item: { kind?: string; src: string; label?: string; type?: string }; className?: string }) {
  const isVideo = item.kind === "video" || item.type === "video";

  if (isVideo) {
    return (
      <video className={className} autoPlay loop muted playsInline preload="none">
        <source src={item.src} />
      </video>
    );
  }

  return <img className={className} src={item.src} alt={item.label ?? ""} loading="lazy" />;
}

function ServiceVisual({ service }: { service: (typeof services)[number] }) {
  if (service.type === "image") {
    return (
      <div className="premium-image-visual">
        <img
          src={service.media}
          alt={service.title.nl}
          loading="lazy"
          onError={(event) => {
            if ("fallbackMedia" in service && service.fallbackMedia) {
              event.currentTarget.src = service.fallbackMedia;
            }
          }}
        />
      </div>
    );
  }

  if (service.type === "plain-video") {
    return (
      <div className="premium-video-visual">
        <video autoPlay loop muted playsInline preload="none">
          <source src={service.media} />
        </video>
      </div>
    );
  }

  if (service.type === "website") {
    return (
      <div className="premium-website-visual">
        <div className="premium-browser-bar">
          <span />
          <span />
          <span />
          <strong>zelfstandigenbouw.nl</strong>
        </div>
        <iframe title="Websitecase Zelfstandigen Bouw" src="https://www.zelfstandigenbouw.nl/" loading="lazy" />
      </div>
    );
  }

  if (service.type === "content") {
    return (
      <div className="premium-content-visual">
        <video autoPlay loop muted playsInline preload="none">
          <source src="/assets/travel/kgari-noosa-preview.mov" />
        </video>
        <img src="/assets/dave-dekker/photos/event-03.jpg" alt="Eventfotografie voor content creatie" loading="lazy" />
        <video autoPlay loop muted playsInline preload="none">
          <source src="/assets/travel/huacacina-paracas-preview.mov" />
        </video>
        <video autoPlay loop muted playsInline preload="none">
          <source src="/assets/dave-dekker/dave-4-preview.mov" />
        </video>
      </div>
    );
  }

  return (
    <div className="premium-ads-visual">
      <video autoPlay loop muted playsInline preload="none">
        <source src={service.media} />
      </video>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="premium-hero-visual">
      <img
        src="/assets/optimized/airfoto.jpg"
        alt="Cinematische dronefoto van een project van Slimmer dan Gisteren"
        width={1600}
        height={899}
        fetchPriority="high"
      />
    </div>
  );
}

function LocalizedSpeechVideo() {
  const { language } = useLanguage();
  const media = {
    en: {
      poster: "/assets/content/speech-ceo-nl-poster.png",
      source: "/assets/content/speech-ceo-en.mp4",
    },
    es: {
      poster: "/assets/content/speech-ceo-nl-poster.png",
      source: "/assets/content/speech-ceo-es.mp4",
    },
    nl: {
      poster: "/assets/content/speech-ceo-nl-poster.png",
      source: "/assets/content/speech-ceo-nl.mp4",
    },
  }[language];

  return (
    <video controls playsInline preload="none" poster={media.poster} key={language}>
      <source src={media.source} type="video/mp4" />
    </video>
  );
}

export function PremiumHome({ initialLanguage = "nl" }: { initialLanguage?: Language }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <div className="premium-home">
        <ScrollProgress />
        <header className="premium-nav">
          <Link className="premium-brand" href={pathForLanguage("/", initialLanguage)}>
            <img src="/assets/logo.png" alt="Slimmer dan Gisteren" />
            <span>Slimmer dan Gisteren</span>
          </Link>
          <nav aria-label="Hoofdnavigatie">
            <Link href={pathForLanguage("/geo/", initialLanguage)}>GEO</Link>
            <Link href={pathForLanguage("/seo/", initialLanguage)}>SEO</Link>
            <Link href={pathForLanguage("/google-ads/", initialLanguage)}>Google Ads</Link>
            <Link href={pathForLanguage("/social-ads/", initialLanguage)}>Social Ads</Link>
            <Link href={pathForLanguage("/content-creatie/", initialLanguage)}><Text value={t("Social media", "Social media", "Social media")} /></Link>
          </nav>
          <LanguageToggle />
        </header>
        <ContactDock />

        <main>
          <section className="premium-hero">
            <HeroVisual />
            <div className="premium-hero-shade" />
            <div className="premium-hero-copy">
              <p className="premium-kicker">
                <Text value={t("Creative growth studio", "Creative growth studio", "Creative growth studio")} />
              </p>
              <h1>
                <EmphasisText value={t("Marketing die [[helderheid]] brengt.", "Marketing that brings [[clarity]].", "Marketing que aporta [[claridad]].")} />
                <span><EmphasisText value={t("[[Groei]] die zichtbaar wordt.", "[[Growth]] that becomes visible.", "[[Crecimiento]] que se vuelve visible.")} /></span>
              </h1>
              <div className="premium-hero-meta">
                <span>GEO</span>
                <span>SEO</span>
                <span>Google Ads</span>
                <span>Social Ads</span>
              </div>
              <a className="premium-cta" href="https://calendly.com/buitenhuisj004/bmc-sessie">
                <Text value={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")} />
              </a>
            </div>
          </section>

          <section className="premium-ai-actors premium-speech-section">
            <div className="premium-ai-actors-copy">
              <p className="premium-kicker"><Text value={t("AI video", "AI video", "Video IA")} /></p>
              <h2>
                <EmphasisText value={t(
                  "[[Minder bureau.]] Meer resultaat.",
                  "[[Less agency.]] More results.",
                  "[[Menos agencia.]] Más resultados.",
                )} />
              </h2>
              <p>
                <Text value={t(
                  "In deze video vertelt Jimmy, eigenaar van Slimmer dan Gisteren, waarom directe samenwerking meer oplevert dan extra lagen. Je werkt met degene die jouw marketing bedenkt én uitvoert, zodat paid media, content en landingspagina's elkaar versterken. Minder ruis, sneller schakelen en meer marketingkracht voor je budget.",
                  "In this video, Jimmy, owner of Slimmer dan Gisteren, explains why direct collaboration creates more value than extra layers. You work with the person who creates and executes your marketing, so paid media, content and landing pages reinforce each other. Less noise, faster decisions and more marketing power for your budget.",
                  "En este video, Jimmy, propietario de Slimmer dan Gisteren, explica por qué la colaboración directa aporta más valor que las capas adicionales. Trabajas con la persona que diseña y ejecuta tu marketing, para que paid media, contenido y landing pages se refuercen entre sí. Menos ruido, más agilidad y más fuerza de marketing para tu presupuesto.",
                )} />
              </p>
            </div>
            <div className="premium-ai-actors-media premium-speech-media">
              <LocalizedSpeechVideo />
            </div>
          </section>

          <section className="premium-services" aria-label="Services">
            {services.map((service, index) => (
              <article
                className="premium-service"
                key={service.title.nl}
              >
                <Link href={pathForLanguage(service.href, initialLanguage)} className="premium-service-media" aria-label={service.title.nl}>
                  <ServiceVisual service={service} />
                </Link>
                <div>
                  <span>{service.label}</span>
                  <h2><Text value={service.title} /></h2>
                  <p><Text value={service.body} /></p>
                  <Link href={pathForLanguage(service.href, initialLanguage)} className="premium-service-cta">
                    <Text value={t("Bekijk discipline", "View discipline", "Ver disciplina")} />
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
	                <small>{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</small>
              </article>
            ))}
          </section>

          <section className="premium-cases">
            <div className="premium-section-title">
              <p className="premium-kicker"><Text value={t("Featured work", "Featured work", "Trabajo destacado")} /></p>
              <h2><EmphasisText value={t("Werk dat niet uitlegt. Werk dat [[laat zien]].", "Work that does not explain. Work that [[shows]].", "Trabajo que no explica. Trabajo que [[muestra]].")} /></h2>
            </div>
            <div className="premium-case-grid">
              {cases.map((item) => (
                <article key={item.title} className="premium-case">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div>
                    <span><Text value={item.discipline} /></span>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="premium-ai-actors">
            <div className="premium-ai-actors-copy">
              <p className="premium-kicker">AI actors</p>
              <h2>
                <EmphasisText value={t(
                  "[[Elira Veysen]]",
                  "[[Elira Veysen]]",
                  "[[Elira Veysen]]",
                )} />
              </h2>
              <p>
                <Text value={t(
                  "Kies een AI actor voor een commercial die al bestaat, of laat een nieuwe commercial vanaf nul maken. Zo maak je herkenbare video's voor advertenties, social media, e-mail en je website zonder elke keer een volledige draaidag.",
                  "Choose an AI actor for an existing commercial, or create a new commercial from scratch. That makes it easier to create recognizable videos for ads, social media, email and your website without planning a full shoot every time.",
                  "Elige un actor IA para un anuncio que ya existe, o crea un anuncio nuevo desde cero. Asi puedes hacer videos reconocibles para anuncios, redes sociales, email y tu web sin organizar una produccion completa cada vez.",
                )} />
              </p>
              <div className="premium-ai-actors-points" aria-label="AI actor toepassingen">
                <span><Text value={t("Bestaande commercial verrijken", "Enrich an existing commercial", "Mejorar un anuncio existente")} /></span>
                <span><Text value={t("Nieuwe commercial from scratch", "New commercial from scratch", "Anuncio nuevo desde cero")} /></span>
                <span><Text value={t("Paid en owned media", "Paid and owned media", "Paid y owned media")} /></span>
              </div>
              <a className="premium-ai-actors-cta" href="mailto:jimmy@slimmerdangisteren.nl?subject=Samenwerken%20met%20Elira">
                <Text value={t("Samenwerken met Elira? Neem contact op", "Collaborate with Elira? Get in touch", "¿Colaborar con Elira? Contactanos")} />
              </a>
            </div>
            <div className="premium-ai-actors-media">
              <video controls playsInline preload="none">
                <source src="/assets/content/ai-actors-slimmer-dan-gisteren.m4v" type="video/mp4" />
              </video>
            </div>
          </section>

          <section className="premium-stats">
            {[
              ["100+", t("projecten", "projects", "proyectos")],
              ["100%", t("persoonlijke samenwerking", "personal collaboration", "colaboración personal")],
              ["∞", t("continue optimalisatie", "continuous optimisation", "optimización continua")],
            ].map(([value, label]) => (
              <div key={String(value)}>
                <strong>{String(value)}</strong>
                <span><Text value={label as LocalizedString} /></span>
              </div>
            ))}
          </section>

          <section className="premium-archive">
            <div className="premium-section-title">
              <p className="premium-kicker"><Text value={t("In de keuken", "Inside the work", "Dentro del trabajo")} /></p>
              <h2><EmphasisText value={t("[[Echte]] beelden. Echte momenten. Geen stock.", "[[Real]] visuals. Real moments. No stock.", "Imágenes [[reales]]. Momentos reales. Sin stock.")} /></h2>
            </div>
            <div className="premium-archive-grid">
              {archive.map((item, index) => {
                const archiveClass = index % 3 === 0 ? "tall" : index % 4 === 0 ? "wide" : "";
                const mediaClass = item.src.includes("/content-") ? "contain-media" : item.kind === "video" ? "video-media" : "photo-media";

                return (
                <div
                  className={[archiveClass, mediaClass].filter(Boolean).join(" ")}
                  key={`${item.label}-${index}`}
                >
                  <MediaLightbox
                    className="premium-archive-item"
                    fullSrc={"fullSrc" in item ? item.fullSrc : undefined}
                    label={t("Portfolio media", "Portfolio media", "Media de portfolio")}
                    src={item.src}
                    title={item.label}
                    type={item.kind === "video" ? "video" : "image"}
                  >
                    <Media item={item} />
                    <span className="premium-archive-caption">{item.label}</span>
                  </MediaLightbox>
                </div>
                );
              })}
            </div>
          </section>

          <section className="premium-about">
            <div>
              <p className="premium-kicker"><Text value={t("Persoonlijk", "Personal", "Personal")} /></p>
              <h2><EmphasisText value={t("Geen bureau op afstand. Een [[partner]] die meedenkt.", "Not a distant agency. A [[partner]] who thinks with you.", "No una agencia distante. Un [[partner]] que piensa contigo.")} /></h2>
            </div>
            <p>
              <Text value={t(
                "De beste groei voelt rustig. Je weet wat er gebeurt, waarom het gebeurt en wat de volgende verbetering is.",
                "The best growth feels calm. You know what is happening, why it is happening and what the next improvement is.",
                "El mejor crecimiento se siente tranquilo. Sabes qué pasa, por qué pasa y cuál es la siguiente mejora.",
              )} />
            </p>
            <img src="/assets/dave-dekker/photos/event-05.jpg" alt="Echte productie achter de schermen" loading="lazy" />
          </section>

          <section className="premium-testimonials">
            <div className="premium-testimonial-heading">
              <p className="premium-kicker"><Text value={t("Bewijs", "Proof", "Prueba")} /></p>
              <h2><EmphasisText value={t("Rust in marketing. [[Resultaat]] in beeld.", "Calm in marketing. [[Results]] in view.", "Calma en marketing. [[Resultados]] visibles.")} /></h2>
            </div>
            <div className="premium-testimonial-feature">
              <blockquote>
                <span><Text value={testimonials[0].discipline} /></span>
                <p><Text value={testimonials[0].quote} /></p>
                <footer>
                  <cite>{testimonials[0].name}</cite>
                  <strong><Text value={testimonials[0].result} /></strong>
                </footer>
              </blockquote>
              <div className="premium-proof-meter" aria-hidden="true">
                <span />
                <strong>100%</strong>
                <small><Text value={t("persoonlijke samenwerking", "personal collaboration", "colaboración personal")} /></small>
              </div>
            </div>
            <div className="premium-testimonial-list">
              {testimonials.slice(1).map((item) => (
                <blockquote key={item.name}>
                  <span><Text value={item.discipline} /></span>
                  <p><Text value={item.quote} /></p>
                  <footer>
                    <cite>{item.name}</cite>
                    <strong><Text value={item.result} /></strong>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="premium-final">
            <video autoPlay loop muted playsInline preload="none">
              <source src="/assets/travel/dive-cairns-preview.mov" />
            </video>
            <div>
              <p className="premium-kicker"><Text value={t("Klaar voor helderheid?", "Ready for clarity?", "¿Listo para claridad?")} /></p>
              <h2><EmphasisText value={t("Laat marketing voelen als [[één systeem]].", "Make marketing feel like [[one system]].", "Haz que el marketing se sienta como [[un sistema]].")} /></h2>
              <ContactActionGroup
                className="premium-final-actions"
                primaryLabel={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")}
              />
            </div>
          </section>
        </main>

        <footer className="premium-footer">
          <Link className="premium-footer-brand" href={pathForLanguage("/", initialLanguage)}>
            <img src="/assets/logo.png" alt="" />
            <span>Slimmer dan Gisteren</span>
          </Link>
          <nav>
            <Link href={pathForLanguage("/", initialLanguage)}><Text value={t("Home", "Home", "Inicio")} /></Link>
            <Link href={pathForLanguage("/geo/", initialLanguage)}>GEO</Link>
            <Link href={pathForLanguage("/seo/", initialLanguage)}>SEO</Link>
            <Link href={pathForLanguage("/google-ads/", initialLanguage)}>Google Ads</Link>
            <Link href={pathForLanguage("/social-ads/", initialLanguage)}>Social Ads</Link>
            <Link href={pathForLanguage("/content-creatie/", initialLanguage)}>Social media</Link>
            <Link href={pathForLanguage("/website/", initialLanguage)}>Website</Link>
            <Link href={pathForLanguage("/algemene-voorwaarden/", initialLanguage)}><Text value={t("Algemene voorwaarden", "Terms", "Condiciones")} /></Link>
            <Link href={pathForLanguage("/privacy/", initialLanguage)}><Text value={t("Privacy", "Privacy", "Privacidad")} /></Link>
          </nav>
          <a href="https://wa.me/31610175027">WhatsApp</a>
          <a href="mailto:jimmy@slimmerdangisteren.nl">Mail</a>
        </footer>
      </div>
    </LanguageProvider>
  );
}
