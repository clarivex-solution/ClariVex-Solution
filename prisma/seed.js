import { blogPosts } from '../lib/blogData.js';
import { newsPosts } from '../lib/newsData.js';
import { prisma } from '../lib/prisma.js';

async function main() {
  try {
    console.log('Starting seeding process...');

    for (const blog of blogPosts) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: {},
        create: {
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: '<p>This post was imported from static data. Edit in the admin panel to add full content.</p>',
          coverImage: null,
          category: blog.category,
          country: blog.country,
          status: 'published',
          publishedAt: new Date(blog.isoDate)
        }
      });
      console.log(`Upserted blog: ${blog.title}`);
    }

    for (const news of newsPosts) {
      await prisma.newsArticle.upsert({
        where: { slug: news.slug },
        update: {},
        create: {
          title: news.title,
          slug: news.slug,
          summary: news.summary,
          url: null,
          source: news.source,
          category: news.category,
          country: news.country,
          sourceType: 'manual',
          publishedAt: new Date(news.isoDate)
        }
      });
      console.log(`Upserted news: ${news.title}`);
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
