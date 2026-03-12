# ZeptoStack: TanStack Start Migration + Blog

## Overview

Migrate ZeptoStack from a single-page Vite + React app to TanStack Start with file-based routing, static prerendering, and an MDX-powered blog.

## Goals

- Type-safe file-based routing via TanStack Router
- Landing page served as a statically prerendered route (`/`)
- Blog system with MDX content (`/blog`, `/blog/:slug`)
- All routes prerendered at build time for Cloudflare Pages deployment
- Preserve all existing animations, styling, and visual design

## Project Structure

```
zeptostack/
├── app/
│   ├── routes/
│   │   ├── __root.tsx            # Root layout (HTML shell, shared nav/footer, global styles)
│   │   ├── index.tsx             # Landing page (/)
│   │   └── blog/
│   │       ├── index.tsx         # Blog listing (/blog)
│   │       └── $slug.tsx         # Blog post (/blog/:slug)
│   ├── components/
│   │   ├── ParticleBackground.tsx  # Canvas particle animation
│   │   ├── Navbar.tsx              # Site navigation
│   │   └── Footer.tsx              # Site footer
│   ├── lib/
│   │   └── blog.ts               # Blog utilities (frontmatter parsing, post listing)
│   ├── client.tsx                # TanStack Start client entry
│   ├── router.tsx                # Router configuration
│   ├── ssr.tsx                   # SSR entry point
│   └── styles/
│       └── index.css             # Global styles + Tailwind v4 + all custom animations
├── content/
│   └── blog/
│       └── hello-world.mdx       # Example blog post
├── app.config.ts                 # TanStack Start / Vinxi config
├── tsconfig.json
└── package.json
```

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `routes/index.tsx` | Landing page (current App.tsx content) |
| `/blog` | `routes/blog/index.tsx` | Blog listing — all posts with title, date, excerpt |
| `/blog/:slug` | `routes/blog/$slug.tsx` | Individual blog post — rendered MDX |

## Component Extraction

The current monolithic `App.tsx` (~658 lines) is split into:

- **`__root.tsx`** — HTML shell (`<html>`, `<head>`, `<body>`), background effects, imports global CSS. Page title: "ZeptoStack — Local-First Autonomous Infrastructure" (replaces the AI Studio placeholder). Font imports (`Geist`, `Space Mono`, `JetBrains Mono`) move from CSS `@import` to `<link>` tags in the `<head>` for better loading performance.
- **`Navbar.tsx`** — Site navigation. Uses plain `<a href="/#section">` for landing page anchor links (not TanStack Router `<Link>`) so they work correctly both on the landing page (smooth scroll) and from blog pages (navigate to landing page + scroll). Uses `<Link>` for actual route navigation (`/blog`).
- **`Footer.tsx`** — Site footer with AISAR branding
- **`ParticleBackground.tsx`** — Canvas particle animation with mouse tracking
- **`routes/index.tsx`** — All landing page sections (hero, why, stack, why-this-matters, vision, CTA) plus the `products`, `stackLayers`, and `visionStages` data arrays

## Styles Migration

The current `index.css` moves to `app/styles/index.css`. All custom CSS must be preserved:

- Custom keyframe animations: `scanline`, `pulse-slow`, `gradient-shift`, `grid-pan`, `shimmer`, `float`, `gradient-pan`
- Custom utility classes: `animate-scanline`, `animate-pulse-slow`, `animate-gradient-shift`, `animate-grid-pan`, `animate-float`, `hero-gradient`, `perspective-1000`
- Custom scrollbar styles (`::-webkit-scrollbar`)
- Smooth scroll behavior (`scroll-behavior: smooth`)
- Tailwind v4 `@theme` block with font-family definitions

Font `@import url(...)` statements are removed from CSS and replaced with `<link>` tags in `__root.tsx` `<head>`.

## Blog System

### Content Format

MDX files in `content/blog/` with YAML frontmatter:

```yaml
---
title: "Why We Built ZeptoStack"
date: "2026-03-12"
excerpt: "Most agent frameworks assume cloud-first. We think different."
author: "AISAR"
---
```

### MDX Pipeline

- **Compilation:** `@mdx-js/rollup` Vite plugin compiles `.mdx` to React components
- **Frontmatter:** `remark-frontmatter` + `remark-mdx-frontmatter` extract metadata
- **Components:** Custom MDX components map applies ZeptoStack dark theme styling to all rendered elements (headings, paragraphs, code blocks, links, lists)
- **Interactivity:** Blog posts can import any React component for interactive content

### Blog Utilities (`app/lib/blog.ts`)

- `getAllPosts()` — Scans `content/blog/`, parses frontmatter, returns sorted post list (newest first)
- `getPostBySlug(slug)` — Returns a single post's metadata and compiled MDX component
- Uses `import.meta.glob` to discover and load MDX files

### Data Loading

Each route uses `createFileRoute` with a `loader`:

- **`/blog`** — Loader calls `getAllPosts()`, returns post metadata array
- **`/blog/:slug`** — Loader calls `getPostBySlug(params.slug)`, returns post data + component

### Blog Listing Page Design

- Dark theme consistent with landing page
- Grid/list of post cards with: title, date, excerpt
- Same border/glow card style as product cards on landing page
- Links to individual posts via `<Link to="/blog/$slug">`

### Blog Post Page Design

- Max-width prose container (~720px) for comfortable reading
- Styled markdown elements matching site typography (Geist body, Space Mono for code)
- Dark background, light text, teal accents for links and headings
- Back link to `/blog`

## SEO & Meta Tags

- **`__root.tsx`** includes default `<title>` and `<meta name="description">` for the site
- **Blog post route** sets per-post `<title>` and `<meta name="description">` using the frontmatter `title` and `excerpt` fields
- **Blog listing** sets its own title: "Blog — ZeptoStack"
- Open Graph tags (`og:title`, `og:description`) set per route for social sharing

## Error & 404 Handling

- **Root level:** `notFoundComponent` in the router config renders a styled 404 page matching the site's dark theme
- **Blog post route:** If `getPostBySlug()` returns no match, throw a `notFound()` error to trigger the 404 page
- **Unknown routes:** Caught by the root `notFoundComponent`

## Static Prerendering

All routes are prerendered at build time in `app.config.ts`:

- `/` — Always prerendered
- `/blog` — Always prerendered
- `/blog/:slug` — Dynamically discovered by scanning `content/blog/*.mdx` filenames

Example `app.config.ts` skeleton:

```ts
import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { readdirSync } from 'node:fs'

const blogSlugs = readdirSync('content/blog')
  .filter(f => f.endsWith('.mdx'))
  .map(f => f.replace('.mdx', ''))

export default defineConfig({
  vite: {
    plugins: [
      mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    ],
  },
  server: {
    prerender: {
      routes: [
        '/',
        '/blog',
        ...blogSlugs.map(slug => `/blog/${slug}`),
      ],
    },
  },
})
```

Output is fully static HTML, deployable to Cloudflare Pages or any static host.

## Dependencies

### Add

- `@tanstack/react-start` — Framework
- `@tanstack/react-router` — Router
- `vinxi` — Server/build layer
- `@mdx-js/rollup` — MDX compilation
- `remark-frontmatter` — Frontmatter parsing
- `remark-mdx-frontmatter` — Expose frontmatter as exports
- `gray-matter` — Frontmatter parsing for blog utilities

### Remove

- `@vitejs/plugin-react` — TanStack Start handles React
- `express` — Unused
- `better-sqlite3` — Unused
- `@google/genai` — Unused
- `dotenv` — Unused
- `@types/express` — Unused (follows express removal)
- `autoprefixer` — Tailwind v4 handles vendor prefixing internally

### Keep

- `react`, `react-dom` — Core
- `motion` — Animations
- `lucide-react` — Icons
- `tailwindcss`, `@tailwindcss/vite` — Styling
- `typescript`, `tsx` — Dev tooling
- `@types/node` — Needed by TanStack Start / Vinxi

## Files Removed

- `src/main.tsx` — Replaced by `app/client.tsx`
- `src/App.tsx` — Split into routes + components
- `src/index.css` — Moved to `app/styles/index.css`
- `index.html` — Replaced by `__root.tsx` (TanStack Start manages HTML)
- `vite.config.ts` — Replaced by `app.config.ts`
- `metadata.json` — AI Studio artifact, no longer needed
- `.env.example` — No environment variables needed

## Migration Risk

**Low.** The current app is a single page with no routing, no API calls, no auth, no database. The migration is primarily structural: moving content into the right files and adding the TanStack Start boilerplate.

## Example Blog Post

`content/blog/hello-world.mdx`:

```mdx
---
title: "Hello World"
date: "2026-03-12"
excerpt: "The first post on the ZeptoStack blog."
author: "AISAR"
---

# Hello World

This is the first post on the ZeptoStack blog.

We built ZeptoStack because most workflow and agent platforms were designed for server-centric automation.

We think the next era is different.
```
