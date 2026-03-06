import HomeContent from "@/components/HomeContent";
import SetCountryOnMount from "@/components/SetCountryOnMount";
import { siteUrl } from "@/lib/constants";
import { generateCountryMetadata } from "@/lib/countryContent";

export function generateMetadata() {
  const metadata = generateCountryMetadata("us");
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/us`,
    },
  };
}

export default function USPage() {
  return (
    <SetCountryOnMount code="us">
      <HomeContent />
    </SetCountryOnMount>
  );
}
