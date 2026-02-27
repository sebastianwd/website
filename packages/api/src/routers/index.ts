import type { RouterClient } from '@orpc/server'

import { pageView } from './page-view'

export const router = {
  pageView
}

export type AppRouter = typeof router
export type AppRouterClient = RouterClient<typeof router>
