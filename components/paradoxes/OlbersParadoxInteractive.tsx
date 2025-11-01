'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function OlbersParadoxInteractive() {
  const [universeMode, setUniverseMode] = useState<'finite' | 'infinite'>('finite')
  const [starCount, setStarCount] = useState(50)
  const [nightMode, setNightMode] = useState(true)

  useEffect(() => {
    if (universeMode === 'infinite') {
      // Gradually add more stars
      const interval = setInterval(() => {
        setStarCount(prev => Math.min(prev + 5, 1000))
      }, 200)
      return () => clearInterval(interval)
    } else {
      setStarCount(50)
      return undefined
    }
  }, [universeMode])

  const handleToggleUniverse = () => {
    setUniverseMode(universeMode === 'finite' ? 'infinite' : 'finite')
    setStarCount(50)
  }

  const handleToggleNight = () => {
    setNightMode(!nightMode)
  }

  // Generate random star positions
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }))

  return (
    <div 
      className={`w-full h-96 rounded-2xl overflow-hidden shadow-xl relative transition-colors duration-1000 ${
        nightMode ? 'bg-gradient-to-br from-primary-900 via-accent-900 to-gray-900' : 'bg-gradient-to-br from-primary-400 via-accent-500 to-tertiary-500'
      }`}
    >
      {/* Universe label */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full z-10">
        <span className="text-white font-semibold text-sm">
          {universeMode === 'finite' ? '🌍 Finite Universe' : '🌌 Infinite Universe'}
        </span>
      </div>

      {/* Star field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: nightMode ? 0.8 : 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="text-center z-10">
          <motion.div
            animate={{ scale: universeMode === 'infinite' ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 2, repeat: universeMode === 'infinite' ? Infinity : 0 }}
          >
            {nightMode && (
              <div className="text-6xl mb-4">
                {universeMode === 'finite' ? '🌌' : '💥'}
              </div>
            )}
            
            {!nightMode && (
              <div className="text-6xl mb-4">☀️</div>
            )}

            <motion.div
              key={universeMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-4 border-white/30 mb-6"
            >
              <h3 className="text-white text-2xl font-bold mb-3">
                {universeMode === 'finite' ? 'Why is the sky dark?' : 'Infinite stars → Bright sky?'}
              </h3>
              <p className="text-white text-sm mb-4">
                {universeMode === 'finite' 
                  ? 'With a finite universe, dark gaps between stars make sense'
                  : `But the sky is still dark! This reveals the universe has a history and is expanding.`}
              </p>
              <div className="text-white font-bold text-3xl mb-2">
                {starCount} stars
              </div>
              <div className="text-white text-xs opacity-75">
                {universeMode === 'infinite' ? 'Adding more...' : 'Finite count'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleUniverse}
          className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          aria-label="Toggle universe mode"
        >
          {universeMode === 'finite' ? '⚡ Infinite Mode' : '🌍 Finite Mode'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleNight}
          className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-semibold"
          aria-label="Toggle day/night"
        >
          {nightMode ? '☀️ Day' : '🌙 Night'}
        </motion.button>
      </div>

      {/* Description */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs z-10">
        <p className="text-white text-xs text-center">
          {universeMode === 'infinite' 
            ? 'In infinite universe, every line of sight should hit a star!' 
            : 'Real universe: expanding, finite age, dark gaps'}
        </p>
      </div>
    </div>
  )
}

