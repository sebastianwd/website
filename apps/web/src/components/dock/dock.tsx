import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import DockItem from './dock-item'

interface Props {
  items: {
    icon: ReactNode
    action: () => void
  }[]
}

const Dock = ({ items }: Props) => {
  const [mouseX, setMouseX] = useState<number | undefined>(undefined)

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    setMouseX(event.clientX)
  }

  return (
    <motion.div
      className=''
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        setMouseX(undefined)
      }}
    >
      {items.map((item, index) => (
        <DockItem key={index} size={48} magnification={1.8} mouseX={mouseX} icon={item.icon} onClick={item.action} />
      ))}
    </motion.div>
  )
}

export default Dock
