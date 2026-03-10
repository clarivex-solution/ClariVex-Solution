/**
 * Shared admin UI components
 * Import these in admin/blog/page.jsx and admin/news/page.jsx
 * instead of defining them locally in each file.
 */

import { countries } from '@/lib/countryData'
import { CalendarDays } from 'lucide-react'

export function CountryFlag({ code }) {
  if (!code) return <span className="text-[#5a6478]">—</span>
  const match = countries.find((c) => c.code === code.toLowerCase())
  return (
    <span className="inline-flex items-center gap-1.5">
      {match?.flagSrc && (
        <img
          src={match.flagSrc}
          alt={code}
          className="rounded-sm shrink-0"
          style={{ width: 16, height: 11 }}
        />
      )}
      <span>{code}</span>
    </span>
  )
}

export function formatDate(dateValue) {
  if (!dateValue) return '--'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function StatusBadge({ status }) {
  const isPublished = status === 'published'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
        isPublished
          ? 'bg-[#6aa595]/15 text-[#6aa595]'
          : 'bg-amber-100 text-amber-700'
      }`}
    >
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}

export function TypeBadge({ sourceType }) {
  const isAuto = sourceType === 'automated'
  return (
    <span
      className={`whitespace-nowrap font-medium rounded-full px-2.5 py-1 text-xs capitalize ${
        isAuto
          ? 'bg-[#6aa595]/10 text-[#6aa595]'
          : 'bg-purple-100 text-purple-700'
      }`}
    >
      {sourceType || 'Manual'}
    </span>
  )
}

export function DateCell({ value }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <CalendarDays className="h-3.5 w-3.5 text-[#8892a4] shrink-0" />
      {formatDate(value)}
    </span>
  )
}

export function SkeletonRow({ cols = 6 }) {
  return (
    <tr className="border-b border-[#e2e4e9]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="h-4 w-24 animate-pulse rounded bg-[#e2e4e9]" />
        </td>
      ))}
    </tr>
  )
}
