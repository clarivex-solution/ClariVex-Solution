import NewsPageClient from "@/components/NewsPageClient";
import { siteUrl } from "@/lib/constants";

export function generateMetadata() {
  return {
    title: "Finance & Tax News | ClariVex",
    description:
      "Daily accounting regulations and tax updates for US, UK, AU, and CA markets curated by the ClariVex team.",
    alternates: {
      canonical: `${siteUrl}/news`,
    },
    openGraph: {
      title: "Finance & Tax News | ClariVex Solutions",
      description: "Daily accounting regulations and tax updates for US, UK, AU, and CA markets.",
      url: `${siteUrl}/news`,
      type: "website",
      siteName: "ClariVex Solutions",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default function NewsPage() {
  return <NewsPageClient />;
}
