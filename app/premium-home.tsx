"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

import { ContactActionGroup, ContactDock } from "./contact-actions";
import { EmphasisText, LanguageProvider, LanguageToggle, Text, type LocalizedString } from "./language";
import { MediaLightbox } from "./media-lightbox";
import { ScrollProgress } from "./scroll-experience";

const t = (nl: string, en: string, es: string): LocalizedString => ({ nl, en, es });

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

const services = [
  {
    label: "01",
    href: "/website/",
    title: t("Websites", "Websites", "Webs"),
    body: t(
      "Digitale fundamenten die rust geven. Snel, helder en klaar voor groei.",
      "Digital foundations that create calm. Fast, clear and ready for growth.",
      "Bases digitales que aportan calma. Rápidas, claras y listas para crecer.",
    ),
    media: "/assets/content-zb.png",
    type: "website",
  },
  {
    label: "02",
    href: "/advertenties/",
    title: t("Advertenties", "Advertising", "Anuncios"),
    body: t(
      "Campagnes waarin strategie, tracking en creatie samenkomen.",
      "Campaigns where strategy, tracking and creative work together.",
      "Campañas donde estrategia, tracking y creatividad trabajan juntas.",
    ),
    media: "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4#t=0.001",
    type: "video",
  },
  {
    label: "03",
    href: "/content-creatie/",
    title: t("Content creatie", "Content creation", "Creación de contenido"),
    body: t(
      "Beeld dat direct laat voelen waarom een merk ertoe doet.",
      "Visuals that instantly show why a brand matters.",
      "Imagen que muestra al instante por qué una marca importa.",
    ),
    media: "/assets/travel/full/kgari-noosa-full.m4v",
    type: "content",
  },
];

const cases = [
  {
    title: "Zelfstandigen Bouw",
    discipline: t("Website + advertenties + social", "Website + advertising + social", "Web + anuncios + social"),
    image: "/assets/content-zb.png",
  },
  {
    title: "The Color Run",
    discipline: t("Content systeem", "Content system", "Sistema de contenido"),
    image: "/assets/content-color-run.png",
  },
  {
    title: "Rode Loper",
    discipline: t("Eventfotografie & content", "Event photography & content", "Fotografia de eventos y contenido"),
    image: "/assets/dave-dekker/photos/event-13.jpg",
  },
];

const archive = [
  { kind: "image", src: "/assets/content-nxchange.png", label: "Nxchange" },
  { kind: "image", src: "/assets/content-airbnb.png", label: "HealthyFest" },
  { kind: "video", src: "/assets/travel/siargao-preview.mov", fullSrc: "/assets/travel/full/siargao-full.m4v", label: "Siargao" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-01.jpg", label: "Rode Loper" },
  { kind: "video", src: "/assets/dave-dekker/dave-5-preview.mov", fullSrc: "/assets/dave-dekker/full/dave-5-full.mov", label: "De Rode Loper" },
  { kind: "image", src: "/assets/content-maasclaim.png", label: "ChickShack Valencia" },
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
      "Met 50% minder advertentiekosten behalen we hetzelfde of betere resultaten per maand dan bij onze vorige marketingpartij.",
      "With 50% lower advertising costs, we achieve the same or better monthly results than with our previous marketing agency.",
      "Con un 50% menos de costes publicitarios conseguimos los mismos o mejores resultados mensuales que antes.",
    ),
    name: "Rob en Rene",
    result: t("-50% advertentiekosten", "-50% advertising costs", "-50% costes publicitarios"),
    discipline: t("Advertenties", "Advertising", "Anuncios"),
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
      <video className={className} autoPlay loop muted playsInline preload="metadata">
        <source src={item.src} />
      </video>
    );
  }

  return <img className={className} src={item.src} alt={item.label ?? ""} loading="lazy" />;
}

function ServiceVisual({ service }: { service: (typeof services)[number] }) {
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
        <video autoPlay loop muted playsInline preload="metadata">
          <source src="/assets/travel/full/kgari-noosa-full.m4v" />
        </video>
        <img src="/assets/dave-dekker/photos/event-03.jpg" alt="Eventfotografie voor content creatie" loading="lazy" />
        <video autoPlay loop muted playsInline preload="metadata">
          <source src="/assets/travel/full/huacacina-paracas-full.m4v" />
        </video>
        <video autoPlay loop muted playsInline preload="metadata">
          <source src="/assets/dave-dekker/full/dave-4-full.mov" />
        </video>
      </div>
    );
  }

  return (
    <div className="premium-ads-visual">
      <video autoPlay loop muted playsInline preload="metadata">
        <source src={service.media} />
      </video>
      <div className="premium-ads-dashboard" aria-hidden="true">
        <span>Zelfstandigen Bouw</span>
        <strong>-50%</strong>
        <small>Advertentiekosten</small>
        <div />
      </div>
    </div>
  );
}

function HeroVisual() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.32], [0, -90]);
  const scale = useTransform(scrollYProgress, [0, 0.32], [1, 1.08]);

  return (
    <motion.div className="premium-hero-visual" style={{ y, scale }}>
      <img src="/assets/wedding/airfoto.jpg" alt="Cinematische dronefoto van een project van Slimmer dan Gisteren" />
    </motion.div>
  );
}

export function PremiumHome() {
  return (
    <LanguageProvider>
      <div className="premium-home">
        <ScrollProgress />
        <header className="premium-nav">
          <Link className="premium-brand" href="/">
            <img src="/assets/logo.png" alt="Slimmer dan Gisteren" />
            <span>Slimmer dan Gisteren</span>
          </Link>
          <nav aria-label="Hoofdnavigatie">
            <Link href="/website/"><Text value={t("Websites", "Websites", "Webs")} /></Link>
            <Link href="/advertenties/"><Text value={t("Advertenties", "Advertising", "Anuncios")} /></Link>
            <Link href="/content-creatie/"><Text value={t("Content", "Content", "Contenido")} /></Link>
          </nav>
          <LanguageToggle />
        </header>
        <ContactDock />

        <main>
          <section className="premium-hero">
            <HeroVisual />
            <div className="premium-hero-shade" />
            <motion.div
              className="premium-hero-copy"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.12 }}
            >
              <motion.p variants={reveal} transition={transition} className="premium-kicker">
                <Text value={t("Creative growth studio", "Creative growth studio", "Creative growth studio")} />
              </motion.p>
              <motion.h1 variants={reveal} transition={transition}>
                <EmphasisText value={t("Marketing die [[helderheid]] brengt.", "Marketing that brings [[clarity]].", "Marketing que aporta [[claridad]].")} />
                <span><EmphasisText value={t("[[Groei]] die zichtbaar wordt.", "[[Growth]] that becomes visible.", "[[Crecimiento]] que se vuelve visible.")} /></span>
              </motion.h1>
              <motion.div variants={reveal} transition={transition} className="premium-hero-meta">
                <span>Websites</span>
                <span><Text value={t("Advertenties", "Advertising", "Anuncios")} /></span>
                <span>Content</span>
              </motion.div>
              <motion.a variants={reveal} transition={transition} className="premium-cta" href="https://calendly.com/buitenhuisj004/bmc-sessie">
                <Text value={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")} />
              </motion.a>
            </motion.div>
          </section>

          <section className="premium-ai-actors">
            <motion.div
              className="premium-ai-actors-copy"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={reveal}
              transition={transition}
            >
              <p className="premium-kicker">AI actors</p>
              <h2>
                <EmphasisText value={t(
                  "[[AI actors]] voor content die blijft werken.",
                  "[[AI actors]] for content that keeps working.",
                  "[[Actores IA]] para contenido que sigue trabajando.",
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
            </motion.div>
            <motion.div
              className="premium-ai-actors-media"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={transition}
            >
              <video controls playsInline preload="metadata">
                <source src="/assets/content/ai-actors-slimmer-dan-gisteren.m4v" type="video/mp4" />
              </video>
            </motion.div>
          </section>

          <section className="premium-services" aria-label="Services">
            {services.map((service, index) => (
              <motion.article
                className="premium-service"
                key={service.title.nl}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={reveal}
                transition={transition}
              >
                <Link href={service.href} className="premium-service-media" aria-label={service.title.nl}>
                  <ServiceVisual service={service} />
                </Link>
                <div>
                  <span>{service.label}</span>
                  <h2><Text value={service.title} /></h2>
                  <p><Text value={service.body} /></p>
                  <Link href={service.href}><Text value={t("Bekijk discipline", "View discipline", "Ver disciplina")} /></Link>
                </div>
                <small>{String(index + 1).padStart(2, "0")} / 03</small>
              </motion.article>
            ))}
          </section>

          <section className="premium-cases">
            <div className="premium-section-title">
              <p className="premium-kicker"><Text value={t("Featured work", "Featured work", "Trabajo destacado")} /></p>
              <h2><EmphasisText value={t("Werk dat niet uitlegt. Werk dat [[laat zien]].", "Work that does not explain. Work that [[shows]].", "Trabajo que no explica. Trabajo que [[muestra]].")} /></h2>
            </div>
            <div className="premium-case-grid">
              {cases.map((item) => (
                <motion.article key={item.title} className="premium-case" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={reveal} transition={transition}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div>
                    <span><Text value={item.discipline} /></span>
                    <h3>{item.title}</h3>
                  </div>
                </motion.article>
              ))}
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
                <motion.div
                  className={[archiveClass, mediaClass].filter(Boolean).join(" ")}
                  key={`${item.label}-${index}`}
                  initial={{ opacity: 0, clipPath: "inset(12% 0 12% 0)" }}
                  whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={transition}
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
                </motion.div>
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
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/travel/full/dive-cairns-full.m4v" />
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
          <Link className="premium-footer-brand" href="/">
            <img src="/assets/logo.png" alt="" />
            <span>Slimmer dan Gisteren</span>
          </Link>
          <nav>
            <Link href="/"><Text value={t("Home", "Home", "Inicio")} /></Link>
            <Link href="/website/">Websites</Link>
            <Link href="/advertenties/"><Text value={t("Advertenties", "Advertising", "Anuncios")} /></Link>
            <Link href="/content-creatie/">Content</Link>
            <Link href="/algemene-voorwaarden/"><Text value={t("Algemene voorwaarden", "Terms", "Condiciones")} /></Link>
            <Link href="/privacy/"><Text value={t("Privacy", "Privacy", "Privacidad")} /></Link>
          </nav>
          <a href="https://wa.me/31610175027">WhatsApp</a>
          <a href="mailto:jimmy@slimmerdangisteren.nl">Mail</a>
        </footer>
      </div>
    </LanguageProvider>
  );
}
