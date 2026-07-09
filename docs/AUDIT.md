# Clarivex Solution Codebase Audit

Audit date: 2026-07-05  
Scope: local Next.js app, Prisma schema/scripts, app routes, package scripts, env template, git history scan, and dependency audit. No code was changed.

## 1. Blog Publishing Flow

### Seed invocation

- `npm run seed-blogs` is defined as `node prisma/seed-blogs.js` in `package.json:11`.
- `npm run seed` runs both blog and news seeds via `node prisma/seed-blogs.js && node prisma/seed-news.js` in `package.json:10`.
- I found no `.github` workflow directory, no CI job, and no cron entry invoking `npm run seed-blogs`. `vercel.json:2-9` only schedules `/api/cron/fetch-news` and `/api/cron/generate-blog`.
- `README.md:3-17` only documents `npm run dev`; it does not document seed usage.
- Conclusion: `prisma/seed-blogs.js` appears to be invoked manually through npm scripts, not automatically by CI, Vercel cron, or an in-repo scheduler.

### Seed behavior

- `prisma/seed-blogs.js:3-4` loads `.env.local` and imports Prisma.
- The script deletes all existing blog rows before inserting seed posts (`prisma/seed-blogs.js:153-156`). This is destructive if run against production.
- Each seed post is created with `status: 'published'` and a fixed `publishedAt` value (`prisma/seed-blogs.js:158-170`).
- Because the script calls `deleteMany({})` first, the `upsert` at `prisma/seed-blogs.js:158-172` behaves like fresh insertion after deletion.

### Draft to published transitions

- The Prisma model defaults `Blog.status` to `"draft"` (`prisma/schema.prisma:18`), but app code commonly sends an explicit status.
- Admin creation route accepts `status` from request JSON and sets `publishedAt = new Date()` only when `status === 'published'` (`app/api/admin/blogs/route.js:30-46`).
- The blog editor UI defaults new posts to draft (`components/admin/BlogEditor.jsx:85`) and lets the admin select `"draft"` or `"published"` (`components/admin/BlogEditor.jsx:363-375`). It submits the chosen `status` to `/api/admin/blogs` or `/api/admin/blogs/:id` (`components/admin/BlogEditor.jsx:199-227`).
- The admin blog list has a one-click publish action for drafts (`app/admin/blog/page.jsx:95-102`, buttons at `app/admin/blog/page.jsx:219-227`).
- The PATCH route updates only `{ status: body.status }` (`app/api/admin/blogs/[id]/route.js:63-76`). It does not set `publishedAt`, so publishing through the one-click list action can leave `publishedAt` null.
- The PUT route sets `publishedAt` when status becomes `"published"` and the existing post did not already have `publishedAt` (`app/api/admin/blogs/[id]/route.js:44-54`).
- The AI generation cron creates blog posts directly as published (`app/api/cron/generate-blog/route.js:172-183`) and is scheduled by Vercel twice weekly (`vercel.json:8`).

### Lifecycle to live site

1. Manual seed path: run `npm run seed-blogs` -> `prisma/seed-blogs.js` deletes all blogs -> inserts seed posts as `published` with `publishedAt` -> public blog list/API queries see them because they filter `status: 'published'` (`app/api/blog/route.js:12-15`, `app/blog/[slug]/page.jsx:29-32`).
2. Manual admin path: admin creates a post at `/admin/blog/new` (`app/admin/blog/new/page.jsx:4-5`) -> editor POSTs title/slug/excerpt/content/category/country/status (`components/admin/BlogEditor.jsx:199-227`) -> route stores it (`app/api/admin/blogs/route.js:30-50`) -> if status is `published`, it appears publicly.
3. Draft path: admin creates or edits a post with status `draft` -> public routes exclude it (`app/api/blog/route.js:12-15`, `app/api/blog/[slug]/route.js:10-12`, `app/blog/[slug]/page.jsx:29-32`) -> admin can publish via edit form PUT or list PATCH. PUT sets `publishedAt`; PATCH does not.
4. Automated cron path: Vercel calls `/api/cron/generate-blog` on Tuesdays and Fridays (`vercel.json:8`) -> route calls Anthropic (`app/api/cron/generate-blog/route.js:134-145`) -> parses JSON (`app/api/cron/generate-blog/route.js:153-158`) -> creates a published blog (`app/api/cron/generate-blog/route.js:172-183`) -> public blog pages include it.

## 2. Security Vulnerabilities

### Admin auth and sessions

- `proxy.js` only checks that an `admin_token` cookie exists before allowing protected `/admin/*` pages (`proxy.js:14-26`). It does not verify the token against `AdminSession` or check expiry. Real validation happens in `lib/adminAuth.js:4-19`, but the proxy itself is not a trustworthy auth boundary.
- This is higher risk because `npm audit` reports multiple Next.js middleware/proxy bypass advisories against pinned `next@16.1.6`; see dependency audit below. If the proxy is bypassed, protected client admin pages rely on `AdminShell` rendering null for unauthenticated users (`components/admin/AdminShell.jsx:55-56`), while protected API routes still validate sessions.
- Admin API routes for blogs/news/manual news fetch do call `verifyAdminRequest` before DB access (`app/api/admin/blogs/route.js:7-10`, `app/api/admin/blogs/[id]/route.js:7-10`, `app/api/admin/news/route.js:7-10`, `app/api/admin/news/[id]/route.js:7-12`, `app/api/admin/trigger-news-fetch/route.js:6-9`).
- Login has in-memory IP rate limiting (`app/api/admin/login/route.js:5-29`), but it is process-local and can reset across serverless invocations/deploys. It also trusts the first `x-forwarded-for` value (`app/api/admin/login/route.js:28`).
- Login falls back to plain `ADMIN_PASSWORD` string comparison if no DB credential or `ADMIN_PASSWORD_HASH` exists (`app/api/admin/login/route.js:39-46`). That creates a footgun for plaintext production passwords.
- Auth cookies are `httpOnly` and `sameSite: 'strict'`, but `secure: true` is not set (`app/api/admin/login/route.js:60-65`).
- Expired sessions are rejected (`lib/adminAuth.js:7-9`, `lib/adminAuth.js:17-19`), but expired session rows are not deleted except on logout.

### Password reset flow

- Forgot-password always returns success to avoid email enumeration (`app/api/admin/forgot-password/route.js:22-28`), which is good.
- Reset tokens are generated with `crypto.randomUUID()` and expire after 1 hour (`app/api/admin/forgot-password/route.js:30-38`).
- There is no rate limit on `/api/admin/forgot-password` or `/api/admin/reset-password` (`app/api/admin/forgot-password/route.js:15-72`, `app/api/admin/reset-password/route.js:5-31`). An attacker can spam reset emails or brute-force submitted tokens.
- In development, the reset URL is logged (`app/api/admin/forgot-password/route.js:59-62`). That is convenient locally but dangerous if `NODE_ENV` is mis-set or logs are shared.
- Reset only requires a password length of 8 (`app/api/admin/reset-password/route.js:8-18`), with no complexity, compromised-password, or confirmation check server-side.
- Reset changes the admin credential but does not revoke existing `AdminSession` rows (`app/api/admin/reset-password/route.js:20-31`), so old logged-in sessions survive a password reset.

### Raw Prisma / SQL injection

- Raw Prisma SQL is used for PostgreSQL advisory locks in `services/newsAggregator.js:184-200`.
- The calls use Prisma tagged templates with a numeric lock id (`prisma.$queryRaw\`SELECT pg_try_advisory_lock(${dbLockId}) AS acquired\``), not unsafe string concatenation. I did not find `queryRawUnsafe`or`executeRawUnsafe`.
- The first raw-query scan missed this because of shell escaping; the deeper route/service scan found it. Current assessment: low SQL injection risk from raw Prisma usage.

### Secrets and credentials

- `.env.local` is not present in this working tree.
- Current-file secret scan did not find obvious committed secret values such as private keys, API key literals, or database URLs. `.env.example` contains empty placeholders only (`.env.example:1-11`).
- Git history search found environment variable references across commits, but no obvious literal secret values in the sampled output. This is not a substitute for a dedicated scanner such as gitleaks/trufflehog because the output was very large and pattern-based.
- `.env.example` is incomplete for variables required by current code. Missing from `.env.example`: `ADMIN_PASSWORD`, `ADMIN_PASSWORD_HASH`, `CRON_SECRET`, `ANTHROPIC_API_KEY`, `GNEWS_API_KEY`, and `NEXT_PUBLIC_GA_ID`.

### `proxy.js` open proxy / SSRF

- `proxy.js` is Next proxy/middleware for admin gating; it does not fetch arbitrary URLs or forward requests (`proxy.js:10-29`).
- I did not find an open-proxy implementation in this file. The relevant risk is auth bypass due to cookie-existence-only gating, not SSRF.

### Input validation and sanitization

- Admin blog POST accepts raw `title`, `slug`, `excerpt`, `content`, `coverImage`, `category`, `country`, and `status` from JSON with no server-side schema or allowlist (`app/api/admin/blogs/route.js:30-49`).
- Admin blog PUT spreads the entire request body into `updateData` (`app/api/admin/blogs/[id]/route.js:37-54`). This can update any Prisma-accepted Blog field supplied by the client, including `publishedAt`, `createdAt`, or unexpected status values.
- Admin blog PATCH accepts any `body.status` and writes it directly (`app/api/admin/blogs/[id]/route.js:69-74`).
- Blog content is stored as HTML and rendered with `dangerouslySetInnerHTML` on the public page (`app/blog/[slug]/page.jsx:35-38`, `app/blog/[slug]/page.jsx:227`). The client editor sanitizes pasted HTML (`components/admin/BlogEditor.jsx:20-48`), but the API and cron do not sanitize stored HTML server-side. Any malicious admin session, compromised cron response, or direct API call with valid session can create stored XSS.
- The AI blog cron stores model-generated HTML directly (`app/api/cron/generate-blog/route.js:153-183`) and the prompt requests HTML output (`app/api/cron/generate-blog/route.js:122-131`). There is no server-side HTML sanitizer before persistence.
- Admin news POST/PUT accept text, slug, URL, category, country, and dates without server-side schema/allowlists (`app/api/admin/news/route.js:30-45`, `app/api/admin/news/[id]/route.js:24-37`).
- Public blog/news list `limit` accepts `parseInt(...)`; `Math.min(NaN, 500)` can produce `NaN` for Prisma `take` if a nonnumeric limit is supplied (`app/api/blog/route.js:8-16`, `app/api/news/route.js:8-28`).
- Contact form escapes HTML before email insertion (`app/api/contact/route.js:7-15`, `app/api/contact/route.js:47-53`), but it does not validate email format before using it as `replyTo` (`app/api/contact/route.js:54-58`). Rate limiting is process-local and trusts forwarded IP headers (`app/api/contact/route.js:18-36`).

### Cron/public API exposure

- Cron routes trust `x-vercel-cron: 1` from the incoming request (`app/api/cron/fetch-news/route.js:7-12`, `app/api/cron/generate-blog/route.js:87-93`). If this header can be sent by public clients in the deployed environment, it bypasses `CRON_SECRET`.
- `/api/cron/generate-blog` can create published blog posts when authorized (`app/api/cron/generate-blog/route.js:172-183`), so the header trust issue is potentially high impact.
- Public API routes intentionally expose published blogs/news (`app/api/blog/route.js:6-35`, `app/api/blog/[slug]/route.js:6-23`, `app/api/news/route.js:6-39`, `app/api/news/[slug]/route.js:6-23`) and geo (`app/api/geo/route.js:5-9`).
- I found no custom CORS headers in app routes or `next.config.mjs`; browser cross-origin JS reads are therefore not explicitly allowed. The APIs are still publicly reachable server-to-server.
- `next.config.mjs:23-42` sets general security headers and admin no-cache headers, but no CSP is configured.

### Dependency audit

Command run: `npm audit --json`

- Result: 30 vulnerabilities total: 0 critical, 16 high, 13 moderate, 1 low.
- Direct high-severity packages include `next@16.1.6` and `prisma@7.4.2`.
- `next@16.1.6` has multiple advisories fixed by `next@16.2.10`, including middleware/proxy bypass, SSRF in WebSocket upgrades, Server Components DoS, image/cache DoS, XSS/cache poisoning advisories, and request smuggling in rewrites.
- `prisma@7.4.2` pulls high-severity advisories through `@prisma/config` / `@prisma/dev`, including `effect`, `hono`, and `@hono/node-server` transitive issues.
- `resend@6.9.2` has a moderate advisory through `svix` / `uuid`.
- Many high/moderate findings are transitive development/tooling dependencies, but the Next.js advisories are directly relevant to runtime security.

## 3. Broken / Outdated Code

### Deprecated APIs / dead paths / unused code

- `prisma/seed.js` imports `../lib/blogData.js` and `../lib/newsData.js` (`prisma/seed.js:1-2`), but those files do not exist in the current tree. This seed script is dead/broken if run directly.
- `prisma/cleanup-news.js` is not referenced by `package.json` scripts and appears to be a manual utility only (`prisma/cleanup-news.js:30-56`).
- `docs/news-aggregation.md` is stale: it says `vercel.json` configures a 5-minute schedule (`docs/news-aggregation.md:43-50`), but current `vercel.json` schedules daily regional fetches and twice-weekly blog generation (`vercel.json:3-8`).
- `README.md:19` says to edit `app/page.js`, but the active file is `app/page.jsx`.
- `components/admin/BlogEditor.jsx:154-156` has an `onUpdate` callback that calls `editor.getHTML()` but does not use the result.
- `BlogCard` accepts an `onEdit` prop that is never used (`app/admin/blog/page.jsx:12`).
- Several files contain mojibake/encoding artifacts in strings/comments, e.g. `prisma/seed-blogs.js:14`, `app/admin/blog/page.jsx:38`, and `app/blog/[slug]/page.jsx:189`. This is not necessarily a runtime bug, but it indicates encoding damage.
- No `TODO`, `FIXME`, `HACK`, or `XXX` comments were found by `rg`.

### Environment variables

Referenced in code/docs:

- Present in `.env.example`: `DATABASE_URL` (`lib/prisma.js:7`, `prisma.config.ts:9`), `RESEND_API_KEY` (`app/api/contact/route.js:4`, `app/api/admin/forgot-password/route.js:6`), `FROM_EMAIL` (`app/api/contact/route.js:55`, `app/api/admin/forgot-password/route.js:44`), `ADMIN_EMAIL` (`app/api/admin/forgot-password/route.js:20`), `CONTACT_EMAIL` (`app/api/contact/route.js:56`), `NEXT_PUBLIC_SITE_URL` (`lib/constants.js:1`, `app/api/admin/trigger-news-fetch/route.js:15-24`).
- Missing from `.env.example`: `ADMIN_PASSWORD_HASH` and `ADMIN_PASSWORD` (`app/api/admin/login/route.js:44-46`), `CRON_SECRET` (`app/api/cron/fetch-news/route.js:11`, `app/api/cron/generate-blog/route.js:91`, `app/api/admin/trigger-news-fetch/route.js:11-28`), `ANTHROPIC_API_KEY` (`app/api/cron/generate-blog/route.js:95-97`), `GNEWS_API_KEY` (`services/newsAggregator.js:279-281`), `NEXT_PUBLIC_GA_ID` (`app/layout.jsx:100`).
- `.env.local` was not present during this audit, so local runtime would fail without environment provisioning.

### Outdated packages

Command run: `npm outdated --json`

- `next`, `@next/env`, `@next/third-parties`, and `eslint-config-next` are pinned at `16.1.6`; latest/wanted is `16.2.10`.
- `@prisma/client`, `@prisma/adapter-neon`, and `prisma` are pinned around `7.4.2`; latest/wanted is `7.8.0`.
- Tiptap packages are pinned at `3.20.0`; latest/wanted is `3.27.1`.
- `resend` is pinned at `6.9.2`; latest/wanted is `6.17.1`.
- `lucide-react` is pinned at `0.575.0`; latest is `1.23.0`, likely with icon/package API changes to review.
- `react` and `react-dom` are pinned at `19.2.3`; latest is `19.2.7`.
- `cloudinary`, `radix-ui`, and `tailwind-merge` also have newer wanted/latest versions.

### Verification issues

- `npm run test` failed because Node could not resolve `rss-parser` from `services/__tests__/newsAggregatorUtils.test.mjs`. The local install appears incomplete or missing dependencies despite `rss-parser` being listed in `package.json:39`.
- `npx next lint` did not produce a lint report. It attempted to fetch/use `next@16.2.10` and then failed with `Invalid project directory provided, no such directory: ...\lint`, which is consistent with modern Next removing/deprecating the old `next lint` workflow.

## 4. Summary

### Critical - fix before any new feature

- Upgrade `next` from `16.1.6` to a fixed version because audit reports middleware/proxy bypass, SSRF, DoS, XSS/cache poisoning, and request-smuggling advisories directly against the pinned runtime package.
- Remove trust in client-supplied `x-vercel-cron` for cron authorization, especially `/api/cron/generate-blog`, or otherwise prove Vercel strips/spoofs this header safely before public traffic reaches the route.
- Add server-side validation and sanitization for blog HTML before persistence/rendering; public rendering uses `dangerouslySetInnerHTML`.
- Harden admin auth: make proxy/session validation real at the edge or stop relying on proxy for admin pages, set secure cookies, avoid plaintext `ADMIN_PASSWORD` fallback in production, and invalidate sessions after password reset.

### Important

- Add schema validation/allowlists for all admin write routes and avoid spreading arbitrary request bodies into Prisma updates.
- Fix PATCH publish behavior so `publishedAt` is set when a draft becomes published.
- Add rate limiting to forgot-password/reset-password and make login/contact rate limiting durable outside process memory.
- Update `.env.example` for all required env vars and document safe seed usage, especially that `seed-blogs` deletes all blog rows.
- Upgrade Prisma/Resend/transitive vulnerable packages and re-run `npm audit`.
- Restore a working dependency install and test/lint workflow.

### Nice-to-have

- Clean stale docs (`README.md`, `docs/news-aggregation.md`) and remove or repair dead scripts (`prisma/seed.js`, maybe `prisma/cleanup-news.js`).
- Add a dedicated secret scanner to CI/pre-commit and run a full historical scan with redacted reporting.
- Add CSP headers in `next.config.mjs`.
- Clean encoding artifacts/mojibake in seeded content and UI strings.

## 5. Follow-up Audit: Remaining Codebase

This section is a follow-up pass over the routes, components, utilities, and integrations that were not the main focus of the original blog/admin/auth/cron audit. Findings below avoid repeating the earlier admin/session/cron/database issues unless they create a distinct frontend, build, SEO, or integration problem.

### API route coverage matrix

Files under `app/api/` at the time of this follow-up:

- `app/api/admin/blogs/[id]/route.js` - covered in the original admin/blog audit.
- `app/api/admin/blogs/route.js` - covered in the original admin/blog audit.
- `app/api/admin/forgot-password/route.js` - covered in the original auth audit; new build-time Resend finding below.
- `app/api/admin/login/route.js` - covered in the original auth audit.
- `app/api/admin/logout/route.js` - covered in the original auth audit.
- `app/api/admin/news/[id]/route.js` - covered in the original admin/news audit.
- `app/api/admin/news/route.js` - covered in the original admin/news audit.
- `app/api/admin/reset-password/route.js` - covered in the original auth audit.
- `app/api/admin/trigger-news-fetch/route.js` - covered in the original admin/cron audit.
- `app/api/blog/[slug]/route.js` - covered in the original public blog API audit.
- `app/api/blog/route.js` - covered in the original public blog API audit.
- `app/api/contact/route.js` - covered for rate limiting/input handling in the original audit; new build-time Resend finding below.
- `app/api/cron/fetch-news/route.js` - covered in the original cron audit.
- `app/api/cron/generate-blog/route.js` - covered in the original cron/blog generation audit.
- `app/api/geo/route.js` - covered as a public API route in the original audit.
- `app/api/news/[slug]/route.js` - covered in the original public news API audit.
- `app/api/news/route.js` - covered in the original public news API audit.

No additional `app/api/` files were found outside that list.

### Non-API route handlers

- `app/news-sitemap.xml/route.js` is a route handler outside `app/api/`, so it was not part of the API route list above. It queries only news from the last two days (`app/news-sitemap.xml/route.js:6-13`), which may be intentional for a Google News sitemap, but it means older news will never appear in this sitemap even if still public.
- `app/news-sitemap.xml/route.js` manually interpolates XML (`app/news-sitemap.xml/route.js:16-28`). Current slugs appear generated safely in normal flows, but if an admin/manual record contains XML-special characters in `slug`, the route can emit invalid XML. Use XML escaping or a serializer for `loc` values.

## 6. Frontend Routes, Components, and UX

### Broken links / confusing navigation

- Main navbar section links are rendered with `href="/"` and rely on JavaScript click handlers to scroll to sections (`components/Navbar.jsx:12-20`, `components/Navbar.jsx:171-179`, `components/Navbar.jsx:280-288`). With JavaScript disabled, or if hydration fails, Process/Services/About/Contact navigate to the homepage top instead of `/#process`, `/#services`, etc.
- The footer hides an admin route behind the copyright symbol (`components/Footer.jsx:112-114`). This is not an auth bypass by itself, but it is confusing, not discoverable as navigation, and exposes `/admin` through a visually disguised link.
- The footer service list omits the Data Security service even though the service exists in the canonical service data (`components/Footer.jsx:10-19`, `lib/siteData.js:110-115`). The route itself exists through `app/services/[slug]/page.jsx:515-550`, but the footer navigation is incomplete.

### Accessibility issues

- Custom select controls do not expose normal combobox/listbox semantics or keyboard behavior. The blog selector lacks `aria-expanded`, `aria-haspopup`, listbox/menu roles, `aria-selected`, Escape handling, and arrow-key navigation (`components/BlogPageClient.jsx:8-52`). The news selector has the same pattern (`components/NewsPageClient.jsx:16-86`).
- The desktop and mobile country selectors in the navbar are custom menus without complete ARIA state/roles (`components/Navbar.jsx:193-219`, `components/Navbar.jsx:310-344`). Screen reader users may not know the menu state or which region is selected.
- The mobile navbar overlay behaves like a full-screen dialog but does not set `role="dialog"`, `aria-modal`, focus trapping, Escape-to-close behavior, or initial focus management (`components/Navbar.jsx:242-363`). Keyboard focus can remain behind the overlay.
- The email copy icon is an SVG with an `onClick` handler, not a button or link (`components/HomeContent.jsx:476-480`). It has no keyboard activation, role, tab stop, or accessible name.
- `handleCopyEmail` calls `navigator.clipboard.writeText` without awaiting or handling failure (`components/HomeContent.jsx:120-123`). The UI reports success immediately even if clipboard access is blocked or unavailable.

### Performance and loading states

- Blog and news index pages do server-side Prisma queries for JSON-LD data, then render client components that fetch the same public API again after hydration (`app/blog/page.jsx:31-56`, `components/BlogPageClient.jsx:75-90`, `app/news/page.jsx:31-54`, `components/NewsPageClient.jsx:112-125`). This delays visible content behind client fetches and duplicates work that could be passed as server-rendered initial data.
- Dynamic blog cover images use raw `<img>` tags instead of `next/image` and do not specify stable dimensions/loading behavior (`components/BlogPageClient.jsx:231-237`). This bypasses the `next.config.mjs` image optimization allowlist and can cause layout shift or large unoptimized downloads.
- Other raw image uses include testimonial logos and the homepage portrait (`components/HomeContent.jsx:79-83`, `components/HomeContent.jsx:409`). Some are small/static, but the pattern means image sizing/optimization is inconsistent.
- The country context renders `"general"` before geolocation/country readiness (`components/CountryProvider.jsx:223-225`). `HomeContent` computes page content before checking `ready`, while only the hero has a loading skeleton (`components/HomeContent.jsx:115-139`). Non-hero sections can briefly render general content and then re-render country-specific content.
- The homepage intentionally refetches geolocation on `/` instead of using the stored country cache (`components/CountryProvider.jsx:133-143`, `components/CountryProvider.jsx:186-192`). This may be desirable for regional landing behavior, but it adds a network request on every new homepage session.

## 7. SEO, Analytics, and Integrations

### Build / integration correctness

- `npm run build` failed during this follow-up audit. `next build` compiled, then failed while collecting route data because `new Resend(...)` is constructed at module scope without a present API key in `app/api/admin/forgot-password/route.js:6` and `app/api/contact/route.js:4`.
- Because those Resend clients are initialized during module evaluation, a missing `RESEND_API_KEY` can break the whole build instead of only failing the email routes at request time.
- `cloudinary` is present as a dependency and `next.config.mjs` allows `res.cloudinary.com` for `next/image` (`package.json:30`, `next.config.mjs:13-20`), but no application code imports or uses the Cloudinary SDK. The privacy page also names Cloudinary as a processor (`app/privacy/page.jsx:58`). This may be planned, stale, or underused integration surface.
- No payment integration code, payment provider SDKs, checkout routes, or payment environment variables were found in the inspected app/components/lib/utils/services paths.

### Analytics and privacy consistency

- Google Analytics is conditionally loaded in production when `NEXT_PUBLIC_GA_ID` is set (`app/layout.jsx:99-121`).
- The privacy page says the site uses no tracking cookies, no advertising pixels, and no third-party behavioural analytics (`app/privacy/page.jsx:28`), says no third-party analytics data is retained because no such services are used (`app/privacy/page.jsx:46`), and says no tracking cookies are used (`app/privacy/page.jsx:76`). These statements conflict with the GA integration if `NEXT_PUBLIC_GA_ID` is configured in production.

### SEO correctness

- Privacy and Terms metadata hardcode `https://clarivex.net/...` canonical URLs instead of using the shared `siteUrl` constant (`app/privacy/page.jsx:3-8`, `app/terms/page.jsx:3-8`). Other SEO code uses `NEXT_PUBLIC_SITE_URL` through `lib/constants.js`, so these pages can drift on preview/staging or domain changes.
- OpenGraph locale generation creates `en_${countryCode.toUpperCase()}` for all non-general countries (`lib/countryContent.js:240-246`). For the UK route this becomes `en_UK`, but the standard locale is `en_GB`.
- News detail pages render `sourceUrl` from the database as an outbound link (`app/news/[slug]/page.jsx:149-157`). The link correctly uses `rel="noopener noreferrer"`, but there is no protocol/domain validation at render time, so a bad imported/admin-edited URL can become a public phishing or trust issue.

## 8. Follow-up Priorities

### Critical - fix before shipping production changes

- Make the Resend integration build-safe by avoiding module-scope construction that throws when `RESEND_API_KEY` is absent, or enforce the env var in every build environment.
- Resolve the analytics/privacy contradiction before enabling `NEXT_PUBLIC_GA_ID` in production.

### Important

- Replace custom select/menu behavior with accessible controls or add complete ARIA state, keyboard navigation, focus handling, and Escape behavior.
- Server-render or pass initial data into blog/news list pages to avoid duplicate Prisma/API work and client-only initial content.
- Move material dynamic images to `next/image` or otherwise add stable dimensions, lazy/eager choices, and optimization strategy.
- Fix navbar section hrefs to use real hash URLs so navigation works before JavaScript hydration.

### Nice-to-have

- Decide whether Cloudinary is actually used; remove stale dependency/docs/config or wire the image pipeline consistently.
- Add XML escaping/serialization to `app/news-sitemap.xml/route.js`.
- Normalize SEO locale/canonical URL generation through shared helpers.
- Make the footer service links reflect the canonical service list.
