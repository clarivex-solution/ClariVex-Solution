import { siteUrl } from "@/lib/constants";
import { newsPosts as newsData } from "@/lib/newsData";
import { prisma } from "@/lib/prisma";

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

export default async function sitemap() {
  const now = new Date().toISOString();
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes = [
    { url: siteUrl, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${siteUrl}/us`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/uk`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/au`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/ca`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/blog`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/news`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
  ];

  const serviceRoutes = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || now,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const newsRoutes = newsData.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: post.isoDate || now,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...newsRoutes];
}
