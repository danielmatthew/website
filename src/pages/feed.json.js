import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');

  // Filter for published posts only and sort by date descending
  const publishedPosts = posts
    .filter(post => post.data.published === true)
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  const siteUrl = (context.site?.toString() || 'https://danmatthew.co.uk').replace(/\/$/, '');

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Dan Matthew - Notes',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'Notes and thoughts from Dan Matthew, an accessibility and design systems consultant',
    author: {
      name: 'Dan Matthew',
      url: siteUrl,
    },
    language: 'en-gb',
    items: publishedPosts.map((post) => ({
      id: `${siteUrl}/notes/${post.slug}/`,
      url: `${siteUrl}/notes/${post.slug}/`,
      title: post.data.title,
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
