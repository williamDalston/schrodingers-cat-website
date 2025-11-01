'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

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
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-accent-600">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-primary-100 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg">
              <EnvelopeIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Daily Curiosity Newsletter
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get your daily dose of fascinating science, thought experiments, and mind-bending paradoxes delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                required
                disabled={status === 'loading'}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === 'loading'}
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  status === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : status === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : ''
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Subscribed!
                </span>
              ) : (
                'Subscribe Free'
              )}
            </button>
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

