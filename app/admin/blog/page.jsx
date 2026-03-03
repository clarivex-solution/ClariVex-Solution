"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

function formatDate(dateValue) {
  if (!dateValue) {
    return '--'
  }

  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return '--'
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function StatusBadge({ status }) {
  const isPublished = status === 'published'

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize',
        isPublished ? 'bg-[#6aa595]/20 text-[#6aa595]' : 'bg-[#c9a96e]/20 text-[#c9a96e]',
      ].join(' ')}
    >
      {isPublished ? 'Published' : 'Draft'}
    </span>
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
      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }

      const data = await response.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (fetchError) {
      console.error(fetchError)
      setError('Failed to load blog posts. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  async function handleDelete(blogId) {
    setDeletingId(blogId)
    setError('')

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        toast.error("Could not delete. Please try again.")
        throw new Error('Failed to delete blog')
      }

      await fetchBlogs()
      toast.success("Blog post deleted.")
    } catch (deleteError) {
      console.error(deleteError)
      setError('Failed to delete blog post. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  async function handlePublish(blogId) {
    setPublishingId(blogId)
    setError('')

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'published' }),
      })

      if (!response.ok) {
        throw new Error('Failed to publish blog')
      }

      await fetchBlogs()
      toast.success("Blog post published!")
    } catch (publishError) {
      console.error(publishError)
      setError('Failed to publish blog post. Please try again.')
    } finally {
      setPublishingId(null)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'published') {
      return blog.status === 'published'
    }

    if (filter === 'draft') {
      return blog.status === 'draft'
    }

    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-px w-12 bg-[#c9a96e] mb-4"></div>
          <h1 className="text-3xl font-playfair text-white">Blog</h1>
        </div>

        <Link
          href="/admin/blog/new"
          className="px-5 py-2.5 rounded-full border border-[#5a688e] text-[#5a688e] hover:bg-[#5a688e] hover:text-white transition-colors duration-300 font-medium"
        >
          New Blog Post
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900/30 bg-red-900/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {filter && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[#8892a4]">Filter:</span>
          <span className="rounded-full bg-[#5a688e]/20 px-3 py-1 text-xs capitalize text-[#5a688e]">{filter}</span>
          <Link href="/admin/blog" title="Show all posts" className="text-xs text-[#8892a4] hover:text-white transition-colors">
            Clear filter &times;
          </Link>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-[#1e2330] bg-[#13161e]">
        <table className="min-w-full">
          <thead className="bg-[#0d0f14]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Country</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide uppercase text-[#8892a4]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 3 }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-[#1e2330]">
                    <td className="px-4 py-4">
                      <div className="h-4 w-40 animate-pulse rounded bg-[#1e2330]"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-16 animate-pulse rounded bg-[#1e2330]"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-[#1e2330]"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-[#1e2330]"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-[#1e2330]"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-8 w-36 animate-pulse rounded bg-[#1e2330]"></div>
                    </td>
                  </tr>
                ))
              : null}

            {!isLoading && filteredBlogs.length === 0 ? (
              <tr className="border-t border-[#1e2330]">
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#8892a4]">
                  No blog posts yet. Create your first post to get started.
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-[#1e2330]">
                    <td className="px-4 py-4 text-sm text-white">{blog.title}</td>
                    <td className="px-4 py-4 text-sm text-[#8892a4]">{blog.country || '--'}</td>
                    <td className="px-4 py-4 text-sm text-[#8892a4]">{blog.category || '--'}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={blog.status} />
                    </td>
                    <td className="px-4 py-4 text-sm text-[#8892a4]">
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/${blog.id}/edit`}
                          className="px-3 py-1.5 rounded-md border border-[#5a688e] text-xs font-medium text-[#5a688e] hover:bg-[#5a688e] hover:text-white transition-colors duration-300"
                        >
                          Edit
                        </Link>
                        {filter === 'draft' && blog.status === 'draft' ? (
                          <button
                            type="button"
                            onClick={() => handlePublish(blog.id)}
                            disabled={publishingId === blog.id}
                            className="px-3 py-1.5 rounded-md border border-[#6aa595] text-xs font-medium text-[#6aa595] hover:bg-[#6aa595] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
                          >
                            {publishingId === blog.id ? 'Publishing...' : 'Publish'}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(blog)}
                          disabled={deletingId === blog.id}
                          className="px-3 py-1.5 rounded-md border border-red-900/40 text-xs font-medium text-red-300 hover:bg-red-900/20 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                          {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      <Dialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null) }}>
        <DialogContent className="bg-[#13161e] border border-[#1e2330] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Delete</DialogTitle>
            <DialogDescription className="text-[#8892a4]">
              Are you sure you want to delete &quot;{deleteTarget?.title}&quot;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-[#1e2330] px-4 py-2 text-sm font-medium text-[#8892a4] hover:bg-[#1e2330] transition-colors">
              Cancel
            </button>
            <button
              onClick={() => {
                if (!deleteTarget?.id) return
                handleDelete(deleteTarget.id)
                setDeleteTarget(null)
              }}
              className="rounded-lg bg-red-500 hover:bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors"
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
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto rounded-xl border border-[#1e2330] bg-[#13161e] p-6 text-sm text-[#8892a4]">
          Loading blog admin...
        </div>
      }
    >
      <AdminBlogPageContent />
    </Suspense>
  )
}
