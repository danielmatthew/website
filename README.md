# danmatthew.co.uk

Personal site for Dan Matthew — accessibility and design systems consultant.

Built with [Astro](https://astro.build) and [TinaCMS](https://tina.io), deployed on Netlify.

## Prerequisites

- Node 24 (see `.nvmrc`) — use `nvm use` or `fnm use`
- pnpm 12 — installed automatically via `corepack enable`

## Development

Start the dev server with TinaCMS (CMS sidebar available at `/admin`):

```sh
pnpm dev
```

Or run Astro alone (no CMS):

```sh
pnpm astro dev
```

## Build

```sh
pnpm build        # TinaCMS pre-build + Astro build
pnpm build:ci     # Astro build only (no TinaCMS, for CI)
pnpm preview      # preview the dist/ output locally
```

## Type checking

```sh
pnpm check        # runs astro check
```

## Lint & format

```sh
pnpm lint         # ESLint (eslint-plugin-astro)
pnpm format       # Prettier
```

## Content

Posts live in `src/content/posts/`, articles in `src/content/articles/`, and work case studies in `src/content/work/`. All use Markdown or MDX.

Set `published: false` in frontmatter to keep a post out of the build. TinaCMS reads and writes these files directly.
