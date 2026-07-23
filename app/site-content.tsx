import Link from "next/link";
import type { ReactNode } from "react";

export const services = [
  {
    kicker: "Website",
    title: "Websitebeheer",
    href: "/website/",
    summary: "Websites maken, beheren en marketingklaar houden vanuit een aanspreekpunt.",
  },
  {
    kicker: "Ads",
    title: "Google Ads",
    href: "/google-ads/",
    summary: "Campagnes van strategie tot tracking, optimalisatie en rapportage.",
  },
  {
    kicker: "Branding",
    title: "Social media",
    href: "/branding/",
    summary: "Online zichtbaarheid, social advertising en content die je merk laat groeien.",
  },
];

const navItems = [
  { label: "Website", href: "/website/" },
  { label: "Google Ads", href: "/google-ads/" },
  { label: "Branding", href: "/branding/" },
  { label: "Podcast", href: "/#podcast" },
];

const websites = [
  { title: "Zelfstandigen Bouw", url: "https://www.zelfstandigenbouw.nl/" },
  { title: "Trouwshots.nl", url: "https://trouwshots.nl/" },
  { title: "Nieuwbouw Makelaar Spanje", url: "https://www.nieuwbouwmakelaarspanje.com/" },
  { title: "Limisan", url: "https://www.limisan.nl" },
  { title: "Kozijnrubbers", url: "https://kozijnrubbers.nl/" },
  { title: "Spanje Advies", url: "https://spanje-advies.nl/" },
];

const googleAdsItems = [
  {
    title: "Strategie",
    body: "Een heldere koers voor campagnes over meerdere kanalen, afgestemd op doelen en groeiambitie.",
  },
  {
    title: "Inrichten accounts",
    body: "Advertentieaccounts, websites, analytics en koppelingen worden logisch en meetbaar ingericht.",
  },
  {
    title: "Conversie tracking",
    body: "Resultaten worden correct toegewezen aan campagnes en vertaald naar ROAS en groeikansen.",
  },
  {
    title: "Campagne optimalisatie",
    body: "Audits, verbeteringen en continue bijsturing zorgen voor betere campagneprestaties.",
  },
  {
    title: "Performance meeting",
    body: "Maandelijkse cijfers worden inzichtelijk gemaakt, inclusief wat ze concreet betekenen.",
  },
];

const testimonials = [
  {
    name: "Kozijnrubbers.nl",
    text: "Sinds we samenwerken met Slimmer dan Gisteren is onze online marketing naar een hoger niveau getild. De kosten daalden en we trekken duidelijk meer bezoekers.",
  },
  {
    name: "Rob en Rene",
    text: "Met 50% minder advertentiekosten halen we hetzelfde of betere resultaten per maand dan met onze vorige marketingpartij.",
  },
  {
    name: "Pauwel",
    text: "Als makelaar in Spaans vastgoed begrijp ik het marketinglandschap beter en profiteer ik nog steeds van waardevolle online leads.",
  },
  {
    name: "Joris",
    text: "De goede verhalen zijn waargemaakt: we ontvangen meer leads en zijn minder afhankelijk van ons eigen netwerk.",
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
  { src: "/assets/content-zb.png", alt: "Contentvoorbeeld Zelfstandigen Bouw" },
  { src: "/assets/content-nxchange.png", alt: "Contentvoorbeeld Nxchange" },
  { src: "/assets/content-color-run.png", alt: "Social media contentvoorbeeld" },
  { src: "/assets/content-airbnb.png", alt: "Airbnb social media contentvoorbeeld" },
  { src: "/assets/content-maasclaim.png", alt: "Massaclaim social media contentvoorbeeld" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <img src="/assets/logo.png" alt="Slimmer dan Gisteren" />
          <span>Slimmer dan Gisteren</span>
        </Link>
        <nav aria-label="Hoofdnavigatie">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="header-cta" href="http://wa.me/31610175027">
          Contact
        </a>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <img src="/assets/logo.png" alt="" />
          <p>Slimmer dan Gisteren</p>
        </div>
        <div className="footer-links">
          <Link href="/website/">Website</Link>
          <Link href="/google-ads/">Google Ads</Link>
          <Link href="/branding/">Branding</Link>
          <a href="https://calendly.com/buitenhuisj004/bmc-sessie">Kennismaken</a>
        </div>
      </footer>
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  cta,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
}) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="actions">
          <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
            {cta}
          </a>
          <a className="button ghost" href="http://wa.me/31610175027">
            Direct contact
          </a>
        </div>
      </div>
    </section>
  );
}

export function WebsitePortfolio({ compact = false }: { compact?: boolean }) {
  const items = compact ? websites.slice(0, 4) : websites;

  return (
    <div className={compact ? "portfolio compact" : "portfolio"}>
      {items.map((site) => (
        <article className="portfolio-item" key={site.title}>
          <div className="portfolio-top">
            <h3>{site.title}</h3>
            <a href={site.url}>Open</a>
          </div>
          <iframe title={site.title} src={site.url} loading="lazy" />
        </article>
      ))}
    </div>
  );
}

export function GoogleAdsCards() {
  return (
    <div className="card-grid">
      {googleAdsItems.map((item) => (
        <article className="info-card" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="testimonial-grid">
      {testimonials.map((testimonial) => (
        <blockquote key={testimonial.name}>
          <p>{testimonial.text}</p>
          <cite>{testimonial.name}</cite>
        </blockquote>
      ))}
    </div>
  );
}

export function VideoGrid({ limit }: { limit?: number }) {
  return (
    <div className="video-grid">
      {(limit ? videos.slice(0, limit) : videos).map((video) => (
        <article className="video-card" key={video.src}>
          <video controls preload="metadata" playsInline>
            <source src={video.src} type="video/mp4" />
          </video>
          <h3>{video.title}</h3>
        </article>
      ))}
    </div>
  );
}

export function ContentGallery() {
  return (
    <div className="content-gallery">
      {contentImages.map((image) => (
        <img src={image.src} alt={image.alt} key={image.src} loading="lazy" />
      ))}
    </div>
  );
}
