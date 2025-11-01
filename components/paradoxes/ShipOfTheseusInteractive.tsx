'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ShipOfTheseusInteractive() {
  const [replacementCount, setReplacementCount] = useState(0)
  const maxReplacements = 100
  const replacementPercent = Math.floor((replacementCount / maxReplacements) * 100)

  const handleReplace = () => {
    if (replacementCount < maxReplacements) {
      setReplacementCount(prev => Math.min(prev + 1, maxReplacements))
    }
  }

  const handleReset = () => {
    setReplacementCount(0)
  }

  // Visual representation: show a ship being gradually replaced
  const remainingOriginal = maxReplacements - replacementCount

  return (
    <div className="w-full h-96 bg-gradient-to-br from-purple-500 via-primary-500 to-accent-500 rounded-2xl overflow-hidden shadow-xl relative">
      {/* Status label */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white font-semibold text-sm">
          {replacementPercent === 0 && '🏴 Original Ship'}
          {replacementPercent > 0 && replacementPercent < 100 && `⚓ ${replacementPercent}% Replaced`}
          {replacementPercent === 100 && '🔄 New Ship?'}
        </span>
      </div>

      <div className="h-full flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Ship Visualization */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30 mb-6">
            <div className="relative h-32 mb-4">
              {/* Original ship parts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: remainingOriginal / maxReplacements }}
                  className="flex items-center"
                >
                  <span className="text-8xl">⛵</span>
                  {replacementCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1 - (remainingOriginal / maxReplacements) }}
                      className="absolute"
                    >
                      <span className="text-8xl">🚢</span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${replacementPercent}%` }}
                className="h-full bg-white/40 backdrop-blur-sm"
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-white text-sm font-semibold">{replacementPercent}%</span>
            </div>
          </div>

          {/* The Question */}
          <motion.div
            animate={{
              scale: replacementPercent === 100 ? 1.05 : 1,
            }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border-4 border-white/30"
          >
            {replacementPercent === 0 && (
              <p className="text-white text-center font-semibold">
                Original ship: ⛵ 100%
              </p>
            )}
            {replacementPercent > 0 && replacementPercent < 100 && (
              <p className="text-white text-center font-semibold">
                Gradually replacing {replacementCount} pieces...
              </p>
            )}
            {replacementPercent === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <p className="text-white text-xl font-bold mb-2">❓</p>
                <p className="text-white text-lg font-bold">
                  Is this still the same ship?
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReplace}
          disabled={replacementCount >= maxReplacements}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
            replacementCount >= maxReplacements
              ? 'bg-white/10 text-white/50 cursor-not-allowed'
              : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
          }`}
          aria-label="Replace a ship part"
        >
          {replacementCount >= maxReplacements ? '✅ Complete' : '🔧 Replace Part'}
        </motion.button>
        
        {replacementCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          >
            🔄 Reset
          </motion.button>
        )}
      </div>

      {/* Description */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs">
        <p className="text-white text-xs text-center">
          {replacementPercent === 100 
            ? 'Every part replaced. Same ship or new one?' 
            : 'Replace all 100 pieces one by one'}
        </p>
      </div>
    </div>
  )
}

