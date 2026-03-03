import Breadcrumbs from "@/components/Breadcrumbs";

export function generateMetadata() {
  return {
    title: "Privacy Policy | ClariVex Solutions",
    description:
      "Privacy policy explaining how ClariVex Solutions collects, uses, and protects data.",
  };
}

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy" },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 [&_a]:text-[#8892a4] [&_a:hover]:text-white [&_nav]:text-[#8892a4] [&_span]:text-white">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
        <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
        <p className="text-xs text-[#8892a4] mb-6">Last Updated: March 1, 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">1. Introduction</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            ClariVex Solutions is an outsourced accounting firm serving businesses
            in the US, UK, AU, and CA markets. This Privacy Policy explains the
            scope of how we collect, use, and protect personal and business
            information. We are committed to handling data responsibly and with
            strong privacy protections.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">2. Data We Collect</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We collect contact form data (name, email, phone, company, and
            message), client financial data provided for service delivery, and
            website usage data through privacy-respecting analytics. We use session
            cookies for admin access only. IP addresses may be used for rate
            limiting only and are not stored permanently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">3. How We Use Data</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We use data to deliver accounting services, respond to enquiries, send
            finance and tax updates where explicit consent is provided, improve our
            services, and meet legal and regulatory obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">4. Legal Basis (UK/EU GDPR)</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            For UK and EU data subjects, our legal bases include Article 6(1)(b)
            contractual necessity for service delivery, Article 6(1)(c) legal
            obligation for regulatory compliance, and Article 6(1)(a) consent for
            marketing communications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">5. Data Retention</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Enquiry data is retained for 2 years. Client financial records are
            retained for 7 years to satisfy HMRC, ATO, CRA, and IRS requirements.
            Analytics data is retained for 13 months. Admin session data is deleted
            immediately on logout.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">6. Security</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We apply TLS encryption in transit, encryption at rest, and
            multi-factor authentication on all internal systems. All staff and
            contractors operate under NDAs. Access reviews are conducted quarterly,
            and security assessments are performed annually.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">7. Data Sharing</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We do not sell or rent personal data. Limited sharing occurs only with
            processors under data processing agreements, including Resend (email
            delivery, EU-US transfer covered by SCCs), Cloudinary (image hosting,
            SOC 2 compliant), and Neon (database hosting, GDPR compliant). We do
            not use advertising networks or data brokers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">8. International Transfers</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Data may be processed in the EU and the US. International transfers are
            protected by Standard Contractual Clauses or equivalent adequacy
            mechanisms where required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">9. Your Rights</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            UK/EU data subjects have rights to access, rectification, erasure,
            restriction, portability, objection, and to lodge a complaint with the
            ICO. AU data subjects have access and correction rights under the
            Privacy Act 1988. CA data subjects have rights to access, correction,
            and withdrawal of consent under PIPEDA. California residents have
            rights to know, delete, and opt-out of sale under CCPA; we do not sell
            data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">10. Cookies</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We use session cookies only for admin authentication. We do not use
            tracking cookies or advertising pixels. Analytics are configured to
            respect privacy. You may disable cookies in your browser settings
            without affecting public-facing site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">11. Children's Privacy</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Our services are designed exclusively for businesses and adults. We do
            not knowingly collect personal information from individuals under 18
            years of age.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">12. Policy Updates</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            We may update this Privacy Policy periodically. Material changes will be
            notified by email at least 30 days in advance. Continued use of our
            services after the notice period constitutes acceptance. The latest
            version is always available at clarivex.net/privacy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mt-8 mb-3">13. Contact and Data Controller</h2>
          <p className="text-[#8892a4] leading-relaxed mb-4">
            Contact us at privacy@clarivex.net. Data Controller: ClariVex
            Solutions, 421 Shivalik Shilp, Iscon Cross Road, SG Highway, Ahmedabad
            380058. For UK data subjects, we are registered with the ICO.
          </p>
        </section>
      </div>
    </main>
  );
}
