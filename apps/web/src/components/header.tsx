import { Icon } from '@iconify/react'
import { Button } from '@repo/ui/components/button'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/popover'
import { clamp } from 'es-toolkit'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

import { CyberBorder1 } from '~/components/graphics'

const DEFAULT_ACCENT = 'oklch(88.894% 0.16446 176.877)'

const ACCENT_COLORS = [
  DEFAULT_ACCENT, // teal (default)
  'oklch(70% 0.2 340)', // pink
  'oklch(70% 0.2 270)', // purple
  'oklch(70% 0.2 200)', // blue
  'oklch(75% 0.15 140)', // green
  'oklch(80% 0.18 80)', // yellow
  'oklch(70% 0.2 30)', // orange
  'oklch(65% 0.25 15)' // red
]

const useBoundedScroll = (bounds: number, options?: { onlyUpdateInRange?: boolean }) => {
  const { scrollY } = useScroll()

  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() // Get previous scroll position
    const diff = current - (previous ?? 0) // Calculate scroll delta (+ = down, - = up)

    // Only update if scroll is within range (0 to bounds) when onlyUpdateInRange is enabled
    if (options?.onlyUpdateInRange && (current < 0 || current > bounds)) {
      return
    }

    const newScrollYBounded = scrollYBounded.get() + diff
    scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
  })
  return { scrollYBounded, scrollYBoundedProgress }
}

const ACCENT_STORAGE_KEY = 'accent-color'

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCENT_STORAGE_KEY) ?? DEFAULT_ACCENT
    }
    return DEFAULT_ACCENT
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', selectedColor)
  }, [selectedColor])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    localStorage.setItem(ACCENT_STORAGE_KEY, color)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='shiny' size='icon' className='rounded-xl bg-zinc-800 hover:opacity-80'>
          <Icon icon='mdi:palette' className='size-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-3' align='end'>
        <div className='grid grid-cols-4 gap-2'>
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              type='button'
              onClick={() => handleColorChange(color)}
              className='flex size-8 items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <Icon icon='mdi:check' className='size-4 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]' />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function Header() {
  const { scrollYBoundedProgress } = useBoundedScroll(100, { onlyUpdateInRange: true })

  const scale = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.96])
  const marginTop = useTransform(scrollYBoundedProgress, [0, 1], [16, 8])
  return (
    <>
      <header className='sticky inset-x-0 top-0 z-10'>
        <div className='relative'>
          <div className='relative grid w-full'>
            <motion.div
              className='relative z-10 col-start-1 row-start-1 container mx-auto flex max-w-5xl items-center justify-center px-4'
              style={{ marginTop: marginTop }}
            >
              <motion.div
                className='flex h-16 w-full items-center gap-3 rounded-lg px-4 outline-1 outline-neutral-700 backdrop-blur-md'
                style={{ scale: scale }}
              >
                <img src='/logo-small.svg' alt='Logo' className='h-16 w-auto' />
                <div className='flex-1' />
                <ColorPicker />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <CyberBorder1 className='size-full' />
      </header>
    </>
  )
}
