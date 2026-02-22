const siteUrl = "https://clarivex.net";

const sitemapRoutes = [
  { path: "/", priority: 1.0 },
  { path: "/us", priority: 0.9 },
  { path: "/uk", priority: 0.9 },
  { path: "/au", priority: 0.9 },
  { path: "/ca", priority: 0.9 },
  { path: "/blog", priority: 0.7 },
  { path: "/news", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();

  return sitemapRoutes.map((item) => ({
    url: `${siteUrl}${item.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: item.priority,
  }));
}
