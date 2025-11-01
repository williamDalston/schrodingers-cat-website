'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function QuantumWaveParticle() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
      setParticles(newParticles)
    }
    initParticles()
  }, [])

  // Update particle positions and create wave interference
  useEffect(() => {
    if (!isHovered) return

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          // Calculate distance from mouse
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Create wave-like repulsion force
          const force = distance > 0 ? 100 / (distance + 10) : 0
          const angle = Math.atan2(dy, dx)

          // Update velocity with wave interference
          let newVx = particle.vx + (Math.cos(angle) * force) * 0.01
          let newVy = particle.vy + (Math.sin(angle) * force) * 0.01

          // Add wave oscillation
          newVx += Math.sin(particle.id * 0.1 + Date.now() * 0.001) * 0.05
          newVy += Math.cos(particle.id * 0.1 + Date.now() * 0.001) * 0.05

          // Damping
          newVx *= 0.95
          newVy *= 0.95

          // Update position
          let newX = particle.x + newVx
          let newY = particle.y + newVy

          // Boundary wrapping
          if (newX < 0) newX = 100
          if (newX > 100) newX = 0
          if (newY < 0) newY = 100
          if (newY > 100) newY = 0

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            opacity: 0.3 + (distance < 20 ? 0.7 : 0) * (1 - distance / 20),
          }
        })
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [mousePos, isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-primary-200/50 bg-gradient-to-br from-primary-50/50 via-white/30 to-accent-50/50 backdrop-blur-sm cursor-crosshair group"
    >
      {/* Wave interference lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {particles.slice(0, 10).map((particle, i) => (
          <motion.circle
            key={`wave-${particle.id}`}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={isHovered ? 30 : 0}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="1"
            strokeOpacity={0.3}
            animate={{
              r: isHovered
                ? [
                    20 + Math.sin(Date.now() * 0.001 + i) * 10,
                    40 + Math.sin(Date.now() * 0.001 + i) * 10,
                    20 + Math.sin(Date.now() * 0.001 + i) * 10,
                  ]
                : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <radialGradient id="waveGradient">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Particles */}
      {particles.map((particle) => {
        const distance = Math.sqrt(
          Math.pow(mousePos.x - particle.x, 2) + Math.pow(mousePos.y - particle.y, 2)
        )
        const intensity = distance < 15 ? 1 - distance / 15 : 0

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, 
                rgba(34, 197, 94, ${particle.opacity + intensity * 0.5}) 0%, 
                rgba(245, 158, 11, ${particle.opacity * 0.7 + intensity * 0.3}) 50%, 
                rgba(59, 130, 246, ${particle.opacity * 0.5 + intensity * 0.2}) 100%)`,
              boxShadow: isHovered
                ? `0 0 ${10 + intensity * 15}px rgba(34, 197, 94, ${0.5 + intensity * 0.5})`
                : 'none',
              transform: `translate(-50%, -50%) scale(${1 + intensity * 0.5})`,
            }}
            animate={{
              scale: isHovered
                ? [1, 1.2 + intensity * 0.3, 1]
                : [1, 1.05, 1],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Mouse cursor indicator */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="w-4 h-4 border-2 border-primary-600 rounded-full bg-primary-600/20" />
          <motion.div
            className="absolute inset-0 border-2 border-primary-400 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}

      {/* Label overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary-200/50">
          <p className="text-xs font-semibold text-gray-700 mb-1">
            {isHovered ? 'Wave-Particle Interaction' : 'Quantum Wave Visualization'}
          </p>
          <p className="text-xs text-gray-600">
            {isHovered
              ? 'Move your cursor to observe wave interference patterns'
              : 'Hover to interact with quantum particles'}
          </p>
        </div>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 bg-primary-600/90 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-xs font-semibold"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Quantum State Active
          </motion.div>
        )}
      </div>
    </div>
  )
}

