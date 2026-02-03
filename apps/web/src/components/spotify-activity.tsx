import { Icon } from '@iconify/react'
import { cn } from '@repo/ui/utils/cn'
import { useQuery } from '@tanstack/react-query'

import { ScrollyText } from '~/components/scrolly-text'
import { WaveIcon } from '~/components/waves'
import { getSpotifyActivity } from '~/server/spotify'

export function SpotifyActivity(props: { className?: string }) {
  const { className } = props

  const { data, error, isPending } = useQuery({
    queryKey: ['spotify-activity'],
    queryFn: () => getSpotifyActivity(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000
  })

  if (isPending) {
    return (
      <div className={className}>
        <div className='mt-2 flex items-center gap-3'>
          <div className='size-12 rounded bg-neutral-700' />
          <div className='flex flex-col gap-1'>
            <div className='h-3 w-32 rounded bg-neutral-700' />
            <div className='h-3 w-20 rounded bg-neutral-700' />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className='size-12 rounded bg-neutral-800' />
        <div>
          <p className='flex items-center gap-1.5 text-sm text-accent'>
            <Icon icon='mdi:spotify' className='size-4' />
            Offline
          </p>
          <p className='text-sm text-zinc-400'>Not available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-3 overflow-hidden', className)}>
      <div className='relative shrink-0'>
        <img
          src={data.coverImg}
          alt={data.song}
          className='h-16 w-auto min-w-0 shrink-0 grow rounded-md border border-solid border-zinc-800 md:w-full'
        />
        {data.isPlaying && <WaveIcon className='absolute right-0 bottom-0 h-5 shrink-0 text-accent' />}
      </div>
      <div className='min-w-0'>
        <p className='mb-1 flex items-center gap-1.5 font-clvtc text-accent'>
          <Icon icon='mdi:spotify' className='size-6' />
          {data.isPlaying ? "I'm listening to:" : 'Recently played:'}
        </p>
        <div className='mr-auto flex min-w-0 flex-col'>
          <div className='my-auto'>
            <ScrollyText
              animationClassName='animate-marquee'
              className='font-iamono mb-0.5 text-sm font-bold'
              text={String(data.song)}
              timePerChar={30}
            />
            <ScrollyText
              animationClassName='animate-marquee'
              className='font-iamono text-xs'
              text={String(data.artist)}
              timePerChar={30}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
