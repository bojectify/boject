---
name: Use pnpm not npm
description: Always use pnpm for package management commands, never npm
type: feedback
---

Use `pnpm` for all package management commands (install, view, add, etc.), never `npm`.

**Why:** User preference — this is a pnpm workspace and they want consistency.

**How to apply:** Any time you need to run a package manager command, use pnpm. This includes `pnpm view`, `pnpm add`, `pnpm install`, etc.
