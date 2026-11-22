// Public identifier of Slimmer dan Gisteren's own website dataset.
export const metaPixelId = "2626092657841574";
export const marketingConsentKey = "sdg-marketing-consent-v1";
type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push: Pixel; loaded: boolean; version: string };
type PixelWindow = Window & { fbq?: Pixel; _fbq?: Pixel };
let permitted = false;
let initialized = false;
let viewed = false;
const sent = new Set<string>();
function eligible() {
  return typeof window !== "undefined" && ["slimmerdangisteren.nl", "www.slimmerdangisteren.nl"].includes(location.hostname)
    && /^\/klantwinst\/?$/.test(location.pathname)
    && !/[@]|%40|(?:email|name|token|password)=/i.test(location.search);
}
export function setMetaConsent(granted: boolean) {
  permitted = granted && eligible();
  const w = window as PixelWindow;
  if (!permitted) { w.fbq?.("consent", "revoke"); return; }
  if (!initialized) {
    initialized = true;
    if (!w.fbq) {
      const pixel = function (...args: unknown[]) { pixel.callMethod ? pixel.callMethod(...args) : pixel.queue.push(args); } as Pixel;
      pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = "2.0";
      w.fbq = pixel; w._fbq = pixel;
    }
    // Manual events only; no automatic button/form tracking or advanced matching.
    // The library is created only after explicit consent. Starting its queue
    // revoked can leave init behind the vendor's consent lock.
    w.fbq("consent", "grant");
    w.fbq("set", "autoConfig", false, metaPixelId);
    w.fbq("init", metaPixelId);
    const script = document.createElement("script");
    script.id = "sdg-meta-pixel"; script.async = true;
    script.dataset.status = "loading";
    script.onload = () => { script.dataset.status = "loaded"; };
    script.onerror = () => { script.dataset.status = "blocked"; };
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  w.fbq?.("consent", "grant");
  if (!viewed) { viewed = true; w.fbq?.("trackSingle", metaPixelId, "PageView"); }
}
export function metaWasInitialized() { return initialized; }
export function trackSavedApplication(reference: string) {
  // The receiver's opaque reference deduplicates successful retries. Never
  // queue a conversion before consent or replay one after later acceptance.
  if (!permitted || !eligible() || !/^KW-[a-f0-9-]{36}$/i.test(reference) || sent.has(reference)) return;
  sent.add(reference);
  (window as PixelWindow).fbq?.("trackSingle", metaPixelId, "Lead", { content_name: "Gratis Klantwinst-check" }, { eventID: reference });
}
export function clearMetaCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!["_fbp", "_fbc"].includes(name)) continue;
    for (const domain of ["", location.hostname, ".slimmerdangisteren.nl"]) document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax; Secure`;
  }
}
