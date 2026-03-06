import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { siteUrl } from "@/lib/constants";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  const metadata = generateCountryMetadata("au");
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/au`,
    },
  };
}

export default function AUPage() {
  return (
    <SetCountryOnMount code="au">
      <HomeContent />
    </SetCountryOnMount>
  );
}
