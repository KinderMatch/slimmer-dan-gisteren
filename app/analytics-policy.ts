// Filled only with the verified measurement ID of this website's own GA4 stream.
export const measurementId: string = "G-LFP82JX4VC";
export const consentKey = "sdg-analytics-consent-v1";
export const consentLifetime = 180 * 24 * 60 * 60 * 1000;

export function publicPath(path: string) {
  return /^\/(?:en\/|es\/)?(?:(?:seo\/(?:zoekwoordenonderzoek\/|technische-seo\/)?|geo\/|google-ads\/|social-ads\/|content-creatie\/|website\/|privacy\/|algemene-voorwaarden\/))?$/.test(path);
}

export function readConsent(raw: string | null, now = Date.now()): boolean | null {
  try {
    const data = JSON.parse(raw ?? "null");
    return typeof data?.allowed === "boolean" && typeof data?.at === "number" && data.at <= now && now - data.at < consentLifetime ? data.allowed : null;
  } catch { return null; }
}

// Never send query strings, fragments, phone numbers, email bodies or user input.
export function destination(href: string, origin: string) {
  try {
    const url = new URL(href, origin);
    if (url.protocol === "mailto:") return { target: "email", method: "email" };
    if (url.protocol === "tel:") return { target: "phone", method: "phone" };
    if (!["https:", "http:"].includes(url.protocol)) return { target: "other", method: "" };
    if (["wa.me", "api.whatsapp.com"].includes(url.hostname)) return { target: "whatsapp", method: "whatsapp" };
    if (url.hostname === "calendly.com") return { target: "appointment", method: "appointment" };
    if (url.origin === origin) return { target: publicPath(url.pathname) ? url.pathname : "internal", method: "" };
    return { target: url.hostname, method: "" };
  } catch { return { target: "other", method: "" }; }
}

export function safeLabel(text: string) {
  return text.replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[email]")
    .replace(/\+?\d[\d\s().-]{6,}\d/g, "[phone]").replace(/\s+/g, " ").trim().slice(0, 90);
}
