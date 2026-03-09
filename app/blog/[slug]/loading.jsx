export default function BlogArticleLoading() {
  return (
    <main className="bg-[#f8f9fa] py-16 sm:py-20 lg:py-32 text-[#1a1a2e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-3 w-10 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-3 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-8 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-3 rounded bg-[#e2e4e9] animate-pulse" />
          <div className="h-3 w-40 rounded bg-[#e2e4e9] animate-pulse" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Article skeleton */}
          <article>
            <header className="mx-auto max-w-3xl">
              <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
              {/* Category badge */}
              <div className="h-6 w-28 rounded-full bg-[#e2e4e9] animate-pulse" />
              {/* Title */}
              <div className="mt-5 space-y-3">
                <div className="h-10 w-full rounded-lg bg-[#e2e4e9] animate-pulse sm:h-12" />
                <div className="h-10 w-4/5 rounded-lg bg-[#e2e4e9] animate-pulse sm:h-12" />
              </div>
              {/* Meta */}
              <div className="mt-4 flex gap-4">
                <div className="h-4 w-28 rounded bg-[#e2e4e9] animate-pulse" />
                <div className="h-4 w-24 rounded bg-[#e2e4e9] animate-pulse" />
              </div>
            </header>

            {/* Body content */}
            <div className="mx-auto mt-8 max-w-3xl space-y-3">
              {[100, 95, 88, 100, 92, 85, 100, 78, 96, 90, 100, 82].map((w, i) => (
                <div key={i} className={`h-4 rounded bg-[#e2e4e9] animate-pulse`} style={{ width: `${w}%` }} />
              ))}
              <div className="pt-4 space-y-3">
                <div className="h-6 w-56 rounded-lg bg-[#e2e4e9] animate-pulse" />
                {[100, 94, 88, 100, 91, 83].map((w, i) => (
                  <div key={i} className="h-4 rounded bg-[#e2e4e9] animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="pt-4 space-y-3">
                <div className="h-6 w-48 rounded-lg bg-[#e2e4e9] animate-pulse" />
                {[100, 96, 82, 100, 89].map((w, i) => (
                  <div key={i} className="h-4 rounded bg-[#e2e4e9] animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Related posts card */}
              <div className="bg-white rounded-2xl border border-[#e2e4e9] p-6 shadow-sm space-y-4">
                <div className="h-px w-12 bg-[#c9a96e]" />
                <div className="h-6 w-32 rounded-lg bg-[#e2e4e9] animate-pulse" />
                <div className="space-y-3 mt-2">
                  {[85, 70, 90].map((w, i) => (
                    <div key={i} className="py-2 border-b border-[#e2e4e9] last:border-0">
                      <div className="h-4 rounded bg-[#e2e4e9] animate-pulse" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA card */}
              <div className="bg-[#1a1a2e] rounded-2xl p-6 space-y-3">
                <div className="h-px w-12 bg-[#c9a96e]" />
                <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse" />
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
