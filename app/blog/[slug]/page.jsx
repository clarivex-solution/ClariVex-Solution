export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/Breadcrumbs";
import { BlogPostingSchema } from "@/components/JsonLd";
import { siteUrl } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.blog.findFirst({
    where: { slug, status: "published" },
  });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      siteName: "ClariVex Solutions",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const dbPost = await prisma.blog.findFirst({
    where: { slug, status: "published" },
  });

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

  const relatedPosts = await prisma.blog.findMany({
    where: { status: 'published', NOT: { slug }, category: post.category },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    select: { slug: true, title: true, category: true }
  })

  if (relatedPosts.length < 3) {
    const needed = 3 - relatedPosts.length
    const usedSlugs = [slug, ...relatedPosts.map(p => p.slug)]
    const fill = await prisma.blog.findMany({
      where: { status: 'published', NOT: { slug: { in: usedSlugs } } },
      take: needed,
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, category: true }
    })
    relatedPosts.push(...fill)
  }

  return (
    <main className="bg-[#f8f9fa] py-16 sm:py-20 lg:py-32 text-[#1a1a2e]">
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
            <header className="mx-auto max-w-3xl">
              <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
              <span className="rounded-full bg-[#5a688e]/10 px-3 py-1 text-xs text-[#6aa595]">
                {post.category}
              </span>
              <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl text-[#1a1a2e] md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#8892a4]">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  ClariVex Team
                </span>
                <time dateTime={post.isoDate} className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </time>
              </div>
            </header>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className={`
                mx-auto mt-8 max-w-3xl
                [&_h1]:font-[family-name:var(--font-playfair)] [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#1a1a2e] [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:leading-tight
                [&_h2]:font-[family-name:var(--font-playfair)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a2e] [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:font-[family-name:var(--font-playfair)] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1a1a2e] [&_h3]:mt-8 [&_h3]:mb-3
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
                [&_img]:rounded-xl [&_img]:max-w-full [&_img]:my-6
                [&_pre]:bg-[#1a1a2e] [&_pre]:text-white [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:my-6
                [&_code]:bg-[#f8f9fa] [&_code]:text-[#1a1a2e] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
              `}
            />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-2xl border border-[#e2e4e9] p-6 shadow-sm">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="text-[#1a1a2e] font-bold text-lg mb-4 font-[family-name:var(--font-playfair)]">
                  Related Posts
                </h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="block text-[#5a6478] hover:text-[#6aa595] text-sm leading-snug py-2 border-b border-[#e2e4e9] last:border-0"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1a2e] rounded-2xl p-6 mt-4">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                  Book a Consultation
                </h2>
                <p className="mt-3 text-sm text-[#8892a4]">
                  Need support with accounting, payroll, or tax compliance? Speak with our
                  team.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex bg-[#6aa595] text-white rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#5a688e]"
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
