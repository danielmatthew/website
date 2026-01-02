import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');

  // Filter for published posts only and sort by date descending
  const publishedPosts = posts
    .filter(post => post.data.published === true)
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  return rss({
    title: 'Dan Matthew - Notes',
    description: 'Notes and thoughts from Dan Matthew, an accessibility and design systems consultant',
    site: context.site || 'https://danmatthew.co.uk',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      link: `/notes/${post.slug}/`,
      description: post.data.description || '',
    })),
    customData: `<language>en-gb</language>`,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    stylesheet: false,
  });
}
