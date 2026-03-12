import type { ComponentProps } from 'react'

export const mdxComponents = {
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-4xl font-display font-bold text-white mt-12 mb-6" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-display font-bold text-white mt-10 mb-4" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-display font-bold text-white mt-8 mb-3" {...props} />
  ),
  p: (props: ComponentProps<'p'>) => (
    <p className="text-slate-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: ComponentProps<'a'>) => (
    <a className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors" {...props} />
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-1" {...props} />
  ),
  li: (props: ComponentProps<'li'>) => (
    <li className="text-slate-300" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-white/10 text-teal-300 font-mono text-sm px-1.5 py-0.5 rounded" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 font-mono text-sm" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-2 border-teal-500/50 pl-4 italic text-slate-400 mb-4" {...props} />
  ),
  hr: (props: ComponentProps<'hr'>) => (
    <hr className="border-white/10 my-8" {...props} />
  ),
}
