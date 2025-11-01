'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon, LightBulbIcon } from '@heroicons/react/24/outline'

type EvidenceType = 'raven-black' | 'raven-white' | 'apple-red' | 'apple-green' | 'car-blue' | 'shoe-brown'

interface Evidence {
  id: EvidenceType
  label: string
  description: string
  confirmsHypothesis: boolean
  explanation: string
}

export default function RavenParadoxPuzzle() {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceType[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [completed, setCompleted] = useState(false)

  const hypothesis = 'All ravens are black'
  const equivalentHypothesis = 'All non-black things are non-ravens'

  const evidenceList: Evidence[] = [
    {
      id: 'raven-black',
      label: 'Black Raven',
      description: 'Observe a raven that is black',
      confirmsHypothesis: true,
      explanation: 'A black raven directly confirms "All ravens are black" - this is strong evidence!'
    },
    {
      id: 'raven-white',
      label: 'White Raven',
      description: 'Observe a raven that is white (or any non-black color)',
      confirmsHypothesis: false,
      explanation: 'A white raven directly contradicts "All ravens are black" - this falsifies the hypothesis!'
    },
    {
      id: 'apple-red',
      label: 'Red Apple',
      description: 'Observe a red apple (a non-black, non-raven thing)',
      confirmsHypothesis: true,
      explanation: 'Logically, this confirms "All non-black things are non-ravens" (the equivalent statement), which means it technically confirms the hypothesis. However, intuitively, this tells us nothing useful about ravens!'
    },
    {
      id: 'apple-green',
      label: 'Green Apple',
      description: 'Observe a green apple (a non-black, non-raven thing)',
      confirmsHypothesis: true,
      explanation: 'Same as the red apple - logically confirms the hypothesis, but provides no real information about ravens.'
    },
    {
      id: 'car-blue',
      label: 'Blue Car',
      description: 'Observe a blue car (a non-black, non-raven thing)',
      confirmsHypothesis: true,
      explanation: 'Technically confirms the hypothesis, but clearly irrelevant to whether all ravens are black.'
    },
    {
      id: 'shoe-brown',
      label: 'Brown Shoe',
      description: 'Observe a brown shoe (a non-black, non-raven thing)',
      confirmsHypothesis: true,
      explanation: 'Logically consistent with the hypothesis, but intuitively meaningless for understanding ravens.'
    },
  ]

  const toggleEvidence = (evidenceId: EvidenceType) => {
    if (completed) return

    if (selectedEvidence.includes(evidenceId)) {
      setSelectedEvidence(selectedEvidence.filter(id => id !== evidenceId))
    } else {
      setSelectedEvidence([...selectedEvidence, evidenceId])
    }
    setShowExplanation(false)
  }

  const checkAnswer = () => {
    setCompleted(true)
    setShowExplanation(true)
  }

  const reset = () => {
    setSelectedEvidence([])
    setShowExplanation(false)
    setCompleted(false)
  }

  const strongEvidence = selectedEvidence.filter(id => {
    const evidence = evidenceList.find(e => e.id === id)
    return evidence?.id === 'raven-black'
  })

  const weakEvidence = selectedEvidence.filter(id => {
    const evidence = evidenceList.find(e => e.id === id)
    return evidence && evidence.id !== 'raven-black' && evidence.id !== 'raven-white'
  })

  const falsifyingEvidence = selectedEvidence.includes('raven-white')

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-gray-900 mb-2">The Paradox:</h4>
        <p className="text-sm text-gray-700 mb-3">
          The statement &quot;All ravens are black&quot; is logically equivalent to &quot;All non-black things are non-ravens.&quot;
        </p>
        <p className="text-sm text-gray-700">
          <strong>Your task:</strong> Select which observations you think provide meaningful evidence for the hypothesis 
          &quot;All ravens are black.&quot; Then see if logic and intuition agree!
        </p>
      </div>

      {/* Hypothesis Display */}
      <div className="mb-6 p-4 bg-white rounded-lg border-2 border-purple-300">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 mb-2">Hypothesis:</div>
          <div className="text-2xl font-bold text-purple-700">{hypothesis}</div>
          <div className="mt-2 text-sm text-gray-600">Equivalent to: &quot;{equivalentHypothesis}&quot;</div>
        </div>
      </div>

      {/* Evidence Selection */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Select Evidence (click to toggle):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {evidenceList.map((evidence) => {
            const isSelected = selectedEvidence.includes(evidence.id)
            const showAsStrong = completed && evidence.id === 'raven-black' && isSelected
            const showAsWeak = completed && ['apple-red', 'apple-green', 'car-blue', 'shoe-brown'].includes(evidence.id) && isSelected
            const showAsFalsifying = completed && evidence.id === 'raven-white' && isSelected

            return (
              <motion.button
                key={evidence.id}
                onClick={() => toggleEvidence(evidence.id)}
                disabled={completed}
                whileHover={!completed ? { scale: 1.02 } : {}}
                whileTap={!completed ? { scale: 0.98 } : {}}
                className={`p-4 rounded-lg border-2 text-left transition-all disabled:cursor-not-allowed ${
                  showAsStrong
                    ? 'bg-green-100 border-green-500'
                    : showAsFalsifying
                    ? 'bg-red-100 border-red-500'
                    : showAsWeak
                    ? 'bg-yellow-100 border-yellow-500'
                    : isSelected
                    ? 'bg-purple-100 border-purple-400'
                    : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{evidence.label}</div>
                    <div className="text-sm text-gray-600">{evidence.description}</div>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0">
                      {showAsStrong ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      ) : showAsFalsifying ? (
                        <XCircleIcon className="h-6 w-6 text-red-600" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-purple-400"></div>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Check Answer Button */}
      {!completed && selectedEvidence.length > 0 && (
        <div className="mb-6">
          <button
            onClick={checkAnswer}
            className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Check My Answer
          </button>
        </div>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && completed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 bg-white rounded-lg border-2 border-purple-300"
          >
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LightBulbIcon className="h-6 w-6 text-purple-600" />
              The Paradox Explained
            </h4>

            {falsifyingEvidence && (
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-red-900 font-semibold mb-2">⚠️ Falsifying Evidence Found!</p>
                <p className="text-red-800">
                  You selected a white raven - this directly contradicts the hypothesis &quot;All ravens are black.&quot; 
                  The hypothesis is false!
                </p>
              </div>
            )}

            {strongEvidence.length > 0 && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <p className="text-green-900 font-semibold mb-2">✅ Strong Evidence</p>
                <p className="text-green-800 mb-2">
                  Black ravens provide strong, direct evidence for the hypothesis. This makes intuitive sense!
                </p>
              </div>
            )}

            {weakEvidence.length > 0 && (
              <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <p className="text-yellow-900 font-semibold mb-2">🤔 The Paradox</p>
                <p className="text-yellow-800 mb-2">
                  You selected {weakEvidence.length} non-black, non-raven object{weakEvidence.length > 1 ? 's' : ''} 
                  (like apples, cars, shoes). 
                </p>
                <p className="text-yellow-800 mb-2">
                  <strong>Logically:</strong> These observations confirm &quot;All non-black things are non-ravens,&quot; 
                  which is equivalent to &quot;All ravens are black.&quot; So technically, they confirm the hypothesis.
                </p>
                <p className="text-yellow-800">
                  <strong>Intuitively:</strong> But these observations tell us nothing useful about ravens! 
                  A red apple doesn&apos;t provide any real information about whether all ravens are black.
                </p>
              </div>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 font-semibold mb-2">The Key Insight:</p>
              <p className="text-blue-800">
                This paradox reveals a problem with naive confirmation theory: not all confirmations are equal. 
                Some evidence is <strong>relevant</strong> and <strong>informative</strong>, while other evidence is 
                technically correct but practically meaningless. Understanding evidence requires considering 
                relevance and information content, not just logical consistency.
              </p>
            </div>

            {selectedEvidence.map((evidenceId) => {
              const evidence = evidenceList.find(e => e.id === evidenceId)
              if (!evidence || evidence.id === 'raven-black' || evidence.id === 'raven-white') return null
              return (
                <div key={evidenceId} className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-1">{evidence.label}:</div>
                  <p className="text-sm text-gray-700">{evidence.explanation}</p>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      {completed && (
        <button
          onClick={reset}
          className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

