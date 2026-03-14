export default function TableOfContents({ headings, className = '' }) {
  if (!Array.isArray(headings) || headings.length === 0) {
    return null
  }

  return (
    <section className={`rounded-2xl border border-[#e2e4e9] bg-white p-6 shadow-sm ${className}`.trim()}>
      <div className="mb-4 h-px w-12 bg-[#c9a96e]" />
      <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1a1a2e]">
        Table of Contents
      </h2>
      <ul className="mt-4 space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 'h3' ? 'pl-4 text-sm' : 'text-sm'}
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
    </section>
  )
}
