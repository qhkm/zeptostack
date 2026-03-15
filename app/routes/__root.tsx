import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import '../styles/index.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'ZeptoStack — A lightweight, secure, local-first stack for running autonomous agents reliably.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'ZeptoStack — The Operating Stack for Autonomous Agents' },
      {
        property: 'og:description',
        content:
          'A lightweight, secure, local-first stack for running autonomous agents reliably — from personal AI assistants to edge and IoT automation.',
      },
      { property: 'og:image', content: 'https://zeptostack.com/og-image.png' },
      { property: 'og:url', content: 'https://zeptostack.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'ZeptoStack — The Operating Stack for Autonomous Agents' },
      {
        name: 'twitter:description',
        content:
          'A lightweight, secure, local-first stack for running autonomous agents reliably.',
      },
      { name: 'twitter:image', content: 'https://zeptostack.com/og-image.png' },
    ],
    title: 'ZeptoStack — Local-First Autonomous Infrastructure',
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@100..800&display=swap',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-slate-400 font-mono text-sm mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 text-sm font-mono font-bold text-black bg-teal-400 hover:bg-teal-300 transition-all"
        >
          GO HOME
        </a>
      </div>
    </div>
  )
}
