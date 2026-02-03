import { cn } from '@repo/ui/utils/cn'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useState } from 'react'

export const Tooltip = ({
  text,
  icon,
  children,
  className
}: {
  text: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => {
        setHovered(true)
      }}
      onHoverEnd={() => {
        setHovered(false)
      }}
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className='absolute bottom-full left-1/2 mb-2 w-fit -translate-x-1/2 rounded-xl border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white'
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      {icon || children}
    </motion.div>
  )
}
