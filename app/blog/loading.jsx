export default function BlogListLoading() {
  return (
    <main className="bg-white text-[#1a1a2e]">
      {/* Hero */}
      <section className="relative bg-[#f4f3ee] py-16 text-center sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-4">
          <div className="mx-auto h-px w-12 bg-[#c9a96e]" />
          <div className="mx-auto h-4 w-32 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="mx-auto h-10 w-80 rounded-lg bg-[#e2e4e9] animate-pulse sm:h-14 sm:w-[480px]" />
          <div className="mx-auto h-4 w-96 rounded bg-[#e2e4e9] animate-pulse" />
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-y border-[#e2e4e9] bg-[#f8f9fa]/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4 sm:py-6">
            <div className="h-10 w-full rounded-full bg-[#e2e4e9] animate-pulse sm:w-44" />
            <div className="h-10 w-full rounded-full bg-[#e2e4e9] animate-pulse sm:w-44" />
            <div className="sm:ml-auto h-3 w-32 rounded bg-[#e2e4e9] animate-pulse" />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
          <div className="h-3 w-28 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 animate-pulse space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-5 w-24 rounded-full bg-[#e2e4e9]" />
                  <div className="h-5 w-16 rounded-full bg-[#e2e4e9]" />
                </div>
                <div className="h-5 w-full rounded bg-[#e2e4e9]" />
                <div className="h-5 w-4/5 rounded bg-[#e2e4e9]" />
                <div className="h-4 w-11/12 rounded bg-[#e2e4e9]" />
                <div className="h-4 w-3/4 rounded bg-[#e2e4e9]" />
                <div className="h-4 w-20 rounded bg-[#e2e4e9] mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
