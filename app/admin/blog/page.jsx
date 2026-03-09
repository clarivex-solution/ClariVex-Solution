"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { countries } from '@/lib/countryData'
import { CalendarDays, FolderOpen } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

// Maps country code → flag img, falls back to text
function CountryFlag({ code }) {
  if (!code) return <span className="text-[#5a6478]">—</span>
  const match = countries.find((c) => c.code === code.toLowerCase())
  return (
    <span className="inline-flex items-center gap-1.5">
      {match?.flagSrc
        ? <img src={match.flagSrc} alt={code} className="rounded-sm shrink-0" style={{ width: 16, height: 11 }} />
        : null
      }
      <span>{code}</span>
    </span>
  )
}

function formatDate(dateValue) {
  if (!dateValue) return '--'
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function StatusBadge({ status }) {
  const isPublished = status === 'published'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
      isPublished ? 'bg-[#6aa595]/15 text-[#6aa595]' : 'bg-amber-100 text-amber-700'
    }`}>
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#e2e4e9]">
      {[160, 64, 96, 80, 96, 144].map((w, i) => (
        <td key={i} className="px-4 py-4">
          <div className={`h-4 w-${w === 160 ? '40' : w === 64 ? '16' : w === 96 ? '24' : w === 80 ? '20' : w === 144 ? '36' : '24'} animate-pulse rounded bg-[#e2e4e9]`} />
        </td>
      ))}
    </tr>
  )
}

// Mobile card view for each blog
function BlogCard({ blog, onEdit, onPublish, onDelete, publishingId, deletingId }) {
  return (
    <div className="bg-white border border-[#e2e4e9] rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-[#1a1a2e] text-sm leading-snug flex-1">{blog.title}</p>
        <StatusBadge status={blog.status} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5a6478]">
        {blog.country && <CountryFlag code={blog.country} />}
        {blog.category && <span className="inline-flex items-center gap-1"><FolderOpen className="h-3.5 w-3.5 text-[#c9a96e]" />{blog.category}</span>}
        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-[#8892a4]" />{formatDate(blog.publishedAt || blog.createdAt)}</span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <Link
          href={`/admin/blog/${blog.id}/edit`}
          className="px-3 py-1.5 rounded-md border border-[#e2e4e9] bg-white text-xs font-medium text-[#1a1a2e] hover:border-[#1a1a2e] hover:bg-[#f8f9fa] active:scale-95 transition-all"
        >
          Edit
        </Link>
        {blog.status === 'draft' && (
          <button
            type="button"
            onClick={() => onPublish(blog.id)}
            disabled={publishingId === blog.id}
            className="px-3 py-1.5 rounded-md border border-[#6aa595] bg-[#6aa595] text-white text-xs font-medium disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all"
          >
            {publishingId === blog.id ? 'Publishing…' : 'Publish'}
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(blog)}
          disabled={deletingId === blog.id}
          className="px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-300 disabled:opacity-60 active:scale-95 transition-all"
        >
          {deletingId === blog.id ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

function AdminBlogPageContent() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [publishingId, setPublishingId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/blogs', { cache: 'no-store' })
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to load blog posts. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  async function handleDelete(blogId) {
    setDeletingId(blogId)
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, { method: 'DELETE' })
      if (!response.ok) { toast.error("Could not delete. Please try again."); return }
      await fetchBlogs()
      toast.success("Blog post deleted.")
    } catch {
      setError('Failed to delete blog post. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  async function handlePublish(blogId) {
    setPublishingId(blogId)
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })
      if (!response.ok) throw new Error('Failed to publish blog')
      await fetchBlogs()
      toast.success("Blog post published!")
    } catch {
      setError('Failed to publish blog post. Please try again.')
    } finally {
      setPublishingId(null)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'published') return blog.status === 'published'
    if (filter === 'draft') return blog.status === 'draft'
    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-px w-12 bg-[#c9a96e] mb-3 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] text-[#1a1a2e] font-semibold">Blog</h1>
          <p className="mt-1 text-sm text-[#5a6478]">{filteredBlogs.length} post{filteredBlogs.length !== 1 ? 's' : ''}{filter ? ` · ${filter}` : ''}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1a1a2e] text-white text-sm font-medium cursor-pointer hover:bg-[#6aa595] active:scale-95 transition-all"
        >
          + New Post
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {filter && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5a6478]">Filter:</span>
          <span className="rounded-full bg-[#1a1a2e]/10 px-3 py-1 text-xs capitalize text-[#1a1a2e] font-medium">{filter}</span>
          <Link href="/admin/blog" className="text-xs text-[#5a6478] hover:text-[#1a1a2e] transition-colors underline underline-offset-4">
            Clear ×
          </Link>
        </div>
      )}

      {/* Mobile: card list */}
      <div className="sm:hidden space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#e2e4e9] rounded-xl p-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#e2e4e9]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#e2e4e9]" />
                <div className="h-8 w-24 animate-pulse rounded-md bg-[#e2e4e9]" />
              </div>
            ))
          : filteredBlogs.length === 0
          ? (
            <div className="rounded-xl border border-[#e2e4e9] bg-white py-12 text-center text-sm text-[#5a6478]">
              No blog posts yet. <Link href="/admin/blog/new" className="text-[#6aa595] font-medium">Create your first →</Link>
            </div>
          )
          : filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onPublish={handlePublish}
              onDelete={(b) => setDeleteTarget(b)}
              publishingId={publishingId}
              deletingId={deletingId}
            />
          ))
        }
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-[#e2e4e9] bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="bg-[#f8f9fa] border-b border-[#e2e4e9]">
            <tr>
              {['Title', 'Country', 'Category', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#5a6478]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              : null}
            {!isLoading && filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#5a6478]">
                  No blog posts yet. <Link href="/admin/blog/new" className="text-[#6aa595] font-medium">Create your first →</Link>
                </td>
              </tr>
            ) : null}
            {!isLoading && filteredBlogs.map((blog) => (
              <tr key={blog.id} className="border-b border-[#e2e4e9] last:border-0 hover:bg-[#f8f9fa] transition-colors group">
                <td className="px-4 py-4 text-sm font-medium text-[#1a1a2e] group-hover:text-[#6aa595] transition-colors max-w-[220px] truncate">{blog.title}</td>
                <td className="px-4 py-4 text-sm text-[#5a6478]"><CountryFlag code={blog.country} /></td>
                <td className="px-4 py-4 text-sm text-[#5a6478]">
                  <span className="inline-flex items-center gap-1.5"><FolderOpen className="h-3.5 w-3.5 text-[#c9a96e] shrink-0" />{blog.category || '--'}</span>
                </td>
                <td className="px-4 py-4"><StatusBadge status={blog.status} /></td>
                <td className="px-4 py-4 text-sm text-[#5a6478] whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-[#8892a4] shrink-0" />{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/${blog.id}/edit`}
                      className="px-3 py-1.5 rounded-md border border-[#e2e4e9] bg-white text-xs font-medium text-[#1a1a2e] hover:border-[#1a1a2e] hover:bg-[#f8f9fa] active:scale-95 transition-all shadow-sm"
                    >
                      Edit
                    </Link>
                    {blog.status === 'draft' && (
                      <button
                        type="button"
                        onClick={() => handlePublish(blog.id)}
                        disabled={publishingId === blog.id}
                        className="px-3 py-1.5 rounded-md border border-[#6aa595] bg-[#6aa595] text-white text-xs font-medium disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all"
                      >
                        {publishingId === blog.id ? 'Publishing…' : 'Publish'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(blog)}
                      disabled={deletingId === blog.id}
                      className="px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-300 disabled:opacity-60 active:scale-95 transition-all"
                    >
                      {deletingId === blog.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirm dialog */}
      <Dialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent className="bg-white border border-[#e2e4e9] text-[#1a1a2e] max-w-md shadow-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-[#1a1a2e] font-semibold">Confirm Delete</DialogTitle>
            <DialogDescription className="text-[#5a6478]">
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-[#e2e4e9] bg-white px-4 py-2 text-sm font-medium text-[#5a6478] hover:bg-[#f8f9fa] active:scale-95 transition-all cursor-pointer">
              Cancel
            </button>
            <button
              onClick={() => { if (!deleteTarget?.id) return; handleDelete(deleteTarget.id); setDeleteTarget(null) }}
              className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-medium text-white cursor-pointer active:scale-95 transition-all"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="h-8 w-32 animate-pulse rounded bg-[#e2e4e9]" />
        <div className="h-64 animate-pulse rounded-xl bg-[#e2e4e9]" />
      </div>
    }>
      <AdminBlogPageContent />
    </Suspense>
  )
}
