import { siteUrl } from "@/lib/constants";

// Shared org object — reused across all schemas to avoid duplication
const CLARIVEX_ORG = {
  "@type": "Organization",
  name: "ClariVex Solutions",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
  },
};

/**
 * AccountingService JSON-LD for homepage and country pages.
 */
export function AccountingServiceSchema({ countryCode, content }) {
  const path = countryCode === "general" ? "" : `/${countryCode}`;
  const schema = content.schema || {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "ClariVex Solutions",
    description: content.seo.description,
    url: `${siteUrl}${path}`,
    telephone: schema.telephone || "+919898028812",
    email: schema.email || "info@clarivex.net",
    address: {
      "@type": "PostalAddress",
      streetAddress: "421, Shivalik Shilp, Iscon Cross Road, S.G. Highway",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380058",
      addressCountry: "IN",
    },
    areaServed: Array.isArray(schema.areaServed)
      ? schema.areaServed.map((c) => ({ "@type": "Country", name: c }))
      : { "@type": "Country", name: schema.areaServed || "US" },
    priceRange: "$$",
    image: `${siteUrl}/og-image.png`,
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * BlogPosting JSON-LD for individual blog posts.
 */
export function BlogPostingSchema({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate || "2026-03-01",
    dateModified: post.isoDate || "2026-03-01",
    author: CLARIVEX_ORG,
    publisher: CLARIVEX_ORG,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    image: post.coverImage || `${siteUrl}/og-image.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * NewsArticle JSON-LD for individual news posts.
 */
export function NewsArticleSchema({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.isoDate || "2026-03-01",
    dateModified: post.isoDate || "2026-03-01",
    author: CLARIVEX_ORG,
    publisher: CLARIVEX_ORG,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * BreadcrumbList JSON-LD.
 */
export function BreadcrumbSchema({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * AggregateRating + Review schema for testimonials section.
 * Add to homepage and country pages.
 */
export function TestimonialsSchema({ testimonials, serviceUrl }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "ClariVex Solutions",
    "url": serviceUrl || siteUrl,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": String(testimonials.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewRating": { "@type": "Rating", "ratingValue": String(t.rating), "bestRating": "5" },
      "reviewBody": t.text,
    }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
