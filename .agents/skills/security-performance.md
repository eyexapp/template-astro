---
name: security-performance
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - security
  - performance
  - islands
  - bundle
  - seo
---

# Security & Performance — Astro

## Performance

### Zero JS by Default

Astro ships **zero JavaScript** unless you explicitly add `client:*` directives. Static HTML + CSS only.

### Island Hydration Strategies

```astro
<!-- Immediate — for above-fold interactive content -->
<Nav client:load />

<!-- Lazy — for below-fold content -->
<Comments client:visible />

<!-- Idle — for non-critical features -->
<Newsletter client:idle />

<!-- Static — no JS at all (default, no directive) -->
<Footer />
```

### Image Optimization

```astro
---
import { Image } from "astro:assets";
import hero from "../assets/hero.jpg";
---

<!-- Automatic format conversion (WebP/AVIF), responsive sizes -->
<Image src={hero} alt="Hero" widths={[400, 800, 1200]} />
```

### Prefetching

```javascript
// astro.config.mjs
export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport", // Prefetch links in viewport
  },
});
```

### View Transitions

```astro
---
import { ViewTransitions } from "astro:transitions";
---
<head>
  <ViewTransitions />
</head>
```

## Security

### HTML Auto-Escaping

```astro
<!-- Astro auto-escapes expressions (safe) -->
<p>{userInput}</p>

<!-- ⚠️ Dangerous: use set:html only with sanitized content -->
<div set:html={sanitizedHtml} />
```

### Environment Variables

```bash
# PUBLIC_ prefix = client-accessible
PUBLIC_API_URL=https://api.example.com
# Without prefix = server-only (available in frontmatter)
DATABASE_URL=postgresql://...
```

### CSP Headers

```typescript
// astro.config.mjs
export default defineConfig({
  security: {
    checkOrigin: true, // CSRF protection for SSR
  },
});
```

### API Endpoint Security

```typescript
// src/pages/api/users.ts
export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");
  if (origin !== import.meta.env.ALLOWED_ORIGIN) {
    return new Response("Forbidden", { status: 403 });
  }
  // Process request...
};
```

### SSR Secrets

```astro
---
// Frontmatter runs on SERVER — safe for secrets
const data = await fetch(import.meta.env.API_URL, {
  headers: { Authorization: `Bearer ${import.meta.env.API_KEY}` }
});
// API_KEY never reaches the client
---
```
