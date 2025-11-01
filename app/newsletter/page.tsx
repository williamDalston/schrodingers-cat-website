'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: name || undefined }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        // Store email in localStorage for puzzle/progress tracking
        if (typeof window !== 'undefined' && email) {
          localStorage.setItem('newsletter_email', email)
        }
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to submit. Please check your connection and try again.')
      console.error('Newsletter subscription error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
      <div className="container-spacing section-spacing max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center text-white/90 hover:text-white mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="card p-8 md:p-12 shadow-2xl">
          <header className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex p-5 gradient-primary rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <EnvelopeIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Daily Curiosity Newsletter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Get your daily dose of fascinating science, thought experiments, and mind-bending paradoxes delivered to your inbox.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="input w-full focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={status === 'loading'}
                whileFocus={{ scale: 1.01, y: -2 }}
                initial={false}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name (Optional)
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input w-full focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'loading'}
                whileFocus={{ scale: 1.01, y: -2 }}
                initial={false}
              />
            </div>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`p-4 rounded-lg ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800 border-2 border-green-200'
                      : status === 'error'
                      ? 'bg-red-50 text-red-800 border-2 border-red-200'
                      : ''
                  }`}
                >
                  {status === 'success' ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      </motion.div>
                      <span className="font-medium">{message}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'idle' && (
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              )}
              <span className="relative flex items-center">
                {status === 'loading' ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Subscribing...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe Free
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Free forever. No credit card required.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Daily emails with fascinating science content.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Unsubscribe anytime with one click.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>No spam. Just pure curiosity.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

