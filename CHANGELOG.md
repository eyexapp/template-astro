# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- **Architecture**: Clean Architecture with strict layer separation (core → lib → stores → components → pages)
- **Multi-Framework Islands**: React 18, Preact 10, Vue 3.5, Svelte 5, Solid 1.9 with path-based isolation
- **Content Collections**: Blog and Docs collections with Zod-validated frontmatter schemas
- **State Management**: Nano Stores for cross-framework shared state (theme, counter, ui stores)
- **Internationalization**: Built-in Astro i18n routing with EN + TR locales
- **Design System**: Tailwind CSS v4 with @theme design tokens, dark mode support
- **UI Components**: Button, Card, Badge, Alert, Container, Section primitives
- **Common Components**: Header, Footer, SEOHead, ThemeToggle, LanguageSwitcher
- **Layouts**: BaseLayout, BlogLayout, DocsLayout with responsive design
- **SEO**: Meta tags, Open Graph, Twitter Cards, JSON-LD structured data, sitemap
- **Pages**: Landing page, Showcase (framework demo), Blog listing/detail, Docs listing/detail, 404
- **DX Tools**: ESLint flat config, Prettier with Astro plugin, commitlint, Husky, lint-staged, EditorConfig
- **AI Instructions**: GitHub Copilot (.github/copilot-instructions.md) and Cursor (.cursorrules)
- **Path Aliases**: @core, @lib, @components, @layouts, @stores, @i18n, @styles, @content
- **Type Safety**: Strict TypeScript, Zod schemas, typed i18n keys
- **CI/CD**: GitHub Actions workflows for CI checks and GitHub Pages deployment
