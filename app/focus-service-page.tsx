import { SeoEvidence } from "./seo-evidence";
import { ResponsiveImage } from "./responsive-image";
import { EmphasisText } from "./language";
import { dimensionsFor } from "./image-dimensions";
import { ScanForm } from "./scan-form";
import { calendlyUrl } from "./seo";
import type { GrowthPageData } from "./growth-pages-data";

function formId(slug: GrowthPageData["slug"]) {
  return `${slug.replaceAll("/", "")}-scan`;
}

function pageAccent(data: GrowthPageData) {
  if (data.slug === "/geo/") return ["AI-antwoorden", "Expertise", "Bronnen"];
  if (data.slug === "/seo/") return ["Techniek", "Content", "Autoriteit"];
  return ["Zoekvraag", "Tracking", "Optimalisatie"];
}

function timelineLabels(data: GrowthPageData) {
  if (data.slug === "/geo/") return ["Start", "Vragen", "Content", "Autoriteit", "Monitoring"];
  if (data.slug === "/seo/") return ["Diagnose", "Plan", "Uitvoering", "Verbetering"];
  return ["Start", "Strategie", "Tracking", "Bouw", "Optimalisatie", "Rapportage"];
}

function visualAsset(data: GrowthPageData) {
  if (data.slug === "/geo/") {
    return { kind: "video", src: "/assets/content/ai-actors-slimmer-dan-gisteren.m4v", label: "AI content en zichtbaarheid" };
  }

  if (data.slug === "/google-ads/") {
    return { kind: "image", src: "/assets/google-ads.gif", label: "Google Ads-campagnes en performance" };
  }

  return { kind: "video", src: "https://videos.files.wordpress.com/SiM1cMuS/zelfstandigen-bouw_commercial_rbv_hondenhok_final-1x1_social.mp4#t=0.001", label: "Campagnecreatie en performance" };
}

function scanDeliverables(data: GrowthPageData) {
  if (data.slug === "/geo/") {
    return ["Controle op AI-zichtbaarheid", "Belangrijkste vragen en prompts", "Contentkansen voor betere bronwaarde", "Prioriteiten voor de eerste optimalisaties"];
  }

  if (data.slug === "/seo/") {
    return ["Technische quickscan", "Zoekwoorden met koopintentie", "Pagina's die prioriteit verdienen", "Eerste verbeterplan zonder verplichting"];
  }

  return ["Campagne- en trackingcheck", "Budget- en verspilling-indicatie", "Landingspagina-observaties", "Concrete optimalisatiekansen"];
}

function ctaMicrocopy(data: GrowthPageData) {
  if (data.slug === "/seo/") return ["Gratis analyse", "Geen verplichting", "Concrete prioriteiten"];
  if (data.slug === "/geo/") return ["AI-zichtbaarheid", "Kansen per prompt", "Geen garanties, wel richting"];
  return ["Trackingcheck", "Budgetkansen", "Geen verplichting"];
}

function heroProofLabels(data: GrowthPageData) {
  if (data.slug === "/geo/") return ["AI-zichtbaarheid", "Prompts", "Bronnen", "Conversie"];
  return ["Techniek", "Zoekintentie", "Concurrentie", "Conversie"];
}

function inlineCtaCopy(data: GrowthPageData) {
  if (data.slug === "/geo/") {
    return {
      eyebrow: "Snelle check",
      title: "Wil je weten hoe zichtbaar jouw bedrijf nu is in AI-antwoorden?",
      text: "Vraag de GEO-scan aan en krijg een eerste beeld van prompts, bronwaarde, contentkansen en autoriteit.",
      cta: "Vraag de GEO-scan aan",
    };
  }

  return {
    eyebrow: "Snelle check",
    title: "Wil je weten welke SEO-kansen jouw website nu laat liggen?",
    text: "Vraag de scan aan en krijg een eerste prioriteitenlijst voor techniek, content, zoekintentie en conversie.",
    cta: "Vraag de SEO-scan aan",
  };
}

function fitSectionCopy(data: GrowthPageData) {
  if (data.slug === "/geo/") {
    return {
      eyebrow: "Past dit bij jou?",
      title: "GEO werkt het best wanneer je expertise al online onderbouwd kan worden.",
      good: [
        "Je wilt zichtbaar worden in AI-antwoorden rond jouw expertise.",
        "Je hebt kennis, diensten of cases die beter uitgelegd kunnen worden.",
        "Je wilt weten welke vragen klanten aan AI-systemen stellen.",
        "Je zoekt een nuchtere aanpak zonder garanties die niemand kan waarmaken.",
      ],
      bad: [
        "Je verwacht dat AI-platformen gegarandeerd je merk noemen.",
        "Je hebt nog geen duidelijke website, content of propositie.",
        "Je wilt alleen snelle hacks in plaats van structurele autoriteit opbouwen.",
      ],
    };
  }

  return {
    eyebrow: "Past dit bij jou?",
    title: "SEO werkt het best wanneer er duidelijke commerciële zoekvraag is.",
    good: [
      "Je wilt structureel meer aanvragen uit Google.",
      "Je website heeft diensten of producten met zoekvraag.",
      "Je wilt weten welke pagina's prioriteit verdienen.",
      "Je zoekt een helder plan in plaats van losse SEO-taken.",
    ],
    bad: [
      "Je verwacht gegarandeerde posities in Google.",
      "Je zoekt resultaat zonder iets aan website of content te veranderen.",
      "Je wilt alleen een eenmalige truc in plaats van doorlopende verbetering.",
    ],
  };
}

function SeoSystemVisual() {
  return (
    <div className="focus-seo-system" aria-label="SEO systeem visualisatie">
      <div className="focus-seo-browser">
        <span />
        <span />
        <span />
      </div>
      <div className="focus-seo-search">
        <span>Zoekvraag</span>
        <strong>SEO marketingbureau</strong>
      </div>
      <div className="focus-seo-map">
        <article>
          <span>01</span>
          <strong>Techniek</strong>
          <p>Indexering, snelheid en structuur.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Zoekintentie</strong>
          <p>Pagina's rond vragen en koopintentie.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Contentclusters</strong>
          <p>Diensten, branches en relevante thema's.</p>
        </article>
        <article>
          <span>04</span>
          <strong>Autoriteit</strong>
          <p>Interne links, vermeldingen en vertrouwen.</p>
        </article>
      </div>
      <div className="focus-seo-serp">
        <div>
          <span>Organisch resultaat</span>
          <strong>Slimmer dan Gisteren</strong>
          <p>SEO-strategie voor betere online vindbaarheid en meer aanvragen.</p>
        </div>
        <small>Techniek + content + autoriteit</small>
      </div>
    </div>
  );
}

function FaqPanel({ data }: { data: GrowthPageData }) {
  return (
    <div className="focus-faq-panel">
      <p className="eyebrow">FAQ</p>
      <h2>Veelgestelde vragen</h2>
      <div>
        {data.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function ScanFormPanel({ data, id, microcopy }: { data: GrowthPageData; id: string; microcopy: string[] }) {
  return (
    <div className="focus-form-panel">
      <p className="eyebrow">Gratis scan</p>
      <h2><EmphasisText value={data.form.title} /></h2>
      <p>{data.form.text}</p>
      <div className="focus-form-promise">
        {microcopy.map((item) => <span key={item}>{item}</span>)}
      </div>
      <ScanForm delivery={data.slug === "/seo/" ? "email" : "server"} fields={data.form.fields} formId={id} pageTitle={data.form.title} pageSlug={data.slug} submitLabel={data.form.submit} />
      <a className="button ghost" href={calendlyUrl}>Plan liever direct een kennismaking</a>
    </div>
  );
}

export function FocusServicePage({ data }: { data: GrowthPageData }) {
  const id = formId(data.slug);
  const accents = pageAccent(data);
  const featuredServices = data.services.slice(0, 6);
  const timeline = timelineLabels(data);
  const media = visualAsset(data);
  const deliverables = scanDeliverables(data);
  const microcopy = ctaMicrocopy(data);
  const compactPage = data.slug === "/seo/" || data.slug === "/geo/";
  const hideRepeatedMethod = compactPage || data.slug === "/google-ads/";
  const inlineCta = inlineCtaCopy(data);
  const fitCopy = fitSectionCopy(data);
  const proofLabels = heroProofLabels(data);
  const slugKey = data.slug.replaceAll("/", "") || "service";
  const depthHeadingId = `${slugKey}-depth-heading`;
  const topicHeadingId = `${slugKey}-topic-heading`;

  const pageClassName = `service-premium focus-premium-page ${compactPage ? "focus-compact-page" : ""} ${data.slug === "/seo/" ? "focus-seo-page" : ""} ${data.slug === "/geo/" ? "focus-geo-page" : ""}`;

  return (
    <div className={pageClassName}>
      <section className="focus-premium-hero">
        <div className="focus-premium-shade" aria-hidden="true" />
        <div className="focus-premium-copy">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
          <div className="focus-premium-actions">
            <a className="button primary" href={`#${id}`}>{data.primaryCta}</a>
            <a className="button ghost" href="#aanpak">{data.secondaryCta}</a>
          </div>
          <div className="focus-cta-microcopy" aria-label="Wat je mag verwachten">
            {microcopy.map((item) => <span key={item}>{item}</span>)}
          </div>
          {compactPage ? (
            <div className="focus-seo-hero-proof" aria-label={`${data.eyebrow} scan onderdelen`}>
              {proofLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
          ) : null}
        </div>
        {compactPage && data.slug !== "/geo/" ? (
          <figure className="focus-compact-hero-visual" aria-label={`${data.eyebrow} visualisatie`}>
            {data.slug === "/seo/" ? (
              <ResponsiveImage
                src="/assets/seo-google-search.gif"
                alt="Google zoekanimatie voor SEO marketingbureau"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 520px"
                width={dimensionsFor("/assets/seo-google-search.gif")?.width}
                height={dimensionsFor("/assets/seo-google-search.gif")?.height}
              />
            ) : (
              <video muted playsInline preload="none" autoPlay loop>
                <source src={media.src} type="video/mp4" />
              </video>
            )}
          </figure>
        ) : null}
        {!compactPage ? (
          <aside className="focus-premium-proof" aria-label={`${data.eyebrow} systeem`}>
            <span>{data.visual.label}</span>
            <strong>{data.visual.title}</strong>
            <p>{data.trust.line}</p>
            <div>
              {accents.map((accent) => <small key={accent}>{accent}</small>)}
            </div>
            <figure className="focus-proof-media">
              {media.kind === "image" ? (
                <ResponsiveImage src={media.src} alt={media.label} loading="eager" width={dimensionsFor(media.src)?.width} height={dimensionsFor(media.src)?.height} />
              ) : (
                <video muted playsInline preload="none" autoPlay loop>
                  <source src={media.src} type="video/mp4" />
                </video>
              )}
              <figcaption>{media.label}</figcaption>
            </figure>
          </aside>
        ) : null}
      </section>

      {data.slug === "/seo/" ? (
        <nav className="section focus-seo-jumps" aria-label="Op deze SEO-pagina">
          <a href="#seo-topic-heading">Wat is SEO marketing?</a>
          <a href="#seo-uitbesteden">SEO uitbesteden</a>
          <a href="#seo-region-heading">Lokale en landelijke SEO</a>
          <a href="#seo-praktijkvoorbeeld">Praktijkvoorbeeld</a>
          <a href="#seo-kosten">Kosten en afspraken</a>
          <a href="#aanpak">Onze aanpak</a>
          <a href="#seo-scan">Gratis scan aanvragen</a>
        </nav>
      ) : null}

      {data.intro && !compactPage ? (
        <section className="section focus-manifesto">
          <p className="eyebrow">Context</p>
          <h2>{data.intro.title}</h2>
          <p>{data.intro.body}</p>
          <div className="focus-manifesto-points">
            {data.intro.points.map((point) => <span key={point}>{point}</span>)}
          </div>
        </section>
      ) : null}

      {data.deepDive ? (
        <section className="section focus-seo-depth" aria-labelledby={depthHeadingId}>
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">{data.slug === "/geo/" ? "GEO-strategie" : "SEO-strategie"}</p>
            <h2 id={depthHeadingId}>{data.deepDive.title}</h2>
            <p>{data.deepDive.intro}</p>
          </div>
          <div className="focus-seo-depth-grid">
            {data.deepDive.blocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div>
          {data.deepDive.related ? (
            <div className="focus-related-links" aria-label="Gerelateerde diensten">
              {data.deepDive.related.map((item) => (
                <a href={item.href} key={item.href}>
                  <span>{item.label}</span>
                  <p>{item.text}</p>
                </a>
              ))}
            </div>
          ) : null}
          {compactPage ? (
            <div className="focus-inline-cta">
              <div>
                <p className="eyebrow">{inlineCta.eyebrow}</p>
                <h3>{inlineCta.title}</h3>
                <p>{inlineCta.text}</p>
              </div>
              <a className="button primary" href={`#${id}`}>{inlineCta.cta}</a>
            </div>
          ) : null}
        </section>
      ) : null}

      {data.regional ? (
        <section className="section focus-seo-depth" aria-labelledby={`${slugKey}-region-heading`}>
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">Samenwerken</p>
            <h2 id={`${slugKey}-region-heading`}>{data.regional.title}</h2>
            <p>{data.regional.intro}</p>
          </div>
          <div className="focus-seo-depth-grid">
            {data.regional.blocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div>
          <div className="focus-premium-actions">
            <a className="button primary" href={`#${id}`}>Bespreek jouw SEO-kansen</a>
            <a className="button ghost" href="mailto:jimmy@slimmerdangisteren.nl">Mail Jimmy rechtstreeks</a>
          </div>
        </section>
      ) : null}

      {data.topicalAuthority ? (
        <section className="section focus-topic-section" aria-labelledby={topicHeadingId}>
          <div className="section-heading">
            <p className="eyebrow">{data.eyebrow}</p>
            <h2 id={topicHeadingId}>{data.topicalAuthority.title}</h2>
            <p>{data.topicalAuthority.intro}</p>
          </div>
          <div className="focus-topic-grid">
            {data.topicalAuthority.clusters.map((cluster) => (
              <article key={cluster.title}>
                <h3>{cluster.title}</h3>
                <p>{cluster.body}</p>
                <ul>
                  {cluster.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.slug === "/seo/" ? (
        <section className="section focus-seo-depth" id="seo-uitbesteden" aria-labelledby="seo-outsource-heading">
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">SEO uitbesteden</p>
            <h2 id="seo-outsource-heading">Wat neem je af en wie voert het uit?</h2>
            <p>Je aanspreekpunt is Jimmy Buitenhuis. Vanuit Diemen werken we online of op afspraak bij jou op locatie. We beginnen met je website, aanbod en de klanten die je wilt bereiken.</p>
          </div>
          <div className="focus-seo-depth-grid">
            <article><h3>Een plan dat je kunt beoordelen</h3><p>Voor de uitvoering spreken we af welke pagina’s en zoekvragen prioriteit krijgen, welke technische verbeteringen nodig zijn en wie wat oppakt. De omvang en kosten hangen af van je website, concurrentie en beschikbare capaciteit.</p></article>
            <article><h3>Inzicht in werkzaamheden en effect</h3><p>We leggen vast wat is aangepast. In Search Console vergelijken we vertoningen en klikken per pagina en zoekvraag. Als aanvragen worden gemeten, kijken we ook naar de bijdrage aan je bedrijf. Een gemiddelde positie alleen vertelt niet het hele verhaal.</p></article>
            <article><h3>Voorbeeld van een SEO-diagnose</h3><p>Een dienstpagina krijgt vertoningen maar weinig klikken. Dan onderzoeken we eerst de zoekvragen, positie en getoonde titel. Sluit de pagina aan op de vraag? Is het aanbod duidelijk? We veranderen gericht één onderdeel en vergelijken daarna de ontwikkeling. Dit is een werkwijzevoorbeeld, geen klantresultaat.</p></article>
            <article><h3>De basis van ons advies</h3><p>Onze technische controles sluiten aan op de <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=nl">SEO-richtlijnen van Google</a>. Voor keuzes over content kijken we naar de klantvraag, je eigen expertise en wat je aantoonbaar kunt onderbouwen.</p></article>
          </div>
          <div className="focus-premium-actions"><a className="button primary" href="#seo-scan">Vraag een eerste SEO-analyse aan</a><a className="button ghost" href="tel:+31610175027">Bel Jimmy: 06 10175027</a></div>
        </section>
      ) : null}

      {data.slug === "/seo/" ? <SeoEvidence /> : null}

      <section className="section focus-timeline-section" id="aanpak">
        <div className="section-heading">
          <p className="eyebrow">Tijdspad</p>
          <h2>Van eerste analyse naar doorlopende verbetering.</h2>
          <p>Het traject begint met scherpte aanbrengen. Daarna bouwen we stap voor stap aan een fundament dat maandelijks beter kan worden.</p>
        </div>
        <div className="focus-timeline" aria-label={`${data.eyebrow} tijdspad`}>
          {data.process.map((step, index) => (
            <article key={step.title}>
              <span>{timeline[index] ?? "Vervolg"}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {!compactPage ? (
        <section className="section focus-runway-section">
          <div className="section-heading">
            <p className="eyebrow">Aanbod</p>
            <h2>{data.servicesTitle}</h2>
            <p>{data.servicesIntro}</p>
          </div>
          <div className="focus-runway">
            {featuredServices.map((service) => (
              <article key={service.title}>
                <span>{data.eyebrow}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!hideRepeatedMethod ? (
        <section className="section soft focus-method-section">
          <div className="focus-method-heading">
            <p className="eyebrow">Werkwijze</p>
            <h2>{data.processTitle}</h2>
            <p>{data.resultText}</p>
          </div>
          <div className="focus-method-list">
            {data.process.map((step) => (
              <article key={step.title}>
                <span>Werkwijze</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.comparison ? (
        <section className="section focus-split-section">
          <div className="section-heading">
            <p className="eyebrow">Strategie</p>
            <h2>{data.comparison.title}</h2>
          </div>
          <div className="focus-split">
            <article>
              <h3>{data.comparison.leftTitle}</h3>
              <ul>{data.comparison.leftItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h3>{data.comparison.rightTitle}</h3>
              <ul>{data.comparison.rightItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <p className="focus-split-note">{data.comparison.footer}</p>
        </section>
      ) : null}

      <section className="section focus-benefit-band">
        <div>
          <p className="eyebrow">Waarom dit werkt</p>
          <h2>{data.benefitsTitle}</h2>
        </div>
        <div>
          {data.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
        </div>
      </section>

      {compactPage ? (
        <section className="section focus-fit-section">
          <div>
            <p className="eyebrow">{fitCopy.eyebrow}</p>
            <h2>{fitCopy.title}</h2>
          </div>
          <div className="focus-fit-grid">
            <article>
              <span>Goede match</span>
              <ul>
                {fitCopy.good.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article>
              <span>Minder logisch</span>
              <ul>
                {fitCopy.bad.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      <section className="section focus-scan-offer">
        <div>
          <p className="eyebrow">Gratis scan</p>
          <h2>Je krijgt geen algemeen advies, maar een eerste prioriteitenlijst.</h2>
          <p>De scan is bedoeld om snel te zien waar de meeste winst of duidelijkheid zit. Geen verplichting, wel een concreet startpunt voor een beter gesprek.</p>
        </div>
        <div className="focus-offer-list">
          {deliverables.map((item) => (
            <article key={item}>
              <span>Scan</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      {data.slug === "/google-ads/" && data.reviews.length > 0 ? (
        <section className="section soft focus-review-section">
          <div className="section-heading">
            <p className="eyebrow">Review</p>
            <h2>Wat Kozijnrubbers zegt over slimmer adverteren.</h2>
          </div>
          <div className="focus-review-card">
            <blockquote>
              <p>"{data.reviews[0].quote}"</p>
              <footer>
                <cite>{data.reviews[0].name}</cite>
                <span>{data.reviews[0].company}</span>
              </footer>
            </blockquote>
          </div>
        </section>
      ) : null}

      {compactPage ? (
        <>
          <section className="section focus-scan-form-section" id={id}>
            <div className="focus-scan-form-card">
              <ScanFormPanel data={data} id={id} microcopy={microcopy} />
            </div>
          </section>
          <section className="section focus-faq-only">
            <FaqPanel data={data} />
          </section>
        </>
      ) : (
        <section className="section focus-faq-contact" id={id}>
          <FaqPanel data={data} />
          <ScanFormPanel data={data} id={id} microcopy={microcopy} />
        </section>
      )}
    </div>
  );
}
