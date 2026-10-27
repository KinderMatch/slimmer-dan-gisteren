import { SeoLanding, landingMetadata } from "../../../seo/landing";
export const metadata = landingMetadata("local", "es");
export default function Page() { return <SeoLanding topic="local" locale="es" />; }
