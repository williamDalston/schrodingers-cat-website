'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import QuantumWaveParticle from './QuantumWaveParticle'

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
      color: i % 3 === 0 ? 'rgba(59, 130, 246, 0.08)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.08)' : 'rgba(236, 72, 153, 0.08)',
      depth: i % 3 === 0 ? 'depth-layer-2' : i % 3 === 1 ? 'depth-layer-3' : 'depth-layer-1',
    }))
  }, [])
  
  return (
    <section className="relative min-h-screen sm:min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden particle-bg perspective-container py-20 sm:py-0">
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
          className="absolute top-20 left-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-blue-400/25 via-purple-400/25 to-pink-400/25 rounded-full blur-[100px] sm:blur-[120px] parallax-slow quantum-glow"
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
          className="absolute bottom-20 right-20 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-purple-400/25 via-pink-400/25 to-blue-400/25 rounded-full blur-[120px] sm:blur-[140px] parallax-medium quantum-glow"
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
            className="mb-10 inline-flex items-center gap-3 glass px-8 py-4 rounded-full depth-shadow-2 quantum-layer depth-layer-3 border border-white/80 backdrop-blur-xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <SparklesIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Quantum Mechanics & Consciousness Research
            </span>
          </motion.div>

          {/* Main heading with scholarly tone */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tight"
          >
            <span className="block text-gray-900 mb-3 drop-shadow-sm">Exploring the Nature of</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              className="block bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
            >
              Consciousness & Reality
            </motion.span>
          </motion.h1>

          {/* Scholarly subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-14 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Deep exploration of quantum consciousness theories, fundamental paradoxes, and the intersection of{' '}
            <span className="font-medium text-gray-700">physics</span>,{' '}
            <span className="font-medium text-gray-700">philosophy</span>, and{' '}
            <span className="font-medium text-gray-700">neuroscience</span>.
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
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl depth-shadow-3 btn-3d quantum-glow overflow-hidden animate-gradient glow-border hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative flex items-center gap-3">
                Explore Articles
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
              className="group relative inline-flex items-center px-12 py-6 glass text-gray-900 text-lg font-bold rounded-2xl border-2 border-gray-200/80 hover:border-purple-300 depth-shadow-2 btn-3d quantum-layer transition-all duration-300 overflow-hidden backdrop-blur-xl hover:bg-white/95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-50/60 to-purple-50/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center gap-2">
                Research Library
                <ArrowRightIcon className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>

          {/* Interactive Quantum Wave Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 hover:border-purple-200/50 transition-all duration-300">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 text-center">
                Interactive: Wave-Particle Duality
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
                Move your cursor over the visualization to observe how quantum particles respond to observation, 
                demonstrating the fundamental principle of wave-particle duality in quantum mechanics.
              </p>
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-4">
                <QuantumWaveParticle />
              </div>
            </div>
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

