import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'The Banach-Tarski Paradox Explained | Paradox Library',
  description: 'Explore the mathematical paradox of duplicating a solid sphere: using pure mathematics to create something from nothing. A mind-bending result from set theory and geometry.',
  keywords: ['banach-tarski paradox', 'mathematics', 'paradox', 'set theory', 'geometry', 'infinity', 'axiom of choice'],
  openGraph: {
    title: 'The Banach-Tarski Paradox - Double the Sphere',
    description: 'How pure mathematics can duplicate a solid sphere using only rotation and translation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Banach-Tarski Paradox',
    description: 'Create two spheres from one using pure mathematics.',
  },
}

export default function BanachTarskiLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

