import Link from "next/link";
import { notFound } from "next/navigation";

const slugTitleOverrides = {
  "ap-support": "AP Support",
  "ar-support": "AR Support",
};

const services = {
  bookkeeping: {
    name: "Bookkeeping",
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
    details: [
      "Design secure workflows for handling sensitive finance data.",
      "Apply role-based access controls across systems and reports.",
      "Standardize backup, retention, and confidentiality protocols.",
      "Maintain documentation aligned with compliance expectations.",
    ],
    audience: ["Security-Conscious Firms", "Client-Data Heavy Teams", "Compliance-Driven Businesses"],
  },
};

function slugToTitle(slug) {
  if (slugTitleOverrides[slug]) {
    return slugTitleOverrides[slug];
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const serviceName = services[slug]?.name ?? slugToTitle(slug);

  return {
    title: `${serviceName} | ClariVex Solutions`,
    description: `Learn how ClariVex delivers ${serviceName.toLowerCase()} services for modern finance teams.`,
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
          <div className="text-sm text-[#5a6478]">
            <Link href="/" className="transition-colors hover:text-[#1a1a2e]">
              Home
            </Link>
            <span className="mx-2">{"\u2192"}</span>
            <Link href="/#services" className="transition-colors hover:text-[#1a1a2e]">
              Services
            </Link>
            <span className="mx-2">{"\u2192"}</span>
            <span>{service.name}</span>
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            {service.name}
          </h1>
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
