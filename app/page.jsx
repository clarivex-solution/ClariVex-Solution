"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ClipboardList,
  CreditCard,
  FileText,
  Heart,
  Lightbulb,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Diagnostic Review",
    icon: ClipboardList,
    description:
      "We assess your current books, workflows, and controls to identify immediate risks and quick-win opportunities.",
  },
  {
    step: "02",
    title: "Compliance Roadmap",
    icon: Calendar,
    description:
      "We create a practical filing and governance calendar tailored to your structure, industry, and reporting cycle.",
  },
  {
    step: "03",
    title: "Execution & Monitoring",
    icon: Activity,
    description:
      "Our team executes accounting operations and reporting workflows with documented controls and regular checkpoints.",
  },
  {
    step: "04",
    title: "Advisory Decisions",
    icon: TrendingUp,
    description:
      "We translate numbers into management actions to improve cash discipline, operating efficiency, and long-term resilience.",
  },
];

const serviceCards = [
  {
    title: "Bookkeeping",
    icon: BookOpen,
    href: "/services/bookkeeping",
    description:
      "Accurate day-to-day entries, ledger cleanup, and monthly close support to keep your books decision-ready.",
  },
  {
    title: "Reconciliation",
    icon: CreditCard,
    href: "/services/reconciliation",
    description:
      "Bank and card reconciliation with variance review and documented adjustments for reliable reporting.",
  },
  {
    title: "AP Support",
    icon: ArrowDownCircle,
    href: "/services/ap-support",
    description:
      "Invoice intake, approvals, payment scheduling, and payable ageing management to protect cash flow.",
  },
  {
    title: "AR Support",
    icon: ArrowUpCircle,
    href: "/services/ar-support",
    description:
      "Invoice tracking, collections follow-up, and receivable control to improve cash realization.",
  },
  {
    title: "Payroll",
    icon: Users,
    href: "/services/payroll",
    description:
      "Structured payroll processing, summaries, and compliance-ready records across regions.",
  },
  {
    title: "Tax Planning",
    icon: FileText,
    href: "/services/tax-planning",
    description:
      "Planning and compliance support to reduce tax risk while maintaining filing discipline.",
  },
  {
    title: "Audit",
    icon: Shield,
    href: "/services/audit",
    description:
      "Audit-ready schedules, reconciliations, and support packages for internal and external reviews.",
  },
  {
    title: "Advisory",
    icon: Lightbulb,
    href: "/services/advisory",
    description:
      "Management insights, performance reviews, and strategic finance guidance for growth decisions.",
  },
  {
    title: "Data Security",
    icon: Lock,
    href: "/services/data-security",
    description:
      "NDA-protected workflows, controlled access, and secure handling of business-critical financial data.",
  },
];

const statsBanner = [
  { value: "15+", label: "Years of Experience" },
  { value: "280+", label: "Active Clients" },
  { value: "22", label: "Industries Served" },
  { value: "100%", label: "On-Time Close" },
];

const softwareColumns = [
  {
    title: "Accounting & ERP",
    tools: ["QuickBooks", "Xero", "NetSuite", "Sage", "MYOB"],
  },
  {
    title: "Payroll & Expense",
    tools: ["Gusto", "ADP", "Expensify"],
  },
  {
    title: "Reporting & MIS",
    tools: ["Fathom", "Spotlight Reporting"],
  },
];

const whyChooseUsCards = [
  {
    title: "Expert Team",
    icon: Star,
    points: [
      "Deep theoretical knowledge across accounting standards",
      "15+ years of leadership in audit, tax & compliance",
      "Proactive approach to routine and future challenges",
    ],
  },
  {
    title: "Comprehensive Expertise",
    icon: Award,
    points: [
      "Company law, accounting standards and taxation",
      "Efficient, effective and cost-optimized services",
      "Audit, compliance and advisory engagements",
    ],
  },
  {
    title: "Proven Track Record",
    icon: TrendingUp,
    points: [
      "Statutory audit, internal audit and compliance audit",
      "Taxation and business process outsourcing",
      "Reliable support with timely execution",
    ],
  },
  {
    title: "Client-Centric",
    icon: Heart,
    points: [
      "Simplify complex regulations for your business",
      "Strengthen compliance frameworks end-to-end",
      "Support sustainable long-term business growth",
    ],
  },
];

const phoneContacts = [
  {
    name: "CA. Dhimant Khatri",
    role: "Chartered Accountant",
    phoneDisplay: "+91 9898028812",
    phoneRaw: "+919898028812",
  },
  {
    name: "Purnesh Patel",
    role: "Marketing Head",
    phoneDisplay: "+91 9727178789",
    phoneRaw: "+919727178789",
  },
  {
    name: "Jigar Bhavsar",
    role: "Marketing Head",
    phoneDisplay: "+91 9898020609",
    phoneRaw: "+919898020609",
  },
  {
    name: "Mitul Dalvadi",
    role: "Team Manager",
    phoneDisplay: "+91 9586201415",
    phoneRaw: "+919586201415",
  },
];

const countryCoverage = [
  { label: "\uD83C\uDDFA\uD83C\uDDF8 United States" },
  { label: "\uD83C\uDDEC\uD83C\uDDE7 United Kingdom" },
  { label: "\uD83C\uDDE6\uD83C\uDDFA Australia" },
  { label: "\uD83C\uDDE8\uD83C\uDDE6 Canada" },
];

const formFieldClassName =
  "w-full rounded-xl border border-slate-200 bg-[#f8f8f6] px-5 py-4 text-sm text-[#0d0f14] focus:outline-none focus:border-[#5a688e] focus:ring-1 focus:ring-[#5a688e]/30 transition-colors placeholder:text-[#8892a4]/50";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>

      <section className="bg-[#13161e] border-y border-[#1e2330] py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-[#8892a4] text-xs uppercase tracking-widest shrink-0 mr-4">
              Trusted Software:
            </span>
            {[
              "QuickBooks",
              "Xero",
              "NetSuite",
              "Sage",
              "MYOB",
              "Gusto",
              "ADP",
              "Expensify",
              "Fathom",
              "Spotlight",
            ].map((tool) => (
              <span
                key={tool}
                className="bg-[#0d0f14] border border-[#1e2330] text-[#8892a4] text-xs rounded-full px-4 py-1.5 whitespace-nowrap hover:border-[#5a688e]/50 hover:text-white transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#0d0f14] py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            HOW WE WORK
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-playfair)] text-5xl font-bold text-white">
            A disciplined process for measurable financial control
          </h2>

          <div className="mt-20 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="group rounded-xl border border-[#1e2330] bg-[#13161e] p-8 transition-all duration-300 hover:border-[#5a688e]/50"
              >
                <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#1e2330] transition-colors group-hover:text-[#5a688e]/20">
                  {step.step}
                </p>
                <step.icon className="mt-4 h-6 w-6 text-[#6aa595]" />
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8892a4]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f0efe9] py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">
            OUR SERVICES
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0d0f14]">
            Comprehensive Financial Solutions
          </h2>

          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#5a688e]/40 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 text-[#5a688e] transition-colors duration-300 group-hover:bg-[#5a688e] group-hover:text-white">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#0d0f14]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-block text-sm font-medium text-[#5a688e] transition-colors hover:text-[#6aa595]"
                >
                  Learn More &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#1e2330] bg-[#13161e] py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 text-center lg:grid-cols-4 lg:px-12">
          {statsBanner.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-white">
                {stat.value}
              </p>
              <div className="mx-auto mt-3 h-0.5 w-8 bg-[#6aa595]" />
              <p className="mt-4 text-sm uppercase tracking-wider text-[#8892a4]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0d0f14] py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            TOOLS &amp; TECHNOLOGY
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-white">
            Software We Work With
          </h2>
          <p className="mt-4 max-w-2xl text-[#8892a4]">
            Built on the tools modern finance teams rely on. We adapt to your
            systems &mdash; no forced migrations, no disruption.
          </p>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {softwareColumns.map((column) => (
              <article
                key={column.title}
                className="rounded-xl border border-[#1e2330] bg-[#13161e] p-8"
              >
                <h3 className="mb-6 border-b border-[#1e2330] pb-4 font-semibold text-white">
                  {column.title}
                </h3>
                <div className="mt-2">
                  {column.tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-3 border-b border-[#1e2330]/50 py-3 text-sm text-[#8892a4] transition-colors hover:text-white"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6aa595]" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f0efe9] py-32">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-20 px-6 lg:grid-cols-2 lg:px-12">
          <div className="relative rounded-2xl border border-[#1e2330] bg-[#0d0f14] p-10">
            <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-2xl border-l-2 border-t-2 border-[#c9a96e]/40" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#c9a96e]/40 shrink-0">
              <Image
                src="/dhimant-khatri.png"
                alt="CA Dhimant Khatri - Chartered Accountant"
                fill
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Dhimant Khatri
            </p>
            <p className="mt-1 text-sm text-[#6aa595]">
              Chartered Accountant &middot; ICAI Member
            </p>
            <div className="mt-6 h-px w-12 bg-[#c9a96e]" />
            <div className="mt-6 space-y-4">
              <p className="flex items-center gap-3 text-sm text-[#8892a4]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                15+ Years Professional Experience
              </p>
              <p className="flex items-center gap-3 text-sm text-[#8892a4]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                Member, Institute of Chartered Accountants of India
              </p>
              <p className="flex items-center gap-3 text-sm text-[#8892a4]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                Audit, Taxation &amp; Compliance Specialist
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">
              ABOUT US
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0d0f14]">
              Professional Expertise You Can Trust
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              ClariVex Solutions combines deep accounting discipline with modern process
              control to help leadership teams make faster and safer financial decisions.
              We align books, compliance, and reporting into one reliable operating rhythm.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              From monthly close readiness to growth-stage advisory, our objective is to
              reduce friction in finance operations while improving transparency for
              founders, management, and stakeholders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Experience",
                "Trust",
                "Professionalism",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#5a688e]/20 bg-[#5a688e]/10 px-5 py-2 text-sm font-medium text-[#5a688e]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0f14] py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            WHY CLARIVEX
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-white">
            Why Choose ClariVex Solution
          </h2>

          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            {whyChooseUsCards.map((item) => (
              <article
                key={item.title}
                className="group rounded-xl border border-[#1e2330] border-l-4 border-l-[#5a688e] bg-[#13161e] p-8 transition-all hover:border-[#5a688e]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 text-[#6aa595] transition-colors group-hover:bg-[#5a688e]/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{item.title}</h3>
                <div className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <p
                      key={point}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[#8892a4]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#6aa595]" />
                      <span>{point}</span>
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f0efe9] py-32">
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-6 h-px w-16 bg-[#c9a96e]" />
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#5a688e]">
              GET IN TOUCH
            </p>
            <h2 className="mt-4 text-center font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0d0f14]">
              Contact Us
            </h2>
            <p className="mt-3 text-center text-slate-500">Book a free consultation today</p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#1e2330] bg-[#0d0f14] p-10">
              <h3 className="text-xl font-semibold text-white">Contact Information</h3>
              <div className="mb-8 mt-3 h-px w-10 bg-[#c9a96e]" />

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#6aa595]" />
                  <p className="text-sm leading-relaxed text-[#8892a4]">
                    421, Shivalik Shilp, Iscon Cross Road,
                    <br />
                    S.G. Highway, Ahmedabad &ndash; 380058
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[#6aa595]" />
                  <a
                    href="mailto:info@clarivex.net"
                    className="text-sm text-[#8892a4] transition-colors hover:text-white"
                  >
                    info@clarivex.net
                  </a>
                </div>
              </div>

              <div className="my-6 h-px w-full bg-[#1e2330]" />

              <p className="mb-4 text-sm font-medium text-white">Our Team</p>
              <div className="space-y-4">
                {phoneContacts.map((contact) => (
                  <div key={contact.phoneRaw} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#6aa595]" />
                      <div>
                        <p className="text-sm font-medium text-white">{contact.name}</p>
                        <p className="text-xs text-[#8892a4]">{contact.role}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phoneRaw}`}
                      className="shrink-0 font-mono text-sm text-[#6aa595]"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                ))}
              </div>

              <div className="my-6 h-px w-full bg-[#1e2330]" />

              <p className="mb-4 text-sm font-medium text-white">Global Coverage</p>
              <div className="flex flex-wrap gap-2">
                {countryCoverage.map((item) => (
                  <span
                    key={item.label}
                    className="rounded-full border border-[#1e2330] bg-[#0d0f14] px-4 py-2 text-xs text-[#8892a4] transition-colors hover:border-[#5a688e]/50 hover:text-white"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
              <h3 className="text-xl font-semibold text-white">Send us a Message</h3>
              <p className="mb-8 mt-2 text-sm text-[#8892a4]">
                We typically respond within 24 hours
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={formFieldClassName}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={formFieldClassName}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
                    >
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={formFieldClassName}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
                    >
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      className={formFieldClassName}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select service
                      </option>
                      <option value="Bookkeeping">Bookkeeping</option>
                      <option value="Reconciliation">Reconciliation</option>
                      <option value="AP Support">AP Support</option>
                      <option value="AR Support">AR Support</option>
                      <option value="Payroll">Payroll</option>
                      <option value="Tax Planning">Tax Planning</option>
                      <option value="Audit">Audit</option>
                      <option value="Advisory">Advisory</option>
                      <option value="Data Security">Data Security</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs uppercase tracking-wider text-slate-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={formFieldClassName}
                    placeholder="Tell us about your current finance operations and goals."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-[#5a688e] py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#6aa595] hover:shadow-lg hover:shadow-[#6aa595]/20"
                >
                  Send Message &rarr;
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
