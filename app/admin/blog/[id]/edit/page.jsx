"use client"

import BlogEditor from '@/components/admin/BlogEditor'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function EditBlogPage() {
  const params = useParams()
  const id = useMemo(() => {
    if (Array.isArray(params?.id)) {
      return params.id[0]
    }

    return params?.id
  }, [params])

  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      return
    }

    async function fetchBlog() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`/api/admin/blogs/${id}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('Failed to load blog post')
        }

        const data = await response.json()
        setBlog(data)
      } catch (fetchError) {
        console.error(fetchError)
        setError('Failed to load blog post. Please refresh and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <div className="h-px w-12 bg-[#c9a96e] mb-4" />
          <div className="h-9 w-64 rounded-lg bg-[#e2e4e9] animate-pulse" />
          <div className="h-4 w-40 rounded bg-[#e2e4e9] animate-pulse mt-2" />
        </div>
        <div className="rounded-xl border border-[#e2e4e9] bg-white p-6 space-y-4 shadow-sm">
          <div className="h-10 rounded-lg bg-[#e2e4e9] animate-pulse" />
          <div className="h-10 rounded-lg bg-[#e2e4e9] animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 rounded-lg bg-[#e2e4e9] animate-pulse" />
            <div className="h-10 rounded-lg bg-[#e2e4e9] animate-pulse" />
          </div>
          <div className="h-28 rounded-lg bg-[#e2e4e9] animate-pulse" />
          <div className="h-96 rounded-lg bg-[#e2e4e9] animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
        <div className="rounded-lg border border-[#e2e4e9] bg-white px-4 py-3 text-sm text-[#8892a4]">
          Blog post not found.
        </div>
      </div>
    )
  }

  return <BlogEditor mode="edit" blogId={id} initialData={blog} />
}
