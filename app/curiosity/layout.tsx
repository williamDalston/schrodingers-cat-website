import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Daily Curiosity | Schrödinger\'s Cat',
  description: 'Your daily dose of fascinating science, thought experiments, and awe-inspiring discoveries. Free forever.',
  keywords: ['science', 'curiosity', 'daily science', 'thought experiments', 'discoveries', 'physics', 'quantum mechanics'],
  openGraph: {
    title: 'Daily Curiosity - Schrödinger\'s Cat',
    description: 'Get your daily dose of fascinating science and mind-bending discoveries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Curiosity',
    description: 'Your daily dose of fascinating science and discoveries.',
  },
}

export default function CuriosityLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

