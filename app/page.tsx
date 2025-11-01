import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Layer1Section from '@/components/Layer1Section'
import Layer2Section from '@/components/Layer2Section'
import NewsletterCTA from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Schrödinger\'s Cat - Science, Philosophy & Quantum Mechanics',
  description: 'Explore fundamental paradoxes, quantum consciousness theories, and thought experiments. Scholarly content on physics, philosophy, and the nature of reality.',
  keywords: ['quantum mechanics', 'consciousness', 'philosophy of mind', 'paradoxes', 'quantum physics', 'thought experiments', 'physics', 'neuroscience', 'IIT', 'many worlds'],
  openGraph: {
    title: 'Schrödinger\'s Cat - Quantum Consciousness & Philosophy',
    description: 'Deep exploration of quantum mechanics, consciousness theories, and fundamental paradoxes in physics and philosophy.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schrödinger\'s Cat - Quantum Consciousness',
    description: 'Exploring the intersection of quantum mechanics, consciousness, and the nature of reality.',
  },
}

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Schrödinger's Cat",
    description: 'Free exploration platform for science, paradoxes, and daily curiosity',
    url: 'https://yourdomain.com', // TODO: Update with actual domain
    logo: 'https://yourdomain.com/logo.png', // TODO: Add actual logo
    sameAs: [
      'https://www.instagram.com/schrodingerscat_restaurant',
      'https://www.facebook.com/SchrodingersCatTbilisi/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Schrödinger's Cat",
    url: 'https://yourdomain.com', // TODO: Update with actual domain
    description: 'Free exploration platform for science, paradoxes, and daily curiosity',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourdomain.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <Layer1Section />
      <Layer2Section />
      <NewsletterCTA />
    </div>
  )
}

