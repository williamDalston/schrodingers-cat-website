import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Download: 10 Mind-Bending Paradoxes',
  description: 'Get your free PDF guide to 10 fascinating paradoxes that challenge our understanding of reality, time, and existence.',
  openGraph: {
    title: 'Free Download: 10 Mind-Bending Paradoxes',
    description: 'Get your free PDF guide exploring fascinating paradoxes that challenge our understanding of reality.',
    type: 'website',
    images: [
      {
        url: '/lead-magnet-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free PDF: 10 Mind-Bending Paradoxes',
      },
    ],
  },
}

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

