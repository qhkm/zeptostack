import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start-plugin'
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
