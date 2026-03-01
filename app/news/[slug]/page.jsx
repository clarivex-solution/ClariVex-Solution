export const dynamic = 'force-dynamic';

import Breadcrumbs from "@/components/Breadcrumbs";
import { NewsArticleSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.newsArticle.findUnique({ where: { slug } });

  if (!post) {
    return { title: "News Not Found" };
  }

  return {
    title: `${post.title} | ClariVex`,
    description: post.summary,
    alternates: {
      canonical: `${siteUrl}/news/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteUrl}/news/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      siteName: "ClariVex Solutions",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const dbPost = await prisma.newsArticle.findUnique({ where: { slug } });

  if (!dbPost) {
    notFound();
  }

  const post = {
    ...dbPost,
    isoDate: dbPost.publishedAt ? dbPost.publishedAt.toISOString() : undefined,
    date: dbPost.publishedAt
      ? new Date(dbPost.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "",
  };

  const moreNews = await prisma.newsArticle.findMany({
    where: { NOT: { slug }, country: post.country },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, country: true, category: true }
  })

  if (moreNews.length < 3) {
    const needed = 3 - moreNews.length
    const usedSlugs = [slug, ...moreNews.map(n => n.slug)]
    const fill = await prisma.newsArticle.findMany({
      where: { NOT: { slug: { in: usedSlugs } }, category: post.category },
      take: needed,
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, country: true, category: true }
    })
    moreNews.push(...fill)
  }

  return (
    <main className="bg-[#0d0f14] py-16 sm:py-20 lg:py-32 text-white">
      <NewsArticleSchema post={post} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "News", href: "/news" },
            { name: post.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
            <header className="mx-auto max-w-3xl">
              <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                  {post.category}
                </span>
                {post.country && post.country !== "All" && post.country !== "General" && (
                  <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#5a688e]">
                    {post.country}
                  </span>
                )}
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl text-white md:text-5xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-[#1e2330] pb-6">
                <div>
                  <p className="text-xs text-[#5a688e] uppercase tracking-wider mb-1">Source</p>
                  <p className="text-base font-medium text-white flex items-center gap-2">
                    {post.source}
                  </p>
                </div>
                <div className="w-px h-8 bg-[#1e2330]" />
                <div>
                  <p className="text-xs text-[#5a688e] uppercase tracking-wider mb-1">Published</p>
                  <time dateTime={post.isoDate} className="text-base text-white flex items-center gap-2">
                    {post.date}
                  </time>
                </div>
              </div>
            </header>

            <div className="mx-auto mt-8 max-w-3xl space-y-5 leading-relaxed text-[#8892a4]">
              <p className="text-lg text-white/90 leading-relaxed font-medium">{post.summary}</p>

              <p className="mt-4 text-xs text-[#8892a4] italic">
                This article is sourced from {post.source}. Click below to read the complete article on their official website.
              </p>

              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5a688e] px-6 py-2.5 text-sm text-white hover:bg-[#6aa595] transition-colors"
                >
                  {"Read Full Article \u2192"}
                </a>
              )}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl border border-[#1e2330] bg-[#13161e] p-6">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                  More News
                </h2>
                <div className="mt-4 space-y-3">
                  {moreNews.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="block text-sm text-[#8892a4] transition-colors hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#1e2330] bg-[#13161e] p-6">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                  Get Expert Support
                </h2>
                <p className="mt-3 text-sm text-[#8892a4]">
                  Need help navigating these changes? Our team can assist with compliance.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex rounded-full bg-[#5a688e] px-5 py-2 text-sm text-white transition-colors hover:bg-[#6aa595]"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
