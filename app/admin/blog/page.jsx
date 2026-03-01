"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

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

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

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

  function handleDeleteClick(blogId) {
    setItemToDelete(blogId)
    setDeleteDialogOpen(true)
  }

  async function confirmDelete() {
    if (!itemToDelete) return
    const blogId = itemToDelete
    setDeleteDialogOpen(false)
    setItemToDelete(null)

    setDeletingId(blogId)
    setError('')

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete blog')
      }

      await fetchBlogs()
    } catch (deleteError) {
      console.error(deleteError)
      setError('Failed to delete blog post. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

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

            {!isLoading && blogs.length === 0 ? (
              <tr className="border-t border-[#1e2330]">
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#8892a4]">
                  No blog posts yet. Create your first post to get started.
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? blogs.map((blog) => (
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
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(blog.id)}
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#1e2330]"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
