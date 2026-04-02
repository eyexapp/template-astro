---
name: architecture
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - architecture
  - astro
  - islands
  - content collections
  - routing
---

# Architecture — Astro (Islands Architecture)

## Project Structure

```
src/
├── pages/                     ← File-based routing (.astro)
│   ├── index.astro            ← / route
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro        ← /blog
│   │   └── [slug].astro       ← /blog/:slug (dynamic)
│   └── api/
│       └── users.ts           ← API endpoint
├── layouts/
│   ├── BaseLayout.astro       ← HTML shell
│   └── BlogLayout.astro
├── components/
│   ├── Header.astro           ← Static (zero JS)
│   ├── Footer.astro
│   ├── react/                 ← Interactive React islands
│   │   └── SearchBar.tsx
│   └── svelte/                ← Interactive Svelte islands
│       └── Counter.svelte
├── content/
│   ├── config.ts              ← Content Collection schemas
│   └── blog/
│       ├── first-post.md
│       └── second-post.mdx
├── stores/
│   └── cartStore.ts           ← Nano Stores (shared state)
└── styles/
    └── global.css
```

## Astro Component (.astro)

```astro
---
// Frontmatter — runs at BUILD TIME (server)
import BaseLayout from "../layouts/BaseLayout.astro";
import SearchBar from "../components/react/SearchBar";

const posts = await getCollection("blog");
---

<BaseLayout title="Blog">
  <!-- Static HTML — zero JS shipped -->
  <h1>Blog Posts</h1>

  <!-- Interactive island — JS only for this component -->
  <SearchBar client:load />

  <ul>
    {posts.map(post => (
      <li><a href={`/blog/${post.slug}`}>{post.data.title}</a></li>
    ))}
  </ul>
</BaseLayout>
```

## Islands Architecture (client: directives)

```astro
<!-- Load JS immediately -->
<Counter client:load />

<!-- Load when visible (lazy) -->
<Comments client:visible />

<!-- Load on idle -->
<Analytics client:idle />

<!-- Load on media query -->
<Sidebar client:media="(min-width: 768px)" />

<!-- No directive = STATIC HTML only (no JS) -->
<Header />
```

## Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## API Endpoints

```typescript
// src/pages/api/users.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const users = await fetchUsers();
  return new Response(JSON.stringify(users), {
    headers: { "Content-Type": "application/json" },
  });
};
```

## Nano Stores (Cross-Framework State)

```typescript
// stores/cartStore.ts
import { atom, computed } from "nanostores";

export const cartItems = atom<CartItem[]>([]);
export const cartTotal = computed(cartItems, items =>
  items.reduce((sum, item) => sum + item.price, 0)
);
```

## Rules

- Static by default — only add `client:*` when interactivity is needed.
- Frontmatter (`---`) runs at build time, not in browser.
- Multi-framework: React, Svelte, Vue islands in same project.
- Content Collections for type-safe Markdown/MDX.
- Nano Stores for state shared across framework islands.
