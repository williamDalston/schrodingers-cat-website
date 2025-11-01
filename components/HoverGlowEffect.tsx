'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverGlowEffectProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function HoverGlowEffect({ 
  children, 
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.3)'
}: HoverGlowEffectProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { 
            opacity: [0.5, 0.8, 0.5], 
            scale: [0.8, 1.2, 0.8],
          },
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

