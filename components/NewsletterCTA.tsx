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

    // Validate email format client-side first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      // Check if response is ok before parsing
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Something went wrong. Please try again.'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If JSON parsing fails, use default message
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        setStatus('error')
        setMessage(errorMessage)
        return
      }

      const data = await response.json()

      setStatus('success')
      setMessage(data.message || 'Successfully subscribed! Check your email for a welcome message.')
      // Store email in localStorage for puzzle/progress tracking
      if (typeof window !== 'undefined' && email) {
        try {
          localStorage.setItem('newsletter_email', email)
        } catch (storageError) {
          console.warn('Failed to store email in localStorage:', storageError)
          // Don't fail the subscription if localStorage fails
        }
      }
      setEmail('')
    } catch (error) {
      setStatus('error')
      if (error instanceof Error) {
        setMessage(`Failed to submit: ${error.message}. Please check your connection and try again.`)
      } else {
        setMessage('Failed to submit. Please check your connection and try again.')
      }
      console.error('Newsletter subscription error:', error)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 perspective-container relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-8"
          >
            <EnvelopeIcon className="h-20 w-20 text-white icon-3d quantum-wave drop-shadow-2xl" aria-hidden="true" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-3d leading-tight drop-shadow-lg">
            Daily Curiosity, Delivered
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Get your daily dose of fascinating science, thought experiments, and mind-bending paradoxes.{' '}
            <span className="font-medium">Free. No spam. Just pure curiosity.</span>
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
              className="flex-1 px-6 py-5 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80 quantum-layer depth-shadow-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm bg-white/95"
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
              className="relative px-10 py-5 bg-white text-blue-600 font-bold rounded-xl btn-3d quantum-glow depth-shadow-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden group hover:shadow-2xl hover:shadow-white/30 transition-all"
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

