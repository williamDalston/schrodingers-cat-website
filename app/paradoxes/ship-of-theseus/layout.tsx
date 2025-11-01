import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'The Ship of Theseus Paradox Explained | Paradox Library',
  description: 'Explore the ancient identity paradox: if every part of a ship is replaced, is it still the same ship? Deep dive into philosophy of identity and continuity.',
  keywords: ['ship of theseus', 'identity paradox', 'philosophy', 'continuity', 'material identity', 'personal identity'],
  openGraph: {
    title: 'The Ship of Theseus - Identity Paradox',
    description: 'If all parts of a ship are replaced, is it still the same ship? Explore the identity paradox.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ship of Theseus',
    description: 'The ancient paradox of identity and continuity.',
  },
}

export default function ShipOfTheseusLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

