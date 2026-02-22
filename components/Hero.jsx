import Link from "next/link";

const heroStats = [
  { value: "15+", label: "Years" },
  { value: "280+", label: "Clients" },
  { value: "22", label: "Industries" },
  { value: "100%", label: "On-Time" },
];

const chartBars = [
  { key: "w1", height: "36%" },
  { key: "w2", height: "55%" },
  { key: "w3", height: "42%" },
  { key: "w4", height: "68%" },
  { key: "w5", height: "84%" },
];

const highlightedPhrase = "Financial Clarity";

function renderHeroHeading(text) {
  const start = text.indexOf(highlightedPhrase);

  if (start === -1) {
    return text;
  }

  const before = text.slice(0, start);
  const after = text.slice(start + highlightedPhrase.length);

  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        {highlightedPhrase}
      </span>
      {after}
    </>
  );
}

export default function Hero({
  badgeText = "Trusted by 280+ Businesses Across US, UK, AU & CA",
  heroH1 = "Empowering Growth Through Financial Clarity",
  heroSub = "Your outsourced accounting and finance operations partner for US, UK, AU, and CA businesses. We align reporting, compliance, and execution to help you grow with confidence.",
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E3A5F]">
      <div className="absolute left-10 top-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-80 w-80 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              {badgeText}
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              {renderHeroHeading(heroH1)}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {heroSub}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Talk to Experts
              </Link>
              <Link
                href="#process"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See How It Works
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-white/80">Monthly Financial Report</p>
            <div className="mt-8 flex h-52 items-end gap-3">
              {chartBars.map((bar) => (
                <div
                  key={bar.key}
                  className="w-full rounded-t bg-blue-400/60"
                  style={{ height: bar.height }}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">
                Revenue {"\u2191"}12%
              </span>
              <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-medium text-red-300">
                Expenses {"\u2193"}3%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
