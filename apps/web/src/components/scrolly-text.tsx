import { cn } from '@repo/ui/utils/cn'
import { useRef, useState } from 'react'

interface ScrollyTextProps {
  animationClassName: string
  text: string
  className?: string
  timePerChar?: number
}

export const ScrollyText = (props: ScrollyTextProps) => {
  const { animationClassName, text, className, timePerChar } = props

  const [animationDuration, setAnimationDuration] = useState<string>()
  const [animationEnablerClass, setAnimationEnablerClass] = useState<string>('overflow-clip')
  const [timesHovered, setTimesHovered] = useState(0)

  const scrollTextRef = useRef<HTMLParagraphElement>(null)

  const onMouseEnter = () => {
    if (!scrollTextRef.current) return

    if (timesHovered <= 1) {
      setTimesHovered((prev) => prev + 1)
    }
    if (animationEnablerClass === animationClassName) return

    const totalTextWidth = scrollTextRef.current.scrollWidth
    const visibleTextWidth = scrollTextRef.current.offsetWidth

    const isOverflowing = totalTextWidth > visibleTextWidth
    if (!isOverflowing) {
      scrollTextRef.current.style.setProperty('--marquee-x', `0px`)
      return
    }

    const TIME_MULTIPLIER = timePerChar ?? 25
    const OFFSET = 10

    const distance = totalTextWidth - visibleTextWidth + OFFSET
    const duration = TIME_MULTIPLIER * distance

    scrollTextRef.current.style.setProperty('--marquee-x', `${-distance}px`)

    setAnimationDuration(`${duration}ms`)
    setAnimationEnablerClass(animationClassName)
  }

  const isAnimating = animationEnablerClass === animationClassName

  return (
    <div
      className={cn(
        'group -mr-1.5 -ml-1.5 overflow-clip',
        isAnimating && 'mask-[linear-gradient(90deg,transparent_0,#000_6px,#000_calc(100%-12px),transparent)]'
      )}
      onMouseEnter={onMouseEnter}
    >
      <p
        className={cn(
          `max-w-full px-1.5 text-ellipsis whitespace-nowrap group-hover:overflow-visible`,
          className,
          animationEnablerClass,
          isAnimating && timesHovered > 1 && 'group-hover:paused'
        )}
        onAnimationEnd={() => {
          setAnimationEnablerClass('overflow-clip')
          setTimesHovered(0)
        }}
        style={{
          animationDuration: animationDuration,
          animationIterationCount: 2
        }}
        ref={scrollTextRef}
      >
        {text}
      </p>
    </div>
  )
}
