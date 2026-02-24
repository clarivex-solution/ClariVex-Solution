import { blogPosts } from "@/lib/blogData";
import { siteUrl } from "@/lib/constants";
import { newsPosts } from "@/lib/newsData";

const services = [
  "bookkeeping",
  "reconciliation",
  "ap-support",
  "ar-support",
  "payroll",
  "tax-planning",
  "audit",
  "advisory",
  "data-security",
];

export default function sitemap() {
  const staticRoutes = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" },
    { url: `${siteUrl}/us`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/uk`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/au`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/ca`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/news`, priority: 0.8, changeFrequency: "weekly" },
  ];

  const serviceRoutes = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const newsRoutes = newsPosts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...newsRoutes];
}
