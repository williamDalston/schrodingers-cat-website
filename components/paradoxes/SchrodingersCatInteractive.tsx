'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SchrodingersCatInteractive() {
  const [isObserved, setIsObserved] = useState(false)
  const [isAlive, setIsAlive] = useState(Math.random() > 0.5)
  const [boxOpen, setBoxOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const handleObserve = () => {
    if (!isObserved && !boxOpen) {
      setIsObserved(true)
      setIsAlive(Math.random() > 0.5)
      setBoxOpen(true)
      setClickCount(prev => prev + 1)
    }
  }

  const handleReset = () => {
    setIsObserved(false)
    setIsAlive(Math.random() > 0.5)
    setBoxOpen(false)
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-primary-500 via-accent-500 to-tertiary-500 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Quantum state indicator */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-semibold text-sm">
          {isObserved ? (isAlive ? '🐱 Alive!' : '💀 Dead') : '⚛️ Superposition'}
        </span>
      </div>

      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          {/* The Box */}
          <motion.div
            animate={{
              scale: boxOpen ? 1.1 : 1,
              opacity: boxOpen ? 0.8 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="relative cursor-pointer"
            onClick={handleObserve}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleObserve()}
            aria-label="Open the quantum box to observe the cat"
          >
            {/* Particle effects during superposition */}
            <AnimatePresence>
              {!isObserved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, Math.cos(i * Math.PI / 4) * 80, 0],
                        y: [0, Math.sin(i * Math.PI / 4) * 80, 0],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Cat */}
            <motion.div
              animate={{
                opacity: isObserved ? 1 : 0.5,
                scale: isObserved ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
              className="text-8xl mb-8"
            >
              {isObserved ? (isAlive ? '🐱' : '💀') : '🐱💀'}
            </motion.div>

            {/* The Box Frame */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-12 border-4 border-white/30">
              <div className="text-white">
                <div className="text-4xl mb-4">📦</div>
                {!isObserved && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-xl font-semibold mb-2">Closed Box</p>
                    <p className="text-sm opacity-90">Click to observe!</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Result */}
          <AnimatePresence>
            {isObserved && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
                >
                  <p className="text-white text-lg font-bold">
                    {isAlive ? '✅ Cat is alive!' : '❌ Cat is dead'}
                  </p>
                  {clickCount > 1 && (
                    <p className="text-white text-sm mt-1">
                      Same setup, different outcome!
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
            aria-label="Reset the experiment"
          >
            Reset Experiment
          </motion.button>
        </div>
      </div>

      {/* Quantum description */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-white text-xs text-center">
          {isObserved 
            ? 'Observation collapsed the wave function into a definite state!' 
            : 'Before observation, the cat exists in superposition of both states'}
        </p>
      </div>
    </div>
  )
}

