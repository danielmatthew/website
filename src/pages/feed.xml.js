import rss from '@astrojs/rss';
import { render } from 'astro:content';
import { getPublishedPosts } from '../lib/collections';
import { feedId } from '../lib/permalinks';

export async function GET(context) {
  const publishedPosts = await getPublishedPosts();
  const siteUrl = (context.site?.toString() || 'https://danmatthew.co.uk').replace(/\/$/, '');

  const items = await Promise.all(
    publishedPosts.map(async (post) => {
      const { remarkPluginFrontmatter, ...rendered } = await render(post);
      return {
        title: post.data.title,
        pubDate: post.data.publishedDate,
        link: `/notes/${post.id}/`,
        description: post.data.description || '',
        categories: [post.data.category, ...post.data.tags],
        content: rendered.html ?? '',
        // Replaces the default guid (the link) so IDs survive URL changes
        customData: `<guid isPermaLink="true">${feedId(siteUrl, post)}</guid>`,
      };
    })
  );

  return rss({
    title: 'Dan Matthew',
    description: 'Notes and thoughts from Dan Matthew, an accessibility and design systems consultant',
    site: context.site || 'https://danmatthew.co.uk',
    items,
  });
}
