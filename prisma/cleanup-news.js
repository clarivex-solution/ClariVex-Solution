import { createRequire, registerHooks } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (!specifier.startsWith('@/')) {
      return nextResolve(specifier, context);
    }

    const basePath = path.resolve(process.cwd(), specifier.slice(2));
    const candidates = [
      basePath,
      `${basePath}.js`,
      `${basePath}.mjs`,
      path.join(basePath, 'index.js'),
      path.join(basePath, 'index.mjs'),
    ];
    const resolvedPath = candidates.find((candidate) => fs.existsSync(candidate)) || `${basePath}.js`;

    return nextResolve(pathToFileURL(resolvedPath).href, context);
  },
});

const COUNTRIES = ['US', 'UK', 'AU', 'CA', 'GENERAL'];

async function main() {
  const [{ fetchAndSaveNews }, { prisma }] = await Promise.all([
    import('../services/newsAggregator.js'),
    import('../lib/prisma.js'),
  ]);

  try {
    const deleted = await prisma.newsArticle.deleteMany({
      where: { sourceType: 'automated' },
    });
    console.log(`Deleted ${deleted.count} automated articles`);

    for (const country of COUNTRIES) {
      const result = await fetchAndSaveNews({ country });
      console.log(`[${country}]`, result);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Cleanup failed:', error);
  process.exitCode = 1;
});
