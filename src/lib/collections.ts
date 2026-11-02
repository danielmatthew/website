import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', ({ data }) => data.published !== false);
  return posts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
  );
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
