import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  return generateCountryMetadata("uk");
}

export default function UKPage() {
  return (
    <SetCountryOnMount code="uk">
      <HomeContent />
    </SetCountryOnMount>
  );
}
