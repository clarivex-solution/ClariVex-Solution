import { Building2, CheckCircle, Clock, Handshake } from "lucide-react";
import Image from "next/image";
import SectionLink from "@/components/SectionLink";

const heroStats = [
  { value: "15+", label: "YEARS", Icon: Clock },
  { value: "280+", label: "CLIENTS", Icon: Handshake },
  { value: "22", label: "INDUSTRIES", Icon: Building2 },
  { value: "100%", label: "ON-TIME", Icon: CheckCircle },
];

const defaultSubtitle =
  "Your outsourced accounting and finance operations partner — combining expert support and smart technology to help US, UK, AU & CA businesses scale with confidence.";

export function HeroSkeleton() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[90vw] w-[90vw] max-h-[700px] max-w-[700px]"
        style={{ background: "radial-gradient(circle at top right, rgba(106, 165, 149, 0.20) 0%, transparent 60%)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px]" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-16 sm:px-6 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="w-full items-center gap-16 lg:grid lg:grid-cols-2">
          <div className="w-full">
            <div className="space-y-3">
              <div className="h-9 w-3/4 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
              <div className="h-9 w-2/3 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
              <div className="h-9 w-1/2 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-[#e2e4e9]" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[#e2e4e9]" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-full animate-pulse rounded-full bg-[#e2e4e9] sm:w-36" />
              <div className="h-12 w-full animate-pulse rounded-full bg-[#e2e4e9] sm:w-40" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="h-[420px] w-full animate-pulse rounded-xl bg-[#e2e4e9]" />
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-[#e2e4e9] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex items-center justify-center gap-3 px-4 py-5 sm:px-6 ${i > 1 ? "lg:border-l lg:border-[#e2e4e9]" : ""} ${i <= 2 ? "border-b border-[#e2e4e9] lg:border-b-0" : ""} ${i % 2 === 1 ? "border-r border-[#e2e4e9] lg:border-r-0" : ""}`}>
                <div>
                  <div className="h-7 w-14 animate-pulse rounded bg-[#e2e4e9]" />
                  <div className="mt-2 h-3 w-12 animate-pulse rounded bg-[#e2e4e9]" />
                </div>
                <div className="h-7 w-7 animate-pulse rounded-full bg-[#e2e4e9]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero({ countryLabel, h1Line1, h1Line2, subtitle = defaultSubtitle, flagSrc, seoH1 }) {
  const hasCountryHeading = Boolean(h1Line1 || h1Line2);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden" style={{ animation: "heroFadeIn 350ms ease-out both" }}>
      <style>{`@keyframes heroFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      <div className="pointer-events-none absolute right-0 top-0 h-[90vw] w-[90vw] max-h-[700px] max-w-[700px]"
        style={{ background: "radial-gradient(circle at top right, rgba(106, 165, 149, 0.20) 0%, transparent 60%)" }} />

      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl">
          <div className="absolute -left-16 top-[55%] h-[350px] w-[350px] -translate-y-1/2 sm:-left-24 sm:h-[500px] sm:w-[500px] lg:top-[68%] lg:h-[600px] lg:w-[600px]"
            style={{ background: "radial-gradient(circle at center, rgba(106, 165, 149, 0.16) 0%, transparent 70%)" }} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-14 lg:px-12 lg:pt-24 lg:pb-16">
        <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
          {/* Left — Text */}
          <div className="order-2 text-center md:order-1 md:text-left">
            {seoH1 ? (
              <>
                <h1 className="font-[family-name:var(--font-playfair)] text-[1.9rem] font-black leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                  {hasCountryHeading ? (
                    <>
                      <span className="block">{h1Line1}</span>
                      <span className="block text-[#6aa595]">
                        {flagSrc && (
                          <img
                            src={flagSrc}
                            alt=""
                            className="mr-2.5 mb-1 inline-block rounded-sm lg:hidden"
                            style={{ width: 28, height: 19 }}
                          />
                        )}
                        {h1Line2}
                      </span>
                    </>
                  ) : (
                    <><span className="block">Empowering</span><span className="block">Growth</span><span className="block">Through <span className="text-[#6aa595]">Financial</span></span><span className="block text-[#6aa595]">Clarity.</span></>
                  )}
                </h1>
                <p className="sr-only">{seoH1}</p>
              </>
            ) : hasCountryHeading ? (
              <h1 className="font-[family-name:var(--font-playfair)] text-[1.9rem] font-black leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">{h1Line1}</span>
                <span className="block text-[#6aa595]">
                  {flagSrc && (
                    <img
                      src={flagSrc}
                      alt=""
                      className="mr-2.5 mb-1 inline-block rounded-sm lg:hidden"
                      style={{ width: 28, height: 19 }}
                    />
                  )}
                  {h1Line2}
                </span>
              </h1>
            ) : (
              <h1 className="font-[family-name:var(--font-playfair)] text-[1.9rem] font-black leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">Empowering</span>
                <span className="block">Growth</span>
                <span className="block">Through <span className="text-[#6aa595]">Financial</span></span>
                <span className="block text-[#6aa595]">Clarity.</span>
              </h1>
            )}

            <p className="mx-auto mt-5 max-w-[480px] text-base leading-relaxed text-[#5a6478] sm:mt-6 md:mx-0">{subtitle}</p>

            <div className="mt-6 flex flex-row justify-center gap-3 md:justify-start">
              <SectionLink href="#contact" sectionId="contact" className="whitespace-nowrap rounded-full bg-[#1a1a2e] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2d3550] active:scale-95 sm:px-7 sm:py-3.5">
                Talk to Experts
              </SectionLink>
              <SectionLink href="#process" sectionId="process" className="whitespace-nowrap rounded-full border-2 border-[#1a1a2e] bg-transparent px-5 py-3 text-sm font-semibold text-[#1a1a2e] transition-all duration-300 hover:bg-[#1a1a2e] hover:text-white active:scale-95 sm:px-7 sm:py-3.5">
                See How It Works
              </SectionLink>
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="order-1 flex items-center justify-center md:order-2">
            <Image
              src="/hero.svg"
              alt="Financial growth illustration"
              width={580}
              height={480}
              className="h-auto w-[200px] object-contain sm:w-[260px] md:w-full md:max-w-[420px] lg:max-w-[540px]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-[#e2e4e9] bg-white/90 backdrop-blur-sm mb-12 sm:mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 border-y border-[#d1d5db] lg:grid-cols-4">
            {heroStats.map((stat, index) => (
              <div key={stat.label}
                className={`flex items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 lg:px-8 ${index > 0 ? "lg:border-l lg:border-[#d1d5db]" : ""} ${index < 2 ? "border-b border-[#d1d5db] lg:border-b-0" : ""} ${index % 2 === 0 ? "border-r border-[#d1d5db] lg:border-r-0" : ""}`}>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e] sm:text-3xl md:text-4xl">
                    {stat.value.replace(/[^0-9]/g, "")}
                    {stat.value.match(/[^0-9]/g) && (
                      <span className="text-base font-bold sm:text-xl md:text-2xl">{stat.value.match(/[^0-9]/g).join("")}</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#8892a4] sm:mt-1 sm:text-xs">{stat.label}</p>
                </div>
                <stat.Icon className="h-6 w-6 shrink-0 text-[#6aa595]/60 sm:h-8 sm:w-8" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

