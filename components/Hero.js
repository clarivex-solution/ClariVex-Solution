import heroImg from "@/public/hero.svg";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-slate-50 -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="max-w-[520px]">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-900">
              Empowering Growth <br />
              Through Financial <br />
              Clarity.
            </h1>

            <p className="mt-6 text-base text-slate-600">
              Financial{" "}
              <span className="text-[var(--primary-green)] font-semibold">
                clarity
              </span>{" "}
              that{" "}
              <span className="text-[var(--primary-green)] font-semibold">
                empowers
              </span>{" "}
              business.
            </p>

            <p className="mt-4 uppercase tracking-[0.2em] text-xs text-slate-400">
              Clarity. Compliance. Growth.
            </p>

            <p className="mt-6 text-base text-slate-600 leading-relaxed">
              Your outsourced accounting and finance operations partner,
              combining expert support and smart technology to streamline
              day-to-day workflows, improve visibility, and help your
              business scale with confidence.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-[var(--primary-blue)] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
                Talk to Experts
              </button>

              <button className="border border-slate-300 px-6 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition">
                See Workflow →
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <Image
              src={heroImg}
              alt="Financial growth illustration"
              className="w-full max-w-md lg:max-w-lg"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
