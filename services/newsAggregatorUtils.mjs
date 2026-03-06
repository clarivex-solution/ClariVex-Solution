export const BLOCKED_TOPICS = [
  // Geopolitics / war
  'ceasefire',
  'missile strike',
  'military operation',
  'troops deployed',
  'airstrike',
  'invasion',
  'war in',
  'conflict in',
  'geopolit',
  // Markets/stocks (specific enough to not block legitimate finance news)
  'stock market crash',
  'dow jones',
  'nasdaq composite',
  's&p 500',
  'wall street',
  'share price target',
  'stock price target',
  'bitcoin',
  'ethereum',
  'cryptocurrency',
  'crypto market',
  'nft',
  'oil price',
  'crude oil',
  'gas price',
  'commodity price',
  // Entertainment / unrelated
  'celebrity',
  'arrested for',
  'hollywood',
  'box office',
  'match result',
  'football score',
  'cricket score',
  'sports result',
  // Pure politics
  'election result',
  'polling data',
  'presidential race',
  'campaign trail',
];

export const STRONG_KEYWORDS = [
  'tax return',
  'tax filing',
  'tax compliance',
  'tax regulation',
  'tax planning',
  'tax deduction',
  'tax credit',
  'tax relief',
  'income tax',
  'corporation tax',
  'capital gains tax',
  'inheritance tax',
  'payroll tax',
  'withholding tax',
  'sales tax',
  'property tax',
  'vat return',
  'vat registration',
  'vat compliance',
  'vat filing',
  'gst return',
  'gst compliance',
  'gst registration',
  'irs',
  'hmrc',
  'ato',
  'cra',
  'payroll',
  'paye',
  'national insurance',
  'superannuation',
  'super guarantee',
  'pension contribution',
  'auto-enrolment',
  'bookkeeping',
  'accounts payable',
  'accounts receivable',
  'bank reconciliation',
  'chart of accounts',
  'general ledger',
  'financial statement',
  'balance sheet',
  'profit and loss',
  'cash flow statement',
  'audit',
  'auditor',
  'audit report',
  'ifrs',
  'gaap',
  'accounting standard',
  'making tax digital',
  'mtd',
  'w-2',
  'w-4',
  '1099',
  'p60',
  'p11d',
];

export const WEAK_KEYWORDS = [
  'financial',
  'finance',
  'revenue',
  'fiscal',
  'budget',
  'compliance',
  'regulation',
  'reporting',
];

// Kept for compatibility with existing imports/tests.
export const ALLOWED_KEYWORDS = [...new Set([...STRONG_KEYWORDS, ...WEAK_KEYWORDS])];

export function toSlug(title = '') {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

export function categoriseArticle(title = '') {
  const t = title.toLowerCase();

  if (t.includes('payroll') || t.includes('wage') || t.includes('salary')) {
    return 'Payroll';
  }

  if (
    t.includes('vat') ||
    t.includes('gst') ||
    t.includes('tax') ||
    t.includes('irs') ||
    t.includes('hmrc') ||
    t.includes('ato') ||
    t.includes('cra')
  ) {
    return 'Tax Compliance';
  }

  if (t.includes('audit') || t.includes('ifrs') || t.includes('gaap')) {
    return 'Regulation Update';
  }

  if (t.includes('bookkeeping') || t.includes('accounting') || t.includes('accountant')) {
    return 'Bookkeeping';
  }

  return 'Finance';
}

export function normaliseTitleKey(title = '') {
  return title.trim().toLowerCase();
}

export function normaliseLinkKey(link) {
  if (!link) return '';
  return String(link).trim();
}

export function toDate(value) {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function normaliseRssItem(item, fallbackSource = 'Unknown') {
  if (!item) return null;

  const title = String(item.title || '').trim();
  if (!title) return null;

  const link = normaliseLinkKey(item.link || item.guid || item.id || '');
  const summary = String(item.contentSnippet || item.content || item.summary || item.description || title).trim();
  const source = String(item.creator || item.author || fallbackSource || 'Unknown').trim() || 'Unknown';
  const publishedAt = toDate(item.isoDate || item.pubDate || item.published || item.updated || item.date);

  return {
    title,
    link,
    summary,
    source,
    publishedAt,
  };
}

export function normaliseGNewsItem(item) {
  if (!item) return null;

  const title = String(item.title || '').trim();
  if (!title || title === '[Removed]') return null;

  const link = normaliseLinkKey(item.url || '');
  const summary = String(item.description || item.content || title).trim();
  const source = String(item.source?.name || 'GNEWS').trim() || 'GNEWS';
  const publishedAt = toDate(item.publishedAt);

  return {
    title,
    link,
    summary,
    source,
    publishedAt,
  };
}

export function isFinanceRelevant({ title = '', summary = '', description = '' }) {
  const titleText = String(title || '').toLowerCase();
  const descText = String(summary || description || '').toLowerCase();
  const text = `${titleText} ${descText}`;

  // Block specific irrelevant topics first.
  if (BLOCKED_TOPICS.some((k) => text.includes(k))) return false;

  // Tier 1: strong accounting/tax signal in either title or description.
  if (STRONG_KEYWORDS.some((k) => text.includes(k))) return true;

  // Tier 2: weak terms must appear in both title and description.
  const titleHasWeak = WEAK_KEYWORDS.some((k) => titleText.includes(k));
  const descHasWeak = WEAK_KEYWORDS.some((k) => descText.includes(k));

  return titleHasWeak && descHasWeak;
}

export function dedupeArticles(items) {
  const seenLinks = new Set();
  const seenTitles = new Set();
  const unique = [];
  let duplicateCount = 0;

  for (const item of items) {
    const linkKey = normaliseLinkKey(item?.link);
    const titleKey = normaliseTitleKey(item?.title || '');

    if (!linkKey && !titleKey) {
      duplicateCount++;
      continue;
    }

    if ((linkKey && seenLinks.has(linkKey)) || (titleKey && seenTitles.has(titleKey))) {
      duplicateCount++;
      continue;
    }

    if (linkKey) seenLinks.add(linkKey);
    if (titleKey) seenTitles.add(titleKey);

    unique.push(item);
  }

  return { unique, duplicateCount };
}