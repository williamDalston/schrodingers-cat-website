'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, BeakerIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function ToolsPage() {
  const [coinState, setCoinState] = useState<'heads' | 'tails' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipCount, setFlipCount] = useState(0)
  const [results, setResults] = useState({ heads: 0, tails: 0 })
  const [streak, setStreak] = useState({ current: 0, longest: 0, lastResult: null as 'heads' | 'tails' | null })

  const flipCoin = () => {
    if (isFlipping) return
    
    setIsFlipping(true)
    setCoinState(null)
    
    // Simulate quantum superposition - truly random
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails'
      setCoinState(result)
      setIsFlipping(false)
      setFlipCount(prev => prev + 1)
      setResults(prev => ({
        ...prev,
        [result]: prev[result] + 1
      }))
      
      // Update streak
      setStreak(prev => {
        const newCurrent = result === prev.lastResult ? prev.current + 1 : 1
        return {
          current: newCurrent,
          longest: Math.max(prev.longest, newCurrent),
          lastResult: result
        }
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container-spacing section-spacing max-w-6xl">
        <Link
          href="/"
          className="link-primary inline-flex items-center mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <header className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <BeakerIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Interactive Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Experiment with physics simulations, visualizations, and hands-on learning experiences.
          </p>
        </header>

        {/* Quantum Coin Flip Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8 md:p-12 mb-8 shadow-sm"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Quantum Coin Flip</h2>
              <p className="text-lg text-gray-600">
                Experience true randomness through a quantum simulation
              </p>
            </div>

            {/* Coin Display */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{
                  rotateY: isFlipping ? 1800 : coinState ? 0 : 0,
                  scale: isFlipping ? 1.2 : 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: coinState === 'heads' ? '#0369a1' : coinState === 'tails' ? '#a21caf' : '#9ca3af',
                }}
              >
                {isFlipping ? (
                  <ArrowPathIcon className="h-24 w-24 text-white animate-spin" aria-hidden="true" />
                ) : coinState ? (
                  <span className="text-white text-6xl font-bold">
                    {coinState === 'heads' ? 'H' : 'T'}
                  </span>
                ) : (
                  <span className="text-white text-4xl font-bold">?</span>
                )}
              </motion.div>
            </div>

            {/* Flip Button */}
            <div className="text-center mb-8">
              <motion.button
                whileHover={!isFlipping ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isFlipping ? { scale: 0.95 } : {}}
                onClick={flipCoin}
                disabled={isFlipping}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isFlipping ? 'Flipping quantum coin' : 'Flip the quantum coin'}
              >
                {isFlipping ? (
                  <span className="flex items-center gap-2">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Observing Quantum State...
                  </span>
                ) : (
                  'Flip the Quantum Coin'
                )}
              </motion.button>
            </div>

            {/* Statistics */}
            {flipCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Statistics</h3>
                  <button
                    onClick={() => {
                      setFlipCount(0)
                      setResults({ heads: 0, tails: 0 })
                      setStreak({ current: 0, longest: 0, lastResult: null })
                      setCoinState(null)
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Reset Stats
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-gray-900">{flipCount}</div>
                    <div className="text-sm text-gray-600">Total Flips</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">{results.heads}</div>
                    <div className="text-sm text-gray-600">Heads ({flipCount > 0 ? Math.round((results.heads / flipCount) * 100) : 0}%)</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600">{results.tails}</div>
                    <div className="text-sm text-gray-600">Tails ({flipCount > 0 ? Math.round((results.tails / flipCount) * 100) : 0}%)</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">{streak.current}</div>
                    <div className="text-sm text-gray-600">
                      Current Streak
                      {streak.longest > 1 && (
                        <div className="text-xs text-gray-500 mt-1">Best: {streak.longest}</div>
                      )}
                    </div>
                  </div>
                </div>
                {flipCount >= 10 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-900 text-center">
                      <strong>Law of Large Numbers:</strong> As you flip more, the percentages should get closer to 50/50. 
                      You&apos;re at {Math.abs(50 - Math.round((results.heads / flipCount) * 100))}% deviation from perfect randomness.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Explanation */}
            <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What&apos;s Quantum About This?</h3>
              <p className="text-gray-700 leading-relaxed">
                While this uses classical randomness, it demonstrates a key concept of quantum mechanics: true randomness. 
                Unlike a deterministic coin flip that could theoretically be predicted if you knew all variables, 
                quantum events are fundamentally random—there&apos;s no hidden information that could help you predict the outcome.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Tools */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Tools Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re building more interactive simulations to help you visualize and experiment with scientific concepts.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200">Quantum Wave Simulator</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200">Paradox Visualizer</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200">Thought Experiment Builder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

