'use client';

export default function PrintPageButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex h-9 items-center rounded-full border border-white/35 px-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#6aa595] hover:text-[#6aa595] ${className}`}
    >
      Print
    </button>
  );
}
