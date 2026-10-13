import { calendlyUrl } from "./seo";
import { ScanForm } from "./scan-form";
import type { GrowthPageData } from "./growth-pages-data";

function slugToFormId(slug: GrowthPageData["slug"]) {
  return `${slug.replaceAll("/", "") || "home"}-scan`;
}

export function GrowthLandingPage({ data }: { data: GrowthPageData }) {
  const formId = slugToFormId(data.slug);

  return (
    <div className="growth-page service-premium">
      <section className="growth-hero hero page-hero">
        <div className="growth-hero-copy">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <div className="growth-actions">
            <a className="button primary" href={`#${formId}`}>{data.primaryCta}</a>
            <a className="button ghost" href="#aanpak">{data.secondaryCta}</a>
          </div>
        </div>
        <div className="growth-visual" aria-label={data.visual.title}>
          <span>{data.visual.label}</span>
          <strong>{data.visual.title}</strong>
          <p>{data.trust.line}</p>
          <div className="growth-visual-tags">
            {data.trust.badges.map((badge) => <small key={badge}>{badge}</small>)}
          </div>
        </div>
      </section>

      <section className="growth-trust" aria-label="Vertrouwen">
        <p>{data.trust.line}</p>
        <div>
          {data.trust.badges.map((badge) => <span key={badge}>{badge}</span>)}
        </div>
      </section>

      {data.intro ? (
        <section className="growth-section growth-intro">
          <div>
            <p className="eyebrow">Introductie</p>
            <h2>{data.intro.title}</h2>
          </div>
          <div>
            <p>{data.intro.body}</p>
            <ul>
              {data.intro.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="growth-section">
        <div className="growth-heading">
          <p className="eyebrow">Diensten</p>
          <h2>{data.servicesTitle}</h2>
          <p>{data.servicesIntro}</p>
        </div>
        <div className="growth-card-grid">
          {data.services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="growth-section growth-soft" id="aanpak">
        <div className="growth-heading">
          <p className="eyebrow">Werkwijze</p>
          <h2>{data.processTitle}</h2>
        </div>
        <div className="growth-process">
          {data.process.map((step) => (
            <article key={step.title}>
              <span>Werkwijze</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="growth-section growth-results">
        <div>
          <p className="eyebrow">Resultaat</p>
          <h2>{data.resultTitle}</h2>
          <p>{data.resultText}</p>
        </div>
        <div className="growth-result-points">
          {data.benefits.slice(0, 4).map((benefit) => (
            <article key={benefit}>
              <h3>{benefit}</h3>
            </article>
          ))}
        </div>
      </section>

      {data.comparison ? (
        <section className="growth-section">
          <div className="growth-heading">
            <p className="eyebrow">Vergelijking</p>
            <h2>{data.comparison.title}</h2>
          </div>
          <div className="growth-comparison">
            <article>
              <h3>{data.comparison.leftTitle}</h3>
              <ul>{data.comparison.leftItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h3>{data.comparison.rightTitle}</h3>
              <ul>{data.comparison.rightItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <p className="growth-comparison-footer">{data.comparison.footer}</p>
        </section>
      ) : null}

      <section className="growth-section growth-soft">
        <div className="growth-heading">
          <p className="eyebrow">Voordelen</p>
          <h2>{data.benefitsTitle}</h2>
        </div>
        <div className="growth-benefits">
          {data.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
        </div>
      </section>

      <section className="growth-section growth-faq">
        <div className="growth-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Veelgestelde vragen</h2>
        </div>
        <div>
          {data.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="growth-section growth-contact" id={formId}>
        <div>
          <p className="eyebrow">Gratis scan</p>
          <h2>{data.form.title}</h2>
          <p>{data.form.text}</p>
          <a className="button ghost" href={calendlyUrl}>Plan liever direct een kennismaking</a>
        </div>
        <ScanForm
          fields={data.form.fields}
          formId={formId}
          includePrivacyConsent
          pageTitle={data.title}
          pageSlug={data.slug}
          submitLabel={data.form.submit}
        />
      </section>
    </div>
  );
}
