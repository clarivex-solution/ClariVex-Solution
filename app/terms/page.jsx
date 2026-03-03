import Breadcrumbs from "@/components/Breadcrumbs";

export function generateMetadata() {
  return {
    title: "Terms & Conditions | ClariVex Solutions",
    description:
      "Terms and conditions governing use of ClariVex Solutions accounting services.",
  };
}

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Terms & Conditions" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 [&_a]:text-[#8892a4] [&_a:hover]:text-white [&_nav]:text-[#8892a4] [&_span]:text-white">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
        <h1 className="text-3xl font-semibold text-white">Terms &amp; Conditions</h1>
        <p className="text-xs text-[#8892a4] mb-6">Last Updated: March 1, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            By engaging ClariVex Solutions for outsourced accounting and finance
            services, you acknowledge that you have read, understood, and agree to
            be bound by these Terms and Conditions. These terms apply to clients
            in the United States, United Kingdom, Australia, and Canada.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Services</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            ClariVex Solutions provides outsourced bookkeeping, bank reconciliation,
            accounts payable and accounts receivable management, payroll processing,
            tax planning support, audit preparation, financial advisory, and data
            security consulting services. All services are delivered remotely unless
            otherwise agreed in writing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. Client Responsibilities</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Clients must provide accurate and timely financial information, review
            and approve deliverables within agreed timescales, maintain secure
            access to shared systems, and notify ClariVex Solutions immediately of
            any material changes to business structure or operations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Confidentiality and Data Protection</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Both parties agree to treat all financial and business information as
            strictly confidential. A non-disclosure agreement is available on
            request. Data is processed in accordance with UK GDPR for UK clients,
            the Privacy Act 1988 for AU clients, PIPEDA for CA clients, and
            applicable state laws for US clients.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Intellectual Property</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            All methodologies, templates, processes, and workflows used by
            ClariVex Solutions are proprietary to ClariVex Solutions. Client
            financial data remains the property of the client at all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Payment Terms</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Invoices are payable within 14 days of issue. Late payments may accrue
            interest at 4% above the Bank of England base rate for UK clients or
            the applicable statutory rate in other jurisdictions. Services may be
            suspended for accounts that remain more than 30 days overdue following
            written notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Limitation of Liability</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            ClariVex Solutions is not liable for business decisions made based on
            reports or advice provided, for errors caused by third-party software,
            or for losses arising from inaccurate or incomplete information
            supplied by the client. Total aggregate liability in any 12-month
            period is limited to the fees paid by the client in the preceding
            three months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. Indemnification</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            The client agrees to indemnify and hold ClariVex Solutions harmless
            against third-party claims, liabilities, damages, and costs arising
            from inaccurate, incomplete, or fraudulent information provided by the
            client.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Termination</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Either party may terminate services with 30 days written notice.
            Immediate termination may occur for material breach that remains
            uncured after seven days written notice. Upon termination, client data
            will be returned or securely deleted within 14 working days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Governing Law</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            These terms are governed by jurisdiction as follows: England and Wales
            for UK clients, Delaware for US clients, New South Wales for AU
            clients, and Ontario for CA clients.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">11. Dispute Resolution</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            The parties agree to attempt to resolve disputes in good faith within
            30 days. If unresolved, disputes must proceed to binding mediation
            before any litigation is initiated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">12. Changes to Terms</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            ClariVex Solutions may update these Terms and Conditions from time to
            time. At least 30 days notice will be provided by email. Continued use
            of services after the notice period constitutes acceptance of the
            revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">13. Contact</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            For legal and contractual matters, contact legal@clarivex.net or write
            to 421 Shivalik Shilp, Iscon Cross Road, SG Highway, Ahmedabad 380058.
          </p>
        </section>
      </div>
    </main>
  );
}
