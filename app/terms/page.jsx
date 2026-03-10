import Breadcrumbs from '@/components/Breadcrumbs';
import PrintPageButton from '@/components/PrintPageButton';

export function generateMetadata() {
  return {
    title: 'Terms & Conditions | ClariVex Solutions',
    description: 'Terms and conditions governing ClariVex Solutions outsourced accounting and finance services for US, UK, AU, and CA clients.',
    alternates: { canonical: 'https://clarivex.net/terms' },
  };
}

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Terms & Conditions' },
];

const sections = [
  {
    id: 'section-1',
    number: '01',
    title: 'Acceptance of Terms',
    body: 'By engaging ClariVex Solutions for outsourced accounting and finance services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms apply to clients in the United States, United Kingdom, Australia, and Canada.',
  },
  {
    id: 'section-2',
    number: '02',
    title: 'Services Provided',
    body: 'ClariVex Solutions provides outsourced bookkeeping, bank reconciliation, accounts payable and receivable management, payroll processing, tax planning support, audit preparation, financial advisory, and data security consulting. All services are delivered remotely unless otherwise agreed in writing.',
  },
  {
    id: 'section-3',
    number: '03',
    title: 'Client Responsibilities',
    body: 'Clients must provide accurate and timely financial information, review and approve deliverables within agreed timescales, maintain secure access credentials to shared systems, notify ClariVex immediately of material changes to business structure or operations, and ensure that all data provided is lawfully obtained.',
  },
  {
    id: 'section-4',
    number: '04',
    title: 'Confidentiality',
    body: 'Both parties agree to treat all financial and business information as strictly confidential. A full non-disclosure agreement is available on request. Data is handled in accordance with applicable privacy law as detailed in our Privacy Policy.',
  },
  {
    id: 'section-5',
    number: '05',
    title: 'Intellectual Property',
    body: 'All methodologies, templates, processes, and workflows used by ClariVex Solutions are proprietary to ClariVex Solutions. Client financial data remains the property of the client at all times.',
  },
  {
    id: 'section-6',
    number: '06',
    title: 'Fees and Payment',
    body: 'Invoices are payable within 14 days of issue. Late payments accrue interest at 4% above the Bank of England base rate for UK clients or the applicable statutory rate in other jurisdictions. Services may be suspended for accounts that remain more than 30 days overdue following written notice.',
  },
  {
    id: 'section-7',
    number: '07',
    title: 'Limitation of Liability',
    body: 'ClariVex Solutions is not liable for business decisions made using our reports or advice, for losses caused by third-party software errors, or for losses arising from inaccurate or incomplete information provided by the client. Total aggregate liability in any 12-month period is limited to fees paid by the client in the preceding 3 months.',
  },
  {
    id: 'section-8',
    number: '08',
    title: 'Indemnification',
    body: 'The client agrees to indemnify and hold ClariVex Solutions harmless against third-party claims, liabilities, damages, and costs arising from inaccurate, incomplete, or fraudulent information provided by the client.',
  },
  {
    id: 'section-9',
    number: '09',
    title: 'Termination',
    body: 'Either party may terminate services with 30 days written notice. Immediate termination may occur for material breach that remains uncured after seven days written notice. Upon termination, client data will be returned or securely deleted within 14 working days.',
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Governing Law',
    body: 'These terms are governed as follows: England and Wales for UK clients; Delaware for US clients; New South Wales for AU clients; Ontario for CA clients.',
  },
  {
    id: 'section-11',
    number: '11',
    title: 'Dispute Resolution',
    body: 'The parties agree to attempt resolution in good faith within 30 days. Unresolved disputes must proceed to binding mediation before any litigation is initiated.',
  },
  {
    id: 'section-12',
    number: '12',
    title: 'Amendments',
    body: 'ClariVex Solutions may update these Terms from time to time. At least 30 days email notice will be provided for material changes. Continued use of services after the notice period constitutes acceptance.',
  },
  {
    id: 'section-13',
    number: '13',
    title: 'Contact',
    body: 'For legal and contractual matters: legal@clarivex.net | 421 Shivalik Shilp, Iscon Cross Road, S.G. Highway, Ahmedabad 380058, India.',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] text-[#1a1a2e] font-[family-name:var(--font-inter)]">
      <section className="bg-[#1a1a2e] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-6 [&_nav]:text-[#8892a4] [&_a]:text-[#8892a4] [&_a:hover]:text-white [&_span]:text-white">
                <Breadcrumbs items={breadcrumbItems} />
              </div>
              <div className="h-px w-16 bg-[#c9a96e]" />
              <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl text-white font-bold">Terms &amp; Conditions</h1>
              <p className="mt-4 text-xs tracking-widest uppercase text-[#6aa595]">Last Updated: March 1, 2026</p>
            </div>
            <PrintPageButton className="shrink-0" />
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
