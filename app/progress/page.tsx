'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  ChartBarIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  TrophyIcon,
  EnvelopeIcon,
  BookOpenIcon,
  FireIcon,
  StarIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { SkeletonProgressPage } from '@/components/ui/SkeletonLoader'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface Badge {
  id: string
  title: string
  description: string
  icon: React.ElementType
  unlocked: boolean
  progress: number
  maxProgress: number
}

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
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // Get email from localStorage if available
    const email = localStorage.getItem('newsletter_email')
    setUserEmail(email)

    // Get articles read from localStorage
    const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]') as string[]
    setArticlesReadCount(readArticles.length)

    // Calculate streak from localStorage
    const lastVisit = localStorage.getItem('last_visit')
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    if (lastVisit === today) {
      // Already visited today
      const streakCount = parseInt(localStorage.getItem('streak') || '0')
      setStreak(streakCount)
    } else if (lastVisit === yesterday) {
      // Visited yesterday, continue streak
      const streakCount = parseInt(localStorage.getItem('streak') || '0') + 1
      setStreak(streakCount)
      localStorage.setItem('streak', streakCount.toString())
      localStorage.setItem('last_visit', today)
    } else {
      // New day or first visit
      setStreak(1)
      localStorage.setItem('streak', '1')
      localStorage.setItem('last_visit', today)
    }

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

  // Calculate badges
  const badges: Badge[] = useMemo(() => {
    if (!progress) return []
    
    return [
      {
        id: 'first-curiosity',
        title: 'First Spark',
        description: 'Read your first curiosity',
        icon: SparklesIcon,
        unlocked: (progress.curiosities_read || 0) >= 1,
        progress: progress.curiosities_read || 0,
        maxProgress: 1
      },
      {
        id: 'avid-reader',
        title: 'Avid Reader',
        description: 'Read 10 curiosities',
        icon: BookOpenIcon,
        unlocked: (progress.curiosities_read || 0) >= 10,
        progress: progress.curiosities_read || 0,
        maxProgress: 10
      },
      {
        id: 'knowledge-seeker',
        title: 'Knowledge Seeker',
        description: 'Read 25 curiosities',
        icon: StarIcon,
        unlocked: (progress.curiosities_read || 0) >= 25,
        progress: progress.curiosities_read || 0,
        maxProgress: 25
      },
      {
        id: 'first-puzzle',
        title: 'Puzzle Master',
        description: 'Complete your first puzzle',
        icon: PuzzlePieceIcon,
        unlocked: (progress.puzzles_completed || 0) >= 1,
        progress: progress.puzzles_completed || 0,
        maxProgress: 1
      },
      {
        id: 'brainiac',
        title: 'Brainiac',
        description: 'Complete 5 puzzles',
        icon: BoltIcon,
        unlocked: (progress.puzzles_completed || 0) >= 5,
        progress: progress.puzzles_completed || 0,
        maxProgress: 5
      },
      {
        id: 'week-streak',
        title: 'Week Warrior',
        description: '7-day reading streak',
        icon: FireIcon,
        unlocked: streak >= 7,
        progress: streak,
        maxProgress: 7
      },
      {
        id: 'month-streak',
        title: 'Month Master',
        description: '30-day reading streak',
        icon: FireIcon,
        unlocked: streak >= 30,
        progress: streak,
        maxProgress: 30
      }
    ]
  }, [progress, streak])

  const unlockedBadges = badges.filter(b => b.unlocked).length
  const totalBadges = badges.length

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container-spacing section-spacing max-w-4xl">
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
            className="inline-flex p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChartBarIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Progress Tracking
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            See your exploration journey with badges, streaks, and personalized learning paths.
          </p>
        </header>

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
            className="card p-12 shadow-sm"
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
                  className="card p-8 text-center cursor-default group hover-lift"
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
                  className="card p-8 text-center cursor-default group hover-lift"
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
                  className="card p-8 text-center cursor-default group hover-lift"
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
                  className="card p-8 text-center cursor-default group hover-lift"
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

            {/* Streak Section */}
            {streak > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <FireIcon className="h-16 w-16 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold mb-1">🔥 {streak} Day Streak!</h3>
                      <p className="text-orange-100 text-lg">
                        Come back tomorrow to keep it going!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">🏆 Achievements</h2>
                <div className="text-2xl font-bold text-primary-600">
                  {unlockedBadges}/{totalBadges}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge, index) => {
                  const Icon = badge.icon
                  const progressPercent = Math.min((badge.progress / badge.maxProgress) * 100, 100)
                  
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`relative overflow-hidden rounded-xl border-2 p-6 transition-all ${
                        badge.unlocked
                          ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {/* Shimmer effect for unlocked badges */}
                      {badge.unlocked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
                      )}
                      
                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-full mb-3 ${
                          badge.unlocked
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                            : 'bg-gray-300'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            badge.unlocked ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        
                        <h3 className={`font-bold mb-1 ${
                          badge.unlocked ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {badge.title}
                        </h3>
                        <p className={`text-sm mb-3 ${
                          badge.unlocked ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {badge.description}
                        </p>
                        
                        {/* Progress bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            className={`h-full rounded-full ${
                              badge.unlocked
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                : 'bg-gray-400'
                            }`}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-2">
                          {badge.progress}/{badge.maxProgress}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Encouragement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">🚀 Keep Exploring!</h3>
              <p className="text-blue-100 text-lg">
                You&apos;re doing great! Continue reading articles, curiosities, and solving puzzles to unlock 
                more achievements and keep your streak alive.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
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
