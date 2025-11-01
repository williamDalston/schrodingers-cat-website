import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Shop - Science Merchandise | Schrödinger\'s Cat',
  description: 'Beautiful science posters, digital products, and merchandise. Support the work while getting amazing products.',
  keywords: ['science posters', 'digital products', 'merchandise', 'science gifts', 'educational products'],
  openGraph: {
    title: 'Shop - Schrödinger\'s Cat',
    description: 'Support the work with beautiful science products and merchandise.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop - Science Products',
    description: 'Beautiful science posters and digital products.',
  },
}

export default function ShopLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}

