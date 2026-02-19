import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Footer } from '~/components/footer'
import appCss from '~/global.css?url'
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '~/lib/site'
import type { RootRouteContext } from '~/types'

import Header from '../components/header'

const defaultTitle = `${SITE_NAME} | Fullstack Developer`

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: defaultTitle },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { name: 'theme-color', content: '#0a0a0a' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: defaultTitle },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: `${SITE_URL}${DEFAULT_OG_IMAGE}` },
      { property: 'og:image:alt', content: SITE_NAME },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: defaultTitle },
      { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
      { name: 'twitter:image', content: `${SITE_URL}${DEFAULT_OG_IMAGE}` }
    ],
    links: [
      { rel: 'preload', href: '/fonts/clvtc.otf', as: 'font', type: 'font/otf', crossOrigin: 'anonymous' },
      { rel: 'preload', href: '/gradient.webp', as: 'image' },
      { rel: 'preload', href: '/assets/bg-artwork.png', as: 'image' },
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
        {import.meta.env.DEV && (
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
        )}
        <Scripts />
      </body>
    </html>
  )
}
