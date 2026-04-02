# AGENTS.md — Astro 5 Islands Architecture (Multi-Framework)

## Project Identity

| Key | Value |
|-----|-------|
| Runtime | Node.js 20+ |
| Language | TypeScript (strict) |
| Category | Content-Driven Static Site (SSG) |
| Framework | Astro 5 |
| UI Islands | React, Preact, Vue, Svelte, Solid |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| State | Nano Stores (~1KB, cross-framework) |
| Content | Content Collections (Zod-validated Markdown) |
| i18n | Custom lightweight (EN/TR) |
| Linting | ESLint 9 + Prettier + commitlint |

> **Static Site Generation (SSG)** — all pages pre-built at compile time. No SSR.

---

## Architecture — Islands + Clean Layers

```
src/
├── core/              ← DOMAIN: types, Zod schemas, config (ZERO deps on other layers)
│   ├── types/         ← SeoMeta, NavItem, SiteConfig interfaces
│   ├── schemas/       ← Content Collection Zod schemas
│   └── config/        ← site.config.ts
├── lib/               ← INFRASTRUCTURE: utilities, API, SEO
│   ├── api/           ← createApiClient (type-safe fetch)
│   ├── utils/         ← cn(), formatDate(), slugify(), readingTime()
│   └── seo/           ← Meta tag + JSON-LD builders
├── stores/            ← STATE: Nano Stores atoms + computed
├── i18n/              ← Locale JSON + t() + useTranslations()
├── styles/            ← Tailwind v4 @theme tokens + base
├── layouts/           ← Astro layouts (BaseLayout, BlogLayout, DocsLayout)
├── components/
│   ├── common/        ← Shared Astro (Header, Footer, SEOHead, ThemeToggle)
│   ├── ui/            ← Design system (Button, Card, Badge, Alert, Container, Section)
│   ├── react/         ← React islands (.tsx)
│   ├── preact/        ← Preact islands (.tsx)
│   ├── vue/           ← Vue islands (.vue)
│   ├── svelte/        ← Svelte islands (.svelte)
│   └── solid/         ← Solid islands (.tsx)
├── content/           ← Content Collections (blog/, docs/)
└── pages/             ← File-based routing (composition root)
```

### Layer Dependency Rules (STRICT)

| Layer | Can Import From | NEVER Imports |
|-------|----------------|---------------|
| `core/` | (none — foundational, only external like zod) | lib/, stores/, components/ |
| `lib/` | core/ | stores/, components/, pages/ |
| `stores/` | core/ | lib/, components/, pages/ |
| `components/` | core/, lib/, stores/, i18n/ | pages/, layouts/ |
| `layouts/` | components/, lib/, i18n/, core/ | pages/ |
| `pages/` | Everything (composition root) | — |

---

## Adding New Code — Where Things Go

### New Page
1. Create `.astro` file in `src/pages/`
2. Import layout from `@layouts/`
3. Import components — static Astro by default

### New Island Component
1. Choose framework → place in correct `components/<framework>/` folder
2. **CRITICAL**: React/Preact/Solid all use `.tsx` — MUST be in their designated folders
3. Add `client:visible` directive when used in Astro page/layout

### New Content Collection
1. Define Zod schema in `src/core/schemas/content.ts`
2. Register in `src/content/config.ts`
3. Create `.md` files with validated frontmatter

### New Nano Store
1. Create `src/stores/name.store.ts`
2. Export `$atom` (dollar prefix) + action functions
3. Use framework-specific hook in islands

---

## Design & Architecture Principles

### Islands — Default to Static
```astro
<!-- ✅ Static — zero JS shipped (DEFAULT, preferred) -->
<Card title="Hello" />

<!-- ✅ Interactive — hydrate when visible (PREFERRED for islands) -->
<ReactCounter client:visible />

<!-- ⚠️ Hydrate on load — ONLY above-the-fold interactive content -->
<SvelteWidget client:load />

<!-- ⚠️ Hydrate when idle — non-critical interactive -->
<VueChart client:idle />
```

### NEVER Add `client:*` to Astro Components
```astro
<!-- ❌ Astro components DON'T support client directives -->
<Card client:visible />  <!-- WRONG — Card.astro is already static -->
```

### Framework Isolation
```
components/react/   → .tsx processed by React compiler
components/preact/  → .tsx processed by Preact compiler
components/solid/   → .tsx processed by Solid compiler
components/svelte/  → .svelte auto-detected
components/vue/     → .vue auto-detected
```
> **CRITICAL**: React, Preact, Solid all use `.tsx` — folder location determines which compiler processes them.

### Nano Stores — Cross-Framework State
```typescript
// src/stores/counter.store.ts
import { atom, computed } from 'nanostores';

export const $count = atom(0);
export const $doubled = computed($count, (c) => c * 2);
export function increment() { $count.set($count.get() + 1); }
```

```tsx
// React: useStore from @nanostores/react
// Preact: useStore from @nanostores/preact
// Vue: useStore from @nanostores/vue
// Solid: useStore from @nanostores/solid
// Svelte: auto-subscribes — use $count directly in template
```

### Path Aliases — NEVER Relative Across Layers
```typescript
// ✅ Always use aliases
import type { SeoMeta } from '@core/types';
import { cn } from '@lib/utils';
import { $count } from '@stores/counter.store';
import Button from '@components/ui/Button.astro';

// ❌ NEVER relative paths crossing layers
import type { SeoMeta } from '../../core/types';
```

Available: `@core/*`, `@lib/*`, `@components/*`, `@layouts/*`, `@stores/*`, `@i18n/*`, `@styles/*`, `@content/*`

---

## Error Handling

### Content Collections — Zod Validates at Build Time
```typescript
// Invalid frontmatter → build error with clear message
// Schema defined in core/schemas/content.ts
const blogSchema = z.object({
  title: z.string(),
  pubDate: z.coerce.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()),
});
```

### Build-Time Safety
- Astro catches broken imports, missing pages at build
- TypeScript strict mode catches type errors
- Zod validates all content frontmatter
- Missing translations surface at build time

---

## Code Quality

### Naming Conventions
| Artifact | Convention | Example |
|----------|-----------|---------|
| Astro component | PascalCase.astro | `Button.astro` |
| React/Preact/Solid island | PascalCase.tsx | `ReactCounter.tsx` |
| Vue island | PascalCase.vue | `VueChart.vue` |
| Svelte island | PascalCase.svelte | `SvelteWidget.svelte` |
| Store | `name.store.ts` | `counter.store.ts` |
| Store atom | `$camelCase` | `$count`, `$theme` |
| Utility | kebab-case.ts | `format-date.ts` |
| i18n keys | dot-notation | `home.hero.title` |

### Astro Component Props
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---
<h1>{title}</h1>
```

### Class Merging
```typescript
import { cn } from '@lib/utils';
const className = cn('base-class', active && 'active-class', props.class);
```

---

## Testing Strategy

| Level | What | Where | Tool |
|-------|------|-------|------|
| Type check | Astro + TS | — | `astro check` |
| Lint | Code quality | — | ESLint |
| Build | Full SSG build | — | `astro build` |

### Content Validation
- Zod schemas validate all frontmatter at build time
- `astro check` catches type errors across components

---

## Security & Performance

### Security
- SSG → no server-side attack surface
- All content pre-rendered → no injection possible
- Zod validates all content at build time
- CSP-friendly: inline scripts minimized by islands

### Performance
- Zero JS by default — only islands ship JavaScript
- `client:visible` defers hydration until viewport entry
- Nano Stores: ~1KB shared state (not per-framework)
- Content Collections: pre-parsed at build, no runtime cost
- Tailwind v4: CSS-only, no JS runtime

---

## Commands

| Action | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Type check | `npm run check` |
| Lint | `npm run lint` |
| Lint fix | `npm run lint:fix` |
| Format | `npm run format` |
| Format check | `npm run format:check` |

---

## Prohibitions — NEVER Do These

1. **NEVER** add `client:*` directives unless the component needs browser interactivity
2. **NEVER** place React/Preact/Solid `.tsx` outside their designated `components/<framework>/` folder
3. **NEVER** use relative imports across layer boundaries — path aliases always
4. **NEVER** import pages/ or layouts/ from lower layers (core, lib, stores)
5. **NEVER** add inline `<style>` blocks — use Tailwind utilities or `global.css`
6. **NEVER** skip Zod schema validation for content collection frontmatter
7. **NEVER** use `localStorage` / `document` directly — use store layer
8. **NEVER** use `any` type — `unknown` + type guards
9. **NEVER** deploy with `astro dev` — always `astro build`
10. **NEVER** create circular dependencies between layers
