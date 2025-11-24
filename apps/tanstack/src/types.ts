import type { getQueryClient, orpc } from '@repo/api/lib/orpc.client'

export interface RootRouteContext {
  queryClient: ReturnType<typeof getQueryClient>
  orpc: typeof orpc
}
