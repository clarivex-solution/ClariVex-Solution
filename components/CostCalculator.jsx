"use client";

import { useState } from "react";

/*
 * Local market rates sourced from 2026 industry benchmarks:
 * USA  — BLS, QuickBooks, NerdWallet, Bark (2026): $400–$1,500/mo
 * UK   — digiaccounting.co.uk, aoneoutsourcing.uk (2026): £150–£900/mo
 * CA   — premiumbookkeeping.ca, maxprofinancials.ca (2026): C$350–$1,200/mo
 * AU   — arbouradvisory.com.au, topbookkeepers.com.au (2026): A$350–$1,500/mo
 *
 * Clarivex pricing: offshore CA-reviewed service, ~35–45% below local market.
 */
const COUNTRIES = {
  us: {
    label: "USA 🇺🇸",
    symbol: "$",
    local: [400, 1500],
    clarivex: [249, 849],
  },
  uk: { label: "UK 🇬🇧", symbol: "£", local: [150, 900], clarivex: [99, 499] },
  ca: {
    label: "Canada 🇨🇦",
    symbol: "C$",
    local: [350, 1200],
    clarivex: [219, 699],
  },
  au: {
    label: "Australia 🇦🇺",
    symbol: "A$",
    local: [350, 1500],
    clarivex: [219, 849],
  },
};

function lerp(range, t) {
  return Math.round(range[0] + (range[1] - range[0]) * t);
}

function fmt(n, symbol) {
  return symbol + n.toLocaleString();
}

function sizeTierLabel(v) {
  if (v < 33) return "Starter";
  if (v < 66) return "Growing";
  return "Established";
}

export default function CostCalculator({ defaultCountry = "us" }) {
  const [country, setCountry] = useState(
    Object.keys(COUNTRIES).includes(defaultCountry) ? defaultCountry : "us",
  );
  const [sliderVal, setSliderVal] = useState(35);

  const c = COUNTRIES[country];
  const t = sliderVal / 100;
  const local = lerp(c.local, t);
  const clarivex = lerp(c.clarivex, t);
  const savings = local - clarivex;
  const pct = Math.round((savings / local) * 100);
  const tier = sizeTierLabel(sliderVal);

  return (
    <section className="bg-[#f4f3ee] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-4 h-px w-12 bg-[#c9a96e] sm:mb-6 sm:w-16" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6aa595] font-semibold">
            Cost Calculator
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] font-black text-3xl text-[#1a1a2e] sm:text-4xl">
            What could you save on bookkeeping?
          </h2>
          <p className="mt-3 max-w-xl text-[#5a6478]">
            Compare typical local bookkeeping costs against a dedicated,
            CA&#8209;reviewed Clarivex team — for your country and business
            size.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — controls */}
          <div className="space-y-8">
            {/* Country selector */}
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#5a688e] font-semibold mb-3">
                Your Country
              </p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(COUNTRIES).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setCountry(key)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition-all duration-200
                      ${
                        country === key
                          ? "bg-[#1a1a2e] border-[#1a1a2e] text-white shadow-lg"
                          : "bg-white border-[#e2e4e9] text-[#5a6478] hover:border-[#6aa595]/50 hover:text-[#1a1a2e]"
                      }`}
                  >
                    {data.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#5a688e] font-semibold">
                  Business Size
                </p>
                <span className="text-xs font-semibold text-[#6aa595] bg-[#6aa595]/10 px-2.5 py-1 rounded-full">
                  {tier}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6aa595 0%, #6aa595 ${sliderVal}%, #e2e4e9 ${sliderVal}%, #e2e4e9 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-[#9ca3af]">
                <span>Starter</span>
                <span>Growing</span>
                <span>Established</span>
              </div>
            </div>

            <p className="text-xs text-[#9ca3af] leading-relaxed">
              Figures are 2026 industry benchmark estimates for small-to-mid
              size businesses. Your actual quote depends on transaction volume
              and scope — this is a starting point, not a final price.
            </p>
          </div>

          {/* Right — receipt card */}
          <div className="relative">
            {/* Notch top */}
            <div className="flex overflow-hidden h-4 -mb-px relative z-10">
              {Array.from({ length: 22 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-[#f4f3ee] shrink-0 -ml-[2px] border border-[#e2e4e9]"
                />
              ))}
            </div>

            <div className="bg-white border-x border-[#e2e4e9] shadow-xl px-7 py-8">
              <div className="text-center mb-5">
                <p className="text-xs font-bold tracking-[3px] text-[#1a1a2e] uppercase">
                  Clarivex Solution
                </p>
                <p className="text-[10px] tracking-[2px] text-[#9ca3af] uppercase mt-0.5">
                  Cost Comparison Receipt
                </p>
              </div>

              <div className="border-t border-dashed border-[#e2e4e9] my-4" />

              {/* Line items */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[#5a6478]">
                    Local Bookkeeping
                  </span>
                  <span className="font-bold text-[#1a1a2e] tabular-nums">
                    {fmt(local, c.symbol)}
                    <span className="text-xs font-normal text-[#9ca3af]">
                      /mo
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-[#5a6478]">
                    Clarivex Outsourced
                  </span>
                  <span className="font-bold text-[#6aa595] tabular-nums">
                    {fmt(clarivex, c.symbol)}
                    <span className="text-xs font-normal text-[#9ca3af]">
                      /mo
                    </span>
                  </span>
                </div>
              </div>

              <div className="border-t border-dashed border-[#e2e4e9] my-4" />

              {/* Savings highlight */}
              <div className="bg-[#f4f3ee] rounded-xl p-5 text-center">
                <p className="text-[10px] font-bold tracking-[2px] text-[#5a688e] uppercase mb-1">
                  You Could Save
                </p>
                <p className="font-[family-name:var(--font-playfair)] font-black text-4xl text-[#6aa595]">
                  {fmt(savings, c.symbol)}
                </p>
                <p className="text-xs text-[#9ca3af] mt-1">
                  per month &bull; ~{pct}% lower than local
                </p>
              </div>

              {/* Barcode decoration */}
              <div
                className="mt-6 h-8 opacity-[0.12] rounded"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, #1a1a2e 0px, #1a1a2e 2px, transparent 2px, transparent 5px)",
                }}
              />

              {/* CTA */}
              <a
                href="mailto:info@clarivex.net?subject=Free%20Scoping%20Call%20Request"
                className="mt-5 flex items-center justify-center gap-2 w-full bg-[#1a1a2e] hover:bg-[#22335A] text-white font-semibold text-sm py-3.5 rounded-xl transition-colors duration-200"
              >
                Get My Free Quote →
              </a>
              <p className="text-center text-[10px] text-[#9ca3af] mt-2">
                info@clarivex.net · www.clarivex.net
              </p>
            </div>

            {/* Notch bottom */}
            <div
              className="flex overflow-hidden h-4 -mt-px relative z-10"
              style={{ transform: "scaleY(-1)" }}
            >
              {Array.from({ length: 22 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-[#f4f3ee] shrink-0 -ml-[2px] border border-[#e2e4e9]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider thumb */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #6aa595;
          border: 3px solid white;
          box-shadow: 0 0 0 1.5px #6aa595, 0 2px 6px rgba(0,0,0,0.15);
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #6aa595;
          border: 3px solid white;
          box-shadow: 0 0 0 1.5px #6aa595;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
