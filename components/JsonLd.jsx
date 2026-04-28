import { siteUrl } from "@/lib/constants";

const CLARIVEX_ORG = {
  "@type": "Organization",
  name: "ClariVex Solution",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo-dark.png`,
  },
};

export function AccountingServiceSchema({ countryCode, content }) {
  const path = countryCode === "general" ? "" : `/${countryCode}`;
  const schema = content.schema || {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "ClariVex Solution",
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
      ? schema.areaServed.map((country) => ({
          "@type": "Country",
          name: country,
        }))
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

export function BlogPostingSchema({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedIsoDate || post.isoDate || "2026-03-01",
    dateModified:
      post.modifiedIsoDate ||
      post.publishedIsoDate ||
      post.isoDate ||
      "2026-03-01",
    author: {
      "@type": "Person",
      name: post.authorName || "ClariVex Team",
    },
    publisher: CLARIVEX_ORG,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    image: [post.seoImage || post.coverImage || `${siteUrl}/og-image.png`],
    articleSection: post.category,
    keywords: [post.category, post.country || "Global", "accounting", "finance"]
      .filter(Boolean)
      .join(", "),
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

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

export function BreadcrumbSchema({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
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

export function TestimonialsSchema({ testimonials, serviceUrl }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "ClariVex Solution",
    url: serviceUrl || siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(testimonials.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: { "@type": "Person", name: testimonial.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(testimonial.rating),
        bestRating: "5",
      },
      reviewBody: testimonial.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
