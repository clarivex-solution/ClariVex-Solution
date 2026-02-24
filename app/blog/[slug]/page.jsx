import { blogPosts } from "@/lib/blogData";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | ClariVex Solutions" };
  }

  return {
    title: `${post.title} | ClariVex Solutions`,
    description: `Read ClariVex insights on ${post.category.toLowerCase()} and financial operations best practices.`,
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-[#0d0f14] py-16 sm:py-20 lg:py-32 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-[#6aa595] transition-colors hover:text-white"
        >
          &larr; Back to Blog
        </Link>

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
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
              </div>
            </header>

            <div className="mx-auto mt-8 max-w-3xl space-y-5 leading-relaxed text-[#8892a4]">
              <p>
                Consistent accounting routines are one of the fastest ways for leadership
                teams to improve confidence in decision-making. A reliable reporting cycle
                reduces surprises and helps finance teams focus on analysis instead of
                rework.
              </p>
              <p>
                Start by standardizing transaction coding, reconciliation checkpoints, and
                month-end responsibilities. When every step has clear ownership, teams can
                close faster and maintain cleaner books throughout the year.
              </p>
              <p>
                Compliance readiness improves when documentation is organized in real time.
                Keeping payroll records, tax support files, and audit trails updated each
                month minimizes risk and reduces pressure during filing deadlines.
              </p>
              <p>
                The strongest finance operations pair technical accuracy with actionable
                management insights. ClariVex frameworks are built to turn accounting data
                into practical decisions that support sustainable growth.
              </p>
            </div>
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
