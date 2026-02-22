import BlogPageClient from "@/components/BlogPageClient";

export function generateMetadata() {
  return {
    title: "Accounting & Finance Blog | ClariVex Solutions",
    description:
      "Insights on bookkeeping, payroll, tax compliance, and finance operations for US, UK, AU, and CA businesses.",
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}
