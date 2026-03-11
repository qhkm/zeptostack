import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Bot, ShieldCheck, Workflow, Shield, Server, BrainCircuit, Database, Brain, Triangle, Box, Lock, Activity, Terminal, Code } from 'lucide-react';

const products = [
  {
    id: 'SYS-01',
    name: 'ZeptoClaw',
    subtitle: 'AI Worker Agents',
    description: 'Intelligent agents that get things done.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30 hover:border-cyan-400',
    bg: 'bg-cyan-950/10 hover:bg-cyan-950/30',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    icon1: <Bot className="w-8 h-8" />,
    icon2: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: 'SYS-02',
    name: 'ZeptoR8R',
    subtitle: 'Enterprise Orchestration',
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
    id: 'SYS-04',
    name: 'ZeptoCapsule',
    subtitle: 'MicroVM Isolation',
    description: 'Secure microVM wrapper for workload isolation.',
    color: 'text-blue-400',
    border: 'border-blue-500/30 hover:border-blue-400',
    bg: 'bg-blue-950/10 hover:bg-blue-950/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    icon1: <Box className="w-8 h-8" />,
    icon2: <Lock className="w-5 h-5" />
  },
  {
    id: 'SYS-05',
    name: 'ZeptoLM',
    subtitle: 'Specialized AI Models',
    description: 'Optimized intelligence for the stack.',
    color: 'text-purple-400',
    border: 'border-purple-500/30 hover:border-purple-400',
    bg: 'bg-purple-950/10 hover:bg-purple-950/30',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    icon1: <Database className="w-8 h-8" />,
    icon2: <Brain className="w-5 h-5" />
  }
];

// Typewriter effect component
const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const characters = text.split("");
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "inline" }}
          transition={{ duration: 0.1, delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: delay + characters.length * 0.05 }}
        className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
};

// Floating background particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-cyan-500/30 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0%", "-1000%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Tech Grid */}
        <motion.div 
          className="absolute inset-[-100%] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"
          animate={{ y: [0, 32] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:10rem_10rem]"></div>
        
        {/* Floating Particles */}
        <FloatingParticles />

        {/* Scanline */}
        <div className="absolute inset-0 h-[20vh] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scanline"></div>
        
        {/* Radial Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Triangle className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
          </motion.div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white">
            aisar<span className="text-cyan-400">.ai</span>
          </span>
        </motion.div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-slate-400">
          {['PRODUCTS', 'SOLUTIONS', 'DOCS'].map((item, i) => (
            <motion.a 
              key={item}
              href="#" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -2, color: '#22d3ee' }}
              className="hover:text-cyan-400 transition-colors"
            >
              /{item}
            </motion.a>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-emerald-400 tracking-widest">SYS.ONLINE</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] relative overflow-hidden group"
          >
            <span className="relative z-10">INITIATE</span>
            <motion.div 
              className="absolute inset-0 bg-white/30"
              initial={{ x: "-100%", skewX: -15 }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 pt-24 pb-32 flex flex-col">
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6 text-cyan-400 font-mono text-sm h-6">
            <Terminal className="w-4 h-4" />
            <TypewriterText text="> INITIALIZING CORE SYSTEMS..." delay={0.5} />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tighter uppercase relative"
          >
            The Frontier <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              of Enterprise AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-light border-l-2 border-cyan-500/50 pl-6"
          >
            Building intelligent workflows with durable runtime cores, specialized models, and hyper-efficient worker agents.
          </motion.p>
        </div>

        {/* Products Stack - Server Rack Style */}
        <div className="w-full flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-white/10 pb-2 mb-2 px-4"
          >
            <span>MODULE_ID</span>
            <span className="hidden md:block">STATUS</span>
          </motion.div>
          
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6 border ${product.border} ${product.bg} ${product.glow} backdrop-blur-md transition-colors duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Background hover sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

              {/* ID / Status */}
              <div className="flex items-center gap-4 md:w-48 shrink-0 relative z-10">
                <div className={`p-3 border border-current bg-current/10 ${product.color} relative`}>
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    {product.icon1}
                  </motion.div>
                  {/* Pulse ring */}
                  <motion.div 
                    className="absolute inset-0 border border-current rounded-sm opacity-50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                </div>
                <div>
                  <div className="text-xs font-mono opacity-50 mb-1">{product.id}</div>
                  <div className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 ${product.color}`}>
                    <motion.div 
                      animate={{ opacity: [1, 0.3, 1] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Activity className="w-3 h-3" />
                    </motion.div>
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-display font-bold mb-1 text-white group-hover:text-cyan-50 transition-colors flex items-center gap-2">
                  {product.name}
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-cyan-400 hidden group-hover:inline-block"
                  >
                    <Code className="w-4 h-4" />
                  </motion.span>
                </h3>
                <div className={`text-xs font-mono uppercase tracking-widest mb-2 ${product.color}`}>{product.subtitle}</div>
                <p className="text-slate-400 text-sm">{product.description}</p>
              </div>

              {/* Right Tech details */}
              <div className={`hidden md:flex flex-col items-end gap-2 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300 relative z-10 ${product.color}`}>
                 <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 >
                   {product.icon2}
                 </motion.div>
                 <div className="text-[10px] font-mono">LATENCY: &lt;1ms</div>
                 <div className="text-[10px] font-mono">UPTIME: 99.999%</div>
              </div>
              
              {/* Decorative corner brackets */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${product.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${product.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-600">
        <p>&copy; {new Date().getFullYear()} AISAR.AI // ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <motion.span 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            SECURE CONNECTION
          </motion.span>
          <Lock className="w-3 h-3" />
        </div>
      </footer>
    </div>
  );
}
