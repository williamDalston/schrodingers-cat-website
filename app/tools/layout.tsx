import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Interactive Tools | Schrödinger\'s Cat',
  description: 'Experiment with physics simulations, visualizations, and hands-on learning experiences. Free interactive science tools.',
  keywords: ['interactive tools', 'physics simulations', 'visualizations', 'quantum tools', 'simulators', 'science experiments'],
  openGraph: {
    title: 'Interactive Tools - Schrödinger\'s Cat',
    description: 'Experiment with physics simulations and hands-on learning tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Tools',
    description: 'Experiment with physics simulations and visualizations.',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

