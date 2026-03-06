# ClariVex — Full Production Readiness Prompt for Claude Opus (Antigravity)

Paste this entire document. Claude Opus will fix everything listed. All changes are ordered by severity.

---

## STACK & CRITICAL RULES

Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui, Prisma v7.4.2, Neon PostgreSQL, Sonner toasts, TipTap editor, Resend, Cloudinary, GNews API, Vercel.

**Never break these rules:**
- All API route params: `const { id } = await params` — NOT `params.id` directly
- `lib/prisma.js` export: `import { prisma } from '@/lib/prisma'`
- Client components with `"use client"` must NOT have `export const dynamic` before them
- Server components: `export const dynamic = 'force-dynamic'` at very top

**Color tokens:**
- `#5a688e` primary blue
- `#6aa595` teal/green
- `#c9a96e` gold
- `#1a1a2e` dark heading
- `#0d0f14` darkest bg
- `#13161e` dark card bg
- `#8892a4` muted text
- `#e2e4e9` light border
- `#f8f9fa` light section bg

---

## PART 1 — CRITICAL BUGS (Fix These First — These Break Production)

---

### BUG 1 — Admin Middleware Not Working (SECURITY HOLE)
**File:** `proxy.js` (project root)
**Problem:** Next.js middleware MUST be named `middleware.js` (or `middleware.ts`). A file named `proxy.js` is never loaded by Next.js. The entire `/admin` route is completely unprotected — anyone can access it without a password.
**Fix:** Rename this file to `middleware.js`. No code changes needed, just the filename. The content is correct:

```js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('admin_token')?.value
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  if (isLoginPage) return NextResponse.next()
  if (!token) return NextResponse.redirect(new URL('/admin/login', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

The exported function must also be renamed from `proxy` to `middleware`.

---

### BUG 2 — Public News and Blog APIs Are Cached on Vercel (News Never Updates)
**Files:** `app/api/news/route.js`, `app/api/blog/route.js`, `app/api/news/[slug]/route.js`, `app/api/blog/[slug]/route.js`
**Problem:** None of these public API routes have `export const dynamic = 'force-dynamic'`. On Vercel, Next.js will cache these responses at build time. New news articles added by cron jobs will never appear on the frontend because the cached response is served forever.
**Fix:** Add `export const dynamic = 'force-dynamic'` as the FIRST line of all four files (before imports). This forces fresh DB queries on every request.

---

### BUG 3 — AU and GENERAL News Are Never Automatically Fetched
**Files:** `vercel.json`, `app/api/cron/fetch-news-uk/route.js`
**Problem:** `vercel.json` only has 2 cron jobs (UK at 8am UTC, US at 1pm UTC). There are no scheduled runs for AU or GENERAL. The `fetch-news-uk` wrapper only fetches UK — it does NOT also fetch AU and GENERAL in the same run as originally intended. Result: AU and GENERAL news DB will never be populated automatically.
**Fix — Part A:** Modify `app/api/cron/fetch-news-uk/route.js` to fetch UK, then AU, then GENERAL sequentially in a single run (free plan workaround):

```js
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const authHeader = request.headers.get('authorization') || ''
  const headers = { authorization: authHeader }

  const results = {}

  // Fetch UK
  try {
    const ukRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=UK`, { headers, cache: 'no-store' })
    results.UK = await ukRes.json()
  } catch (e) {
    results.UK = { error: e.message }
  }

  // Fetch AU
  try {
    const auRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=AU`, { headers, cache: 'no-store' })
    results.AU = await auRes.json()
  } catch (e) {
    results.AU = { error: e.message }
  }

  // Fetch GENERAL
  try {
    const genRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=GENERAL`, { headers, cache: 'no-store' })
    results.GENERAL = await genRes.json()
  } catch (e) {
    results.GENERAL = { error: e.message }
  }

  return NextResponse.json(results)
}
```

**Fix — Part B:** Also modify `app/api/cron/fetch-news-us/route.js` to also fetch CA in the same run:

```js
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const authHeader = request.headers.get('authorization') || ''
  const headers = { authorization: authHeader }

  const results = {}

  // Fetch US
  try {
    const usRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=US`, { headers, cache: 'no-store' })
    results.US = await usRes.json()
  } catch (e) {
    results.US = { error: e.message }
  }

  // Fetch CA
  try {
    const caRes = await fetch(`${baseUrl}/api/cron/fetch-news?country=CA`, { headers, cache: 'no-store' })
    results.CA = await caRes.json()
  } catch (e) {
    results.CA = { error: e.message }
  }

  return NextResponse.json(results)
}
```

This uses only 2 Vercel cron slots (free plan) and covers all 5 regions. Schedule:
- 8am UTC: UK + AU + GENERAL
- 1pm UTC: US + CA

**Also update `vercel.json`** — no changes needed to the schedule, just confirm it points to the right endpoints with CRON_SECRET handled by Vercel automatically.

---

### BUG 4 — Admin PATCH Endpoint Has No Auth Check
**File:** `app/api/admin/blogs/[id]/route.js`
**Problem:** The `PATCH` handler (which publishes a draft blog) has NO authentication check. Any unauthenticated user can publish any draft by calling `PATCH /api/admin/blogs/[id]`.
**Fix:** Add auth check to PATCH handler:

```js
export async function PATCH(request, { params }) {
  const auth = await verifyAdminRequest(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json()
  const updated = await prisma.blog.update({
    where: { id },
    data: { status: body.status }
  })
  return NextResponse.json(updated)
}
```

---

### BUG 5 — Admin News Page Shows Wrong Date
**File:** `app/admin/news/page.jsx`
**Problem:** The table cell uses `item.publishedDate || item.createdAt`. The Prisma schema field is `publishedAt` (not `publishedDate`). This means every news article shows wrong/undefined date.
**Fix:** Change to:
```jsx
{new Date(item.publishedAt || item.createdAt || new Date()).toLocaleDateString()}
```

---

### BUG 6 — GNews API Doesn't Pass CRON_SECRET When Called From Vercel Cron
**File:** `app/api/cron/fetch-news/route.js` and `vercel.json`
**Problem:** Vercel cron jobs call endpoints via HTTP GET with a `Authorization: Bearer <VERCEL_CRON_SECRET>` header automatically when `CRON_SECRET` is set in Vercel. But the current fetch-news endpoint checks against `process.env.CRON_SECRET`. Vercel sends `CRON_SECRET` automatically only if the env var is named `CRON_SECRET`. This should work — but verify that `CRON_SECRET` is set in Vercel dashboard. Also add a fallback: if request comes from Vercel's own internal scheduler (no auth header), still allow it. Add this to the auth check:

```js
const authHeader = request.headers.get('authorization')
const isVercelCron = request.headers.get('x-vercel-cron') === '1' // Vercel adds this
if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## PART 2 — DEAD CODE & REDUNDANT CODE (Remove All of This)

---

### DEAD CODE 1 — `lib/blogData.js`
**Problem:** This file exports a static `blogPosts` array. The database is the source of truth now. This file is imported nowhere. Delete it entirely.

### DEAD CODE 2 — `lib/newsData.js`
**Problem:** Same as above. Static `newsPosts` array. Database is used now. Delete it entirely.

### DEAD CODE 3 — `components/HomeContent.jsx.tmp`
**Problem:** This is a `.tmp` backup file. Delete it entirely.

### DEAD CODE 4 — Duplicate Loading State in `app/admin/login/page.jsx`
**Problem:** Two identical loading states: `const [isLoading, setIsLoading] = useState(false)` and `const [loading, setLoading] = useState(false)`. Both are set in handleSubmit. The button uses `loading`, `isLoading` is set but never read by the button.
**Fix:** Remove `isLoading` and `setIsLoading` entirely. Keep only `loading`.

### DEAD CODE 5 — Duplicate CSS in `app/globals.css`
**Problem:** The `.prose-editor` CSS rules are defined TWICE. The entire block appears once starting around line 35 and again around line 65 with slightly different properties. This creates CSS specificity confusion and bloat.
**Fix:** Remove the first (shorter) block entirely. Keep only the second, more complete block that includes `background: #0d0f14` and `caret-color`.

### DEAD CODE 6 — Redundant `resolvedParams` in `app/api/admin/blogs/[id]/route.js`
**Problem:** GET and DELETE handlers do `const resolvedParams = await params; const { id } = resolvedParams`. PATCH already correctly does `const { id } = await params`. The `resolvedParams` intermediate variable is unnecessary.
**Fix:** Change GET and DELETE to use `const { id } = await params` directly, eliminating `resolvedParams`.

---

## PART 3 — NEWS SYSTEM IMPROVEMENTS

---

### NEWS 1 — Improve Finance Keyword Filter to Be Stricter
**File:** `app/api/cron/fetch-news/route.js`
**Problem:** The current filter only requires ONE finance keyword anywhere in title or description. Broad words like 'financial', 'revenue', 'compliance' appear in war coverage, oil news, and politics. This allows irrelevant articles through.
**Fix:** Implement a TWO-TIER filter. Tier 1 (strong signals): if title OR description contains any strong accounting-specific keyword, accept. Tier 2 (weak signals): only accept if BOTH title AND description contain finance terms. Replace the current filter with:

```js
const STRONG_KEYWORDS = [
  'tax', 'irs', 'hmrc', 'ato', 'cra', 'vat', 'gst', 'payroll',
  'accounting', 'bookkeeping', 'superannuation', 'pension fund',
  'corporation tax', 'income tax', 'withholding tax', 'tax return',
  'financial statement', 'audit', 'ifrs', 'gaap', 'reconciliation',
  'accounts payable', 'accounts receivable', 'tax compliance',
  'tax regulation', 'tax planning', 'tax filing', 'deduction',
  'small business tax', 'making tax digital', 'mtd'
]

const WEAK_KEYWORDS = [
  'financial', 'finance', 'revenue', 'fiscal', 'budget',
  'compliance', 'regulation', 'reporting'
]

// Block irrelevant topics even if they contain finance words
const BLOCK_TOPICS = [
  'war', 'military', 'ceasefire', 'missile', 'troops', 'geopolit',
  'celebrity', 'arrested', 'sport', 'football', 'cricket', 'match',
  'movie', 'film', 'actor', 'climate change', 'covid', 'election',
  'president', 'minister', 'parliament', 'congress vote',
  'oil price', 'gas price', 'crude oil', 'stock market', 'dow jones',
  'nasdaq', 's&p 500', 'shares', 'share price', 'cryptocurrency',
  'bitcoin', 'ethereum', 'nft'
]

function isFinanceRelevant(article) {
  const text = `${article.title} ${article.description || ''}`.toLowerCase()
  
  // Block irrelevant topics first
  if (BLOCK_TOPICS.some(t => text.includes(t))) return false
  
  // Accept if strong accounting keyword present
  if (STRONG_KEYWORDS.some(k => text.includes(k))) return true
  
  // Accept weak keywords only if appearing in BOTH title and description
  const titleText = (article.title || '').toLowerCase()
  const descText = (article.description || '').toLowerCase()
  const titleHasWeak = WEAK_KEYWORDS.some(k => titleText.includes(k))
  const descHasWeak = WEAK_KEYWORDS.some(k => descText.includes(k))
  
  return titleHasWeak && descHasWeak
}
```

Replace the existing `hasFinanceKeyword` check with `isFinanceRelevant(article)`.

---

### NEWS 2 — Add `export const dynamic` to Cron Endpoints
**Files:** All files in `app/api/cron/`
**Problem:** Some wrapper endpoints have `export const dynamic = 'force-dynamic'` but the main `fetch-news/route.js` does not. Without it, GET handlers may be cached.
**Fix:** Ensure `export const dynamic = 'force-dynamic'` is the FIRST line in `app/api/cron/fetch-news/route.js` (before imports or after — but as first export).

---

### NEWS 3 — Cron Endpoint Should Handle GNews 12-Hour Delay Gracefully
**File:** `app/api/cron/fetch-news/route.js`
**Problem:** When GNews returns `totalArticles: 0` (12-hour delay or rate limit), the current code just returns `{ fetched: 0, saved: 0, skipped: 0 }`. No distinction between "API worked but no new articles" vs "API returned an error response". Admins can't tell if the system is working.
**Fix:** Add response type checking and include a `status` field in the return:

```js
// After fetching from GNews:
if (!res.ok) {
  console.error(`GNews API error for query "${query}": ${res.status}`)
  continue
}

const data = await res.json()

// GNews sometimes returns a message about paid plans
if (data.information || !data.articles) {
  // Log but don't crash — free plan delay is expected
  continue
}
```

Return value should include: `{ fetched, saved, skipped, country, status: 'ok' }`.

---

## PART 4 — FOOTER FIX

**File:** `components/Footer.jsx`
**Problem:** The copyright line currently has: `<Link href="/admin" className="opacity-0 select-none cursor-default pointer-events-auto text-xl leading-none">©</Link> <span>2026 Clarivex Solution. All rights reserved.</span>`
The `©` symbol is invisible (`opacity-0`). User wants `©` to be visible but the admin link to remain hidden/unobtrusive.

**Fix:** Make `©` visible with `opacity-1`. Keep the admin link but wrap only the `©` text. The link itself should have no visible indication it is a link (no underline, no cursor change), but `©` should be visible:

```jsx
<p className="flex items-center justify-center gap-1">
  <Link 
    href="/admin" 
    className="select-none cursor-default text-[#8892a4] hover:text-[#8892a4]"
    style={{ textDecoration: 'none' }}
  >
    &copy;
  </Link>
  <span>2025 Clarivex Solutions. All rights reserved.</span>
</p>
```

Remove `opacity-0` entirely. The `©` is visible but clicking it quietly navigates to `/admin`.

---

## PART 5 — SEO FIXES

---

### SEO 1 — Robots.txt Should Disallow Admin and API
**File:** `app/robots.jsx`
**Fix:**
```js
import { siteUrl } from "@/lib/constants";

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

---

### SEO 2 — Sitemap Missing Legal Pages
**File:** `app/sitemap.jsx`
**Fix:** Add `/terms` and `/privacy` to staticRoutes:
```js
{ url: `${siteUrl}/terms`, lastModified: now, priority: 0.4, changeFrequency: 'yearly' },
{ url: `${siteUrl}/privacy`, lastModified: now, priority: 0.4, changeFrequency: 'yearly' },
```

---

### SEO 3 — Root Layout Metadata Template
**File:** `app/layout.jsx`
**Problem:** `title.template` is `"%s"` — no suffix. Individual pages manually add `| ClariVex` which creates inconsistency.
**Fix:**
```js
export const metadata = {
  title: {
    template: '%s | ClariVex Solutions',
    default: 'ClariVex Solutions — Outsourced Accounting for US, UK, AU & CA',
  },
  description: 'Elite outsourced accounting and finance operations for US, UK, AU, and CA businesses.',
  metadataBase: new URL('https://clarivex.net'),
}
```

Then in `app/blog/[slug]/page.jsx` and `app/news/[slug]/page.jsx`, change title to just `post.title` (remove the manual `| ClariVex` suffix — the template handles it).

---

### SEO 4 — Country Pages Need Alternate/Hreflang
**Files:** `app/us/page.jsx`, `app/uk/page.jsx`, `app/au/page.jsx`, `app/ca/page.jsx`
**Fix:** In each country page's `generateMetadata`, add `alternates.canonical`:
```js
alternates: {
  canonical: `https://clarivex.net/us`, // or /uk, /au, /ca
}
```

---

### SEO 5 — Add `noindex` to Admin
**Fix:** In `app/admin/layout.jsx`, add to the login-page branch:
```jsx
<>
  <meta name="robots" content="noindex, nofollow" />
  {children}
  <Toaster position="top-right" richColors />
</>
```
And to the main admin layout, add `<meta name="robots" content="noindex, nofollow" />` inside the `<main>` wrapper.

---

## PART 6 — UX IMPROVEMENTS (Apply to ALL Pages and Sections)

---

### UX 1 — Admin Sidebar Active State
**File:** `app/admin/layout.jsx`
**Problem:** No active state on sidebar nav links. When on `/admin/blog`, the Blog link looks the same as Dashboard and News.
**Fix:** The layout already uses `usePathname()`. Add active state logic:

```jsx
const navItems = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/blog', label: 'Blog', exact: false },
  { href: '/admin/news', label: 'News', exact: false },
]

// In render:
{navItems.map((item) => {
  const isActive = item.exact
    ? pathname === item.href
    : pathname.startsWith(item.href)
  return (
    <Link
      key={item.href}
      href={item.href}
      className={`block px-4 py-2.5 rounded-lg transition-all ${
        isActive
          ? 'bg-[#5a688e]/20 text-[#6aa595] font-medium border-l-2 border-[#6aa595]'
          : 'text-[#8892a4] hover:text-white hover:bg-[#1e2330]'
      }`}
    >
      {item.label}
    </Link>
  )
})}
```

---

### UX 2 — Admin Panel Responsive Mobile Layout
**File:** `app/admin/layout.jsx`
**Problem:** Fixed `w-64` sidebar with `ml-64` content. On screens smaller than 640px, admin is completely broken.
**Fix:** Add a hamburger button for mobile, collapsible sidebar. Keep desktop fixed sidebar. Add mobile overlay:

```jsx
const [sidebarOpen, setSidebarOpen] = useState(false)

// Sidebar: change to sliding on mobile
<aside className={`
  fixed inset-y-0 left-0 z-50 w-64 bg-[#13161e] border-r border-[#1e2330] flex flex-col p-6
  transform transition-transform duration-300
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0
`}>
  {/* close button inside sidebar on mobile */}
  <button className="lg:hidden absolute top-4 right-4 text-[#8892a4]" onClick={() => setSidebarOpen(false)}>✕</button>
  {/* ... rest of sidebar */}
</aside>

{/* Overlay on mobile */}
{sidebarOpen && (
  <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
)}

{/* Main content: remove fixed ml-64, use lg:ml-64 */}
<main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8 min-h-screen">
  {/* Hamburger for mobile — shown at top */}
  <button className="lg:hidden mb-4 p-2 text-[#8892a4] hover:text-white" onClick={() => setSidebarOpen(true)}>
    ☰ Menu
  </button>
  {children}
</main>
```

---

### UX 3 — Blog and News Cards: Add translate-y Hover Effect
**Files:** `components/BlogPageClient.jsx`, `components/NewsPageClient.jsx`
**Problem:** Cards have `hover:shadow-xl` but no `hover:-translate-y-1`. The lift effect makes cards feel interactive.
**Fix:** Change article card className to add `hover:-translate-y-1 cursor-pointer`:
```jsx
className="rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-6 transition-all duration-300 hover:border-[#5a688e]/40 hover:shadow-xl hover:-translate-y-1"
```

---

### UX 4 — Admin Dashboard StatCard Conflicting Transitions
**File:** `app/admin/page.jsx`
**Problem:** StatCard has both `transition-transform` and `transition-all` class — they conflict.
**Fix:** Remove `transition-transform`, keep only `transition-all`:
```jsx
className="bg-[#13161e] border border-[#1e2330] rounded-xl p-6 transition-all duration-300 cursor-pointer hover:border-[#5a688e]/60 hover:shadow-lg hover:-translate-y-1"
```

---

### UX 5 — Navbar: Add Active State for Current Page Link
**File:** `components/Navbar.jsx`
**Problem:** Nav links have no active state — you can't tell which page you're on.
**Fix:** Use `pathname` to detect active link:
```jsx
const isActive = (href) => {
  if (href === '/') return pathname === '/'
  if (href.startsWith('/#')) return pathname === '/'
  return pathname.startsWith(href)
}

// In link className:
className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[#6aa595] after:transition-all after:duration-300 ${
  isActive(link.href)
    ? 'text-[#1a1a2e] after:w-full'
    : 'text-[#5a6478] hover:text-[#1a1a2e] after:w-0 hover:after:w-full'
}`}
```

---

### UX 6 — Focus Visible Styles for Keyboard Accessibility
**File:** `app/globals.css`
**Fix:** Add after the existing CSS:
```css
/* Focus visible — keyboard accessibility */
:focus-visible {
  outline: 2px solid #6aa595;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove default focus ring for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

### UX 7 — Admin Table Rows: Better Hover and Row Separation
**File:** `app/admin/news/page.jsx`
**Problem:** Table row hover uses `hover:bg-[#1e2330]/30`. Rows feel flat with no clear separation.
**Fix:** Improve to:
```jsx
className="border-b border-[#1e2330] last:border-0 hover:bg-[#5a688e]/5 transition-colors duration-150 group"
```

---

### UX 8 — Admin Blog Page: No Row Hover State
**File:** `app/admin/blog/page.jsx`
**Problem:** Blog table rows have no hover state at all.
**Fix:** Add `hover:bg-[#1e2330]/40 transition-colors duration-150` to each `<tr>` in the blog table.

---

### UX 9 — Load More Button: Add Loading State
**Files:** `components/BlogPageClient.jsx`, `components/NewsPageClient.jsx`
**Problem:** Load More button has no loading state — clicking it instantly shows more items which can cause layout jumps.
**Fix:** Add `transition-all duration-300` to the grid container and a smooth entrance animation. Also ensure `visibleCount` increments smoothly.

---

### UX 10 — Sticky Filter Bar on News Page
**File:** `components/NewsPageClient.jsx`
**Problem:** Filter section is a static section. As users scroll the news grid, they lose access to filters.
**Fix:** Add `sticky top-20 z-30 backdrop-blur-sm` to the filter section wrapper so it sticks below the navbar. Change `bg-[#f8f9fa]` to `bg-[#f8f9fa]/95`:
```jsx
<section className="sticky top-20 z-30 border-y border-[#e2e4e9] bg-[#f8f9fa]/95 backdrop-blur-sm py-6">
```

---

### UX 11 — Blog Editor: Missing Category Options
**File:** `components/admin/BlogEditor.jsx`
**Problem:** `CATEGORY_OPTIONS` only has `['Bookkeeping', 'Tax & Compliance', 'Payroll', 'Advisory']`. The BlogPageClient and seed files also use `'Reconciliation'`, `'AP & AR'`, `'Data Security'`, `'General'`. Blog posts in these categories cannot be created via the editor.
**Fix:** Update:
```js
const CATEGORY_OPTIONS = [
  'Bookkeeping',
  'Tax & Compliance',
  'Payroll',
  'Advisory',
  'Reconciliation',
  'AP & AR',
  'Data Security',
  'General',
]
```

---

### UX 12 — Admin Login: Remove Double Loading State Bug
**File:** `app/admin/login/page.jsx`
(Already listed in Dead Code section — remove `isLoading` entirely, keep only `loading`)

---

### UX 13 — Add `aria-current="page"` to Active Nav Links
**File:** `components/Navbar.jsx`
**Fix:** On active nav links, add `aria-current="page"` attribute for accessibility.

---

### UX 14 — Admin News Manual Fetch: Show CRON_SECRET Not Configured Error
**File:** `app/api/admin/trigger-news-fetch/route.js`
**Problem:** If `CRON_SECRET` env var is not set, the trigger-news-fetch endpoint will call fetch-news with `Bearer undefined`. This returns a cryptic 401 error.
**Fix:** Add a check:
```js
if (!process.env.CRON_SECRET) {
  return NextResponse.json({ error: 'CRON_SECRET not configured in environment variables.' }, { status: 500 })
}
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  return NextResponse.json({ error: 'NEXT_PUBLIC_SITE_URL not configured in environment variables.' }, { status: 500 })
}
```

---

### UX 15 — Empty State Improvements
**Files:** `components/BlogPageClient.jsx`, `components/NewsPageClient.jsx`
**Problem:** Empty state is just plain text in a box. Improve it to be more user-friendly:
```jsx
<div className="mt-8 rounded-xl border border-[#e2e4e9] bg-[#f8f9fa] p-12 text-center">
  <div className="mx-auto mb-4 h-px w-12 bg-[#c9a96e]" />
  <p className="text-base font-medium text-[#1a1a2e]">No articles found</p>
  <p className="mt-2 text-sm text-[#5a6478]">Try adjusting your filters or check back later.</p>
  <button
    onClick={() => { setSelectedCountry('all'); setSelectedCategory('All'); setDateFilter('all') }}
    className="mt-4 rounded-full border border-[#5a688e] px-6 py-2 text-sm text-[#5a688e] hover:bg-[#5a688e] hover:text-white transition-colors"
  >
    Clear all filters
  </button>
</div>
```
(Adjust state variable names to match the actual component)

---

### UX 16 — News and Blog Page Hero: Add Animated Entry
**Files:** `components/NewsPageClient.jsx`, `components/BlogPageClient.jsx`
**Fix:** Add `animate-in fade-in slide-in-from-bottom-4 duration-700` to the hero `<div className="relative z-10 mx-auto...">` wrapper. This requires `tw-animate-css` which is already installed.

---

### UX 17 — Improve Button States: Consistent Cursor and Disabled Styling
**Across all pages:**
- All `disabled` buttons should have `cursor-not-allowed opacity-60`
- All interactive buttons should have `cursor-pointer` explicitly
- All form submit buttons should have `active:scale-95` for a pressed feel

---

## PART 7 — CODE QUALITY FIXES

---

### CODE 1 — `app/api/admin/blogs/[id]/route.js`: Standardize Params Destructuring
**Fix:** Change GET and DELETE to use `const { id } = await params` directly (remove the `resolvedParams` intermediate variable). Keep PATCH as-is since it already does this correctly.

---

### CODE 2 — Remove Unused `Clipboard` Import in `components/HomeContent.jsx`
**Check:** If `Clipboard` from lucide-react is imported but used only in `handleCopyEmail`, verify it's actually referenced in JSX. If not used in JSX, remove the import.

---

### CODE 3 — `app/admin/news/page.jsx`: The Delete Handler Uses Wrong Variable
**Problem:** `handleDelete` calls `handleDelete(deleteTarget.id)` and also separately `setDeleteTarget(null)`. But if `deleteTarget.id` is undefined (e.g., only `_id` exists for some reason), this silently fails.
**Fix:** The delete confirmation modal already has: `handleDelete(deleteTarget.id); setDeleteTarget(null)`. Verify `deleteTarget.id` always has a value by confirming the news API returns `id` field (it does — Prisma returns `id`). The admin news API at `/api/admin/news` should be checked.

---

### CODE 4 — Check `/api/admin/news/route.js` and `/api/admin/news/[id]/route.js`
**Verify these exist and:** 
- Return `id` (not `_id`) in all responses
- Have proper auth checks
- `/api/admin/news/[id]` DELETE handler properly deletes and optionally adds to BlockedUrl table

---

### CODE 5 — `lib/utils.js` Should Export `cn` Helper
**Verify:** `lib/utils.js` exports `cn` (clsx + tailwind-merge). If it doesn't, add:
```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

## PART 8 — RESPONSIVE DESIGN CHECKLIST

Apply these responsive fixes across all pages:

**News Page Filter Pills** — On mobile, the filter pill rows should scroll horizontally rather than wrap to 3+ lines:
```jsx
<div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-none">
  {/* pills */}
</div>
```

**Blog Page Filter Section** — Same horizontal scroll treatment for category pills on mobile.

**Admin Blog/News Tables** — Already use `overflow-x-auto`. Verify wrapper div has `w-full` and table has `min-w-full` (not fixed pixel min-width that would cause overflow without scroll).

**Admin Dashboard Stats Grid** — Already `grid-cols-2 lg:grid-cols-4` — correct.

**Admin New/Edit Blog Page** — Verify the form is padded correctly on mobile. Sidebar inputs shouldn't overflow.

**Footer Country Flags Row** — Verify flags don't overflow on very small screens. Add `flex-wrap gap-2` if needed.

**Hero Section** — Already responsive with `lg:grid lg:grid-cols-2`. Verify on 375px width (iPhone SE).

**Breadcrumbs** — Should truncate long post titles on mobile with `truncate` or `line-clamp-1`.

---

## PART 9 — RSS NEWS AGGREGATOR OVERHAUL

These two files exist in the project but were NOT in the code zip. They need to be completely rewritten. This is the most important section for news content quality.

**Files to rewrite:**
- `services/newsAggregator.js`
- `services/newsAggregatorUtils.mjs`

---

### THE PROBLEM (what exists currently)

The aggregator currently fetches from these RSS sources:
- BBC World News
- BBC Business
- Yahoo Finance

These are **general news sources**. They publish wars, politics, oil prices, celebrity arrests, and stock analysis. The site is supposed to show only accounting, tax, payroll, and compliance news.

The `isFinanceRelevant()` filter is **too broad**. Words like `financial`, `revenue`, `compliance`, `finance` appear in unrelated articles all the time. Examples of bad articles currently getting saved:
- "Iran war is unsettling China" — passes because summary mentions "financial markets"
- "Oil price jumps after Qatar warning" — passes because "revenue" appears
- "Trump cuts his losses on Noem" — passes because "fiscal" appears

The technical pipeline (RSS fetch → filter → categorize → upsert → Prisma) is architecturally correct. Only the sources and filter need fixing.

---

### THE FIX — Part A: Replace RSS Sources with Accounting-Specific Feeds

Replace ALL current RSS feeds in `services/newsAggregator.js` with these accounting/tax-specific sources only. These are free, no API key needed, and publish only relevant content:

```js
const RSS_FEEDS = [
  // US — IRS and accounting bodies
  {
    url: 'https://www.irs.gov/newsroom/irs-news-releases',
    country: 'US',
    source: 'IRS'
  },
  {
    url: 'https://www.accountingtoday.com/feed',
    country: 'US',
    source: 'Accounting Today'
  },
  {
    url: 'https://www.journalofaccountancy.com/rss/all.xml',
    country: 'US',
    source: 'Journal of Accountancy'
  },
  {
    url: 'https://www.cpajournal.com/feed/',
    country: 'US',
    source: 'CPA Journal'
  },

  // UK — HMRC and accounting bodies
  {
    url: 'https://www.gov.uk/search/news-and-communications.atom?keywords=tax&organisations%5B%5D=hm-revenue-customs',
    country: 'UK',
    source: 'HMRC'
  },
  {
    url: 'https://www.accountancyage.com/feed/',
    country: 'UK',
    source: 'Accountancy Age'
  },
  {
    url: 'https://www.icaew.com/rss/news',
    country: 'UK',
    source: 'ICAEW'
  },

  // AU — ATO and accounting bodies
  {
    url: 'https://www.ato.gov.au/api/rss/newsroom',
    country: 'AU',
    source: 'ATO'
  },
  {
    url: 'https://www.charteredaccountantsanz.com/news-and-analysis/rss',
    country: 'AU',
    source: 'CA ANZ'
  },

  // CA — CRA and accounting bodies
  {
    url: 'https://www.canada.ca/en/revenue-agency/news/newsroom.atom',
    country: 'CA',
    source: 'CRA'
  },
  {
    url: 'https://www.cpacanada.ca/en/news/feeds/rss',
    country: 'CA',
    source: 'CPA Canada'
  },

  // GENERAL — International standards bodies
  {
    url: 'https://www.ifrs.org/news-and-events/news/rss/',
    country: 'GENERAL',
    source: 'IFRS Foundation'
  },
  {
    url: 'https://www.fasb.org/rss/page&cid=1218220079823',
    country: 'GENERAL',
    source: 'FASB'
  },
  {
    url: 'https://www.accaglobal.com/gb/en/member/member/accounting-business/rss.html',
    country: 'GENERAL',
    source: 'ACCA'
  },
]
```

**Important implementation note:** Some of these RSS feeds may return 404 or be unavailable. The aggregator must handle each feed independently with try/catch — a failed feed should log a warning and continue, never crash the entire run. Always wrap each feed fetch in its own try/catch.

---

### THE FIX — Part B: Rewrite `isFinanceRelevant()` in `services/newsAggregatorUtils.mjs`

Replace the current broad keyword filter with a strict two-tier system:

```js
// STRONG signals — these are unambiguously accounting/tax content
const STRONG_KEYWORDS = [
  'tax return', 'tax filing', 'tax compliance', 'tax regulation', 'tax planning',
  'tax deduction', 'tax rate', 'tax year', 'tax credit', 'tax relief',
  'income tax', 'corporation tax', 'capital gains tax', 'inheritance tax',
  'payroll tax', 'withholding tax', 'sales tax', 'property tax',
  'vat return', 'vat registration', 'vat compliance', 'vat filing',
  'gst return', 'gst compliance', 'gst registration',
  'irs', 'hmrc', 'ato ', ' cra ', 'fintrac',
  'payroll', 'paye', 'national insurance', 'superannuation', 'super guarantee',
  'pension contribution', 'auto-enrolment',
  'bookkeeping', 'double-entry', 'accounts payable', 'accounts receivable',
  'bank reconciliation', 'chart of accounts', 'general ledger',
  'financial statement', 'balance sheet', 'profit and loss', 'cash flow statement',
  'audit', 'auditor', 'audit report',
  'ifrs', 'gaap', 'accounting standard',
  'making tax digital', 'mtd ',
  'w-2', 'w-4', '1099', 'p60', 'p11d

After all changes, verify these work:

1. **`/admin/login`** — Accessible without auth ✓
2. **`/admin`** — Redirects to login if no cookie ✓ (ONLY after fixing proxy.js → middleware.js)
3. **`/api/cron/fetch-news?country=US`** — Returns 401 without CRON_SECRET ✓
4. **`/api/news`** — Returns fresh data (not cached) ✓ (after adding force-dynamic)
5. **`/api/blog`** — Returns fresh data (not cached) ✓ (after adding force-dynamic)
6. **Admin sidebar** — Shows active state on current page ✓
7. **Mobile admin** — Hamburger visible, sidebar slides in ✓
8. **© symbol in footer** — Visible, clicking goes to /admin silently ✓
9. **News page filters** — Sticky, scrollable on mobile ✓
10. **UK cron** — Also fetches AU and GENERAL in same run ✓
11. **US cron** — Also fetches CA in same run ✓
12. **PATCH /api/admin/blogs/[id]** — Has auth check ✓
13. **News article date** — Uses `publishedAt` not `publishedDate` ✓
14. **Dead files deleted** — `lib/blogData.js`, `lib/newsData.js`, `HomeContent.jsx.tmp` ✓
15. **Duplicate CSS removed** — Only one `.prose-editor` block in globals.css ✓
16. **Blog editor categories** — All 8 categories present ✓

---

## PART 10 — RSS AGGREGATOR SYSTEM (services/newsAggregator.js + services/newsAggregatorUtils.mjs)

This is a two-file system that replaces the old simple GNews-only cron endpoint. The aggregator tries RSS feeds first (free, real-time), falls back to GNews if RSS returns nothing. The files exist but have several bugs that prevent them from working correctly in production.

---

### AGGREGATOR BUG 1 — Cron Endpoint Never Calls the Aggregator (Most Critical)
**File:** `app/api/cron/fetch-news/route.js`
**Problem:** This endpoint still uses the OLD inline GNews-only implementation from the previous version. The new `services/newsAggregator.js` with `fetchAndSaveNews()` is NEVER called anywhere. The entire aggregator is dead code.
**Fix:** Completely replace `app/api/cron/fetch-news/route.js` with:

```js
import { fetchAndSaveNews } from '@/services/newsAggregator'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  // Allow Vercel's own cron scheduler (sends x-vercel-cron header)
  const isVercelCron = request.headers.get('x-vercel-cron') === '1'
  const authHeader = request.headers.get('authorization')

  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country') || 'GENERAL'
  const since = searchParams.get('since') || null

  try {
    const result = await fetchAndSaveNews({ country, since })
    return NextResponse.json({ ...result, status: 'ok' })
  } catch (error) {
    console.error('Cron fetch-news error:', error)
    return NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 })
  }
}
```

Also update `app/api/admin/trigger-news-fetch/route.js` — it currently calls the fetch-news endpoint over HTTP (which now calls the aggregator). This is fine and should remain unchanged. But add a CRON_SECRET env check at the top:

```js
if (!process.env.CRON_SECRET) {
  return NextResponse.json({ error: 'CRON_SECRET not configured.' }, { status: 500 })
}
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  return NextResponse.json({ error: 'NEXT_PUBLIC_SITE_URL not configured.' }, { status: 500 })
}
```

---

### AGGREGATOR BUG 2 — GENERAL RSS Feeds Fetch Irrelevant Content (Root Cause of Garbage Articles)
**File:** `services/newsAggregator.js`
**Problem:** The `GENERAL` RSS feeds are:
- `BBC World` — international news: wars, politics, disasters
- `BBC Business` — general business: stock markets, oil prices, mergers
- `Yahoo Finance` — stock analysis, crypto, market movements

These sources produce articles like "Iran war unsettles China", "Oil price jumps after Qatar warning", "Trump cuts losses on Noem". Even with the keyword filter, these pass through because they contain words like "financial", "revenue", "compliance" in their descriptions.

**Fix:** Replace the entire `GENERAL` section and also fix the other country feeds to use official/specialist sources only. Replace `RSS_FEEDS` entirely:

```js
const RSS_FEEDS = {
  US: [
    { name: 'IRS Newsroom', url: 'https://www.irs.gov/newsroom/rss' },
    { name: 'IRS Tax Tips', url: 'https://www.irs.gov/newsroom/tax-tips/rss' },
    { name: 'AICPA Journal', url: 'https://www.journalofaccountancy.com/rss/all.html' },
    { name: 'Accounting Today', url: 'https://www.accountingtoday.com/rss' },
    { name: 'CPA Journal', url: 'https://www.cpajournal.com/feed/' },
  ],
  UK: [
    { name: 'HMRC Updates', url: 'https://www.gov.uk/government/organisations/hm-revenue-customs.atom' },
    { name: 'ICAEW', url: 'https://www.icaew.com/rss' },
    { name: 'AccountingWEB UK', url: 'https://www.accountingweb.co.uk/rss.xml' },
    { name: 'Taxation Magazine', url: 'https://www.taxation.co.uk/feed' },
  ],
  AU: [
    { name: 'ATO Newsroom', url: 'https://www.ato.gov.au/media-centre/rss' },
    { name: 'CPA Australia', url: 'https://www.cpaaustralia.com.au/news/rss' },
    { name: 'CAANZ', url: 'https://www.charteredaccountantsanz.com/news-and-analysis/rss' },
    { name: 'Australian Taxation Office', url: 'https://www.ato.gov.au/general/new-legislation/rss' },
  ],
  CA: [
    { name: 'CRA Newsroom', url: 'https://www.canada.ca/en/revenue-agency/news.rss' },
    { name: 'CPA Canada', url: 'https://www.cpacanada.ca/rss' },
    { name: 'Canadian Accountant', url: 'https://www.canadianaccountant.com/feed' },
  ],
  GENERAL: [
    { name: 'IFAC', url: 'https://www.ifac.org/news-resources/rss' },
    { name: 'IASB IFRS', url: 'https://www.ifrs.org/news-and-events/news/rss/' },
    { name: 'Accounting Today', url: 'https://www.accountingtoday.com/rss' },
    { name: 'AccountingWEB Global', url: 'https://www.accountingweb.co.uk/rss.xml' },
    { name: 'OECD Tax', url: 'https://www.oecd.org/tax/rss' },
  ],
}
```

Note: Some of these RSS URLs may return 404 — that's handled gracefully by the existing `Promise.allSettled` pattern. The key change is removing BBC/Yahoo and replacing with authoritative accounting/tax sources. The GNews fallback will activate if RSS returns nothing.

---

### AGGREGATOR BUG 3 — Debug `console.log` Left in Production Code
**File:** `services/newsAggregator.js`
**Problem:** Inside `fetchAndSaveNews`, there is:
```js
console.log("ARTICLE:", item.title);
```
This logs every single article title to Vercel's function logs on every cron run — pollutes logs and slightly impacts performance.
**Fix:** Remove this line entirely.

---

### AGGREGATOR BUG 4 — BLOCKED_KEYWORDS Too Aggressive — Blocks Legitimate Finance News
**File:** `services/newsAggregatorUtils.mjs`
**Problem:** The blocked keywords include `'stock'`, `'stocks'`, `'market'`, `'shares'`. But legitimate accounting news uses these terms:
- "IRS Updates Stock Option Tax Treatment" — blocked by 'stock'
- "HMRC Guidance on Employee Share Schemes" — blocked by 'shares'  
- "CRA Clarifies Market Value Rules for Business Assets" — blocked by 'market'

**Fix:** Replace BLOCKED_KEYWORDS with context-aware blocking. Remove the broad single words and replace with multi-word phrases that only match truly irrelevant content:

```js
export const BLOCKED_TOPICS = [
  // Geopolitics / war
  'ceasefire', 'missile strike', 'military operation', 'troops deployed',
  'airstrike', 'invasion', 'war in', 'conflict in', 'geopolit',
  // Markets/stocks (specific enough to not block legitimate finance news)
  'stock market crash', 'dow jones', 'nasdaq composite', 's&p 500',
  'wall street', 'share price target', 'stock price target',
  'bitcoin', 'ethereum', 'cryptocurrency', 'crypto market', 'nft',
  'oil price', 'crude oil', 'gas price', 'commodity price',
  // Entertainment / unrelated
  'celebrity', 'arrested for', 'hollywood', 'box office',
  'match result', 'football score', 'cricket score', 'sports result',
  // Pure politics
  'election result', 'polling data', 'presidential race', 'campaign trail',
]

export const ALLOWED_KEYWORDS = [
  'tax', 'taxation', 'irs', 'hmrc', 'ato', 'cra', 'gst', 'vat',
  'income tax', 'corporation tax', 'tax filing', 'tax return',
  'tax compliance', 'tax regulation', 'tax planning', 'tax relief',
  'payroll', 'wage', 'salary compliance', 'pension fund', 'superannuation',
  'accounting', 'accountant', 'bookkeeping', 'audit',
  'financial reporting', 'financial statement', 'ifrs', 'gaap',
  'deduction', 'withholding', 'tax deduction', 'making tax digital',
  'self assessment', 'tax return', 'annual return', 'companies house',
  'annual report', 'balance sheet', 'profit and loss', 'cash flow',
]

export function isFinanceRelevant({ title = '', summary = '' }) {
  const text = `${title} ${summary}`.toLowerCase()

  // Block specific irrelevant topics first
  if (BLOCKED_TOPICS.some(k => text.includes(k))) return false

  // Accept if any strong finance/accounting keyword is present
  return ALLOWED_KEYWORDS.some(k => text.includes(k))
}
```

---

### AGGREGATOR BUG 5 — ALLOWED_KEYWORDS and BLOCKED_KEYWORDS Defined in Wrong File
**Problem:** In the pasted code, `ALLOWED_KEYWORDS` and `BLOCKED_KEYWORDS` are defined at the bottom of `newsAggregator.js` AND exported. But `isFinanceRelevant` is in `newsAggregatorUtils.mjs` and needs these constants. This creates a circular dependency risk and the constants are likely duplicated.
**Fix:** Ensure `ALLOWED_KEYWORDS`, `BLOCKED_TOPICS`, `isFinanceRelevant`, `categoriseArticle`, `toSlug`, `dedupeArticles`, `normaliseRssItem`, `normaliseGNewsItem`, `normaliseLinkKey`, `normaliseTitleKey`, `toDate` are ALL in `newsAggregatorUtils.mjs` only. Remove any duplicates from `newsAggregator.js`. `newsAggregator.js` should only import from utils, never re-export them.

---

### AGGREGATOR BUG 6 — `rss-parser` Package Not in package.json
**Problem:** `newsAggregator.js` imports `Parser from 'rss-parser'` but `rss-parser` is not in the package.json dependencies.
**Fix:** Ensure `package.json` has:
```json
"rss-parser": "^3.13.0"
```
And run `npm install rss-parser` before deploying. Without this the build will fail on Vercel.

---

### AGGREGATOR BUG 7 — Advisory Lock Fails Silently When Postgres Extension Not Available
**File:** `services/newsAggregator.js`
**Problem:** `pg_try_advisory_lock` is a PostgreSQL function available in all standard Postgres installs including Neon. But if it fails (permissions, Neon serverless connection timing), the error is caught and the function returns `{ acquired: false }` — causing the entire fetch to silently do nothing. There is no way to distinguish "lock acquired by another process" from "lock failed due to error".
**Fix:** Add better error handling and logging to `acquireLock`:

```js
async function acquireLock(country) {
  if (memoryLocks.has(country)) {
    return { acquired: false, release: async () => {} }
  }

  memoryLocks.add(country)
  let dbLockId

  try {
    dbLockId = advisoryLockId(country)
    const rows = await prisma.$queryRaw`SELECT pg_try_advisory_lock(${dbLockId}) AS acquired`
    const row = Array.isArray(rows) ? rows[0] : null

    if (!row || !asBool(row.acquired)) {
      memoryLocks.delete(country)
      console.log(`[newsAggregator] Lock not acquired for ${country} — another process running`)
      return { acquired: false, release: async () => {} }
    }

    return {
      acquired: true,
      release: async () => {
        try {
          await prisma.$queryRaw`SELECT pg_advisory_unlock(${dbLockId})`
        } catch (unlockErr) {
          console.error('[newsAggregator] Failed to release advisory lock:', unlockErr)
        } finally {
          memoryLocks.delete(country)
        }
      },
    }
  } catch (error) {
    memoryLocks.delete(country)
    // Log but don't throw — fall back to memory-only lock
    console.error('[newsAggregator] Advisory lock error (falling back to memory lock):', error.message)
    // Memory lock is already set — proceed without DB lock
    return {
      acquired: true,
      release: async () => { memoryLocks.delete(country) },
    }
  }
}
```

---

### AGGREGATOR IMPROVEMENT 1 — Add `force-dynamic` to Cron Wrapper Endpoints
**Files:** `app/api/cron/fetch-news-uk/route.js`, `app/api/cron/fetch-news-us/route.js`, `app/api/cron/fetch-news-au/route.js`, `app/api/cron/fetch-news-general/route.js`
**Fix:** All four already have `export const dynamic = 'force-dynamic'` — verify this is the first line in each file.

---

### AGGREGATOR IMPROVEMENT 2 — RSS Feed Timeouts
**File:** `services/newsAggregator.js`
**Problem:** `fetchRssSource` calls `fetch(feed.url, { cache: 'no-store' })` with no timeout. If an RSS feed is slow or unresponsive, the entire cron job can hang until Vercel's 60-second function timeout kills it.
**Fix:** Add AbortController timeout to RSS fetches:

```js
async function fetchRssSource(feed, maxPerSource) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000) // 8 second timeout per feed

  try {
    const response = await fetch(feed.url, { cache: 'no-store', signal: controller.signal })
    clearTimeout(timer)

    if (!response.ok) {
      throw new Error(`RSS fetch failed (${response.status}) for ${feed.url}`)
    }

    const xml = await response.text()
    const parsed = await parser.parseString(xml)
    const rawItems = Array.isArray(parsed.items) ? parsed.items.slice(0, maxPerSource) : []

    return rawItems
      .map((item) => normaliseRssItem(item, feed.name))
      .filter(Boolean)
      .map((item) => ({ ...item, source: item.source || feed.name }))

  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') {
      throw new Error(`RSS timeout (8s) for ${feed.url}`)
    }
    throw err
  }
}
```

---

### AGGREGATOR IMPROVEMENT 3 — `getFeeds` Always Appends GENERAL Feeds
**File:** `services/newsAggregator.js`
**Problem:** `getFeeds(country)` merges country-specific feeds WITH GENERAL feeds for every run. This means every US/UK/AU/CA fetch ALSO fetches BBC World and Yahoo Finance (the problematic ones). After fixing GENERAL feeds to use IFAC/IASB/AccountingWEB, this is actually fine — but it doubles the number of RSS calls per cron run.
**Decision:** After fixing the GENERAL feed sources, keep this behavior — it means country-specific pages also get global accounting standards news. But since `FETCH_CONCURRENCY = 5`, all feed fetches run in parallel and this is efficient.

---

### AGGREGATOR SUMMARY — Files to Modify

| File | Changes |
|------|---------|
| `app/api/cron/fetch-news/route.js` | Complete replacement — call `fetchAndSaveNews` |
| `services/newsAggregator.js` | Fix RSS_FEEDS, remove console.log, fix acquireLock error handling, add RSS timeouts |
| `services/newsAggregatorUtils.mjs` | Fix BLOCKED_KEYWORDS → BLOCKED_TOPICS (multi-word), improve isFinanceRelevant, remove duplicates |
| `package.json` | Add `rss-parser` dependency |
| `app/api/admin/trigger-news-fetch/route.js` | Add env var checks |

---

Apply changes in this exact order to avoid breaking things:

1. **First:** Rename `proxy.js` to `middleware.js` and fix the export name (BUG 1)
2. **Second:** Add `export const dynamic = 'force-dynamic'` to all public API routes (BUG 2)
3. **Third:** Fix `fetch-news-uk/route.js` and `fetch-news-us/route.js` to also fetch other regions (BUG 3)
4. **Fourth:** Add auth to PATCH endpoint (BUG 4)
5. **Fifth:** Fix news date field (BUG 5)
6. **Sixth:** Add Vercel cron header bypass (BUG 6)
7. **Then:** Aggregator fixes — replace cron endpoint to call fetchAndSaveNews, fix RSS feeds, remove debug log, fix keyword filter, add RSS timeouts, add rss-parser to package.json (PART 10)
8. **Then:** All dead code removal, CSS dedup, category fix
9. **Then:** SEO fixes
10. **Finally:** All UX improvements

Return all modified files with complete file content. Do not return partial files. Do not explain changes inline — just deliver the code.

Only modify files explicitly listed. Do not change anything else.
