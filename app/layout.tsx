import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: 'Schrödinger\'s Cat - Science Exploration & Curiosity',
  description: 'Free exploration platform for science, paradoxes, and daily curiosity. Beautifully designed content with an embedded shop for science enthusiasts.',
  keywords: 'science, paradoxes, curiosity, exploration, physics, philosophy, Tbilisi',
  openGraph: {
    title: 'Schrödinger\'s Cat - Science Exploration & Curiosity',
    description: 'Free exploration platform for science, paradoxes, and daily curiosity. Beautifully designed content with an embedded shop for science enthusiasts.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Schrödinger\'s Cat',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Schrödinger\'s Cat - Science Exploration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schrödinger\'s Cat - Science Exploration & Curiosity',
    description: 'Free exploration platform for science, paradoxes, and daily curiosity.',
    images: ['/og-image.jpg'],
    creator: '@schrodingerscat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Navigation />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1f2937',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#0284c7',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

