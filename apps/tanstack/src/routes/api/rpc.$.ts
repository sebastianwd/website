import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { createContext } from '@repo/api/context'
import { router } from '@repo/api/routers/index'
import { createFileRoute } from '@tanstack/react-router'

const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error)
    })
  ]
})

export const Route = createFileRoute('/api/rpc/$')({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const { response } = await handler.handle(request, {
          prefix: '/api/rpc',
          context: await createContext(request)
        })

        return response ?? new Response('Not Found', { status: 404 })
      }
    }
  }
})
