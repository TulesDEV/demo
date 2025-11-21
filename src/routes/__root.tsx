/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Tules | LinkedIn Outreach Automation Demo',
        description:
          'Tules previews AI-assisted LinkedIn outreach campaigns, inbox automation, and analytics for prospective clients.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />, 
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Campaigns', href: '#campaigns' },
    { label: 'Activity', href: '#activity' },
  ]

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-950 text-slate-50">
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
              <div className="flex items-center gap-3">
                <Link to="/" className="text-xl font-semibold tracking-tight">
                  Tules
                </Link>
                <span className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Demo site
                </span>
              </div>
              <nav className="hidden flex-1 items-center gap-6 text-sm text-slate-300 md:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="ml-auto flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span className="hidden md:inline">Interactive mock experience</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-white text-[11px]">Sandbox ready</span>
              </div>
            </div>
          </header>
          <div className="pb-10">{children}</div>
          <footer className="border-t border-white/5 bg-slate-950/90">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
              <p>(c) {new Date().getFullYear()} Tules Demo Workspace.</p>
              <p className="text-slate-500">Mock environment for showcasing outreach automation.</p>
            </div>
          </footer>
        </div>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
