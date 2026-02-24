import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  return generateCountryMetadata("us");
}

export default function USPage() {
  return (
    <SetCountryOnMount code="us">
      <HomeContent />
    </SetCountryOnMount>
  );
}
