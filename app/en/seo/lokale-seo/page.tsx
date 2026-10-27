import { SeoLanding, landingMetadata } from "../../../seo/landing";
export const metadata = landingMetadata("local", "en");
export default function Page() { return <SeoLanding topic="local" locale="en" />; }
