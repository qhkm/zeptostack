import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
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
      srcDirectory: 'app',
      router: {
        routesDirectory: 'routes',
        generatedRouteTree: 'routeTree.gen.ts',
      },
      prerender: {
        enabled: true,
        routes: ['/', '/blog', ...blogSlugs.map((slug) => `/blog/${slug}`)],
        crawlLinks: true,
        autoSubfolderIndex: false,
      },
      customViteReactPlugin: true,
    }),
    react(),
  ],
})
