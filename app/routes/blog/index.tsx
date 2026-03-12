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
