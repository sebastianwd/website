import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import useCalculateSize from './use-calculate-size'

interface Props {
  mouseX: number | undefined
  size: number
  magnification: number
  icon: ReactNode
  onClick: () => void
}

const DockItem = ({ mouseX, size, magnification, icon, onClick }: Props) => {
  const el = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    onClick()
  }

  const dynamicSize = useCalculateSize(el, size, mouseX, magnification)

  return (
    <motion.button
      className='dock-item'
      whileTap={{ scale: 0.85 }}
      onTap={handleClick}
      ref={el}
      style={{
        width: dynamicSize,
        height: dynamicSize
      }}
    >
      {icon}
    </motion.button>
  )
}

export default DockItem
