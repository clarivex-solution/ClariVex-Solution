import HomeContent from "@/components/HomeContent";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  return generateCountryMetadata("general");
}

export default function Home() {
  return <HomeContent />;
}
