import { cn } from '@repo/ui/utils/cn'
import type { HTMLAttributes } from 'react'

import { VideoPlayer } from './video-player'

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  media?: {
    type: 'image' | 'video'
    url: string
  }
  href?: string
}

export function ProjectCard({ title, media, href, className, ...rest }: ProjectCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-solid border-neutral-700/75 bg-zinc-900/15 p-1',
        className
      )}
      title={title}
    >
      <a href={href} target='_blank' rel='noopener noreferrer' className='block w-full'>
        <div
          className='aspect-video w-full overflow-hidden rounded-lg'
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), 80%, rgba(0, 0, 0, 0))'
          }}
        >
          {media?.type === 'video' ? (
            <VideoPlayer src={media.url} className='size-full object-cover' />
          ) : (
            <img className='size-full object-cover' src={media?.url} alt={title} />
          )}
        </div>
      </a>
      <div className='relative'>
        <h3 className='absolute -top-7 px-4 text-xs text-stone-300'>{title}</h3>
      </div>
    </div>
  )
}
