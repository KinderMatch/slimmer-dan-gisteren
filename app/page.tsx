import Link from "next/link";
import { SiteShell, services, VideoGrid, WebsitePortfolio } from "./site-content";

export default function Home() {
  return (
    <SiteShell>
      <section className="hero hero-home">
        <div className="hero-copy">
          <p className="eyebrow">Groei begint met vandaag</p>
          <h1>Slimmer groeien met websites, advertenties en zichtbaarheid die kloppen.</h1>
          <p>
            Slimmer dan Gisteren helpt ondernemers met websitebeheer, Google Ads
            en social media campagnes die overzicht, meetbaarheid en resultaat
            brengen.
          </p>
          <div className="actions">
            <a className="button primary" href="https://calendly.com/buitenhuisj004/bmc-sessie">
              Kennismaken
            </a>
            <a className="button ghost" href="http://wa.me/31610175027">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Diensten">
          {services.map((service) => (
            <Link className="service-card" href={service.href} key={service.title}>
              <span>{service.kicker}</span>
              <strong>{service.title}</strong>
              <small>{service.summary}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Uitbesteden zonder ruis</p>
          <h2>De drie belangrijkste onderdelen opnieuw opgebouwd.</h2>
        </div>
        <div className="feature-grid">
          {services.map((service) => (
            <article className="feature" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link href={service.href}>Bekijk pagina</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Websitebeheer</p>
          <h2>Voorbeelden van websites in beheer of samenwerking.</h2>
          <p>
            De huidige WordPress-pagina toont klantwebsites als live previews.
            In deze rebuild blijft dat concept behouden, maar met een rustiger
            portfolio-overzicht.
          </p>
        </div>
        <WebsitePortfolio compact />
      </section>

      <section className="section media-band">
        <div className="section-heading">
          <p className="eyebrow">Social advertising</p>
          <h2>Videocases en contentvoorbeelden blijven onderdeel van de site.</h2>
        </div>
        <VideoGrid limit={3} />
      </section>
    </SiteShell>
  );
}
