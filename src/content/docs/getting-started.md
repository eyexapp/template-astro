---
title: "Getting Started"
description: "Quick start guide — installation, development server, and project structure overview."
section: "Introduction"
order: 1
---

# Getting Started

## Prerequisites

- **Node.js** 18.17.0 or higher
- **npm** 9+ (or pnpm/yarn)

## Installation

```bash
# Clone the template
git clone https://github.com/yourusername/astro-master-template.git my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:4321`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production (SSG) |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run Astro type checking |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```
src/
├── core/           # Types, schemas, site configuration
│   ├── types/      # TypeScript interfaces
│   ├── schemas/    # Zod schemas for Content Collections
│   └── config/     # Site-wide configuration
├── content/        # Markdown content (blog, docs)
├── lib/            # Utilities and services
│   ├── api/        # Type-safe fetch client
│   ├── utils/      # Helper functions
│   └── seo/        # SEO meta builder
├── stores/         # Nano Stores (cross-framework state)
├── i18n/           # Internationalization
├── layouts/        # Astro layouts
├── components/     # UI components
│   ├── common/     # Shared .astro components
│   ├── ui/         # Design system primitives
│   └── [framework] # Framework-specific islands
├── pages/          # File-based routes
└── styles/         # Global CSS & tokens
```

## Configuration

Edit `src/core/config/site.config.ts` to customize:
- Site name, URL, and description
- Navigation items
- Social links
- Author information
