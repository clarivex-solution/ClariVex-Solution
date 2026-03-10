import { Prisma } from '@prisma/client';
import Parser from 'rss-parser';

import { prisma } from '@/lib/prisma';
import {
  categoriseArticle,
  dedupeArticles,
  isFinanceRelevant,
  normaliseGNewsItem,
  normaliseLinkKey,
  normaliseRssItem,
  toSlug,
} from './newsAggregatorUtils.mjs';

const FETCH_CONCURRENCY = 5;
const LOCK_NAMESPACE = 8312457;
const parser = new Parser();
const memoryLocks = new Set();

const RSS_FEEDS = {
  US: [
    { name: 'CPA Journal', url: 'https://www.cpajournal.com/feed/' },
    { name: 'Tax Foundation', url: 'https://taxfoundation.org/feed/' },
  ],
  UK: [
    { name: 'HMRC Updates', url: 'https://www.gov.uk/government/organisations/hm-revenue-customs.atom' },
    { name: 'GOV.UK Tax', url: 'https://www.gov.uk/search/news-and-communications.atom?keywords=tax&organisations%5B%5D=hm-revenue-customs' },
  ],
  AU: [
    { name: 'SmartCompany AU', url: 'https://www.smartcompany.com.au/feed/' },
  ],
  CA: [],
  GENERAL: [],
};

const GNEWS_QUERIES = {
  US: [
    'US stock market S&P 500 investor outlook',
    'Federal Reserve interest rate decision',
    'US banking sector earnings results',
    'gold price forecast United States',
    'cryptocurrency Bitcoin regulation US',
    'IRS tax filing deadline compliance',
    'US payroll small business accounting',
    'crude oil price US energy market',
    'US dollar exchange rate forecast',
    'inflation CPI Federal Reserve update',
  ],
  UK: [
    'UK stock market FTSE 100 update',
    'Bank of England interest rate decision',
    'UK banking Barclays HSBC results',
    'gold price GBP UK investor',
    'cryptocurrency regulation UK FCA',
    'HMRC tax return self assessment deadline',
    'UK payroll PAYE national insurance update',
    'pound sterling exchange rate forecast',
    'UK inflation CPI Bank of England',
    'UK economy GDP growth outlook',
  ],
  AU: [
    'ASX 200 Australian stock market update',
    'Reserve Bank of Australia interest rate',
    'Australian banking ANZ Westpac results',
    'gold price AUD Australia mining',
    'cryptocurrency regulation Australia ASIC',
    'ATO tax return lodgement deadline',
    'superannuation guarantee payroll Australia',
    'Australian dollar exchange rate forecast',
    'Australia inflation CPI RBA update',
    'crude oil energy market Australia',
  ],
  CA: [
    'TSX Toronto stock market update',
    'Bank of Canada interest rate decision',
    'Canadian banking TD RBC results',
    'gold price CAD Canada mining',
    'cryptocurrency Bitcoin Canada regulation',
    'CRA tax filing deadline Canada',
    'Canada payroll CPP EI compliance',
    'Canadian dollar exchange rate forecast',
    'Canada inflation CPI Bank of Canada',
    'crude oil Alberta energy Canada',
  ],
  GENERAL: [
    'global stock markets outlook investors',
    'gold price forecast global markets',
    'cryptocurrency Bitcoin Ethereum market update',
    'central banks interest rates global economy',
    'crude oil price OPEC forecast',
    'IFRS accounting standards global update',
    'global banking sector earnings',
    'inflation global economy outlook',
    'forex currency exchange rates forecast',
    'fintech digital banking payments trends',
  ],
};

function normaliseCountry(country) {
  const normalized = String(country || 'GENERAL').trim().toUpperCase();
  return RSS_FEEDS[normalized] ? normalized : 'GENERAL';
}

function normaliseSince(since) {
  if (!since) return null;
  const date = since instanceof Date ? since : new Date(String(since));
  return Number.isNaN(date.getTime()) ? null : date;
}

function getFeeds(country) {
  if (country === 'GENERAL') {
    return RSS_FEEDS.GENERAL || [];
  }
  return RSS_FEEDS[country] || [];
}

function sourceCountIncrement(sourceCounts, sourceName, amount = 1) {
  sourceCounts[sourceName] = (sourceCounts[sourceName] || 0) + amount;
}

function mergeSourceCounts(target, incoming) {
  for (const [name, count] of Object.entries(incoming)) {
    sourceCountIncrement(target, name, count);
  }
}

function createSemaphore(limit) {
  let active = 0;
  const queue = [];

  const acquire = () =>
    new Promise((resolve) => {
      if (active < limit) {
        active += 1;
        resolve();
        return;
      }
      queue.push(resolve);
    });

  const release = () => {
    active -= 1;
    if (queue.length > 0) {
      active += 1;
      const next = queue.shift();
      next();
    }
  };

  return async (task) => {
    await acquire();
    try {
      return await task();
    } finally {
      release();
    }
  };
}

function advisoryLockId(country) {
  let hash = 0;
  for (const char of country) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return LOCK_NAMESPACE + hash;
}

function asBool(value) {
  return value === true || value === 't' || value === 1 || value === '1';
}

async function acquireLock(country) {
  if (memoryLocks.has(country)) {
    return { acquired: false, release: async () => { } };
  }

  memoryLocks.add(country);
  let dbLockId;

  try {
    dbLockId = advisoryLockId(country);
    const rows = await prisma.$queryRaw`SELECT pg_try_advisory_lock(${dbLockId}) AS acquired`;
    const row = Array.isArray(rows) ? rows[0] : null;

    if (!row || !asBool(row.acquired)) {
      memoryLocks.delete(country);
      console.log(`[newsAggregator] Lock not acquired for ${country} - another process running`);
      return { acquired: false, release: async () => { } };
    }

    return {
      acquired: true,
      release: async () => {
        try {
          await prisma.$queryRaw`SELECT pg_advisory_unlock(${dbLockId})`;
        } catch (unlockErr) {
          console.error('[newsAggregator] Failed to release advisory lock:', unlockErr);
        } finally {
          memoryLocks.delete(country);
        }
      },
    };
  } catch (error) {
    memoryLocks.delete(country);
    // Log but do not throw - fall back to memory-only lock.
    console.error('[newsAggregator] Advisory lock error (falling back to memory lock):', error.message);
    memoryLocks.add(country);
    return {
      acquired: true,
      release: async () => {
        memoryLocks.delete(country);
      },
    };
  }
}

async function fetchRssSource(feed, maxPerSource) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(feed.url, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`RSS fetch failed (${response.status}) for ${feed.url}`);
    }

    const xml = await response.text();
    const parsed = await parser.parseString(xml);
    const rawItems = Array.isArray(parsed.items) ? parsed.items.slice(0, maxPerSource) : [];

    return rawItems
      .map((item) => normaliseRssItem(item, feed.name))
      .filter(Boolean)
      .map((item) => ({ ...item, source: item.source || feed.name }));
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error(`RSS timeout (8s) for ${feed.url}`);
    }
    throw err;
  }
}

async function fetchRssArticles(country, maxPerSource) {
  const feeds = getFeeds(country);
  const sourceCounts = {};
  const runWithSemaphore = createSemaphore(FETCH_CONCURRENCY);

  const tasks = feeds.map((feed) =>
    runWithSemaphore(async () => {
      const items = await fetchRssSource(feed, maxPerSource);
      sourceCountIncrement(sourceCounts, feed.name, items.length);
      return items;
    })
  );

  const settled = await Promise.allSettled(tasks);
  const articles = [];

  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
      return;
    }

    console.error(`RSS source failed: ${feeds[index].name}`, result.reason);
  });

  return { articles, sourceCounts };
}

async function fetchGnewsFallback(country, maxPerSource) {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return { articles: [], sourceCounts: {} };
  }

  const queries = GNEWS_QUERIES[country] || GNEWS_QUERIES.GENERAL;
  const lang = 'en';
  const gnewsMax = Math.max(1, Math.min(10, maxPerSource));
  const sourceCounts = {};
  const runWithSemaphore = createSemaphore(FETCH_CONCURRENCY);

  const tasks = queries.map((query) =>
    runWithSemaphore(async () => {
      const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&max=${gnewsMax}&apikey=${apiKey}`;
      const response = await fetch(apiUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`GNEWS fetch failed (${response.status}) for query: ${query}`);
      }

      const data = await response.json();
      const rawItems = Array.isArray(data?.articles) ? data.articles : [];
      const normalized = rawItems.map((item) => normaliseGNewsItem(item)).filter(Boolean);

      for (const item of normalized) {
        sourceCountIncrement(sourceCounts, item.source || 'GNEWS', 1);
      }

      return normalized;
    })
  );

  const settled = await Promise.allSettled(tasks);
  const articles = [];

  settled.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
      return;
    }

    console.error(`GNEWS query failed: ${queries[index]}`, result.reason);
  });

  return { articles, sourceCounts };
}

async function existingArticleSets(candidates) {
  const links = candidates.map((item) => normaliseLinkKey(item.link)).filter(Boolean);
  const slugs = candidates.map((item) => item.slug).filter(Boolean);
  const uniqueLinks = [...new Set(links)];
  const uniqueSlugs = [...new Set(slugs)];

  const whereOr = [];
  if (uniqueLinks.length > 0) whereOr.push({ url: { in: uniqueLinks } });
  if (uniqueSlugs.length > 0) whereOr.push({ slug: { in: uniqueSlugs } });

  const [existingArticles, blockedUrls] = await Promise.all([
    whereOr.length > 0
      ? prisma.newsArticle.findMany({
        where: { OR: whereOr },
        select: { url: true, slug: true },
      })
      : Promise.resolve([]),
    uniqueLinks.length > 0
      ? prisma.blockedUrl.findMany({ where: { url: { in: uniqueLinks } }, select: { url: true } })
      : Promise.resolve([]),
  ]);

  const existingUrlSet = new Set(existingArticles.map((item) => normaliseLinkKey(item.url)).filter(Boolean));
  const existingSlugSet = new Set(existingArticles.map((item) => item.slug).filter(Boolean));
  const blockedUrlSet = new Set(blockedUrls.map((item) => normaliseLinkKey(item.url)).filter(Boolean));

  return { existingUrlSet, existingSlugSet, blockedUrlSet };
}

export async function fetchAndSaveNews({ country, maxPerSource = 20, since } = {}) {
  const normalizedCountry = normaliseCountry(country);
  const sinceDate = normaliseSince(since);
  const lock = await acquireLock(normalizedCountry);

  if (!lock.acquired) {
    return {
      fetched: 0,
      saved: 0,
      skipped: 0,
      sourceCounts: {},
      locked: true,
      country: normalizedCountry,
      since: sinceDate ? sinceDate.toISOString() : null,
    };
  }

  try {
    let fetched = 0;
    let saved = 0;
    let skipped = 0;
    const sourceCounts = {};

    const rssResult = await fetchRssArticles(normalizedCountry, maxPerSource);
    mergeSourceCounts(sourceCounts, rssResult.sourceCounts);

    let allFetched = rssResult.articles;

    // Trigger GNews if RSS returned nothing OR very few articles (under 3)
    if (allFetched.length < 5) {
      const gnewsResult = await fetchGnewsFallback(normalizedCountry, maxPerSource);
      mergeSourceCounts(sourceCounts, gnewsResult.sourceCounts);
      allFetched = [...allFetched, ...gnewsResult.articles];
    }

    fetched = allFetched.length;

    const deduped = dedupeArticles(allFetched);
    skipped += deduped.duplicateCount;

    const candidates = [];

    for (const item of deduped.unique) {

      if (sinceDate && item.publishedAt <= sinceDate) {
        skipped += 1;
        continue;
      }

      if (!isFinanceRelevant(item)) {
        skipped += 1;
        continue;
      }

      const slug = toSlug(item.title);
      if (!slug) {
        skipped += 1;
        continue;
      }

      candidates.push({
        ...item,
        slug,
        category: categoriseArticle(item.title),
      });
    }

    const { existingUrlSet, existingSlugSet, blockedUrlSet } = await existingArticleSets(candidates);

    for (const article of candidates) {
      const urlKey = normaliseLinkKey(article.link);

      if (urlKey && blockedUrlSet.has(urlKey)) {
        skipped += 1;
        continue;
      }

      if ((urlKey && existingUrlSet.has(urlKey)) || existingSlugSet.has(article.slug)) {
        skipped += 1;
        continue;
      }

      try {
        await prisma.newsArticle.create({
          data: {
            title: article.title,
            slug: article.slug,
            summary: article.summary || article.title,
            url: urlKey || null,
            source: article.source || 'Unknown',
            category: article.category,
            country: normalizedCountry,
            sourceType: 'automated',
            publishedAt: article.publishedAt,
          },
        });

        saved += 1;
        if (urlKey) existingUrlSet.add(urlKey);
        existingSlugSet.add(article.slug);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          skipped += 1;
          continue;
        }
        throw error;
      }
    }

    return {
      fetched,
      saved,
      skipped,
      sourceCounts,
      country: normalizedCountry,
      since: sinceDate ? sinceDate.toISOString() : null,
    };
  } finally {
    await lock.release();
  }
}
