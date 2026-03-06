# News Aggregation

## Overview

The automated news pipeline is implemented in `services/newsAggregator.js` and used by `GET /api/cron/fetch-news`.

Flow:
1. Select RSS feeds for the requested country (`US`, `UK`, `AU`, `CA`, or `GENERAL`).
2. Fetch feeds concurrently with a semaphore (max 5 active fetches) and `Promise.allSettled`.
3. Normalize each item to:
   - `title`
   - `link`
   - `summary`
   - `source`
   - `publishedAt` (Date, defaults to `new Date()` when missing/invalid)
4. Deduplicate in-memory by URL and by fuzzy title key (`title.trim().toLowerCase()`).
5. If RSS yields zero items, call GNEWS fallback (`https://gnews.io/api/v4/search`) using `GNEWS_API_KEY`.
6. Optionally apply `since` filtering so only items with `publishedAt > since` are eligible for save.
7. Skip blocked URLs, skip existing records (by URL or slug), then insert to `prisma.newsArticle` with:
   - `sourceType: 'automated'`
   - `country`
8. Return summary:
   - `fetched`
   - `saved`
   - `skipped`
   - `sourceCounts`

## Source Configuration

RSS feeds are configured in `services/newsAggregator.js` under `RSS_FEEDS`.

Current groups:
- `US`: IRS, CNBC, NYTimes Business
- `UK`: HMRC updates, BBC Business, Guardian Business
- `AU`: ABC Business, SMH Business, The Australian Markets
- `CA`: CBC Business, Financial Post, Bank of Canada
- `GENERAL`: Reuters Business, MarketWatch, OECD Newsroom

GNEWS fallback queries are configured in `GNEWS_QUERIES` in the same file.

## Scheduler (Vercel Cron)

`vercel.json` configures a 5-minute schedule:

```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-news?country=GENERAL",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

For production, ensure `CRON_SECRET` is set in your hosting environment. Vercel Cron will call the route with `Authorization: Bearer ${CRON_SECRET}`.

## Cron Route Parameters

Route: `GET /api/cron/fetch-news`

Query params:
- `country` (optional): `US`, `UK`, `AU`, `CA`, `GENERAL` (default: `GENERAL`)
- `since` (optional): ISO-8601 datetime, e.g. `2026-03-06T00:00:00Z`

Examples:
- `/api/cron/fetch-news?country=GENERAL`
- `/api/cron/fetch-news?country=GENERAL&since=2026-03-06T00:00:00Z`

## Locking

To prevent concurrent cron runs inserting duplicates:
- In-process lock: per-country in-memory guard.
- Cross-instance lock: Postgres advisory lock (`pg_try_advisory_lock`) keyed by country.

If lock acquisition fails, the cron route returns a `409` with a lock summary.

## How to Add a New RSS Feed

1. Open `services/newsAggregator.js`.
2. Add a feed object to the relevant country array in `RSS_FEEDS`:

```js
{ name: 'Source Name', url: 'https://example.com/feed.xml' }
```

3. Keep source names short and stable (used in `sourceCounts`).
4. Validate the feed returns RSS/Atom XML and includes title/link/date fields.
5. Trigger fetch from admin (`POST /api/admin/trigger-news-fetch`) and verify summary counts.

## Notes

- All network calls use `fetch(..., { cache: 'no-store' })`.
- Unit tests for dedupe and RSS normalization are in `services/__tests__/newsAggregatorUtils.test.mjs`.
