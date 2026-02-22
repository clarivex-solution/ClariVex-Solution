import Link from "next/link";

const heroStats = [
  { value: "15+", label: "Years" },
  { value: "280+", label: "Clients" },
  { value: "22", label: "Industries" },
  { value: "100%", label: "On-Time" },
];

const reportBars = [
  { month: "Jun", height: "34%" },
  { month: "Jul", height: "48%" },
  { month: "Aug", height: "44%" },
  { month: "Sep", height: "58%" },
  { month: "Oct", height: "70%" },
  { month: "Nov", height: "81%" },
  { month: "Dec", height: "92%" },
];

const defaultLabel = "OUTSOURCED ACCOUNTING & FINANCE";
const defaultSubtitle =
  "Your outsourced accounting and finance operations partner \u2014 combining expert support and smart technology to help US, UK, AU & CA businesses scale with confidence.";

export default function Hero({
  countryLabel = defaultLabel,
  h1Line1,
  h1Line2,
  subtitle = defaultSubtitle,
  flag,
}) {
  const hasCountryHeading = Boolean(h1Line1 || h1Line2);

  return (
    <section className="h-screen bg-[#0d0f14] relative overflow-hidden flex items-center pt-20 lg:pt-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#5a688e]/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#6aa595]/8 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="items-center gap-20 lg:grid lg:grid-cols-2">
          <div>
            <div className="flex items-center">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-[#c9a96e]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#6aa595]">
                {flag ? `${flag} ${countryLabel}` : countryLabel}
              </span>
            </div>

            {hasCountryHeading ? (
              <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.05] text-white lg:text-5xl xl:text-6xl">
                <span className="block">{h1Line1}</span>
                <span className="block text-[#6aa595]">{h1Line2}</span>
              </h1>
            ) : (
              <h1 className="mt-8 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.05] text-white lg:text-5xl xl:text-6xl">
                <span className="block">Empowering Growth</span>
                <span className="block">
                  Through <span className="text-[#6aa595]">Financial</span>
                </span>
                <span className="block text-[#5a688e]">Clarity.</span>
              </h1>
            )}

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#8892a4]">
              {subtitle}
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="#contact"
                className="rounded-full bg-[#5a688e] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6aa595] hover:shadow-lg hover:shadow-[#6aa595]/25"
              >
                Talk to Experts
              </Link>
              <Link
                href="#process"
                className="rounded-full border border-[#1e2330] px-8 py-4 text-sm text-[#8892a4] transition-all duration-300 hover:border-[#5a688e] hover:text-white"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-6 border-t border-[#1e2330] pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#8892a4]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative rounded-2xl border border-[#1e2330] bg-[#13161e] p-8">
              <div className="absolute right-0 top-0 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-[#c9a96e]/40" />

              <div className="flex justify-between">
                <p className="font-semibold text-white">Monthly Report</p>
                <p className="text-sm text-[#8892a4]">Dec 2025</p>
              </div>

              <div className="mt-6">
                <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
                  $284,500
                </p>
                <p className="mt-1 text-xs text-[#8892a4]">Total Revenue</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#6aa595]" />
                  <span className="text-xs text-[#6aa595]">{"\u2191"} 12.4% from last month</span>
                </div>
              </div>

              <div className="mt-8 flex h-24 items-end gap-2">
                {reportBars.map((bar, index) => (
                  <div
                    key={bar.month}
                    className={`flex-1 rounded-t-sm ${
                      index >= reportBars.length - 2 ? "bg-[#5a688e]" : "bg-[#5a688e]/40"
                    }`}
                    style={{ height: bar.height }}
                  />
                ))}
              </div>

              <div className="mt-2 flex gap-2">
                {reportBars.map((bar) => (
                  <span
                    key={bar.month}
                    className="flex-1 text-center text-[10px] text-[#8892a4]"
                  >
                    {bar.month}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#1e2330] pt-6">
                <div>
                  <p className="text-xs text-[#8892a4]">Expenses</p>
                  <p className="text-lg font-semibold text-white">$142,200</p>
                  <p className="text-xs text-[#6aa595]">{"\u2193"} 3.2%</p>
                </div>
                <div>
                  <p className="text-xs text-[#8892a4]">Net Profit</p>
                  <p className="text-lg font-semibold text-white">$142,300</p>
                  <p className="text-xs text-[#6aa595]">{"\u2191"} 8.1%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
