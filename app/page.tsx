import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Layer1Section from '@/components/Layer1Section'
import Layer2Section from '@/components/Layer2Section'
import Layer3Section from '@/components/Layer3Section'
import NewsletterCTA from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Schrödinger\'s Cat - Free Science Exploration & Curiosity Platform',
  description: 'Explore mind-bending paradoxes, daily curiosities, and interactive science tools. Beautifully designed content with Tbilisi soul. Free forever.',
  keywords: ['science', 'paradoxes', 'quantum mechanics', 'thought experiments', 'philosophy', 'physics', 'curiosity', 'education', 'Tbilisi'],
  openGraph: {
    title: 'Schrödinger\'s Cat - Science Exploration Platform',
    description: 'Free exploration platform for science, paradoxes, and daily curiosity. Beautifully designed content with an embedded shop.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schrödinger\'s Cat - Science Exploration',
    description: 'Explore mind-bending paradoxes and daily curiosities. Free forever.',
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
      // TODO: Add social media links
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
      <Layer3Section />
      <NewsletterCTA />
    </div>
  )
}

