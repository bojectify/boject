# Nx TypeScript Repository

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ A repository showcasing key [Nx](https://nx.dev) features for TypeScript monorepos ✨

## Finish your Nx platform setup

🚀 [Finish setting up your workspace](https://cloud.nx.app/connect/RL2o0S0pYZ) to get faster builds with remote caching, distributed task execution, and self-healing CI. [Learn more about Nx Cloud](https://nx.dev/ci/intro/why-nx-cloud).

## 📦 Project Overview

This repository demonstrates a production-ready TypeScript monorepo with:

- **3 Publishable Packages** - Ready for NPM publishing
  - `@boject/strings` - String manipulation utilities
  - `@boject/async` - Async utility functions with retry logic
  - `@boject/colors` - Color conversion and manipulation utilities

- **1 Internal Library**
  - `@boject/utils` - Shared utilities (private, not published)

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-fork-url>
cd typescript-template

# Install dependencies
npm install

# Build all packages
pnpm nx run-many -t build

# Run tests
pnpm nx run-many -t test

# Lint all projects
pnpm nx run-many -t lint

# Run everything in parallel
pnpm nx run-many -t lint test build --parallel=3

# Visualize the project graph
pnpm nx graph
```

## ⭐ Featured Nx Capabilities

This repository showcases several powerful Nx features:

### 1. 🔒 Module Boundaries

Enforces architectural constraints using tags. Each package has specific dependencies it can use:

- `scope:shared` (utils) - Can be used by all packages
- `scope:strings` - Can only depend on shared utilities
- `scope:async` - Can only depend on shared utilities
- `scope:colors` - Can only depend on shared utilities

**Try it out:**

```bash
# See the current project graph and boundaries
pnpm nx graph

# View a specific project's details
pnpm nx show project strings --web
```

[Learn more about module boundaries →](https://nx.dev/features/enforce-module-boundaries)

### 2. 🛠️ Custom Run Commands

Packages can define custom commands beyond standard build/test/lint:

```bash
# Run the custom build-base command for strings package
pnpm nx run strings:build-base

# See all available targets for a project
pnpm nx show project strings
```

[Learn more about custom run commands →](https://nx.dev/concepts/executors-and-configurations)

### 3. 🔧 Self-Healing CI

The CI pipeline includes `nx fix-ci` which automatically identifies and suggests fixes for common issues. To test it, you can make a change to `async-retry.spec.ts` so that it fails, and create a PR.

```bash
# Run tests and see the failure
pnpm nx test async

# In CI, this command provides automated fixes
pnpm nx fix-ci
```

[Learn more about self-healing CI →](https://nx.dev/ci/features/self-healing-ci)

### 4. 📦 Package Publishing

Manage releases and publishing with Nx Release:

```bash
# Dry run to see what would be published
pnpm nx release --dry-run

# Version and release packages
pnpm nx release

# Publish only specific packages
pnpm nx release publish --projects=strings,colors
```

[Learn more about Nx Release →](https://nx.dev/features/manage-releases)

## 📁 Project Structure

```
├── packages/
│   ├── strings/     [scope:strings] - String utilities (publishable)
│   ├── async/       [scope:async]   - Async utilities (publishable)
│   ├── colors/      [scope:colors]  - Color utilities (publishable)
│   └── utils/       [scope:shared]  - Shared utilities (private)
├── nx.json          - Nx configuration
├── tsconfig.json    - TypeScript configuration
└── eslint.config.mjs - ESLint with module boundary rules
```

## 🏷️ Understanding Tags

This repository uses tags to enforce module boundaries:

| Package           | Tag             | Can Import From        |
| ----------------- | --------------- | ---------------------- |
| `@boject/utils`   | `scope:shared`  | Nothing (base library) |
| `@boject/strings` | `scope:strings` | `scope:shared`         |
| `@boject/async`   | `scope:async`   | `scope:shared`         |
| `@boject/colors`  | `scope:colors`  | `scope:shared`         |

The ESLint configuration enforces these boundaries, preventing circular dependencies and maintaining clean architecture.

## 🧪 Testing Module Boundaries

To see module boundary enforcement in action:

1. Try importing `@boject/colors` into `@boject/strings`
2. Run `pnpm nx lint strings`
3. You'll see an error about violating module boundaries

## 📚 Useful Commands

```bash
# Project exploration
pnpm nx graph                                    # Interactive dependency graph
pnpm nx list                                     # List installed plugins
pnpm nx show project strings --web              # View project details

# Development
pnpm nx build strings                           # Build a specific package
pnpm nx test async                              # Test a specific package
pnpm nx lint colors                             # Lint a specific package

# Running multiple tasks
pnpm nx run-many -t build                       # Build all projects
pnpm nx run-many -t test --parallel=3          # Test in parallel
pnpm nx run-many -t lint test build            # Run multiple targets

# Affected commands (great for CI)
pnpm nx affected -t build                       # Build only affected projects
pnpm nx affected -t test                        # Test only affected projects

# Release management
pnpm nx release --dry-run --first-release      # Preview first release
pnpm nx release --first-release                # Create first release
pnpm nx release --dry-run                       # Preview release changes
pnpm nx release                                 # Create a new release
```

## Nx Cloud

Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔗 Learn More

- [Nx Documentation](https://nx.dev)
- [Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Custom Commands](https://nx.dev/concepts/executors-and-configurations)
- [Self-Healing CI](https://nx.dev/ci/features/self-healing-ci)
- [Releasing Packages](https://nx.dev/features/manage-releases)
- [Nx Cloud](https://nx.dev/ci/intro/why-nx-cloud)

## 💬 Community

Join the Nx community:

- [Discord](https://go.nx.dev/community)
- [X (Twitter)](https://twitter.com/nxdevtools)
- [LinkedIn](https://www.linkedin.com/company/nrwl)
- [YouTube](https://www.youtube.com/@nxdevtools)
- [Blog](https://nx.dev/blog)
