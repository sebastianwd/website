import { cn } from '@repo/ui/utils/cn'

type BlogImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  maxWidth?: number | string
  centered?: boolean
  caption?: string
  className?: string
}

export function BlogImage({ src, alt, width, height, maxWidth, centered = false, caption, className }: BlogImageProps) {
  const style: React.CSSProperties = {}
  if (width != null) style.width = typeof width === 'number' ? `${width}px` : width
  if (height != null) style.height = typeof height === 'number' ? `${height}px` : height
  if (maxWidth != null) style.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

  const img = (
    <img src={src} alt={alt} className={cn('max-w-full rounded-lg', centered && 'mx-auto block', className)} />
  )

  if (caption) {
    return (
      <figure className={cn('my-6', centered && 'flex flex-col items-center')}>
        {img}
        <figcaption className='mt-2 text-center text-sm text-zinc-400'>{caption}</figcaption>
      </figure>
    )
  }

  return <span className={cn('my-6 block', centered && 'flex justify-center')}>{img}</span>
}
