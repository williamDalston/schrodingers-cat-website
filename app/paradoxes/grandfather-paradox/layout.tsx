import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'The Grandfather Paradox Explained | Paradox Library',
  description: 'Explore the classic time travel thought experiment that reveals logical problems with backwards time travel and the nature of causality.',
  keywords: ['grandfather paradox', 'time travel', 'causality', 'paradoxes', 'temporal mechanics', 'butterfly effect'],
  openGraph: {
    title: 'The Grandfather Paradox - Time Travel Paradox',
    description: 'What happens if you travel back in time and kill your own grandfather? Explore the classic time travel paradox.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Grandfather Paradox',
    description: 'The impossible logical loop of time travel.',
  },
}

export default function GrandfatherParadoxLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

