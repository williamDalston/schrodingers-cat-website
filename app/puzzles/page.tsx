'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  PuzzlePieceIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  LightBulbIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import MontyHallSimulator from '@/components/MontyHallSimulator'
import PrisonersDilemmaGame from '@/components/PrisonersDilemmaGame'
import RavenParadoxPuzzle from '@/components/RavenParadoxPuzzle'

export default function PuzzlesPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [_submitting, setSubmitting] = useState(false)
  
  // Track when user starts the puzzle
  useEffect(() => {
    setStartTime(Date.now())
    
    // Optional: Track analytics event for puzzle start
    const trackView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'puzzle_viewed',
            event_data: { puzzle_id: 'light-bulb' },
            page_path: '/puzzles',
          }),
        })
      } catch (error) {
        console.error('Failed to track puzzle view:', error)
      }
    }
    trackView()
  }, [])

  const puzzle = {
    id: 1,
    title: 'The Light Bulb Puzzle',
    difficulty: 'Medium',
    category: 'Logic & Physics',
    date: 'Week of December 2024',
    question: 'You are in a room with three light switches. All three switches control three light bulbs in another room. You can only go to the other room once. How do you figure out which switch controls which bulb?',
    hint: 'Think about the properties of light bulbs when turned on and off. What physical changes occur?',
    explanation: 'Turn on the first switch and leave it on for a few minutes. Then turn it off and turn on the second switch. Now go to the other room. The bulb that is on is controlled by the second switch. Touch the other two bulbs: the warm one is controlled by the first switch (it was recently on), and the cold one is controlled by the third switch.',
    answer: 'second',
    options: [
      { id: 'first', label: 'Turn on all switches, then quickly turn them off one by one before entering' },
      { id: 'second', label: 'Turn on switch 1 for a few minutes, turn it off, turn on switch 2, then enter the room' },
      { id: 'third', label: 'Turn on switch 1, enter immediately to see which bulb is on' },
    ]
  }

  const handleAnswer = async (answerId: string) => {
    if (completed) return
    setSelectedAnswer(answerId)
    setIsCorrect(answerId === puzzle.answer)
    setShowResult(true)
    
    if (answerId === puzzle.answer) {
      setCompleted(true)
      
      // Submit puzzle completion to backend
      const timeTaken = Math.floor((Date.now() - startTime) / 1000) // seconds
      const score = calculateScore(timeTaken)
      
      setSubmitting(true)
      try {
        // Get email from localStorage if available (from newsletter signup)
        const userEmail = localStorage.getItem('newsletter_email') || null
        
        const response = await fetch('/api/puzzles/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            puzzle_id: 'light-bulb',
            score,
            time_taken: timeTaken,
            metadata: {
              difficulty: puzzle.difficulty,
              attempts: 1, // Could track this better in real implementation
            },
          }),
        })
        
        if (response.ok) {
          const data = await response.json()
          console.log('Puzzle submission successful:', data)
        }
      } catch (error) {
        console.error('Failed to submit puzzle completion:', error)
        // Don't fail the UI if API call fails
      } finally {
        setSubmitting(false)
      }
    }
  }
  
  const calculateScore = (timeInSeconds: number): number => {
    // Base score of 100, minus time penalty
    const timePenalty = Math.floor(timeInSeconds / 10)
    return Math.max(50, 100 - timePenalty)
  }

  const resetPuzzle = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
    setShowHint(false)
    setCompleted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <PuzzlePieceIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Weekly Puzzles
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Challenge your mind with weekly science puzzles. Track your progress and unlock achievements.
          </p>
        </div>

        {/* Puzzle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {puzzle.category}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {puzzle.difficulty}
                </span>
              </div>
              <span className="text-sm font-semibold">{puzzle.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{puzzle.title}</h2>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {puzzle.question}
              </p>
            </div>

            {/* Success Banner */}
            <AnimatePresence>
              {completed && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg"
                >
                  <div className="flex items-start gap-4">
                    <TrophyIcon className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-green-900 mb-2">🎉 Congratulations!</h3>
                      <p className="text-green-800">
                        You solved this puzzle! Well done on thinking through the physics and logic. You&apos;ve earned this week&apos;s completion badge.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {puzzle.options.map((option) => {
                const isSelected = selectedAnswer === option.id
                const showCorrect = showResult && option.id === puzzle.answer
                const showIncorrect = showResult && isSelected && option.id !== puzzle.answer

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={completed}
                    whileHover={!completed ? { scale: 1.02 } : {}}
                    whileTap={!completed ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                      showCorrect
                        ? 'bg-green-50 border-green-500'
                        : showIncorrect
                        ? 'bg-red-50 border-red-500'
                        : isSelected
                        ? 'bg-primary-50 border-primary-500'
                        : 'bg-gray-50 border-gray-200 hover:border-orange-400'
                    } disabled:cursor-not-allowed`}
                    aria-label={`Answer option: ${option.label}${showCorrect ? ' - Correct answer' : showIncorrect ? ' - Incorrect answer' : ''}`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-start gap-4">
                      {showCorrect && (
                        <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      {showIncorrect && (
                        <XCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <span className="text-gray-800 leading-relaxed">{option.label}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Hint Section */}
            <div className="mb-8">
              <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                aria-label={showHint ? 'Hide hint' : 'Show hint for the puzzle'}
                aria-expanded={showHint}
              >
                <LightBulbIcon className="h-5 w-5" aria-hidden="true" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <p className="text-orange-800 italic">{puzzle.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-8 p-6 rounded-xl border-2 ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isCorrect ? 'Why This Works' : 'The Correct Solution'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{puzzle.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Button */}
            {completed && (
              <button
                onClick={resetPuzzle}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </motion.div>

        {/* Monty Hall Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Probability
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Interactive
                </span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">The Monty Hall Problem</h2>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                You&apos;re on a game show with three doors. Behind one door is a car, behind the other two are goats. 
                You pick a door. The host opens another door to reveal a goat. Now you can stick with your original choice 
                or switch to the remaining door. What should you do?
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6">
                <p className="text-gray-800 font-medium">
                  <strong>The Answer:</strong> You should <strong>always switch</strong>. Switching gives you a 2/3 chance 
                  of winning, while staying gives you only 1/3. Try it yourself below to see the statistics!
                </p>
              </div>
            </div>

            {/* Monty Hall Simulator */}
            <MontyHallSimulator />
          </div>
        </motion.div>

        {/* Prisoner's Dilemma */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Game Theory
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Interactive
                </span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">The Prisoner&apos;s Dilemma</h2>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Two criminals are arrested and interrogated separately. Each can either <strong>cooperate</strong> (stay silent) 
                or <strong>defect</strong> (betray the other). The outcome depends on both choices. Play multiple rounds 
                and see how different strategies perform!
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                <p className="text-gray-800 font-medium">
                  <strong>The Dilemma:</strong> Individual rationality (defecting) leads to the worst collective outcome, 
                  while cooperation benefits everyone—but requires trust. Try different strategies and see what happens!
                </p>
              </div>
            </div>

            {/* Prisoner's Dilemma Game */}
            <PrisonersDilemmaGame />
          </div>
        </motion.div>

        {/* Raven Paradox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Logic Paradox
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  Interactive
                </span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">The Raven Paradox</h2>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The statement &quot;All ravens are black&quot; is logically equivalent to &quot;All non-black things are non-ravens.&quot; 
                This means that observing a red apple (a non-black, non-raven) technically confirms the hypothesis about ravens!
              </p>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                <p className="text-gray-800 font-medium">
                  <strong>The Paradox:</strong> Logic and intuition conflict. Not all confirmations are equal—some evidence 
                  is relevant and informative, while other evidence is technically correct but practically meaningless.
                </p>
              </div>
            </div>

            {/* Raven Paradox Puzzle */}
            <RavenParadoxPuzzle />
          </div>
        </motion.div>

        {/* Future Puzzles Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 shadow-lg"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">More Puzzles Coming Soon</h3>
            <p className="text-lg text-gray-600 mb-6">
              New challenges every week! Subscribe to get notified when fresh puzzles are released.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">Logic Puzzles</span>
              <span className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">Physics Challenges</span>
              <span className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">Paradox Solvers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

