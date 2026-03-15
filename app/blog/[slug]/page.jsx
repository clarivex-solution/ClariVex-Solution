export const dynamic = "force-dynamic";

import TableOfContents from "@/components/blog/TableOfContents";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BlogPostingSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { extractHeadings, injectHeadingIds } from "@/utils/extractHeadings";
import { calculateReadingTime } from "@/utils/readingTime";
import { Calendar, ChevronRight, Clock3, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const BLOG_AUTHOR_NAME = "ClariVex Team";
const FALLBACK_BLOG_IMAGE = `${siteUrl}/og-image.png`;

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function getPublishedPost(slug) {
  return prisma.blog.findFirst({
    where: { slug, status: "published" },
  });
}

function buildPostViewModel(dbPost) {
  const publishedAt = dbPost.publishedAt || dbPost.createdAt;
  const renderedContent = injectHeadingIds(dbPost.content || "");
  const headings = extractHeadings(renderedContent);

  return {
    ...dbPost,
    authorName: BLOG_AUTHOR_NAME,
    publishedIsoDate: publishedAt ? publishedAt.toISOString() : undefined,
    modifiedIsoDate: dbPost.updatedAt ? dbPost.updatedAt.toISOString() : undefined,
    date: formatDate(publishedAt),
    readingTime: calculateReadingTime(dbPost.content),
    headings,
    renderedContent,
    seoImage: dbPost.coverImage || FALLBACK_BLOG_IMAGE,
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dbPost = await getPublishedPost(slug);

  if (!dbPost) {
    return { title: "Post Not Found" };
  }

  const post = buildPostViewModel(dbPost);

  return {
    title: `${post.title} | ClariVex Blog`,
    description: post.excerpt,
    keywords: [
      post.category,
      post.country ? `${post.country} accounting` : "accounting",
      "finance",
      "bookkeeping",
      "ClariVex",
    ].join(", "),
    authors: [{ name: post.authorName, url: siteUrl }],
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedIsoDate,
      modifiedTime: post.modifiedIsoDate,
      authors: [post.authorName],
      section: post.category,
      tags: [post.category, post.country ? `${post.country} accounting` : "accounting", "finance"],
      siteName: "ClariVex Solution",
      images: [
        {
          url: post.seoImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.seoImage],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const dbPost = await getPublishedPost(slug);

  if (!dbPost) {
    notFound();
  }

  const post = buildPostViewModel(dbPost);

  const relatedPosts = await prisma.blog.findMany({
    where: { status: "published", NOT: { slug }, category: post.category },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, category: true },
  });

  if (relatedPosts.length < 3) {
    const needed = 3 - relatedPosts.length;
    const usedSlugs = [slug, ...relatedPosts.map((item) => item.slug)];
    const fill = await prisma.blog.findMany({
      where: { status: "published", NOT: { slug: { in: usedSlugs } } },
      take: needed,
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, category: true },
    });

    relatedPosts.push(...fill);
  }

  return (
    <main className="bg-[#f8f9fa] py-16 text-[#1a1a2e] sm:py-20 lg:py-32">
      <BlogPostingSchema post={post} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        {/* Change grid to single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start mt-10">
          <div>
            <header className="mx-auto max-w-4xl">
              <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                <span className="rounded-full bg-[#6aa595]/10 px-3 py-1">{post.category}</span>
                {post.country && post.country !== "All" ? (
                  <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-[#5a688e]">
                    {post.country}
                  </span>
                ) : null}
              </div>
              <h1 className="font-[family-name:var(--font-playfair)] font-black text-3xl sm:text-4xl lg:text-5xl text-[#1a1a2e] leading-tight mt-4">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5a6478] md:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#8892a4]">
                <span className="inline-flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.authorName}
                </span>
                <time dateTime={post.publishedIsoDate} className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </time>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </div>
            </header>

            {/* Table of Contents — sidebar on desktop, collapsible on mobile */}
            <div className="lg:hidden mb-8 mt-8">
              <details className="rounded-xl border border-[#e2e4e9] bg-white overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-[#1a1a2e] text-sm list-none">
                  Table of Contents
                  <ChevronRight className="h-4 w-4 text-[#6aa595] transition-transform duration-200 [[open]_&]:rotate-90" />
                </summary>
                <div className="px-5 pb-4 border-t border-[#e2e4e9]">
                  <TableOfContents headings={post.headings} />
                </div>
              </details>
            </div>

            <section className="mt-10">
              <div className="bg-white border rounded-2xl shadow-sm p-5 sm:p-8 lg:p-10 px-4 sm:px-8">
                <article
                  className={`
                    px-0 sm:px-0 max-w-none prose prose-slate lg:prose-lg text-[#5a6478]
                    [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-[family-name:var(--font-playfair)] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-[#1a1a2e]
                    [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:ml-0 [&_h2]:scroll-mt-28 [&_h2]:font-[family-name:var(--font-playfair)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a2e]
                    [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:ml-0 [&_h3]:scroll-mt-28 [&_h3]:font-[family-name:var(--font-playfair)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1a1a2e]
                    [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-semibold [&_h4]:text-[#1a1a2e]
                    [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[#5a6478]
                    [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6
                    [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
                    [&_li]:mb-2 [&_li]:leading-relaxed [&_li]:text-[#5a6478]
                    [&_li>p]:mb-0
                    [&_blockquote]:my-6 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[#6aa595] [&_blockquote]:bg-[#f8f9fa] [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#5a6478]
                    [&_strong]:font-semibold [&_strong]:text-[#1a1a2e]
                    [&_em]:italic [&_em]:text-[#5a6478]
                    [&_u]:underline [&_u]:underline-offset-2
                    [&_a]:text-[#6aa595] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#1a1a2e]
                    [&_hr]:mx-0 [&_hr]:my-8 [&_hr]:border-[#e2e4e9]
                    [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-2xl
                    [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#1a1a2e] [&_pre]:p-5 [&_pre]:text-sm [&_pre]:text-white
                    [&_code]:rounded [&_code]:bg-[#f8f9fa] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-[#1a1a2e]
                  `}
                >
                  <div dangerouslySetInnerHTML={{ __html: post.renderedContent }} />
                </article>
              </div>
            </section>
          </div>

          {/* Sidebar — hidden on mobile, visible lg+ */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="sticky top-28 space-y-6">
              <TableOfContents headings={post.headings} />

              <div className="rounded-2xl border border-[#e2e4e9] bg-white p-6 shadow-sm">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1a1a2e]">
                  Related Posts
                </h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="block border-b border-[#e2e4e9] py-2 text-sm leading-snug text-[#5a6478] transition-colors last:border-0 hover:text-[#6aa595]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#1a1a2e] p-6">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                  Book a Consultation
                </h2>
                <p className="mt-3 text-sm text-[#8892a4]">
                  Need support with accounting, payroll, or tax compliance? Speak with our team.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex rounded-full bg-[#6aa595] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a688e]"
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
