import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Olbers\' Paradox Explained | Paradox Library',
  description: 'Explore the cosmological puzzle: if the universe is infinite and full of stars, why is the night sky dark? Discover the answers that changed our understanding of the cosmos.',
  keywords: ['olbers\' paradox', 'cosmology', 'astronomy', 'night sky', 'universe expansion', 'big bang'],
  openGraph: {
    title: 'Olbers\' Paradox - The Dark Sky Mystery',
    description: 'Why is the night sky dark if the universe is full of stars?',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olbers\' Paradox',
    description: 'The cosmological mystery of the dark night sky.',
  },
}

export default function OlbersParadoxLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

