export type GrowthPageData = {
  slug: "/seo/" | "/geo/" | "/google-ads/" | "/social-ads/";
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  visual: {
    label: string;
    title: string;
    rows: Array<{ label: string; value: string }>;
  };
  intro?: {
    title: string;
    body: string;
    points: string[];
  };
  deepDive?: {
    title: string;
    intro: string;
    blocks: Array<{ title: string; body: string }>;
    related?: Array<{ label: string; href: string; text: string }>;
  };
  regional?: {
    title: string;
    intro: string;
    blocks: Array<{ title: string; body: string }>;
  };
  topicalAuthority?: {
    title: string;
    intro: string;
    clusters: Array<{ title: string; body: string; items: string[] }>;
  };
  trust: {
    line: string;
    badges: string[];
  };
  servicesTitle: string;
  servicesIntro: string;
  services: Array<{ title: string; body: string; deliverable?: string }>;
  processTitle: string;
  process: Array<{ title: string; body: string }>;
  resultTitle: string;
  resultText: string;
  stats: Array<{ value: string; label: string }>;
  comparison?: {
    title: string;
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
    footer: string;
  };
  benefitsTitle: string;
  benefits: string[];
  reviews: Array<{ quote: string; name: string; company: string }>;
  faq: Array<{ question: string; answer: string }>;
  form: {
    title: string;
    text: string;
    submit: string;
    fields: string[];
  };
};

export const seoPage: GrowthPageData = {
  slug: "/seo/",
  eyebrow: "SEO marketingbureau",
  title: "SEO marketingbureau voor betere vindbaarheid",
  subtitle:
    "Zoek je een SEO bureau dat onderzoek én uitvoering oppakt? Bij Slimmer dan Gisteren werk je rechtstreeks met Jimmy Buitenhuis aan techniek, zoekwoorden en content. Begin met een gratis SEO check of bespreek een SEO-traject. Vanuit Diemen helpen we bedrijven in heel Nederland, online of bij jou op locatie.",
  primaryCta: "Vraag een gratis SEO-scan aan",
  secondaryCta: "Bekijk onze aanpak",
  metadata: {
    title: "SEO bureau & gratis SEO check",
    description:
      "SEO marketingbureau voor bedrijven in heel Nederland. Vraag een gratis SEO check aan en bespreek met Jimmy de kansen voor techniek, content en aanvragen.",
    keywords: ["SEO marketingbureau", "SEO bureau", "SEO scan", "SEO uitbesteden", "zoekmachine optimalisatie", "online vindbaarheid", "lokale SEO", "technische SEO", "SEO content", "SEO strategie"],
  },
  visual: {
    label: "SEO-aanpak",
    title: "Organische groei",
    rows: [],
  },
  intro: {
    title: "Wat doet een SEO marketingbureau?",
    body:
      "Een goed SEO marketingbureau kijkt verder dan losse zoekwoorden of rankings. We onderzoeken hoe jouw doelgroep zoekt, welke pagina's belangrijk zijn, welke technische drempels groei tegenhouden en hoe jouw website meer vertrouwen kan opbouwen bij Google en bezoekers.",
    points: ["Technische basis op orde", "Content die aansluit op zoekintentie", "Autoriteit en interne structuur versterken"],
  },
  deepDive: {
    title: "Wanneer heb je een SEO marketingbureau nodig?",
    intro:
      "SEO wordt interessant wanneer je weet dat klanten zoeken, maar je website nog niet logisch genoeg is opgebouwd om die zoekvraag te winnen. Dan draait het om diagnose: waar lekt vindbaarheid, vertrouwen of conversie weg?",
    blocks: [
      {
        title: "Je wordt niet gevonden op zoekwoorden met koopintentie",
        body:
          "We onderzoeken welke zoekopdrachten commercieel belangrijk zijn, welke pagina's daarvoor nodig zijn en waarom concurrenten nu boven je staan.",
      },
      {
        title: "Je website heeft content, maar mist structuur",
        body:
          "Veel websites hebben losse teksten. SEO vraagt om duidelijke dienstpagina's, interne links, FAQ's, lokale signalen en contentclusters die Google en bezoekers begrijpen.",
      },
      {
        title: "Je wilt weten wat prioriteit heeft",
        body:
          "De grootste winst zit vaak niet in meer werk, maar in de juiste volgorde: eerst techniek en indexering, dan pagina's met zoekintentie, daarna autoriteit en doorlopende verbetering.",
      },
      {
        title: "Je wilt meer aanvragen, niet alleen meer verkeer",
        body:
          "Daarom kijken we ook naar aanbod, bewijs, CTA's en formulieren. SEO-verkeer moet landen op pagina's die logisch aanvoelen en uitnodigen tot contact.",
      },
    ],
    related: [
      { label: "Google Ads", href: "/google-ads/", text: "Gebruik advertentiedata om sneller te leren welke zoekwoorden converteren." },
      { label: "GEO", href: "/geo/", text: "Maak je expertise ook beter begrijpelijk voor AI-antwoorden en AI-zoekmachines." },
      { label: "Social Ads", href: "/social-ads/", text: "Gebruik social campagnes om bewezen zoekinzichten breder te activeren." },
    ],
  },
  regional: {
    title: "Vanuit Diemen, SEO voor bedrijven in heel Nederland",
    intro: "Je werkt bij Slimmer dan Gisteren rechtstreeks met Jimmy Buitenhuis aan strategie en uitvoering. We zijn gevestigd in Diemen, vlak bij Amsterdam, en helpen bedrijven in heel Nederland. We werken online of komen op afspraak bij jou langs. Jouw doelgroep bepaalt de SEO-aanpak: lokaal, regionaal of landelijk.",
    blocks: [
      {
        title: "Een zoekstrategie die past bij je werkgebied",
        body: "Een dienstverlener die klanten in Amsterdam bezoekt, heeft een andere zoekstrategie nodig dan een webshop die landelijk levert. We onderzoeken zoekopdrachten met en zonder plaatsnaam en koppelen die aan je aanbod. Alleen diensten en gebieden waar je werkelijk actief bent krijgen een plek in het plan.",
      },
      {
        title: "Lokale concurrentie en inhoudelijke verschillen",
        body: "We vergelijken de pagina’s die op jouw relevante zoektermen worden gevonden: welke diensten beschrijven ze, welke vragen beantwoorden ze en welk bewijs laten ze zien? Op basis daarvan verbeteren we je bestaande pagina’s met concrete uitleg over je werkwijze, dienstverlening en bereikbaarheid.",
      },
      {
        title: "Je website en Google Bedrijfsprofiel",
        body: "Voor bedrijven die daarvoor in aanmerking komen, hoort een correct Google Bedrijfsprofiel bij de lokale aanpak. Bedrijfsnaam, categorie, diensten en contactgegevens moeten aansluiten op de werkelijkheid en je website. De organische zoekresultaten en de kaartresultaten meten we afzonderlijk; een werkgebied vermelden is geen garantie op een positie in Google Maps.",
      },
      {
        title: "Van zichtbaarheid naar relevante aanvragen",
        body: "We starten met een nulmeting van je belangrijkste pagina’s en zoekvragen. Search Console laat organische vertoningen, klikken en gemiddelde posities zien. Voor een specifieke positie in Amsterdam is daarnaast een meting met een vaste zoeklocatie en apparaat nodig. Waar conversiemeting beschikbaar is, kijken we ook welke aanvragen uit organisch verkeer komen.",
      },
    ],
  },
  topicalAuthority: {
    title: "SEO marketing: van zoekvraag naar aanvraag",
    intro:
      "SEO staat voor zoekmachineoptimalisatie. Met SEO marketing verbeter je de onbetaalde vindbaarheid van je website, zodat potentiële klanten je vinden wanneer ze zoeken naar jouw diensten. Daarvoor verbinden we vier onderdelen: techniek, relevante content, autoriteit en conversie.",
    clusters: [
      {
        title: "1. Vindbaar fundament",
        body:
          "We controleren of Google je belangrijke pagina’s kan crawlen en indexeren. Daarbij bekijken we onder meer laadsnelheid, mobiel gebruik, omleidingen en canonieke URL’s. Je krijgt inzicht in technische blokkades en welke oplossingen eerst nodig zijn.",
        items: ["Indexeerbaarheid", "Laadsnelheid", "Mobiel gebruik", "Technische fouten"],
      },
      {
        title: "2. Pagina's met zoekintentie",
        body:
          "Zoekwoordenonderzoek koppelt de taal van jouw klanten aan de juiste pagina. We verbeteren bestaande dienstpagina’s op inhoud, titel en zoekintentie. Nieuwe content voegen we toe waar een relevante klantvraag nog niet wordt beantwoord.",
        items: ["Zoekwoordenonderzoek", "Zoekintentie", "Lokale SEO", "Dienstpagina's"],
      },
      {
        title: "3. Autoriteit en bewijs",
        body:
          "We maken expertise zichtbaar met heldere uitleg, controleerbare bedrijfsinformatie en beschikbare klantcases. Interne links verbinden relevante pagina’s; passende externe vermeldingen helpen bezoekers jouw bedrijf te ontdekken en beoordelen.",
        items: ["Interne links", "Reviews", "Expertise", "Relevante vermeldingen"],
      },
      {
        title: "4. Conversie naar aanvraag",
        body:
          "Vindbaarheid is pas waardevol als de juiste bezoeker verder komt. We verbeteren aanbod, contactknoppen en formulieren. Vervolgens vergelijken we organische klikken en aanvragen, zodat duidelijk wordt welke pagina’s bijdragen en waar bezoekers afhaken.",
        items: ["Heldere CTA's", "Korte route", "Gratis scan", "Leadkwaliteit"],
      },
    ],
  },
  trust: {
    line: "Geen losse SEO-checklist, maar een concreet groeiplan voor betere vindbaarheid en meer aanvragen.",
    badges: ["Gratis scan", "Geen verplichting", "Duidelijke prioriteiten", "Persoonlijk advies"],
  },
  servicesTitle: "Wat doet ons SEO marketingbureau voor jouw website?",
  servicesIntro: "Van onderzoek tot uitvoering: dit zijn de onderdelen waaruit we je SEO-traject samenstellen. We spreken vooraf af welke werkzaamheden bij jouw website passen. Je hoeft dus niet elk onderdeel tegelijk af te nemen.",
  services: [
    { title: "Technische SEO", body: "We controleren indexering, snelheid, crawlbaarheid, mobiele bruikbaarheid, redirects, canonieke URL’s en technische fouten die groei kunnen remmen.", deliverable: "Een geprioriteerde lijst met betrokken URL’s, de benodigde correcties en controle na de afgesproken uitvoering." },
    { title: "Zoekwoordenonderzoek", body: "We bepalen hoe jouw klanten zoeken en onderscheiden informatie zoeken, aanbieders vergelijken en contact opnemen. Je doelgroep kan lokaal of landelijk zijn.", deliverable: "Een zoekwoordenplan per pagina: hoofdonderwerp, zoekintentie en de bestaande of nieuwe pagina die daarop aansluit." },
    { title: "Concurrentieanalyse", body: "We vergelijken het aanbod, de uitleg, interne links en het zichtbare bewijs van pagina’s die op jouw relevante zoekopdrachten worden gevonden.", deliverable: "Een overzicht van inhoudelijke hiaten en kansen voor je eigen pagina’s, met prioriteit en onderbouwing." },
    { title: "SEO-content", body: "We verbeteren bestaande pagina’s en maken waar nodig nieuwe landingspagina’s. Jouw vakkennis vormt de basis voor uitleg die klanten helpt kiezen.", deliverable: "Afgesproken paginaverbeteringen: titel, koppen, inhoud, interne links en een passende route naar contact." },
    { title: "Websitestructuur & interne links", body: "We verbinden diensten en ondersteunende uitleg, zodat bezoekers en Google de samenhang tussen je pagina’s kunnen volgen.", deliverable: "Een overzicht van pagina’s en linkverbindingen, gevolgd door de afgesproken aanpassingen aan navigatie en contextuele links." },
    { title: "Autoriteit & relevante vermeldingen", body: "We onderbouwen je expertise met vakinhoud, controleerbare bedrijfsinformatie, echte reviews en beschikbare klantcases. We onderzoeken passende externe vermeldingen; een plaatsing bij een andere website is afhankelijk van die partij.", deliverable: "Een onderbouwde kansenlijst voor bewijs en vermeldingen. Publicaties, eventuele kosten en uitvoering spreken we apart af; we beloven geen vast aantal backlinks." },
    { title: "Conversie naar aanvraag", body: "We verbeteren aanbod, contactknoppen en formulieren. Waar conversiemeting is ingericht, vergelijken we organische klikken, aanvragen en leadkwaliteit om te bepalen waar bezoekers afhaken.", deliverable: "Afgesproken verbeteringen aan aanbod en contactroute, met meetpunten voor aanvragen waar conversiemeting beschikbaar is." },
  ],
  processTitle: "Ons SEO-proces",
  process: [
    { title: "Diagnose", body: "We bespreken je diensten, doelgroep en gewenste aanvragen. Daarna bekijken we techniek, indexering, bestaande content en de websites die op jouw relevante zoektermen worden gevonden." },
    { title: "Prioriteitenplan", body: "Je krijgt een prioriteitenplan met zoektermen per pagina, technische verbeteringen en contentkansen. We spreken af welke acties we uitvoeren, wat je zelf oppakt en hoe we voortgang beoordelen." },
    { title: "Uitvoering", body: "We verbeteren techniek, pagina's, interne links, lokale SEO en content zonder onnodige ruis of losse SEO-taken." },
    { title: "Meten en verbeteren", body: "Met Google Search Console volgen we vertoningen, klikken en zoekopdrachten per pagina. Waar conversiemeting is ingericht, nemen we ook aanvragen en leadkwaliteit mee. Je ziet welke verbeteringen zijn uitgevoerd en welke vervolgstappen logisch zijn." },
  ],
  resultTitle: "SEO die verder kijkt dan rankings",
  resultText:
    "Een hoge positie in Google is waardevol, maar alleen als de juiste bezoekers doorklikken en contact opnemen. Daarom optimaliseren we niet alleen voor rankings, maar ook voor zoekintentie, conversie en commerciële waarde.",
  stats: [],
  benefitsTitle: "Waarom Slimmer dan Gisteren als SEO marketingbureau?",
  benefits: [
    "Duidelijk resultaat: beter vindbaar op zoekvragen die klanten kunnen opleveren",
    "Meer zekerheid: techniek, concurrentie en zoekintentie worden eerst onderzocht",
    "Persoonlijk contact: we bespreken je doelen en eerste SEO-prioriteiten",
    "Minder frictie: je krijgt geen lange checklist, maar een uitvoerbare volgorde",
    "Sterkere pagina's: content, bewijs en CTA's worden samen bekeken",
    "Geen nepgaranties: wel eerlijk advies over kansen, moeite en volgorde",
  ],
  reviews: [],
  faq: [
    { question: "Werken jullie alleen voor bedrijven rond Amsterdam?", answer: "Nee. We zijn gevestigd in Diemen, vlak bij Amsterdam, maar werken voor bedrijven in heel Nederland. Je werkt rechtstreeks met Jimmy Buitenhuis, online of op afspraak bij jou op locatie. Of je klanten lokaal, regionaal of landelijk wilt bereiken, bepaalt het zoekwoordenonderzoek en de aanpak." },
    { question: "Kunnen jullie een top-3-positie in Google garanderen?", answer: "Nee. Google bepaalt de zoekresultaten en de volgorde kan verschillen per zoeklocatie, apparaat en moment. We kunnen de relevantie, techniek, inhoud en interne structuur van je website verbeteren. Voor lokale kaartresultaten spelen ook afstand en de bekendheid van je bedrijf mee. Daarom spreken we concrete werkzaamheden af en meten we de ontwikkeling, zonder een vaste positie te beloven." },
    { question: "Wat is SEO marketing?", answer: "SEO marketing is het verbeteren van je website om relevante bezoekers uit de onbetaalde zoekresultaten te bereiken. SEO staat voor zoekmachineoptimalisatie. Je werkt aan techniek, inhoud, websitestructuur en autoriteit. Je betaalt niet per organische klik, maar investeert wel in onderzoek, uitvoering en onderhoud. Het doel is vindbaarheid op zoekvragen die passen bij je aanbod en kunnen leiden tot klanten." },
    { question: "Wat krijg ik als ik SEO uitbesteed aan Slimmer dan Gisteren?", answer: "We beginnen met een analyse van je website, doelgroep en zoekvraag. Daaruit volgt een plan met prioriteiten voor techniek, bestaande pagina’s, content en interne links. Voor de uitvoering spreken we de werkzaamheden en taakverdeling af. Daarna volgen we zichtbaarheid, organische klikken en, waar meetbaar, aanvragen. De gratis SEO-scan is een eerste kennismaking; de omvang en kosten van een vervolgtraject bepalen we op basis van wat jouw website nodig heeft." },
    { question: "Wat doet een SEO marketingbureau?", answer: "Een SEO marketingbureau helpt je website beter vindbaar worden op zoekopdrachten die relevant zijn voor jouw bedrijf. Dat gaat verder dan alleen zoekwoorden toevoegen. We kijken naar technische SEO, websitestructuur, content, autoriteit, lokale vindbaarheid en conversie. Het doel is dat de juiste mensen je vinden, begrijpen waarom jij relevant bent en makkelijker contact opnemen." },
    { question: "Waarom kiezen voor een compacte SEO-aanpak?", answer: "Veel SEO-trajecten worden onnodig groot gemaakt, waardoor je vooral rapporten, lijstjes en losse taken krijgt. Een compacte SEO-aanpak begint met de vraag wat nu de grootste bottleneck is: techniek, content, autoriteit, zoekintentie of conversie. Daardoor ontstaat er een duidelijke volgorde en weet je welke verbeteringen als eerste aandacht verdienen." },
    { question: "Hoe kies je een goed SEO marketingbureau?", answer: "Een goed SEO marketingbureau praat niet alleen over rankings, maar ook over zoekintentie, concurrentie, techniek, contentkwaliteit en aanvragen. Je moet kunnen begrijpen waarom bepaalde pagina's prioriteit krijgen, welke zoekwoorden commerciële waarde hebben en hoe succes wordt gemeten. Transparantie, realistische verwachtingen en duidelijke uitleg zijn daarbij belangrijker dan grote beloftes." },
    { question: "Wat kost een SEO marketingbureau?", answer: "De kosten hangen af van je markt, concurrentie, websitegrootte, technische staat en hoeveel content of optimalisatie nodig is. Een lokale dienstverlener heeft vaak een ander traject nodig dan een landelijke speler of webshop. Daarom starten we liever met een scan: eerst bepalen wat nodig is, daarna pas adviseren over de juiste omvang van het traject." },
    { question: "Wanneer is SEO uitbesteden interessant?", answer: "SEO uitbesteden is interessant wanneer je structureel meer aanvragen uit Google wilt halen, maar intern te weinig tijd, kennis of focus hebt om dit goed te doen. Vooral technische SEO, zoekwoordenonderzoek, contentstrategie, concurrentieanalyse en maandelijkse optimalisatie vragen ervaring. Uitbesteden werkt het best wanneer je wel input kunt geven over je aanbod, doelgroep en klanten." },
    { question: "Wat is het verschil tussen een SEO bureau en een SEO marketingbureau?", answer: "SEO bureau en SEO marketingbureau worden meestal voor dezelfde dienstverlening gebruikt. De naam zegt niet welke werkzaamheden inbegrepen zijn. Vergelijk daarom de aanpak, expertise, afgesproken uitvoering en rapportage. Bij ons bespreek je rechtstreeks met Jimmy hoe techniek, content en interne links kunnen bijdragen aan relevante bezoekers en aanvragen." },
    { question: "Wat controleren jullie bij een SEO check?", answer: "We bekijken de publiek toegankelijke website op technische bereikbaarheid, titels en koppen, inhoud, interne links, mobiel gebruik en de route naar contact. Samen bepalen we welke pagina’s en zoekvragen belangrijk zijn. Voor gegevens over klikken, vertoningen en indexering is toegang tot jouw Google Search Console nodig. De gratis check is een eerste beoordeling; een volledige audit en het oplossen van gevonden problemen vallen onder apart afgesproken vervolgwerk." },
    { question: "Kan ik zelf een SEO check voor Google doen?", answer: "Ja. Google Search Console laat zien op welke zoekvragen je website verschijnt en of pagina’s zijn geïndexeerd. PageSpeed Insights helpt bij het onderzoeken van snelheid en gebruikservaring. Controleer daarnaast of je belangrijkste pagina duidelijk uitlegt wat je aanbiedt en logisch bereikbaar is via interne links. Een goede technische score is geen garantie op hoge posities. Onze SEO check verbindt deze signalen met je doelgroep en aanbod; het is geen officiële beoordeling van Google." },
    { question: "Wat is technische SEO?", answer: "Technische SEO gaat over de vraag of Google je website goed kan crawlen, begrijpen en indexeren. Denk aan snelheid, mobiele bruikbaarheid, redirects, foutpagina's, canonicals, sitemap, structured data, indexeerbaarheid en duplicate content. Als de technische basis niet klopt, kan goede content alsnog minder goed presteren." },
    { question: "Waarom is zoekwoordenonderzoek belangrijk?", answer: "Zoekwoordenonderzoek laat zien hoe potentiële klanten zoeken, welke termen commerciële waarde hebben en welke informatie ze verwachten. Zonder goed zoekwoordenonderzoek maak je snel pagina's voor termen met weinig intentie of mis je juist zoekopdrachten waarop mensen klaar zijn om contact op te nemen. Het onderzoek bepaalt dus mede je paginastructuur en contentplanning." },
    { question: "Wat is zoekintentie?", answer: "Zoekintentie is de reden achter een zoekopdracht. Iemand die zoekt naar 'wat is SEO' wil waarschijnlijk uitleg, terwijl iemand die zoekt naar 'SEO marketingbureau' eerder een partij zoekt om mee te praten. Een goede SEO-pagina sluit aan op die intentie met de juiste inhoud, diepgang, voorbeelden, CTA's en vervolgstap." },
    { question: "Heb ik nieuwe SEO-content nodig?", answer: "Niet altijd. Soms is het slimmer om bestaande pagina's te verbeteren voordat je nieuwe content maakt. We kijken eerst welke pagina's al waarde hebben, welke zoekintentie ze bedienen en waar inhoud ontbreekt. Nieuwe SEO-content is vooral nuttig wanneer belangrijke diensten, regio's, klantvragen of vergelijkingen nog geen sterke pagina hebben." },
    { question: "Wat is een SEO-landingspagina?", answer: "Een SEO-landingspagina is een pagina die gericht is op een specifieke zoekvraag, dienst, regio of doelgroep. Zo'n pagina moet inhoudelijk relevant zijn voor Google, maar ook duidelijk genoeg voor bezoekers. De pagina moet antwoord geven, vertrouwen opbouwen en mensen logisch begeleiden naar een aanvraag, telefoontje of kennismaking." },
    { question: "Is linkbuilding nog belangrijk voor SEO?", answer: "Autoriteit blijft belangrijk, maar linkbuilding moet zorgvuldig gebeuren. Een paar relevante vermeldingen of kwalitatieve backlinks zijn waardevoller dan veel willekeurige links. We onderscheiden interne links van externe vermeldingen. Voor externe autoriteit zoeken we relevante vakpublicaties en samenwerkingen die ook waarde hebben voor lezers. We kopen geen links om rankings te manipuleren en gebruiken geen geautomatiseerde linkpakketten. Bij betaalde reclame of sponsoring hoort een passende linkmarkering, zoals sponsored of nofollow." },
    { question: "Wat is lokale SEO?", answer: "Lokale SEO helpt bedrijven beter vindbaar worden in een specifieke regio. Dat kan via lokale zoekwoorden, Google Bedrijfsprofiel, locatiepagina's, reviews, consistente bedrijfsgegevens en lokale vermeldingen. Voor dienstverleners kan lokale SEO heel waardevol zijn, omdat zoekers vaak een partij in de buurt of regio willen spreken." },
    { question: "Hoe snel zie je SEO-resultaat?", answer: "SEO heeft tijd nodig, maar niet alle voortgang duurt even lang. Technische verbeteringen en indexatieproblemen kunnen soms relatief snel zichtbaar worden. Posities, organisch verkeer en aanvragen bouwen meestal geleidelijk op, zeker in concurrerende markten. Daarom kijken we naar tussenstappen: technische gezondheid, indexering, betere pagina's, groeiende zichtbaarheid en uiteindelijk aanvragen." },
    { question: "Waarom duurt SEO vaak langer dan Google Ads?", answer: "Google Ads koopt direct zichtbaarheid zolang je betaalt. SEO bouwt organische vindbaarheid op door techniek, content, autoriteit en relevantie te verbeteren. Google moet je website opnieuw crawlen, begrijpen en vergelijken met concurrenten. Dat maakt SEO minder direct, maar het kan op termijn duurzamer worden omdat je niet per klik betaalt." },
    { question: "Kunnen jullie bestaande SEO verbeteren?", answer: "Ja. Vaak zit de meeste winst juist in bestaande pagina's. We kunnen titels, headings, interne links, zoekintentie, contentdiepte, CTA's, bewijs, structured data en technische onderdelen aanscherpen. Daardoor hoeft er niet altijd veel nieuwe content bij; soms moet de bestaande content vooral scherper, duidelijker en beter gestructureerd worden." },
    { question: "Hoe meten jullie SEO-resultaat?", answer: "We kijken naar meerdere signalen: posities, organisch verkeer, vertoningen, klikken, indexering, belangrijkste pagina's, conversies, aanvragen en leadkwaliteit. Rankings zijn nuttig, maar niet het hele verhaal. Een stijging op een zoekwoord zonder commerciële waarde is minder interessant dan een kleinere stijging die betere aanvragen oplevert." },
    { question: "Krijg ik rapportages?", answer: "Ja, maar rapportage moet begrijpelijk blijven. Je wilt niet verdrinken in grafieken. Een goede SEO-rapportage laat zien wat er is gedaan, waarom dat prioriteit had, welke ontwikkeling zichtbaar is en welke actie daarna logisch is. We leggen dus niet alleen cijfers uit, maar vertalen ze naar keuzes." },
    { question: "Wat hebben jullie van mij nodig?", answer: "Voor een goede start hebben we je website, belangrijkste diensten, doelgroep, regio of markt, eventuele eerdere SEO-data en toegang tot relevante tools nodig, zoals Google Search Console, Google Analytics of je CMS. Daarnaast helpt het als je duidelijk kunt aangeven welke aanvragen waardevol zijn en welke klanten je het liefst aantrekt." },
    { question: "Moet mijn website aangepast worden voor SEO?", answer: "Vaak wel. SEO is niet alleen tekst schrijven. Soms zijn technische verbeteringen, betere navigatie, snellere pagina's, nieuwe dienstpagina's, interne links, structured data of duidelijkere CTA's nodig. We proberen aanpassingen logisch te prioriteren, zodat je niet alles tegelijk hoeft te veranderen." },
    { question: "Is SEO geschikt voor B2B-bedrijven?", answer: "Ja, vooral wanneer potentiële klanten online oriënteren, vergelijken of zoeken naar specialistische kennis. Bij B2B ligt de nadruk vaak op vertrouwen, expertise, duidelijke dienstpagina's, cases, inhoudelijke uitleg en zoekvragen die vroeg in de klantreis ontstaan. SEO helpt dan om eerder in beeld te komen." },
    { question: "Werkt SEO ook voor webshops?", answer: "Ja, maar e-commerce SEO vraagt een eigen aanpak. Dan kijken we naar categoriepagina's, productpagina's, filters, interne links, duplicate content, structured data, productinformatie, laadsnelheid en commerciële zoekwoorden. Voor webshops is de balans tussen techniek, assortiment en content extra belangrijk." },
    { question: "Kunnen jullie SEO doen voor WordPress-websites?", answer: "Ja. WordPress is vaak goed te optimaliseren, mits thema, plugins, hosting en structuur goed zijn ingericht. We kijken onder andere naar snelheid, indexering, headings, metadata, interne links, schema markup, plugin-instellingen en contentopbouw. Ook bij WordPress geldt: minder plugins en meer structuur is vaak beter." },
    { question: "Wat gebeurt er bij een website-migratie?", answer: "Bij een migratie is SEO extra kwetsbaar. URL's, redirects, metadata, interne links, content en indexeerbaarheid moeten goed worden gecontroleerd. Zonder migratieplan kun je posities en verkeer verliezen. Daarom maken we vooraf een redirect- en controleplan en checken we na livegang of Google de nieuwe situatie goed oppakt." },
    { question: "Helpen blogs nog voor SEO?", answer: "Blogs kunnen helpen, maar alleen als ze aansluiten op echte zoekvragen en een rol hebben binnen je websitestructuur. Losse blogs zonder interne links of commerciële aansluiting leveren vaak weinig op. Sterke blogs beantwoorden vragen, bouwen expertise op en verwijzen logisch door naar relevante dienst- of landingspagina's." },
    { question: "Wat is topical authority?", answer: "Topical authority betekent dat je website inhoudelijk sterk wordt rond een bepaald onderwerp. In plaats van één losse pagina over SEO maak je bijvoorbeeld ook ondersteunende pagina's over technische SEO, lokale SEO, SEO-content, zoekwoordenonderzoek en veelgestelde vragen. Zo begrijpt Google beter waar je expertise ligt." },
    { question: "Wat is structured data en is dat nodig?", answer: "Structured data is extra code waarmee je zoekmachines helpt begrijpen wat er op een pagina staat, bijvoorbeeld een organisatie, dienst, FAQ, review of product. Het is geen magische rankingfactor, maar kan wel bijdragen aan duidelijkheid, betere interpretatie en soms rijkere zoekresultaten." },
    { question: "Wat is het verschil tussen SEO en SEA?", answer: "SEO gaat over organische vindbaarheid in Google. SEA, zoals Google Ads, gaat over betaalde advertenties. SEO bouwt aan duurzame zichtbaarheid; SEA geeft sneller verkeer zolang er budget beschikbaar is. De beste strategie gebruikt vaak beide: Ads voor snelheid en data, SEO voor structurele vindbaarheid." },
    { question: "Kunnen jullie SEO combineren met Google Ads of GEO?", answer: "Ja. Google Ads kan helpen om sneller te leren welke zoekwoorden converteren. Die inzichten kun je gebruiken voor SEO-prioriteiten. GEO sluit aan op dezelfde basis: duidelijke content, expertise, structuur, autoriteit en betrouwbare informatie die ook AI-systemen beter kunnen begrijpen." },
    { question: "Wat is het verschil tussen SEO en GEO?", answer: "SEO richt zich op vindbaarheid in zoekresultaten zoals Google. GEO richt zich op zichtbaarheid in AI-antwoorden van systemen zoals ChatGPT, Gemini, Perplexity en Google AI Overviews. De basis overlapt: duidelijke content, autoriteit, structuur, expertise en betrouwbare bronnen." },
    { question: "Heeft AI invloed op SEO?", answer: "Ja. AI verandert hoe mensen zoeken en hoe informatie wordt samengevat. Toch blijft een sterke SEO-basis belangrijk: duidelijke pagina's, betrouwbare informatie, autoriteit en technische structuur helpen zowel zoekmachines als AI-systemen om je bedrijf beter te begrijpen. SEO en GEO groeien daardoor steeds meer naar elkaar toe." },
    { question: "Moet mijn website na iedere Google-update worden aangepast?", answer: "Nee. We bekijken eerst of er een blijvende verandering is op belangrijke pagina’s en zoekvragen. Bij een core-update wachten we met de effectanalyse tot minimaal een volle week na de uitrol. Bij een spam-update toetsen we de werkwijze aan Googles spambeleid. Een daling op hetzelfde moment is op zichzelf geen bewijs van een overtreding. We verbeteren wat bezoekers echt helpt; extra zoekwoordherhaling of bijna identieke plaatsnaam­pagina’s zijn geen oplossing." },
    { question: "Hoe vaak moet SEO worden bijgewerkt?", answer: "SEO is geen eenmalige taak. Zoekgedrag, concurrentie, Google-updates en je eigen aanbod veranderen. Daarom is periodieke optimalisatie belangrijk. Dat hoeft niet altijd groot te zijn; soms gaat het om kleine technische fixes, nieuwe interne links, het aanscherpen van pagina's of het toevoegen van content waar zoekvraag ontstaat." },
    { question: "Kan ik eerst alleen de gratis SEO-scan aanvragen?", answer: "Ja. Vul het aanvraagformulier in en verstuur de klaargezette e-mail. Na ontvangst nemen we contact op om je website en doelen te bespreken. De scan is vrijblijvend; een betaald vervolg bespreken we apart. Het formulier levert geen automatische analyse en we spreken de vervolgstap persoonlijk met je af." },
  ],
  form: {
    title: "Gratis SEO check: ontdek je eerste verbeterpunten",
    text: "Met een SEO check of SEO-scan onderzoeken we waar je website aandacht nodig heeft. Vul je naam, e-mailadres en website in en verstuur de klaargezette aanvraagmail. Jimmy neemt daarna contact met je op om je doelen en de eerste aandachtspunten te bespreken. Dit is een vrijblijvende, persoonlijke eerste beoordeling; geen automatische webcheck of volledige SEO-audit. Eventuele uitvoering spreken we apart af.",
    submit: "Zet mijn aanvraagmail klaar",
    fields: ["Naam", "E-mailadres", "Website URL", "Bericht"],
  },
};

export const geoPage: GrowthPageData = {
  slug: "/geo/",
  eyebrow: "Generative Engine Optimization",
  title: "Word zichtbaar in AI-antwoorden met GEO",
  subtitle:
    "Wij helpen bedrijven om vaker gevonden, genoemd en aanbevolen te worden in AI-zoekmachines zoals ChatGPT, Gemini, Perplexity en Google AI Overviews.",
  primaryCta: "Vraag een gratis GEO-scan aan",
  secondaryCta: "Bekijk onze aanpak",
  metadata: {
    title: "GEO Bureau | Zichtbaar in AI-antwoorden",
    description:
      "Vergroot de kans dat je merk, expertise en content zichtbaar worden in AI-antwoorden van ChatGPT, Gemini, Perplexity en Google AI Overviews.",
    keywords: ["GEO", "Generative Engine Optimization", "AI SEO", "ChatGPT zichtbaarheid", "AI Overviews"],
  },
  visual: {
    label: "AI antwoord",
    title: "Aanbevolen bron worden",
    rows: [],
  },
  intro: {
    title: "Wat is Generative Engine Optimization?",
    body:
      "GEO is het optimaliseren van je online aanwezigheid zodat AI-systemen jouw bedrijf, expertise en content beter kunnen begrijpen en gebruiken in gegenereerde antwoorden.",
    points: ["SEO richt zich op zoekresultaten", "GEO richt zich op AI-antwoorden", "De sterkste strategie combineert beide"],
  },
  deepDive: {
    title: "Wanneer heb je GEO nodig?",
    intro:
      "GEO wordt interessant wanneer klanten steeds vaker vragen stellen aan AI-systemen en jij wilt dat jouw bedrijf, expertise en content beter begrepen worden als mogelijke bron of aanbeveling.",
    blocks: [
      {
        title: "Je weet niet of AI-platformen je bedrijf noemen",
        body:
          "We onderzoeken bij welke vragen, thema's en prompts je merk zichtbaar is, waar je ontbreekt en welke concurrenten of bronnen vaker terugkomen in AI-antwoorden.",
      },
      {
        title: "Je content is wel aanwezig, maar niet duidelijk genoeg voor AI",
        body:
          "AI-systemen hebben heldere, gestructureerde informatie nodig. We verbeteren uitleg, FAQ's, expertcontent, structured data en interne samenhang zodat je expertise makkelijker te interpreteren is.",
      },
      {
        title: "Je wilt autoriteit opbouwen buiten je eigen website",
        body:
          "AI-antwoorden leunen vaak op herkenbare bronnen, vermeldingen en vertrouwen. Daarom kijken we ook naar externe vermeldingen, reviews, PR, brancheprofielen en bewijs van expertise.",
      },
      {
        title: "Je wilt GEO combineren met SEO",
        body:
          "Een sterke SEO-basis helpt ook bij GEO. Pagina's die technisch goed staan, duidelijke vragen beantwoorden en autoriteit opbouwen zijn beter bruikbaar voor zoekmachines én AI-systemen.",
      },
    ],
    related: [
      { label: "SEO", href: "/seo/", text: "Bouw een sterke organische basis waar AI-systemen ook op kunnen leunen." },
      { label: "Google Ads", href: "/google-ads/", text: "Gebruik zoekdata om te leren welke vragen en intenties commercieel waardevol zijn." },
      { label: "Social Ads", href: "/social-ads/", text: "Test proposities en bewijsvoering sneller met gerichte social campagnes." },
    ],
  },
  topicalAuthority: {
    title: "De compacte GEO-aanpak",
    intro:
      "De GEO-pagina volgt dezelfde compacte opbouw als SEO, maar dan gericht op zichtbaarheid in AI-antwoorden: begrijpelijke content, relevante prompts, betrouwbare bronnen en een duidelijke vervolgstap.",
    clusters: [
      {
        title: "1. Begrijpbaar fundament",
        body:
          "AI-systemen moeten je website, diensten en expertise makkelijk kunnen lezen en interpreteren. We verbeteren structuur, technische signalen en heldere uitleg voordat we extra content toevoegen.",
        items: ["Structured data", "Heldere diensten", "FAQ-structuur", "Technische basis"],
      },
      {
        title: "2. Vragen en prompts",
        body:
          "Niet alleen zoekwoorden zijn belangrijk, maar ook de vragen die mensen aan AI stellen. We vertalen klantvragen naar content die direct, betrouwbaar en bruikbaar antwoord geeft.",
        items: ["Prompt-onderzoek", "Klantvragen", "AI Overviews", "Vergelijkingen"],
      },
      {
        title: "3. Autoriteit en bronnen",
        body:
          "AI-systemen vertrouwen niet alleen op je eigen claims. We versterken bewijs, vermeldingen, reviews, expertprofielen en externe signalen die je betrouwbaarheid ondersteunen.",
        items: ["Merkvermeldingen", "Reviews", "Expertise", "Bronwaarde"],
      },
      {
        title: "4. Conversie uit AI-verkeer",
        body:
          "Zichtbaarheid is pas waardevol als mensen een logische volgende stap kunnen zetten. We zorgen voor duidelijke CTA's, sterke landingspagina's en een GEO-scan als laagdrempelige ingang.",
        items: ["Heldere CTA's", "Korte route", "Gratis GEO-scan", "Leadkwaliteit"],
      },
    ],
  },
  trust: {
    line: "GEO maakt expertise beter vindbaar voor mensen die zoeken via AI.",
    badges: ["ChatGPT", "Gemini", "Perplexity", "AI Overviews"],
  },
  servicesTitle: "Onze GEO-diensten",
  servicesIntro: "We verbeteren content, structuur en autoriteit zodat AI-systemen jouw expertise beter kunnen herkennen.",
  services: [
    { title: "AI-zichtbaarheidsanalyse", body: "Onderzoeken waar en hoe het merk momenteel wordt genoemd in AI-platformen." },
    { title: "GEO-contentoptimalisatie", body: "Bestaande content verbeteren zodat AI-systemen informatie gemakkelijker kunnen begrijpen en gebruiken." },
    { title: "Prompt- en vraagonderzoek", body: "Onderzoeken welke vragen potentiële klanten stellen aan AI-systemen." },
    { title: "Autoriteit & expertise", body: "De expertise, betrouwbaarheid en online autoriteit van het bedrijf versterken." },
    { title: "Structured Data", body: "Schema markup en technische structuur verbeteren." },
    { title: "FAQ-content", body: "Duidelijke antwoorden schrijven op belangrijke klantvragen." },
    { title: "Digital PR & merkvermeldingen", body: "Werken aan relevante externe vermeldingen en betrouwbare bronnen." },
    { title: "GEO-monitoring", body: "Meten hoe vaak en bij welke onderwerpen het merk verschijnt in AI-antwoorden." },
  ],
  processTitle: "Onze GEO-werkwijze",
  process: [
    { title: "AI-zichtbaarheid analyseren", body: "We onderzoeken bij welke prompts, onderwerpen en AI-platformen je bedrijf nu wel of niet zichtbaar is." },
    { title: "Kansen prioriteren", body: "We bepalen welke vragen, pagina's, FAQ's en bronnen het meeste kunnen bijdragen aan betere AI-zichtbaarheid." },
    { title: "Content en structuur verbeteren", body: "We maken informatie duidelijker, voegen ontbrekende antwoorden toe en verbeteren technische signalen zoals structured data." },
    { title: "Autoriteit versterken", body: "We werken aan expertise, externe vermeldingen, reviews en betrouwbare bronnen die AI-systemen kunnen herkennen." },
    { title: "Monitoren en bijsturen", body: "We volgen prompts, merkvermeldingen, bronverwijzingen en verkeer uit AI-platformen waar dat meetbaar is." },
  ],
  resultTitle: "Wat meten we?",
  resultText: "Voor GEO kijken we naar zichtbaarheid in AI-antwoorden, merkvermeldingen, bronverwijzingen en verkeer of leads vanuit AI-platformen.",
  stats: [],
  comparison: {
    title: "SEO versus GEO",
    leftTitle: "SEO",
    leftItems: ["Gericht op Google-rankings", "Zoekwoorden", "Organisch verkeer", "Klikken vanuit zoekresultaten"],
    rightTitle: "GEO",
    rightItems: ["Gericht op AI-antwoorden", "Vragen en prompts", "Merkvermeldingen", "Bronnen en autoriteit"],
    footer: "De beste strategie combineert SEO en GEO.",
  },
  benefitsTitle: "Waarom deze GEO-aanpak overtuigt",
  benefits: [
    "Je ontdekt of AI-systemen je merk al noemen",
    "Je krijgt prompts en vragen met commerciële waarde",
    "Je content wordt duidelijker en beter bruikbaar als bron",
    "Je bouwt autoriteit op met bewijs en vermeldingen",
    "Je combineert GEO logisch met SEO",
    "Je krijgt geen garanties, maar wel concrete prioriteiten",
  ],
  reviews: [
    { quote: "We kregen eindelijk grip op hoe AI-platformen ons merk begrijpen.", name: "Lotte Maas", company: "Maas Legal" },
    { quote: "De combinatie van FAQ's, structured data en expertcontent maakte onze propositie veel duidelijker.", name: "Daan Vermeer", company: "Vermeer Finance" },
    { quote: "GEO gaf ons een nieuwe laag bovenop SEO, zonder de basis uit het oog te verliezen.", name: "Eva Smit", company: "Smit Consultancy" },
  ],
  faq: [
    {
      question: "Wat is GEO?",
      answer:
        "GEO staat voor Generative Engine Optimization. Het draait om het verbeteren van je online aanwezigheid zodat AI-systemen je bedrijf, diensten, expertise en content beter kunnen begrijpen en mogelijk gebruiken in antwoorden.",
    },
    {
      question: "Wat is het verschil tussen GEO en SEO?",
      answer:
        "SEO richt zich vooral op vindbaarheid in zoekmachines zoals Google. GEO richt zich op zichtbaarheid in AI-antwoorden, bijvoorbeeld wanneer iemand aan ChatGPT, Gemini, Perplexity of Google AI Overviews vraagt welk bedrijf, product of advies relevant is.",
    },
    {
      question: "Is GEO een vervanging van SEO?",
      answer:
        "Nee. GEO werkt het sterkst wanneer de SEO-basis goed staat. Techniek, duidelijke pagina's, inhoudelijke diepte, interne links en autoriteit blijven belangrijk. GEO voegt daar promptonderzoek, bronwaarde en AI-zichtbaarheid aan toe.",
    },
    {
      question: "Kun je garanderen dat ChatGPT mijn bedrijf noemt?",
      answer:
        "Nee. AI-platformen bepalen zelf welke antwoorden, bronnen en merken ze tonen. We kunnen geen vermelding garanderen, maar we kunnen wel de voorwaarden verbeteren: duidelijke content, bewijs, structuur, autoriteit en relevante externe signalen.",
    },
    {
      question: "Voor welke AI-platformen optimaliseren jullie?",
      answer:
        "We kijken onder andere naar ChatGPT, Gemini, Perplexity en Google AI Overviews. Per platform verschilt hoe antwoorden worden opgebouwd, daarom beoordelen we prompts, zichtbaarheid, bronvermeldingen en contentstructuur per situatie.",
    },
    {
      question: "Hoe meet je GEO?",
      answer:
        "We meten GEO door relevante prompts te monitoren, merkvermeldingen te controleren, bronverwijzingen te bekijken en waar mogelijk verkeer of leads vanuit AI-platformen te analyseren. Niet alles is even hard meetbaar, dus we combineren data met periodieke zichtbaarheidstests.",
    },
    {
      question: "Hoe snel zie je resultaat met GEO?",
      answer:
        "Dat hangt af van je huidige content, autoriteit, concurrentie en technische basis. Sommige verbeteringen zijn snel door te voeren, maar structurele AI-zichtbaarheid vraagt meestal om doorlopende optimalisatie, net als SEO.",
    },
    {
      question: "Wat is promptonderzoek?",
      answer:
        "Promptonderzoek is het onderzoeken welke vragen potentiële klanten aan AI-systemen stellen. We kijken niet alleen naar losse zoekwoorden, maar naar volledige vragen, vergelijkingen, koopintentie en situaties waarin jouw bedrijf als oplossing relevant kan zijn.",
    },
    {
      question: "Wat bedoelen jullie met bronwaarde?",
      answer:
        "Bronwaarde gaat over hoe bruikbaar en betrouwbaar jouw website of merk is als informatiebron. Denk aan duidelijke uitleg, expertise, reviews, externe vermeldingen, gestructureerde data en pagina's die concrete vragen goed beantwoorden.",
    },
    {
      question: "Heeft structured data invloed op GEO?",
      answer:
        "Structured data is geen wondermiddel, maar het helpt zoekmachines en systemen om informatie beter te begrijpen. Voor GEO kijken we naar schema markup, FAQ-structuur, dienstinformatie, bedrijfsgegevens en de technische opbouw van pagina's.",
    },
    {
      question: "Moet ik nieuwe content maken voor GEO?",
      answer:
        "Niet altijd. Vaak verbeteren we eerst bestaande pagina's, FAQ's, dienstteksten en kenniscontent. Daarna bepalen we waar nieuwe content nodig is, bijvoorbeeld voor belangrijke klantvragen, vergelijkingen of onderwerpen waar nog geen goede pagina voor bestaat.",
    },
    {
      question: "Is GEO geschikt voor lokale bedrijven?",
      answer:
        "Ja, zeker wanneer klanten lokaal zoeken of vragen stellen als 'welk bureau kan mij helpen met...'. Dan zijn duidelijke dienstpagina's, lokale signalen, reviews, bedrijfsinformatie en relevante vermeldingen extra belangrijk.",
    },
    {
      question: "Wat zit er in een gratis GEO-scan?",
      answer:
        "We kijken naar je huidige AI-zichtbaarheid, belangrijke prompts, contentstructuur, technische signalen, autoriteit en eerste kansen. Je krijgt geen generiek rapport, maar compacte prioriteiten waarmee je weet waar de grootste verbeterpunten liggen.",
    },
    {
      question: "Hoe combineer je GEO met SEO?",
      answer:
        "We bouwen eerst aan een vindbaar fundament: techniek, pagina's, zoekintentie en autoriteit. Vervolgens vertalen we belangrijke zoekvragen naar AI-vragen en verbeteren we content zodat die duidelijker, betrouwbaarder en beter bruikbaar is als bron.",
    },
  ],
  form: {
    title: "Ontvang een compacte GEO-scan",
    text: "Stuur je website mee. We geven je geen generiek rapport, maar een eerste diagnose van prompts, bronwaarde, contentkansen en autoriteit.",
    submit: "Ontvang mijn GEO-scan",
    fields: ["Naam", "Bedrijfsnaam", "E-mailadres", "Website", "Bericht"],
  },
};

export const googleAdsPage: GrowthPageData = {
  slug: "/google-ads/",
  eyebrow: "Google Ads",
  title: "Meer leads en omzet met slimme Google Ads",
  subtitle:
    "Wij bouwen, beheren en optimaliseren Google Ads-campagnes die gericht zijn op rendement. Van Search en Shopping tot Performance Max, YouTube en remarketing.",
  primaryCta: "Vraag een gratis Google Ads-scan aan",
  secondaryCta: "Bekijk onze aanpak",
  metadata: {
    title: "Google Ads bureau voor leads en omzet",
    description:
      "Meer rendement uit Google Ads. Wij beheren Search, Shopping, Performance Max, YouTube en remarketingcampagnes gericht op leads, omzet en ROAS.",
    keywords: ["Google Ads bureau", "Google Ads uitbesteden", "Google Ads beheer", "Performance Max", "Shopping campagnes", "Google Ads specialist", "Google Ads optimalisatie"],
  },
  visual: {
    label: "Google Ads-aanpak",
    title: "Search, Shopping en PMax",
    rows: [],
  },
  intro: {
    title: "Adverteren op het moment dat jouw klant zoekt",
    body:
      "Met Google Ads bereik je potentiële klanten precies wanneer zij actief zoeken naar jouw product of dienst. Een goede campagne draait echter niet alleen om klikken. Wij richten campagnes in op relevante bezoekers, kwalitatieve leads en winstgevende omzet.",
    points: ["Direct zichtbaar in Google", "Gericht op relevante doelgroepen", "Continu meetbaar en optimaliseerbaar"],
  },
  trust: {
    line: "Google Ads-campagnes waarin zoekintentie, tracking, landingspagina en rapportage hetzelfde verhaal vertellen.",
    badges: ["Search", "Performance Max", "Shopping", "Remarketing"],
  },
  servicesTitle: "Welke campagnes beheren wij?",
  servicesIntro: "Niet ieder bedrijf heeft hetzelfde campagnetype nodig. We kiezen op basis van doel, markt en meetbaarheid.",
  services: [
    { title: "Search campagnes", body: "Bereik mensen die actief in Google zoeken naar jouw diensten of producten." },
    { title: "Performance Max", body: "Assets, signalen, feedkwaliteit en resultaten structureren zodat verspilling beperkt wordt." },
    { title: "Google Shopping", body: "Productfeed, Merchant Center, segmentatie en ROAS-optimalisatie voor webshops." },
    { title: "Display campagnes", body: "Visuele advertenties voor merkbekendheid, remarketing en aanvullend bereik." },
    { title: "YouTube Ads", body: "Video-advertenties voor bereik, consideration, leads en conversies." },
    { title: "Remarketing", body: "Bezoekers opnieuw bereiken via Display, YouTube, Search en Performance Max." },
    { title: "Lokale campagnes", body: "Campagnes voor relevante zoekopdrachten binnen steden, regio's of verzorgingsgebieden." },
    { title: "Conversietracking", body: "Meten welke zoekwoorden, campagnes en advertenties aanvragen, afspraken of omzet opleveren." },
  ],
  processTitle: "Onze Google Ads-werkwijze",
  process: [
    { title: "Analyse", body: "We onderzoeken jouw bedrijf, aanbod, doelgroep, bestaande campagnes en concurrentie." },
    { title: "Strategie", body: "We bepalen campagnetypes, zoekwoorden, budgetten en doelstellingen." },
    { title: "Tracking", body: "We meten formulieren, telefoongesprekken, aankopen, afspraken en omzet waar relevant." },
    { title: "Campagnes bouwen", body: "We bouwen een duidelijke structuur met advertenties, zoekwoorden en doelgroepen." },
    { title: "Optimaliseren", body: "We verbeteren continu op basis van echte campagnegegevens." },
    { title: "Rapporteren en opschalen", body: "We analyseren rendement en bepalen waar campagnes beter of groter kunnen." },
  ],
  resultTitle: "Geen goede Google Ads zonder goede tracking",
  resultText:
    "Klikken zijn niet het einddoel. Daarom richten we campagnes in rondom echte bedrijfsresultaten: aanvragen, telefoongesprekken, aankopen, omzet en leadkwaliteit.",
  stats: [],
  comparison: {
    title: "Welke Google Ads-campagnes passen bij je doel?",
    leftTitle: "Search en Shopping",
    leftItems: ["Actieve zoekvraag", "Hoge intentie", "Zoekwoorden en productfeed", "Sterk voor leads en directe verkoop"],
    rightTitle: "Performance Max en remarketing",
    rightItems: ["Breder Google-bereik", "Datagedreven optimalisatie", "YouTube, Display en Discover", "Sterk met goede conversiedata"],
    footer: "De beste Google Ads-structuur begint bij zoekintentie, meetbaarheid en genoeg controle op budgetverspilling.",
  },
  benefitsTitle: "Meer uit ieder advertentiebudget",
  benefits: ["Minder verspilling", "Meer conversies", "Betere data", "Continu verbeteren", "Landingspagina-optimalisatie", "Heldere rapportage"],
  reviews: [
    {
      quote:
        "Sinds we samen werken met Slimmer dan Gisteren is onze onlinemarketing naar een hoger niveau getild. Niet alleen zijn onze marketingkosten aanzienlijk gedaald, we trekken ook duidelijk meer bezoekers naar onze website. Het team denkt proactief mee, legt helder uit welke strategieën zij inzetten en waarom, en heeft ons echt geholpen om marketing beter te begrijpen.",
      name: "Kozijnrubbers.nl",
      company: "Google Ads, optimalisatie en online marketing",
    },
  ],
  faq: [
    {
      question: "Wat doet een Google Ads bureau?",
      answer:
        "Een Google Ads bureau helpt met strategie, inrichting, beheer en optimalisatie van betaalde campagnes in Google. Dat gaat verder dan advertenties aanzetten. We kijken naar zoekintentie, campagnetypes, tracking, landingspagina's, budgetverdeling, advertentieteksten, zoektermen, uitsluitingen en de kwaliteit van aanvragen.",
    },
    {
      question: "Wat kost Google Ads?",
      answer:
        "Google Ads bestaat meestal uit twee kosten: het advertentiebudget dat rechtstreeks naar Google gaat en de kosten voor beheer en optimalisatie. Het juiste budget hangt af van concurrentie, zoekvolume, regio, marges, doelstellingen en hoeveel data nodig is om goed te kunnen optimaliseren.",
    },
    {
      question: "Welk advertentiebudget heb ik nodig?",
      answer:
        "Dat verschilt per markt. Een lokale dienstverlener kan vaak met een lager budget starten dan een landelijke webshop of concurrerende B2B-markt. We kijken eerst naar zoekvolume, klikprijzen, conversiekans en gewenste leadkwaliteit. Daarna adviseren we een budget dat genoeg data oplevert zonder onnodig hard te starten.",
    },
    {
      question: "Hoe snel werkt Google Ads?",
      answer:
        "Google Ads kan direct zichtbaar worden zodra campagnes live staan. Toch betekent dat niet dat campagnes direct optimaal presteren. De eerste periode gebruiken we om zoektermen, conversies, kosten, leadkwaliteit en landingspagina's te beoordelen. Daarna wordt duidelijk waar budget beter, scherper of juist ruimer ingezet kan worden.",
    },
    {
      question: "Kunnen jullie resultaten garanderen?",
      answer:
        "Nee. Niemand kan eerlijke resultaten garanderen, omdat markt, concurrentie, budget, aanbod en websitekwaliteit invloed hebben. We kunnen campagnes wel professioneel inrichten, verspilling beperken, tracking verbeteren en op basis van data continu bijsturen om de kans op rendabele resultaten te vergroten.",
    },
    {
      question: "Welke campagnes beheren jullie?",
      answer:
        "We beheren onder andere Search, Performance Max, Shopping, Display, YouTube, remarketing en lokale campagnes. Welke campagnetypes logisch zijn, hangt af van je doel. Voor leadgeneratie starten we vaak met Search en goede tracking. Voor webshops spelen Shopping, feedkwaliteit en Performance Max vaak een grotere rol.",
    },
    {
      question: "Regelen jullie conversietracking?",
      answer:
        "Ja. Zonder goede tracking kun je niet betrouwbaar optimaliseren. We richten waar relevant metingen in via Google Ads, GA4 en Google Tag Manager. Denk aan formulierinzendingen, telefoontikken, aankopen, afspraken, offerte-aanvragen en andere acties die echt iets zeggen over resultaat.",
    },
    {
      question: "Waarom is tracking zo belangrijk bij Google Ads?",
      answer:
        "Als alleen klikken worden gemeten, lijkt een campagne soms succesvol terwijl er weinig goede aanvragen binnenkomen. Met goede tracking zie je welke zoekwoorden, advertenties en pagina's bijdragen aan leads of omzet. Daardoor kun je budget verplaatsen van ruis naar campagnes die commercieel meer waarde hebben.",
    },
    {
      question: "Wat is Performance Max?",
      answer:
        "Performance Max is een Google Ads-campagnetype dat meerdere netwerken combineert, zoals Search, Display, YouTube, Gmail en Discover. Het kan krachtig zijn, maar vraagt goede conversiedata, duidelijke assets, feedkwaliteit en controle op resultaat. Zonder goede basis kan Performance Max ook snel onduidelijk of inefficiënt worden.",
    },
    {
      question: "Is Google Ads geschikt voor mijn bedrijf?",
      answer:
        "Google Ads is vooral interessant wanneer er bestaande zoekvraag is naar je product of dienst, of wanneer je aanbod goed via Shopping, Search of remarketing te vermarkten is. We kijken naar zoekvolume, klikprijzen, marges, conversiekans en je website voordat we adviseren om op te schalen.",
    },
    {
      question: "Kunnen jullie bestaande campagnes verbeteren?",
      answer:
        "Ja. Vaak zit de meeste winst in bestaande campagnes: zoektermen opschonen, uitsluitingszoekwoorden toevoegen, tracking herstellen, advertentieteksten aanscherpen, campagnestructuur verbeteren, budgetten herverdelen en landingspagina's beter laten aansluiten op de zoekopdracht.",
    },
    {
      question: "Waarom leveren mijn Google Ads wel klikken maar weinig aanvragen op?",
      answer:
        "Dat kan meerdere oorzaken hebben: te brede zoekwoorden, verkeerde zoekintentie, zwakke advertentieteksten, onvoldoende uitsluitingen, slechte landingspagina's, onduidelijke CTA's of foutieve tracking. Daarom beoordelen we niet alleen de campagne, maar ook de pagina waar bezoekers landen.",
    },
    {
      question: "Wat zit er in een gratis Google Ads-scan?",
      answer:
        "We kijken naar campagnestructuur, zoekwoorden, zoektermen, tracking, budgetverdeling, advertentieteksten, landingspagina's en eerste signalen van verspilling. Je krijgt geen generiek rapport, maar een compacte prioriteitenlijst met verbeterpunten die direct richting geven.",
    },
    {
      question: "Hoe vaak optimaliseren jullie campagnes?",
      answer:
        "Campagnes worden periodiek gecontroleerd en bijgestuurd op basis van data. In het begin ligt de nadruk vaak op tracking, zoektermen, budget en structuur. Daarna verschuift de optimalisatie meer naar rendement, leadkwaliteit, schaalbaarheid, nieuwe kansen en betere landingspagina's.",
    },
    {
      question: "Kunnen jullie alleen Google Ads beheren?",
      answer:
        "Ja. Deze pagina en scan zijn specifiek gericht op Google Ads. We kijken naar Search, Shopping, Performance Max, Display, YouTube, remarketing, conversietracking, zoektermen, budgetverdeling en de landingspagina's waar Google Ads-verkeer op binnenkomt.",
    },
  ],
  form: {
    title: "Benieuwd of je meer uit Google Ads kunt halen?",
    text: "Laat ons jouw huidige campagnes of groeikansen analyseren en ontdek waar advertentiebudget slimmer kan worden ingezet.",
    submit: "Vraag een gratis Google Ads-scan aan",
    fields: ["Naam", "Bedrijfsnaam", "E-mailadres", "Telefoonnummer", "Website", "Huidig Google Ads-budget", "Doel van de campagnes", "Bericht"],
  },
};

export const socialAdsPage: GrowthPageData = {
  slug: "/social-ads/",
  eyebrow: "Social Ads",
  title: "Social campagnes die aandacht omzetten in aanvragen",
  subtitle:
    "Wij bouwen en optimaliseren social advertenties voor Meta, LinkedIn en andere kanalen. Gericht op herkenning, vertrouwen, leads en meetbare groei.",
  primaryCta: "Vraag een gratis Social Ads-scan aan",
  secondaryCta: "Bekijk onze aanpak",
  metadata: {
    title: "Social Ads Bureau | Campagnes voor Leads & Groei",
    description:
      "Social Ads uitbesteden? Slimmer dan Gisteren helpt met strategie, creatie, tracking en optimalisatie voor Meta, LinkedIn en social campagnes.",
    keywords: ["Social Ads bureau", "Meta Ads uitbesteden", "LinkedIn Ads", "social advertising", "advertenties uitbesteden"],
  },
  visual: {
    label: "Social Ads funnel",
    title: "Van aandacht naar aanvraag",
    rows: [],
  },
  intro: {
    title: "Adverteren waar jouw doelgroep al kijkt",
    body:
      "Social Ads werken wanneer strategie, doelgroep, creatie, landingspagina en opvolging samenkomen. We maken campagnes die niet alleen zichtbaar zijn, maar ook bijdragen aan herkenning, vertrouwen en aanvragen.",
    points: ["Sterke creatives", "Gerichte doelgroepen", "Meetbare funnel"],
  },
  trust: {
    line: "Social Ads gericht op kwaliteit, niet alleen op bereik.",
    badges: ["Meta Ads", "LinkedIn Ads", "Retargeting", "Leadgeneratie"],
  },
  servicesTitle: "Social Ads-diensten",
  servicesIntro: "Van strategie tot creative testing en rapportage: social campagnes hebben ritme en duidelijke keuzes nodig.",
  services: [
    { title: "Campagnestrategie", body: "Bepalen welke doelgroep, boodschap, funnel en kanalen passen bij jouw groeidoel." },
    { title: "Meta Ads", body: "Facebook en Instagram campagnes voor bereik, leads, retargeting en conversies." },
    { title: "LinkedIn Ads", body: "B2B-campagnes gericht op functies, branches, bedrijven en zakelijke beslissers." },
    { title: "Creative testing", body: "Meerdere hooks, visuals en formats testen om te zien wat echt aanslaat." },
    { title: "Retargeting", body: "Websitebezoekers en betrokken doelgroepen opnieuw bereiken met relevante vervolgstappen." },
    { title: "Conversietracking", body: "Meten welke campagnes aanvragen, afspraken of verkopen opleveren." },
    { title: "Landingspagina's", body: "Advertenties laten aansluiten op pagina's die duidelijk, snel en conversiegericht zijn." },
    { title: "Rapportage", body: "Heldere maandelijkse inzichten in bereik, kosten, leads, kwaliteit en verbeterpunten." },
  ],
  processTitle: "Onze Social Ads-werkwijze",
  process: [
    { title: "Analyse", body: "We onderzoeken aanbod, doelgroep, bestaande content en eerdere campagneprestaties." },
    { title: "Funnel bepalen", body: "We kiezen campagnes voor awareness, consideration, retargeting of leadgeneratie." },
    { title: "Creatives maken", body: "We vertalen boodschap en bewijs naar social-first advertenties." },
    { title: "Tracking inrichten", body: "We meten conversies, formulieren, afspraken en waardevolle acties." },
    { title: "Testen en optimaliseren", body: "We verbeteren doelgroepen, budgetten, creatives en landingspagina's op basis van data." },
  ],
  resultTitle: "Social Ads zonder sterke content blijven kwetsbaar",
  resultText:
    "Daarom kijken we niet alleen naar targeting en budget, maar ook naar video, beeld, tekst, bewijs en de pagina waar mensen landen.",
  stats: [],
  comparison: {
    title: "Social Ads versus Google Ads",
    leftTitle: "Social Ads",
    leftItems: ["Vraag creëren", "Sterke visuals", "Doelgroepen en retargeting", "Merkherkenning en leads"],
    rightTitle: "Google Ads",
    rightItems: ["Bestaande zoekvraag", "Zoekwoorden", "Directe intentie", "Search, Shopping en PMax"],
    footer: "De beste advertentiemix combineert vraag creëren met vraag opvangen.",
  },
  benefitsTitle: "Waarom Social Ads via Slimmer dan Gisteren",
  benefits: ["Strategie en creatie samen", "Social-first advertenties", "Retargeting en funnels", "Heldere tracking", "Maandelijkse optimalisatie", "Persoonlijk contact"],
  reviews: [
    { quote: "De social campagnes kregen eindelijk een duidelijke rol in onze funnel.", name: "Robin Verhoeven", company: "Verhoeven Services" },
    { quote: "Niet alleen bereik, maar betere aanvragen en duidelijkere opvolging.", name: "Laura Meijer", company: "Meijer Coaching" },
    { quote: "De video-creatives maakten het verschil in herkenning en retargeting.", name: "Niels Kramer", company: "Kramer Bouw" },
  ],
  faq: [
    { question: "Welke Social Ads-kanalen beheren jullie?", answer: "Onder andere Meta Ads en LinkedIn Ads. Andere kanalen kunnen afhankelijk van doel en doelgroep worden meegenomen." },
    { question: "Heb ik al content nodig?", answer: "Bestaande content helpt, maar we kunnen ook meedenken over social-first visuals, video en advertentieformats." },
    { question: "Kunnen jullie leads garanderen?", answer: "Nee. Resultaten kunnen niet worden gegarandeerd. We kunnen campagnes wel professioneel inrichten, meten en verbeteren." },
    { question: "Werkt Social Ads samen met Google Ads?", answer: "Ja. Social Ads kan vraag creëren en Google Ads kan bestaande zoekvraag opvangen." },
  ],
  form: {
    title: "Benieuwd waar jouw Social Ads-kansen liggen?",
    text: "Laat je campagnes, doelgroep en creatives analyseren en ontdek waar je social budget slimmer ingezet kan worden.",
    submit: "Vraag een gratis Social Ads-scan aan",
    fields: ["Naam", "Bedrijfsnaam", "E-mailadres", "Website", "Bericht"],
  },
};
