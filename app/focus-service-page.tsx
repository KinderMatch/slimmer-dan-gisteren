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
    return ["Jouw website en doelen bespreken", "Eerste technische aandachtspunten", "Belangrijke zoekvragen en pagina’s", "Samen de vervolgstap bepalen"];
  }

  return ["Campagne- en trackingcheck", "Budget- en verspilling-indicatie", "Landingspagina-observaties", "Concrete optimalisatiekansen"];
}

function ctaMicrocopy(data: GrowthPageData) {
  if (data.slug === "/seo/") return ["Direct met Jimmy", "Vrijblijvend kennismaken", "Heel Nederland"];
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
    text: "Vraag contact aan over je SEO-scan. Na ontvangst bespreken we je website, doelen en eerste aandachtspunten.",
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
  const important = new Set([
    "Wat krijg ik als ik SEO uitbesteed aan Slimmer dan Gisteren?",
    "Wat kost een SEO marketingbureau?", "Hoe snel zie je SEO-resultaat?",
    "Werken jullie alleen voor bedrijven rond Amsterdam?", "Wat hebben jullie van mij nodig?",
    "Hoe meten jullie SEO-resultaat?", "Kan ik eerst alleen de gratis SEO-scan aanvragen?",
    "Kunnen jullie een top-3-positie in Google garanderen?",
  ]);
  const renderQuestion = (item: GrowthPageData["faq"][number]) => (
    <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
  );
  if (data.slug !== "/seo/") return <div className="focus-faq-panel"><p className="eyebrow">FAQ</p><h2>Veelgestelde vragen</h2><div>{data.faq.map(renderQuestion)}</div></div>;
  const groups = [
    { title: "SEO begrijpen", match: /Wat is|Wat doet|Waarom|zoekintentie|topical authority/ },
    { title: "Techniek, content en kanalen", match: /content|landingspagina|linkbuilding|WordPress|migratie|blogs|structured data|Ads|GEO|AI/ },
    { title: "Samenwerking en vervolg", match: /.*/ },
  ];
  const remaining = data.faq.filter(item => !important.has(item.question));
  return <div className="focus-faq-panel" id="seo-vragen">
    <p className="eyebrow">Jouw vragen</p><h2>Voordat je SEO uitbesteedt</h2>
    <div>{data.faq.filter(item => important.has(item.question)).map(renderQuestion)}</div>
    <h3>Meer uitleg over SEO</h3>
    <p>Wil je je verder verdiepen? Open hieronder het onderwerp dat bij je vraag past.</p>
    {groups.map((group, index) => <details className="seo-faq-group" key={group.title}>
      <summary>{group.title}</summary>
      <div>{remaining.filter(item => groups.findIndex(g => g.match.test(item.question)) === index).map(renderQuestion)}</div>
    </details>)}
  </div>;
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
      {data.slug === "/seo/" ? <div className="seo-contact-next"><h3>Wat gebeurt er daarna?</h3><ol><li>Je verstuurt je aanvraagmail of boekt een gesprek.</li><li>We bespreken je website, doelgroep en wat je met SEO wilt bereiken.</li><li>Als vervolgwerk past, ontvang je eerst een voorstel met werkzaamheden en kosten.</li></ol><p>Liever bellen? <a href="tel:+31610175027">06 10175027</a> (ma–vr 09.00–18.00).</p></div> : null}
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
            <a className="button primary" href={data.slug === "/seo/" ? calendlyUrl : `#${id}`}>{data.slug === "/seo/" ? "Plan een kennismaking met Jimmy" : data.primaryCta}</a>
            <a className="button ghost" href={data.slug === "/seo/" ? `#${id}` : "#aanpak"}>{data.slug === "/seo/" ? "Vraag contact over een SEO-scan" : data.secondaryCta}</a>
          </div>
          <div className="focus-cta-microcopy" aria-label="Wat je mag verwachten">
            {microcopy.map((item) => <span key={item}>{item}</span>)}
          </div>
          {data.slug === "/seo/" ? <p className="seo-hero-contact">Liever bellen? <a href="tel:+31610175027">06 10175027</a> · ma–vr 09.00–18.00</p> : null}
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

      {data.slug === "/seo/" ? <aside className="section seo-contact-summary" aria-label="Jouw aanspreekpunt voor SEO">
        <ResponsiveImage src="/assets/jimmy-buitenhuis.png" alt="Jimmy Buitenhuis" width={320} height={320} loading="lazy" sizes="72px" />
        <div><strong>Van eerste gesprek tot uitvoering: direct contact met Jimmy.</strong><p>We bespreken je website, doelgroep en gewenste aanvragen. Een betaald vervolg begint pas nadat we de werkzaamheden en kosten hebben afgesproken.</p><a href="#seo-praktijkvoorbeeld">Bekijk wat we op onze eigen website hebben verbeterd</a></div>
      </aside> : null}

      {data.slug === "/seo/" ? (
        <nav className="section focus-seo-jumps" aria-label="Op deze SEO-pagina">
          <a href="#seo-diensten">Diensten en oplevering</a>
          <a href="#seo-vragen">Veelgestelde vragen</a>
          <a href="#seo-topic-heading">Wat is SEO marketing?</a>
          <a href="#seo-uitbesteden">SEO uitbesteden</a>
          <a href="#seo-region-heading">Lokale en landelijke SEO</a>
          <a href="#seo-praktijkvoorbeeld">Praktijkvoorbeeld</a>
          <a href="#seo-kosten">Kosten en afspraken</a>
          <a href="#aanpak">Onze aanpak</a>
          <a href="#seo-google-updates">Google-updates</a>
          <a href="#seo-scan">Gratis scan aanvragen</a>
        </nav>
      ) : null}

      {data.slug === "/seo/" ? (
        <section className="section focus-seo-depth" id="seo-diensten" aria-labelledby="seo-services-heading">
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">Diensten en oplevering</p>
            <h2 id="seo-services-heading">{data.servicesTitle}</h2>
            <p>{data.servicesIntro}</p>
            <p>Je werkt rechtstreeks met <a href="#seo-uitbesteden">Jimmy Buitenhuis</a>, vanuit Diemen voor bedrijven in heel Nederland. We overleggen online of op afspraak bij jou op locatie.</p>
          </div>
          <div className="focus-seo-depth-grid">
            {featuredServices.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                {service.deliverable ? <p><strong>Concrete oplevering: </strong>{service.deliverable}</p> : null}
                {service.title === "Zoekwoordenonderzoek" ? <a href="/seo/zoekwoordenonderzoek/">Zo koppelen we zoekvragen aan pagina’s</a> : null}
                {service.title === "Technische SEO" ? <a href="/seo/technische-seo/">Bekijk de technische controlevolgorde</a> : null}
              </article>
            ))}
          </div>
          <p>We gebruiken de <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=nl">SEO-richtlijnen van Google</a> als technische basis. Content moet een klantvraag beantwoorden en eigen vakkennis toevoegen. Bij externe vermeldingen volgen we <a href="https://developers.google.com/search/docs/essentials/spam-policies#link-spam">Googles beleid voor links</a>: betaalde reclame wordt als zodanig gemarkeerd; we kopen geen links om rankings te manipuleren.</p>
          <p>Twijfel je waar je moet beginnen? De <a href="#seo-scan">gratis SEO-scan</a> geeft een eerste diagnose. Bekijk ook <a href="#seo-kosten">wat de kosten bepaalt</a> en ons <a href="#seo-praktijkvoorbeeld">praktijkvoorbeeld op deze website</a>.</p>
          <div className="focus-premium-actions"><a className="button primary" href="#seo-scan">Ontdek de prioriteiten voor mijn website</a><a className="button ghost" href={calendlyUrl}>Maak kennis met Jimmy</a></div>
        </section>
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

      {data.slug !== "/seo/" && data.deepDive ? (
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

      {data.slug !== "/seo/" && data.topicalAuthority ? (
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

      {data.regional ? (
        <section className="section focus-seo-depth" aria-labelledby={`${slugKey}-region-heading`}>
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">Samenwerken</p>
            <h2 id={`${slugKey}-region-heading`}>{data.regional.title}</h2>
            <p>{data.regional.intro}</p>
          </div>
          <details className="seo-explainer" open={data.slug !== "/seo/"}><summary>Zo stemmen we SEO af op je werkgebied</summary><div className="focus-seo-depth-grid">
            {data.regional.blocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div></details>
          <div className="focus-premium-actions">
            <a className="button primary" href={`#${id}`}>Bespreek jouw SEO-kansen</a>
            <a className="button ghost" href="mailto:jimmy@slimmerdangisteren.nl">Mail Jimmy rechtstreeks</a>
          </div>
        </section>
      ) : null}

      {data.slug === "/seo/" ? (
        <section className="section focus-seo-depth" id="seo-uitbesteden" aria-labelledby="seo-outsource-heading">
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">SEO uitbesteden</p>
            <h2 id="seo-outsource-heading">Wat neem je af en wie voert het uit?</h2>
            <div className="seo-person"><ResponsiveImage src="/assets/jimmy-buitenhuis.png" alt="Jimmy Buitenhuis, jouw aanspreekpunt bij Slimmer dan Gisteren" width={320} height={320} loading="lazy" sizes="160px" /><div><h3>Jimmy Buitenhuis</h3><p>Bij Slimmer dan Gisteren ben ik je aanspreekpunt voor SEO-strategie en uitvoering. Samen bepalen we welke klanten je wilt bereiken, wat je website daarvoor nodig heeft en welke verbeteringen eerst komen.</p><p>Je spreekt rechtstreeks met mij. Vanuit Diemen werk ik met bedrijven in heel Nederland, online of op afspraak bij jou op locatie.</p><a href="mailto:jimmy@slimmerdangisteren.nl">Stel Jimmy je vraag</a></div></div>
          </div>
          <div className="focus-seo-depth-grid">
            <article><h3>Een plan dat je kunt beoordelen</h3><p>Voor de uitvoering spreken we af welke pagina’s en zoekvragen prioriteit krijgen, welke technische verbeteringen nodig zijn en wie wat oppakt. De omvang en kosten hangen af van je website, concurrentie en beschikbare capaciteit.</p></article>
            <article><h3>Inzicht in werkzaamheden en effect</h3><p>We leggen vast wat is aangepast. Vooraf leggen we een nulmeting vast. In Search Console vergelijken we dezelfde pagina’s en zoekvragen over vergelijkbare perioden, met merknaamzoekopdrachten apart. Waar aanvragen worden gemeten, nemen we ook leadkwaliteit mee. In de rapportage staan de uitgevoerde acties, ontwikkeling en volgende prioriteiten. Frequentie en meetinrichting spreken we vooraf af; een gemiddelde positie is geen vaste Google-ranking.</p></article>
            <article><h3>Voorbeeld van een SEO-diagnose</h3><p>Een dienstpagina krijgt vertoningen maar weinig klikken. Dan onderzoeken we eerst de zoekvragen, positie en getoonde titel. Sluit de pagina aan op de vraag? Is het aanbod duidelijk? We veranderen gericht één onderdeel en vergelijken daarna de ontwikkeling. Dit is een werkwijzevoorbeeld, geen klantresultaat.</p><p><a href="/downloads/seo-verbeterplan.csv" download>Download een voorbeeld van een SEO-verbeterplan (CSV)</a>. Open het in Excel of Google Sheets; de voorbeeldregels zijn fictief en kunnen worden vervangen door je eigen bevindingen.</p></article>
            <article id="seo-google-updates"><h3>Hoe we omgaan met Google-updates</h3><p>Bij een verandering in zoekverkeer vergelijken we de timing met de <a href="https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history">officiële updategeschiedenis van Google</a>. Samenvallende datums bewijzen niet dat een update de oorzaak is. Ook wijzigingen aan je website, zoekvraag en concurrentie kunnen meespelen.</p><p>Voor een core-update volgen we <a href="https://developers.google.com/search/docs/appearance/core-updates">Googles analyseadvies</a>: eerst de uitrol laten afronden, daarna minimaal een volle week wachten en vergelijken met een periode vóór de update. We bekijken getroffen pagina’s en zoekvragen voordat we ingrijpen. Technische fouten lossen we wel direct op.</p></article>
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

      {data.slug === "/seo/" && data.deepDive ? (
        <section className="section focus-seo-depth" aria-labelledby={depthHeadingId}>
          <div className="focus-seo-depth-heading">
            <p className="eyebrow">{data.slug === "/geo/" ? "GEO-strategie" : "SEO-strategie"}</p>
            <h2 id={depthHeadingId}>{data.deepDive.title}</h2>
            <p>{data.deepDive.intro}</p>
          </div>
          <details className="seo-explainer"><summary>Bekijk de situaties waarin SEO kan helpen</summary><div className="focus-seo-depth-grid">
            {data.deepDive.blocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div></details>
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

      {data.slug === "/seo/" && data.topicalAuthority ? (
        <section className="section focus-topic-section" aria-labelledby={topicHeadingId}>
          <div className="section-heading">
            <p className="eyebrow">{data.eyebrow}</p>
            <h2 id={topicHeadingId}>{data.topicalAuthority.title}</h2>
            <p>{data.topicalAuthority.intro}</p>
          </div>
          <details className="seo-explainer"><summary>Verdiep je in de vier onderdelen van SEO</summary><div className="focus-topic-grid">
            {data.topicalAuthority.clusters.map((cluster) => (
              <article key={cluster.title}>
                <h3>{cluster.title}</h3>
                <p>{cluster.body}</p>
                <ul>
                  {cluster.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div></details>
        </section>
      ) : null}

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
          <h2>{data.slug === "/seo/" ? "Van je aanvraag naar persoonlijk contact" : "Je krijgt geen algemeen advies, maar een eerste prioriteitenlijst."}</h2>
          <p>{data.slug === "/seo/" ? "Kies zelf een moment in de agenda of stel hieronder je aanvraagmail op en verstuur die. Na ontvangst nemen we contact met je op om je website en jouw vragen te bespreken. Een eventueel betaald vervolg spreken we apart af." : "De scan is bedoeld om snel te zien waar de meeste winst of duidelijkheid zit. Geen verplichting, wel een concreet startpunt voor een beter gesprek."}</p>
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
