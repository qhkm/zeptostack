# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

ZeptoStack is a product landing page and blog for AISAR's autonomous agent infrastructure. Built with TanStack Start, it's a statically prerendered site deployed to Cloudflare Pages.

## Commands

```bash
pnpm dev          # Start dev server on port 3000
pnpm build        # Production build (client + server + prerender)
pnpm preview      # Preview production build locally
pnpm deploy       # Build and deploy to Cloudflare Pages
pnpm lint         # Type-check with tsc --noEmit
pnpm clean        # Remove dist and .output directories
```

## Architecture

**TanStack Start + Vite 7** with static prerendering. All pages are rendered to HTML at build time — there is no dynamic server rendering in production.

### Routing

File-based routing under `app/routes/`. TanStack Router auto-generates `app/routeTree.gen.ts` — never edit this file manually.

- `app/routes/__root.tsx` — HTML shell (`<html>`, `<head>`, `<body>`), global layout, 404 component
- `app/routes/index.tsx` — Landing page with all marketing sections
- `app/routes/products.tsx` — Products showcase grid
- `app/routes/blog/index.tsx` — Blog listing page
- `app/routes/blog/$slug.tsx` — Dynamic blog post page

Routes use `createFileRoute` and define `loader` functions for data fetching (required for prerendering). The blog post route throws `notFound()` in its loader for missing slugs.

### Entry Points

TanStack Start v1.166 expects specific exports:

- `app/router.tsx` — Must export `getRouter()` (not `createRouter`) — this is the `RouterEntry` interface contract
- `app/client.tsx` — Client hydration entry
- `app/ssr.tsx` — SSR handler using `createStartHandler`

### Blog System

MDX files live in `content/blog/*.mdx` with YAML frontmatter (title, date, excerpt, author). Blog utilities in `app/lib/blog.ts` use `import.meta.glob` with `eager: true` to load all posts. Styled MDX components are in `app/lib/mdx-components.tsx`.

Prerender routes for blog posts are auto-discovered from the `content/blog/` directory in `vite.config.ts`.

### Adding a Blog Post

Create `content/blog/<slug>.mdx` with frontmatter. The post is automatically discovered for both the blog listing and prerendering — no config changes needed.

## Key Conventions

- **Path alias**: `~/` maps to `./app/` (configured in tsconfig.json)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Custom animations defined in `app/styles/index.css`.
- **Animations**: Motion library (`motion/react`) for component animations
- **Navigation**: Navbar uses `<a href="/#section">` for same-page anchors, `<Link>` for route navigation
- **Design**: Dark theme, teal primary (#06b6d4), Geist + Space Mono + JetBrains Mono fonts

## Known Workarounds

A pnpm patch on `@tanstack/start-plugin-core` forces `process.exit(0)` after prerendering completes, working around a hang bug where the build process never terminates. See `patches/@tanstack__start-plugin-core.patch`.

## Deployment

Static files deploy to Cloudflare Pages from `dist/client/`. Config in `wrangler.toml`.
