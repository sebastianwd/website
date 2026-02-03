import { orpc, queryClient } from '@repo/api/lib/orpc.client'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { DefaultCatchBoundary } from '~/components/catch-boundary'
import { NotFound } from '~/components/not-found'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: { queryClient, orpc },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: (props: { children: React.ReactNode }) => {
      return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    }
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    wrapQueryClient: false
  })

  return router
}
