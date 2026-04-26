import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('posts');

  // Filter for published posts only and sort by date descending
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
      link: `/notes/${post.slug}/`,
      description: post.data.description || '',
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        }),
        ...post.data,
      })),
  });
}
