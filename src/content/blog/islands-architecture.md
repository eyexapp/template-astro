---
title: "Understanding Islands Architecture"
description: "Deep dive into Astro's Islands Architecture pattern — partial hydration, client directives, and performance optimization."
pubDate: 2026-03-10
author: "Template Author"
tags: ["astro", "architecture", "performance"]
---

# Understanding Islands Architecture

Astro's **Islands Architecture** is the key to its performance. Instead of hydrating an entire page with JavaScript, only the interactive components (islands) load their runtime.

## How It Works

1. **Server renders everything** — All components produce static HTML at build time
2. **Islands opt-in to JavaScript** — Only components with `client:*` directives ship JS
3. **Independent hydration** — Each island loads independently, without blocking others

## Client Directives

Astro provides several directives to control _when_ an island becomes interactive:

| Directive | Behavior |
|-----------|----------|
| `client:load` | Hydrate immediately on page load |
| `client:idle` | Hydrate once the browser is idle |
| `client:visible` | Hydrate when the component is scrolled into view |
| `client:media` | Hydrate when a CSS media query is met |
| `client:only` | Skip SSR, render only on the client |

## Best Practices

### Use `.astro` components by default

Most of your UI should be `.astro` components — they render to pure HTML with **zero JavaScript**.

```astro
---
// This component ships ZERO JS to the browser
const { title } = Astro.props;
---
<section class="hero">
  <h1>{title}</h1>
</section>
```

### Reserve framework components for interactivity

Only reach for React, Vue, Svelte, etc., when you need **client-side state or event handling**:

```astro
---
import SearchBar from '../components/react/SearchBar';
---
<!-- Only this island ships JavaScript -->
<SearchBar client:idle />
```

### Choose the right directive

- **`client:visible`** — Best for below-the-fold content (counters, carousels)
- **`client:idle`** — Good for above-the-fold but non-critical interactivity
- **`client:load`** — Only for immediately required functionality
- **`client:media`** — Mobile-only or desktop-only interactions

## Performance Impact

A typical Astro page might have 95% static HTML and only 5% interactive islands. This means:

- **Faster Time to Interactive (TTI)** — less JS to parse and execute
- **Better Core Web Vitals** — smaller bundle = better LCP and FID
- **Progressive Enhancement** — content is visible immediately, interactivity loads after
