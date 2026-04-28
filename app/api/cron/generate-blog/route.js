export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// ─── Topic Pool ───────────────────────────────────────────────────────────────
const TOPICS = [
  // Bookkeeping
  { topic: 'How to maintain clean books for a small business', category: 'Bookkeeping' },
  { topic: 'Common bookkeeping mistakes and how to avoid them', category: 'Bookkeeping' },
  { topic: 'Chart of accounts setup best practices', category: 'Bookkeeping' },
  { topic: 'Monthly close checklist for small businesses', category: 'Bookkeeping' },

  // Reconciliation
  { topic: 'Bank reconciliation best practices', category: 'Reconciliation' },
  { topic: 'How to handle unreconciled transactions', category: 'Reconciliation' },
  { topic: 'Credit card reconciliation guide for businesses', category: 'Reconciliation' },

  // AP & AR
  { topic: 'How to reduce accounts receivable days outstanding', category: 'AP & AR' },
  { topic: 'Accounts payable workflow to prevent fraud', category: 'AP & AR' },
  { topic: 'Invoice management best practices', category: 'AP & AR' },
  { topic: 'How to handle disputed invoices professionally', category: 'AP & AR' },

  // Payroll
  { topic: 'Payroll compliance checklist for growing businesses', category: 'Payroll' },
  { topic: 'Employee vs contractor classification guide', category: 'Payroll' },
  { topic: 'Year-end payroll preparation guide', category: 'Payroll' },

  // Tax Planning
  { topic: 'Tax planning strategies for small businesses', category: 'Tax Planning' },
  { topic: 'How to prepare for a tax audit', category: 'Tax Planning' },
  { topic: 'Common tax deductions businesses overlook', category: 'Tax Planning' },
  { topic: 'Quarterly tax planning checklist', category: 'Tax Planning' },

  // Advisory
  { topic: 'How to read a profit and loss statement', category: 'Advisory' },
  { topic: 'Cash flow forecasting for small businesses', category: 'Advisory' },
  { topic: 'Key financial KPIs every business owner should track', category: 'Advisory' },
  { topic: 'When should a business hire an outsourced CFO', category: 'Advisory' },

  // Audit
  { topic: 'How to prepare your business for an external audit', category: 'Audit' },
  { topic: 'Internal audit checklist for SMEs', category: 'Audit' },

  // Data Security
  { topic: 'Financial data security best practices for businesses', category: 'Data Security' },
  { topic: 'How to protect sensitive financial information', category: 'Data Security' },
];

// ─── Country Rotation ─────────────────────────────────────────────────────────
// Runs twice a week (Tue + Fri). Rotates: General, US, General, UK, General, AU, General, CA
const COUNTRY_ROTATION = ['General', 'US', 'General', 'UK', 'General', 'AU', 'General', 'CA'];

function getCountryForRun() {
  // Use ISO week number to determine rotation index
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  // Tuesday = run 0, Friday = run 1 each week
  const dayOfWeek = now.getDay(); // 2=Tue, 5=Fri
  const runIndex = (weekNumber * 2) + (dayOfWeek === 5 ? 1 : 0);
  return COUNTRY_ROTATION[runIndex % COUNTRY_ROTATION.length];
}

function getTopicForRun() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  const dayOfWeek = now.getDay();
  const runIndex = (weekNumber * 2) + (dayOfWeek === 5 ? 1 : 0);
  return TOPICS[runIndex % TOPICS.length];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function GET(request) {
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const authHeader = request.headers.get('authorization');

  if (!isVercelCron && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not set' }, { status: 500 });
  }

  try {
    const country = getCountryForRun();
    const { topic, category } = getTopicForRun();

    // Build country-specific context for the prompt
    const countryContext = {
      US: 'targeting US businesses, referencing IRS, QuickBooks, GAAP where relevant',
      UK: 'targeting UK businesses, referencing HMRC, Xero, Making Tax Digital, VAT where relevant',
      AU: 'targeting Australian businesses, referencing ATO, MYOB, BAS, GST where relevant',
      CA: 'targeting Canadian businesses, referencing CRA, Sage, HST/GST where relevant',
      General: 'targeting international businesses across US, UK, Australia, and Canada',
    };

    const prompt = `You are a senior finance and accounting writer for ClariVex Solution, an elite outsourced accounting firm serving businesses across US, UK, Australia, and Canada.

Write a professional blog post on the topic: "${topic}"
${country !== 'General' ? `This post is ${countryContext[country]}.` : `This post is ${countryContext.General}.`}

The post should:
- Be practical and actionable, not generic
- Be written for business owners and finance teams
- Reflect ClariVex's expertise (15+ years, 280+ clients, outsourced accounting)
- Be 600-900 words of actual content
- Use HTML formatting with <h2> and <p> tags only (no h1, no h3, no ul/li, no bold)
- Have 4-5 sections with h2 headings

Respond ONLY with a valid JSON object. No markdown, no backticks, no explanation. Just the JSON:
{
  "title": "blog post title here (50-70 chars)",
  "slug": "url-friendly-slug-here",
  "excerpt": "one sentence summary (120-150 chars)",
  "content": "<h2>Section One</h2><p>Content here...</p><h2>Section Two</h2><p>Content here...</p>"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic API error: ${err}`);
    }

    const data = await response.json();
    const rawText = data.content?.[0]?.text || '';

    // Clean and parse JSON
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const generated = JSON.parse(cleaned);

    // Validate required fields
    if (!generated.title || !generated.content || !generated.excerpt) {
      throw new Error('Generated post missing required fields');
    }

    // Ensure unique slug
    let slug = generated.slug || slugify(generated.title);
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Save to DB
    const post = await prisma.blog.create({
      data: {
        title: generated.title,
        slug,
        excerpt: generated.excerpt,
        content: generated.content,
        category,
        country,
        status: 'published',
        publishedAt: new Date(),
      },
    });

    console.log(`[generate-blog] Published: "${post.title}" (${country})`);

    return NextResponse.json({
      status: 'ok',
      published: true,
      post: { id: post.id, title: post.title, slug: post.slug, country, category },
    });

  } catch (error) {
    console.error('[generate-blog] Error:', error);
    return NextResponse.json(
      { error: 'Blog generation failed', detail: error.message },
      { status: 500 }
    );
  }
}
