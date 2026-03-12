import Breadcrumbs from '@/components/Breadcrumbs';

export function generateMetadata() {
  return {
    title: 'Privacy Policy | ClariVex Solutions',
    description: 'Privacy policy for ClariVex Solutions - how we collect, use, and protect personal data for US, UK, AU, and CA clients.',
    alternates: { canonical: 'https://clarivex.net/privacy' },
    robots: { index: true, follow: true },
  }
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy' },
];

const sections = [
  {
    id: 'section-1',
    number: '01',
    title: 'Introduction',
    body: 'ClariVex Solutions is an outsourced accounting and finance firm delivering services to clients in the United States, United Kingdom, Australia, and Canada. This Privacy Policy explains how we collect, use, share, and protect personal data. We are committed to handling all information responsibly and in compliance with applicable privacy laws.',
  },
  {
    id: 'section-2',
    number: '02',
    title: 'Data We Collect',
    body: 'We collect contact enquiry data (name, email, phone, company, service interest, and message). Session cookies are used for admin authentication only. IP addresses are used transiently for rate limiting and are not stored permanently. We use no tracking cookies, no advertising pixels, and no third-party behavioural analytics.',
  },
  {
    id: 'section-3',
    number: '03',
    title: 'How We Use Data',
    body: 'We use data to respond to service enquiries, to deliver contracted accounting and finance services, to send compliance updates where explicit consent is provided, and to fulfil legal and regulatory obligations.',
  },
  {
    id: 'section-4',
    number: '04',
    title: 'Legal Basis',
    body: 'For UK and EU data subjects: Article 6(1)(b) contractual necessity for service delivery; Article 6(1)(c) legal obligation for regulatory compliance; Article 6(1)(a) consent for marketing. For AU clients: Privacy Act 1988. For CA clients: PIPEDA. For US clients: applicable state laws including CCPA â€” we do not sell personal data.',
  },
  {
    id: 'section-5',
    number: '05',
    title: 'Data Retention',
    body: 'Enquiry data is retained for 2 years. Client financial records are retained for 7 years to satisfy HMRC, ATO, CRA, and IRS statutory requirements. Admin session data is deleted immediately on logout. No third-party analytics data is retained as we do not use such services.',
  },
  {
    id: 'section-6',
    number: '06',
    title: 'Security',
    body: 'We apply TLS 1.2+ encryption in transit and encryption at rest via Neon PostgreSQL. All staff and contractors are bound by NDAs. Admin access uses bcrypt password hashing. Quarterly access reviews and annual security assessments are conducted.',
  },
  {
    id: 'section-7',
    number: '07',
    title: 'Data Processors',
    body: 'We share data only with the following processors under data processing agreements: Resend (email delivery â€” EU-US Standard Contractual Clauses in place); Cloudinary (image hosting â€” SOC 2 Type II); Neon (database hosting â€” GDPR compliant, EU data residency available); Vercel (hosting â€” SOC 2 Type II, DPA available). We do not use advertising networks or data brokers.',
  },
  {
    id: 'section-8',
    number: '08',
    title: 'International Transfers',
    body: 'Data may be processed in the EU and the United States. All international transfers are protected by Standard Contractual Clauses or equivalent adequacy mechanisms as required by applicable law.',
  },
  {
    id: 'section-9',
    number: '09',
    title: 'Your Rights',
    body: 'UK/EU data subjects have rights to access, rectification, erasure, restriction, portability, and objection, and may lodge a complaint with the ICO at ico.org.uk. AU clients have access and correction rights under the Privacy Act 1988, with complaints to the OAIC. CA clients have rights to access, correction, and withdrawal of consent under PIPEDA. California residents have rights under CCPA to know, delete, and opt out of sale â€” we do not sell data.',
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Cookies',
    body: 'We use session cookies only for admin authentication (httpOnly, sameSite=strict). No tracking cookies are used. No cookie consent banner is required as no user tracking occurs. You may disable cookies in your browser without affecting public-facing site functionality.',
  },
  {
    id: 'section-11',
    number: '11',
    title: "Children's Privacy",
    body: 'Our services are designed exclusively for businesses and adults. We do not knowingly collect personal information from individuals under 18 years of age.',
  },
  {
    id: 'section-12',
    number: '12',
    title: 'Policy Updates',
    body: 'We may update this Privacy Policy periodically. Material changes will be communicated by email at least 30 days in advance. Continued use of our services after the notice period constitutes acceptance. The current version is always available at clarivex.net/privacy. Current version: March 1, 2026.',
  },
  {
    id: 'section-13',
    number: '13',
    title: 'Contact',
    body: 'Email: privacy@clarivex.net. Address: ClariVex Solutions, 421 Shivalik Shilp, Iscon Cross Road, S.G. Highway, Ahmedabad 380058, India. For UK data subjects, ICO registration is in progress.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#1a1a2e] font-[family-name:var(--font-inter)]">
      <section className="relative overflow-hidden bg-[#f4f3ee] py-12 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#5a688e]/6 blur-[110px] sm:h-[420px] sm:w-[420px]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <div className="mb-6 [&_nav]:text-[#5a6478] [&_a]:text-[#5a6478] [&_a:hover]:text-[#1a1a2e] [&_span]:text-[#1a1a2e]">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
            <div className="h-px w-16 bg-[#c9a96e]" />
            <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-[#1a1a2e] font-bold">Privacy Policy</h1>
            <p className="mt-4 text-xs tracking-widest uppercase text-[#6aa595]">Last Updated: March 1, 2026</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-24 rounded-xl border border-[#e2e4e9] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6aa595]">Contents</p>
              <ul className="mt-4 space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-[#5a6478] hover:text-[#6aa595] transition-colors"
                    >
                      {section.number}. {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="flex-1 min-w-0 rounded-2xl border border-[#e2e4e9] bg-white p-6 sm:p-8 lg:p-10">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="mb-4 flex items-center gap-4">
                  <span className="w-8 shrink-0 text-xs font-bold tracking-widest text-[#6aa595]">{section.number}</span>
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a2e]">{section.title}</h2>
                </div>
                <p className="text-base leading-relaxed text-[#5a6478]">{section.body}</p>
                {index < sections.length - 1 ? <hr className="my-8 border-[#e2e4e9]" /> : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
