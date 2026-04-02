---
name: version-control
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - git
  - commit
  - ci
  - deploy
  - ssg
---

# Version Control — Astro

## Commits

- `feat(blog): add content collection for blog posts`
- `fix(islands): fix hydration timing on search bar`
- `content: add new blog post about Astro islands`

## CI Pipeline

```bash
npm ci
npx astro check     # Type check .astro files
npx vitest run
npm run build        # Static site generation
```

## Build Modes

```bash
# Static (SSG) — default
npm run build        # → dist/

# Server (SSR)
# astro.config.mjs: output: "server"
npm run build

# Hybrid — per-page SSR/SSG
# astro.config.mjs: output: "hybrid"
```

## Docker (Static)

```dockerfile
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

## Deploy Targets

- **Vercel**: `npx astro add vercel`
- **Netlify**: `npx astro add netlify`
- **Cloudflare Pages**: `npx astro add cloudflare`

## .gitignore

```
node_modules/
dist/
.astro/
.env
```
