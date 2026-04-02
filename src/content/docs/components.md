---
title: "Components Guide"
description: "How to create, organize, and use components across multiple frameworks in the Astro Master Template."
section: "Guides"
order: 2
---

# Components Guide

## Component Types

### Static Components (`.astro`)

Use `.astro` components for UI that doesn't need client-side interactivity. They render to **zero-JS HTML**.

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="card rounded-xl border border-border bg-surface p-6">
  <h3 class="text-lg font-semibold">{title}</h3>
  {description && <p class="mt-2 text-muted">{description}</p>}
  <slot />
</div>
```

### Interactive Islands (Framework Components)

Use React, Vue, Svelte, Solid, or Preact when you need **state, effects, or event handlers**.

Each framework has its own directory:

```
src/components/
├── react/       # *.tsx files (React)
├── preact/      # *.tsx files (Preact)
├── vue/         # *.vue files
├── svelte/      # *.svelte files
└── solid/       # *.tsx files (Solid)
```

> **Important:** Keep framework components in their designated folders. The Astro config uses path-based `include` patterns to resolve JSX conflicts.

### Design System Components (`ui/`)

Reusable, framework-agnostic UI primitives built with Astro + Tailwind:

- `Button.astro` — Configurable button with variants
- `Card.astro` — Content card with header/body/footer slots
- `Badge.astro` — Status or category indicator
- `Alert.astro` — Contextual alert messages
- `Container.astro` — Max-width wrapper
- `Section.astro` — Page section with spacing

## Using Shared State

All framework components can share state via **Nano Stores**:

```tsx
// In any framework component
import { useStore } from '@nanostores/react'; // or /vue, /solid, etc.
import { $count } from '@stores/counter.store';

function MyComponent() {
  const count = useStore($count);
  return <span>Count: {count}</span>;
}
```

## Hydration Directives

Always add a `client:*` directive when using framework components:

```astro
---
import MyReactWidget from '@components/react/MyWidget';
---

<!-- Hydrate when scrolled into view (recommended default) -->
<MyReactWidget client:visible />

<!-- Hydrate when browser is idle -->
<MyReactWidget client:idle />

<!-- Hydrate immediately (use sparingly) -->
<MyReactWidget client:load />
```
