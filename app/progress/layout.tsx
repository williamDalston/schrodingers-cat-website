import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Progress Tracking | Schrödinger\'s Cat',
  description: 'See your exploration journey with badges, streaks, and personalized learning paths. Coming soon.',
  keywords: ['progress', 'achievements', 'learning path', 'badges', 'streaks'],
  openGraph: {
    title: 'Progress Tracking - Schrödinger\'s Cat',
    description: 'Track your learning journey and unlock achievements.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Progress Tracking',
    description: 'Your personalized learning journey.',
  },
}

export default function ProgressLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

