'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { UserGroupIcon, BookOpenIcon, LightBulbIcon } from '@heroicons/react/24/outline'

interface Stat {
  icon: typeof UserGroupIcon
  label: string
  value: number
  suffix?: string
  color: string
}

const stats: Stat[] = [
  { 
    icon: UserGroupIcon, 
    label: 'Explorers Online', 
    value: 127, 
    suffix: '+',
    color: 'from-primary-500 to-primary-600'
  },
  { 
    icon: BookOpenIcon, 
    label: 'Paradoxes Explored', 
    value: 1247, 
    suffix: '+',
    color: 'from-accent-500 to-accent-600'
  },
  { 
    icon: LightBulbIcon, 
    label: 'Curiosities Unlocked', 
    value: 5231, 
    suffix: '+',
    color: 'from-tertiary-500 to-tertiary-600'
  },
]

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest))
  const spring = useSpring(count, { 
    damping: 30, 
    stiffness: 200,
    restDelta: 0.01
  })

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [rounded])

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export default function InteractiveStats() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    setIsVisible(true)
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl p-8 overflow-hidden"
    >
      {/* Animated background gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(22, 163, 74, 0.3), transparent 40%)`,
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6 text-center">
          Live Stats
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

