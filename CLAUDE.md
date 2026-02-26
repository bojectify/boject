# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript monorepo (`@boject`) managed by Nx 22.x with pnpm. Contains 3 publishable NPM packages and 1 private shared library under `packages/`.

| Package | Tag | Published | Description |
|---|---|---|---|
| `@boject/strings` | `scope:strings` | Yes | String manipulation (slugify, capitalize) |
| `@boject/async` | `scope:async` | Yes | Async retry utilities |
| `@boject/colors` | `scope:colors` | Yes | Color conversion/manipulation |
| `@boject/utils` | `scope:shared` | No | Shared type validation (private) |

## Commands

Always use `pnpm nx` (never a global `nx` install).

```bash
# Build / Test / Lint a single project
pnpm nx build strings
pnpm nx test async
pnpm nx lint colors
pnpm nx typecheck strings

# Run across all projects
pnpm nx run-many -t build
pnpm nx run-many -t lint test build typecheck

# Only affected projects
pnpm nx affected -t test

# Format
pnpm nx format:check
pnpm nx format:write

# Release (dry run)
pnpm nx release --dry-run
```

Nx project names are the bare package names (e.g. `strings`, not `@boject/strings`). Verify with `pnpm nx show projects`.

## Architecture

### Module Boundaries

Enforced via `@nx/enforce-module-boundaries` in the root `eslint.config.mjs`:

- `scope:shared` (utils) — cannot import any other workspace package
- `scope:strings`, `scope:async`, `scope:colors` — can only import from `scope:shared`

Cross-package imports between strings/async/colors are forbidden. Run `pnpm nx lint <project>` to verify.

### TypeScript Setup

- **Project references** wired through root `tsconfig.json` → per-package `tsconfig.lib.json`
- **Custom condition `@boject/source`** in `tsconfig.base.json` enables importing TypeScript source directly during development (no build step needed). Each package.json exports map includes `"@boject/source": "./src/index.ts"`.
- Build output goes to `packages/<name>/dist/`
- Module: `nodenext`, Target: `es2022`, strict mode enabled

### Testing

- **Vitest** via `@nx/vitest` plugin. Config per-package in `vite.config.ts`.
- Workspace-level config in `vitest.workspace.ts`
- Test files: `src/**/*.{test,spec}.{ts,js,...}`
- Coverage: v8 provider → `./test-output/vitest/coverage`
- Note: `utils` package has no tests

### Build Pipeline

- `build` target uses `tsc` via `@nx/js/typescript` plugin
- `strings` has an extra `build-base` target that runs before `build`
- `test` depends on `^build` (dependencies are built first)

### Nx Config

- All project configuration lives in each `package.json` under the `"nx"` field — there are no `project.json` files
- Nx plugins (`@nx/js/typescript`, `@nx/vite/plugin`, `@nx/eslint/plugin`) infer targets automatically
- Release excludes `utils` (configured in `nx.json` → `release.projects: ["!utils"]`)

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

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

<!-- nx configuration end-->
