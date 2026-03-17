# Aisar Labs Site — Design Spec

## Overview

A standalone multi-page website for Aisar Labs — the open source and research arm of Aisar. Showcases the ZeptoStack ecosystem of autonomous agent infrastructure projects. Deployed as a separate Cloudflare Pages project, served at `aisar.ai/labs` via a Cloudflare Worker proxy.

## Goals

- Present Aisar Labs and the ZeptoStack ecosystem professionally
- Provide dedicated pages for each project with quickstart, features, and architecture
- Host a technical blog (MDX) for project announcements and engineering posts
- Strong SEO via static site generation (SSG)
- Match the aisar.ai visual identity with subtle technical/dev-focused touches

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React Router 7 (SSG mode) | User preference; built-in SSG support via `--prerender` |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | Matches aisar.ai, modern Tailwind |
| Components | shadcn/ui (Radix primitives) | Matches aisar.ai component library |
| Animation | Framer Motion | Matches aisar.ai animation system |
| Icons | Lucide React | Matches aisar.ai |
| Blog | MDX via `@mdx-js/rollup` with `remark-frontmatter`, `remark-mdx-frontmatter` | Same MDX pipeline as zeptostack blog system |
| Fonts | Geist Sans + Geist Mono via Google Fonts (`next/font/google` equivalent: `<link>` tags in root.tsx) | Matches aisar.ai layout.tsx; Google Fonts for simplicity |
| Build | Vite | Bundled with React Router 7 |
| Deploy | Cloudflare Pages (static) | Same platform as other projects |
| Routing | Cloudflare Worker proxies `aisar.ai/labs/*` | Integrates with existing aisar.ai domain |

## Pages & Routes

All routes are prefixed with `/labs` via React Router 7's `basename` config.

### `/labs` — Home

Sections (top to bottom):
1. **Navbar** — Aisar Labs logo, nav links (Home, Projects, Blog), "← aisar.ai" back link
2. **Hero** — Badge ("Open Source Infrastructure"), heading with gradient text, subtitle, two CTAs (Explore Projects, GitHub)
3. **Ecosystem Grid** — 5 project cards in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile). Each card: icon, name, tagline, accent color border, link to project page
4. **Latest Blog Posts** — 2-3 most recent posts as cards with date, title, excerpt
5. **Footer** — Copyright, social links, "Made with ♥ in Malaysia"

### `/labs/:project` — Project Pages

One page per project: `zeptoclaw`, `r8r`, `zeptopm`, `zeptort`, `zeptocapsule`.

Project data is defined in a shared data file (`app/data/projects.ts`), not fetched from an API.

Sections:
1. **Navbar** (shared)
2. **Project Hero** — Status badge, project name (large), tagline (monospace, accent color), description, CTAs (GitHub, Website if applicable)
3. **Quickstart** — Terminal-style code block with install/run commands
4. **Features Grid** — Responsive grid of feature cards (2-col desktop, 1-col mobile) with title and description. Projects may have 3-6 features; the grid accommodates variable counts.
5. **Architecture** — A layered stack diagram built with styled divs (same pattern as the ZeptoStack site's layer visualization). Each layer is a colored bordered row showing the component name and its role. Not an image — a code-based component reusable across project pages.
6. **Related Projects** — Cards linking to other ZeptoStack projects
7. **Footer** (shared)

### `/labs/blog` — Blog Listing

Sections:
1. **Navbar** (shared)
2. **Heading** — "Blog" title
3. **Post List** — Vertical list of post cards, each with: date (monospace), title, excerpt, optional tags. Sorted by date descending.
4. **Footer** (shared)

### `/labs/blog/:slug` — Blog Post

Sections:
1. **Navbar** (shared)
2. **Post Header** — Date, reading time estimate, title
3. **MDX Content** — Rendered with styled components (headings, paragraphs, code blocks, links, lists, blockquotes). Code blocks use terminal styling.
4. **Post Footer** — Back to blog link, related posts (optional)
5. **Footer** (shared)

## Project Data Structure

```typescript
// app/data/projects.ts
import type { LucideIcon } from 'lucide-react'
import { Cpu, Workflow, Layers, Server, Box } from 'lucide-react'

interface Project {
  slug: string           // URL slug: 'zeptoclaw', 'r8r', etc.
  name: string           // Display name: 'ZeptoClaw'
  tagline: string        // Short description
  description: string    // Full paragraph description
  icon: LucideIcon       // Direct Lucide component reference (e.g. Cpu, Workflow)
  color: string          // Tailwind accent color class: 'teal-400', 'amber-400', etc.
  status: 'Active' | 'Experimental'
  github: string         // GitHub URL
  url?: string           // Website URL (optional)
  features: Array<{ title: string; description: string }>  // Variable count, grid is responsive
  quickstart: string[]   // Terminal commands
}
```

## Blog System

MDX files in `content/blog/*.mdx` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2026-03-17"
excerpt: "Short description for listing."
author: "Author Name"
tags: ["zeptostack", "architecture"]
---
```

Blog utilities in `app/lib/blog.ts`:
- `getAllPosts()` — returns all posts sorted by date, each with `{ slug, frontmatter }`
- `getPostBySlug(slug)` — returns `{ slug, frontmatter }` (metadata only)
- `getPostContent(slug)` — returns the MDX `ComponentType` for rendering (separate from metadata, avoids serialization issues in loaders)
- Uses `import.meta.glob` with `eager: true` to load MDX at build time

Reading time is calculated from the raw MDX content using a simple `Math.ceil(wordCount / 200)` formula in `getAllPosts()` and `getPostBySlug()`, returned as `frontmatter.readingTime` (number of minutes).

Styled MDX components in `app/lib/mdx-components.tsx` with terminal-style code blocks.

## Design System

### Colors (CSS Variables, HSL)

Inherited from aisar.ai with dark mode as default:

```
--background: 220 14% 8%         (#101217)
--foreground: 210 40% 98%        (off-white)
--card: 224 22% 13%              (#1B1F27)
--primary: 166 70% 51%           (#29DBB1 teal)
--primary-foreground: 220 14% 8% (dark on teal)
--muted-foreground: 210 14% 69%  (#A0AEC0)
--border: 215 19% 23%            (#2D3748)
```

Per-project accent colors (used on project pages and cards):
- ZeptoClaw: `teal-400` (#2dd4bf)
- ZeptoR8R: `amber-400` (#f59e0b)
- ZeptoPM: `purple-400` (#a855f7)
- ZeptoRT: `emerald-400` (#34d399)
- ZeptoCapsule: `blue-400` (#60a5fa)

### Typography

- Headings: Geist Sans, extrabold
- Body: Geist Sans, regular
- Code/monospace accents: Geist Mono
- Hero: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Section headings: `text-3xl md:text-4xl`

### Components

- **Buttons:** shadcn/ui Button with `rounded-full`, primary and outline variants
- **Cards:** `bg-card rounded-2xl border border-border` with hover border glow per accent color
- **Code blocks:** Dark terminal style (`bg-[#0d1117]`, monospace, border)
- **Badges:** `rounded-full border border-primary/30 bg-primary/5` with monospace text
- **Feature tags:** `rounded-full border border-border text-[11px]`

### Animation

Framer Motion patterns matching aisar.ai:
- `initial={{ opacity: 0, y: 20 }}` → `animate/whileInView={{ opacity: 1, y: 0 }}`
- Staggered delays: `delay: index * 0.08`
- Hover lifts: `whileHover={{ y: -5 }}`
- Viewport-triggered: `viewport={{ once: true }}`

### Technical Touches (differentiating from aisar.ai)

- Monospace accents on taglines, dates, badges
- Terminal-style code blocks for quickstart sections
- Subtle grid background: `bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]`
- Per-project accent color borders and glows on cards

## File Structure

```
aisar-labs/
├── app/
│   ├── root.tsx                    # Root layout (HTML shell, meta, fonts)
│   ├── routes.ts                   # Route config
│   ├── routes/
│   │   ├── home.tsx                # /labs — landing page
│   │   ├── project.tsx             # /labs/:project — project detail
│   │   ├── blog.tsx                # /labs/blog — blog listing
│   │   └── blog-post.tsx           # /labs/blog/:slug — blog post
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── BlogPostCard.tsx
│   │   └── ui/                     # shadcn/ui components
│   │       └── button.tsx
│   ├── data/
│   │   └── projects.ts             # Project definitions
│   ├── lib/
│   │   ├── blog.ts                 # Blog utilities
│   │   └── mdx-components.tsx      # Styled MDX components
│   └── styles/
│       └── app.css                 # Global styles + Tailwind + CSS variables
├── content/
│   └── blog/
│       └── hello-world.mdx         # Starter blog post
├── public/
│   └── (static assets)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── react-router.config.ts          # SSG prerender config
├── wrangler.toml                   # Cloudflare Pages config
└── CLAUDE.md
```

## Deployment Architecture

### Aisar Labs Site (new)
- Cloudflare Pages project: `aisar-labs`
- Static files from build output
- Vite `base` is set to `/labs/` so all asset paths (JS, CSS) are emitted under `/labs/assets/`
- React Router 7 `basename` is set to `/labs`
- The built output contains files like `labs/index.html`, `labs/assets/main.js`, etc.

### Cloudflare Worker Proxy (new)
- Intercepts all `aisar.ai/labs/*` requests (including `aisar.ai/labs/assets/*` for static assets)
- Forwards the **full path including `/labs`** to `aisar-labs.pages.dev` — the Worker does NOT strip the prefix
- Example: `aisar.ai/labs/blog/hello` → `aisar-labs.pages.dev/labs/blog/hello`
- Example: `aisar.ai/labs/assets/main.js` → `aisar-labs.pages.dev/labs/assets/main.js`
- All other `aisar.ai/*` requests pass through to the existing landing site unchanged

### Wrangler Config

```toml
# wrangler.toml
name = "aisar-labs"
compatibility_date = "2024-11-22"
pages_build_output_dir = "./build/client"
```

### Prerendering
- All routes are statically prerendered at build time
- Blog post routes are auto-discovered from `content/blog/` directory
- Project routes are generated from the projects data array
- Config in `react-router.config.ts`:

```typescript
import { readdirSync } from 'node:fs'
import { type Config } from '@react-router/dev/config'

export default {
  ssr: false,
  basename: '/labs',
  async prerender() {
    // Read blog slugs from content directory at build time
    const blogFiles = readdirSync('content/blog')
      .filter(f => f.endsWith('.mdx'))
      .map(f => f.replace('.mdx', ''))

    const projectSlugs = ['zeptoclaw', 'r8r', 'zeptopm', 'zeptort', 'zeptocapsule']

    return [
      '/',
      ...projectSlugs.map(s => `/${s}`),
      '/blog',
      ...blogFiles.map(s => `/blog/${s}`),
    ]
  }
} satisfies Config
```

Note: Routes in the `prerender()` array are relative to `basename`. React Router 7 prepends `/labs` automatically.

## SEO

Each page defines meta tags via React Router 7's `meta` export:
- `title`, `description`
- `og:title`, `og:description`, `og:image`, `og:url`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

Blog posts pull meta from MDX frontmatter.

OG images: A single static `og-image.png` in `public/labs/` is used as the default for all pages. Individual project or blog OG images are out of scope for v1 — can be added later per-page.

## Out of Scope

- Authentication / login
- CMS or admin panel
- Comments on blog posts
- Search functionality
- RSS feed (could be added later)
- Dark/light mode toggle (dark mode only, matching the technical identity)
