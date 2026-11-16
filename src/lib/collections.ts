import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category } from './taxonomy';

type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => data.published !== false);
  return posts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter((post) => post.data.featured);
}

export async function getPinnedPosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter((post) => post.data.pinned);
}

export async function getEvergreenPosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter((post) => post.data.evergreen);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return (await getPublishedPosts()).filter((post) => post.data.tags.includes(tag));
}

export async function getPostsByCategory(category: Category): Promise<Post[]> {
  return (await getPublishedPosts()).filter((post) => post.data.category === category);
}

// Tag → number of published posts, sorted alphabetically
export async function getAllTags(): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  for (const post of await getPublishedPosts()) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...counts].sort(([a], [b]) => a.localeCompare(b)));
}

export async function getPublishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles', ({ data }) => data.published !== false);
  return articles.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );
}

export async function getPublishedWork(): Promise<CollectionEntry<'work'>[]> {
  return getCollection('work', ({ data }) => data.draft !== true);
}
