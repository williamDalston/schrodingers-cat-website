'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SetItem {
  id: string
  label: string
  containsSelf: boolean
}

export function RussellsParadoxInteractive() {
  const [selectedSet, setSelectedSet] = useState<string | null>(null)
  const [showParadox, setShowParadox] = useState(false)

  // Example sets
  const normalSets: SetItem[] = [
    { id: 'fruits', label: '🍎 Fruits', containsSelf: false },
    { id: 'animals', label: '🦁 Animals', containsSelf: false },
    { id: 'numbers', label: '🔢 Numbers', containsSelf: false },
  ]

  const russellSet = { id: 'russell', label: '❓ Russell Set', containsSelf: null }

  const handleSetClick = (setId: string) => {
    if (setId === 'russell') {
      setShowParadox(true)
    } else {
      setSelectedSet(selectedSet === setId ? null : setId)
    }
  }

  const handleReset = () => {
    setShowParadox(false)
    setSelectedSet(null)
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-purple-500 via-accent-500 to-primary-500 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Mode label */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full z-10">
        <span className="text-white font-semibold text-sm">
          {showParadox ? '⚠️ PARADOX' : '🔗 Set Theory'}
        </span>
      </div>

      <div className="h-full flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!showParadox ? (
              <motion.div
                key="sets"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30">
                  <p className="text-white text-lg font-semibold mb-4 text-center">
                    Which set contains itself?
                  </p>
                  <div className="space-y-3">
                    {normalSets.map((set) => (
                      <motion.button
                        key={set.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSetClick(set.id)}
                        className={`w-full p-4 rounded-lg text-left transition-all ${
                          selectedSet === set.id
                            ? 'bg-green-500/30 border-2 border-green-400'
                            : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">{set.label}</span>
                          {selectedSet === set.id && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-2xl"
                            >
                              ❌ No!
                            </motion.span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSetClick('russell')}
                      className="w-full p-4 rounded-lg text-left bg-yellow-500/20 border-2 border-yellow-400 hover:bg-yellow-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">{russellSet.label}</span>
                        <span className="text-yellow-200 text-lg">🤔 Try me!</span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
                  <p className="text-white text-xs opacity-90">
                    Most sets don&apos;t contain themselves as members
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="paradox"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border-4 border-red-500/50"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">💥</div>
                  <p className="text-white text-2xl font-bold mb-4">PARADOX!</p>
                  
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <p className="text-white text-sm leading-relaxed mb-3">
                      <strong>Russell Set:</strong> The set of all sets that don&apos;t contain themselves
                    </p>
                    <div className="border-t border-white/30 pt-3">
                      <p className="text-white text-sm font-bold mb-2">
                        Does it contain itself?
                      </p>
                      <div className="flex gap-4 justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-1">✅</div>
                          <p className="text-white text-xs">Yes?</p>
                          <p className="text-red-300 text-xs mt-1">→ No!</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl mb-1">❌</div>
                          <p className="text-white text-xs">No?</p>
                          <p className="text-red-300 text-xs mt-1">→ Yes!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-white text-xs opacity-75 text-center">
                    This logical contradiction exposed flaws in set theory foundations!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center z-10">
        {showParadox ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          >
            🔄 Try Again
          </motion.button>
        ) : (
          <div className="px-6 py-2 bg-white/5 rounded-lg">
            <p className="text-white text-xs text-center opacity-75">
              Click sets to check if they contain themselves
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs z-10">
        <p className="text-white text-xs text-center">
          {showParadox 
            ? 'A simple question that broke math foundations!' 
            : 'Sets: collections of things. Can a set contain itself?'}
        </p>
      </div>
    </div>
  )
}

