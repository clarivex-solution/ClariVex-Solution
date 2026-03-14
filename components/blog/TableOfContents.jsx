export default function TableOfContents({ headings, className = '' }) {
  if (!Array.isArray(headings) || headings.length === 0) {
    return null
  }

  return (
    <section
      className={`rounded-2xl border border-[#e2e4e9] bg-white p-6 shadow-sm ${className}`.trim()}
    >
      <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
      <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1a1a2e]">
        Table of Contents
      </h2>

      <div className="relative mt-4">
        <div
          className="max-h-[calc(100vh-220px)] overflow-y-auto pr-1.5 pb-6 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb:hover]:bg-slate-400"
        >
          <ul className="space-y-3 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 'h3' ? 'pl-4' : ''}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-[#5a6478] transition-colors hover:text-[#6aa595]"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  )
}
