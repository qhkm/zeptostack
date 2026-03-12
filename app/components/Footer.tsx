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
