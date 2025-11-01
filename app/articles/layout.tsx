import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quantum Consciousness Articles | Schrödinger\'s Cat',
  description: 'A deep dive into how quantum mechanics intersects with consciousness. Explore articles on measurement problems, many worlds, IIT, and more.',
  keywords: 'quantum consciousness, wave function collapse, many worlds, IIT, Penrose, microtubules, quantum mechanics, consciousness',
  openGraph: {
    title: 'Quantum Consciousness Articles | Schrödinger\'s Cat',
    description: 'A comprehensive series exploring quantum consciousness with insights from philosopher Kelvin McQueen.',
    type: 'website',
    images: [
      {
        url: '/articles-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Quantum Consciousness Article Series',
      },
    ],
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

