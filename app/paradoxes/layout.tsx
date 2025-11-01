import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Paradox Library | Schrödinger\'s Cat',
  description: 'Explore mind-bending paradoxes that challenge our understanding of reality, time, identity, and existence. Free forever.',
  keywords: ['paradoxes', 'thought experiments', 'philosophy', 'quantum paradoxes', 'logic paradoxes', 'temporal paradoxes'],
  openGraph: {
    title: 'Paradox Library - Schrödinger\'s Cat',
    description: 'Mind-bending paradoxes that challenge reality and existence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paradox Library',
    description: 'Explore mind-bending paradoxes and thought experiments.',
  },
}

export default function ParadoxesLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

