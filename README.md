# @boject

Open source React component library monorepo, managed by [Nx](https://nx.dev) with pnpm.

## Packages

| Package                                                   | Description                                                | RSC-Compatible |
| --------------------------------------------------------- | ---------------------------------------------------------- | -------------- |
| [`@boject/react-store`](packages/react-store)             | useReducer + Context with Vuex-style computed getters      | No (client)    |
| [`@boject/react-store-async`](packages/react-store-async) | Async fetch helpers (REQUEST/SUCCESS/ERROR)                | No (client)    |
| [`@boject/react-reveal`](packages/react-reveal)           | CSS animation wrapper (fade + slide)                       | Yes            |
| [`@boject/react-carousel`](packages/react-carousel)       | CSS-only scroll-snap carousel with progressive enhancement | Yes            |

## Getting Started

**Prerequisites:** Node.js 20+, pnpm

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm nx run-many -t build

# Run tests
pnpm nx run-many -t test

# Lint
pnpm nx run-many -t lint

# Typecheck
pnpm nx run-many -t typecheck

# Run everything
pnpm nx run-many -t lint test build typecheck
```

## Development

### Storybook

Visual development for component packages:

```bash
pnpm nx storybook @boject/react-carousel
pnpm nx storybook @boject/react-reveal
```

### Working on a single package

```bash
pnpm nx build @boject/react-store
pnpm nx test @boject/react-reveal
pnpm nx lint @boject/react-carousel
```

### Affected commands

Only run tasks for projects affected by your changes:

```bash
pnpm nx affected -t test
pnpm nx affected -t build
```

## Project Structure

```
packages/
  react-store/        @boject/react-store         — State management with computed getters
  react-store-async/  @boject/react-store-async   — Async fetch action helpers
  react-reveal/       @boject/react-reveal        — CSS animation wrapper
  react-carousel/     @boject/react-carousel      — CSS-only scroll-snap carousel
```

### Module Boundaries

- `react-store-async` can depend on `react-store`
- All other packages are independent

### Tech Stack

- **Nx 22.x** — monorepo tooling
- **pnpm** — package manager
- **TypeScript 5.9** — strict mode, nodenext module resolution
- **tsup** — ESM bundler for all packages
- **Vitest** — testing with @testing-library/react
- **Storybook 10** — component development (react-reveal, react-carousel)
- **Lefthook** — git hooks (lint + format on commit, test + build on push)
- **Prettier** — code formatting

## Publishing

```bash
# Dry run
pnpm nx release --dry-run

# Local testing with Verdaccio
pnpm nx local-registry
pnpm nx release publish --registry=http://localhost:4873

# Release to NPM
pnpm nx release
```

## License

MIT
