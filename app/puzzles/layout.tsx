import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Weekly Puzzles | Schrödinger\'s Cat',
  description: 'Challenge your mind with weekly science puzzles. Track your progress and unlock achievements. Free forever.',
  keywords: ['puzzles', 'brain teasers', 'logic puzzles', 'science puzzles', 'thought experiments', 'challenges'],
  openGraph: {
    title: 'Weekly Puzzles - Schrödinger\'s Cat',
    description: 'Weekly science puzzles that challenge your mind and expand your understanding.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Puzzles',
    description: 'Challenge your mind with weekly science puzzles.',
  },
}

export default function PuzzlesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

