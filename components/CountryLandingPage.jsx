import Hero from "@/components/Hero";
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
  { name: "US Desk", phoneDisplay: "+1 646 980 2901", phoneRaw: "+16469802901" },
  { name: "UK Desk", phoneDisplay: "+44 20 3890 1124", phoneRaw: "+442038901124" },
  { name: "AU Desk", phoneDisplay: "+61 2 7201 8440", phoneRaw: "+61272018440" },
  { name: "CA Desk", phoneDisplay: "+1 416 900 4172", phoneRaw: "+14169004172" },
];

const countryCoverage = [
  { label: "\uD83C\uDDFA\uD83C\uDDF8 United States" },
  { label: "\uD83C\uDDEC\uD83C\uDDE7 United Kingdom" },
  { label: "\uD83C\uDDE6\uD83C\uDDFA Australia" },
  { label: "\uD83C\uDDE8\uD83C\uDDE6 Canada" },
];

const formFieldClassName =
  "w-full rounded-xl bg-[#f8f8f6] border border-slate-200 px-5 py-4 text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#5a688e]/50 focus:border-[#5a688e] text-sm";

export default function CountryLandingPage({
  countryName,
  flag,
  countryLabel,
  h1Line1,
  h1Line2,
  subtitle,
  tools = [],
  complianceNote,
}) {
  const resolvedCountryLabel =
    countryLabel || `${countryName.toUpperCase()} OUTSOURCED ACCOUNTING & FINANCE`;

  return (
    <main>
      <section id="home">
        <Hero
          countryLabel={resolvedCountryLabel}
          h1Line1={h1Line1}
          h1Line2={h1Line2}
          subtitle={subtitle}
          flag={flag}
        />
      </section>

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto my-0 max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="rounded-2xl border border-[#5a688e]/20 bg-[#f8f9fa] p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-16 bg-[#c9a96e]" />
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                    {flag} {countryName}
                  </p>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl text-[#1a1a2e]">
                  Tax &amp; Compliance Coverage
                </h3>
              </div>

              <div>
                <p className="text-sm leading-relaxed text-[#5a6478]">{complianceNote}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[#e2e4e9] bg-white px-3 py-1.5 text-xs text-[#5a6478]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">HOW WE WORK</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            A disciplined process for measurable financial control
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.step}
                className="group rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 transition-all duration-300 hover:border-[#5a688e]/50 hover:shadow-lg"
              >
                <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#e2e4e9] transition-colors group-hover:text-[#5a688e]/20">
                  {step.step}
                </p>
                <step.icon className="mt-4 h-6 w-6 text-[#6aa595]" />
                <h3 className="mt-3 text-lg font-semibold text-[#1a1a2e]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6478]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">OUR SERVICES</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Comprehensive Financial Solutions
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="group rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-[#5a688e]/40 hover:shadow-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 transition-colors duration-300 group-hover:bg-[#5a688e]">
                  <service.icon className="h-5 w-5 text-[#5a688e] transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#1a1a2e]">{service.title}</h3>
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

      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:gap-12 lg:px-12">
          {statsBanner.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a2e] lg:text-6xl">
                {stat.value}
              </p>
              <div className="mx-auto mt-3 h-0.5 w-8 bg-[#6aa595]" />
              <p className="mt-4 text-sm uppercase tracking-wider text-[#5a6478]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
            TOOLS &amp; TECHNOLOGY
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Software We Work With
          </h2>
          <p className="mt-4 max-w-2xl text-[#5a6478]">
            Built on the tools modern finance teams rely on. We adapt to your systems \u2014 no
            forced migrations, no disruption.
          </p>

          <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-3">
            {softwareColumns.map((column) => (
              <article
                key={column.title}
                className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8"
              >
                <h3 className="mb-6 border-b border-[#e2e4e9] pb-4 font-semibold text-[#1a1a2e]">
                  {column.title}
                </h3>
                <div className="mt-2">
                  {column.tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-3 border-b border-[#e2e4e9]/50 py-3 text-sm text-[#5a6478] transition-colors hover:text-[#1a1a2e]"
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

      <section id="about" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="relative rounded-2xl border border-[#e2e4e9] bg-white p-10 shadow-lg">
            <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-2xl border-l-2 border-t-2 border-[#c9a96e]/40" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5a688e] font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              DK
            </div>
            <p className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e]">
              Dhimant Khatri
            </p>
            <p className="mt-1 text-sm text-[#6aa595]">
              Chartered Accountant &middot; ICAI Member
            </p>
            <div className="mt-6 h-px w-12 bg-[#c9a96e]" />
            <div className="mt-6 space-y-4">
              <p className="flex items-center gap-3 text-sm text-[#5a6478]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                15+ Years Professional Experience
              </p>
              <p className="flex items-center gap-3 text-sm text-[#5a6478]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                Member, Institute of Chartered Accountants of India
              </p>
              <p className="flex items-center gap-3 text-sm text-[#5a6478]">
                <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                Audit, Taxation &amp; Compliance Specialist
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">ABOUT US</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
              Professional Expertise You Can Trust
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              ClariVex Solutions combines deep accounting discipline with modern process control
              to help leadership teams make faster and safer financial decisions. We align books,
              compliance, and reporting into one reliable operating rhythm.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              From monthly close readiness to growth-stage advisory, our objective is to reduce
              friction in finance operations while improving transparency for founders,
              management, and stakeholders.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Clarity", "Compliance", "Growth"].map((tag) => (
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

      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">WHY CLARIVEX</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Why Choose ClariVex Solution
          </h2>

          <div className="mt-12 grid gap-6 lg:mt-20 lg:grid-cols-2">
            {whyChooseUsCards.map((item) => (
              <article
                key={item.title}
                className="group rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 transition-all hover:border-[#5a688e]/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 text-[#6aa595] transition-colors group-hover:bg-[#5a688e]/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#1a1a2e]">{item.title}</h3>
                <div className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <p
                      key={point}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[#5a6478]"
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

      <section id="contact" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <div className="mx-auto h-px w-16 bg-[#c9a96e]" />
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#5a688e]">GET IN TOUCH</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
              Contact Us
            </h2>
            <p className="mt-4 text-slate-600">Book a free consultation today</p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e2e4e9] bg-white p-10 shadow-lg">
              <h3 className="text-lg font-semibold text-[#1a1a2e]">Contact Information</h3>
              <div className="mt-3 h-px w-12 bg-[#c9a96e]" />

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <p className="text-sm text-[#5a6478]">Global delivery hub: Ahmedabad, India</p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <a
                    href="mailto:us@clarivexsolutions.com"
                    className="text-sm text-[#5a6478] transition-colors hover:text-[#1a1a2e]"
                  >
                    us@clarivexsolutions.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[#6aa595]" />
                  <div className="space-y-2">
                    {phoneContacts.map((contact) => (
                      <p key={contact.phoneRaw} className="text-sm text-[#5a6478]">
                        <span className="font-medium text-[#1a1a2e]">{contact.name}:</span>{" "}
                        <a
                          href={`tel:${contact.phoneRaw}`}
                          className="transition-colors hover:text-[#1a1a2e]"
                        >
                          {contact.phoneDisplay}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#e2e4e9] pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#5a6478]">Country Coverage</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {countryCoverage.map((item) => (
                    <span
                      key={item.label}
                      className="rounded-full border border-[#e2e4e9] bg-[#f8f9fa] px-3 py-1 text-xs text-[#5a6478]"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-xl">
              <form className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[#1a1a2e]"
                    >
                      Name
                    </label>
                    <input id="name" name="name" type="text" className={formFieldClassName} />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#1a1a2e]"
                    >
                      Email
                    </label>
                    <input id="email" name="email" type="email" className={formFieldClassName} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-[#1a1a2e]"
                    >
                      Phone (optional)
                    </label>
                    <input id="phone" name="phone" type="tel" className={formFieldClassName} />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-medium text-[#1a1a2e]"
                    >
                      Service
                    </label>
                    <select id="service" name="service" className={formFieldClassName} defaultValue="">
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
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#1a1a2e]"
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
