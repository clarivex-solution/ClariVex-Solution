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
  // Entertainment / celebrity
  'celebrity',
  'hollywood',
  'box office',
  'music awards',
  'movie premiere',
  'reality show',
  // Sports
  'match result',
  'football score',
  'cricket score',
  'sports result',
  'tournament final',
  // Food / lifestyle / beauty / gossip
  'recipe',
  'restaurant review',
  'diet trend',
  'lifestyle tips',
  'fashion week',
  'beauty routine',
  'makeup trends',
  'gossip',
  // Politics unrelated to finance
  'election result',
  'polling data',
  'presidential race',
  'campaign trail',
  'party manifesto',
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
  // Markets and money topics
  'stock market',
  's&p 500',
  'ftse',
  'asx',
  'tsx',
  'nasdaq',
  'dow jones',
  'wall street',
  'equities',
  'investor',
  'interest rate',
  'federal reserve',
  'bank of england',
  'bank of canada',
  'reserve bank of australia',
  'central bank',
  'monetary policy',
  'banking sector',
  'bitcoin',
  'ethereum',
  'crypto',
  'cryptocurrency',
  'blockchain',
  'gold',
  'silver',
  'crude oil',
  'natural gas',
  'commodity',
  'opec',
  'exchange rate',
  'forex',
  'currency',
  'inflation',
  'cpi',
  'gdp',
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

const TRUSTED_SOURCES = [
  'irs newsroom',
  'irs tax tips',
  'hmrc',
  'ato newsroom',
  'cra newsroom',
  'aicpa journal',
  'accounting today',
  'accountingweb',
  'taxation magazine',
  'icaew',
  'journal of accountancy',
  'cpa journal',
  'ifac',
  'iasb ifrs',
];

// Kept for compatibility with existing imports/tests.
export const ALLOWED_KEYWORDS = [...new Set([...STRONG_KEYWORDS, ...WEAK_KEYWORDS])];

export const CATEGORY_KEYWORDS = {
  Payroll: [
    'payroll',
    'wage',
    'salary',
    'paye',
    'national insurance',
    'superannuation',
    'super guarantee',
    'pension',
    'auto-enrolment',
    'w-2',
    'w-4',
    'p60',
    'p11d',
  ],
  Bookkeeping: [
    'bookkeeping',
    'reconcili',
    'accounts payable',
    'accounts receivable',
    'general ledger',
    'chart of accounts',
    'invoice',
    'expense',
    'xero',
    'quickbooks',
    'sage',
    'myob',
  ],
  'Markets & Investing': [
    'stock market', 's&p 500', 'ftse', 'asx', 'tsx', 'nasdaq', 'shares',
    'equities', 'portfolio', 'investor', 'dow jones', 'wall street', 'index',
  ],
  'Banking & Finance': [
    'bank', 'banking', 'interest rate', 'federal reserve', 'bank of england',
    'rba', 'boc', 'central bank', 'monetary policy', 'fed', 'lending',
  ],
  Cryptocurrency: [
    'bitcoin', 'ethereum', 'crypto', 'blockchain', 'digital asset',
    'defi', 'stablecoin', 'altcoin', 'web3', 'nft',
  ],
  Commodities: [
    'gold', 'silver', 'crude oil', 'commodity', 'opec', 'energy',
    'mining', 'natural gas', 'brent', 'wti',
  ],
  'Currency & Forex': [
    'exchange rate', 'forex', 'currency', 'dollar', 'pound sterling',
    'euro', 'yen', 'aud', 'cad', 'gbp',
  ],
  'Regulation Update': [
    'audit',
    'ifrs',
    'gaap',
    'accounting standard',
    'financial reporting standard',
    'regulation',
    'compliance update',
    'companies house',
    'asic',
    'legislation',
    'new law',
    'new rule',
    'guidance',
    'consultation',
  ],
  'Tax Compliance': [
    'tax',
    'irs',
    'hmrc',
    'ato',
    'cra',
    'vat',
    'gst',
    'hst',
    'bas',
    '1099',
    'mtd',
    'making tax digital',
    'self assessment',
    'corporation',
    'fiscal',
    'deduction',
    'withholding',
  ],
};

const CATEGORY_PRIORITY = [
  'Payroll',
  'Bookkeeping',
  'Markets & Investing',
  'Banking & Finance',
  'Cryptocurrency',
  'Commodities',
  'Currency & Forex',
  'Regulation Update',
  'Tax Compliance',
];

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

  for (const category of CATEGORY_PRIORITY) {
    const keywords = CATEGORY_KEYWORDS[category] || [];
    if (keywords.some((keyword) => t.includes(keyword))) {
      return category;
    }
  }

  // Default - Tax Compliance (most accounting news is tax-adjacent)
  return 'Tax Compliance';
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

export function isFinanceRelevant({ title = '', summary = '', description = '', source = '' }) {
  const titleText = String(title || '').toLowerCase();
  const descText = String(summary || description || '').toLowerCase();
  const text = `${titleText} ${descText}`;
  const sourceLower = String(source || '').toLowerCase();

  // Always block irrelevant topics even from trusted sources
  if (BLOCKED_TOPICS.some((k) => text.includes(k))) return false;

  // Trusted accounting/tax sources - accept without keyword check
  if (TRUSTED_SOURCES.some((s) => sourceLower.includes(s))) return true;

  // Tier 1: strong accounting/tax signal in title or description
  if (STRONG_KEYWORDS.some((k) => text.includes(k))) return true;

  // Tier 2: weak terms must appear in both title and description
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
