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

const trustedPartners = [
  "QuickBooks Online",
  "Xero",
  "NetSuite",
  "Sage",
  "MYOB",
  "Gusto",
  "ADP",
  "Expensify",
  "Fathom",
];

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
    title: "Bookkeeping & Accounting",
    icon: BookOpen,
    description:
      "Day-to-day transaction processing, general ledger maintenance, expense and income classification.",
  },
  {
    title: "Bank & Credit Card Reconciliation",
    icon: CreditCard,
    description:
      "Monthly reconciliations, variance identification, and clean reconciliation summaries.",
  },
  {
    title: "Accounts Payable (AP)",
    icon: ArrowDownCircle,
    description:
      "Vendor invoice processing, payables ageing reports, payment tracking and reconciliation.",
  },
  {
    title: "Accounts Receivable (AR)",
    icon: ArrowUpCircle,
    description:
      "Sales invoice recording, customer ledger management, receivable ageing and follow-up support.",
  },
  {
    title: "Payroll Processing",
    icon: Users,
    description:
      "Payroll calculations, payslip preparation, payroll summaries and reports.",
  },
  {
    title: "Tax Planning & Compliance",
    icon: FileText,
    description:
      "Strategic tax planning and compliance services to optimize your tax position.",
  },
  {
    title: "Audit Support",
    icon: Shield,
    description:
      "Comprehensive audit preparation and support for regulatory compliance.",
  },
  {
    title: "Financial Advisory",
    icon: Lightbulb,
    description:
      "Strategic guidance to help you make informed decisions and grow your business.",
  },
  {
    title: "Data Security",
    icon: Lock,
    description:
      "NDA-driven engagements, controlled data access, secure file-sharing protocols.",
  },
];

const softwareColumns = [
  {
    title: "Accounting & ERP",
    tools: ["QuickBooks Online", "Xero", "NetSuite", "Sage", "MYOB"],
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
    title: "Expert Team & Experience",
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
    title: "Client-Centric Partnership",
    icon: Heart,
    points: [
      "Simplify regulations",
      "Strengthen compliance",
      "Sustainable growth",
    ],
  },
];

const globalContacts = [
  {
    badge: "\uD83C\uDDFA\uD83C\uDDF8",
    country: "United States",
    location: "US support and operations desk",
    email: "us@clarivexsolutions.com",
    phoneDisplay: "+1 646 980 2901",
    phoneRaw: "+16469802901",
  },
  {
    badge: "\uD83C\uDDEC\uD83C\uDDE7",
    country: "United Kingdom",
    location: "UK accounting and compliance support",
    email: "uk@clarivexsolutions.com",
    phoneDisplay: "+44 20 3890 1124",
    phoneRaw: "+442038901124",
  },
  {
    badge: "\uD83C\uDDE6\uD83C\uDDFA",
    country: "Australia",
    location: "AU finance operations support desk",
    email: "au@clarivexsolutions.com",
    phoneDisplay: "+61 2 7201 8440",
    phoneRaw: "+61272018440",
  },
  {
    badge: "\uD83C\uDDE8\uD83C\uDDE6",
    country: "Canada",
    location: "CA bookkeeping and reporting support",
    email: "ca@clarivexsolutions.com",
    phoneDisplay: "+1 416 900 4172",
    phoneRaw: "+14169004172",
  },
];

const fieldClassName =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-blue-500";

export default function Home() {
  return (
    <main className="bg-white text-[#1E293B]">
      <section id="home" className="scroll-mt-28">
        <Hero />
      </section>

      <section className="bg-slate-100 py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">Trusted Software Partners:</p>
          <div className="flex flex-wrap gap-3">
            {trustedPartners.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-cyan-600">HOW WE WORK</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-[#0A1628] md:text-4xl">
            A disciplined process for measurable financial control
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-6 transition hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-blue-600">{item.step}</p>
                  <item.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#0A1628]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#0A1628] md:text-4xl">
            Comprehensive Financial Solutions
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0A1628]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                <p className="mt-4 text-sm font-medium text-blue-600">Learn More &rarr;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A1628] py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <p className="text-5xl font-bold text-cyan-400">15+</p>
            <p className="mt-2 text-sm text-white/60">Years of Experience</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-400">280+</p>
            <p className="mt-2 text-sm text-white/60">Active Clients</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-400">22</p>
            <p className="mt-2 text-sm text-white/60">Industries Served</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-cyan-400">100%</p>
            <p className="mt-2 text-sm text-white/60">On-Time Monthly Close</p>
          </div>
        </div>
      </section>

      <section id="platforms" className="scroll-mt-28 bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#0A1628] md:text-4xl">
            Software We Work With
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {softwareColumns.map((column) => (
              <article key={column.title} className="rounded-xl bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-[#0A1628]">{column.title}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {column.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-[#0A1628] p-8 text-white">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold">
              DK
            </div>
            <h3 className="mt-6 text-2xl font-bold">Dhimant Khatri</h3>
            <p className="mt-1 text-cyan-400">Chartered Accountant</p>
            <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
              CA &middot; ICAI Member
            </span>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                15+ Years Professional Experience
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Member, ICAI
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-100">
                <CheckCircle className="h-4 w-4 text-cyan-400" />
                Audit, Taxation &amp; Compliance
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#0A1628] md:text-4xl">
              Professional Expertise You Can Trust
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              ClariVex Solutions combines deep accounting discipline with modern process
              control to help leadership teams make faster and safer financial decisions.
              We align books, compliance, and reporting into one reliable operating rhythm.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              From monthly close readiness to growth-stage advisory, our objective is to
              reduce friction in finance operations while improving transparency for
              founders, management, and stakeholders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Clarity", "Compliance", "Growth"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#0A1628] md:text-4xl">
            Why Choose ClariVex Solution
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {whyChooseUsCards.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 p-6 transition hover:shadow-md"
              >
                <div className="inline-flex rounded-lg bg-blue-50 p-2 text-blue-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#0A1628]">{item.title}</h3>
                <div className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <p key={point} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {point}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-slate-50 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0A1628] md:text-4xl">Contact Us</h2>
            <p className="mt-4 text-slate-600">
              Reach our team across the US, UK, AU, and CA for accounting, compliance,
              and finance operations support.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {globalContacts.map((item) => (
                <span
                  key={item.country}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {item.badge}
                </span>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {globalContacts.map((item) => (
                <article key={item.country} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    <span>{item.badge}</span>
                    <span>{item.country}</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <a href={`mailto:${item.email}`} className="hover:text-blue-600">
                        {item.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <a href={`tel:${item.phoneRaw}`} className="hover:text-blue-600">
                        {item.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0A1628]">Book Your Consultation</h3>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input id="name" name="name" type="text" className={fieldClassName} required />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input id="email" name="email" type="email" className={fieldClassName} required />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                  Phone (optional)
                </label>
                <input id="phone" name="phone" type="tel" className={fieldClassName} />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Service
                </label>
                <select id="service" name="service" className={fieldClassName} defaultValue="">
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
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={fieldClassName}
                  placeholder="Tell us about your current finance operations and goals."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
