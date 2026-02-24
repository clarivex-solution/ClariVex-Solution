"use client";

import ContactForm from "@/components/ContactForm";
import { useCountry } from "@/components/CountryProvider";
import Hero from "@/components/Hero";
import { getContent } from "@/lib/countryContent";
import { countries } from "@/lib/countryData";
import {
  phoneContacts,
  processSteps,
  serviceCards,
  whyChooseUsCards
} from "@/lib/siteData";
import {
  CheckCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomeContent() {
  const { country } = useCountry();
  const content = getContent(country);

  return (
    <main>
      <section id="home">
        <Hero
          countryLabel={content.hero.countryLabel}
          h1Line1={content.hero.h1Line1}
          h1Line2={content.hero.h1Line2}
          subtitle={content.hero.subtitle}
          flagSrc={content.hero.flagSrc}
          seoH1={content.seo.h1}
        />
      </section>

      {/* Trusted Software bar */}
      <section className="bg-[#f8f9fa] border-y border-[#e2e4e9] py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="hidden shrink-0 mr-4 text-xs uppercase tracking-widest text-[#5a6478] sm:inline">
              Trusted Software:
            </span>
            {content.trustedSoftware.map((tool) => (
              <span
                key={tool}
                className="bg-white border border-[#e2e4e9] text-[#5a6478] text-xs rounded-full px-4 py-1.5 whitespace-nowrap hover:border-[#5a688e]/50 hover:text-[#1a1a2e] transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance banner (country-specific only) */}
      {content.compliance && (
        <section className="bg-white py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="rounded-2xl border border-[#5a688e]/20 bg-[#f8f9fa] p-8">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-16 bg-[#c9a96e]" />
                    <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                      {content.hero.flagSrc && (
                        <img src={content.hero.flagSrc} alt="" className="inline-block mr-2 rounded-sm" style={{ width: 18, height: 12 }} />
                      )}
                      Tax &amp; Compliance Coverage
                    </p>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl text-[#1a1a2e]">
                    Regional Compliance
                  </h3>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-[#5a6478]">{content.compliance.note}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {content.compliance.tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-[#e2e4e9] bg-white px-3 py-1.5 text-xs text-[#5a6478]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section id="process" className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">HOW WE WORK</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            A disciplined process for measurable financial control
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.step} className="group rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 transition-all duration-300 hover:border-[#5a688e]/50 hover:shadow-lg">
                <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#e2e4e9] transition-colors group-hover:text-[#5a688e]/20">{step.step}</p>
                <step.icon className="mt-4 h-6 w-6 text-[#6aa595]" />
                <h3 className="mt-3 text-lg font-semibold text-[#1a1a2e]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6478]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">OUR SERVICES</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Comprehensive Financial Solutions
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <article key={service.title} className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#5a688e]/40 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 text-[#5a688e] transition-colors duration-300 group-hover:bg-[#5a688e] group-hover:text-white">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#1a1a2e]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
                <Link href={service.href} className="mt-6 inline-block text-sm font-medium text-[#5a688e] transition-colors hover:text-[#6aa595]">
                  Learn More &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:gap-12 lg:px-12">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#1a1a2e] lg:text-6xl">{stat.value}</p>
              <div className="mx-auto mt-3 h-0.5 w-8 bg-[#6aa595]" />
              <p className="mt-4 text-sm uppercase tracking-wider text-[#5a6478]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Software */}
      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">TOOLS &amp; TECHNOLOGY</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Software We Work With
          </h2>
          <p className="mt-4 max-w-2xl text-[#5a6478]">
            Built on the tools modern finance teams rely on. We adapt to your systems &mdash; no forced migrations, no disruption.
          </p>
          <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-3">
            {content.softwareColumns.map((column) => (
              <article key={column.title} className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8">
                <h3 className="mb-6 border-b border-[#e2e4e9] pb-4 font-semibold text-[#1a1a2e]">{column.title}</h3>
                <div className="mt-2">
                  {column.tools.map((tool) => (
                    <div key={tool} className="flex items-center gap-3 border-b border-[#e2e4e9]/50 py-3 text-sm text-[#5a6478] transition-colors hover:text-[#1a1a2e]">
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

      {/* About */}
      <section id="about" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="relative rounded-2xl border border-[#e2e4e9] bg-white p-10 shadow-lg">
            <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-2xl border-l-2 border-t-2 border-[#c9a96e]/40" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#c9a96e]/40 shrink-0">
              <Image src="/dhimant-khatri.png" alt="CA Dhimant Khatri" fill sizes="96px" className="w-full h-full object-cover object-top" />
            </div>
            <p className="mt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e]">Dhimant Khatri</p>
            <p className="mt-1 text-sm text-[#6aa595]">Chartered Accountant &middot; ICAI Member</p>
            <div className="mt-6 h-px w-12 bg-[#c9a96e]" />
            <div className="mt-6 space-y-4">
              {["15+ Years Professional Experience", "Member, Institute of Chartered Accountants of India", "Audit, Taxation & Compliance Specialist"].map((point) => (
                <p key={point} className="flex items-center gap-3 text-sm text-[#5a6478]">
                  <CheckCircle className="h-4 w-4 text-[#6aa595]" />
                  {point}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#5a688e]">ABOUT US</p>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
              Professional Expertise You Can Trust
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              ClariVex Solutions combines deep accounting discipline with modern process control to help leadership teams make faster and safer financial decisions.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              From monthly close readiness to growth-stage advisory, our objective is to reduce friction in finance operations while improving transparency for founders, management, and stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">WHY CLARIVEX</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">
            Why Choose ClariVex Solution
          </h2>
          <div className="mt-12 grid gap-6 lg:mt-20 lg:grid-cols-2">
            {whyChooseUsCards.map((item) => (
              <article key={item.title} className="group rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 transition-all hover:border-[#5a688e]/40 hover:shadow-lg border-l-4 border-l-[#5a688e]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5a688e]/10 text-[#6aa595] transition-colors group-hover:bg-[#5a688e]/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#1a1a2e]">{item.title}</h3>
                <div className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <p key={point} className="flex items-start gap-2 text-sm leading-relaxed text-[#5a6478]">
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

      {/* Contact */}
      <section id="contact" className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-32">
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="mx-auto mb-6 h-px w-16 bg-[#c9a96e]" />
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#5a688e]">GET IN TOUCH</p>
            <h2 className="mt-4 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl">Contact Us</h2>
            <p className="mt-3 text-center text-slate-500">Book a free consultation today</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
            <div className="rounded-2xl border border-[#e2e4e9] bg-white p-10 shadow-lg">
              <h3 className="text-xl font-semibold text-[#1a1a2e]">Contact Information</h3>
              <div className="mb-8 mt-3 h-px w-10 bg-[#c9a96e]" />
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#6aa595]" />
                  <p className="text-sm leading-relaxed text-[#5a6478]">
                    421, Shivalik Shilp, Iscon Cross Road,<br />S.G. Highway, Ahmedabad &ndash; 380058
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[#6aa595]" />
                  <a href={`mailto:${content.contactEmail}`} className="text-sm text-[#5a6478] transition-colors hover:text-[#1a1a2e]">
                    {content.contactEmail}
                  </a>
                </div>
              </div>
              <div className="my-6 h-px w-full bg-[#e2e4e9]" />
              <p className="mb-4 text-sm font-medium text-[#1a1a2e]">Our Team</p>
              <div className="space-y-4">
                {phoneContacts.map((contact) => (
                  <div key={contact.phoneRaw} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#6aa595]" />
                      <div>
                        <p className="text-sm font-medium text-[#1a1a2e]">{contact.name}</p>
                        <p className="text-xs text-[#5a6478]">{contact.role}</p>
                      </div>
                    </div>
                    <a href={`tel:${contact.phoneRaw}`} className="shrink-0 font-mono text-sm text-[#6aa595]">{contact.phoneDisplay}</a>
                  </div>
                ))}
              </div>
              <div className="my-6 h-px w-full bg-[#e2e4e9]" />
              <p className="mb-4 text-sm font-medium text-[#1a1a2e]">Global Coverage</p>
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => (
                  <span key={c.code} className="flex items-center gap-1.5 rounded-full border border-[#e2e4e9] bg-[#f8f9fa] px-3 py-1.5 text-xs text-[#5a6478]">
                    <img src={c.flagSrc} alt={c.name} className="rounded-sm" style={{ width: 16, height: 11 }} />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
