import Image from "next/image";
import heroImg from "@/public/hero.svg";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-slate-50" />
      <div className="mx-auto w-full max-w-7xl px-6 pt-24">
        <div className="grid items-center gap-20 md:grid-cols-2">
          <div className="max-w-[520px]">
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
              Empowering Growth <br />
              Through Financial <br />
              Clarity.
            </h1>

            <p className="mt-6 text-base text-slate-600">
              Financial{" "}
              <span className="font-semibold text-[var(--primary-green)]">clarity</span> that{" "}
              <span className="font-semibold text-[var(--primary-green)]">empowers</span>{" "}
              business.
            </p>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
              Clarity. Compliance. Growth.
            </p>

            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Your outsourced accounting and finance operations partner, combining
              expert support and smart technology to streamline day-to-day
              workflows, improve visibility, and help your business scale with
              confidence.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-[var(--primary-blue)] px-6 py-3 font-medium text-white transition hover:opacity-90">
                Talk to Experts
              </button>
              <button className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100">
                See Workflow -&gt;
              </button>
            </div>
          </div>

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
