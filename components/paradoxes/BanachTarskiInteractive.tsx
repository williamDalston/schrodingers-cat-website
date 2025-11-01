'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BanachTarskiInteractive() {
  const [step, setStep] = useState<'sphere' | 'pieces' | 'rotate' | 'two'>('sphere')
  const [showWarning, setShowWarning] = useState(false)

  const handleNext = () => {
    if (step === 'sphere') {
      setStep('pieces')
    } else if (step === 'pieces') {
      setStep('rotate')
      setShowWarning(true)
    } else if (step === 'rotate') {
      setStep('two')
    } else {
      setStep('sphere')
      setShowWarning(false)
    }
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-primary-500 via-accent-500 to-tertiary-500 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Step label */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full z-10">
        <span className="text-white font-semibold text-sm">
          {step === 'sphere' && '🔵 One Sphere'}
          {step === 'pieces' && '🔪 Cutting...'}
          {step === 'rotate' && '🔄 Rotating'}
          {step === 'two' && '⚡ TWO Spheres!'}
        </span>
      </div>

      <div className="h-full flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 1: Original Sphere */}
            {step === 'sphere' && (
              <motion.div
                key="sphere"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border-4 border-white/30 mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-8xl mb-6"
                  >
                    🔵
                  </motion.div>
                  <p className="text-white text-xl font-semibold mb-2">One Solid Sphere</p>
                  <p className="text-white text-sm opacity-90">Volume: V</p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Pieces */}
            {step === 'pieces' && (
              <motion.div
                key="pieces"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30 mb-6">
                  <div className="flex justify-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-4xl"
                      >
                        🧩
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">Cut into Pieces</p>
                  <p className="text-white text-sm opacity-90">Finite pieces, strange shapes</p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Rotation */}
            {step === 'rotate' && (
              <motion.div
                key="rotate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30 mb-6">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotate: [0, 360, 0],
                          x: [0, i * 20 - 40, 0],
                          y: [0, -20, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          delay: i * 0.1,
                          repeat: Infinity
                        }}
                        className="text-4xl"
                      >
                        🧩
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-white text-xl font-semibold mb-2">Rotating & Moving</p>
                  <p className="text-white text-sm opacity-90">No stretching, just rotation!</p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Two Spheres */}
            {step === 'two' && (
              <motion.div
                key="two"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-center"
              >
                <div className="bg-yellow-500/20 backdrop-blur-md rounded-2xl p-8 border-4 border-yellow-500/50 mb-6">
                  <div className="flex justify-center gap-8 mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-8xl"
                    >
                      🔵
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-8xl"
                    >
                      🔵
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-yellow-500/50 px-6 py-3 rounded-full inline-block mb-4"
                  >
                    <p className="text-white text-2xl font-bold">💥 IMPOSSIBLE!</p>
                  </motion.div>
                  <p className="text-white text-lg font-semibold mb-2">Two Spheres Same Size!</p>
                  <p className="text-white text-sm opacity-90">Volume: V + V = 2V (magic!)</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Warning */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-4 bg-red-500/90 backdrop-blur-md rounded-xl border-4 border-red-600 flex items-center justify-center z-20"
          >
            <div className="text-center text-white p-8">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-xl font-bold mb-3">Non-Measurable Sets!</p>
              <p className="text-sm leading-relaxed max-w-md mb-4">
                These pieces can&apos;t have volume because the Axiom of Choice creates &quot;weird&quot; sets 
                that violate normal geometry. It&apos;s mathematically valid but physically impossible!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWarning(false)}
                className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 font-semibold"
              >
                Got it!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          aria-label="Next step"
        >
          {step === 'two' ? '🔄 Restart' : '▶️ Next Step'}
        </motion.button>
      </div>

      {/* Description */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs z-10">
        <p className="text-white text-xs text-center">
          {step === 'two' 
            ? 'Mathematics says yes! Physics says no!' 
            : 'The paradox that breaks volume conservation'}
        </p>
      </div>
    </div>
  )
}

