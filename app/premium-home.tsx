"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { ContactActionGroup, ContactDock } from "./contact-actions";
import { EmphasisText, LanguageProvider, LanguageToggle, Text, type LocalizedString } from "./language";
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
    title: "Dave Dekker",
    discipline: t("Artiest & event content", "Artist & event content", "Contenido de artista y evento"),
    image: "/assets/dave-dekker/photos/event-13.jpg",
  },
];

const archive = [
  { kind: "image", src: "/assets/content-nxchange.png", label: "Nxchange" },
  { kind: "image", src: "/assets/content-airbnb.png", label: "HealthyFest" },
  { kind: "video", src: "/assets/travel/full/siargao-full.m4v", label: "Siargao" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-01.jpg", label: "Dave Dekker" },
  { kind: "video", src: "/assets/dave-dekker/full/dave-5-full.mov", label: "De Rode Loper" },
  { kind: "image", src: "/assets/content-maasclaim.png", label: "ChickShack Valencia" },
  { kind: "video", src: "/assets/travel/full/whitsundays-full.m4v", label: "Whitsundays" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-12.jpg", label: "Event photography" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-11.jpg", label: "Event photography" },
  { kind: "video", src: "https://videos.files.wordpress.com/E5ahlDJ7/trouwerij-nordin-kyra-v3-h264.mp4#t=0.001", label: "Wedding film" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-02.jpg", label: "Audience moment" },
  { kind: "video", src: "/assets/dave-dekker/full/dave-1-full.mov", label: "Artiest video" },
  { kind: "image", src: "/assets/dave-dekker/photos/event-14.jpg", label: "Live registratie" },
];

const testimonials = [
  {
    quote: t(
      "Marketingkosten daalden en bezoekers namen zichtbaar toe. Alles werd helder uitgelegd.",
      "Marketing costs dropped and traffic clearly increased. Everything was explained with clarity.",
      "Los costes bajaron y el tráfico aumentó claramente. Todo se explicó con claridad.",
    ),
    name: "Kozijnrubbers.nl",
  },
  {
    quote: t(
      "Meer leads, minder afhankelijk van mijn eigen netwerk. Dat geeft ruimte.",
      "More leads, less dependence on my own network. That creates room.",
      "Más leads y menos dependencia de mi red. Eso crea espacio.",
    ),
    name: "Klantcase",
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

function HomeScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const firstY = useTransform(scrollYProgress, [0, 0.38], [0, -54]);
  const secondY = useTransform(scrollYProgress, [0.25, 0.52, 0.78], [54, 0, -42]);
  const thirdY = useTransform(scrollYProgress, [0.58, 1], [54, 0]);
  const firstScale = useTransform(scrollYProgress, [0, 0.38], [1, 0.95]);
  const secondScale = useTransform(scrollYProgress, [0.28, 0.5, 0.74], [0.96, 1, 0.96]);
  const thirdScale = useTransform(scrollYProgress, [0.62, 1], [0.96, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = latest < 0.34 ? 0 : latest < 0.68 ? 1 : 2;
    setActiveChapter((current) => (current === next ? current : next));
  });

  return (
    <section className="premium-scroll-story" ref={ref} aria-label="Growth system">
      <div className="premium-scroll-sticky">
        <div className="story-copy">
          <motion.div className="story-copy-item" data-active={activeChapter === 0} style={{ y: firstY }}>
            <p className="premium-kicker"><Text value={t("Stap 01", "Step 01", "Paso 01")} /></p>
            <h2><EmphasisText value={t("Eerst wordt de [[basis]] scherp.", "First, the [[foundation]] becomes sharp.", "Primero, la [[base]] se vuelve clara.")} /></h2>
            <p>
              <Text value={t(
                "Een website moet niet alleen mooi zijn. Hij moet rust geven, vertrouwen opbouwen en direct duidelijk maken waarom iemand moet blijven.",
                "A website should not only look good. It should create calm, build trust and make it instantly clear why someone should stay.",
                "Una web no solo debe verse bien. Debe aportar calma, crear confianza y dejar claro al instante por qué alguien debe quedarse.",
              )} />
            </p>
          </motion.div>
          <motion.div className="story-copy-item" data-active={activeChapter === 1} style={{ y: secondY }}>
            <p className="premium-kicker"><Text value={t("Stap 02", "Step 02", "Paso 02")} /></p>
            <h2><EmphasisText value={t("Daarna krijgt groei [[richting]].", "Then growth gets [[direction]].", "Después, el crecimiento toma [[dirección]].")} /></h2>
            <p>
              <Text value={t(
                "Advertenties worden sterker wanneer creatie, tracking en aanbod exact op elkaar aansluiten.",
                "Advertising becomes stronger when creative, tracking and offer work as one.",
                "Los anuncios son más fuertes cuando creatividad, tracking y oferta trabajan como uno.",
              )} />
            </p>
          </motion.div>
          <motion.div className="story-copy-item" data-active={activeChapter === 2} style={{ y: thirdY }}>
            <p className="premium-kicker"><Text value={t("Stap 03", "Step 03", "Paso 03")} /></p>
            <h2><EmphasisText value={t("Content maakt het [[zichtbaar]].", "Content makes it [[visible]].", "El contenido lo hace [[visible]].")} /></h2>
            <p>
              <Text value={t(
                "Foto, video, social en campagnes vormen samen een herkenbaar systeem. Niet los. Eén geheel.",
                "Photo, video, social and campaigns become one recognisable system. Not separate. One whole.",
                "Foto, video, social y campañas forman un sistema reconocible. No separado. Un conjunto.",
              )} />
            </p>
          </motion.div>
        </div>

        <div className="story-visual-stack" aria-hidden="true">
          <motion.div className="story-panel story-panel-website" data-active={activeChapter === 0} style={{ y: firstY, scale: firstScale }}>
            <div className="story-browser">
              <div><span /><span /><span /><strong>slimmerdangisteren.nl/website</strong></div>
              <section>
                <small>Website uitbesteden + SEO</small>
                <h3>Van bezoek naar vertrouwen.</h3>
                <p>Structuur, techniek en vindbaarheid als fundament.</p>
                <figure className="story-site-preview">
                  <div>
                    <span>Website</span>
                    <strong>Zelfstandigen Bouw</strong>
                  </div>
                  <div />
                  <div />
                  <div />
                </figure>
              </section>
            </div>
          </motion.div>
          <motion.div className="story-panel story-panel-ads" data-active={activeChapter === 1} style={{ y: secondY, scale: secondScale }}>
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="https://videos.files.wordpress.com/kQCILAhM/zelfstandigen-bouw_commercial_rbv_schilder_final_1x1_social.mp4#t=0.001" />
            </video>
            <div className="story-dashboard">
              <span>Advertenties</span>
              <strong>Heldere meting.</strong>
              <small>Creatie + tracking + optimalisatie</small>
            </div>
          </motion.div>
          <motion.div className="story-panel story-panel-content" data-active={activeChapter === 2} style={{ y: thirdY, scale: thirdScale }}>
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/travel/full/siargao-full.m4v" />
            </video>
            <img src="/assets/dave-dekker/photos/event-09.jpg" alt="" />
            <img src="/assets/wedding/airfoto.jpg" alt="" />
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/dave-dekker/full/dave-3-full.mov" />
            </video>
          </motion.div>
        </div>

        <div className="story-progress" aria-hidden="true">
          <motion.span style={{ width: progressWidth }} />
        </div>
      </div>
    </section>
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
                <span>Advertising</span>
                <span>Content</span>
              </motion.div>
              <motion.a variants={reveal} transition={transition} className="premium-cta" href="https://calendly.com/buitenhuisj004/bmc-sessie">
                <Text value={t("Plan een strategiesessie", "Plan a strategy session", "Planifica una sesión estratégica")} />
              </motion.a>
            </motion.div>
          </section>

          <section className="premium-manifesto">
            <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20%" }} variants={reveal} transition={transition}>
              <EmphasisText value={t(
                "Slimmer dan Gisteren combineert [[websites]], [[advertenties]] en [[content creatie]] tot één helder systeem. Rust in de basis. Scherpte in de uitvoering. Groei in beeld.",
                "Slimmer dan Gisteren combines [[websites]], [[advertising]] and [[content creation]] into one clear system. Calm in the foundation. Precision in the work. Growth in view.",
                "Slimmer dan Gisteren combina [[webs]], [[anuncios]] y [[creación de contenido]] en un sistema claro. Calma en la base. Precisión en la ejecución. Crecimiento visible.",
              )} />
            </motion.p>
          </section>

          <HomeScrollStory />

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
              {archive.map((item, index) => (
                <motion.figure
                  className={index % 3 === 0 ? "tall" : index % 4 === 0 ? "wide" : ""}
                  key={`${item.label}-${index}`}
                  initial={{ opacity: 0, clipPath: "inset(12% 0 12% 0)" }}
                  whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={transition}
                >
                  <Media item={item} />
                  <figcaption>{item.label}</figcaption>
                </motion.figure>
              ))}
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
            {testimonials.map((item) => (
              <blockquote key={item.name}>
                <p><Text value={item.quote} /></p>
                <cite>{item.name}</cite>
              </blockquote>
            ))}
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
          <span>Slimmer dan Gisteren</span>
          <nav>
            <Link href="/website/">Websites</Link>
            <Link href="/advertenties/">Advertising</Link>
            <Link href="/content-creatie/">Content</Link>
          </nav>
          <a href="https://wa.me/31610175027">WhatsApp</a>
          <a href="mailto:info@slimmerdangisteren.nl">Mail</a>
        </footer>
      </div>
    </LanguageProvider>
  );
}
