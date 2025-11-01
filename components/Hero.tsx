'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon, GiftIcon } from '@heroicons/react/24/outline'

// Seeded random function for stable particle positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function Hero() {
  const floatingElements = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: seededRandom(i * 1.2345) * 400 + 200,
      height: seededRandom(i * 2.6789) * 400 + 200,
      left: seededRandom(i * 3.4567) * 100,
      top: seededRandom(i * 4.8901) * 100,
      xOffset: (seededRandom(i * 5.1234) * 50 - 25),
      duration: seededRandom(i * 6.789) * 10 + 10,
      delay: seededRandom(i * 7.3456) * 5,
      color: i % 2 === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(217, 70, 239, 0.1)',
      depth: i % 3 === 0 ? 'depth-layer-2' : i % 3 === 1 ? 'depth-layer-3' : 'depth-layer-1',
    }))
  }, [])
  
  return (
    <section className="relative min-h-screen sm:min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden particle-bg perspective-container py-20 sm:py-0">
      {/* Animated floating orbs with 3D depth */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute rounded-full quantum-fluctuate ${element.depth}`}
            style={{
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
              background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, element.xOffset, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing background gradients with parallax depth */}
      <div className="absolute inset-0 opacity-40 parallax-container">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-primary-400/30 to-accent-400/30 rounded-full blur-[80px] sm:blur-[100px] parallax-slow quantum-glow"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-accent-400/30 to-primary-400/30 rounded-full blur-[100px] sm:blur-[120px] parallax-medium quantum-glow"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Professional badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 glass px-6 py-3 rounded-full depth-shadow-2 quantum-layer depth-layer-3"
          >
            <SparklesIcon className="h-5 w-5 text-primary-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-gray-700">
              Quantum Mechanics & Consciousness Research
            </span>
          </motion.div>

          {/* Main heading with scholarly tone */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
          >
            <span className="block text-gray-900 mb-2">Exploring the Nature of</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent"
            >
              Consciousness & Reality
            </motion.span>
          </motion.h1>

          {/* Scholarly subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Deep exploration of quantum consciousness theories, fundamental paradoxes, and the intersection of physics, philosophy, and neuroscience.
          </motion.p>

          {/* CTA buttons with 3D depth effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center depth-layer-4"
          >
            <Link
              href="/paradoxes"
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 text-white text-lg font-bold rounded-2xl depth-shadow-3 btn-3d quantum-glow overflow-hidden animate-gradient glow-border"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">
                Start Exploring
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRightIcon className="h-6 w-6 icon-3d group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </motion.div>
              </span>
            </Link>
            <Link
              href="/curiosity"
              className="group relative inline-flex items-center px-10 py-5 glass text-gray-900 text-lg font-bold rounded-2xl border-2 border-transparent hover:border-primary-300 depth-shadow-2 btn-3d quantum-layer transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/50 to-primary-50/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              <span className="relative z-10">Daily Curiosity</span>
            </Link>
          </motion.div>


          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-gray-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

