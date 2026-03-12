import React from 'react';
import { motion } from 'motion/react';
import { Bot, ShieldCheck, Workflow, Shield, Server, BrainCircuit, Brain, Triangle, Box, Lock, Activity, Terminal, Layers } from 'lucide-react';

const products = [
  {
    id: 'SYS-01',
    name: 'ZeptoClaw',
    subtitle: 'AI Worker Agents',
    description: 'Intelligent agents that get things done.',
    color: 'text-teal-400',
    border: 'border-teal-500/30 hover:border-teal-400',
    bg: 'bg-teal-950/10 hover:bg-teal-950/30',
    glow: 'shadow-[0_0_15px_rgba(45,212,191,0.15)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]',
    icon1: <Bot className="w-8 h-8" />,
    icon2: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: 'SYS-02',
    name: 'ZeptoR8R',
    subtitle: 'Workflow Automation',
    description: 'Hyper efficient agent native workflow automation.',
    color: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-400',
    bg: 'bg-amber-950/10 hover:bg-amber-950/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    icon1: <Workflow className="w-8 h-8" />,
    icon2: <Shield className="w-5 h-5" />
  },
  {
    id: 'SYS-03',
    name: 'ZeptoPM',
    subtitle: 'Process Manager',
    description: 'Predictive process management and state tracking.',
    color: 'text-purple-400',
    border: 'border-purple-500/30 hover:border-purple-400',
    bg: 'bg-purple-950/10 hover:bg-purple-950/30',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    icon1: <Layers className="w-8 h-8" />,
    icon2: <Brain className="w-5 h-5" />
  },
  {
    id: 'SYS-04',
    name: 'ZeptoRT',
    subtitle: 'Durable Runtime Core',
    description: 'Reliable, replayable, crash-safe execution.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    bg: 'bg-emerald-950/10 hover:bg-emerald-950/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    icon1: <Server className="w-8 h-8" />,
    icon2: <BrainCircuit className="w-5 h-5" />
  },
  {
    id: 'SYS-05',
    name: 'ZeptoCapsule',
    subtitle: 'MicroVM Isolation',
    description: 'Secure microVM wrapper for workload isolation.',
    color: 'text-blue-400',
    border: 'border-blue-500/30 hover:border-blue-400',
    bg: 'bg-blue-950/10 hover:bg-blue-950/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    icon1: <Box className="w-8 h-8" />,
    icon2: <Lock className="w-5 h-5" />
  }
];


export default function App() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-teal-500/30 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem] animate-grid-pan"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:10rem_10rem]"></div>
        
        {/* Scanline */}
        <div className="absolute inset-0 h-[20vh] bg-gradient-to-b from-transparent via-teal-500/5 to-transparent animate-scanline"></div>
        
        {/* Radial Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full border-b border-white/5">
        <div className="flex items-center gap-3">
          <Triangle className="w-6 h-6 text-teal-400 fill-teal-400/20" />
          <span className="text-2xl font-display font-bold tracking-tighter text-teal-400">
            zepto<span className="text-white">stack</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-slate-400">
          <a href="#" className="hover:text-teal-400 transition-colors">/PRODUCTS</a>
          <a href="#" className="hover:text-teal-400 transition-colors">/SOLUTIONS</a>
          <a href="#" className="hover:text-teal-400 transition-colors">/DOCS</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">SYS.ONLINE</span>
          </div>
          <button className="relative overflow-hidden px-5 py-2 text-xs font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.4)] group">
            <span className="relative z-10">INITIATE</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 pt-24 pb-32 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-2 mb-6 text-teal-400 font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>&gt; INITIALIZING CORE SYSTEMS...</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tighter uppercase">
            AI Agents <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-gradient-shift">
              Operating Stack
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light border-l-2 border-teal-500/50 pl-6">
            ZeptoStack provides the runtime, orchestration, and secure execution layer required to run autonomous AI agents reliably — locally or in the cloud.
          </p>
        </motion.div>

        {/* Products Stack - Server Rack Style */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-white/10 pb-2 mb-2 px-4">
            <span>MODULE_ID</span>
            <span className="hidden md:block">STATUS</span>
          </div>
          
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 border ${product.border} ${product.bg} ${product.glow} backdrop-blur-md transition-all duration-300`}
            >
              {/* ID / Status */}
              <div className="flex items-center gap-4 md:w-48 shrink-0">
                <div className={`p-3 border border-current bg-current/10 ${product.color} group-hover:-translate-y-1 transition-transform duration-300`}>
                  {product.icon1}
                </div>
                <div>
                  <div className="text-xs font-mono opacity-50 mb-1">{product.id}</div>
                  <div className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 ${product.color}`}>
                    <Activity className="w-3 h-3" /> ACTIVE
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold mb-1 text-white group-hover:tracking-wide transition-all">{product.name}</h3>
                <div className={`text-xs font-mono uppercase tracking-widest mb-2 ${product.color}`}>{product.subtitle}</div>
                <p className="text-slate-400 text-sm">{product.description}</p>
              </div>

              {/* Right Tech details */}
              <div className={`hidden md:flex flex-col items-end gap-2 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${product.color}`}>
                 {product.icon2}
                 <div className="text-[10px] font-mono">LATENCY: &lt;1ms</div>
                 <div className="text-[10px] font-mono">UPTIME: 99.999%</div>
              </div>
              
              {/* Decorative corner brackets */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${product.border} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${product.border} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-600">
        <p>&copy; {new Date().getFullYear()} ZEPTOSTACK // ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span>SECURE CONNECTION</span>
          <Lock className="w-3 h-3" />
        </div>
      </footer>
    </div>
  );
}
