import Link from "next/link";
import { Calendar, User } from "lucide-react";

const blogPosts = [
  {
    slug: "quickbooks-tips-us-small-business",
    title: "5 QuickBooks Tips Every US Small Business Should Know",
    category: "Bookkeeping",
    date: "March 12, 2026",
  },
  {
    slug: "understanding-mtd-uk-businesses-2025",
    title: "Understanding MTD: What UK Businesses Need to Know in 2025",
    category: "Tax & Compliance",
    date: "March 9, 2026",
  },
  {
    slug: "bas-lodgement-checklist-australia",
    title: "BAS Lodgement Checklist for Australian Businesses",
    category: "Tax & Compliance",
    date: "March 5, 2026",
  },
  {
    slug: "gst-hst-filing-guide-canada-small-business",
    title: "GST/HST Filing Guide for Canadian Small Businesses",
    category: "Tax & Compliance",
    date: "March 2, 2026",
  },
  {
    slug: "streamline-payroll-growing-teams",
    title: "How to Streamline Payroll for Growing Teams",
    category: "Payroll",
    date: "February 27, 2026",
  },
  {
    slug: "month-end-close-step-by-step-checklist",
    title: "Month-End Close: A Step-by-Step Checklist",
    category: "Bookkeeping",
    date: "February 22, 2026",
  },
];

const categoryBadgeClass = {
  Bookkeeping: "bg-blue-50 text-blue-700 border-blue-200",
  "Tax & Compliance": "bg-amber-50 text-amber-700 border-amber-200",
  Payroll: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Advisory: "bg-purple-50 text-purple-700 border-purple-200",
};

function slugToTitleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolvePost(slug) {
  const found = blogPosts.find((post) => post.slug === slug);

  if (found) {
    return found;
  }

  return {
    slug,
    title: slugToTitleCase(slug),
    category: "Advisory",
    date: "February 22, 2026",
  };
}

export function generateMetadata({ params }) {
  const post = resolvePost(params.slug);

  return {
    title: `${post.title} | ClariVex Solutions`,
    description: `Read ClariVex insights on ${post.category.toLowerCase()} and financial operations best practices.`,
  };
}

export default function BlogArticlePage({ params }) {
  const post = resolvePost(params.slug);
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-white py-12 text-[#1E293B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          &larr; Back to Blog
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article>
            <header className="mx-auto max-w-3xl">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                  categoryBadgeClass[post.category]
                }`}
              >
                {post.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-[#0A1628] md:text-4xl">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
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

            <div className="mx-auto mt-8 max-w-3xl prose prose-slate">
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
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-[#0A1628]">Related Posts</h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="block text-sm font-medium text-slate-700 transition hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-blue-600 p-6 text-white">
                <h3 className="text-lg font-semibold">Book a Consultation</h3>
                <p className="mt-2 text-sm text-blue-100">
                  Need support with accounting, payroll, or tax compliance? Speak with our
                  team.
                </p>
                <Link
                  href="/#contact"
                  className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
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
