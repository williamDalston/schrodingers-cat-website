'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ExclamationTriangleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Decorative Elements */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
          <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-2xl quantum-layer">
            <ExclamationTriangleIcon className="h-16 w-16 text-white icon-3d" aria-hidden="true" />
          </div>
        </div>

        {/* Quantum-themed heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          <span className="block">Quantum</span>
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent animate-gradient">
            Collapse
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
          Something unexpected happened. Our quantum state has collapsed into an error.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-all">
              <strong>Error:</strong> {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={reset}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg btn-3d quantum-glow shadow-lg transition-all duration-200"
            aria-label="Try again"
          >
            <ArrowPathIcon className="mr-2 h-5 w-5 icon-3d" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 glass text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-orange-300 btn-3d quantum-layer transition-all duration-200"
          >
            <HomeIcon className="mr-2 h-5 w-5 icon-3d" aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 quantum-layer">
          <p className="text-sm text-gray-600">
            If this problem persists, please{' '}
            <a
              href="mailto:support@example.com"
              className="text-orange-600 hover:text-orange-700 font-medium underline"
            >
              contact support
            </a>
            {' '}or try again later.
          </p>
        </div>
      </div>
    </div>
  )
}

