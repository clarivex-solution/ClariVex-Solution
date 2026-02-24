import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  return generateCountryMetadata("ca");
}

export default function CAPage() {
  return (
    <SetCountryOnMount code="ca">
      <HomeContent />
    </SetCountryOnMount>
  );
}
