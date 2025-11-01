import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Schrödinger\'s Cat Paradox Explained | Paradox Library',
  description: 'The famous quantum thought experiment where a cat is simultaneously alive and dead. Deep dive into quantum mechanics, superposition, and interpretations of reality.',
  keywords: ['Schrödinger\'s cat', 'quantum mechanics', 'superposition', 'wave function collapse', 'observer effect', 'Copenhagen interpretation', 'many-worlds interpretation'],
  openGraph: {
    title: 'Schrödinger\'s Cat - The Famous Quantum Paradox',
    description: 'Explore the famous thought experiment that challenges our understanding of reality and quantum mechanics.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schrödinger\'s Cat Paradox',
    description: 'How a cat can be alive and dead at the same time.',
  },
}

export default function SchrodingersCatLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

