import type { RouterClient } from '@orpc/server'
import { os } from '@orpc/server'

import { pageView } from './page-view'

const example = os.handler(() => {
  return 'Hello, world!'
})

export const router = {
  example,
  pageView
}

export type AppRouter = typeof router
export type AppRouterClient = RouterClient<typeof router>
