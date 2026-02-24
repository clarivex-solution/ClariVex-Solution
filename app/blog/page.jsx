import BlogPageClient from "@/components/BlogPageClient";
import { siteUrl } from "@/lib/constants";

export function generateMetadata() {
  return {
    title: "Accounting & Finance Blog | ClariVex",
    description:
      "Expert insights on bookkeeping, payroll, tax compliance, and finance operations for US, UK, AU, and CA businesses.",
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: "Accounting & Finance Blog | ClariVex Solutions",
      description: "Expert insights on bookkeeping, payroll, tax compliance, and finance operations.",
      url: `${siteUrl}/blog`,
      type: "website",
      siteName: "ClariVex Solutions",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}
