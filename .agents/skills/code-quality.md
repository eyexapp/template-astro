---
name: code-quality
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - code quality
  - naming
  - astro component
  - styling
  - patterns
---

# Code Quality — Astro

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Page | kebab-case.astro | `about-us.astro` |
| Layout | PascalCase.astro | `BaseLayout.astro` |
| Component | PascalCase.astro | `BlogCard.astro` |
| Island (React) | PascalCase.tsx | `SearchBar.tsx` |
| Content file | kebab-case.md | `first-post.md` |
| Store | camelCase.ts | `cartStore.ts` |
| API endpoint | kebab-case.ts | `users.ts` |

## Layout Pattern

```astro
---
// layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}
const { title, description = "Default description" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <slot />  <!-- Child content injected here -->
  </body>
</html>
```

## Scoped Styles

```astro
<style>
  /* Automatically scoped to this component */
  h1 {
    color: navy;
    font-size: 2rem;
  }
</style>

<style is:global>
  /* Global styles (use sparingly) */
  body { margin: 0; }
</style>
```

## Props Typing

```astro
---
interface Props {
  title: string;
  href: string;
  isActive?: boolean;
}
const { title, href, isActive = false } = Astro.props;
---

<a href={href} class:list={["nav-link", { active: isActive }]}>
  {title}
</a>
```

## Dynamic Routes

```astro
---
// pages/blog/[slug].astro
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title}>
  <Content />
</BaseLayout>
```

## Image Optimization

```astro
---
import { Image } from "astro:assets";
import heroImage from "../assets/hero.jpg";
---

<Image src={heroImage} alt="Hero" width={800} />
```
