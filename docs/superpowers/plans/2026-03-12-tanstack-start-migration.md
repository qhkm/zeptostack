# TanStack Start Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate ZeptoStack from a Vite+React SPA to TanStack Start with file-based routing, static prerendering, and an MDX-powered blog.

**Architecture:** TanStack Start (Vite-based, post-Vinxi migration) with file-based routing under `app/routes/`. Landing page at `/`, blog listing at `/blog`, blog posts at `/blog/:slug`. MDX content compiled via `@mdx-js/rollup`. All routes statically prerendered at build time.

**Tech Stack:** TanStack Start, TanStack Router, React 19, Tailwind CSS v4, Motion, MDX, Vite

**Spec:** `docs/superpowers/specs/2026-03-12-tanstack-start-migration-design.md`

**Notes:**
- The spec references `vinxi` and `app.config.ts`. TanStack Start v1.121.0+ has moved to native Vite. This plan uses `vite.config.ts` with the `tanstackStart()` plugin instead. The `vinxi` dependency is not needed.
- The spec lists `gray-matter` as a dependency. This is intentionally omitted — `remark-mdx-frontmatter` handles frontmatter extraction at compile time, exposing it as JS exports via `import.meta.glob`. No runtime parsing is needed.
- The spec entry point names (`app/client.tsx`, `app/ssr.tsx`) are used instead of `entry.client.tsx` / `entry.server.tsx` per TanStack Start's auto-discovery conventions.

---

## Chunk 1: Project Foundation

### Task 1: Update dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused dependencies**

```bash
cd /Users/dr.noranizaahmad/ios/zeptostack
npm uninstall express better-sqlite3 @google/genai dotenv @types/express autoprefixer @vitejs/plugin-react
```

Note: `@vitejs/plugin-react` is removed because TanStack Start handles React transforms internally.

- [ ] **Step 2: Install all new dependencies**

```bash
npm install vite@latest @tanstack/react-start @tanstack/react-router @mdx-js/rollup remark-frontmatter remark-mdx-frontmatter
npm install -D vite-tsconfig-paths
```

Note: `vite@latest` ensures compatibility with TanStack Start's peer dependency requirements.

- [ ] **Step 3: Update package.json scripts**

Replace the `scripts` block in `package.json` with:

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "preview": "vite preview",
  "clean": "rm -rf dist .output",
  "lint": "tsc --noEmit"
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies for TanStack Start migration"
```

---

### Task 2: Create config files

**Files:**
- Create: `vite.config.ts` (overwrite existing)
- Modify: `tsconfig.json`
- Create: `app/types/mdx.d.ts`

- [ ] **Step 1: Overwrite vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { readdirSync, existsSync } from 'node:fs'

const blogDir = 'content/blog'
const blogSlugs = existsSync(blogDir)
  ? readdirSync(blogDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''))
  : []

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tailwindcss(),
    tsConfigPaths(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tanstackStart({
      tsr: {
        routesDirectory: './app/routes',
        generatedRouteTree: './app/routeTree.gen.ts',
        srcDirectory: './app',
      },
      prerender: {
        routes: ['/', '/blog', ...blogSlugs.map((slug) => `/blog/${slug}`)],
      },
    }),
  ],
})
```

Note: `@vitejs/plugin-react` is not needed — TanStack Start handles React transforms internally via `tanstackStart()`. The `tsr.srcDirectory` is set to `./app` so the plugin discovers entry points (`client.tsx`, `ssr.tsx`) in the `app/` directory.

If the `prerender.routes` option does not work with your TanStack Start version, consult the TanStack Start docs for the correct prerendering API. The prerender config shape may vary between versions.

- [ ] **Step 2: Update tsconfig.json**

```json
{
  "include": ["**/*.ts", "**/*.tsx", "**/*.mdx"],
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

- [ ] **Step 3: Create MDX type declarations**

Create `app/types/mdx.d.ts`:

```typescript
declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: {
    title: string
    date: string
    excerpt: string
    author: string
  }

  const component: ComponentType
  export default component
}
```

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts tsconfig.json app/types/mdx.d.ts
git commit -m "chore: configure TanStack Start, MDX, and TypeScript"
```

---

### Task 3: Create entry points and router

**Files:**
- Create: `app/router.tsx`
- Create: `app/client.tsx`
- Create: `app/ssr.tsx`

- [ ] **Step 1: Create app/router.tsx**

```typescript
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createAppRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadDelay: 0,
    scrollRestoration: true,
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
```

- [ ] **Step 2: Create app/client.tsx**

```typescript
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(document, <StartClient />)
```

- [ ] **Step 3: Create app/ssr.tsx**

```typescript
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createAppRouter } from './router'

export default createStartHandler({
  createRouter: createAppRouter,
})(defaultStreamHandler)
```

- [ ] **Step 4: Commit**

```bash
git add app/router.tsx app/client.tsx app/ssr.tsx
git commit -m "feat: add TanStack Start entry points and router config"
```

---

### Task 4: Create root layout and migrate styles

**Files:**
- Create: `app/routes/__root.tsx`
- Create: `app/styles/index.css` (moved from `src/index.css`)

- [ ] **Step 1: Create app/styles/index.css**

Copy the current `src/index.css` but **remove the font `@import` line** (line 1). Fonts move to `<link>` tags in `__root.tsx`. Keep everything else (Tailwind `@import`, `@theme`, all keyframes, all custom classes, scrollbar styles, smooth scroll).

The file should start with:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Space Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --font-display: "Geist", ui-sans-serif, system-ui, sans-serif;
}
```

Then include all remaining CSS from the current `src/index.css` (body styles, keyframes, custom classes, scrollbar, etc.).

- [ ] **Step 2: Create app/routes/__root.tsx**

```typescript
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import '../styles/index.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'ZeptoStack — A lightweight, secure, local-first stack for running autonomous agents reliably.',
      },
    ],
    title: 'ZeptoStack — Local-First Autonomous Infrastructure',
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@100..800&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-slate-400 font-mono text-sm mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 text-sm font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all"
        >
          GO HOME
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify the route tree generates**

```bash
cd /Users/dr.noranizaahmad/ios/zeptostack
npx tsc --noEmit 2>&1 || true
```

Check that `app/routeTree.gen.ts` was created. If it was not generated automatically, run the dev server briefly and stop it, or check TanStack Router CLI options. Minor type errors at this stage are expected (routes not yet created).

- [ ] **Step 4: Commit**

```bash
git add app/styles/index.css app/routes/__root.tsx
# Also add routeTree.gen.ts if generated
git add -f app/routeTree.gen.ts 2>/dev/null || true
git commit -m "feat: add root layout with fonts, meta tags, and 404 page"
```

---

## Chunk 2: Landing Page Migration

### Task 5: Extract shared components

**Files:**
- Create: `app/components/ParticleBackground.tsx`
- Create: `app/components/Navbar.tsx`
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Create app/components/ParticleBackground.tsx**

Extract the `ParticleBackground` function component from `src/App.tsx` (lines 88-199). It is a self-contained component with no external dependencies except React.

Note: Two intentional improvements over source: (1) the resize handler is extracted to a named `handleResize` function so it can be properly removed on cleanup — the original has a memory leak with an anonymous listener. (2) Inner loop variables renamed to `dx2`/`dy2` to avoid variable shadowing.

```typescript
import { useEffect, useRef } from 'react'

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    let mouse = { x: -1000, y: -1000 }
    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.min(30, Math.floor(window.innerWidth / 50))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.x -= dx * 0.01
          p.y -= dy * 0.01
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(45, 212, 191, 0.4)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx2 = p.x - particles[j].x
          const dy2 = p.y - particles[j].y
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    resize()
    createParticles()
    animate()

    const handleResize = () => {
      resize()
      createParticles()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
```

- [ ] **Step 2: Create app/components/Navbar.tsx**

Extract the `<nav>` element from `src/App.tsx` (lines 213-234). Key change: anchor links use `<a href="/#section">` format so they work from both the landing page and blog pages. Add a `<Link>` to `/blog`.

```typescript
import { Link } from '@tanstack/react-router'
import { Triangle, Github } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full border-b border-white/5">
      <a href="/" className="flex items-center gap-3">
        <Triangle className="w-7 h-7 text-teal-400 fill-teal-400/20" />
        <span className="text-2xl font-display font-bold tracking-tighter text-teal-400">
          zepto<span className="text-white">stack</span>
        </span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-slate-400">
        <a href="/#why" className="hover:text-teal-400 transition-colors">
          /WHY
        </a>
        <a href="/#stack" className="hover:text-teal-400 transition-colors">
          /STACK
        </a>
        <a href="/#vision" className="hover:text-teal-400 transition-colors">
          /VISION
        </a>
        <Link to="/blog" className="hover:text-teal-400 transition-colors">
          /BLOG
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com"
          className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <button className="relative overflow-hidden px-5 py-2.5 text-xs font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]">
          GET STARTED
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Create app/components/Footer.tsx**

Extract the `<footer>` element from `src/App.tsx` (lines 640-655).

```typescript
import { Triangle, Lock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Triangle className="w-5 h-5 text-teal-400 fill-teal-400/20" />
          <span className="text-lg font-display font-bold text-white">
            zeptostack
          </span>
          <span className="text-xs font-mono text-slate-600 ml-2">
            by AISAR
          </span>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} ZEPTOSTACK // LOCAL-FIRST AUTONOMOUS
          INFRASTRUCTURE
        </p>
        <div className="flex items-center gap-2 text-slate-600">
          <Lock className="w-3 h-3" />
          <span className="text-xs font-mono">OPEN SOURCE</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/
git commit -m "feat: extract ParticleBackground, Navbar, and Footer components"
```

---

### Task 6: Create landing page route

**Files:**
- Create: `app/routes/index.tsx`

- [ ] **Step 1: Create app/routes/index.tsx**

This file contains the full landing page. It includes:
- The `products`, `stackLayers`, and `visionStages` data arrays (from `src/App.tsx` lines 8-85)
- All page sections: hero, why, stack, why-this-matters, vision+CTA (from `src/App.tsx` lines 201-637)
- Imports for `ParticleBackground`, `Navbar`, `Footer` from `~/components/`

The component is wrapped in `createFileRoute('/')`.

```typescript
import { createFileRoute } from '@tanstack/react-router'
```

Then copy the three data arrays (`products`, `stackLayers`, `visionStages`) from `src/App.tsx` lines 8-85 exactly as-is.

Then the route definition and component. The component renders:
1. The outer wrapper `<div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-teal-500/30 relative overflow-hidden">`
2. `<ParticleBackground />`
3. Background effects div (lines 206-211)
4. `<Navbar />`
5. `<main>` with all sections (lines 236-637)
6. `<Footer />`

Key imports to add:
```typescript
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { motion } from 'motion/react'
import {
  Bot, Workflow, Layers, Server, Box, Terminal, Github,
  ArrowRight, Cpu, Shield, Activity, Zap
} from 'lucide-react'
import { ParticleBackground } from '~/components/ParticleBackground'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'
```

Route export:
```typescript
export const Route = createFileRoute('/')({
  component: HomePage,
})
```

The `HomePage` function contains the JSX from the current `App` default export (lines 201-657), minus the Navbar and Footer JSX (replaced with component imports), keeping the data arrays at the top of the file.

**IMPORTANT:** Copy the exact current JSX from `src/App.tsx`. Do not alter any styling, animation props, or content. The only changes are:
- Import components instead of inline Navbar/Footer/ParticleBackground
- Wrap in `createFileRoute` instead of `export default function App()`
- Use `~/components/` path alias for imports

- [ ] **Step 2: Verify type checking**

```bash
npx tsc --noEmit
```

Expected: No errors. If there are errors, fix import paths.

- [ ] **Step 3: Commit**

```bash
git add app/routes/index.tsx
git commit -m "feat: create landing page route with all sections"
```

---

### Task 7: Remove old files and verify landing page

**Files:**
- Delete: `src/main.tsx`
- Delete: `src/App.tsx`
- Delete: `src/index.css`
- Delete: `index.html`
- Delete: `metadata.json`
- Delete: `.env.example`

- [ ] **Step 1: Remove old source files**

```bash
cd /Users/dr.noranizaahmad/ios/zeptostack
# Note: vite.config.ts is NOT deleted — it was overwritten in Task 2 (plan uses vite.config.ts instead of app.config.ts)
rm -f src/main.tsx src/App.tsx src/index.css index.html metadata.json .env.example
rmdir src 2>/dev/null || true
```

- [ ] **Step 2: Start dev server and verify**

```bash
npx vite dev
```

Open `http://localhost:3000` in browser. Verify:
- Landing page renders with all sections
- Particle background animates
- Scroll animations work (Motion `whileInView`)
- Navbar links scroll to sections
- All styling matches the previous version
- No console errors

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

Expected: Build completes without errors. Static files generated.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove old SPA files, complete landing page migration"
```

---

## Chunk 3: Blog System

### Task 8: Create blog utilities and MDX components

**Files:**
- Create: `app/lib/blog.ts`
- Create: `app/lib/mdx-components.tsx`
- Create: `content/blog/hello-world.mdx`

- [ ] **Step 1: Create content/blog/hello-world.mdx**

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

## Why Local-First?

In an agent-native world, software will increasingly run as many small autonomous processes close to the user, the device, or the machine.

That changes the requirements:

- The stack must be **lighter**
- More **durable**
- More **secure**
- More **local-first**

ZeptoStack exists because we believe agent-native systems need a new operating stack.

## What's Next

We'll be sharing more about the architecture, the thinking behind each layer, and how to get started building with ZeptoStack.

Stay tuned.
```

- [ ] **Step 2: Create app/lib/blog.ts**

```typescript
import type { ComponentType } from 'react'

interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  author: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
}

interface MdxModule {
  default: ComponentType
  frontmatter: PostFrontmatter
}

const modules = import.meta.glob<MdxModule>('/content/blog/*.mdx', {
  eager: true,
})

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.replace('/content/blog/', '').replace('.mdx', '')
      return { slug, ...mod.frontmatter }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  const path = `/content/blog/${slug}.mdx`
  const mod = modules[path]
  if (!mod) return null
  return {
    slug,
    frontmatter: mod.frontmatter,
    Content: mod.default,
  }
}
```

- [ ] **Step 3: Create app/lib/mdx-components.tsx**

Custom styled components for rendering MDX content in the ZeptoStack dark theme.

```typescript
import type { ComponentProps } from 'react'

export const mdxComponents = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1
      className="text-4xl font-display font-bold text-white mt-12 mb-6"
      {...props}
    />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2
      className="text-2xl font-display font-bold text-white mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3
      className="text-xl font-display font-bold text-white mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="text-slate-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a
      className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
      {...props}
    />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      className="list-decimal list-inside text-slate-300 mb-4 space-y-1"
      {...props}
    />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="text-slate-300" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code
      className="bg-white/10 text-teal-300 font-mono text-sm px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre
      className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 font-mono text-sm"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-teal-500/50 pl-4 italic text-slate-400 mb-4"
      {...props}
    />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="border-white/10 my-8" {...props} />
  ),
}
```

- [ ] **Step 4: Commit**

```bash
git add content/blog/hello-world.mdx app/lib/blog.ts app/lib/mdx-components.tsx
git commit -m "feat: add blog utilities, MDX components, and first post"
```

---

### Task 9: Create blog routes

**Files:**
- Create: `app/routes/blog/index.tsx`
- Create: `app/routes/blog/$slug.tsx`

- [ ] **Step 1: Create app/routes/blog/index.tsx**

Blog listing page at `/blog`. Shows all posts as cards in the ZeptoStack dark theme.

```typescript
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '~/lib/blog'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllPosts(),
  component: BlogIndex,
  head: () => ({
    title: 'Blog — ZeptoStack',
    meta: [
      {
        name: 'description',
        content: 'Updates, insights, and technical posts from the ZeptoStack team.',
      },
    ],
  }),
})

function BlogIndex() {
  const posts = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-teal-400 tracking-widest uppercase mb-4 block">
            Blog
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            From the Team
          </h1>
          <p className="text-slate-500 mb-12">
            Updates, insights, and technical posts about ZeptoStack and the
            future of autonomous infrastructure.
          </p>
        </motion.div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block p-6 border border-white/10 hover:border-teal-500/30 bg-black/30 hover:bg-teal-950/10 rounded-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-display font-bold text-white group-hover:text-teal-400 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                      <span>{post.date}</span>
                      <span>by {post.author}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}

          {posts.length === 0 && (
            <p className="text-slate-500 text-center py-12">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Create app/routes/blog/$slug.tsx**

Individual blog post page. Renders MDX content with styled components.

```typescript
import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '~/lib/blog'
import { mdxComponents } from '~/lib/mdx-components'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
  head: ({ loaderData }) => ({
    title: `${loaderData.frontmatter.title} — ZeptoStack`,
    meta: [
      { name: 'description', content: loaderData.frontmatter.excerpt },
      { property: 'og:title', content: loaderData.frontmatter.title },
      { property: 'og:description', content: loaderData.frontmatter.excerpt },
    ],
  }),
})

function BlogPost() {
  const { frontmatter, Content } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans">
      <Navbar />

      <main className="max-w-[720px] mx-auto px-6 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-mono text-slate-500">
              <span>{frontmatter.date}</span>
              <span>by {frontmatter.author}</span>
            </div>
          </header>

          {/* MDX content */}
          <article>
            <Content components={mdxComponents} />
          </article>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: Verify routes generate**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/routes/blog/
git commit -m "feat: add blog listing and post routes with MDX rendering"
```

---

### Task 10: Final verification

- [ ] **Step 1: Start dev server**

```bash
cd /Users/dr.noranizaahmad/ios/zeptostack
npx vite dev
```

Verify in browser:
- `http://localhost:3000` — Landing page renders correctly
- `http://localhost:3000/blog` — Blog listing shows "Hello World" post
- `http://localhost:3000/blog/hello-world` — Blog post renders with styled MDX
- `http://localhost:3000/nonexistent` — Shows 404 page
- Navbar `/BLOG` link navigates to blog listing
- Blog post "Back to Blog" link works
- Landing page anchor links still scroll correctly

- [ ] **Step 2: Verify production build**

```bash
npx vite build
```

Expected: Build completes, static pages generated for `/`, `/blog`, `/blog/hello-world`.

- [ ] **Step 3: Final commit**

If any fixes were needed during verification:

```bash
git add -A
git commit -m "fix: resolve issues found during final verification"
```
