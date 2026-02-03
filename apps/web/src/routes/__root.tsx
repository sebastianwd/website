import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Footer } from '~/components/footer'
import appCss from '~/global.css?url'
import type { RootRouteContext } from '~/types'

import Header from '../components/header'

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: 'Sebastian Luque | Fullstack Developer'
      },
      {
        name: 'description',
        content: 'Portfolio of Sebastian Luque — React, TypeScript and fullstack developer.'
      }
    ],
    links: [
      { rel: 'preload', href: '/fonts/clvtc.otf', as: 'font', type: 'font/otf', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss, blocking: 'render' }
    ]
  }),
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <head>
        <HeadContent />
      </head>
      <body
        className='relative min-h-svh overflow-x-hidden'
        style={{
          backgroundImage: 'url(/gradient.webp)',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y',
          backgroundSize: 'contain'
        }}
      >
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right'
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
