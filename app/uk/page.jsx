import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { siteUrl } from "@/lib/constants";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  const metadata = generateCountryMetadata("uk");
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/uk`,
    },
  };
}

export default function UKPage() {
  return (
    <SetCountryOnMount code="uk">
      <HomeContent />
    </SetCountryOnMount>
  );
}
