import { SeoLanding, landingMetadata } from "../landing";
export const metadata = landingMetadata("local", "nl");
export default function Page() { return <SeoLanding topic="local" locale="nl" />; }
