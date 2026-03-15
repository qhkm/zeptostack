# ZeptoStack

A lightweight, secure, local-first stack for running autonomous agents reliably.

**Live site:** https://zeptostack.com

## Ecosystem

| Project | Description | GitHub |
|---------|-------------|--------|
| [ZeptoClaw](https://zeptoclaw.com) | Ultra-lightweight AI agent runtime (~6MB binary) | [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw) |
| r8r | Agent-native workflow automation engine | [qhkm/r8r](https://github.com/qhkm/r8r) |
| ZeptoPM | Process manager for AI agents | [qhkm/zeptopm](https://github.com/qhkm/zeptopm) |
| ZeptoRT | Durable turn-based process runtime | [qhkm/zeptort](https://github.com/qhkm/zeptort) |
| ZeptoCapsule | Isolation sandbox for AI agents | [qhkm/zeptocapsule](https://github.com/qhkm/zeptocapsule) |

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (v1.166) with file-based routing
- **Rendering:** Static Site Generation (SSG) via prerendering
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Blog:** MDX with `@mdx-js/rollup`, `remark-frontmatter`, `remark-mdx-frontmatter`
- **Animations:** [Motion](https://motion.dev/) (motion/react)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) (static deployment, no Workers)
- **Build:** [Vite 7](https://vite.dev/)

## Project Structure

```
app/
  routes/
    __root.tsx          # Root layout (HTML shell, fonts, 404)
    index.tsx           # Landing page
    products.tsx        # Products showcase grid
    blog/
      index.tsx         # Blog listing
      $slug.tsx         # Blog post (dynamic route)
  components/
    Navbar.tsx
    Footer.tsx
    ParticleBackground.tsx
  lib/
    blog.ts             # Blog utilities (getAllPosts, getPostBySlug)
    mdx-components.tsx  # Styled MDX components
  styles/
    index.css           # Global styles + Tailwind
content/
  blog/
    *.mdx               # Blog posts (MDX with frontmatter)
```

## Development

**Prerequisites:** Node.js 20.19+, pnpm

```bash
pnpm install
pnpm dev
```

Dev server runs at http://localhost:3000

## Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-03-12"
excerpt: "A short description."
author: "Your Name"
---

Your markdown content here.
```

The post will be automatically discovered and prerendered at `/blog/<filename>`.

## Build & Deploy

```bash
# Build with prerendering (SSG)
pnpm build

# Preview locally
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

The build prerenders all routes to static HTML in `dist/client/`, which Cloudflare Pages serves directly.

## Known Issues

- **Prerender hang bug** ([TanStack Router #6602](https://github.com/TanStack/router/issues/6602)): Build hangs after prerendering due to timeout handle leaks in `@tanstack/router-core`. Patched via `pnpm.patchedDependencies` in `package.json` with a `process.exit(0)` timeout workaround.

## License

MIT
