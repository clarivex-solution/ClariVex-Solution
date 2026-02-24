import Breadcrumbs from "@/components/Breadcrumbs";
import { NewsArticleSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/constants";
import { newsPosts } from "@/lib/newsData";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);

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
      publishedTime: post.isoDate,
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
  const post = newsPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const moreNews = newsPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

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
              <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                {post.category}
              </span>
              <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl text-white md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#8892a4]">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.source}
                </span>
                <time dateTime={post.isoDate} className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </time>
              </div>
            </header>

            <div className="mx-auto mt-8 max-w-3xl space-y-5 leading-relaxed text-[#8892a4]">
              <p>
                Regulatory updates are most useful when translated into practical operating
                steps. Finance teams should evaluate whether policy changes impact payroll
                configuration, filing schedules, or transaction coding logic.
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                What This Means for Your Business
              </h2>
              <p>
                A structured response plan can reduce compliance risk. Assign ownership for
                reviewing technical guidance, update internal checklists, and align
                timelines across accounting, tax, and reporting workflows.
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                How ClariVex Can Help
              </h2>
              <p>
                Businesses that monitor updates proactively avoid last-minute filing issues
                and can protect reporting accuracy. ClariVex tracks country-level changes
                and helps teams operationalize them through clear controls, updated
                documentation, and routine monitoring.
              </p>
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
