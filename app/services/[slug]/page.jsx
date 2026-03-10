import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const services = {
  bookkeeping: {
    name: "Bookkeeping", description: "Expert outsourced bookkeeping services — clean transaction coding, ledger management, and management-ready financial statements.",
    details: ["Record day-to-day transactions with clean and consistent categorization.","Maintain ledgers and schedules that support a reliable monthly close.","Clean up historical entries and standardize chart-of-accounts structure.","Deliver management-ready statements with practical commentary."],
    benefits: [{ title: "Always Audit-Ready", desc: "Books maintained to a standard that passes internal and external review without scrambling." },{ title: "Month-End Clarity", desc: "Reliable close every period — no surprises, no rework, no delays to reporting." },{ title: "Decision-Ready Data", desc: "Management accounts that tell you where the business actually stands." }],
    process: [{ step: "01", title: "Data Access Setup", desc: "We connect to your accounting system and establish secure access protocols." },{ step: "02", title: "Chart of Accounts Review", desc: "We standardize your COA structure for consistent categorization going forward." },{ step: "03", title: "Ongoing Transaction Coding", desc: "Daily or weekly entries processed with documented coding rules." },{ step: "04", title: "Monthly Close & Reporting", desc: "Ledger reconciliation, statement prep, and management commentary delivered on schedule." }],
    stats: [{ value: "99%", label: "Accuracy Rate" },{ value: "5 days", label: "Monthly Close" },{ value: "100%", label: "Audit-Ready" }],
    audience: ["Early-Stage Startups","Growing SMBs","Founder-Led Teams"],
  },
  reconciliation: {
    name: "Reconciliation", description: "Accurate bank, card, and payment reconciliation services to reduce reporting errors and strengthen financial controls.",
    details: ["Reconcile bank, card, and payment gateway balances every period.","Investigate variances quickly and document corrective journal entries.","Create repeatable reconciliation workflows with clear ownership.","Reduce reporting errors before compliance and audit deadlines."],
    benefits: [{ title: "Zero Unresolved Variances", desc: "Every difference investigated and documented before period close." },{ title: "Stronger Controls", desc: "Repeatable workflows that reduce the risk of fraud and reporting errors." },{ title: "Faster Audits", desc: "Reconciliation packs prepared in advance so auditors move quickly." }],
    process: [{ step: "01", title: "Source Data Collection", desc: "Bank statements, card feeds, and payment gateway exports gathered each period." },{ step: "02", title: "System Matching", desc: "Transactions matched against your accounting system line by line." },{ step: "03", title: "Variance Investigation", desc: "Unmatched items investigated, corrected, and documented with journal entries." },{ step: "04", title: "Reconciliation Pack Delivery", desc: "Signed-off reconciliation schedules delivered for management and audit files." }],
    stats: [{ value: "100%", label: "Period Coverage" },{ value: "<48hrs", label: "Variance Resolution" },{ value: "0", label: "Unresolved Items" }],
    audience: ["Multi-Account Businesses","High-Volume Operations","Finance Controllers"],
  },
  "ap-support": {
    name: "AP Support", description: "End-to-end accounts payable support — invoice intake, coding, approval routing, and payment run management.",
    details: ["Manage invoice intake, coding, and approval routing from end to end.","Track due dates and payment runs to protect vendor relationships.","Improve payable aging visibility and working-capital discipline.","Enforce controls for duplicate checks and unauthorized spend."],
    benefits: [{ title: "No Late Payments", desc: "Due dates tracked and payment runs executed on schedule to protect vendor relationships." },{ title: "Full Spend Visibility", desc: "Payable aging reports that show exactly what's owed and when." },{ title: "Fraud Prevention", desc: "Duplicate invoice checks and authorization controls built into every workflow." }],
    process: [{ step: "01", title: "Invoice Intake", desc: "Invoices received, logged, and coded to the correct cost center." },{ step: "02", title: "Approval Routing", desc: "Invoices routed to the right approver with documented authorization trails." },{ step: "03", title: "Payment Run Management", desc: "Payment batches prepared, reviewed, and executed on schedule." },{ step: "04", title: "Aging Reporting", desc: "Weekly AP aging reports delivered with commentary on overdue items." }],
    stats: [{ value: "0%", label: "Late Payment Rate" },{ value: "100%", label: "Invoice Tracked" },{ value: "2x", label: "Faster Processing" }],
    audience: ["Operations Teams","Procurement-Heavy Businesses","Scaling Back Offices"],
  },
  "ar-support": {
    name: "AR Support", description: "Accounts receivable management — accurate invoicing, proactive collections, and improved cash conversion cycles.",
    details: ["Create accurate invoices and maintain clean receivable ledgers.","Run proactive collections workflows and customer follow-up schedules.","Track overdue balances with structured escalation and notes.","Improve cash conversion through disciplined AR reporting."],
    benefits: [{ title: "Faster Collections", desc: "Proactive follow-up workflows that reduce days sales outstanding." },{ title: "Clean Receivables", desc: "Ledger maintained with accurate aging and documented dispute notes." },{ title: "Cash Flow Visibility", desc: "Weekly AR reports so leadership knows exactly what's coming in." }],
    process: [{ step: "01", title: "Invoice Creation", desc: "Accurate invoices generated and sent on time with correct terms." },{ step: "02", title: "Collections Workflow", desc: "Structured follow-up schedule for every overdue invoice." },{ step: "03", title: "Dispute Management", desc: "Disputes logged, investigated, and resolved with documented outcomes." },{ step: "04", title: "AR Reporting", desc: "Weekly aging reports with commentary on at-risk receivables." }],
    stats: [{ value: "30%", label: "DSO Reduction" },{ value: "98%", label: "Collection Rate" },{ value: "Weekly", label: "AR Reporting" }],
    audience: ["Service Businesses","B2B Companies","Revenue Operations Teams"],
  },
  payroll: {
    name: "Payroll", description: "Outsourced payroll processing — accurate pay runs, compliance documentation, and management reporting.",
    details: ["Process payroll cycles accurately with documented approvals.","Maintain payroll records, summaries, and compliance support files.","Coordinate benefits, deductions, and statutory obligations on time.","Provide clear payroll reports for management and audit readiness."],
    benefits: [{ title: "Zero Payroll Errors", desc: "Every pay run checked and documented before processing." },{ title: "Always Compliant", desc: "Statutory obligations — tax, super, pension — handled on time every time." },{ title: "Audit-Ready Records", desc: "Full payroll history maintained and organized for any review." }],
    process: [{ step: "01", title: "Employee Data Management", desc: "Onboarding, offboarding, and changes processed accurately." },{ step: "02", title: "Pay Run Processing", desc: "Payroll calculated, approved, and executed on schedule." },{ step: "03", title: "Compliance Filing", desc: "Statutory deductions, superannuation, and tax filings submitted on time." },{ step: "04", title: "Payroll Reporting", desc: "Management summaries and audit-ready payroll registers delivered each period." }],
    stats: [{ value: "100%", label: "On-Time Pay Runs" },{ value: "0", label: "Compliance Breaches" },{ value: "Multi-region", label: "Coverage" }],
    audience: ["Distributed Teams","HR-Led Organizations","Compliance-Focused Employers"],
  },
  "tax-planning": {
    name: "Tax Planning", description: "Strategic tax planning services — filing calendars, position reviews, and scenario-based tax impact analysis.",
    details: ["Build filing calendars and quarterly planning checklists.","Review tax positions and reduce exposure with practical controls.","Align transaction documentation for smoother return preparation.","Support decision-making with scenario-based tax impact analysis."],
    benefits: [{ title: "Reduced Tax Exposure", desc: "Proactive position reviews that identify savings before filing deadlines." },{ title: "No Missed Deadlines", desc: "Filing calendars built for every jurisdiction you operate in." },{ title: "Scenario Modeling", desc: "Understand the tax impact of business decisions before you make them." }],
    process: [{ step: "01", title: "Tax Position Review", desc: "Current positions reviewed across all relevant jurisdictions." },{ step: "02", title: "Filing Calendar Build", desc: "Quarterly deadlines mapped and responsibility assigned." },{ step: "03", title: "Documentation Alignment", desc: "Transaction records organized to support return preparation." },{ step: "04", title: "Scenario Analysis", desc: "Tax impact modeled for key business decisions and growth scenarios." }],
    stats: [{ value: "4", label: "Jurisdictions Covered" },{ value: "0%", label: "Missed Deadlines" },{ value: "Proactive", label: "Planning Approach" }],
    audience: ["Founder-Led Businesses","Profitable SMEs","Cross-Border Operators"],
  },
  audit: {
    name: "Audit", description: "Audit preparation and support — audit-ready schedules, evidence organization, and post-audit control strengthening.",
    details: ["Prepare audit-ready schedules and reconciliations across key accounts.","Organize support documentation for faster evidence requests.","Address review queries with structured responses and tracking.","Strengthen controls based on post-audit recommendations."],
    benefits: [{ title: "Faster Audits", desc: "Pre-prepared schedules and evidence packs that cut audit time significantly." },{ title: "Fewer Queries", desc: "Documentation organized so auditors find what they need without chasing." },{ title: "Stronger Controls Post-Audit", desc: "Recommendations implemented with tracking so issues don't recur." }],
    process: [{ step: "01", title: "Pre-Audit Readiness Review", desc: "Key accounts and schedules reviewed for gaps before auditors arrive." },{ step: "02", title: "Evidence Pack Preparation", desc: "Support documentation organized by account and assertion." },{ step: "03", title: "Query Management", desc: "Audit queries tracked and responded to with documented evidence." },{ step: "04", title: "Post-Audit Control Review", desc: "Recommendations from audit findings implemented and tracked." }],
    stats: [{ value: "50%", label: "Faster Audit Completion" },{ value: "Minimal", label: "Auditor Queries" },{ value: "100%", label: "Finding Resolution" }],
    audience: ["Regulated Businesses","Board-Reporting Teams","Expanding Companies"],
  },
  advisory: {
    name: "Advisory", description: "Finance advisory services — KPI dashboards, cash runway modeling, and strategic recommendations for growth.",
    details: ["Translate financial statements into actionable management insights.","Set KPI dashboards and cadence for leadership review meetings.","Model cash runway, growth plans, and operational tradeoffs.","Support strategic decisions with finance-first recommendations."],
    benefits: [{ title: "Decisions Backed by Data", desc: "Every strategic decision supported by financial modeling and scenario analysis." },{ title: "KPI Visibility", desc: "Dashboards that give leadership a real-time view of business performance." },{ title: "Cash Runway Clarity", desc: "Always know how long your runway is and what levers affect it." }],
    process: [{ step: "01", title: "Financial Review", desc: "Current statements reviewed and translated into management language." },{ step: "02", title: "KPI Framework Setup", desc: "Key metrics defined, dashboards built, review cadence established." },{ step: "03", title: "Cash & Growth Modeling", desc: "Runway, growth scenarios, and operational tradeoffs modeled." },{ step: "04", title: "Ongoing Advisory Support", desc: "Regular leadership reviews with forward-looking recommendations." }],
    stats: [{ value: "Monthly", label: "Advisory Cadence" },{ value: "CFO-Level", label: "Insight Quality" },{ value: "Strategic", label: "Decision Support" }],
    audience: ["Founders & CEOs","Leadership Teams","Growth-Stage Companies"],
  },
  "data-security": {
    name: "Data Security", description: "Finance data security services — secure workflows, role-based access controls, and compliance-aligned protocols.",
    details: ["Design secure workflows for handling sensitive finance data.","Apply role-based access controls across systems and reports.","Standardize backup, retention, and confidentiality protocols.","Maintain documentation aligned with compliance expectations."],
    benefits: [{ title: "Zero Unauthorized Access", desc: "Role-based controls ensure only the right people see sensitive data." },{ title: "Compliance-Aligned Protocols", desc: "Documentation and workflows built to satisfy regulatory expectations." },{ title: "Business Continuity", desc: "Backup and retention policies that protect data even when things go wrong." }],
    process: [{ step: "01", title: "Access Audit", desc: "Current system access reviewed and unauthorized permissions removed." },{ step: "02", title: "Role-Based Control Setup", desc: "Access levels designed around job function, not seniority." },{ step: "03", title: "Workflow Security Review", desc: "Data handling workflows assessed and secured end to end." },{ step: "04", title: "Documentation & Training", desc: "Policies documented and team trained on security protocols." }],
    stats: [{ value: "NDA", label: "Protected Workflows" },{ value: "RBAC", label: "Access Control" },{ value: "100%", label: "Compliance Aligned" }],
    audience: ["Security-Conscious Firms","Client-Data Heavy Teams","Compliance-Driven Businesses"],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return { title: "Service Not Found" };
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
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) notFound();

  return (
    <main>
      {/* Hero */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <Breadcrumbs items={[{ name: "Home", href: "/" },{ name: "Services", href: "/#services" },{ name: service.name }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-black text-[#1a1a2e] leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              {service.name} Services
            </h1>
            <p className="mt-5 text-lg text-[#5a6478] leading-relaxed max-w-2xl sm:mt-6 sm:text-xl">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {service.audience.map((item) => (
                <span key={item} className="rounded-full border border-[#6aa595]/30 bg-[#6aa595]/10 px-3 py-1.5 text-sm font-medium text-[#6aa595] sm:px-4 sm:py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Details + CTA */}
      <section className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
            {/* Left */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold">What We Do</p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e] sm:text-3xl sm:mt-4 lg:text-4xl">
                {service.name} for operational clarity and control
              </h2>
              <ul className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
                {service.details.map((item) => (
                  <li key={item} className="flex items-start gap-3 sm:gap-4">
                    <CheckCircle2 className="h-5 w-5 text-[#6aa595] shrink-0 mt-0.5" />
                    <span className="text-[#5a6478] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Benefits */}
              <div className="mt-12 sm:mt-16">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold mb-5 sm:mb-6">What You Get</p>
                <div className="space-y-3 sm:space-y-4">
                  {service.benefits.map((b) => (
                    <div key={b.title} className="rounded-xl bg-white border border-[#e2e4e9] p-5 hover:border-[#6aa595]/40 hover:shadow-sm transition-all duration-200 sm:p-6">
                      <h3 className="font-bold text-[#1a1a2e] mb-1">{b.title}</h3>
                      <p className="text-sm text-[#5a6478] leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — CTA Card */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-white border border-[#e2e4e9] p-6 shadow-sm sm:p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a2e] sm:text-2xl">Get This Service</h3>
                <p className="mt-3 text-[#5a6478] text-sm leading-relaxed">
                  Get dedicated support from ClariVex to execute {service.name.toLowerCase()} with disciplined processes and practical reporting.
                </p>
                <Link href="/#contact"
                  className="mt-6 block w-full rounded-xl bg-[#1a1a2e] py-3.5 text-center font-semibold text-white transition hover:bg-[#6aa595] sm:py-4">
                  Book a Consultation
                </Link>
                <div className="mt-5 border-t border-[#e2e4e9] pt-5 space-y-3 sm:mt-6 sm:pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#8892a4]">Email Us</p>
                    <a href="mailto:info@clarivex.net" className="text-sm font-medium text-[#1a1a2e] mt-1 block hover:text-[#6aa595] transition-colors">info@clarivex.net</a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#8892a4]">Call Us</p>
                    <a href="tel:+919898028812" className="text-sm font-medium text-[#1a1a2e] mt-1 block hover:text-[#6aa595] transition-colors">+91 9898028812</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold">Our Process</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e] mb-10 sm:text-3xl sm:mb-12">How it works</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="relative rounded-2xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 overflow-hidden hover:border-[#6aa595]/50 hover:shadow-md transition-all duration-300 sm:p-8">
                <span className="absolute top-4 right-4 text-5xl font-black text-[#6aa595]/10 leading-none select-none sm:text-6xl sm:right-5">
                  {step.step}
                </span>
                <h3 className="font-bold text-[#1a1a2e] text-base mb-2 relative sm:mb-3">{step.title}</h3>
                <p className="text-sm text-[#5a6478] leading-relaxed relative">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-14 text-center sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e] sm:text-3xl lg:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#5a6478]">
            Explore our other <Link href="/#services" className="text-[#6aa595] hover:underline">accounting services</Link> or read our latest <Link href="/blog" className="text-[#6aa595] hover:underline">blog insights</Link>.
          </p>
          <Link href="/#contact"
            className="mt-6 inline-flex rounded-full bg-[#5a688e] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#6aa595] sm:px-8">
            Talk to Experts
          </Link>
        </div>
      </section>
    </main>
  );
}
