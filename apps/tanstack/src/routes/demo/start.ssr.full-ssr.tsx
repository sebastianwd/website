import { orpc } from '@repo/api/lib/orpc.client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/start/ssr/full-ssr')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.orpc.example.queryOptions())
  }
})

function RouteComponent() {
  const { data } = useSuspenseQuery(orpc.example.queryOptions())

  return (
    <div
      className='flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-800 to-black p-4 text-white'
      style={{
        backgroundImage: 'radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)'
      }}
    >
      <div className='w-full max-w-2xl rounded-xl border-8 border-black/10 bg-black/50 p-8 shadow-xl backdrop-blur-md'>
        <h1 className='mb-6 text-3xl font-bold text-purple-400'>Full SSR - Punk Songs</h1>
        <ul className='space-y-3'>{data}</ul>
      </div>
    </div>
  )
}
