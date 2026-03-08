import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  Award,
  BookOpen,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  Handshake,
  Lightbulb,
  Lock,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const processSteps = [
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

export const serviceCards = [
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


export const softwareColumns = [
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

export const whyChooseUsCards = [
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
    icon: Handshake,
    points: [
      "Simplify complex regulations for your business",
      "Strengthen compliance frameworks end-to-end",
      "Support sustainable long-term business growth",
    ],
  },
];

export const phoneContacts = [
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


export const formFieldClassName =
  "w-full rounded-xl border border-slate-200 bg-[#f8f8f6] px-5 py-4 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#5a688e] focus:ring-1 focus:ring-[#5a688e]/30 transition-colors placeholder:text-[#5a6478]/50";

export const trustedSoftware = [
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
];
