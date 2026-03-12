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
│       └── index.css             # Global styles + Tailwind v4
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

The current monolithic `App.tsx` (~678 lines) is split into:

- **`__root.tsx`** — HTML shell (`<html>`, `<head>`, `<body>`), background effects, imports global CSS
- **`Navbar.tsx`** — Site navigation with route-aware links (TanStack Router `<Link>`)
- **`Footer.tsx`** — Site footer
- **`ParticleBackground.tsx`** — Canvas particle animation with mouse tracking
- **`routes/index.tsx`** — All landing page sections (hero, why, stack, vision, CTA) plus the product/stack data arrays

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

- `getAllPosts()` — Scans `content/blog/`, parses frontmatter, returns sorted post list
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

## Static Prerendering

All routes are prerendered at build time in `app.config.ts`:

- `/` — Always prerendered
- `/blog` — Always prerendered
- `/blog/:slug` — Dynamically discovered by scanning `content/blog/*.mdx` filenames

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

### Keep

- `react`, `react-dom` — Core
- `motion` — Animations
- `lucide-react` — Icons
- `tailwindcss`, `@tailwindcss/vite` — Styling
- `typescript`, `tsx` — Dev tooling

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
