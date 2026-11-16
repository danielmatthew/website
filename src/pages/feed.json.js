import { getPublishedPosts } from '../lib/collections';
import { feedId } from '../lib/permalinks';

export async function GET(context) {
  const publishedPosts = await getPublishedPosts();

  const siteUrl = (context.site?.toString() || 'https://danmatthew.co.uk').replace(/\/$/, '');

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Dan Matthew',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'Notes and thoughts from Dan Matthew, an accessibility and design systems consultant',
    author: {
      name: 'Dan Matthew',
      url: siteUrl,
    },
    language: 'en-gb',
    items: publishedPosts.map((post) => ({
      id: feedId(siteUrl, post),
      url: `${siteUrl}/notes/${post.id}/`,
      title: post.data.title,
      ...(post.data.description && { summary: post.data.description }),
      ...(post.data.link && { external_url: post.data.link }),
      tags: [post.data.category, ...post.data.tags],
      date_published: post.data.publishedDate.toISOString(),
      ...(post.data.updatedDate && { date_modified: post.data.updatedDate.toISOString() }),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
