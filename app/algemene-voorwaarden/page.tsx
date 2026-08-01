import type { Metadata } from "next";

import { JsonLd } from "../json-ld";
import { Text } from "../language";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "../seo";
import { SiteShell } from "../site-content";

const t = (nl: string, en: string, es: string) => ({ nl, en, es });

const legalHighlights = [
  {
    title: t("Geen kleine letters", "No hidden small print", "Sin letra pequena"),
    body: t(
      "Scope, planning, betaling, eigendom, opzegging en verlenging staan helder beschreven.",
      "Scope, planning, payment, ownership, cancellation and renewal are described clearly.",
      "Alcance, planificacion, pago, propiedad, cancelacion y renovacion se describen con claridad.",
    ),
  },
  {
    title: t("Voor projecten en beheer", "For projects and retainers", "Para proyectos y gestion"),
    body: t(
      "Geschikt voor websites, advertenties, SEO, content creatie, eenmalige opdrachten en doorlopende samenwerking.",
      "Suitable for websites, advertising, SEO, content creation, one-off projects and ongoing collaboration.",
      "Apto para webs, publicidad, SEO, creacion de contenido, proyectos puntuales y colaboraciones recurrentes.",
    ),
  },
  {
    title: t("Menselijk geregeld", "Handled humanly", "Gestion humana"),
    body: t(
      "Vragen, wijzigingen en opzeggingen lopen altijd via jimmy@slimmerdangisteren.nl.",
      "Questions, changes and cancellations always go through jimmy@slimmerdangisteren.nl.",
      "Preguntas, cambios y cancelaciones siempre se gestionan via jimmy@slimmerdangisteren.nl.",
    ),
  },
];

const termsSections = [
  {
    title: t("1. Definities", "1. Definitions", "1. Definiciones"),
    body: t(
      "In deze voorwaarden wordt verstaan onder Slimmer dan Gisteren: de opdrachtnemer die diensten levert op het gebied van websites, SEO, advertenties, content creatie, strategie, beheer, rapportage en optimalisatie. Klant betekent iedere natuurlijke persoon, onderneming of organisatie die een offerte aanvraagt, opdracht geeft, diensten afneemt of een factuur ontvangt. Opdracht betekent iedere afspraak over werkzaamheden, ongeacht of deze via offerte, e-mail, mondelinge bevestiging, factuur of digitaal akkoord tot stand komt.",
      "In these terms, Slimmer dan Gisteren means the contractor providing services related to websites, SEO, advertising, content creation, strategy, management, reporting and optimisation. Client means any natural person, business or organisation requesting a proposal, placing an order, using services or receiving an invoice. Assignment means any agreement about work, whether concluded by proposal, email, verbal confirmation, invoice or digital approval.",
      "En estas condiciones, Slimmer dan Gisteren significa el proveedor que presta servicios de webs, SEO, publicidad, creacion de contenido, estrategia, gestion, reporting y optimizacion. Cliente significa cualquier persona fisica, empresa u organizacion que solicite una propuesta, encargue servicios, los utilice o reciba una factura. Encargo significa cualquier acuerdo sobre trabajo, ya sea mediante propuesta, email, confirmacion verbal, factura o aprobacion digital.",
    ),
  },
  {
    title: t("2. Toepasselijkheid en rangorde", "2. Applicability and order", "2. Aplicabilidad y prioridad"),
    body: t(
      "Deze algemene voorwaarden gelden voor alle offertes, opdrachtbevestigingen, facturen, abonnementen, eenmalige opdrachten en overige werkzaamheden van Slimmer dan Gisteren. Afwijkende afspraken gelden alleen wanneer deze schriftelijk of per e-mail zijn bevestigd. Bij strijd tussen documenten geldt eerst de individuele overeenkomst of offerte, daarna de opdrachtbevestiging of factuur, en daarna deze algemene voorwaarden.",
      "These terms apply to all proposals, confirmations, invoices, subscriptions, one-off assignments and other work by Slimmer dan Gisteren. Deviating agreements only apply when confirmed in writing or by email. If documents conflict, the individual agreement or proposal prevails first, followed by the confirmation or invoice, and then these terms.",
      "Estas condiciones se aplican a todas las propuestas, confirmaciones, facturas, suscripciones, encargos unicos y demas trabajos de Slimmer dan Gisteren. Los acuerdos distintos solo son validos si se confirman por escrito o por email. En caso de conflicto entre documentos, prevalece primero el acuerdo o propuesta individual, despues la confirmacion o factura, y despues estas condiciones.",
    ),
  },
  {
    title: t("3. Aanbod en totstandkoming", "3. Offer and agreement", "3. Oferta y contrato"),
    body: t(
      "Een offerte of voorstel van Slimmer dan Gisteren is vrijblijvend, tenzij daarin anders staat. Een overeenkomst komt tot stand wanneer de klant akkoord geeft op een offerte, opdrachtbevestiging, e-mailvoorstel, factuur of wanneer Slimmer dan Gisteren met instemming van de klant met de werkzaamheden start. Algemene voorwaarden van de klant worden uitdrukkelijk van de hand gewezen, tenzij schriftelijk anders is afgesproken.",
      "A proposal or offer from Slimmer dan Gisteren is non-binding unless stated otherwise. An agreement is formed when the client approves a proposal, confirmation, email proposal, invoice or when Slimmer dan Gisteren starts the work with the client's consent. The client's own terms are expressly rejected unless agreed otherwise in writing.",
      "Una propuesta u oferta de Slimmer dan Gisteren no es vinculante salvo que se indique lo contrario. El contrato se forma cuando el cliente aprueba una propuesta, confirmacion, propuesta por email, factura o cuando Slimmer dan Gisteren inicia el trabajo con consentimiento del cliente. Las condiciones del cliente se rechazan expresamente salvo acuerdo escrito en contrario.",
    ),
  },
  {
    title: t("4. Zakelijke klanten en consumenten", "4. Business clients and consumers", "4. Clientes empresariales y consumidores"),
    body: t(
      "Slimmer dan Gisteren werkt hoofdzakelijk voor ondernemers en organisaties. Wanneer een klant als consument handelt, gelden de dwingende consumentenrechten altijd boven bepalingen in deze voorwaarden. Bepalingen die voor consumenten wettelijk niet zijn toegestaan, worden dan buiten toepassing gelaten of gelezen op de manier die wel met de wet overeenkomt.",
      "Slimmer dan Gisteren mainly works for businesses and organisations. When a client acts as a consumer, mandatory consumer rights always prevail over these terms. Provisions that are not legally allowed for consumers will not apply or will be interpreted in a way that complies with the law.",
      "Slimmer dan Gisteren trabaja principalmente para empresas y organizaciones. Cuando un cliente actua como consumidor, los derechos imperativos del consumidor prevalecen siempre sobre estas condiciones. Las clausulas no permitidas legalmente para consumidores no se aplicaran o se interpretaran de forma compatible con la ley.",
    ),
  },
  {
    title: t("5. Scope van de dienstverlening", "5. Scope of services", "5. Alcance de los servicios"),
    body: t(
      "Slimmer dan Gisteren kan onder meer werken aan websites, websitebeheer, SEO, advertenties, content creatie, fotografie, videografie, social content, tracking, analyse, strategie, rapportage en optimalisatie. De exacte scope staat in de offerte, opdrachtbevestiging, e-mailafspraak of factuuromschrijving. Alles wat daar niet redelijkerwijs onder valt, is meerwerk.",
      "Slimmer dan Gisteren may work on websites, website management, SEO, advertising, content creation, photography, videography, social content, tracking, analysis, strategy, reporting and optimisation. The exact scope is set out in the proposal, confirmation, email agreement or invoice description. Anything that does not reasonably fall within that scope is additional work.",
      "Slimmer dan Gisteren puede trabajar en webs, gestion web, SEO, publicidad, creacion de contenido, fotografia, videografia, contenido social, tracking, analisis, estrategia, reporting y optimizacion. El alcance exacto se establece en la propuesta, confirmacion, acuerdo por email o descripcion de factura. Todo lo que no encaje razonablemente en ese alcance sera trabajo adicional.",
    ),
  },
  {
    title: t("6. Eenmalige opdrachten", "6. One-off assignments", "6. Encargos unicos"),
    body: t(
      "Eenmalige opdrachten, zoals een website, fotoshoot, video, campagne-opzet, SEO-traject, audit of losse optimalisatie, eindigen na oplevering van de afgesproken werkzaamheden. Correctierondes, wijzigingen, extra pagina's, aanvullende edits, nieuwe wensen en werkzaamheden na oplevering vallen alleen binnen de opdracht als dat vooraf is afgesproken.",
      "One-off assignments, such as a website, shoot, video, campaign setup, SEO project, audit or separate optimisation, end after delivery of the agreed work. Revision rounds, changes, extra pages, additional edits, new requests and work after delivery are only included if agreed in advance.",
      "Los encargos unicos, como una web, sesion de fotos, video, configuracion de campana, proyecto SEO, auditoria u optimizacion puntual, finalizan tras la entrega del trabajo acordado. Rondas de revision, cambios, paginas extra, edits adicionales, nuevas solicitudes y trabajo posterior solo estan incluidos si se acordaron previamente.",
    ),
  },
  {
    title: t("7. Doorlopende werkzaamheden", "7. Ongoing work", "7. Trabajo recurrente"),
    body: t(
      "Doorlopende werkzaamheden, zoals websitebeheer, advertentiebeheer, SEO, contentbeheer, rapportage of optimalisatie, lopen per maand of per andere afgesproken periode. Deze werkzaamheden worden periodiek uitgevoerd en gefactureerd zolang de samenwerking doorloopt. Niet-gebruikte uren, werkzaamheden of momenten worden niet automatisch meegenomen naar een volgende periode, tenzij anders is afgesproken.",
      "Ongoing work, such as website management, advertising management, SEO, content management, reporting or optimisation, runs monthly or for another agreed period. This work is performed and invoiced periodically while the collaboration continues. Unused hours, work or moments do not automatically carry over to a next period unless agreed otherwise.",
      "Los trabajos recurrentes, como gestion web, gestion publicitaria, SEO, gestion de contenido, reporting u optimizacion, se realizan mensualmente o por otro periodo acordado. Este trabajo se ejecuta y factura periodicamente mientras la colaboracion continue. Horas, trabajos o momentos no utilizados no se trasladan automaticamente al siguiente periodo salvo acuerdo distinto.",
    ),
  },
  {
    title: t("8. Stilzwijgende verlenging", "8. Automatic renewal", "8. Renovacion automatica"),
    body: t(
      "Doorlopende samenwerkingen worden na afloop van de afgesproken periode stilzwijgend verlengd met telkens dezelfde periode, tenzij de klant tijdig opzegt. Voor zakelijke klanten geldt een opzegtermijn van een kalendermaand, tenzij schriftelijk anders is afgesproken. Voor consumenten gelden altijd de wettelijke regels over verlenging en opzegging.",
      "Ongoing collaborations renew automatically after the agreed period for the same period, unless the client cancels on time. For business clients, a notice period of one calendar month applies unless agreed otherwise in writing. Consumers always retain their statutory rights regarding renewal and cancellation.",
      "Las colaboraciones recurrentes se renuevan automaticamente al finalizar el periodo acordado por el mismo periodo, salvo cancelacion a tiempo por parte del cliente. Para clientes empresariales se aplica un preaviso de un mes natural, salvo acuerdo escrito distinto. Los consumidores conservan siempre sus derechos legales sobre renovacion y cancelacion.",
    ),
  },
  {
    title: t("9. Opzegging", "9. Cancellation", "9. Cancelacion"),
    body: t(
      "Opzegging kan per e-mail via jimmy@slimmerdangisteren.nl. Slimmer dan Gisteren bevestigt de ontvangst per e-mail. De opzegging geldt vanaf de datum waarop deze is ontvangen, tenzij uit de overeenkomst, wettelijke regels of een afgesproken opzegtermijn een latere einddatum volgt. Reeds geplande, uitgevoerde of verschuldigde werkzaamheden blijven betaalbaar.",
      "Cancellation can be made by email via jimmy@slimmerdangisteren.nl. Slimmer dan Gisteren confirms receipt by email. The cancellation applies from the date it is received, unless the agreement, statutory rules or an agreed notice period leads to a later end date. Work already planned, performed or due remains payable.",
      "La cancelacion puede realizarse por email a jimmy@slimmerdangisteren.nl. Slimmer dan Gisteren confirma la recepcion por email. La cancelacion se aplica desde la fecha de recepcion, salvo que el contrato, la ley o un preaviso acordado establezcan una fecha posterior. El trabajo ya planificado, realizado o adeudado seguira siendo pagadero.",
    ),
  },
  {
    title: t("10. Herroepingsrecht consumenten", "10. Consumer withdrawal right", "10. Derecho de desistimiento"),
    body: t(
      "Wanneer een klant als consument op afstand een overeenkomst sluit, kan een wettelijk herroepingsrecht gelden. Als de consument uitdrukkelijk verzoekt om direct met de dienstverlening te starten, kan het recht op herroeping vervallen of kan een redelijke vergoeding verschuldigd zijn voor al geleverde diensten, voor zover de wet dat toestaat. Voor maatwerk, gepersonaliseerde content of digitale levering kunnen wettelijke uitzonderingen gelden.",
      "When a client acts as a consumer and enters into a distance contract, a statutory withdrawal right may apply. If the consumer expressly requests immediate start of the service, the withdrawal right may lapse or a reasonable fee may be due for services already provided, to the extent permitted by law. Legal exceptions may apply to custom work, personalised content or digital delivery.",
      "Cuando un cliente actua como consumidor y celebra un contrato a distancia, puede aplicarse un derecho legal de desistimiento. Si el consumidor solicita expresamente el inicio inmediato del servicio, el derecho puede caducar o puede deberse una compensacion razonable por servicios ya prestados, en la medida permitida por la ley. Pueden aplicarse excepciones legales a trabajos a medida, contenido personalizado o entregas digitales.",
    ),
  },
  {
    title: t("11. Planning, deadlines en oplevering", "11. Planning, deadlines and delivery", "11. Planificacion, plazos y entrega"),
    body: t(
      "Planningen en deadlines zijn indicatief, tenzij schriftelijk als fataal zijn overeengekomen. Oplevering kan plaatsvinden via e-mail, link, gedeelde map, websiteomgeving, advertentieaccount, preview, publicatie of ander passend middel. Vertraging door ontbrekende input, late feedback, technische afhankelijkheden, externe platformen of wijzigingen in scope komt niet voor rekening van Slimmer dan Gisteren.",
      "Planning and deadlines are indicative unless expressly agreed as strict deadlines in writing. Delivery may take place by email, link, shared folder, website environment, advertising account, preview, publication or another suitable method. Delay caused by missing input, late feedback, technical dependencies, external platforms or scope changes is not attributable to Slimmer dan Gisteren.",
      "La planificacion y los plazos son indicativos salvo que se acuerden expresamente como plazos esenciales por escrito. La entrega puede realizarse por email, enlace, carpeta compartida, entorno web, cuenta publicitaria, preview, publicacion u otro medio adecuado. Los retrasos causados por falta de input, feedback tardio, dependencias tecnicas, plataformas externas o cambios de alcance no son imputables a Slimmer dan Gisteren.",
    ),
  },
  {
    title: t("12. Input, toegang en medewerking", "12. Input, access and cooperation", "12. Input, acceso y colaboracion"),
    body: t(
      "De klant levert tijdig alle benodigde informatie, bestanden, teksten, beelden, huisstijlbestanden, toegang tot systemen, advertentieaccounts, analytics, websiteomgevingen, feedback en goedkeuringen aan. De klant staat ervoor in dat aangeleverd materiaal rechtmatig gebruikt mag worden. Extra werk door ontbrekende, onjuiste of late input kan als meerwerk worden gefactureerd.",
      "The client provides all required information, files, copy, images, brand assets, system access, advertising accounts, analytics, website environments, feedback and approvals on time. The client guarantees that supplied materials may be used lawfully. Extra work caused by missing, incorrect or late input may be invoiced as additional work.",
      "El cliente entrega a tiempo toda la informacion, archivos, textos, imagenes, recursos de marca, accesos, cuentas publicitarias, analytics, entornos web, feedback y aprobaciones necesarios. El cliente garantiza que el material aportado puede usarse legalmente. El trabajo extra causado por input ausente, incorrecto o tardio puede facturarse como trabajo adicional.",
    ),
  },
  {
    title: t("13. Correcties en acceptatie", "13. Revisions and acceptance", "13. Revisiones y aceptacion"),
    body: t(
      "De klant beoordeelt concepten, previews en opleveringen zorgvuldig en geeft gebundelde feedback binnen een redelijke termijn. Kleine fouten worden hersteld wanneer deze binnen redelijke tijd na oplevering worden gemeld. Als de klant het werk gebruikt, publiceert, goedkeurt of niet binnen redelijke tijd inhoudelijk reageert, geldt het werk als geaccepteerd.",
      "The client reviews concepts, previews and deliveries carefully and provides consolidated feedback within a reasonable period. Minor errors are corrected when reported within a reasonable period after delivery. If the client uses, publishes, approves or does not substantively respond within a reasonable period, the work is deemed accepted.",
      "El cliente revisa cuidadosamente conceptos, previews y entregas, y aporta feedback agrupado dentro de un plazo razonable. Los errores menores se corrigen si se notifican en un plazo razonable tras la entrega. Si el cliente usa, publica, aprueba o no responde sustancialmente dentro de un plazo razonable, el trabajo se considera aceptado.",
    ),
  },
  {
    title: t("14. Meerwerk, spoed en wijzigingen", "14. Additional work, urgency and changes", "14. Trabajo adicional, urgencia y cambios"),
    body: t(
      "Wijzigingen in scope, spoedwerk, extra correctierondes, nieuwe pagina's, aanvullende campagnes, extra edits, extra meetings, migraties, herstelwerk door derden of werkzaamheden buiten de afspraak kunnen als meerwerk worden gefactureerd. Slimmer dan Gisteren meldt dit vooraf wanneer redelijkerwijs duidelijk is dat het buiten de bestaande afspraak valt.",
      "Scope changes, urgent work, extra revision rounds, new pages, additional campaigns, extra edits, extra meetings, migrations, recovery work caused by third parties or work outside the agreement may be invoiced as additional work. Slimmer dan Gisteren communicates this in advance when it is reasonably clear that it falls outside the existing agreement.",
      "Cambios de alcance, trabajo urgente, rondas extra, nuevas paginas, campanas adicionales, edits extra, reuniones extra, migraciones, reparaciones causadas por terceros o trabajo fuera del acuerdo pueden facturarse como trabajo adicional. Slimmer dan Gisteren lo comunica previamente cuando sea razonablemente claro que queda fuera del acuerdo existente.",
    ),
  },
  {
    title: t("15. Facturatie en betaling", "15. Invoicing and payment", "15. Facturacion y pago"),
    body: t(
      "Facturen worden per e-mail verzonden naar het door de klant gebruikte of opgegeven e-mailadres. Betaling vindt plaats binnen de betalingstermijn op de factuur. Bij te late betaling mag Slimmer dan Gisteren werkzaamheden opschorten, toegang tot niet-opgeleverd werk beperken en wettelijke rente, incassokosten en redelijke kosten in rekening brengen voor zover toegestaan.",
      "Invoices are sent by email to the address used or provided by the client. Payment must be made within the payment term stated on the invoice. In case of late payment, Slimmer dan Gisteren may pause work, restrict access to undelivered work and charge statutory interest, collection costs and reasonable costs where permitted.",
      "Las facturas se envian por email a la direccion utilizada o indicada por el cliente. El pago debe realizarse dentro del plazo indicado en la factura. En caso de retraso, Slimmer dan Gisteren puede pausar el trabajo, limitar acceso a trabajo no entregado y cobrar intereses legales, gastos de cobro y costes razonables cuando este permitido.",
    ),
  },
  {
    title: t("16. Externe kosten en advertentiebudget", "16. External costs and ad budget", "16. Costes externos y presupuesto publicitario"),
    body: t(
      "Kosten voor advertentiebudget, hosting, domeinnamen, plug-ins, thema's, software, licenties, fonts, stockmateriaal, externe tools, betaalproviders en andere derden zijn voor rekening van de klant, tenzij schriftelijk anders is afgesproken. Slimmer dan Gisteren is niet verplicht deze kosten voor te schieten.",
      "Costs for advertising budget, hosting, domain names, plugins, themes, software, licences, fonts, stock material, external tools, payment providers and other third parties are paid by the client unless agreed otherwise in writing. Slimmer dan Gisteren is not obliged to advance these costs.",
      "Los costes de presupuesto publicitario, hosting, dominios, plugins, temas, software, licencias, fuentes, material stock, herramientas externas, proveedores de pago y otros terceros corren por cuenta del cliente salvo acuerdo escrito distinto. Slimmer dan Gisteren no esta obligado a adelantar estos costes.",
    ),
  },
  {
    title: t("17. Accounts, veiligheid en beheer", "17. Accounts, security and management", "17. Cuentas, seguridad y gestion"),
    body: t(
      "De klant blijft eigenaar en eindverantwoordelijke van eigen domeinen, hosting, websiteomgeving, advertentieaccounts, analytics, betaalmethodes en platformaccounts, tenzij schriftelijk anders is afgesproken. De klant zorgt voor juiste toegang, veilige wachtwoorden en tweestapsverificatie waar mogelijk. Slimmer dan Gisteren mag noodzakelijke technische keuzes maken voor beheer en continuiteit.",
      "The client remains owner and ultimately responsible for their own domains, hosting, website environment, advertising accounts, analytics, payment methods and platform accounts unless agreed otherwise in writing. The client ensures proper access, secure passwords and two-factor authentication where possible. Slimmer dan Gisteren may make necessary technical choices for management and continuity.",
      "El cliente sigue siendo propietario y responsable final de sus dominios, hosting, entorno web, cuentas publicitarias, analytics, metodos de pago y cuentas de plataforma salvo acuerdo escrito distinto. El cliente garantiza accesos correctos, contrasenas seguras y autenticacion de dos factores cuando sea posible. Slimmer dan Gisteren puede tomar decisiones tecnicas necesarias para gestion y continuidad.",
    ),
  },
  {
    title: t("18. Resultaten en inspanningsverplichting", "18. Results and best efforts", "18. Resultados y obligacion de medios"),
    body: t(
      "Marketingresultaten hangen af van markt, budget, aanbod, concurrentie, timing, input, historie, platformbeleid, techniek en looptijd. Slimmer dan Gisteren werkt zorgvuldig, strategisch en resultaatgericht, maar garandeert geen specifieke posities in Google, omzet, leads, advertentieprestaties, bereik, conversies of groei.",
      "Marketing results depend on market, budget, offer, competition, timing, input, history, platform policies, technology and duration. Slimmer dan Gisteren works carefully, strategically and with a focus on results, but does not guarantee specific Google rankings, revenue, leads, advertising performance, reach, conversions or growth.",
      "Los resultados de marketing dependen del mercado, presupuesto, oferta, competencia, timing, input, historial, politicas de plataformas, tecnologia y duracion. Slimmer dan Gisteren trabaja con cuidado, estrategia y orientacion a resultados, pero no garantiza posiciones concretas en Google, ingresos, leads, rendimiento publicitario, alcance, conversiones o crecimiento.",
    ),
  },
  {
    title: t("19. SEO en vindbaarheid", "19. SEO and visibility", "19. SEO y visibilidad"),
    body: t(
      "SEO-werkzaamheden richten zich op structuur, techniek, content, vindbaarheid, meetbaarheid en verbetering van kansen in zoekmachines en AI-platformen. Posities, indexatie, vertoningen en vermeldingen door Google, ChatGPT of andere platforms worden niet gegarandeerd, omdat deze door externe algoritmes en beleid worden bepaald.",
      "SEO work focuses on structure, technology, content, visibility, measurability and improving opportunities in search engines and AI platforms. Rankings, indexing, impressions and mentions by Google, ChatGPT or other platforms are not guaranteed because they are determined by external algorithms and policies.",
      "El trabajo SEO se centra en estructura, tecnologia, contenido, visibilidad, medicion y mejora de oportunidades en buscadores y plataformas de IA. Posiciones, indexacion, impresiones y menciones por Google, ChatGPT u otras plataformas no se garantizan porque dependen de algoritmos y politicas externas.",
    ),
  },
  {
    title: t("20. Intellectueel eigendom", "20. Intellectual property", "20. Propiedad intelectual"),
    body: t(
      "Rechten op specifiek voor de klant gemaakte en betaalde eindproducten gaan over op de klant voor zover dat is afgesproken en mogelijk is. Niet-betaalde concepten, strategieen, designs, teksten, templates, werkwijzen, bronbestanden, ruwe opnames, presets, codebibliotheken en niet-gekozen voorstellen blijven eigendom van Slimmer dan Gisteren, tenzij schriftelijk anders is afgesproken.",
      "Rights to final deliverables specifically created for and paid by the client transfer to the client to the extent agreed and possible. Unpaid concepts, strategies, designs, copy, templates, methods, source files, raw footage, presets, code libraries and unused proposals remain the property of Slimmer dan Gisteren unless agreed otherwise in writing.",
      "Los derechos sobre entregables finales creados especificamente para el cliente y pagados se transfieren al cliente en la medida acordada y posible. Conceptos no pagados, estrategias, disenos, textos, plantillas, metodos, archivos fuente, material bruto, presets, bibliotecas de codigo y propuestas no elegidas siguen siendo propiedad de Slimmer dan Gisteren salvo acuerdo escrito distinto.",
    ),
  },
  {
    title: t("21. Licenties en gebruiksrechten", "21. Licences and usage rights", "21. Licencias y derechos de uso"),
    body: t(
      "Voor software, fonts, plug-ins, templates, muziek, stockmateriaal, externe beelden en andere materialen van derden gelden de licentievoorwaarden van die derden. De klant mag geleverd werk gebruiken voor het afgesproken doel. Ander gebruik, doorverkoop, overdracht aan derden of aanpassing van niet-overgedragen onderdelen is alleen toegestaan na toestemming.",
      "Software, fonts, plugins, templates, music, stock material, third-party images and other third-party materials are governed by the licence terms of those third parties. The client may use delivered work for the agreed purpose. Other use, resale, transfer to third parties or modification of non-transferred elements is only allowed with permission.",
      "Software, fuentes, plugins, plantillas, musica, material stock, imagenes de terceros y otros materiales de terceros se rigen por las licencias de esos terceros. El cliente puede usar el trabajo entregado para el fin acordado. Otro uso, reventa, transferencia a terceros o modificacion de elementos no transferidos solo se permite con autorizacion.",
    ),
  },
  {
    title: t("22. Portfolio en publicatie", "22. Portfolio and publication", "22. Portfolio y publicacion"),
    body: t(
      "Slimmer dan Gisteren mag geleverd werk, resultaten, beelden, websites, campagnes en niet-vertrouwelijke procesonderdelen tonen in portfolio, social media, presentaties en eigen marketing. Als openbaarmaking redelijkerwijs gevoelig is, kan de klant dit vooraf schriftelijk melden en maken partijen daar passende afspraken over.",
      "Slimmer dan Gisteren may show delivered work, results, images, websites, campaigns and non-confidential process elements in its portfolio, social media, presentations and own marketing. If publication is reasonably sensitive, the client may notify this in writing in advance and parties will make suitable arrangements.",
      "Slimmer dan Gisteren puede mostrar trabajos entregados, resultados, imagenes, webs, campanas y elementos no confidenciales del proceso en su portfolio, redes sociales, presentaciones y marketing propio. Si la publicacion es razonablemente sensible, el cliente puede comunicarlo previamente por escrito y las partes acordaran medidas adecuadas.",
    ),
  },
  {
    title: t("23. Privacy en persoonsgegevens", "23. Privacy and personal data", "23. Privacidad y datos personales"),
    body: t(
      "Wanneer Slimmer dan Gisteren persoonsgegevens verwerkt voor de klant, doen partijen dat volgens de geldende privacywetgeving. Als dat nodig is, sluiten partijen een verwerkersovereenkomst. De klant blijft verantwoordelijk voor de rechtmatigheid van aangeleverde persoonsgegevens, klantdata, trackingkeuzes, cookie-instellingen en toestemming van betrokkenen.",
      "When Slimmer dan Gisteren processes personal data for the client, parties do so in accordance with applicable privacy law. If needed, parties enter into a data processing agreement. The client remains responsible for the lawfulness of supplied personal data, customer data, tracking choices, cookie settings and consent from data subjects.",
      "Cuando Slimmer dan Gisteren trata datos personales para el cliente, las partes lo hacen conforme a la legislacion de privacidad aplicable. Si es necesario, las partes celebran un acuerdo de encargado del tratamiento. El cliente sigue siendo responsable de la licitud de datos personales aportados, datos de clientes, decisiones de tracking, ajustes de cookies y consentimiento de interesados.",
    ),
  },
  {
    title: t("24. Vertrouwelijkheid", "24. Confidentiality", "24. Confidencialidad"),
    body: t(
      "Partijen behandelen vertrouwelijke informatie, strategie, inloggegevens, klantdata, bedrijfsinformatie en niet-openbare documenten zorgvuldig en delen deze niet met derden, tenzij dat nodig is voor uitvoering van de opdracht, wettelijk verplicht is of vooraf is toegestaan.",
      "Parties handle confidential information, strategy, login details, customer data, business information and non-public documents with care and do not share these with third parties unless needed to perform the assignment, legally required or approved in advance.",
      "Las partes tratan informacion confidencial, estrategia, credenciales, datos de clientes, informacion empresarial y documentos no publicos con cuidado y no los comparten con terceros salvo que sea necesario para ejecutar el encargo, sea obligatorio por ley o este autorizado previamente.",
    ),
  },
  {
    title: t("25. Externe platformen en derden", "25. External platforms and third parties", "25. Plataformas externas y terceros"),
    body: t(
      "Slimmer dan Gisteren is niet verantwoordelijk voor storingen, downtime, hacks, dataverlies, prijswijzigingen, beleidswijzigingen, afkeuringen, blokkades, beperkingen of resultaten van externe partijen zoals Google, Meta, TikTok, LinkedIn, hostingbedrijven, WordPress, plug-inleveranciers, betalingsproviders of e-maildiensten.",
      "Slimmer dan Gisteren is not responsible for outages, downtime, hacks, data loss, price changes, policy changes, rejections, blocks, restrictions or results caused by external parties such as Google, Meta, TikTok, LinkedIn, hosting providers, WordPress, plugin suppliers, payment providers or email services.",
      "Slimmer dan Gisteren no es responsable de fallos, caidas, hackeos, perdida de datos, cambios de precios, cambios de politica, rechazos, bloqueos, restricciones o resultados causados por terceros como Google, Meta, TikTok, LinkedIn, proveedores de hosting, WordPress, proveedores de plugins, proveedores de pago o servicios de email.",
    ),
  },
  {
    title: t("26. Aansprakelijkheid", "26. Liability", "26. Responsabilidad"),
    body: t(
      "Slimmer dan Gisteren is alleen aansprakelijk voor directe schade die aantoonbaar het gevolg is van een toerekenbare tekortkoming. De aansprakelijkheid is beperkt tot het bedrag dat voor de betreffende opdracht is betaald of, bij doorlopende samenwerking, tot het bedrag van de laatste factuurperiode. Indirecte schade, gevolgschade, gemiste omzet, gemiste winst, gemiste besparingen, reputatieschade, dataverlies en schade door externe platformen zijn uitgesloten voor zover wettelijk toegestaan.",
      "Slimmer dan Gisteren is only liable for direct damage demonstrably caused by an attributable failure. Liability is limited to the amount paid for the relevant assignment or, for ongoing collaboration, the amount of the latest invoice period. Indirect damage, consequential damage, lost revenue, lost profit, missed savings, reputational damage, data loss and damage caused by external platforms are excluded to the extent permitted by law.",
      "Slimmer dan Gisteren solo es responsable por danos directos demostrablemente causados por un incumplimiento atribuible. La responsabilidad se limita al importe pagado por el encargo correspondiente o, en colaboraciones recurrentes, al importe del ultimo periodo facturado. Danos indirectos, danos consecuenciales, ingresos perdidos, lucro cesante, ahorros no realizados, dano reputacional, perdida de datos y danos causados por plataformas externas quedan excluidos en la medida permitida por la ley.",
    ),
  },
  {
    title: t("27. Overmacht", "27. Force majeure", "27. Fuerza mayor"),
    body: t(
      "Slimmer dan Gisteren is niet gehouden tot nakoming wanneer dit redelijkerwijs niet mogelijk is door omstandigheden buiten invloedssfeer, waaronder ziekte, stroom- of internetstoringen, platformstoringen, uitval van leveranciers, overheidsmaatregelen, technische incidenten, verlies van toegang, cyberincidenten of andere onvoorziene omstandigheden.",
      "Slimmer dan Gisteren is not required to perform when this is reasonably impossible due to circumstances outside its control, including illness, power or internet outages, platform outages, supplier failure, government measures, technical incidents, loss of access, cyber incidents or other unforeseen circumstances.",
      "Slimmer dan Gisteren no esta obligado a cumplir cuando sea razonablemente imposible por circunstancias fuera de su control, incluyendo enfermedad, fallos de energia o internet, fallos de plataformas, fallos de proveedores, medidas gubernamentales, incidentes tecnicos, perdida de acceso, ciberincidentes u otras circunstancias imprevistas.",
    ),
  },
  {
    title: t("28. Opschorting en beëindiging", "28. Suspension and termination", "28. Suspension y terminacion"),
    body: t(
      "Slimmer dan Gisteren mag werkzaamheden opschorten of de overeenkomst beëindigen wanneer facturen niet worden betaald, noodzakelijke input uitblijft, toegang ontbreekt, de samenwerking onwerkbaar wordt, de klant in strijd handelt met afspraken of redelijk vertrouwen in verdere uitvoering ontbreekt. Reeds verrichte werkzaamheden blijven verschuldigd.",
      "Slimmer dan Gisteren may suspend work or terminate the agreement when invoices are not paid, required input is not provided, access is missing, the collaboration becomes unworkable, the client breaches agreements or reasonable trust in further performance is lacking. Work already performed remains payable.",
      "Slimmer dan Gisteren puede suspender trabajos o terminar el contrato cuando no se pagan facturas, falta input necesario, falta acceso, la colaboracion se vuelve inviable, el cliente incumple acuerdos o falta confianza razonable para continuar. El trabajo ya realizado seguira siendo pagadero.",
    ),
  },
  {
    title: t("29. Klachten", "29. Complaints", "29. Reclamaciones"),
    body: t(
      "Klachten over werkzaamheden of facturen worden zo snel mogelijk en uiterlijk binnen redelijke tijd na ontdekking per e-mail gemeld via jimmy@slimmerdangisteren.nl, met een duidelijke omschrijving. Een klacht schort de betalingsverplichting niet op, tenzij schriftelijk anders is afgesproken.",
      "Complaints about work or invoices must be reported by email as soon as possible and within a reasonable period after discovery via jimmy@slimmerdangisteren.nl, with a clear description. A complaint does not suspend the payment obligation unless agreed otherwise in writing.",
      "Las reclamaciones sobre trabajos o facturas deben comunicarse por email lo antes posible y dentro de un plazo razonable tras descubrirlas a jimmy@slimmerdangisteren.nl, con una descripcion clara. Una reclamacion no suspende la obligacion de pago salvo acuerdo escrito distinto.",
    ),
  },
  {
    title: t("30. Wijziging voorwaarden", "30. Changes to terms", "30. Cambios en las condiciones"),
    body: t(
      "Slimmer dan Gisteren mag deze voorwaarden wijzigen. De meest recente versie staat op de website en kan worden opgeslagen of afgedrukt. Voor lopende opdrachten gelden wijzigingen pas vanaf een nieuwe opdracht, verlenging of redelijke aankondiging, tenzij de wijziging wettelijk noodzakelijk is.",
      "Slimmer dan Gisteren may amend these terms. The latest version is available on the website and can be saved or printed. For ongoing assignments, changes apply from a new assignment, renewal or reasonable notice, unless the change is legally required.",
      "Slimmer dan Gisteren puede modificar estas condiciones. La version mas reciente esta disponible en la web y puede guardarse o imprimirse. Para encargos en curso, los cambios se aplican desde un nuevo encargo, renovacion o aviso razonable, salvo que el cambio sea legalmente necesario.",
    ),
  },
  {
    title: t("31. Toepasselijk recht", "31. Governing law", "31. Ley aplicable"),
    body: t(
      "Op alle overeenkomsten en werkzaamheden is Nederlands recht van toepassing. Geschillen worden bij voorkeur eerst in overleg opgelost. Als dat niet lukt, worden geschillen voorgelegd aan de bevoegde rechter in Nederland, tenzij dwingend recht een andere rechter aanwijst.",
      "All agreements and work are governed by Dutch law. Disputes are preferably resolved through consultation first. If that fails, disputes will be submitted to the competent court in the Netherlands, unless mandatory law designates another court.",
      "Todos los contratos y trabajos se rigen por la ley neerlandesa. Las disputas se intentaran resolver primero mediante consulta. Si no es posible, se someteran al tribunal competente en los Paises Bajos, salvo que la ley imperativa designe otro tribunal.",
    ),
  },
  {
    title: t("32. Contact", "32. Contact", "32. Contacto"),
    body: t(
      "Voor vragen over deze algemene voorwaarden, opdrachten, facturen, wijzigingen of opzeggingen kan contact worden opgenomen via jimmy@slimmerdangisteren.nl.",
      "For questions about these terms, assignments, invoices, changes or cancellations, contact jimmy@slimmerdangisteren.nl.",
      "Para preguntas sobre estas condiciones, encargos, facturas, cambios o cancelaciones, contacte con jimmy@slimmerdangisteren.nl.",
    ),
  },
];

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Uitgebreide algemene voorwaarden van Slimmer dan Gisteren voor websites, advertenties, SEO, content creatie en doorlopende samenwerking.",
  alternates: {
    canonical: "/algemene-voorwaarden/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Algemene voorwaarden | Slimmer dan Gisteren",
    description:
      "Voorwaarden voor websites, advertenties, SEO, content creatie, beheer en samenwerking met Slimmer dan Gisteren.",
    url: absoluteUrl("/algemene-voorwaarden/"),
    siteName,
    locale: "nl_NL",
    type: "website",
  },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Algemene voorwaarden", path: "/algemene-voorwaarden/" },
        ])}
      />
      <SiteShell>
        <article className="legal-page">
          <header>
            <p className="eyebrow"><Text value={t("Juridisch", "Legal", "Legal")} /></p>
            <h1><Text value={t("Algemene voorwaarden", "Terms and conditions", "Condiciones generales")} /></h1>
            <p>
              <Text value={t(
                "Voor websites, advertenties, SEO, content creatie, eenmalige opdrachten en doorlopende samenwerking met Slimmer dan Gisteren.",
                "For websites, advertising, SEO, content creation, one-off projects and ongoing collaboration with Slimmer dan Gisteren.",
                "Para webs, publicidad, SEO, creacion de contenido, proyectos puntuales y colaboracion recurrente con Slimmer dan Gisteren.",
              )} />
            </p>
            <span><Text value={t("Laatst bijgewerkt: 1 augustus 2026", "Last updated: 1 August 2026", "Ultima actualizacion: 1 de agosto de 2026")} /></span>
          </header>

          <div className="legal-summary" aria-label="Belangrijkste afspraken">
            {legalHighlights.map((item) => (
              <section key={item.title.nl}>
                <h2><Text value={item.title} /></h2>
                <p><Text value={item.body} /></p>
              </section>
            ))}
          </div>

          <div className="legal-sections">
            {termsSections.map((section) => (
              <section key={section.title.nl}>
                <h2><Text value={section.title} /></h2>
                <p><Text value={section.body} /></p>
              </section>
            ))}
          </div>
        </article>
      </SiteShell>
    </>
  );
}
