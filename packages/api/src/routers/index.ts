import type { RouterClient } from '@orpc/server'
import { os } from '@orpc/server'

const example = os.handler(() => {
  return 'Hello, world!'
})

export const router = {
  example
}

export type AppRouter = typeof router
export type AppRouterClient = RouterClient<typeof router>
