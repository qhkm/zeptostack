import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Bot, Workflow, Layers, Server, Box, Lock, Terminal, Triangle,
  Github, ArrowRight, Cpu, Shield, Activity, HardDrive, Radio, Zap
} from 'lucide-react';

const products = [
  {
    id: 'zeptoclaw',
    name: 'ZeptoClaw',
    subtitle: 'Lightweight Agent Engine',
    description: 'A smaller, more secure runtime direction inspired by OpenClaw. Runs agents as independent lightweight processes — approximately 6MB in binary size, enabling hundreds of agents in parallel without heavy framework overhead.',
    color: 'text-teal-400',
    border: 'border-teal-500/30 hover:border-teal-400',
    bg: 'bg-teal-950/10 hover:bg-teal-950/30',
    glow: 'shadow-[0_0_15px_rgba(45,212,191,0.15)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]',
    icon: Bot,
    features: ['~6MB binary', 'Process isolation', 'Edge-deployable']
  },
  {
    id: 'zeptor8r',
    name: 'ZeptoR8R',
    subtitle: 'Workflow Automation Engine',
    description: 'Agents don\'t just think — they do work. Multi-step flows, device and sensor events, tool coordination, retries and branching logic. Designed for agent workflows, local devices, machines, and automation systems.',
    color: 'text-amber-400',
    border: 'border-amber-500/30 hover:border-amber-400',
    bg: 'bg-amber-950/10 hover:bg-amber-950/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    icon: Workflow,
    features: ['Event-driven', 'Multi-step orchestration', 'Durable workflows']
  },
  {
    id: 'zeptopm',
    name: 'ZeptoPM',
    subtitle: 'Agent Orchestrator',
    description: 'When agents become small, independent processes, orchestration becomes the next challenge. Manages large collections of ZeptoClaw agents — scheduling, lifecycle, resources — turning individual agents into coordinated autonomous systems.',
    color: 'text-purple-400',
    border: 'border-purple-500/30 hover:border-purple-400',
    bg: 'bg-purple-950/10 hover:bg-purple-950/30',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    icon: Layers,
    features: ['Agent scheduling', 'Lifecycle control', 'Resource coordination']
  },
  {
    id: 'zeptort',
    name: 'ZeptoRT',
    subtitle: 'Durable Runtime Layer',
    description: 'Real agents don\'t always finish in one shot. They wait on tools, call external services, recover from interruptions, continue after failure. Provides replay, recovery, effect tracking, and runtime guarantees for long-running execution.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30 hover:border-emerald-400',
    bg: 'bg-emerald-950/10 hover:bg-emerald-950/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    icon: Server,
    features: ['Replay & recovery', 'Effect tracking', 'Failure continuation']
  },
  {
    id: 'zeptocapsule',
    name: 'ZeptoCapsule',
    subtitle: 'Secure Execution Isolation',
    description: 'Agents become more useful when they run tools and external actions. They also become more dangerous. Configurable execution isolation — different security levels depending on risk and trust requirements.',
    color: 'text-blue-400',
    border: 'border-blue-500/30 hover:border-blue-400',
    bg: 'bg-blue-950/10 hover:bg-blue-950/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    icon: Box,
    features: ['Configurable isolation', 'Filesystem control', 'Network policies']
  }
];

const stackLayers = [
  { name: 'Applications', icon: Cpu, color: 'text-white' },
  { name: 'ZeptoClaw', icon: Bot, color: 'text-teal-400', label: 'Agent Engine' },
  { name: 'ZeptoR8R', icon: Workflow, color: 'text-amber-400', label: 'Workflow Engine' },
  { name: 'ZeptoPM', icon: Layers, color: 'text-purple-400', label: 'Orchestrator' },
  { name: 'ZeptoRT', icon: Server, color: 'text-emerald-400', label: 'Durable Runtime' },
  { name: 'ZeptoCapsule', icon: Box, color: 'text-blue-400', label: 'Secure Isolation' },
];

const visionStages = [
  { label: 'Personal Agents', desc: 'On laptops and workstations', color: 'text-teal-400', glow: 'bg-teal-400' },
  { label: 'Edge & IoT', desc: 'On gateways and devices', color: 'text-amber-400', glow: 'bg-amber-400' },
  { label: 'Local Infrastructure', desc: 'Near machines and systems', color: 'text-purple-400', glow: 'bg-purple-400' },
  { label: 'Autonomous Operations', desc: 'Self-operating systems', color: 'text-blue-400', glow: 'bg-blue-400' },
];

// Particle Network Background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    let mouse = { x: -1000, y: -1000 };
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(30, Math.floor(window.innerWidth / 50));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 212, 191, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-teal-500/30 relative overflow-hidden">
      <ParticleBackground />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-900/8 blur-[150px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full border-b border-white/5">
        <div className="flex items-center gap-3">
          <Triangle className="w-7 h-7 text-teal-400 fill-teal-400/20" />
          <span className="text-2xl font-display font-bold tracking-tighter text-teal-400">
            zepto<span className="text-white">stack</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-slate-400">
          <a href="#why" className="hover:text-teal-400 transition-colors">/WHY</a>
          <a href="#stack" className="hover:text-teal-400 transition-colors">/STACK</a>
          <a href="#vision" className="hover:text-teal-400 transition-colors">/VISION</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com" className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <button className="relative overflow-hidden px-5 py-2.5 text-xs font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)]">
            GET STARTED
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 w-full">
        {/* ── Hero ── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-950/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">Local-First Autonomous Infrastructure</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              The Operating Stack for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-amber-400 to-purple-500">
                Autonomous Agents
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-4 font-light leading-relaxed">
              AI agents are becoming long-running software processes that reason, call tools, coordinate workflows, and interact with real systems.
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto mb-8">
              ZeptoStack is a lightweight, secure, local-first stack for running autonomous agents reliably — from personal AI assistants to edge and IoT automation.
            </p>

            {/* Proof Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-0 mb-10"
            >
              {[
                { icon: Zap, label: '~6MB Runtime' },
                { icon: Activity, label: 'Process-Based' },
                { icon: Shield, label: 'Local-First' },
                { icon: Github, label: 'Open Source' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2">
                  <item.icon className="w-3.5 h-3.5 text-teal-400/70" />
                  <span className="text-xs font-mono text-slate-400 tracking-wider">{item.label}</span>
                  {i < 3 && <span className="hidden md:inline text-slate-700 ml-4">|</span>}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#stack" className="group relative overflow-hidden px-8 py-4 text-sm font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center gap-2">
                EXPLORE THE ARCHITECTURE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="https://github.com" className="px-8 py-4 text-sm font-mono font-bold text-slate-300 border border-white/20 hover:border-white/40 hover:text-white transition-all flex items-center gap-2">
                <Github className="w-4 h-4" />
                VIEW ON GITHUB
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── Why ZeptoStack Exists ── */}
        <section id="why" className="border-y border-white/5 bg-white/[0.02] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-mono text-teal-400 tracking-widest uppercase mb-4 block">The Gap</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Why ZeptoStack Exists</h2>
                <p className="text-slate-400 text-lg mb-3">
                  Most workflow and agent platforms were designed for <span className="text-white">server-centric automation</span>.
                </p>
                <p className="text-slate-400 text-lg mb-6">
                  ZeptoStack is being designed for something else: a world of lightweight autonomous agents running <span className="text-teal-400 font-medium">locally, at the edge, and near real devices</span>.
                </p>
                <p className="text-sm text-slate-500 mb-5">We believe that in an agent-native world, the stack has to be reinvented. It must support:</p>
                <div className="space-y-3">
                  {[
                    { icon: Zap, text: 'Lightweight processes' },
                    { icon: Server, text: 'Durable long-running execution' },
                    { icon: Activity, text: 'Replay and recovery' },
                    { icon: Cpu, text: 'Effect tracking' },
                    { icon: Layers, text: 'Orchestration across many agents' },
                    { icon: Shield, text: 'Configurable execution isolation' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-slate-300">
                      <item.icon className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 mt-6 text-sm">
                  Not just to help build agents.<br />
                  <span className="text-slate-400">To provide the operating foundation for running them reliably in the real world.</span>
                </p>
              </motion.div>

              {/* Stack Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-purple-500/10 blur-3xl"></div>
                <div className="relative bg-black/50 border border-white/10 rounded-lg p-8 backdrop-blur">
                  <div className="text-xs font-mono text-slate-500 mb-6 text-center tracking-widest">THE ZEPTOSTACK ARCHITECTURE</div>
                  <div className="flex flex-col items-center">
                    {stackLayers.map((layer, index) => (
                      <React.Fragment key={layer.name}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`w-full max-w-xs ${index === 0 ? 'mb-2' : 'my-1'}`}
                        >
                          <div className={`relative p-4 border ${index === 0 ? 'border-white/20 bg-white/5' : 'border-white/10 bg-white/[0.03]'} rounded transition-all hover:bg-white/[0.06]`}>
                            <div className="flex items-center justify-center gap-3">
                              <layer.icon className={`w-5 h-5 ${layer.color}`} />
                              <div className="text-center">
                                <div className={`font-mono font-bold ${index === 0 ? 'text-white' : layer.color}`}>{layer.name}</div>
                                {layer.label && <div className="text-[10px] text-slate-500 uppercase tracking-wider">{layer.label}</div>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        {index < stackLayers.length - 1 && (
                          <div className="w-px h-4 bg-gradient-to-b from-white/20 to-white/10"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── The Stack ── */}
        <section id="stack" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <span className="text-xs font-mono text-teal-400 tracking-widest uppercase mb-4 block">The Stack</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Five Layers, One Mission</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center text-slate-500 max-w-2xl mx-auto mb-16"
            >
              Each layer solves a specific problem in making autonomous agents practical, efficient, and safe. Use them independently, or together as a full deployment stack.
            </motion.p>

            <div className="space-y-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative flex flex-col lg:flex-row items-start gap-8 p-8 border ${product.border} ${product.bg} ${product.glow} backdrop-blur-md transition-all duration-500 rounded-lg overflow-hidden`}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                >
                  {/* Holographic shine effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.1) 0%, transparent 60%)'
                    }}
                  />

                  {/* Icon */}
                  <div className={`p-4 border border-current bg-current/10 ${product.color} rounded-lg shrink-0`}>
                    <product.icon className="w-10 h-10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-3">
                      <h3 className="text-3xl font-display font-bold text-white">{product.name}</h3>
                      <span className={`text-sm font-mono ${product.color} border border-current/30 px-3 py-1 rounded-full`}>{product.subtitle}</span>
                    </div>
                    <p className="text-slate-400 text-lg mb-4 max-w-2xl">{product.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {product.features.map((feature, i) => (
                        <span key={i} className="text-xs font-mono text-slate-500 border border-white/10 px-3 py-1.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Index number */}
                  <div className={`text-6xl font-display font-bold opacity-5 ${product.color} absolute top-4 right-4`}>
                    0{index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why This Matters ── */}
        <section className="border-y border-white/5 bg-white/[0.02] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Why This Matters</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                ZeptoStack is not just another agent framework. It is a stack for building autonomous systems.
              </p>
            </motion.div>

            {/* Capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Zap, title: 'Lightweight', desc: 'Small enough to run locally on any machine' },
                { icon: Layers, title: 'Structured', desc: 'Orchestrate and coordinate agents at scale' },
                { icon: Server, title: 'Durable', desc: 'Survive failures and continue execution' },
                { icon: Shield, title: 'Secure', desc: 'Safely interact with real tools and machines' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 border border-white/10 hover:border-teal-500/30 bg-black/30 hover:bg-teal-950/10 transition-all rounded-lg group"
                >
                  <item.icon className="w-8 h-8 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {[
                'Personal local agents',
                'Edge automation',
                'IoT coordination',
                'Machine-connected workflows',
                'Autonomous operations',
              ].map((useCase) => (
                <span key={useCase} className="text-xs font-mono text-slate-400 border border-white/10 px-4 py-2 rounded-full hover:border-amber-500/30 hover:text-amber-400 transition-all cursor-default">
                  {useCase}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Vision + CTA ── */}
        <section id="vision" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-4 block">The Vision</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Built for the Next Phase<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-amber-400 to-purple-500">
                  of AI Software
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
                The future of AI is not only larger models in the cloud. It is also smaller, more reliable autonomous systems running close to where work actually happens.
              </p>
              <p className="text-base text-slate-500 max-w-xl mx-auto">
                On laptops. On gateways. On devices. Near machines. Inside local infrastructure.
              </p>
            </motion.div>

            {/* Vision Progression */}
            <div className="relative mb-20">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-500/40 via-amber-500/40 to-purple-500/40"></div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {visionStages.map((stage, index) => (
                  <motion.div
                    key={stage.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="text-center"
                  >
                    {/* Node */}
                    <div className="relative flex items-center justify-center mb-4">
                      <div className={`w-4 h-4 rounded-full ${stage.glow} shadow-[0_0_12px_currentColor]`}></div>
                      <div className={`absolute w-8 h-8 rounded-full ${stage.glow} opacity-20 animate-ping`} style={{ animationDuration: `${3 + index * 0.5}s` }}></div>
                    </div>
                    <h4 className={`font-display font-bold ${stage.color} text-sm mb-1`}>{stage.label}</h4>
                    <p className="text-xs text-slate-500">{stage.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Run Autonomous Agents Like Real Systems
              </h3>
              <p className="text-slate-400 mb-3 max-w-2xl mx-auto">
                From personal AI agents to edge and machine automation, ZeptoStack provides the lightweight runtime, orchestration, durability, and isolation required to make autonomous software actually work.
              </p>
              <p className="text-sm text-slate-500 font-medium mb-10">
                A local-first operating stack for autonomous agents.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#stack" className="group px-8 py-4 text-sm font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all shadow-[0_0_30px_rgba(45,212,191,0.4)] flex items-center gap-2">
                  EXPLORE THE ARCHITECTURE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="px-8 py-4 text-sm font-mono font-bold text-slate-300 border border-white/20 hover:border-white/40 hover:text-white transition-all">
                  GET STARTED
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Triangle className="w-5 h-5 text-teal-400 fill-teal-400/20" />
            <span className="text-lg font-display font-bold text-white">zeptostack</span>
            <span className="text-xs font-mono text-slate-600 ml-2">by AISAR</span>
          </div>
          <p className="text-xs text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} ZEPTOSTACK // LOCAL-FIRST AUTONOMOUS INFRASTRUCTURE
          </p>
          <div className="flex items-center gap-2 text-slate-600">
            <Lock className="w-3 h-3" />
            <span className="text-xs font-mono">OPEN SOURCE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
