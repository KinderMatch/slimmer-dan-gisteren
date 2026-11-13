import type { Metadata } from "next";
import { CaseCard } from "./case-card";
import { KlantwinstForm } from "./request-form";
import { ResponsiveImage } from "../responsive-image";
import { videoThumbnailFor } from "../video-thumbnails";
import styles from "./page.module.css";

const cta = "Vraag de gratis Klantwinst-check aan";
const caseVideos = [
  { name: "Schilder", src: "/assets/campaigns/zb-schilder.mp4" },
  { name: "Auto", src: "/assets/campaigns/zb-auto.mp4" },
  { name: "Hondenhok", src: "/assets/campaigns/zb-hondenhok.mp4" },
];
const checks = [
  { n: "01", title: "Spreekt je advertentie de juiste mensen aan?", body: "Wij bekijken je aanbod, tekst, beeld en oproep tot actie. Begrijpt je gewenste klant wat je aanbiedt en waarom dat relevant is?" },
  { n: "02", title: "Wordt interesse ook een aanvraag?", body: "Wij beoordelen je website, landingspagina of formulier. Waar raakt iemand de weg kwijt en wat is nodig om contact opnemen makkelijker te maken?" },
  { n: "03", title: "Herken je welke aanvragen bij je passen?", body: "Wij kijken welke informatie je uitvraagt en hoe je aanvragen beoordeelt. Zo bespreken wij hoe je passende klanten beter kunt onderscheiden." },
];
const faqs = [
  ["Is de Klantwinst-check echt gratis?", "Ja. De analyse en het gesprek van maximaal twintig minuten zijn gratis. Je hoeft geen betaalgegevens in te vullen en gaat geen betaalde samenwerking aan. Wil je later hulp bij de uitvoering, dan bespreken wij dat afzonderlijk."],
  ["Wat als ik nog geen advertenties of landingspagina heb?", "Je hoeft die niet eerst te maken. Wij bespreken je aanbod en doel en beoordelen wat al aanwezig is. Ontbrekende onderdelen nemen wij mee in ons advies. Zonder bestaande campagnegegevens doen wij geen uitspraken over campagneprestaties. De check bestaat uit analyse en advies; eventuele uitvoering bespreken wij pas daarna."],
  ["Moet ik nu toegang tot mijn advertentieaccount geven?", "Nee. Voor de aanvraag hebben wij alleen je contactgegevens, website, aanbod en doel nodig. Als accounttoegang nodig is voor de analyse, regelen wij dat daarna via de toegangsfuncties van het platform. Deel nooit je wachtwoord."],
  ["Wat krijg ik tijdens het gesprek?", "Wij bespreken de aansluiting tussen je advertentie, de route naar een aanvraag en de manier waarop je aanvragen kwalificeert. Je hoort welke knelpunten wij zien en wat volgens ons als eerste aandacht verdient. Wij benoemen ook wat wij met de beschikbare informatie nog niet kunnen vaststellen."],
  ["Wanneer hoor ik iets en hoeveel tijd kost het?", "Je krijgt uiterlijk binnen twee werkdagen na ontvangst een persoonlijke reactie; wij streven naar één werkdag. Wij plannen samen het analysegesprek. Dat duurt maximaal twintig minuten. Als wij vooraf aanvullende informatie nodig hebben, laten wij dat weten."],
];

export const metadata: Metadata = {
  title: "Gratis Klantwinst-check: ontdek waar je klantwerving beter kan",
  description: "Gratis Klantwinst-check voor dienstverleners: laat je advertenties, website en leadkwalificatie beoordelen. Analysegesprek van maximaal 20 minuten.",
  alternates: { canonical: "https://slimmerdangisteren.nl/klantwinst/" },
  openGraph: { title: "Gratis Klantwinst-check voor jouw klantwerving", description: "Vraag de gratis Klantwinst-check aan. Advertenties, website en kwalificatie samen bekeken.", url: "https://slimmerdangisteren.nl/klantwinst/", type: "website", images: [{ url: "/assets/jimmy-buitenhuis.png", alt: "Jimmy Buitenhuis, Slimmer dan Gisteren" }] },
};

function Action({ light = false }: { light?: boolean }) {
  return <a className={`${styles.cta} ${light ? styles.ctaLight : ""}`} href="#klantwinst-check">{cta}<span aria-hidden="true">↗</span></a>;
}

export default function KlantwinstPage() {
  return <div className={styles.page}>
    <a className={styles.skip} href="#inhoud">Ga naar de inhoud</a>
    <header className={styles.header}>
      <a className={styles.brand} href="/" aria-label="Slimmer dan Gisteren — home"><img src="/assets/logo.png" width="48" height="48" alt="" /><span>Slimmer dan<br />Gisteren<span className={styles.brandDot}>.</span></span></a>
      <nav aria-label="Op deze pagina"><a href="#aanpak">De check</a><a href="#werkwijze">Zo werkt het</a><a className={styles.headerCta} href="#klantwinst-check">Gratis check <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="inhoud" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>GRATIS KLANTWINST-CHECK</p>
          <h1 id="hero-title">Ontdek waar je <span>geschikte aanvragen</span> laat liggen.</h1>
          <p className={styles.lead}>Laat je advertenties, website en kwalificatie van aanvragen samen beoordelen. In een gratis gesprek van maximaal twintig minuten bespreken wij de knelpunten en welke verbeteringen prioriteit hebben.</p>
          <Action />
          <p className={styles.micro}>Gratis en vrijblijvend · Gesprek van maximaal 20 minuten</p>
          <p className={styles.audience}>Voor zakelijke dienstverleners of bedrijven in health, finance of e-commerce.</p>
        </div>
        <div className={styles.journey} aria-label="Wat wij bespreken tijdens de gratis Klantwinst-check">
          <div className={styles.journeyTop}><span>DIT BESPREKEN WIJ MET JE</span><span aria-hidden="true">↗</span></div>
          <ol>
            <li><span className={styles.stepIcon} aria-hidden="true">01</span><div><strong>Je advertentie</strong><p>Sluit je boodschap aan op de klant die je zoekt?</p></div></li>
            <li><span className={styles.stepIcon} aria-hidden="true">02</span><div><strong>De route naar contact</strong><p>Waar helpt je pagina of formulier, en waar haakt iemand af?</p></div></li>
            <li><span className={styles.stepIcon} aria-hidden="true">03</span><div><strong>De kwaliteit van aanvragen</strong><p>Hoe herken je of iemand bij jouw aanbod past?</p></div></li>
          </ol>
          <div className={styles.journeyBottom}><span className={styles.smallMark} aria-hidden="true">↗</span><p>Je neemt mee:<br /><strong>Inzicht en concrete vervolgstappen.</strong></p></div>
        </div>
      </section>

      <section className={styles.problem} aria-labelledby="problem-title">
        <p className={styles.eyebrow}>HERKENBAAR?</p>
        <h2 id="problem-title">Klikken, klikken,<br />niet kopen.</h2>
        <div><p>Je advertenties trekken aandacht, maar er komen weinig aanvragen binnen. Of er komen aanvragen, maar die passen niet bij je dienst, werkgebied of doelgroep.</p><p>De oorzaak kan in je advertentie zitten, maar ook in wat daarna gebeurt. Daarom beoordelen wij de boodschap, de website en de kwalificatie samen.</p></div>
      </section>

      <section className={styles.section} id="aanpak" aria-labelledby="checks-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>DE GRATIS KLANTWINST-CHECK</p><h2 id="checks-title">Drie vragen.<br />Een concrete verbeterrichting.</h2><p>Je krijgt een analysegesprek over jouw situatie. Wij bespreken wat opvalt, wat prioriteit heeft en wat wij nog niet kunnen vaststellen.</p></div>
        <div className={styles.checkGrid}>{checks.map(check => <article className={styles.check} key={check.n}><span className={styles.number}>{check.n}</span><h3>{check.title}</h3><p>{check.body}</p></article>)}</div>
        <div className={styles.note}><span aria-hidden="true">↳</span><p><strong>Al aan het adverteren?</strong> Waar nodig vragen wij na je aanvraag toegang tot je advertentieaccount. Zonder toegang beoordelen wij je openbare website; wij doen dan geen uitspraken over interne campagnegegevens.</p></div>
      </section>

      <section className={`${styles.section} ${styles.proofSection}`} id="praktijkvoorbeelden" aria-labelledby="proof-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>IN DE PRAKTIJK</p>
          <h2 id="proof-title">Verschillende bedrijven.<br />Een aanpak die bij de situatie past.</h2>
          <p>Herken je jouw situatie? Bekijk hoe wij advertenties, een website of een formulier inzetten. Open een case voor de aanpak en de context bij de resultaten.</p>
        </div>
        <div className={styles.proofGrid}>
          <CaseCard id="zelfstandigen-bouw" name="Zelfstandigen Bouw" preview={<>

              <span className={styles.proofImage}><ResponsiveImage src="/assets/optimized/social-ads-schilder.jpg" alt="Schilder met verfroller uit de campagne voor Zelfstandigen Bouw" width={800} height={707} sizes="(max-width: 740px) 88vw, 42vw" loading="lazy" /></span>
              <span className={styles.proofName}>Zelfstandigen Bouw</span>
              <span className={styles.proofType}>Belangenorganisatie voor zelfstandigen in de bouw</span>
              <span className={styles.proofQuestion}>Advertentie en landingspagina laten samenwerken</span>
              <span className={styles.proofMetric}>30–50</span>
              <span className={styles.proofLabel}>aanvragen per maand · eerder 8–15</span>
              <span className={styles.proofMethod}>Social-advertenties + landingspagina</span>
              <span className={styles.proofToggle}><span className={styles.proofShow}>Bekijk de aanpak</span><span aria-hidden="true">↗</span></span>
            </>}>

            <div className={styles.proofBody}>

        <div className={styles.proofStory}>
          <div className={styles.caseCopy}>
            <p className={styles.eyebrow}>IN DE PRAKTIJK · ZELFSTANDIGEN BOUW</p>
            <h3 id="case-title">Van 8–15 naar 30–50 aanvragen per maand.</h3>
            <p>Voor de campagne voor Rechtsbijstand maakten wij een serie van drie video’s en fotocontent. Na een klik op de advertentie kwamen bezoekers op een aansluitende landingspagina, waar ze zich konden aanmelden voor Rechtsbijstand.</p>
            <p>Advertenties, beeld en landingspagina vertelden hetzelfde verhaal. De campagne was gericht op naamsbekendheid én directe aanvragen.</p>
            <div className={styles.caseComparison} aria-label="Aanvragen voor Rechtsbijstand per maand: eerder 8 tot 15, tijdens de campagne 30 tot 50">
              <div><span>Eerder</span><strong>8–15</strong><small>aanvragen per maand</small></div>
              <span className={styles.caseArrow} aria-hidden="true">→</span>
              <div><span>Tijdens de campagne</span><strong>30–50</strong><small>aanvragen per maand</small></div>
            </div>
            <p className={styles.caseContext}><strong>Eerdere campagne: AOV Bouw.</strong> Voor AOV Bouw, de arbeidsongeschiktheidsverzekering voor zzp’ers in de bouw, leverde een eerdere social-advertentiecampagne voor Zelfstandigen Bouw 80–120 klanten per maand op. Deze klanten horen bij de AOV Bouw-campagne en staan los van de 30–50 aanvragen per maand voor Rechtsbijstand.</p>
          </div>
        </div>
        <details className={styles.caseMedia}>
          <summary>Bekijk de drie campagnevideo’s<span aria-hidden="true">+</span></summary>
          <div className={styles.caseVideos}>{caseVideos.map(video => <figure key={video.src}>
            <video controls playsInline preload="none" poster={videoThumbnailFor(video.src)} aria-label={`Campagnevideo Zelfstandigen Bouw: ${video.name}`}>
              <source src={video.src} type="video/mp4" />
              Je browser kan deze video niet afspelen. <a href={video.src}>Open de campagnevideo {video.name}</a>.
            </video>
            <figcaption>Zelfstandigen Bouw · {video.name}</figcaption>
          </figure>)}</div>
        </details>
        <p className={styles.caseFootnote}>De exacte meetperiodes en advertentiebudgetten van deze campagnes zijn niet vermeld.</p>

            </div>
          </CaseCard>
          <CaseCard id="limisan" name="Limisan Pro" preview={<>

              <span className={`${styles.proofImage} ${styles.proofScreenshot}`}><img src="/assets/cases/limisan-website.jpg" alt="Screenshot van de huidige website van Limisan Pro" width="1280" height="800" loading="lazy" /></span>
              <span className={styles.proofName}>Limisan Pro</span>
              <span className={styles.proofType}>Health en e-commerce · pleister- en tapeverwijderaars</span>
              <span className={styles.proofQuestion}>Een extra verkoopkanaal toevoegen</span>
              <span className={styles.proofMetric}>259</span>
              <span className={styles.proofLabel}>afgeronde webshopbestellingen in zes maanden</span>
              <span className={styles.proofMethod}>Webshop + Google Ads + Google Merchant</span>
              <span className={styles.proofToggle}><span className={styles.proofShow}>Bekijk de aanpak</span><span aria-hidden="true">↗</span></span>
            </>}>

            <div className={styles.proofBody}>

        <div className={styles.limisanLayout}>
          <div>
            <p className={styles.eyebrow}>IN DE PRAKTIJK · LIMISAN PRO</p>
            <h3 id="limisan-title">Een extra verkoopkanaal naast een bestaand bedrijf.</h3>
            <p>Limisan Pro verkocht voornamelijk via derde partijen aan de zakelijke markt. Wij bouwden een eigen webshop om ook rechtstreeks aan consumenten te kunnen verkopen.</p>
            <p>Daarbij richtten wij Google Ads-campagnes voor Search en Shopping in. Via Google Merchant maakten wij de producten ook organisch vindbaar. Zo ontstond naast de bestaande verkoop via derden een eigen online verkoopkanaal.</p>
          </div>
          <div className={styles.limisanResult}>
            <span>EIGEN WEBSHOP · ZES MAANDEN</span>
            <strong>259</strong>
            <h3>afgeronde webshopbestellingen</h3>
            <p>1 februari t/m 31 juli 2026</p>
          </div>
        </div>
        <div className={styles.limisanSteps} aria-label="De aanpak voor Limisan Pro">
          <div><span>01</span><h3>Eigen webshop</h3><p>Een plek waar consumenten rechtstreeks kunnen bestellen.</p></div>
          <div><span>02</span><h3>Search en Shopping</h3><p>Zoekadvertenties en productadvertenties voor het nieuwe verkoopkanaal.</p></div>
          <div><span>03</span><h3>Ook organisch zichtbaar</h3><p>Productvermeldingen via Google Merchant naast de betaalde campagnes.</p></div>
        </div>
        <p className={styles.caseFootnote}>Afgeronde bestellingen, geteld op betaaldatum. Het gaat om webshopbestellingen uit alle kanalen samen; ze zijn niet uitsluitend aan advertenties toegeschreven.</p>

            </div>
          </CaseCard>
          <CaseCard id="kozijnrubbers" name="Kozijnrubbers.nl" preview={<>

              <span className={`${styles.proofImage} ${styles.proofScreenshot}`}><img src="/assets/cases/kozijnrubbers-website.jpg" alt="Screenshot van de huidige website van Kozijnrubbers.nl" width="1280" height="800" loading="lazy" /></span>
              <span className={styles.proofName}>Kozijnrubbers.nl</span>
              <span className={styles.proofType}>E-commerce · tochtprofielen voor ramen en deuren</span>
              <span className={styles.proofQuestion}>Meer uit bestaande campagnes halen</span>
              <span className={styles.proofMetric}>+31,8%</span>
              <span className={styles.proofLabel}>Shopping-klikken bij vrijwel gelijke advertentiekosten</span>
              <span className={styles.proofMethod}>Search + Shopping · oktober 2026 versus 2025</span>
              <span className={styles.proofToggle}><span className={styles.proofShow}>Bekijk de aanpak</span><span aria-hidden="true">↗</span></span>
            </>}>

            <div className={styles.proofBody}>

        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>IN DE PRAKTIJK · KOZIJNRUBBERS.NL</p>
          <h3 id="kozijn-title">Meer verkeer uit Shopping.<br />Klant meldt hogere omzet.</h3>
          <p>Voor Kozijnrubbers beheren wij een doorlopende Search-campagne, een tijdelijke Search-campagne en een Shopping-campagne. In het dashboard volgen wij de ontwikkeling per campagne.</p>
        </div>
        <div className={styles.kozijnResults}>
          <div><span>Shopping · klikken</span><strong>+31,8%</strong><p>Meer klikken vanuit de Shopping-campagne.</p></div>
          <div><span>Shopping · kosten per klik</span><strong>−23,9%</strong><p>Lagere gemiddelde kosten per klik.</p></div>
        </div>
        <p className={styles.kozijnPeriod}><strong>Oktober 2026 vergeleken met oktober 2025.</strong> De Shopping-advertentiekosten bleven vrijwel gelijk: +0,3%.</p>
        <div className={styles.kozijnRevenue}>
          <p className={styles.eyebrow}>TERUGKOPPELING VAN DE KLANT</p>
          <h3>Circa 10% meer bedrijfsomzet</h3>
          <p>De klant meldt circa 10% meer bedrijfsomzet in augustus 2026 dan in augustus 2025. Dit betreft de totale bedrijfsomzet; de bijdrage van Shopping is niet afzonderlijk vastgesteld.</p>
        </div>
        <details className={styles.kozijnDetails}>
          <summary>Bekijk de kostenverlaging en Search-resultaten<span aria-hidden="true">+</span></summary>
          <div>
            <h3>De kostenomslag in augustus 2024</h3>
            <p>Van juli naar augustus 2024 daalden de Shopping-advertentiekosten met <strong>49,1%</strong>. Over het hele account bedroeg de daling <strong>39,8%</strong>. Het gaat om werkelijk gemaakte advertentiekosten.</p>
            <h3>Doorlopende Search: meer klikken tegen lagere kosten</h3>
            <p>In juli 2026 lagen de kosten van de doorlopende Search-campagne <strong>24,1% lager</strong> dan in juli 2024, met <strong>35,3% meer klikken</strong>. De gemiddelde kosten per klik daalden met <strong>43,9%</strong>. De tijdelijke Search-campagne, met gegevens vanaf april 2026, is niet opgenomen in deze vergelijking.</p>
          </div>
        </details>

            </div>
          </CaseCard>
          <CaseCard id="cyb-training" name="CYB Training" preview={<>

              <span className={`${styles.proofImage} ${styles.proofScreenshot}`}><img src="/assets/cases/cyb-training-website.jpg" alt="Screenshot van de huidige website van CYB Training" width="1280" height="800" loading="lazy" /></span>
              <span className={styles.proofName}>CYB Training</span>
              <span className={styles.proofType}>Health · studio voor EMS-training en cryotherapie</span>
              <span className={styles.proofQuestion}>Aanvragen ontvangen zonder landingspagina</span>
              <span className={styles.proofMetric}>≈49</span>
              <span className={styles.proofLabel}>leads per maand gemiddeld</span>
              <span className={styles.proofMethod}>Social-advertenties + formulier in het platform</span>
              <span className={styles.proofToggle}><span className={styles.proofShow}>Bekijk de aanpak</span><span aria-hidden="true">↗</span></span>
            </>}>

            <div className={styles.proofBody}>

        <div className={styles.limisanLayout}>
          <div>
            <p className={styles.eyebrow}>IN DE PRAKTIJK · CYB TRAINING</p>
            <h3 id="cyb-title">Aanvragen ontvangen zonder landingspagina.</h3>
            <p>De bestaande website van CYB Training was verouderd en gaf geen representatief beeld van het bedrijf. Daarom stuurden wij bezoekers vanuit de social-advertenties niet naar een landingspagina.</p>
            <p>Geïnteresseerden lieten hun gegevens direct achter in een formulier binnen het advertentieplatform. CYB Training nam vervolgens persoonlijk contact op om de interesse te bespreken en een intake te plannen.</p>
          </div>
          <div className={styles.limisanResult}>
            <span>DOORLOPENDE SOCIALCAMPAGNE</span>
            <strong>≈49</strong>
            <h3>leads per maand gemiddeld</h3>
            <p>Via het formulier binnen het advertentieplatform</p>
          </div>
        </div>
        <div className={styles.limisanSteps} aria-label="De aanpak voor CYB Training">
          <div><span>01</span><h3>Social-advertentie</h3><p>Interesse wekken voor het aanbod van CYB Training.</p></div>
          <div><span>02</span><h3>Formulier in het platform</h3><p>Contactgegevens achterlaten zonder een externe landingspagina te bezoeken.</p></div>
          <div><span>03</span><h3>Persoonlijke opvolging</h3><p>Contact opnemen met geïnteresseerden en bespreken of een intake past.</p></div>
        </div>
        <p className={styles.caseFootnote}>Het beeld toont de huidige website, niet de website tijdens de campagne. Gemiddelde op basis van twee besproken maandtotalen, afgerond naar circa 49 leads per maand. Dit zijn aanvragen, geen aantallen gevoerde intakes of nieuwe klanten. Andere campagnes zijn niet meegerekend.</p>

            </div>
          </CaseCard>
        </div>
        <div className={styles.caseAction}><h3>Wat past bij jouw bedrijf?</h3><p>Laat je advertenties en de route naar een aanvraag beoordelen in de gratis Klantwinst-check.</p><Action /></div>
      </section>

      <section className={styles.process} id="werkwijze" aria-labelledby="process-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>ZO WERKT HET</p><h2 id="process-title">Van aanvraag naar<br />een helder advies.</h2></div>
        <ol className={styles.processList}>
          <li><span>01</span><div><h3>Vertel waar je op wilt focussen</h3><p>Deel je website, het product of de dienst en het doel. Meer hebben wij voor de eerste stap niet nodig.</p></div></li>
          <li><span>02</span><div><h3>Wij bereiden je analyse voor</h3><p>Je krijgt binnen twee werkdagen een persoonlijke reactie; wij streven naar één werkdag. Wij plannen het gesprek en regelen eventuele aanvullende informatie.</p></div></li>
          <li><span>03</span><div><h3>Wij bespreken de bevindingen</h3><p>In maximaal twintig minuten bespreken wij de belangrijkste knelpunten en welke verbeteringen prioriteit hebben. Zo weet je waar je als eerste mee aan de slag kunt.</p></div></li>
        </ol>
      </section>

      <section className={styles.contact} id="klantwinst-check" aria-labelledby="contact-title">
        <div className={styles.contactCopy}><p className={styles.eyebrow}>JOUW VOLGENDE STAP</p><h2 id="contact-title">Vraag jouw gratis analyse aan.</h2><p>Deel je website, aanbod en doel. Jimmy bereidt de analyse voor en bespreekt met je waar je klantwerving beter kan.</p><ul><li>Een gesprek van maximaal 20 minuten.</li><li>Persoonlijke reactie binnen 2 werkdagen.</li><li>Geen verplichting tot betaald beheer.</li></ul><div className={styles.person}><img src="/assets/jimmy-buitenhuis.png" alt="Jimmy Buitenhuis" width="96" height="96" loading="lazy" /><div><strong>Jimmy Buitenhuis</strong><span>Slimmer dan Gisteren</span></div></div></div>
        <KlantwinstForm />
      </section>
      <section className={styles.section} aria-labelledby="faq-title"><div className={styles.faqLayout}><div><p className={styles.eyebrow}>GOED OM TE WETEN</p><h2 id="faq-title">Nog een vraag?</h2></div><div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className={styles.followup} id="kosten" aria-labelledby="followup-title">
        <p className={styles.eyebrow}>ALLEEN ALS JE DAARNA HULP WILT</p>
        <h2 id="followup-title">De check is gratis. Uitvoering is optioneel.</h2>
        <p>De inzichten kun je zelf gebruiken. Wil je de uitvoering uit handen geven? Dan bespreken wij dat na de analyse. Beheer kost €200 per maand, met €200 eenmalige inrichting, exclusief btw en advertentiebudget. Een betaalde samenwerking start pas na jouw akkoord.</p>
        <details><summary>Wat houdt een eventueel vervolg in?<span aria-hidden="true">+</span></summary><div>
          <p>Ontbrekende advertenties, een landingspagina, leadmagnet, formulieren en metingen maken en richten wij in binnen de €200 eenmalige inrichting. Wat niet goed werkt, verbeteren wij. Dit geldt voor één centraal aanbod en één advertentiekanaal.</p>
          <p>Het beheer omvat wekelijkse optimalisatie, de afgesproken organische content, een dashboard en maandelijks overleg. Aantallen uitingen en publicaties leggen wij vooraf vast.</p>
          <p>Inrichting betaal je uiterlijk twee weken vóór de start. Het beheer start zodra de campagne live gaat en wordt maandelijks achteraf gefactureerd. Minimaal één maand afname; daarna maandelijks opzegbaar met één maand opzegtermijn. Drie maanden afnemen is ons advies, geen verplichting.</p>
          <p><strong>Advertentiebudget is niet inbegrepen.</strong> Dat betaal je rechtstreeks aan het advertentieplatform. Je hoeft voor de gratis check nog geen budget vast te leggen.</p>
        </div></details>
      </section>
    </main>
    <footer className={styles.footer}><div><a className={styles.brand} href="/"><img src="/assets/logo.png" alt="" width="40" height="40" /><span>Slimmer dan<br />Gisteren.</span></a><p>Meer geschikte klanten.<br />Het beheer uit handen.</p></div><div><a href="mailto:jimmy@slimmerdangisteren.nl">jimmy@slimmerdangisteren.nl</a><a href="tel:+31610175027">+31 6 10175027</a></div><nav aria-label="Juridische informatie"><a href="/privacy/">Privacyverklaring</a><a href="/algemene-voorwaarden/">Algemene voorwaarden</a></nav></footer>
  </div>;
}
