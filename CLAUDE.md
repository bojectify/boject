# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React component library monorepo (`@boject`) managed by Nx 22.x with pnpm. Contains 4 publishable NPM packages under `packages/`.

| Package                     | Tag                       | Description                                           |
| --------------------------- | ------------------------- | ----------------------------------------------------- |
| `@boject/react-store`       | `scope:react-store`       | useReducer + Context with Vuex-style computed getters |
| `@boject/react-store-async` | `scope:react-store-async` | Async fetch helpers (REQUEST/SUCCESS/ERROR pattern)   |
| `@boject/react-reveal`      | `scope:react-reveal`      | CSS animation wrapper (fade/slide, RSC-compatible)    |
| `@boject/react-carousel`    | `scope:react-carousel`    | CSS-only scroll-snap carousel (RSC-compatible)        |

## Commands

Always use `pnpm nx` (never a global `nx` install). Never use `npx` — use `pnpx` instead.

```bash
# Build / Test / Lint / Typecheck a single project
pnpm nx build @boject/react-store
pnpm nx test @boject/react-reveal
pnpm nx lint @boject/react-carousel
pnpm nx typecheck @boject/react-store-async

# Stylelint (react-carousel and react-reveal only)
pnpm nx stylelint @boject/react-carousel

# Run across all projects
pnpm nx run-many -t build
pnpm nx run-many -t lint test build typecheck

# Only affected projects
pnpm nx affected -t test

# Format
pnpm nx format:check
pnpm nx format:write

# Storybook (react-carousel and react-reveal only)
pnpm nx storybook @boject/react-carousel
pnpm nx storybook @boject/react-reveal

# Storybook interaction tests (runs play functions in headless Chromium)
pnpm nx test-storybook @boject/react-carousel
pnpm nx run-many -t test-storybook

# Release (dry run)
pnpm nx release --dry-run

# Local registry (Verdaccio)
pnpm nx local-registry
```

Nx project names include the scope (e.g. `@boject/react-store`). Verify with `pnpm nx show projects`.

## Architecture

### Module Boundaries

Enforced via `@nx/enforce-module-boundaries` in the root `eslint.config.mjs`:

- `scope:react-store-async` — can import from `scope:react-store`
- `scope:react-store`, `scope:react-reveal`, `scope:react-carousel` — independent, no cross-package deps

Run `pnpm nx lint <project>` to verify.

### Build Tooling

- **tsup** bundles all packages (ESM-only, with TypeScript declarations)
- Component packages (react-reveal, react-carousel) use `injectStyle: true` so CSS is injected at runtime — no separate CSS import needed for consumers
- `@nx/js/typescript` plugin handles `typecheck` target only (not builds)
- `@nx/vite/plugin` target names are prefixed with `vite-` to avoid conflicts with custom tsup build targets

### TypeScript Setup

- **Project references** wired through root `tsconfig.json` → per-package `tsconfig.lib.json`
- **Custom condition `@boject/source`** in `tsconfig.base.json` enables importing TypeScript source directly during development (no build step needed). Each package.json exports map includes `"@boject/source": "./src/index.ts"`.
- **JSX**: `react-jsx` (automatic runtime)
- Build output goes to `packages/<name>/dist/`
- Module: `nodenext`, Target: `es2022`, strict mode enabled

### CSS Strategy

- Plain CSS (not CSS Modules) with `boject-` prefixed class names (BEM convention)
- Components import their own CSS (e.g. `import './Carousel.css'`), which tsup injects at runtime via `injectStyle: true`
- CSS custom properties provide theming API (e.g. `--boject-reveal-duration`, `--boject-carousel-gap`)
- CSS custom properties are also exposed as typed React props on component packages (e.g. `<Carousel gap="32px" slideWidth="80%">`)
- **Stylelint** enforces CSS standards via `stylelint-config-standard` with BEM class naming and allowances for cutting-edge CSS features (scroll-button, scroll-marker, anchor positioning)

### Testing

- **Vitest** via `@nx/vitest` plugin. Config per-package in `vite.config.ts`.
- **@testing-library/react** for component packages (jsdom environment)
- **Node environment** for store-async (pure functions, no DOM)
- Workspace-level config in `vitest.workspace.ts` (scoped to `packages/*`; plain array export, no `defineWorkspace`)
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Coverage: v8 provider → `./test-output/vitest/coverage`
- **Storybook interaction tests** via `@storybook/addon-vitest` with Playwright browser mode. Stories with `play` functions run as real browser tests via the `test-storybook` Nx target (`vitest run --project storybook`). The `test` target depends on `test-storybook` so `pnpm nx run-many -t test` runs both unit and storybook tests.

### Storybook

- **Storybook 10.3** configured on react-carousel and react-reveal via `@nx/storybook` plugin
- Stories co-located with components: `src/*.stories.tsx`
- Uses `@storybook/react-vite` framework with `@vitejs/plugin-react`
- `@storybook/addon-vitest` enables running story `play` functions as Vitest browser tests (headless Chromium via Playwright)
- Storybook test projects are defined inline in each package's `vite.config.ts` via `test.projects` (alongside the unit test project)

### Nx Config

- All project configuration lives in each `package.json` under the `"nx"` field — there are no `project.json` files
- Nx plugins (`@nx/js/typescript`, `@nx/vite/plugin`, `@nx/eslint/plugin`, `@nx/vitest`, `@nx/storybook/plugin`) infer targets automatically
- Release excludes root package (configured in `nx.json` → `release.projects: ["!@boject/source"]`)
- `preserveMatchingDependencyRanges` is disabled in release config to allow prerelease versions
- `test` depends on `^build` (dependencies are built first) and `test-storybook` (storybook interaction tests run first)

### Git Hooks (Lefthook)

- **pre-commit**: lint + stylelint + format check (affected, uncommitted)
- **pre-push**: test + typecheck + build (affected, vs origin/main)

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

### Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

### When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
