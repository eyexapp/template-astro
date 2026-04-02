---
title: "Deployment Guide"
description: "How to build and deploy the Astro Master Template to various hosting platforms."
section: "Guides"
order: 3
---

# Deployment Guide

## Build for Production

```bash
npm run build
```

This generates a static site in the `dist/` directory, ready for deployment to any static hosting provider.

## GitHub Pages

The template includes a CI/CD workflow at `.github/workflows/deploy.yml` that automatically deploys to GitHub Pages on push to `main`.

### Setup

1. Go to your repo's **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow handles the rest

### Configuration

Update `astro.config.mjs` with your GitHub Pages URL:

```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
  // ...
});
```

## Vercel

```bash
npm i -D @astrojs/vercel
```

Update `astro.config.mjs`:

```js
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
```

## Netlify

```bash
npm i -D @astrojs/netlify
```

Update `astro.config.mjs`:

```js
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
});
```

## Cloudflare Pages

```bash
npm i -D @astrojs/cloudflare
```

Connect your repo in the Cloudflare dashboard:
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Environment Variables

For any platform, set these if needed:

| Variable | Description | Required |
|----------|-------------|----------|
| `SITE_URL` | Production URL for SEO | Recommended |
| `PUBLIC_*` | Client-accessible variables | Optional |

> Variables prefixed with `PUBLIC_` are bundled into the client. Keep secrets unprefixed.
