import Link from "next/link";

const heroStats = [
  { value: "15+", label: "Years" },
  { value: "280+", label: "Clients" },
  { value: "22", label: "Industries" },
  { value: "100%", label: "On-Time" },
];

const defaultLabel = "OUTSOURCED ACCOUNTING & FINANCE";
const defaultSubtitle =
  "Your outsourced accounting and finance operations partner \u2014 combining expert support and smart technology to help US, UK, AU & CA businesses scale with confidence.";

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
    <section className="relative flex h-screen items-center overflow-hidden bg-white pt-20 lg:pt-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#5a688e]/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#6aa595]/6 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-6 lg:px-12">
        <div className="items-center gap-20 lg:grid lg:grid-cols-2">
          <div>
            <div className="flex items-center">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-[#c9a96e]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                {flagSrc && <img src={flagSrc} alt="" className="mr-2 inline-block rounded-sm align-middle" style={{ width: 20, height: 14 }} />}
                {countryLabel}
              </span>
            </div>

            {/* SEO h1: visible and keyword-rich */}
            {seoH1 ? (
              <>
                <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.05] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                  {hasCountryHeading ? (
                    <>
                      <span className="block">{h1Line1}</span>
                      <span className="block text-[#6aa595]">{h1Line2}</span>
                    </>
                  ) : (
                    <>
                      <span className="block">Empowering Growth</span>
                      <span className="block">
                        Through <span className="text-[#6aa595]">Financial</span>
                      </span>
                      <span className="block text-[#5a688e]">Clarity.</span>
                    </>
                  )}
                </h1>
                <p className="sr-only">{seoH1}</p>
              </>
            ) : hasCountryHeading ? (
              <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.05] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">{h1Line1}</span>
                <span className="block text-[#6aa595]">{h1Line2}</span>
              </h1>
            ) : (
              <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-3xl font-bold leading-[1.05] text-[#1a1a2e] sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">Empowering Growth</span>
                <span className="block">
                  Through <span className="text-[#6aa595]">Financial</span>
                </span>
                <span className="block text-[#5a688e]">Clarity.</span>
              </h1>
            )}

            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#5a6478] sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="#contact"
                className="w-full rounded-full bg-[#5a688e] px-8 py-4 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6aa595] hover:shadow-lg hover:shadow-[#6aa595]/25 sm:w-auto"
              >
                Talk to Experts
              </Link>
              <Link
                href="#process"
                className="w-full rounded-full border border-[#e2e4e9] px-8 py-4 text-center text-sm text-[#5a6478] transition-all duration-300 hover:border-[#5a688e] hover:text-[#1a1a2e] sm:w-auto"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#e2e4e9] pt-6 lg:grid-cols-4 lg:gap-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#5a6478]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium dashboard visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Corner accent */}
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-tr-3xl border-r-2 border-t-2 border-[#c9a96e]/30" />
              <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-bl-3xl border-b-2 border-l-2 border-[#c9a96e]/30" />

              {/* Main card */}
              <div className="rounded-2xl border border-[#e2e4e9] bg-gradient-to-br from-[#f8f9fa] to-white p-8 shadow-xl">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5a688e] text-sm font-bold text-white">
                      CV
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a2e]">ClariVex Dashboard</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Finance Operations</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6aa595]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#c9a96e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#5a688e]" />
                  </div>
                </div>

                {/* KPI Row */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white border border-[#e2e4e9] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Revenue</p>
                    <p className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a2e]">$2.4M</p>
                    <p className="mt-1 text-[10px] font-medium text-[#6aa595]">{"\u2191"} 18.2%</p>
                  </div>
                  <div className="rounded-xl bg-white border border-[#e2e4e9] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Savings</p>
                    <p className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a2e]">$340K</p>
                    <p className="mt-1 text-[10px] font-medium text-[#6aa595]">{"\u2191"} 24.5%</p>
                  </div>
                  <div className="rounded-xl bg-white border border-[#e2e4e9] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Accuracy</p>
                    <p className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1a1a2e]">99.8%</p>
                    <p className="mt-1 text-[10px] font-medium text-[#6aa595]">{"\u2191"} 0.3%</p>
                  </div>
                </div>

                {/* Chart area */}
                <div className="mt-5 rounded-xl bg-white border border-[#e2e4e9] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#1a1a2e]">Monthly Close Performance</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] text-[#5a6478]">
                        <span className="h-2 w-2 rounded-full bg-[#5a688e]" /> Target
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-[#5a6478]">
                        <span className="h-2 w-2 rounded-full bg-[#6aa595]" /> Actual
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex h-20 items-end gap-1.5">
                    {[
                      { target: "45%", actual: "52%" },
                      { target: "50%", actual: "58%" },
                      { target: "48%", actual: "55%" },
                      { target: "55%", actual: "65%" },
                      { target: "60%", actual: "72%" },
                      { target: "58%", actual: "78%" },
                      { target: "65%", actual: "82%" },
                      { target: "70%", actual: "88%" },
                      { target: "72%", actual: "90%" },
                      { target: "75%", actual: "95%" },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-1 items-end gap-0.5">
                        <div
                          className="flex-1 rounded-t bg-[#5a688e]/25"
                          style={{ height: bar.target }}
                        />
                        <div
                          className="flex-1 rounded-t bg-[#6aa595]"
                          style={{ height: bar.actual }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[9px] text-[#5a6478]">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>Jun</span>
                    <span>Sep</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#5a688e] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-white/60">Compliance Score</p>
                    <div className="mt-2 flex items-end gap-2">
                      <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">100%</p>
                      <p className="mb-1 text-[10px] text-white/70">All filings current</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-[#e2e4e9] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">Active Clients</p>
                    <div className="mt-2 flex items-end gap-2">
                      <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1a1a2e]">280+</p>
                      <div className="mb-1 flex -space-x-1.5">
                        {["US", "UK", "AU", "CA"].map((c) => (
                          <span key={c} className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4f3ee] text-[7px] font-bold text-[#5a688e] ring-1 ring-white">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-xl border border-[#e2e4e9] bg-white px-4 py-3 shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-[#5a6478]">NDA</p>
                <p className="text-xs font-bold text-[#6aa595]">Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
