---
title: "Getting Started with Astro"
description: "Learn how to build fast, content-focused websites with Astro's Islands Architecture and multi-framework support."
pubDate: 2026-03-01
author: "Template Author"
tags: ["astro", "tutorial", "getting-started"]
image:
  src: "/og-image.png"
  alt: "Getting started with Astro"
---

# Getting Started with Astro

Welcome to the **Astro Master Template**! This guide will help you understand the project structure and start building right away.

## What is Astro?

Astro is a modern static site generator that lets you build faster websites with **less client-side JavaScript**. It uses an _Islands Architecture_ — meaning interactive UI components are hydrated independently, while the rest of the page remains static HTML.

## Project Structure

```
src/
├── core/          # Domain types, schemas, config
├── content/       # Blog & docs markdown files
├── lib/           # Utilities, API client, SEO tools
├── stores/        # Nano Stores (cross-framework state)
├── i18n/          # Translations & language utilities
├── layouts/       # Page layouts (Base, Blog, Docs)
├── components/    # UI components by framework
├── pages/         # File-based routing
└── styles/        # Global CSS & design tokens
```

## Multi-Framework Support

This template includes **five UI frameworks** running side by side:

- **React** — for complex stateful components
- **Preact** — lightweight React alternative (3KB)
- **Vue** — progressive framework with Composition API
- **Svelte** — compiler-based, minimal runtime
- **Solid** — fine-grained reactivity, high performance

Each framework's components live in their own directory under `src/components/`.

## Adding a New Blog Post

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "My New Post"
description: "A short description"
pubDate: 2026-03-15
tags: ["example"]
---

Your content here...
```

## Next Steps

- Check the [Showcase](/showcase) to see all frameworks in action
- Read the [Docs](/docs) for detailed guides
- Explore the component library in `src/components/ui/`
