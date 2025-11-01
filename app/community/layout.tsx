import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Community | Schrödinger\'s Cat',
  description: 'Join discussions, share insights, and connect with fellow science enthusiasts. Coming soon.',
  keywords: ['community', 'science discussions', 'forums', 'science enthusiasts'],
  openGraph: {
    title: 'Community - Schrödinger\'s Cat',
    description: 'Join discussions with fellow science enthusiasts.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Community',
    description: 'Join the science exploration community.',
  },
}

export default function CommunityLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

