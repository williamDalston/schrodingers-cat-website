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
  const [showHint, setShowHint] = useState(false)

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
    setShowHint(false)
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
      <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border-2 border-primary-200">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-bold text-gray-900 text-lg">The Paradox:</h4>
          {!completed && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium underline"
            >
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          The statement &quot;All ravens are black&quot; is logically equivalent to &quot;All non-black things are non-ravens.&quot;
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Your task:</strong> Select which observations you think provide meaningful evidence for the hypothesis 
          &quot;All ravens are black.&quot; Then see if logic and intuition agree!
        </p>
        {showHint && !completed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r"
          >
            <p className="text-xs text-yellow-900">
              <strong>Hint:</strong> Think about what would actually tell you something about ravens. Does seeing a red apple 
              really tell you anything about whether all ravens are black? Or does it just satisfy the logical equivalence in a meaningless way?
            </p>
          </motion.div>
        )}
      </div>

      {/* Hypothesis Display */}
      <div className="mb-6 p-4 bg-white rounded-lg border-2 border-primary-300">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 mb-2">Hypothesis:</div>
          <div className="text-2xl font-bold text-primary-700">{hypothesis}</div>
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
                    ? 'bg-primary-100 border-primary-400'
                    : 'bg-gray-50 border-gray-200 hover:border-primary-300'
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
                        <div className="w-6 h-6 rounded-full bg-primary-400"></div>
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={checkAnswer}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-tertiary-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Check My Answer ({selectedEvidence.length} selected)
          </motion.button>
        </motion.div>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && completed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-6 bg-white rounded-lg border-2 border-primary-300"
          >
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LightBulbIcon className="h-6 w-6 text-primary-600" />
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-bold rounded-lg hover:shadow-md transition-all border border-gray-300"
        >
          Try Again
        </motion.button>
      )}
    </div>
  )
}

