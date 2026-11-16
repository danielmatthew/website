import { readdirSync, readFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { filenameId, postId } from './src/lib/permalinks';

const POSTS_DIR = new URL('./src/content/posts/', import.meta.url);

// Map each post file to its old (filename-based) and current URL ids
function readPostIds() {
  return readdirSync(POSTS_DIR)
    .filter((file) => /^[^_].*\.mdx?$/.test(file))
    .map((file) => {
      const source = readFileSync(new URL(file, POSTS_DIR), 'utf8');
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const slug = frontmatter.match(/^slug:\s*['"]?([^'"\r\n]+?)['"]?\s*$/m)?.[1];
      const published = !/^published:\s*false\s*$/m.test(frontmatter);
      return { file, published, from: filenameId(file), to: postId(file, slug) };
    });
}

// Fails the build on duplicate note URLs, and writes 301s from the
// date-prefixed URLs Astro used before dates were stripped
function notePermalinks() {
  return {
    name: 'note-permalinks',
    hooks: {
      'astro:config:setup': () => {
        const seen = new Map();
        for (const { file, to } of readPostIds()) {
          if (seen.has(to)) {
            throw new Error(
              `Notes "${seen.get(to)}" and "${file}" both resolve to /notes/${to}/. Add a \`slug\` to one of them.`
            );
          }
          seen.set(to, file);
        }
      },
      'astro:build:done': ({ dir }) => {
        const lines = readPostIds()
          .filter(({ published, from, to }) => published && from !== to)
          .map(({ from, to }) => `/notes/${from}/  /notes/${to}/  301`);
        appendFileSync(fileURLToPath(new URL('_redirects', dir)), lines.join('\n') + '\n');
      },
    },
  };
}

export default defineConfig({
  site: 'https://danmatthew.co.uk',
  trailingSlash: 'always',
  prefetch: true,
  integrations: [
    mdx(),
    sitemap(),
    notePermalinks(),
  ],
  fonts: [
    {
      provider: fontProviders.bunny(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex',
      weights: [400, 600, 700],
      display: 'swap',
    },
  ],
});
