import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  return generateCountryMetadata("au");
}

export default function AUPage() {
  return (
    <SetCountryOnMount code="au">
      <HomeContent />
    </SetCountryOnMount>
  );
}
