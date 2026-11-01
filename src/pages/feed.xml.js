import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');

  const publishedPosts = posts
    .filter(post => post.data.published === true)
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  return rss({
    title: 'Dan Matthew',
    description: 'Notes and thoughts from Dan Matthew, an accessibility and design systems consultant',
    site: context.site || 'https://danmatthew.co.uk',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedDate,
      link: `/notes/${post.id}/`,
      description: post.data.description || '',
      content: post.rendered?.html ?? '',
    })),
  });
}
