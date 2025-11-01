'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function GrandfatherParadoxInteractive() {
  const [timeline, setTimeline] = useState<'present' | 'travel' | 'kill' | 'paradox'>('present')
  const [showExplanation, setShowExplanation] = useState(false)

  const handleStep = () => {
    if (timeline === 'present') {
      setTimeline('travel')
    } else if (timeline === 'travel') {
      setTimeline('kill')
      setTimeout(() => setTimeline('paradox'), 1500)
    } else {
      setTimeline('present')
      setShowExplanation(false)
    }
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-accent-500 via-primary-500 to-purple-500 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Timeline Label */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-semibold text-sm">
          {timeline === 'present' && '⏱️ Present'}
          {timeline === 'travel' && '🚀 Traveling'}
          {timeline === 'kill' && '⚔️ Attempting'}
          {timeline === 'paradox' && '⚠️ PARADOX'}
        </span>
      </div>

      <div className="h-full flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Timeline */}
          <div className="relative mb-8">
            <div className="h-2 bg-white/30 rounded-full mb-6" />
            <div className="flex justify-between items-start">
              {/* Present */}
              <motion.div
                animate={{
                  scale: timeline === 'present' ? 1.2 : 1,
                  opacity: timeline === 'present' || timeline === 'travel' ? 1 : 0.5,
                }}
                className="text-center"
              >
                <div className="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 font-bold">
                  YOU
                </div>
                <p className="text-white text-xs font-semibold">Present</p>
              </motion.div>

              {/* Travel */}
              <motion.div
                animate={{
                  scale: timeline === 'travel' ? 1.2 : 1,
                  opacity: timeline === 'travel' || timeline === 'kill' ? 1 : 0.5,
                }}
                className="text-center"
              >
                <div className="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 font-bold">
                  ⏰
                </div>
                <p className="text-white text-xs font-semibold">Past</p>
              </motion.div>

              {/* Kill */}
              <motion.div
                animate={{
                  scale: timeline === 'kill' ? 1.2 : 1,
                  opacity: timeline === 'kill' || timeline === 'paradox' ? 1 : 0.5,
                }}
                className="text-center"
              >
                <div className="bg-white text-gray-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 font-bold">
                  👴
                </div>
                <p className="text-white text-xs font-semibold">Grandfather</p>
              </motion.div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30 text-center">
            <AnimatePresence mode="wait">
              {timeline === 'present' && (
                <motion.div
                  key="present"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-white text-xl font-semibold mb-2">Ready to travel?</p>
                  <p className="text-white text-sm opacity-90">You decide to go back in time...</p>
                </motion.div>
              )}

              {timeline === 'travel' && (
                <motion.div
                  key="travel"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <motion.div
                    animate={{ x: [0, 100, -100, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    ⏰
                  </motion.div>
                  <p className="text-white text-xl font-semibold mb-2">Time traveling...</p>
                  <p className="text-white text-sm opacity-90">Arrived in the past!</p>
                </motion.div>
              )}

              {timeline === 'kill' && (
                <motion.div
                  key="kill"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <div className="text-6xl mb-4">⚔️</div>
                  <p className="text-white text-xl font-semibold mb-2">Attempting to kill...</p>
                  <p className="text-white text-sm opacity-90">Grandfather eliminated!</p>
                </motion.div>
              )}

              {timeline === 'paradox' && (
                <motion.div
                  key="paradox"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    scale: { type: 'spring', stiffness: 200 },
                    rotate: { duration: 0.5, repeat: 3 },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <div className="text-6xl mb-4">💥</div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                    className="bg-red-500/30 backdrop-blur-sm px-6 py-3 rounded-full inline-block"
                  >
                    <p className="text-white text-xl font-bold mb-2">PARADOX!</p>
                    <p className="text-white text-sm">
                      If he&apos;s dead, you can&apos;t exist!
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStep}
          className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          aria-label={timeline === 'paradox' ? 'Start over' : 'Next step'}
        >
          {timeline === 'paradox' ? '🔄 Start Over' : '▶️ Next Step'}
        </motion.button>
        
        {(timeline === 'paradox' || timeline === 'kill') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          >
            {showExplanation ? '🙈 Hide' : '💡 Explain'}
          </motion.button>
        )}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-4 bg-black/80 backdrop-blur-md rounded-xl border-4 border-red-500 p-6 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-lg font-bold mb-3">The Grandfather Paradox</p>
              <p className="text-sm leading-relaxed max-w-md">
                If you kill your grandfather before your parent is born, you could never exist to kill him. 
                This creates a logical impossibility that suggests backward time travel may be fundamentally impossible.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

