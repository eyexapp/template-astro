# Astro Master Template

A production-ready **Astro 5** master template featuring Islands Architecture with 5 UI frameworks, Content Collections, i18n, cross-framework state management, and a comprehensive Tailwind CSS v4 design system.

## Features

- **Islands Architecture** — Ship zero JS by default; hydrate only interactive components
- **5 UI Frameworks** — React, Preact, Vue, Svelte, and Solid coexisting via Astro integrations
- **Content Collections** — Blog + Docs with Zod-validated frontmatter schemas
- **Cross-Framework State** — Nano Stores (~1KB) shared across all frameworks
- **i18n** — Built-in Astro routing with EN + TR locales (extensible)
- **Tailwind CSS v4** — Design system via `@theme` tokens, dark mode (class strategy)
- **Clean Architecture** — Strict layer separation: core → lib → stores → components → pages
- **SEO Ready** — Meta tags, Open Graph, JSON-LD structured data, sitemap
- **DX Tooling** — ESLint, Prettier, commitlint, Husky, lint-staged, EditorConfig
- **AI Instructions** — Copilot & Cursor rules for consistent AI-assisted development

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (SSG)
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── core/                 # Domain layer (types, schemas, config)
│   ├── types/            # TypeScript interfaces
│   ├── schemas/          # Zod content schemas
│   └── config/           # Site configuration
├── lib/                  # Infrastructure (utils, API, SEO)
│   ├── api/              # Type-safe fetch wrapper
│   ├── utils/            # Utility functions (cn, formatDate, slugify, readingTime)
│   └── seo/              # Meta tag & JSON-LD builders
├── stores/               # Nano Stores (theme, counter, ui)
├── i18n/                 # Translations & t() utility
│   └── locales/          # en.json, tr.json
├── styles/               # Tailwind v4 global CSS & @theme tokens
├── layouts/              # BaseLayout, BlogLayout, DocsLayout
├── components/
│   ├── common/           # Header, Footer, SEOHead, ThemeToggle, LanguageSwitcher
│   ├── ui/               # Button, Card, Badge, Alert, Container, Section
│   ├── react/            # React island components
│   ├── preact/           # Preact island components
│   ├── vue/              # Vue island components
│   ├── svelte/           # Svelte island components
│   └── solid/            # Solid island components
├── content/              # Markdown content (blog/, docs/)
└── pages/                # File-based routing
```

### Layer Dependency Rules

```
pages → layouts → components → stores → lib → core
                                        ↗
                              i18n ────┘
```

Each layer may only import from layers below it. `core/` imports nothing from other `src/` layers.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build static site for production |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run Astro type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Islands Architecture

Astro renders all components as static HTML by default. Add `client:*` directives only when browser interactivity is needed:

```astro
<!-- Static (default — zero JS) -->
<Card title="Hello" />

<!-- Interactive — hydrates when visible (preferred) -->
<ReactCounter client:visible />

<!-- Interactive — hydrates immediately -->
<SvelteWidget client:load />
```

**Framework isolation:** React, Preact, and Solid all use `.tsx` files. They are separated by folder, and `astro.config.mjs` uses `include` patterns to route each to the correct compiler.

## Content Collections

### Blog Posts

Create Markdown files in `src/content/blog/`:

```markdown
---
title: "My Post"
description: "Post description"
pubDate: 2024-01-15
author: "Author Name"
tags: ["astro", "tutorial"]
draft: false
---

Your content here...
```

### Documentation

Create Markdown files in `src/content/docs/`:

```markdown
---
title: "Guide Title"
description: "Guide description"
section: "getting-started"
order: 1
---

Your docs content...
```

Schemas are defined with Zod in `src/core/schemas/content.ts` and registered in `src/content/config.ts`.

## Internationalization

- **Default locale**: `en` (no URL prefix)
- **Additional locales**: `tr` (prefixed: `/tr/...`)
- **Translation files**: `src/i18n/locales/{locale}.json`

### Usage

```astro
---
import { useTranslations } from '@i18n';
const t = useTranslations(Astro.url);
---
<h1>{t('home.hero.title')}</h1>
```

### Adding a New Locale

1. Add locale code to `astro.config.mjs` → `i18n.locales`
2. Create `src/i18n/locales/{locale}.json` with all keys
3. Update `LanguageSwitcher` component if needed

## Design System

Tailwind CSS v4 with design tokens defined via `@theme` in `src/styles/global.css`:

- **Colors**: `primary-{50-900}`, `surface`, `border`, `muted`, `text-*`
- **Typography**: Inter (sans), JetBrains Mono (mono)
- **Dark mode**: Class strategy — toggle via `ThemeToggle` component

Use the `cn()` utility from `@lib/utils` for conditional class merging:

```typescript
import { cn } from '@lib/utils';
cn('base-class', isActive && 'active-class', className);
```

## State Management

Nano Stores provide cross-framework state with ~1KB overhead:

```typescript
// Define in src/stores/
import { atom } from 'nanostores';
export const $count = atom(0);
export function increment() { $count.set($count.get() + 1); }

// Use in any framework with useStore($count)
```

## Path Aliases

| Alias | Path |
|-------|------|
| `@core/*` | `src/core/*` |
| `@lib/*` | `src/lib/*` |
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@stores/*` | `src/stores/*` |
| `@i18n/*` | `src/i18n/*` |
| `@styles/*` | `src/styles/*` |
| `@content/*` | `src/content/*` |

## Deployment

This template outputs a fully static site. Deploy to any static hosting:

### GitHub Pages

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`.

### Other Platforms

```bash
npm run build
# Upload the dist/ folder to Vercel, Netlify, Cloudflare Pages, etc.
```

Update `site` in `astro.config.mjs` with your production URL before deploying.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new component
fix: resolve dark mode flash
docs: update README
refactor: extract utility function
chore: update dependencies
```

## License

MIT
