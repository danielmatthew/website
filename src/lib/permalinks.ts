// URL rules for notes. Eleventy published notes at /notes/<fileSlug>/, which
// drops a leading YYYY-MM-DD- from the filename; we match that here.

const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

// The id Astro derived from the filename before dates were stripped
// (e.g. "2014-01-23-linked-lists"). Still used for redirects and feed IDs.
export function filenameId(file: string): string {
  const basename = file.split("/").pop() ?? file;
  return basename.replace(/\.mdx?$/, "").toLowerCase();
}

// Feed entry ID: kept on the filename-based URL so feed readers don't
// treat posts as new now that their URLs have changed
export function feedId(siteUrl: string, post: { id: string; filePath?: string }): string {
  const id = post.filePath ? filenameId(post.filePath) : post.id;
  return `${siteUrl.replace(/\/$/, "")}/notes/${id}/`;
}

// The id used in the note's URL: an explicit `slug` wins, otherwise the
// filename without its date prefix.
export function postId(file: string, slug?: unknown): string {
  if (typeof slug === "string" && slug.length > 0) {
    return slug;
  }
  return filenameId(file).replace(DATE_PREFIX, "");
}
