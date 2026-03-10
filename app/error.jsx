'use client'

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="h-px w-12 bg-[#c9a96e] mb-6 mx-auto" />
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1a1a2e] mb-3">
        Something went wrong
      </h1>
      <p className="text-[#5a6478] mb-8 max-w-md">
        An unexpected error occurred. Please try again, or contact us if the issue persists.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-[#1a1a2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6aa595] active:scale-95 transition-all"
      >
        Try again
      </button>
    </div>
  )
}
