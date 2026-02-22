import Link from "next/link";
import { Calendar, User } from "lucide-react";

const countryLinks = [
  { label: "US\uD83C\uDDFA\uD83C\uDDF8", href: "/news?country=US" },
  { label: "UK\uD83C\uDDEC\uD83C\uDDE7", href: "/news?country=UK" },
  { label: "AU\uD83C\uDDE6\uD83C\uDDFA", href: "/news?country=AU" },
  { label: "CA\uD83C\uDDE8\uD83C\uDDE6", href: "/news?country=CA" },
];

const newsPosts = [
  {
    slug: "irs-updated-standard-mileage-rates-2025",
    title: "IRS Announces Updated Standard Mileage Rates for 2025",
    country: "US",
    date: "March 11, 2026",
    category: "Regulation Update",
  },
  {
    slug: "new-1099k-reporting-threshold-takes-effect",
    title: "New 1099-K Reporting Threshold Takes Effect",
    country: "US",
    date: "March 8, 2026",
    category: "Tax Compliance",
  },
  {
    slug: "small-business-tax-credits-extended-new-act",
    title: "Small Business Tax Credits Extended Under New Act",
    country: "US",
    date: "March 4, 2026",
    category: "Policy",
  },
  {
    slug: "hmrc-updates-mtd-itsa-timeline",
    title: "HMRC Updates MTD for Income Tax Self Assessment Timeline",
    country: "UK",
    date: "March 10, 2026",
    category: "Tax Compliance",
  },
  {
    slug: "national-insurance-changes-2025-26",
    title: "National Insurance Changes for 2025-26 Tax Year",
    country: "UK",
    date: "March 7, 2026",
    category: "Payroll",
  },
  {
    slug: "hmrc-launches-online-vat-account-features",
    title: "HMRC Launches New Online VAT Account Features",
    country: "UK",
    date: "March 3, 2026",
    category: "VAT",
  },
  {
    slug: "ato-guidance-contractor-vs-employee",
    title: "ATO Releases Guidance on Contractor vs Employee Classification",
    country: "AU",
    date: "March 9, 2026",
    category: "Regulation Update",
  },
  {
    slug: "super-guarantee-rate-increase-11-5-confirmed",
    title: "Super Guarantee Rate Increase to 11.5% Confirmed",
    country: "AU",
    date: "March 6, 2026",
    category: "Payroll",
  },
  {
    slug: "new-ato-small-business-support-measures",
    title: "New ATO Small Business Support Measures Announced",
    country: "AU",
    date: "March 2, 2026",
    category: "Policy",
  },
  {
    slug: "cra-updates-t4-reporting-requirements-2025",
    title: "CRA Updates T4 Reporting Requirements for 2025",
    country: "CA",
    date: "March 10, 2026",
    category: "Payroll",
  },
  {
    slug: "gst-hst-rate-changes-digital-services",
    title: "GST/HST Rate Changes for Digital Services",
    country: "CA",
    date: "March 7, 2026",
    category: "GST/HST",
  },
  {
    slug: "new-cra-my-business-account-features",
    title: "New CRA My Business Account Features Launched",
    country: "CA",
    date: "March 4, 2026",
    category: "Platform Update",
  },
];

function slugToTitleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolvePost(slug) {
  const found = newsPosts.find((item) => item.slug === slug);

  if (found) {
    return found;
  }

  return {
    slug,
    title: slugToTitleCase(slug),
    country: "Global",
    date: "February 22, 2026",
    category: "News",
  };
}

export function generateMetadata({ params }) {
  const post = resolvePost(params.slug);

  return {
    title: `${post.title} | ClariVex Solutions`,
    description:
      "Read country-specific finance, tax, and compliance updates curated by the ClariVex team.",
  };
}

export default function NewsArticlePage({ params }) {
  const post = resolvePost(params.slug);
  const moreNews = newsPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-[#0d0f14] py-16 sm:py-20 lg:py-32 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <Link
          href="/news"
          className="inline-flex items-center text-sm text-[#6aa595] transition-colors hover:text-white"
        >
          &larr; Back to News
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
                Regulatory updates are most useful when translated into practical operating
                steps. Finance teams should evaluate whether policy changes impact payroll
                configuration, filing schedules, or transaction coding logic.
              </p>
              <p>
                A structured response plan can reduce compliance risk. Assign ownership for
                reviewing technical guidance, update internal checklists, and align
                timelines across accounting, tax, and reporting workflows.
              </p>
              <p>
                Businesses that monitor updates proactively avoid last-minute filing issues
                and can protect reporting accuracy. This is especially important for
                multi-entity or multi-country operations with different regulatory clocks.
              </p>
              <p>
                ClariVex tracks country-level changes and helps teams operationalize them
                through clear controls, updated documentation, and routine monitoring.
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
                  Filter by Country
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {countryLinks.map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="rounded-full border border-[#1e2330] bg-[#0d0f14] px-3 py-1 text-xs text-[#8892a4] transition-colors hover:text-white"
                    >
                      {country.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
