# Contributing

## Getting Started

```bash
git clone <repo-url>
cd astro
npm install
npm run dev
```

## Branch Strategy

- `main` — production branch, auto-deploys via GitHub Actions
- `develop` — integration branch for features
- `feat/*` — feature branches
- `fix/*` — bug fix branches
- `docs/*` — documentation changes

## Development Workflow

1. Create a branch from `develop`: `git checkout -b feat/my-feature develop`
2. Make your changes following the architecture rules
3. Run checks before committing:
   ```bash
   npm run check      # Astro type check
   npm run lint:fix   # ESLint
   npm run format     # Prettier
   ```
4. Commit using Conventional Commits format
5. Push and open a Pull Request against `develop`

## Commit Convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional-scope>): <description>

[optional body]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic changes) |
| `refactor` | Code restructuring (no feature/fix) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, or dependency changes |

### Examples

```
feat(blog): add pagination to blog listing
fix(i18n): resolve missing Turkish translations
docs: update deployment guide
refactor(stores): simplify theme store logic
chore(deps): update Astro to 5.18
```

## Architecture Rules

- **Layer dependencies flow downward only**: `pages → layouts → components → stores → lib → core`
- **Always use path aliases** (`@core/*`, `@lib/*`, etc.) for cross-layer imports
- **Framework components** must be placed in their designated folders:
  - React → `src/components/react/`
  - Preact → `src/components/preact/`
  - Solid → `src/components/solid/`
  - Svelte → `src/components/svelte/`
  - Vue → `src/components/vue/`

## Adding a New Component

### Static Astro Component

1. Create in `src/components/ui/` or `src/components/common/`
2. Define a `Props` interface
3. Use `cn()` for class merging

### Interactive Island Component

1. Create in the appropriate framework folder
2. Use Nano Stores for shared state (import `useStore`)
3. Reference in Astro pages with `client:visible` (preferred)

## Adding Content

### Blog Post

1. Create `src/content/blog/{slug}.md`
2. Include all required frontmatter fields (see `src/core/schemas/content.ts`)

### Documentation Page

1. Create `src/content/docs/{slug}.md`
2. Include title, description, section, and order in frontmatter

## Adding a New Locale

1. Add locale code to `astro.config.mjs` → `i18n.locales`
2. Create `src/i18n/locales/{locale}.json` matching all existing keys
3. Test all pages render correctly with the new locale

## Pull Request Checklist

- [ ] Code follows the layer dependency rules
- [ ] Path aliases used for cross-layer imports
- [ ] No `any` types — use `unknown` with type guards
- [ ] `npm run check` passes
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] New content has valid Zod frontmatter
- [ ] New translations added for all locales
