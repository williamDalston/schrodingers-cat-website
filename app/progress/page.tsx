'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  ChartBarIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  TrophyIcon,
  EnvelopeIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { SkeletonProgressPage } from '@/components/ui/SkeletonLoader'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function ProgressPage() {
  const [progress, setProgress] = useState<{
    curiosities_read: number
    puzzles_completed: number
    articles_read: number
    total_points: number
    last_activity?: string
  } | null>(null)
  
  const [articlesReadCount, setArticlesReadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Get email from localStorage if available
    const email = localStorage.getItem('newsletter_email')
    setUserEmail(email)

    // Get articles read from localStorage
    const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]') as string[]
    setArticlesReadCount(readArticles.length)

    const fetchProgress = async () => {
      if (!email) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/progress?email=${encodeURIComponent(email)}`)
        const data = await response.json()

        if (response.ok && data.data) {
          setProgress(data.data)
        } else {
          setError('Failed to load progress')
        }
      } catch (err) {
        setError('Failed to load progress')
        console.error('Progress fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [])

  const hasProgress = progress && (progress.curiosities_read > 0 || progress.puzzles_completed > 0 || articlesReadCount > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <ChartBarIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Progress Tracking
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See your exploration journey with badges, streaks, and personalized learning paths.
          </p>
        </div>

        {/* Not Subscribed Message */}
        {!userEmail && !loading && (
          <EmptyState
            icon={<EnvelopeIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />}
            title="Track Your Progress"
            description="Subscribe to our newsletter to start tracking your progress! See your curiosities read, puzzles completed, and unlock achievements as you explore."
            action={{
              label: 'Subscribe Free',
              href: '/newsletter',
              variant: 'primary',
            }}
          />
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-200 p-12 shadow-lg"
          >
            <LoadingSpinner size="lg" text="Loading your progress..." />
            <div className="mt-8">
              <SkeletonProgressPage />
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="inline-flex p-3 bg-red-100 rounded-full mb-4"
            >
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <p className="text-red-800 font-medium mb-4">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
              aria-label="Retry loading progress"
            >
              Retry
            </motion.button>
          </motion.div>
        )}

        {/* Progress Display */}
        {hasProgress || articlesReadCount > 0 ? (
          <div className="space-y-6">
            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Puzzles Completed */}
              {progress && progress.puzzles_completed > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center cursor-default group"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
                    className="inline-flex p-4 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors"
                  >
                    <PuzzlePieceIcon className="h-8 w-8 text-orange-600" aria-hidden="true" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {progress.puzzles_completed}
                  </motion.div>
                  <div className="text-gray-600">Puzzles Completed</div>
                </motion.div>
              )}

              {/* Curiosities Read */}
              {progress && progress.curiosities_read > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center cursor-default group"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                    className="inline-flex p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors"
                  >
                    <SparklesIcon className="h-8 w-8 text-purple-600" aria-hidden="true" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {progress.curiosities_read}
                  </motion.div>
                  <div className="text-gray-600">Curiosities Read</div>
                </motion.div>
              )}

              {/* Articles Read */}
              {articlesReadCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center cursor-default group"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.3, stiffness: 200 }}
                    className="inline-flex p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors"
                  >
                    <BookOpenIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {articlesReadCount}
                  </motion.div>
                  <div className="text-gray-600">Articles Read</div>
                </motion.div>
              )}

              {/* Total Points */}
              {progress && (progress.total_points || 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg text-center cursor-default group"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.4, stiffness: 200 }}
                    className="inline-flex p-4 bg-yellow-100 rounded-full mb-4 group-hover:bg-yellow-200 transition-colors"
                  >
                    <TrophyIcon className="h-8 w-8 text-yellow-600" aria-hidden="true" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-gray-900 mb-2"
                  >
                    {progress.total_points || 0}
                  </motion.div>
                  <div className="text-gray-600">Total Points</div>
                </motion.div>
              )}
            </motion.div>

            {/* Encouragement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">🚀 Keep Exploring!</h3>
              <p className="text-blue-100 text-lg">
                You&apos;re doing great! Continue reading articles, curiosities, and solving puzzles to unlock 
                achievements and climb the leaderboard.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-6 justify-center"
              >
                <Link
                  href="/articles"
                  className="group relative px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10">Read Articles</span>
                  <span className="absolute inset-0 bg-primary-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                </Link>
                <Link
                  href="/curiosity"
                  className="group relative px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10">Read Curiosities</span>
                  <span className="absolute inset-0 bg-primary-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                </Link>
                <Link
                  href="/puzzles"
                  className="group px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-200 transform hover:scale-105"
                >
                  Try Puzzles
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ) : null}

        {/* No Progress Yet */}
        {!hasProgress && !articlesReadCount && !loading && userEmail && (
          <EmptyState
            icon={<SparklesIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />}
            title="Start Your Journey"
            description="You're subscribed! Now start exploring curiosities and solving puzzles to track your progress."
            action={{
              label: 'Explore Curiosities',
              href: '/curiosity',
              variant: 'primary',
            }}
            secondaryAction={{
              label: 'Try Puzzles',
              href: '/puzzles',
            }}
          />
        )}
      </div>
    </div>
  )
}
