export default function NewsArticleLoading() {
  return (
    <main className="bg-[#f8f9fa] py-16 sm:py-20 lg:py-32 text-[#1a1a2e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-3 w-10 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-3 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-10 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-3 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-44 rounded bg-[#e2e4e9] animate-pulse" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Article skeleton */}
          <article>
            <header className="mx-auto max-w-3xl">
              <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
              {/* Badges */}
              <div className="flex gap-2">
                <div className="h-6 w-28 rounded-full bg-[#e2e4e9] animate-pulse" />
                <div className="h-6 w-16 rounded-full bg-[#e2e4e9] animate-pulse" />
              </div>
              {/* Title */}
              <div className="mt-5 space-y-3">
                <div className="h-10 w-full rounded-lg bg-[#e2e4e9] animate-pulse sm:h-12" />
                <div className="h-10 w-3/4 rounded-lg bg-[#e2e4e9] animate-pulse sm:h-12" />
              </div>
              {/* Source + date meta bar */}
              <div className="mt-6 flex items-center gap-6 border-b border-[#e2e4e9] pb-6">
                <div className="space-y-1.5">
                  <div className="h-3 w-14 rounded bg-[#e2e4e9] animate-pulse" />
                  <div className="h-4 w-24 rounded bg-[#e2e4e9] animate-pulse" />
                </div>
                <div className="w-px h-8 bg-[#e2e4e9]" />
                <div className="space-y-1.5">
                  <div className="h-3 w-16 rounded bg-[#e2e4e9] animate-pulse" />
                  <div className="h-4 w-28 rounded bg-[#e2e4e9] animate-pulse" />
                </div>
              </div>
            </header>

            {/* Summary + CTA */}
            <div className="mx-auto mt-8 max-w-3xl space-y-4">
              <div className="h-5 w-full rounded bg-[#e2e4e9] animate-pulse" />
              <div className="h-5 w-11/12 rounded bg-[#e2e4e9] animate-pulse" />
              <div className="h-5 w-4/5 rounded bg-[#e2e4e9] animate-pulse" />
              <div className="h-4 w-64 rounded bg-[#e2e4e9] animate-pulse mt-4" />
              <div className="h-12 w-44 rounded-full bg-[#e2e4e9] animate-pulse mt-6" />
            </div>
          </article>

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* More news card */}
              <div className="bg-white rounded-2xl border border-[#e2e4e9] p-6 shadow-sm space-y-4">
                <div className="h-px w-12 bg-[#c9a96e]" />
                <div className="h-6 w-28 rounded-lg bg-[#e2e4e9] animate-pulse" />
                <div className="space-y-3 mt-2">
                  {[90, 72, 85].map((w, i) => (
                    <div key={i} className="py-2 border-b border-[#e2e4e9] last:border-0">
                      <div className="h-4 rounded bg-[#e2e4e9] animate-pulse" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA card */}
              <div className="bg-[#1a1a2e] rounded-2xl p-6 space-y-3">
                <div className="h-px w-12 bg-[#c9a96e]" />
                <div className="h-8 w-44 rounded-lg bg-white/10 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                </div>
                <div className="h-10 w-36 rounded-full bg-[#6aa595]/60 animate-pulse mt-4" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
