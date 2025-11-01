'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  DocumentArrowDownIcon,
  CheckCircleIcon,
  SparklesIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

export default function DownloadPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store email in localStorage
        if (typeof window !== 'undefined' && email) {
          localStorage.setItem('newsletter_email', email)
        }
        alert('Check your email for the download link!')
        // TODO: In production, redirect to actual download or send via email
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit. Please check your connection and try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-accent-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-white/90 hover:text-white mb-8 text-lg"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary-600 via-accent-600 to-purple-600 p-12 md:p-16 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
              >
                <DocumentArrowDownIcon className="h-16 w-16" />
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                10 Mind-Bending Paradoxes
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light leading-relaxed">
                A Free Guide to Reality-Challenging Thought Experiments
              </p>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Curated collection of fascinating paradoxes from quantum mechanics, 
                philosophy, mathematics, and cosmology that will blow your mind.
              </p>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-12 md:p-16">
            {/* What's Inside */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                What&apos;s Inside This Guide?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Schrödinger\'s Cat',
                    description: 'Quantum superposition and the measurement problem',
                    icon: '📦'
                  },
                  {
                    title: 'The Grandfather Paradox',
                    description: 'Time travel and causal loops explained',
                    icon: '🕰️'
                  },
                  {
                    title: 'The Ship of Theseus',
                    description: 'Identity and change through time',
                    icon: '⛵'
                  },
                  {
                    title: 'The Fermi Paradox',
                    description: 'Where are all the aliens?',
                    icon: '👽'
                  },
                  {
                    title: 'Hilbert\'s Hotel',
                    description: 'The bizarre nature of infinity',
                    icon: '🏨'
                  },
                  {
                    title: 'The Fermi Paradox',
                    description: 'Why is the night sky dark?',
                    icon: '🌌'
                  },
                  {
                    title: 'Russell\'s Paradox',
                    description: 'The foundation of set theory',
                    icon: '📚'
                  },
                  {
                    title: 'The Bootstrap Paradox',
                    description: 'Information from the future',
                    icon: '⚡'
                  },
                  {
                    title: 'The Raven Paradox',
                    description: 'What does it mean to confirm?',
                    icon: '🐦'
                  },
                  {
                    title: 'The Simpson\'s Paradox',
                    description: 'Statistics can lie',
                    icon: '📊'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <span className="text-4xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                What You&apos;ll Learn
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🧠',
                    title: 'Deep Understanding',
                    text: 'Go beyond surface-level explanations with detailed philosophical and scientific context'
                  },
                  {
                    icon: '💡',
                    title: 'Critical Thinking',
                    text: 'Develop better reasoning skills by exploring mind-bending logical challenges'
                  },
                  {
                    icon: '🌌',
                    title: 'Bigger Picture',
                    text: 'See how these paradoxes reveal fundamental truths about reality itself'
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center"
                  >
                    <div className="text-5xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Email Capture Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white border-4 border-primary-600 rounded-2xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl mb-6">
                  <EnvelopeIcon className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free PDF Now
                </h2>
                <p className="text-xl text-gray-600">
                  Enter your email below and we&apos;ll send you the complete guide instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  required
                />
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Download Free PDF
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>100% free - no credit card required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Instant download delivered to your inbox</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Bonus: Weekly paradox emails (unsubscribe anytime)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Beautifully designed with illustrations</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-12 bg-gray-900 rounded-2xl p-8 md:p-12 text-white"
            >
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <span className="text-6xl">⭐</span>
                  <span className="text-6xl">⭐</span>
                  <span className="text-6xl">⭐</span>
                  <span className="text-6xl">⭐</span>
                  <span className="text-6xl">⭐</span>
                </div>
                <blockquote className="text-2xl md:text-3xl font-light italic text-gray-100 mb-6 leading-relaxed">
                  &quot;These paradoxes have completely changed how I think about reality. 
                  The explanations are clear, engaging, and mind-blowing. Best free resource I&apos;ve found!&quot;
                </blockquote>
                <p className="text-lg text-gray-400">
                  — Sarah M., Science Enthusiast
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-12 text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Explore More?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Visit our full platform for daily curiosities, interactive puzzles, and more paradoxes.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-all duration-200 gap-2"
              >
                <SparklesIcon className="h-6 w-6" />
                Explore Full Platform
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

