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
