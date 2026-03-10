'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-white font-sans">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-3">Critical error</h1>
        <p className="text-[#5a6478] mb-8">The application encountered a fatal error.</p>
        <button
          onClick={reset}
          className="rounded-full bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6aa595] active:scale-95 transition-all"
        >
          Reload
        </button>
      </body>
    </html>
  )
}
