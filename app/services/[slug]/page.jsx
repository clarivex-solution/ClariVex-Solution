import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";


const services = {
  bookkeeping: {
    name: "Bookkeeping",
    description: "Expert outsourced bookkeeping services — clean transaction coding, ledger management, and management-ready financial statements.",
    details: [
      "Record day-to-day transactions with clean and consistent categorization.",
      "Maintain ledgers and schedules that support a reliable monthly close.",
      "Clean up historical entries and standardize chart-of-accounts structure.",
      "Deliver management-ready statements with practical commentary.",
    ],
    audience: ["Early-Stage Startups", "Growing SMBs", "Founder-Led Teams"],
  },
  reconciliation: {
    name: "Reconciliation",
    description: "Accurate bank, card, and payment reconciliation services to reduce reporting errors and strengthen financial controls.",
    details: [
      "Reconcile bank, card, and payment gateway balances every period.",
      "Investigate variances quickly and document corrective journal entries.",
      "Create repeatable reconciliation workflows with clear ownership.",
      "Reduce reporting errors before compliance and audit deadlines.",
    ],
    audience: ["Multi-Account Businesses", "High-Volume Operations", "Finance Controllers"],
  },
  "ap-support": {
    name: "AP Support",
    description: "End-to-end accounts payable support — invoice intake, coding, approval routing, and payment run management.",
    details: [
      "Manage invoice intake, coding, and approval routing from end to end.",
      "Track due dates and payment runs to protect vendor relationships.",
      "Improve payable aging visibility and working-capital discipline.",
      "Enforce controls for duplicate checks and unauthorized spend.",
    ],
    audience: ["Operations Teams", "Procurement-Heavy Businesses", "Scaling Back Offices"],
  },
  "ar-support": {
    name: "AR Support",
    description: "Accounts receivable management — accurate invoicing, proactive collections, and improved cash conversion cycles.",
    details: [
      "Create accurate invoices and maintain clean receivable ledgers.",
      "Run proactive collections workflows and customer follow-up schedules.",
      "Track overdue balances with structured escalation and notes.",
      "Improve cash conversion through disciplined AR reporting.",
    ],
    audience: ["Service Businesses", "B2B Companies", "Revenue Operations Teams"],
  },
  payroll: {
    name: "Payroll",
    description: "Outsourced payroll processing — accurate pay runs, compliance documentation, and management reporting.",
    details: [
      "Process payroll cycles accurately with documented approvals.",
      "Maintain payroll records, summaries, and compliance support files.",
      "Coordinate benefits, deductions, and statutory obligations on time.",
      "Provide clear payroll reports for management and audit readiness.",
    ],
    audience: ["Distributed Teams", "HR-Led Organizations", "Compliance-Focused Employers"],
  },
  "tax-planning": {
    name: "Tax Planning",
    description: "Strategic tax planning services — filing calendars, position reviews, and scenario-based tax impact analysis.",
    details: [
      "Build filing calendars and quarterly planning checklists.",
      "Review tax positions and reduce exposure with practical controls.",
      "Align transaction documentation for smoother return preparation.",
      "Support decision-making with scenario-based tax impact analysis.",
    ],
    audience: ["Founder-Led Businesses", "Profitable SMEs", "Cross-Border Operators"],
  },
  audit: {
    name: "Audit",
    description: "Audit preparation and support — audit-ready schedules, evidence organization, and post-audit control strengthening.",
    details: [
      "Prepare audit-ready schedules and reconciliations across key accounts.",
      "Organize support documentation for faster evidence requests.",
      "Address review queries with structured responses and tracking.",
      "Strengthen controls based on post-audit recommendations.",
    ],
    audience: ["Regulated Businesses", "Board-Reporting Teams", "Expanding Companies"],
  },
  advisory: {
    name: "Advisory",
    description: "Finance advisory services — KPI dashboards, cash runway modeling, and strategic recommendations for growth.",
    details: [
      "Translate financial statements into actionable management insights.",
      "Set KPI dashboards and cadence for leadership review meetings.",
      "Model cash runway, growth plans, and operational tradeoffs.",
      "Support strategic decisions with finance-first recommendations.",
    ],
    audience: ["Founders & CEOs", "Leadership Teams", "Growth-Stage Companies"],
  },
  "data-security": {
    name: "Data Security",
    description: "Finance data security services — secure workflows, role-based access controls, and compliance-aligned protocols.",
    details: [
      "Design secure workflows for handling sensitive finance data.",
      "Apply role-based access controls across systems and reports.",
      "Standardize backup, retention, and confidentiality protocols.",
      "Maintain documentation aligned with compliance expectations.",
    ],
    audience: ["Security-Conscious Firms", "Client-Data Heavy Teams", "Compliance-Driven Businesses"],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} Services | ClariVex`,
    description: service.description,
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
    openGraph: {
      title: `${service.name} Services | ClariVex Solutions`,
      description: service.description,
      url: `${siteUrl}/services/${slug}`,
      type: "website",
      siteName: "ClariVex Solutions",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} Services | ClariVex Solutions`,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  return (
    <main>
      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/#services" },
              { name: service.name },
            ]}
          />

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            {service.name} Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[#5a6478]">
            {service.description}
          </p>
        </div>
      </section>

      <section className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">What We Do</p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
                {service.name} for operational clarity and control
              </h2>

              <ul className="mt-8 space-y-4">
                {service.details.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#5a688e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">
                  Who This Is For
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {service.audience.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#5a688e]/20 bg-[#5a688e]/10 px-4 py-2 text-sm text-[#5a688e]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-[#f8f9fa] border border-[#e2e4e9] p-8 shadow-lg">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e]">
                  Get This Service
                </h3>
                <p className="mt-4 text-[#5a6478]">
                  Get dedicated support from ClariVex to execute {service.name.toLowerCase()}{" "}
                  with disciplined processes and practical reporting.
                </p>

                <Link
                  href="/#contact"
                  className="mt-8 block w-full rounded-xl bg-[#5a688e] py-4 text-center font-semibold text-white transition hover:bg-[#6aa595]"
                >
                  Book a Consultation
                </Link>

                <div className="mt-8 border-t border-[#e2e4e9] pt-6">
                  <p className="text-[#5a6478]">info@clarivex.net</p>
                  <p className="mt-2 text-[#5a6478]">+91 9898028812</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-16 sm:py-20 lg:py-32 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#5a6478]">
            Explore our other <Link href="/#services" className="text-[#6aa595] hover:underline">accounting services</Link> or read our latest <Link href="/blog" className="text-[#6aa595] hover:underline">blog insights</Link>.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex rounded-full bg-[#5a688e] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#6aa595]"
          >
            Talk to Experts
          </Link>
        </div>
      </section>
    </main>
  );
}
