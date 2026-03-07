import { Building2, CheckCircle, Clock, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroStats = [
  { value: "15+", label: "YEARS", Icon: Clock },
  { value: "280+", label: "CLIENTS", Icon: Handshake },
  { value: "22", label: "INDUSTRIES", Icon: Building2 },
  { value: "100%", label: "ON-TIME", Icon: CheckCircle },
];

const defaultLabel = "OUTSOURCED ACCOUNTING & FINANCE";
const defaultSubtitle =
  "Your outsourced accounting and finance operations partner \u2014 combining expert support and smart technology to help US, UK, AU & CA businesses scale with confidence.";

/* ------------------------------------------------------------------ */
/*  Hero Skeleton — pulse placeholders, same layout as Hero           */
/* ------------------------------------------------------------------ */

export function HeroSkeleton() {
  return (
    <section className="relative flex h-screen flex-col overflow-hidden">
      {/* Ambient top-right glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px]"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(106, 165, 149, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* CTA highlight glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl">
          <div
            className="absolute left-6 top-[55%] h-[500px] w-[500px] -translate-y-1/2 lg:left-12 lg:top-[60%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(106, 165, 149, 0.12) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Main content area */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pt-20 lg:px-12 lg:pt-24">
        <div className="w-full items-center gap-16 lg:grid lg:grid-cols-2">
          <div>
            <div className="space-y-3">
              <div className="h-10 w-80 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
              <div className="h-10 w-72 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
              <div className="h-10 w-64 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
              <div className="h-10 w-40 animate-pulse rounded-lg bg-[#e2e4e9] sm:h-12 lg:h-14" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-4 w-full max-w-[480px] animate-pulse rounded bg-[#e2e4e9]" />
              <div className="h-4 w-4/5 max-w-[480px] animate-pulse rounded bg-[#e2e4e9]" />
              <div className="h-4 w-3/5 max-w-[480px] animate-pulse rounded bg-[#e2e4e9]" />
            </div>
            <div className="mt-8 flex gap-4">
              <div className="h-12 w-36 animate-pulse rounded-full bg-[#e2e4e9]" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-[#e2e4e9]" />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="h-[420px] w-full animate-pulse rounded-xl bg-[#e2e4e9]" />
          </div>
        </div>
      </div>

      {/* Stats bar — bottom of viewport */}
      <div className="relative z-10 border-t border-[#e2e4e9] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex items-center justify-center gap-3 px-6 py-6 ${
                  i > 1 ? "lg:border-l lg:border-[#e2e4e9]" : ""
                } ${i <= 2 ? "border-b border-[#e2e4e9] lg:border-b-0" : ""} ${
                  i % 2 === 1 ? "border-r border-[#e2e4e9] lg:border-r-0" : ""
                }`}
              >
                <div>
                  <div className="h-8 w-16 animate-pulse rounded bg-[#e2e4e9]" />
                  <div className="mt-2 h-3 w-14 animate-pulse rounded bg-[#e2e4e9]" />
                </div>
                <div className="h-8 w-8 animate-pulse rounded-full bg-[#e2e4e9]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — main component                                            */
/* ------------------------------------------------------------------ */

export default function Hero({
  countryLabel = defaultLabel,
  h1Line1,
  h1Line2,
  subtitle = defaultSubtitle,
  flagSrc,
  seoH1,
}) {
  const hasCountryHeading = Boolean(h1Line1 || h1Line2);

  return (
    <section
      className="relative flex h-screen flex-col overflow-hidden"
      style={{ animation: "heroFadeIn 350ms ease-out both" }}
    >
      <style>{`@keyframes heroFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Ambient top-right glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[80vw] w-[80vw] max-h-[800px] max-w-[800px]"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(106, 165, 149, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* CTA highlight glow */}
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl">
          <div
            className="absolute left-6 top-[55%] h-[500px] w-[500px] -translate-y-1/2 lg:left-12 lg:top-[60%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(106, 165, 149, 0.12) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Main content area — grows to fill space above stats */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pt-20 lg:px-12 lg:pt-24">
        <div className="w-full items-center gap-16 lg:grid lg:grid-cols-2">
          {/* Left Column — Typography */}
          <div>
            {seoH1 ? (
              <>
                <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl">
                  {hasCountryHeading ? (
                    <>
                      <span className="block">{h1Line1}</span>
                      <span className="block text-[#6aa595]">{h1Line2}</span>
                    </>
                  ) : (
                    <>
                      <span className="block">Empowering</span>
                      <span className="block">Growth</span>
                      <span className="block">
                        Through{" "}
                        <span className="text-[#6aa595]">Financial</span>
                      </span>
                      <span className="block text-[#6aa595]">Clarity.</span>
                    </>
                  )}
                </h1>
                <p className="sr-only">{seoH1}</p>
              </>
            ) : hasCountryHeading ? (
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl">
                <span className="block">{h1Line1}</span>
                <span className="block text-[#6aa595]">{h1Line2}</span>
              </h1>
            ) : (
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-extrabold leading-[1.08] text-[#1a1a2e] sm:text-4xl lg:text-5xl">
                <span className="block">Empowering</span>
                <span className="block">Growth</span>
                <span className="block">
                  Through{" "}
                  <span className="text-[#6aa595]">Financial</span>
                </span>
                <span className="block text-[#6aa595]">Clarity.</span>
              </h1>
            )}

            {/* Subtitle */}
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-[#5a6478]">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="rounded-full bg-[#1a1a2e] px-7 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2a2a40] sm:w-auto"
              >
                Talk to Experts
              </Link>
              <Link
                href="#process"
                className="rounded-full border border-[#1a1a2e] px-7 py-3 text-center text-sm font-medium text-[#1a1a2e] transition-colors duration-200 hover:bg-[#1a1a2e] hover:text-white sm:w-auto"
              >
                See How It Works
              </Link>
            </div>
          </div>

          {/* Right Column — Hero Image */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <Image
              src="/hero.svg"
              alt="Financial growth illustration"
              width={580}
              height={480}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Stats bar — floating above bottom of viewport, inside hero */}
      <div className="relative z-10 w-full bg-transparent pb-10 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-[#d1d5db]">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center justify-between gap-4 px-6 lg:px-8 py-5 ${
                  /* vertical dividers between cells on desktop */
                  index > 0 ? "lg:border-l lg:border-[#d1d5db]" : ""
                } ${
                  /* bottom border on top row on mobile */
                  index < 2 ? "border-b border-[#d1d5db] lg:border-b-0" : ""
                } ${
                  /* right divider on left col on mobile */
                  index % 2 === 0 ? "border-r border-[#d1d5db] lg:border-r-0" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-[#8892a4]">
                    {stat.label}
                  </p>
                </div>
                <stat.Icon className="h-8 w-8 shrink-0 text-[#6aa595]/40" strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
