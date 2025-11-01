'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Decorative Elements */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl shadow-2xl quantum-layer">
                <ExclamationTriangleIcon className="h-16 w-16 text-white icon-3d" aria-hidden="true" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="block">Critical</span>
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent animate-gradient">
                Error
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              A critical error occurred in the application. Please refresh or try again later.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={reset}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg btn-3d quantum-glow shadow-lg transition-all duration-200"
                aria-label="Try again"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-8 py-4 glass text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-red-300 btn-3d quantum-layer transition-all duration-200"
              >
                <HomeIcon className="inline mr-2 h-5 w-5 icon-3d" aria-hidden="true" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

