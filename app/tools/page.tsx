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
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BeakerIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Interactive Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experiment with physics simulations, visualizations, and hands-on learning experiences.
          </p>
        </div>

        {/* Quantum Coin Flip Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg mb-8"
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
              <button
                onClick={flipCoin}
                disabled={isFlipping}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                aria-label={isFlipping ? 'Flipping quantum coin' : 'Flip the quantum coin'}
              >
                {isFlipping ? 'Observing Quantum State...' : 'Flip the Quantum Coin'}
              </button>
            </div>

            {/* Statistics */}
            {flipCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{flipCount}</div>
                    <div className="text-sm text-gray-600">Total Flips</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.heads}</div>
                    <div className="text-sm text-gray-600">Heads ({Math.round((results.heads / flipCount) * 100)}%)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{results.tails}</div>
                    <div className="text-sm text-gray-600">Tails ({Math.round((results.tails / flipCount) * 100)}%)</div>
                  </div>
                </div>
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

