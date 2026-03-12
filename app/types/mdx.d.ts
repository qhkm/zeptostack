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
