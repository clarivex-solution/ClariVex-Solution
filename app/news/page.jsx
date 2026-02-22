import NewsPageClient from "@/components/NewsPageClient";

export function generateMetadata() {
  return {
    title: "Finance & Tax News | ClariVex Solutions",
    description:
      "Daily accounting regulations and tax updates by country across US, UK, AU, and CA markets.",
  };
}

export default function NewsPage() {
  return <NewsPageClient />;
}

