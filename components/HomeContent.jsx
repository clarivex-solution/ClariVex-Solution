"use client";
import { useState } from "react";

import ContactForm from "@/components/ContactForm";
import { useCountry } from "@/components/CountryProvider";
import Hero, { HeroSkeleton } from "@/components/Hero";
import { AccountingServiceSchema } from "@/components/JsonLd";
import { getContent } from "@/lib/countryContent";
import { countries } from "@/lib/countryData";
import {
  phoneContacts,
  processSteps,
  serviceCards,
  whyChooseUsCards
} from "@/lib/siteData";
import {
  ArrowRight,
  BarChart2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users
} from "lucide-react";
import Link from "next/link";

export default function HomeContent() {
  const { country, ready } = useCountry();
  const content = getContent(country);

  const [emailCopied, setEmailCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(content.contactEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }

  return (
    <main>
      <AccountingServiceSchema countryCode={country} content={content} />
      <section id="home">
        {!ready ? (
          <HeroSkeleton />
        ) : (
          <Hero
            countryLabel={content.hero.countryLabel}
            h1Line1={content.hero.h1Line1}
            h1Line2={content.hero.h1Line2}
            subtitle={content.hero.subtitle}
            flagSrc={content.hero.flagSrc}
            seoH1={content.seo.h1}
          />
        )}
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
      <section id="process" className="bg-[#f8f9fa] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">HOW WE WORK</p>
          <h2 className="mt-3 mb-16 max-w-2xl font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-5xl lg:font-black">
            A disciplined process for measurable financial control
          </h2>
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <article className="relative h-full bg-white rounded-2xl p-8 border border-[#e2e4e9] hover:border-[#6aa595] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#6aa595] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <p className="absolute top-4 right-6 font-[family-name:var(--font-playfair)] text-7xl font-black text-[#6aa595]/20">
                    {step.step}
                  </p>
                  <step.icon className="mt-2 mb-4 h-8 w-8 text-[#6aa595]" />
                  <h3 className="mb-3 text-lg font-bold text-[#1a1a2e]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#5a6478]">{step.description}</p>
                </article>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#e2e4e9] flex items-center justify-center shadow-sm">
                      <ChevronRight className="h-4 w-4 text-[#6aa595]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#f4f3ee] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-[#6aa595] tracking-[0.2em] text-xs font-semibold uppercase">OUR SERVICES</p>
          <h2 className="mt-3 mb-4 font-[family-name:var(--font-playfair)] text-5xl font-black text-[#1a1a2e]">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-[#5a6478] text-lg mb-16 max-w-xl">
            End-to-end accounting and finance support — built for growing businesses across US, UK, AU & CA.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service) => {
              return (
                <Link key={service.title} href={service.href} className="flex h-full">
                  <article className="bg-white rounded-2xl p-8 border border-[#e2e4e9] hover:border-[#6aa595]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col w-full">
                    <div className="w-12 h-12 rounded-xl bg-[#6aa595]/10 flex items-center justify-center mb-5 group-hover:bg-[#6aa595]/20 transition-colors duration-300">
                      <service.icon className="h-5 w-5 text-[#6aa595]" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-[#1a1a2e]">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1 mb-6 text-[#5a6478]">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-300 mt-auto text-[#6aa595]">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>



      {/* Software */}
      <section className="bg-[#f8f9fa] border-t border-[#e2e4e9] py-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold">Tools & Technology</p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] font-black text-4xl text-[#1a1a2e]">
            Software We Work With
          </h2>
          <p className="mt-3 mb-14 max-w-xl text-[#5a6478]">
            Built on the tools modern finance teams rely on. We adapt to your systems &mdash; no forced migrations, no disruption.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {content.softwareColumns.map((column) => {
              let Icon = Calculator;
              if (column.title === 'Payroll & Expense') Icon = Users;
              if (column.title === 'Reporting & MIS') Icon = BarChart2;

              return (
                <div key={column.title} className="relative rounded-2xl bg-white border border-[#e2e4e9] p-10 hover:border-[#6aa595]/40 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6aa595] to-[#5a688e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-lg bg-[#6aa595]/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#6aa595]" />
                    </div>
                    <h3 className="font-bold text-[#1a1a2e] text-base">{column.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {column.tools.map((tool) => (
                      <span key={tool} className="rounded-full bg-white border border-[#e2e4e9] shadow-sm px-4 py-2 text-sm text-[#5a6478] font-medium hover:bg-[#6aa595] hover:border-[#6aa595] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f0f2f5] to-transparent rounded-l-2xl pl-2 pr-12 py-2">
              <div className="w-8 h-8 bg-[#e2e4e9]/80 rounded-[8px] flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-[#5a688e]" />
              </div>
              <span className="text-sm text-[#5a6478]">We adapt to your systems—no forced migrations, no disruption.</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-[#f4f3ee] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[45%_1fr] lg:gap-20">
            {/* Card left */}
            <div className="relative rounded-2xl bg-white border border-[#e2e4e9] p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              {/* Subtle teal glow top-right */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#6aa595]/8 blur-3xl pointer-events-none" />

              {/* Profile */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-[#6aa595]/40 p-1 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                    <img
                      src="/dhimant-khatri.png"
                      alt="Dhimant Khatri"
                      className="w-full h-full rounded-full object-cover object-top scale-110 translate-y-2"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center p-[2px] shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#6aa595] flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#1a1a2e]">Dhimant Khatri</h3>
                  <p className="text-[#5a6478] text-sm mt-1">Chartered Accountant · ICAI Member</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a5] mt-3 rounded-full shadow-sm" />
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                {[
                  "15+ Years Professional Experience",
                  "Member, Institute of Chartered Accountants of India",
                  "Audit, Taxation & Compliance Specialist",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-[#f8f9fa] border border-[#e2e4e9]">
                    <CheckCircle2 className="h-5 w-5 text-[#6aa595] shrink-0" />
                    <span className="text-sm text-[#5a6478]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content right */}
            <div className="max-w-[520px]">
              <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold">About Us</p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-black text-[#1a1a2e] leading-tight">
                Professional Expertise<br />You Can Trust
              </h2>
              <p className="mt-6 text-[#5a6478] leading-relaxed text-lg max-w-[440px]">
                ClariVex Solutions combines deep accounting discipline with modern process control to help leadership teams make faster and safer financial decisions.
              </p>
              <p className="mt-4 text-[#5a6478] leading-relaxed max-w-[440px]">
                From monthly close readiness to growth-stage advisory, our objective is to reduce friction in finance operations while improving transparency for founders, management, and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-6 h-px w-16 bg-[#c9a96e]" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">WHY CLARIVEX</p>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl font-black text-[#1a1a2e] sm:text-5xl mb-16">
            Why Choose ClariVex Solution
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {whyChooseUsCards.map((item) => (
              <article key={item.title} className="group rounded-2xl border border-[#e2e4e9] bg-[#f8f9fa] p-8 hover:border-[#6aa595]/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#6aa595] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                <div className="w-12 h-12 rounded-xl bg-[#f0f2f5] flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-[#5a688e]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-4">{item.title}</h3>
                <div className="space-y-3">
                  {item.points.map((point) => (
                    <p key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[#5a6478]">
                      <CheckCircle2 className="h-4 w-4 text-[#6aa595] shrink-0 mt-0.5" />
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
                  <Link
                    href="https://maps.google.com/?q=421+Shivalik+Shilp+Iscon+Cross+Road+SG+Highway+Ahmedabad+380058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-relaxed text-[#5a6478] transition-colors hover:text-[#6aa595] hover:underline"
                  >
                    421, Shivalik Shilp, Iscon Cross Road,<br />S.G. Highway, Ahmedabad &ndash; 380058
                  </Link>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[#6aa595]" />
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${content.contactEmail}`}
                      className="text-sm text-[#5a6478] transition-colors hover:text-[#6aa595] hover:underline"
                    >
                      {content.contactEmail}
                    </a>
                    <Clipboard
                      onClick={handleCopyEmail}
                      className="h-3.5 w-3.5 text-[#5a6478]/50 hover:text-[#6aa595] cursor-pointer transition-colors"
                    />
                    {emailCopied && (
                      <span className="text-[10px] font-medium text-[#6aa595] bg-[#6aa595]/10 px-2 py-0.5 rounded-full">
                        Copied!
                      </span>
                    )}
                  </div>
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
