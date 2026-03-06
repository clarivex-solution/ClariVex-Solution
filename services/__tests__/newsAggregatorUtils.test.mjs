import assert from 'node:assert/strict';
import test from 'node:test';

import Parser from 'rss-parser';

import { dedupeArticles, normaliseRssItem } from '../newsAggregatorUtils.mjs';

test('dedupeArticles removes duplicates by URL and fuzzy title', () => {
  const articles = [
    {
      title: 'Tax filing deadline update',
      link: 'https://example.com/a',
      summary: 'A',
      source: 'Feed A',
      publishedAt: new Date('2026-03-01T00:00:00.000Z'),
    },
    {
      title: 'Completely different title',
      link: 'https://example.com/a',
      summary: 'B',
      source: 'Feed B',
      publishedAt: new Date('2026-03-01T00:00:00.000Z'),
    },
    {
      title: '  TAX filing deadline update  ',
      link: 'https://example.com/c',
      summary: 'C',
      source: 'Feed C',
      publishedAt: new Date('2026-03-01T00:00:00.000Z'),
    },
    {
      title: 'Payroll compliance reminder',
      link: 'https://example.com/d',
      summary: 'D',
      source: 'Feed D',
      publishedAt: new Date('2026-03-01T00:00:00.000Z'),
    },
  ];

  const result = dedupeArticles(articles);

  assert.equal(result.unique.length, 2);
  assert.equal(result.duplicateCount, 2);
  assert.deepEqual(
    result.unique.map((item) => item.link),
    ['https://example.com/a', 'https://example.com/d']
  );
});

test('normaliseRssItem maps parsed RSS fields into expected shape', async () => {
  const xml = `
    <rss version="2.0">
      <channel>
        <title>Example Feed</title>
        <item>
          <title>Payroll tax update</title>
          <link>https://example.com/article-1</link>
          <description>Important payroll update</description>
          <pubDate>Fri, 06 Mar 2026 09:00:00 GMT</pubDate>
        </item>
      </channel>
    </rss>
  `;

  const parser = new Parser();
  const parsed = await parser.parseString(xml);

  const normalised = parsed.items.map((item) => normaliseRssItem(item, 'Example Feed')).filter(Boolean);

  assert.equal(normalised.length, 1);
  assert.equal(normalised[0].title, 'Payroll tax update');
  assert.equal(normalised[0].link, 'https://example.com/article-1');
  assert.equal(normalised[0].summary, 'Important payroll update');
  assert.equal(normalised[0].source, 'Example Feed');
  assert.equal(normalised[0].publishedAt instanceof Date, true);
  assert.equal(Number.isNaN(normalised[0].publishedAt.getTime()), false);
});
