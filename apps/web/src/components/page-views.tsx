import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface PageViewsData {
  total: number
  unique: number
}

function useTrackPageView(slug: string) {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/page-view', JSON.stringify({ slug }))
    }
  }, [slug])
}

export function PageViews({ slug = '/' }: { slug?: string }) {
  useTrackPageView(slug)

  const { data, error, isLoading } = useQuery<PageViewsData>({
    queryKey: ['page-views', slug],
    queryFn: () => fetch(`/api/page-view?${new URLSearchParams({ slug })}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5
  })

  if (isLoading) {
    return (
      <div className='animate-pulse text-sm'>
        <div className='mb-1.5 h-4 w-10 rounded bg-zinc-700' />
        <div className='mt-1.5 flex flex-col gap-1'>
          <div className='flex items-center justify-between gap-4'>
            <div className='h-3.5 w-10 rounded bg-zinc-700' />
            <div className='h-3.5 w-14 rounded bg-zinc-700' />
          </div>
          <div className='flex items-center justify-between gap-4'>
            <div className='h-3.5 w-12 rounded bg-zinc-700' />
            <div className='h-3.5 w-14 rounded bg-zinc-700' />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className='text-sm text-red-400'>Error</div>
  }

  if (!data) return null

  return (
    <div className='text-sm'>
      <p className='font-medium text-accent'>Visits</p>
      <div className='mt-1.5 flex flex-col gap-1 text-zinc-400'>
        <p className='flex items-center justify-between gap-4'>
          <span className='text-zinc-500'>Total:</span>
          <span className='font-mono tracking-wide tabular-nums'>{String(data.total).padStart(6, '0')}</span>
        </p>
        <p className='flex items-center justify-between gap-4'>
          <span className='text-zinc-500'>Unique:</span>
          <span className='font-mono tracking-wide tabular-nums'>{String(data.unique).padStart(6, '0')}</span>
        </p>
      </div>
    </div>
  )
}
