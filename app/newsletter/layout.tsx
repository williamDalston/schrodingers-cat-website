import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Subscribe to Daily Curiosity Newsletter | Schrödinger\'s Cat',
  description: 'Get your daily dose of fascinating science, thought experiments, and mind-bending paradoxes. Free forever, unsubscribe anytime.',
  keywords: ['newsletter', 'daily science', 'email subscription', 'science newsletter', 'curiosity newsletter'],
  openGraph: {
    title: 'Subscribe to Daily Curiosity - Schrödinger\'s Cat',
    description: 'Get your daily dose of fascinating science delivered to your inbox.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Curiosity Newsletter',
    description: 'Free daily science content delivered to your inbox.',
  },
}

export default function NewsletterLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

