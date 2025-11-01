'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container-spacing section-spacing max-w-4xl">
        <Link
          href="/"
          className="link-primary inline-flex items-center mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="card p-8 md:p-12 shadow-sm">
          <header className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex p-5 gradient-primary rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <HeartIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              About
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Building something beautiful in Tbilisi
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Schrödinger&apos;s Cat is a free exploration platform for science, paradoxes, and daily curiosity. 
              We believe that learning should be beautiful, accessible, and free.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">Our Mission</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              We create beautifully designed content that makes complex scientific concepts accessible and engaging. 
              Our 95/5 model means 95% of what we offer is completely free—because knowledge should be shared.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">Built in Tbilisi</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Schrödinger&apos;s Cat began as a beloved cafe in the heart of Tbilisi, a gathering place for curious minds 
              and coffee lovers. Today, we&apos;ve transformed into something new—an exploration platform that carries forward 
              the spirit of curiosity and community that made our cafe special. While we&apos;re offering something different now, 
              we remain committed to fostering the same sense of wonder and connection that brought people together around our tables.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">The Philosophy</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              We don&apos;t believe in paywalls for education. Our content is free, our tools are free, 
              and our curiosity is endless. The small shop we maintain is simply a way for those who 
              want to support the work—like backing a creator you believe in.
            </p>

            <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200 shadow-sm">
              <p className="text-center text-gray-700 font-light text-lg">
                <span className="font-semibold">Questions or ideas?</span> We&apos;re always curious to hear from you. 
                Reach out through our newsletter or explore the platform to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

