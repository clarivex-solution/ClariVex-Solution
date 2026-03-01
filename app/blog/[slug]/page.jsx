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
    title: `${post.title} | ClariVex`,
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
    where: { status: "published", NOT: { slug } },
    take: 3,
    select: { slug: true, title: true },
  });

  return (
    <main className="bg-[#0d0f14] py-16 sm:py-20 lg:py-32 text-white">
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
              <h1 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl text-white md:text-5xl">
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

            {post.coverImage && (
              <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl">
                <img src={post.coverImage} alt={post.title} className="w-full h-56 md:h-72 object-cover" />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="mx-auto mt-8 max-w-3xl prose prose-invert prose-headings:font-[family-name:var(--font-playfair)] prose-headings:text-white prose-p:text-[#8892a4] prose-p:leading-relaxed max-w-none"
            />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl border border-[#1e2330] bg-[#13161e] p-6">
                <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-white">
                  Related Posts
                </h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
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
                  Book a Consultation
                </h2>
                <p className="mt-3 text-sm text-[#8892a4]">
                  Need support with accounting, payroll, or tax compliance? Speak with our
                  team.
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
