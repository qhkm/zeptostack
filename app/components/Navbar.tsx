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
        <Link to="/products" className="hover:text-teal-400 transition-colors">
          /PRODUCTS
        </Link>
        <Link to="/blog" className="hover:text-teal-400 transition-colors">
          /BLOG
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/qhkm/zeptostack"
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
