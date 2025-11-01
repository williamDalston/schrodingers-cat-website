'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
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
        body: JSON.stringify({ email }),
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
    <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 perspective-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <EnvelopeIcon className="h-16 w-16 text-white mx-auto mb-6 icon-3d quantum-wave" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-3d">
            Daily Curiosity, Delivered
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your daily dose of fascinating science, thought experiments, and mind-bending paradoxes. 
            Free. No spam. Just pure curiosity.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <motion.input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white quantum-layer depth-shadow-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              required
              aria-required="true"
              disabled={status === 'loading'}
              whileFocus={{ scale: 1.02 }}
              initial={false}
            />
            <motion.button
              type="submit"
              whileHover={status === 'idle' ? { scale: 1.05, y: -2 } : {}}
              whileTap={status === 'idle' ? { scale: 0.95 } : {}}
              className="relative px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg btn-3d quantum-glow depth-shadow-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden group"
              aria-label="Subscribe to daily curiosity newsletter"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'idle' && (
                <span className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-100/50 to-primary-50/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              )}
              <span className="relative flex items-center">
                {status === 'loading' ? (
                  <>
                    <motion.svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    Subscribing...
                  </>
                ) : status === 'success' ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex items-center"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                    Subscribed!
                  </motion.span>
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

          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm max-w-md mx-auto font-medium ${
                status === 'success'
                  ? 'text-white'
                  : status === 'error'
                  ? 'text-yellow-100'
                  : 'text-white/90'
              }`}
            >
              {message}
            </motion.p>
          )}

          <p className="mt-6 text-sm text-white/90">
            Join thousands exploring science daily. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

