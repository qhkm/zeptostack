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
