import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Russell\'s Paradox Explained | Paradox Library',
  description: 'Explore the fundamental paradox that shook mathematics: a simple question about sets that revealed fatal flaws in set theory foundations.',
  keywords: ['russell\'s paradox', 'set theory', 'mathematics', 'logic', 'foundations of mathematics', 'bertrand russell'],
  openGraph: {
    title: 'Russell\'s Paradox - The Mathematics Paradox',
    description: 'The simple question that shook the foundations of mathematics.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Russell\'s Paradox',
    description: 'A paradox that changed mathematics forever.',
  },
}

export default function RussellsParadoxLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

