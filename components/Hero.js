import Image from "next/image";
import heroImg from "@/public/hero.svg"; // adjust path

export default function Hero() {
  return (
    <section className="pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
            Empowering Growth
            <br />
            Through Financial
            <br />
            Clarity.
          </h1>

          {/* Small Highlight Line */}
          <p className="mt-6 text-lg text-slate-600">
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

          {/* Tagline Strip */}
          <p className="mt-4 tracking-widest text-sm text-slate-500 uppercase">
            Clarity. Compliance. Growth.
          </p>

          {/* Long Description */}
          <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-xl">
            Your outsourced accounting and finance operations partner,
            combining expert support and smart technology to streamline
            day-to-day workflows, improve visibility, and help your
            business scale with confidence.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-[var(--primary-blue)] text-white px-6 py-3 rounded-xl hover:opacity-90 transition shadow-sm">
              Talk to Experts
            </button>

            <button className="border border-slate-300 px-6 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition">
              See Workflow →
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={heroImg}
            alt="Financial growth illustration"
            className="w-full max-w-lg"
            priority
          />
        </div>

      </div>
    </section>
  );
}
