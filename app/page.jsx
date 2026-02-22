"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
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
    description:
      "Accurate day-to-day entries, ledger cleanup, and monthly close support to keep your books decision-ready.",
  },
  {
    title: "Reconciliation",
    icon: CreditCard,
    description:
      "Bank and card reconciliation with variance review and documented adjustments for reliable reporting.",
  },
  {
    title: "AP Support",
    icon: ArrowDownCircle,
    description:
      "Invoice intake, approvals, payment scheduling, and payable ageing management to protect cash flow.",
  },
  {
    title: "AR Support",
    icon: ArrowUpCircle,
    description:
      "Invoice tracking, collections follow-up, and receivable control to improve cash realization.",
  },
  {
    title: "Payroll",
    icon: Users,
    description:
      "Structured payroll processing, summaries, and compliance-ready records across regions.",
  },
  {
    title: "Tax Planning",
    icon: FileText,
    description:
      "Planning and compliance support to reduce tax risk while maintaining filing discipline.",
  },
  {
    title: "Audit",
    icon: Shield,
    description:
      "Audit-ready schedules, reconciliations, and support packages for internal and external reviews.",
  },
  {
    title: "Advisory",
    icon: Lightbulb,
    description:
      "Management insights, performance reviews, and strategic finance guidance for growth decisions.",
  },
  {
    title: "Data Security",
    icon: Lock,
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
      "Deep theoretical knowledge",
      "15+ years leadership",
      "Proactive approach",
    ],
  },
  {
    title: "Comprehensive Expertise",
    icon: Award,
    points: [
      "Company law, accounting standards",
      "Cost-optimized services",
      "Audit & advisory",
    ],
  },
  {
    title: "Proven Track Record",
    icon: TrendingUp,
    points: [
      "Statutory & internal audit",
      "Tax & BPO support",
      "Timely execution",
    ],
  },
  {
    title: "Client-Centric",
    icon: Heart,
    points: [
      "Simplify regulations",
      "Strengthen compliance",
      "Sustainable growth",
    ],
  },
];

const phoneContacts = [
  {
    name: "CA. Dhimant Khatri (Chartered Accountant)",
    phoneDisplay: "+91 9898028812",
    phoneRaw: "+919898028812",
  },
  {
    name: "Purnesh Patel (Marketing Head)",
    phoneDisplay: "+91 9727178789",
    phoneRaw: "+919727178789",
  },
  {
    name: "Jigar Bhavsar (Marketing Head)",
    phoneDisplay: "+91 9898020609",
    phoneRaw: "+919898020609",
  },
  {
    name: "Mitul Dalvadi (Team Manager)",
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
  "w-full rounded-xl bg-[#f8f8f6] border border-slate-200 px-5 py-4 text-[#0d0f14] focus:outline-none focus:ring-2 focus:ring-[#5a688e]/50 focus:border-[#5a688e] text-sm";

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
                className="group rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-[#5a688e]/40 hover:shadow-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 transition-colors duration-300 group-hover:bg-[#5a688e]">
                  <service.icon className="h-5 w-5 text-[#5a688e] transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#0d0f14]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
                <p className="mt-6 text-sm font-medium text-[#5a688e] transition-colors hover:text-[#6aa595]">
                  Learn More &rarr;
                </p>
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
                src="/dhimant-khatri.jpg"
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
                "Clarity",
                "Compliance",
                "Growth",
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
                className="group rounded-xl border border-[#1e2330] bg-[#13161e] p-8 transition-all hover:border-[#5a688e]/40"
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
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="text-center">
            <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#5a688e]">
              GET IN TOUCH
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0d0f14]">
              Contact Us
            </h2>
            <p className="mt-4 text-slate-600">Book a free consultation today</p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#1e2330] bg-[#0d0f14] p-10">
              <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              <div className="mt-3 h-px w-12 bg-[#c9a96e]" />

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <p className="text-sm text-[#8892a4]">
                    421, Shivalik Shilp, Iscon Cross Road, S.G. Highway,
                    Ahmedabad &ndash; 380058
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <a
                    href="mailto:info@clarivex.net"
                    className="text-sm text-[#8892a4] transition-colors hover:text-white"
                  >
                    info@clarivex.net
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <div className="space-y-2">
                    {phoneContacts.map((contact) => (
                      <p key={contact.phoneRaw} className="text-sm text-[#8892a4]">
                        <span className="font-medium text-white">{contact.name}:</span>{" "}
                        <a
                          href={`tel:${contact.phoneRaw}`}
                          className="transition-colors hover:text-white"
                        >
                          {contact.phoneDisplay}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#1e2330] pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8892a4]">
                  Country Coverage
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {countryCoverage.map((item) => (
                    <span
                      key={item.label}
                      className="rounded-full border border-[#1e2330] bg-[#13161e] px-3 py-1 text-xs text-[#8892a4]"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#0d0f14]"
                  >
                    Name
                  </label>
                  <input id="name" name="name" type="text" className={formFieldClassName} />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#0d0f14]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={formFieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-[#0d0f14]"
                  >
                    Phone (optional)
                  </label>
                  <input id="phone" name="phone" type="tel" className={formFieldClassName} />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-medium text-[#0d0f14]"
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
                      Select a service
                    </option>
                    {serviceCards.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#0d0f14]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={formFieldClassName}
                    placeholder="Tell us about your current finance operations and goals."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#5a688e] py-4 font-semibold text-white transition-colors duration-300 hover:bg-[#6aa595]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
