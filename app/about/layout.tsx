import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About Us | Schrödinger\'s Cat',
  description: 'Built in Tbilisi, this free exploration platform makes science beautiful and accessible to everyone. 95% free, 100% curiosity.',
  keywords: ['about', 'Tbilisi', 'science education', 'free learning', 'digital nomad', 'Georgia'],
  openGraph: {
    title: 'About Schrödinger\'s Cat',
    description: 'Building beautiful science exploration in Tbilisi, Georgia.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Us',
    description: 'Built in Tbilisi. Making science beautiful and free.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

