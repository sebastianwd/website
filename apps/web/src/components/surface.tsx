import { cn } from '@repo/ui/utils/cn'
import type { ComponentProps } from 'react'

export const Surface = ({ children, ...props }: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'rounded-2xl border-t border-zinc-600 bg-neutral-800 shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
