# Astro Master Template — AI Coding Instructions

## Project Overview

This is a production-ready **Astro 5** master template using **Islands Architecture** with 5 UI frameworks (React, Preact, Vue, Svelte, Solid). It follows Clean Architecture principles with strict layer separation, shared cross-framework state via Nano Stores, built-in i18n (EN/TR), Content Collections with Zod schemas, and a Tailwind CSS v4 design system.

**Rendering mode**: Static Site Generation (SSG) — no server-side rendering. All pages are pre-built at compile time.

## Architecture & Layer Rules

```
src/
├── core/          # Domain layer — types, schemas, config (ZERO dependencies on other layers)
│   ├── types/     # TypeScript interfaces (SeoMeta, NavItem, SiteConfig, etc.)
│   ├── schemas/   # Zod validation schemas for Content Collections
│   └── config/    # Site-wide configuration (site.config.ts)
├── lib/           # Infrastructure layer — utilities, API client, SEO helpers
│   ├── api/       # Type-safe fetch wrapper (createApiClient)
│   ├── utils/     # Pure utility functions (cn, formatDate, slugify, readingTime)
│   └── seo/       # Meta tag & JSON-LD builders
├── stores/        # State layer — Nano Stores atoms & computed stores
├── i18n/          # Internationalization — locale JSON files & t() utility
├── styles/        # Global CSS — Tailwind v4 @theme tokens & base styles
├── layouts/       # Astro layouts (BaseLayout, BlogLayout, DocsLayout)
├── components/    # UI components
│   ├── common/    # Shared Astro components (Header, Footer, SEOHead, ThemeToggle)
│   ├── ui/        # Design system primitives (Button, Card, Badge, Alert, Container, Section)
│   ├── react/     # React island components
│   ├── preact/    # Preact island components
│   ├── vue/       # Vue island components
│   ├── svelte/    # Svelte island components
│   └── solid/     # Solid island components
├── content/       # Content Collections (blog/, docs/) — Markdown with frontmatter
└── pages/         # File-based routing — Astro pages only
```

### Dependency Rules (STRICT)

1. `core/` → imports NOTHING from other src/ layers. Only external packages (zod).
2. `lib/` → may import from `core/` only.
3. `stores/` → may import from `core/` only. Never import components or pages.
4. `components/` → may import from `core/`, `lib/`, `stores/`, `i18n/`.
5. `layouts/` → may import from `components/`, `lib/`, `i18n/`, `core/`.
6. `pages/` → may import from everything. Pages are the composition root.

**Never create circular dependencies between layers.**

## Path Aliases

Always use path aliases — never relative paths crossing layer boundaries:

```typescript
// CORRECT
import type { SeoMeta } from '@core/types';
import { cn } from '@lib/utils';
import { $count } from '@stores/counter.store';
import { t } from '@i18n';
import Button from '@components/ui/Button.astro';

// WRONG — never use relative paths across layers
import type { SeoMeta } from '../../core/types';
```

Available aliases: `@core/*`, `@lib/*`, `@components/*`, `@layouts/*`, `@stores/*`, `@i18n/*`, `@styles/*`, `@content/*`

## Astro Islands Architecture Rules

### Client Directives

Astro components render at build time by default (zero JS). Only add `client:*` directives when the component **needs interactivity in the browser**:

```astro
<!-- Static — no JS shipped (default, preferred) -->
<Card title="Hello" />

<!-- Interactive — only hydrate when visible in viewport (PREFERRED for most islands) -->
<ReactCounter client:visible />

<!-- Interactive — hydrate on page load (use sparingly, above-the-fold interactive content only) -->
<SvelteWidget client:load />

<!-- Interactive — hydrate when browser is idle -->
<VueChart client:idle />
```

**Rules:**
- Default to NO client directive. Most components should be static Astro components.
- Prefer `client:visible` over `client:load` — it defers hydration until needed.
- Use `client:load` only for immediately interactive above-the-fold content.
- Use `client:idle` for non-critical interactive elements.
- Never add `client:*` to Astro (.astro) components — they don't support it.

### Framework Isolation

Each UI framework lives in its own directory under `src/components/`:

```
components/react/   → React (.tsx) — include pattern: **/react/*
components/preact/  → Preact (.tsx) — include pattern: **/preact/*
components/solid/   → Solid (.tsx) — include pattern: **/solid/*
components/svelte/  → Svelte (.svelte) — auto-detected
components/vue/     → Vue (.vue) — auto-detected
```

**Critical**: React, Preact, and Solid all use `.tsx` — they MUST be in their designated folders for the correct compiler to process them. The `astro.config.mjs` `include` patterns enforce this.

## State Management — Nano Stores

Cross-framework state uses [Nano Stores](https://github.com/nanostores/nanostores) (~1KB). All stores live in `src/stores/`.

### Store Naming Convention

- File: `{name}.store.ts`
- Atom: `$name` (dollar prefix)
- Actions: plain function names (`increment`, `toggleTheme`)

### Store Pattern

```typescript
// src/stores/example.store.ts
import { atom, computed } from 'nanostores';

export const $value = atom<string>('default');
export const $derived = computed($value, (v) => v.toUpperCase());

export function setValue(newValue: string) {
  $value.set(newValue);
}
```

### Framework-Specific Usage

```tsx
// React: import { useStore } from '@nanostores/react';
const count = useStore($count);

// Preact: import { useStore } from '@nanostores/preact';
const count = useStore($count);

// Vue: import { useStore } from '@nanostores/vue';
const count = useStore($count);

// Solid: import { useStore } from '@nanostores/solid';
const count = useStore($count);

// Svelte: import directly — Svelte auto-subscribes to stores
// <script> import { $count } from '@stores/counter.store'; </script>
// Use as {$count} in template
```

## Content Collections

Content lives in `src/content/` with Zod-validated frontmatter schemas defined in `src/core/schemas/content.ts`.

### Collections

- **blog**: `src/content/blog/*.md` — title, description, pubDate, updatedDate?, author, image?, tags, draft
- **docs**: `src/content/docs/*.md` — title, description, section, order

### Adding Content

1. Create `.md` file in the appropriate collection folder.
2. Include frontmatter matching the Zod schema.
3. The collection config at `src/content/config.ts` validates automatically.

### Querying Content

```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
const docs = await getCollection('docs');
```

## Internationalization (i18n)

- Default locale: `en` (no URL prefix)
- Additional locales: `tr` (prefixed: `/tr/...`)
- Translation files: `src/i18n/locales/{locale}.json`
- Utility: `src/i18n/index.ts` exports `t()`, `getLocaleFromUrl()`, `useTranslations()`

### Usage in Astro Components

```astro
---
import { useTranslations } from '@i18n';

const t = useTranslations(Astro.url);
---
<h1>{t('home.hero.title')}</h1>
```

### Adding a New Locale

1. Add the locale code to `astro.config.mjs` → `i18n.locales` array.
2. Create `src/i18n/locales/{locale}.json` with all translation keys.
3. Create locale-prefixed page routes if not using Astro's automatic routing.

## Tailwind CSS v4 Design System

The design system uses Tailwind v4's `@theme` directive in `src/styles/global.css`. All design tokens are defined there.

### Token Categories

- **Colors**: `--color-primary-{50-900}`, `--color-surface`, `--color-border`, `--color-muted`, `--color-text-*`
- **Typography**: `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- **Spacing**: `--spacing-*`
- **Radius**: `--radius-*`
- **Shadows**: `--shadow-*`

### Dark Mode

Dark mode uses the `class` strategy. The `.dark` class on `<html>` activates dark tokens defined via `@media (prefers-color-scheme: dark)` overrides. Theme state is managed by `src/stores/theme.store.ts`.

### Using Design Tokens

```astro
<!-- Use Tailwind utilities that reference theme tokens -->
<div class="bg-surface text-text border-border rounded-lg shadow-md">
  <h2 class="text-primary-600 dark:text-primary-400">Title</h2>
</div>
```

## UI Components

### Astro Components (Static — `src/components/ui/`)

- `Button.astro` — variants: primary, secondary, outline, ghost; sizes: sm, md, lg
- `Card.astro` — optional href (renders as link), padding toggle
- `Badge.astro` — variants: default, primary, success, warning, danger
- `Alert.astro` — variants: info, success, warning, error (with icons)
- `Container.astro` — max-width wrapper: sm, md, lg, xl, full
- `Section.astro` — page section with padding + Container

### Class Merging

Always use the `cn()` utility from `@lib/utils` to merge Tailwind classes:

```typescript
import { cn } from '@lib/utils';

const className = cn('base-classes', conditional && 'conditional-class', userClass);
```

## Code Style & Conventions

### Naming

- **Files**: kebab-case for utilities (`format-date.ts`), PascalCase for components (`Button.astro`, `ReactCounter.tsx`)
- **Types/Interfaces**: PascalCase (`SeoMeta`, `NavItem`)
- **Variables/Functions**: camelCase (`formatDate`, `buildMetaTags`)
- **Store atoms**: `$camelCase` prefix (`$count`, `$theme`)
- **Store files**: `{name}.store.ts`
- **CSS**: Tailwind utility classes; custom CSS only in `global.css`

### TypeScript

- Strict mode enabled (`astro/tsconfigs/strict`)
- Prefer `type` imports: `import type { X } from '...'`
- Use Zod for runtime validation at system boundaries
- No `any` — use `unknown` and narrow with type guards

### Component Guidelines

- Astro components for static content (default choice)
- Framework components only when interactivity is needed
- Props interface at the top of each component
- Use `Astro.props` destructuring in frontmatter

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
```

## Build & Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production (SSG)
npm run preview      # Preview production build
npm run check        # Astro type checking
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Prettier check
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add blog pagination
fix: resolve dark mode flash
docs: update README setup section
style: format header component
refactor: extract SEO meta builder
chore: update dependencies
```

Enforced by commitlint + husky pre-commit hooks.

## Do NOT

- Add `client:*` directives to components that don't need browser interactivity.
- Place framework components outside their designated folders (react/, preact/, solid/, etc.).
- Import from `pages/` or `layouts/` in lower layers (core, lib, stores).
- Use relative imports across layer boundaries — use path aliases.
- Add inline `<style>` blocks in Astro components — use Tailwind utilities or `global.css`.
- Skip frontmatter Zod schema validation for new content collections.
- Use `localStorage` or `document` directly — use the store layer for browser APIs.
- Deploy with `astro dev` — always build with `astro build` for production.
