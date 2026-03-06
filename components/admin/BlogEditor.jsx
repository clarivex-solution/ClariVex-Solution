"use client"

import Heading from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_OPTIONS = ['Bookkeeping', 'Tax & Compliance', 'Payroll', 'Advisory', 'Reconciliation', 'AP & AR', 'Data Security', 'General']
const COUNTRY_OPTIONS = ['US', 'UK', 'AU', 'CA', 'All']

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function ToolbarButton({ active, disabled, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        'p-2 rounded text-xs font-semibold text-[#8892a4] cursor-pointer transition-colors hover:text-white hover:bg-[#1e2330] active:scale-95',
        active ? 'bg-[#5a688e] text-white' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-[#1e2330] mx-1 self-center" />
}

export default function BlogEditor({ initialData, blogId, mode }) {
  const router = useRouter()
  const isEditMode = mode === 'edit'

  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [slugEditedManually, setSlugEditedManually] = useState(Boolean(initialData?.slug))
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [category, setCategory] = useState(initialData?.category || CATEGORY_OPTIONS[0])
  const [country, setCountry] = useState(initialData?.country || COUNTRY_OPTIONS[0])
  const [status, setStatus] = useState(initialData?.status || 'draft')

  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!initialData) {
      return
    }

    setTitle(initialData.title || '')
    setSlug(initialData.slug || '')
    setSlugEditedManually(Boolean(initialData.slug))
    setExcerpt(initialData.excerpt || '')
    setCategory(initialData.category || CATEGORY_OPTIONS[0])
    setCountry(initialData.country || COUNTRY_OPTIONS[0])
    setStatus(initialData.status || 'draft')
  }, [initialData])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
    ],
    content: initialData?.content || '',
    editorProps: {
      transformPastedHTML(html) {
        return html
      },
      attributes: {
        class: 'prose-editor min-h-[320px] focus:outline-none p-4 text-[#8892a4] bg-[#0d0f14]',
      },
    },
    onUpdate: ({ editor }) => {
      editor.getHTML()
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    if (typeof initialData?.content === 'string') {
      editor.commands.setContent(initialData.content || '')
      return
    }

    if (!isEditMode) {
      editor.commands.clearContent()
    }
  }, [editor, initialData, isEditMode])

  const urlHelper = useMemo(() => `URL: yourdomain.com/blog/${slug || '[slug]'}`, [slug])

  function handleTitleChange(event) {
    const nextTitle = event.target.value
    setTitle(nextTitle)

    if (!slugEditedManually) {
      setSlug(slugify(nextTitle))
    }
  }

  function handleSlugChange(event) {
    setSlugEditedManually(true)
    setSlug(slugify(event.target.value))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!editor) {
      setError('Editor is still loading. Please try again.')
      return
    }

    const normalizedSlug = slugify(slug)
    const payload = {
      title: title.trim(),
      slug: normalizedSlug,
      excerpt: excerpt.trim(),
      content: editor.getHTML(),
      category,
      country,
      status,
    }

    if (!payload.title || !payload.slug || !payload.excerpt) {
      setError('Title, slug, and excerpt are required.')
      return
    }

    setIsSaving(true)

    try {
      const endpoint = isEditMode ? `/api/admin/blogs/${blogId}` : '/api/admin/blogs'
      const method = isEditMode ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Failed to save blog post')
      }

      if (isEditMode) {
        toast.success("Post updated successfully.")
      } else if (payload.status === 'published') {
        toast.success("Blog post published!")
      } else {
        toast.success("Draft saved.")
      }

      router.push('/admin/blog')
      router.refresh()
    } catch (saveError) {
      console.error(saveError)
      if (isEditMode) {
        toast.error("Update failed. Please try again.")
      } else {
        toast.error("Failed to save. Please try again.")
      }
      setError(saveError.message || 'Failed to save blog post. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const editorReady = Boolean(editor)

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <div className="h-px w-12 bg-[#c9a96e] mb-4"></div>
        <h1 className="text-3xl font-playfair text-white">
          {isEditMode ? 'Edit Blog Post' : 'New Blog Post'}
        </h1>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-900/30 bg-red-900/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="title" className="text-sm font-medium text-[#cdd3df]">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white placeholder:text-[#5a688e] focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="slug" className="text-sm font-medium text-[#cdd3df]">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={handleSlugChange}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white placeholder:text-[#5a688e] focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60"
              placeholder="blog-post-slug"
              required
            />
            <p className="text-xs text-[#5a688e]">{urlHelper}</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="excerpt" className="text-sm font-medium text-[#cdd3df]">
                Excerpt
              </label>
              <span className={excerpt.length > 200 ? 'text-xs text-[#c9a96e]' : 'text-xs text-[#5a688e]'}>
                {excerpt.length}/200
              </span>
            </div>
            <textarea
              id="excerpt"
              rows={4}
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white placeholder:text-[#5a688e] focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60 resize-y"
              placeholder="Short summary of the post"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-[#cdd3df]">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium text-[#cdd3df]">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60"
            >
              {COUNTRY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-[#cdd3df]">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-[#1e2330] bg-[#13161e] px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#5a688e]/60"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#cdd3df]">Content</label>
          <div className="border border-[#1e2330] rounded-xl overflow-hidden bg-[#0d0f14]">
            <div className="flex flex-wrap items-center gap-1 border-b border-[#1e2330] bg-[#13161e] p-2">
              <ToolbarButton
                active={editor?.isActive('heading', { level: 1 }) === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                H1
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('heading', { level: 2 }) === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                H2
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('heading', { level: 3 }) === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                H3
              </ToolbarButton>

              <ToolbarDivider />

              <ToolbarButton
                active={editor?.isActive('bold') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleBold().run()}
              >
                Bold
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('italic') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
              >
                Italic
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('underline') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
              >
                Underline
              </ToolbarButton>

              <ToolbarDivider />

              <ToolbarButton
                active={editor?.isActive('bulletList') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
              >
                Bullet List
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('orderedList') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              >
                Ordered List
              </ToolbarButton>
              <ToolbarButton
                active={editor?.isActive('blockquote') === true}
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              >
                Blockquote
              </ToolbarButton>

              <ToolbarDivider />

              <ToolbarButton
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().undo().run()}
              >
                Undo
              </ToolbarButton>
              <ToolbarButton
                disabled={!editorReady}
                onClick={() => editor?.chain().focus().redo().run()}
              >
                Redo
              </ToolbarButton>
            </div>

            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full border border-[#5a688e] text-[#5a688e] cursor-pointer font-medium transition-colors duration-300 hover:bg-[#5a688e] hover:text-white active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

