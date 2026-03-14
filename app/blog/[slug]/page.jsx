export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import { BlogPostingSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { extractHeadings, injectHeadingIds } from "@/utils/extractHeadings";
import { calculateReadingTime } from "@/utils/readingTime";
import { Calendar, Clock3, User } from "lucide-react";
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
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
              <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-[#1a1a2e] md:text-5xl lg:text-6xl">
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

            <div className="mx-auto mt-8 max-w-3xl lg:hidden">
              <TableOfContents headings={post.headings} />
            </div>

            <div className="mx-auto mt-10 max-w-3xl rounded-[28px] border border-[#e2e4e9] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div
                className={`
                  prose lg:prose-lg max-w-none text-[#5a6478]
                  [&_h1]:font-[family-name:var(--font-playfair)] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#1a1a2e] [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:leading-tight
                  [&_h2]:scroll-mt-28 [&_h2]:border-t [&_h2]:border-[#e2e4e9] [&_h2]:pt-8 [&_h2]:font-[family-name:var(--font-playfair)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a2e] [&_h2]:mt-12 [&_h2]:mb-4
                  [&_h3]:scroll-mt-28 [&_h3]:font-[family-name:var(--font-playfair)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1a1a2e] [&_h3]:mt-8 [&_h3]:mb-3
                  [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-[#1a1a2e] [&_h4]:mt-6 [&_h4]:mb-2
                  [&_p]:text-[#5a6478] [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:text-base
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
                  [&_li]:text-[#5a6478] [&_li]:mb-2 [&_li]:leading-relaxed
                  [&_li>p]:mb-0
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#6aa595] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#5a6478] [&_blockquote]:my-6 [&_blockquote]:bg-[#f8f9fa] [&_blockquote]:py-3 [&_blockquote]:rounded-r-lg
                  [&_strong]:font-semibold [&_strong]:text-[#1a1a2e]
                  [&_em]:italic [&_em]:text-[#5a6478]
                  [&_u]:underline [&_u]:underline-offset-2
                  [&_a]:text-[#6aa595] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#1a1a2e]
                  [&_hr]:border-[#e2e4e9] [&_hr]:my-8
                  [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:my-6
                  [&_pre]:bg-[#1a1a2e] [&_pre]:text-white [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:my-6
                  [&_code]:bg-[#f8f9fa] [&_code]:text-[#1a1a2e] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                `}
              >
                <div dangerouslySetInnerHTML={{ __html: post.renderedContent }} />
              </div>
            </div>
          </article>

          <aside className="hidden lg:block">
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
