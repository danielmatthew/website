import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://danmatthew.co.uk',
  trailingSlash: 'always',
  prefetch: true,
  integrations: [
    mdx(),
    sitemap(),
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
