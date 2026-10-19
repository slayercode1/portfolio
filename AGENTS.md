# Project instructions

## Package manager

- Always use Bun as the package manager and script runner for this repository.
- Use `bun install`, `bun add`, `bun remove`, `bun run`, and `bunx` instead of npm, Yarn, or pnpm equivalents.
- Only use another package manager when the user explicitly requests or specifies it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
