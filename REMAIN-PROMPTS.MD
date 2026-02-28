## PROMPT 10 (MEANT TO EXECUTE FIRST BEFORE 8 AND 9)

Next.js App Router, JavaScript. Prisma set up. lib/prisma.js exports prisma.
lib/blogData.js exports blogPosts array. lib/newsData.js exports newsPosts array.

Create prisma/seed.js:
- Import prisma from '../lib/prisma.js'
- Import blogPosts from '../lib/blogData.js'
- Import newsPosts from '../lib/newsData.js'
- For each blog: prisma.blog.upsert({where:{slug}, update:{}, create:{...blog fields, status:'published', content:'<p>This post was imported from static data. Edit in the admin panel to add full content.</p>', coverImage:null, publishedAt: new Date(blog.isoDate)}})
- For each news: prisma.newsArticle.upsert({where:{slug}, update:{}, create:{...news fields, sourceType:'manual', url:null, publishedAt: new Date(news.isoDate)}})
- Wrap in async main() with try/catch, call prisma.$disconnect() in finally
- Console.log progress

Add to package.json scripts: "seed": "node prisma/seed.js"

Then run: node prisma/seed.js


## PROMPT 8

Next.js App Router, JavaScript. lib/prisma.js exists. Blog model in DB.
Current site: components/BlogPageClient.jsx uses static data from lib/blogData.js. app/blog/[slug]/page.jsx uses static blogPosts array.
Keep ALL existing UI exactly as-is. Only change the data source.

Make these changes:

FILE 1: Create app/api/blog/route.js (PUBLIC, no auth)
GET: fetch all blogs where status='published' orderBy publishedAt desc
Return array with: id,title,slug,excerpt,coverImage,category,country,publishedAt

FILE 2: Create app/api/blog/[slug]/route.js (PUBLIC)
GET: prisma.blog.findFirst({where:{slug, status:'published'}}) → return full blog or 404 JSON

FILE 3: Update components/BlogPageClient.jsx
- Remove: import { blogPosts } from '@/lib/blogData'
- Add state: const [blogPosts, setBlogPosts] = useState([]) and const [loading, setLoading] = useState(true)
- Add useEffect: fetch('/api/blog') → setBlogPosts(data) → setLoading(false)
- Add loading state: if loading, show a simple skeleton (3 grey rounded boxes in the grid area)
- Keep ALL filter logic (activeCategory, activeCountryFilter, filteredPosts) exactly unchanged — it already works with the blogPosts array
- Keep ALL JSX/UI exactly unchanged

FILE 4: Update app/blog/[slug]/page.jsx
- Add at top: export const dynamic = 'force-dynamic'
- Remove generateStaticParams function entirely
- Replace static blogPosts.find() with:
  import { prisma } from '@/lib/prisma'
  const post = await prisma.blog.findFirst({where:{slug, status:'published'}})
- Update generateMetadata to use same prisma fetch
- In the article content area, replace the hardcoded placeholder paragraphs with:
  <div className="mx-auto mt-8 max-w-3xl prose prose-invert prose-headings:font-[family-name:var(--font-playfair)] prose-headings:text-white prose-p:text-[#8892a4] prose-p:leading-relaxed max-w-none" dangerouslySetInnerHTML={{__html: post.content}} />
- Keep all other UI (breadcrumbs, sidebar, related posts, metadata) exactly as-is
- For related posts: fetch from prisma instead of blogPosts array: prisma.blog.findMany({where:{status:'published', NOT:{slug}}, take:3})

FILE 5: Update app/sitemap.jsx
- Import prisma
- Fetch published blogs: prisma.blog.findMany({where:{status:'published'}, select:{slug:true, updatedAt:true}})
- Add them to sitemap array as: {url: siteUrl+'/blog/'+blog.slug, lastModified: blog.updatedAt}
- Keep all existing static routes unchanged

## PROMPT 9

Next.js App Router, JavaScript. lib/prisma.js exists. NewsArticle model in DB.
Current: components/NewsPageClient.jsx uses static lib/newsData.js. app/news/[slug]/page.jsx uses static newsPosts.
Keep ALL existing UI exactly as-is. Only change data source.

FILE 1: Create app/api/news/route.js (PUBLIC)
GET: fetch all newsArticles orderBy publishedAt desc → return array

FILE 2: Create app/api/news/[slug]/route.js (PUBLIC)
GET: prisma.newsArticle.findUnique({where:{slug}}) → return or 404 JSON

FILE 3: Update components/NewsPageClient.jsx
- Remove static import from lib/newsData
- Add useState for newsPosts=[] and loading=true
- useEffect: fetch('/api/news') → setNewsPosts(data) → setLoading(false)
- Show loading skeleton while loading
- Keep all filter logic and UI unchanged

FILE 4: Update app/news/[slug]/page.jsx
- Add: export const dynamic = 'force-dynamic'
- Remove generateStaticParams
- Fetch: prisma.newsArticle.findUnique({where:{slug}})
- Keep existing UI but: if post.url exists (automated news), add a prominent button below the summary:
  <a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5a688e] px-6 py-2.5 text-sm text-white hover:bg-[#6aa595] transition-colors">Read Full Article →</a>
- Update generateMetadata to use prisma fetch

FILE 5: Update app/sitemap.jsx
- Also fetch newsArticles: prisma.newsArticle.findMany({select:{slug:true, publishedAt:true}})
- Add to sitemap: {url: siteUrl+'/news/'+article.slug, lastModified: article.publishedAt}
