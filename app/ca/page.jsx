import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { siteUrl } from "@/lib/constants";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  const metadata = generateCountryMetadata("ca");
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/ca`,
    },
  };
}

export default function CAPage() {
  return (
    <SetCountryOnMount code="ca">
      <HomeContent />
    </SetCountryOnMount>
  );
}
