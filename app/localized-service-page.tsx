import { ScanForm } from "./scan-form";
import type { RouteLocale } from "./i18n";

type LocalizedServiceKey = "seo" | "geo" | "google-ads";

const copy = {
  en: {
    seo: {
      eyebrow: "SEO marketing agency",
      title: "SEO marketing agency for sustainable growth in Google",
      intro:
        "We help companies improve organic visibility with a clear SEO system: technical foundations, search intent, content, authority and conversion. No loose checklist, but a practical priority plan.",
      primary: "Request a free SEO scan",
      sections: [
        ["Technical foundation", "We check crawlability, indexation, speed, mobile usability, redirects, metadata, structured data and technical errors."],
        ["Pages for search intent", "Important commercial searches need logical pages with a clear offer, useful explanation, proof and a next step."],
        ["Authority and trust", "We strengthen internal links, reviews, expertise signals, content depth and relevant mentions."],
        ["Conversion to enquiry", "SEO should lead to useful enquiries. We improve CTA clarity, page structure, form friction and lead quality."],
      ],
      formTitle: "Receive a compact SEO scan",
      formText: "Send your website. We will review the first SEO opportunities and contact you within 3 working days.",
      submit: "Request my SEO scan",
      fields: ["Name", "Company name", "Email", "Website URL", "Message"],
      faq: [
        ["What does an SEO marketing agency do?", "An SEO marketing agency improves how your website is found, understood and trusted by Google and visitors."],
        ["Can you guarantee rankings?", "No honest SEO specialist can guarantee rankings. We can improve the factors that increase your chances of better visibility."],
        ["How fast does SEO work?", "Some technical improvements can be visible quickly, but sustainable SEO usually grows over several months."],
      ],
    },
    geo: {
      eyebrow: "Generative Engine Optimization",
      title: "Become visible in AI answers with GEO",
      intro:
        "GEO helps AI systems understand your company, expertise and content so you have a better chance of being found, mentioned and recommended in answers from ChatGPT, Gemini, Perplexity and Google AI Overviews.",
      primary: "Request a free GEO scan",
      sections: [
        ["AI visibility analysis", "We check where your brand appears, where it is missing and which competitors or sources are mentioned."],
        ["Prompt and question research", "We identify the questions potential customers ask AI systems around your services."],
        ["Content structure", "We improve explanations, FAQ content, entity clarity, internal links and structured data."],
        ["Authority signals", "We strengthen expertise, external mentions, reviews and trustworthy sources around your brand."],
      ],
      formTitle: "Receive a compact GEO scan",
      formText: "Send your website. We will review AI visibility opportunities and contact you within 3 working days.",
      submit: "Request my GEO scan",
      fields: ["Name", "Company name", "Email", "Website URL", "Message"],
      faq: [
        ["What is GEO?", "GEO means optimizing your online presence for visibility in generated AI answers."],
        ["Can you guarantee AI mentions?", "No. AI platforms decide their own answers. GEO increases the chance that your information is understandable and usable."],
        ["Which AI platforms matter?", "We look at ChatGPT, Gemini, Perplexity, Google AI Overviews and related AI search behavior."],
      ],
    },
    "google-ads": {
      eyebrow: "Google Ads agency",
      title: "Google Ads campaigns built for leads, revenue and clarity",
      intro:
        "We build and optimize Google Ads campaigns with clear tracking, focused landing pages and ongoing improvement. Search, Shopping, Performance Max and remarketing work best when the whole funnel is measurable.",
      primary: "Request a free Google Ads scan",
      sections: [
        ["Account and tracking check", "We review conversion tracking, campaign structure, search terms, budgets and landing pages."],
        ["Campaign strategy", "We decide which campaigns deserve budget and which searches or audiences should be excluded."],
        ["Landing page fit", "Ads only work when the page answers the promise. We check message match, CTA clarity and friction."],
        ["Monthly optimization", "We improve keywords, assets, budgets, conversion data and reporting based on performance."],
      ],
      formTitle: "Receive a compact Google Ads scan",
      formText: "Send your website or current campaign context. We will contact you within 3 working days.",
      submit: "Request my Google Ads scan",
      fields: ["Name", "Company name", "Email", "Website URL", "Message"],
      faq: [
        ["Is Google Ads suitable for every company?", "It works best when there is clear demand, a measurable offer and enough margin to learn from traffic."],
        ["Do you also check landing pages?", "Yes. A campaign is only as strong as the page visitors land on."],
        ["Can you manage existing campaigns?", "Yes. We can audit and improve existing accounts or build a new structure when needed."],
      ],
    },
  },
  es: {
    seo: {
      eyebrow: "Agencia SEO",
      title: "Agencia de SEO marketing para crecer en Google",
      intro:
        "Ayudamos a empresas a mejorar su visibilidad orgánica con un sistema SEO claro: base técnica, intención de búsqueda, contenido, autoridad y conversión. No una lista suelta, sino prioridades concretas.",
      primary: "Solicitar un análisis SEO gratis",
      sections: [
        ["Base técnica", "Revisamos rastreo, indexación, velocidad, móvil, redirecciones, metadatos, datos estructurados y errores técnicos."],
        ["Páginas por intención", "Cada búsqueda comercial importante necesita una página lógica con oferta clara, explicación, prueba y siguiente paso."],
        ["Autoridad y confianza", "Reforzamos enlaces internos, reseñas, señales de experiencia, profundidad de contenido y menciones relevantes."],
        ["Conversión a solicitud", "El SEO debe generar solicitudes útiles. Mejoramos CTAs, estructura, fricción del formulario y calidad del lead."],
      ],
      formTitle: "Recibe un análisis SEO compacto",
      formText: "Envía tu web. Revisamos las primeras oportunidades SEO y te contactamos en un plazo de 3 días laborables.",
      submit: "Solicitar mi análisis SEO",
      fields: ["Nombre", "Empresa", "Correo electrónico", "URL del sitio web", "Mensaje"],
      faq: [
        ["¿Qué hace una agencia SEO?", "Mejora cómo Google y los visitantes encuentran, entienden y confían en tu sitio web."],
        ["¿Podéis garantizar posiciones?", "No. Nadie puede prometer rankings de forma honesta. Sí podemos mejorar los factores que aumentan tus opciones."],
        ["¿Cuándo se ven resultados?", "Algunas mejoras técnicas se ven rápido, pero el crecimiento SEO sostenible suele tardar varios meses."],
      ],
    },
    geo: {
      eyebrow: "Generative Engine Optimization",
      title: "Aparece en respuestas de IA con GEO",
      intro:
        "GEO ayuda a que los sistemas de IA entiendan mejor tu empresa, experiencia y contenido, aumentando la posibilidad de aparecer en respuestas de ChatGPT, Gemini, Perplexity y Google AI Overviews.",
      primary: "Solicitar un análisis GEO gratis",
      sections: [
        ["Análisis de visibilidad IA", "Comprobamos dónde aparece tu marca, dónde falta y qué competidores o fuentes se mencionan."],
        ["Investigación de prompts", "Identificamos las preguntas que tus clientes potenciales hacen a sistemas de IA."],
        ["Estructura de contenido", "Mejoramos explicaciones, FAQ, claridad de entidades, enlaces internos y datos estructurados."],
        ["Señales de autoridad", "Reforzamos experiencia, menciones externas, reseñas y fuentes fiables alrededor de tu marca."],
      ],
      formTitle: "Recibe un análisis GEO compacto",
      formText: "Envía tu web. Revisamos oportunidades de visibilidad en IA y te contactamos en 3 días laborables.",
      submit: "Solicitar mi análisis GEO",
      fields: ["Nombre", "Empresa", "Correo electrónico", "URL del sitio web", "Mensaje"],
      faq: [
        ["¿Qué es GEO?", "GEO optimiza tu presencia online para visibilidad en respuestas generadas por IA."],
        ["¿Podéis garantizar menciones?", "No. Las plataformas deciden sus respuestas. GEO aumenta la probabilidad de que tu información sea clara y usable."],
        ["¿Qué plataformas miráis?", "ChatGPT, Gemini, Perplexity, Google AI Overviews y comportamiento de búsqueda con IA."],
      ],
    },
    "google-ads": {
      eyebrow: "Agencia Google Ads",
      title: "Campañas de Google Ads para leads, ventas y claridad",
      intro:
        "Creamos y optimizamos campañas de Google Ads con tracking claro, landings enfocadas y mejora continua. Search, Shopping, Performance Max y remarketing funcionan mejor cuando todo el embudo se mide.",
      primary: "Solicitar un análisis Google Ads gratis",
      sections: [
        ["Revisión de cuenta y tracking", "Revisamos conversiones, estructura, términos de búsqueda, presupuestos y páginas de destino."],
        ["Estrategia de campañas", "Definimos qué campañas merecen presupuesto y qué búsquedas o audiencias excluir."],
        ["Ajuste de landing", "Los anuncios funcionan cuando la página cumple la promesa. Revisamos mensaje, CTA y fricción."],
        ["Optimización mensual", "Mejoramos keywords, assets, presupuestos, datos de conversión e informes según rendimiento."],
      ],
      formTitle: "Recibe un análisis Google Ads compacto",
      formText: "Envía tu web o contexto de campañas. Te contactamos en un plazo de 3 días laborables.",
      submit: "Solicitar mi análisis Google Ads",
      fields: ["Nombre", "Empresa", "Correo electrónico", "URL del sitio web", "Mensaje"],
      faq: [
        ["¿Google Ads sirve para todas las empresas?", "Funciona mejor cuando hay demanda clara, una oferta medible y margen suficiente para aprender del tráfico."],
        ["¿Revisáis también landings?", "Sí. Una campaña solo es tan fuerte como la página a la que llegan los visitantes."],
        ["¿Podéis gestionar campañas existentes?", "Sí. Podemos auditar y mejorar cuentas existentes o crear una estructura nueva."],
      ],
    },
  },
} satisfies Record<RouteLocale, Record<LocalizedServiceKey, {
  eyebrow: string;
  title: string;
  intro: string;
  primary: string;
  sections: Array<[string, string]>;
  formTitle: string;
  formText: string;
  submit: string;
  fields: string[];
  faq: Array<[string, string]>;
}>>;

export function LocalizedServicePage({ language, service }: { language: RouteLocale; service: LocalizedServiceKey }) {
  const data = copy[language][service];
  const formId = `${language}-${service}-scan`;
  const pageSlug = `/${language}/${service}/`;

  return (
    <div className="focus-compact-page localized-service-page">
      <section className="section focus-premium-hero">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <a className="button primary" href="#scan">{data.primary}</a>
        </div>
        <div className="focus-premium-proof" aria-label={data.eyebrow}>
          {data.sections.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section focus-scan-form-section" id="scan">
        <div className="focus-scan-form-card">
          <div className="focus-form-panel">
            <p className="eyebrow">{data.primary}</p>
            <h2>{data.formTitle}</h2>
            <p>{data.formText}</p>
            <ScanForm fields={data.fields} formId={formId} pageSlug={pageSlug} pageTitle={data.formTitle} submitLabel={data.submit} />
          </div>
        </div>
      </section>

      <section className="section focus-faq-only">
        <div className="focus-faq-panel">
          <p className="eyebrow">FAQ</p>
          <h2>{language === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
          {data.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
