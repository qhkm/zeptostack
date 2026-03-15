import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  Bot, Workflow, Layers, Server, Box, Mic, ArrowRight, ExternalLink, Github,
} from 'lucide-react'
import { Navbar } from '~/components/Navbar'
import { Footer } from '~/components/Footer'

const products = [
  {
    name: 'ZeptoClaw',
    tagline: 'Ultra-lightweight personal AI assistant',
    description:
      'A smaller, more secure runtime for AI agents. Runs agents as independent lightweight processes — approximately 6MB in binary size, enabling hundreds of agents in parallel without heavy framework overhead.',
    icon: Bot,
    color: 'text-teal-400',
    border: 'border-teal-500/30 hover:border-teal-400',
    bg: 'bg-teal-950/10 hover:bg-teal-950/30',
    glow: 'shadow-[0_0_15px_rgba(45,212,191,0.15)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]',
    status: 'Active',
    statusColor: 'bg-teal-400',
    url: 'https://zeptoclaw.com',
    github: 'https://github.com/qhkm/zeptoclaw',
    features: ['~6MB binary', 'Process isolation', 'Edge-deployable', 'Tool calling'],
  },
  {
    name: 'r8r',
    tagline: 'Agent-native workflow automation engine',
    description:
      'Pronounced "rater" — multi-step flows, device and sensor events, tool coordination, retries and branching logic. Designed for agent workflows, local devices, machines, and automation systems.',
    icon: Workflow,
    color: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-400',
    bg: 'bg-amber-950/10 hover:bg-amber-950/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    status: 'Active',
    statusColor: 'bg-amber-400',
    github: 'https://github.com/qhkm/r8r',
    features: ['Event-driven', 'Multi-step orchestration', 'Durable workflows', 'AGPL v3'],
  },
  {
    name: 'ZeptoPM',
    tagline: 'Process manager for AI agents — like PM2, but for LLMs',
    description:
      'Manages large collections of ZeptoClaw agents — scheduling, lifecycle, resources — turning individual agents into coordinated autonomous systems.',
    icon: Layers,
    color: 'text-purple-400',
    border: 'border-purple-500/30 hover:border-purple-400',
    bg: 'bg-purple-950/10 hover:bg-purple-950/30',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    status: 'Active',
    statusColor: 'bg-purple-400',
    github: 'https://github.com/qhkm/zeptopm',
    features: ['Agent scheduling', 'Lifecycle control', 'Resource coordination', 'macOS + Linux'],
  },
  {
    name: 'ZeptoRT',
    tagline: 'Durable turn-based process runtime for AI agents',
    description:
      'Journaled effects, snapshot recovery, OTP-style supervision. Provides replay, recovery, effect tracking, and runtime guarantees for long-running agent execution.',
    icon: Server,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    bg: 'bg-emerald-950/10 hover:bg-emerald-950/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    status: 'Active',
    statusColor: 'bg-emerald-400',
    github: 'https://github.com/qhkm/zeptort',
    features: ['535+ tests passing', 'Replay & recovery', 'Effect tracking', 'Snapshot restore'],
  },
  {
    name: 'ZeptoCapsule',
    tagline: 'Isolation sandbox for AI agents',
    description:
      'Configurable execution isolation — process, namespace, and Firecracker capsules. Different security levels depending on risk and trust requirements.',
    icon: Box,
    color: 'text-blue-400',
    border: 'border-blue-500/30 hover:border-blue-400',
    bg: 'bg-blue-950/10 hover:bg-blue-950/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    status: 'Active',
    statusColor: 'bg-blue-400',
    github: 'https://github.com/qhkm/zeptocapsule',
    features: ['Process isolation', 'Namespace sandboxing', 'Firecracker VMs', 'Linux + macOS'],
  },
  {
    name: 'ZeptoBot',
    tagline: 'Voice-controlled AI desktop assistant',
    description:
      'Uses LLM reasoning to drive real desktop automation — clicking buttons, filling forms, navigating apps, and browsing the web. Experimental voice-first interface for agent interaction.',
    icon: Mic,
    color: 'text-rose-400',
    border: 'border-rose-500/30 hover:border-rose-400',
    bg: 'bg-rose-950/10 hover:bg-rose-950/30',
    glow: 'shadow-[0_0_15px_rgba(251,113,133,0.15)] hover:shadow-[0_0_30px_rgba(251,113,133,0.4)]',
    status: 'Experimental',
    statusColor: 'bg-rose-400',
    features: ['Voice control', 'Desktop automation', 'LLM reasoning', 'Web browsing'],
  },
]

export const Route = createFileRoute('/products')({
  component: ProductsPage,
  head: () => ({
    title: 'Products — ZeptoStack',
    meta: [
      {
        name: 'description',
        content: 'The ZeptoStack ecosystem — lightweight tools for running autonomous AI agents reliably.',
      },
    ],
  }),
})

function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-teal-500/30 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/8 blur-[150px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-950/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
            <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">
              Ecosystem
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            The Stack,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-amber-400 to-purple-500">
              Unpacked
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Each product solves a specific problem in making autonomous agents practical, efficient, and safe. Use them independently, or together as a full deployment stack.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative p-8 border ${product.border} ${product.bg} ${product.glow} backdrop-blur-md transition-all duration-500 rounded-lg overflow-hidden`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                e.currentTarget.style.setProperty('--x', `${x}%`)
                e.currentTarget.style.setProperty('--y', `${y}%`)
              }}
            >
              {/* Holographic shine */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.08) 0%, transparent 60%)',
                }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 border border-current bg-current/10 ${product.color} rounded-lg`}>
                  <product.icon className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.statusColor}`}></div>
                  <span className="text-xs font-mono text-slate-500">{product.status}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-white mb-1">{product.name}</h3>
              <p className={`text-sm font-mono ${product.color} mb-4`}>{product.tagline}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-[11px] font-mono text-slate-500 border border-white/10 px-2.5 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {product.github && (
                  <a
                    href={product.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-mono ${product.color} hover:underline`}
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-mono ${product.color} hover:underline`}
                  >
                    Visit site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-slate-500 mb-6">
            All products are part of the ZeptoStack ecosystem by{' '}
            <span className="text-white">Aisar Labs</span>.
          </p>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)]"
          >
            EXPLORE THE ARCHITECTURE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
