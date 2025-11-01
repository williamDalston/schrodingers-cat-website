import Link from 'next/link'
import { HomeIcon, MagnifyingGlassIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Decorative Elements */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"></div>
          <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl shadow-2xl quantum-layer">
            <span className="text-6xl font-bold text-white text-3d">404</span>
          </div>
        </div>

        {/* Quantum-themed heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          <span className="block">Page in</span>
          <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent animate-gradient">
            Superposition
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          This page exists and doesn&apos;t exist simultaneously—until you observe it.
          Unfortunately, we couldn&apos;t find what you&apos;re looking for.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg btn-3d quantum-glow shadow-lg transition-all duration-200"
          >
            <HomeIcon className="mr-2 h-5 w-5 icon-3d" aria-hidden="true" />
            Back to Home
            <BeakerIcon className="ml-2 h-4 w-4 opacity-70" aria-hidden="true" />
          </Link>
          <Link
            href="/paradoxes"
            className="group inline-flex items-center px-8 py-4 glass text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-primary-300 btn-3d quantum-layer transition-all duration-200"
          >
            <MagnifyingGlassIcon className="mr-2 h-5 w-5 icon-3d" aria-hidden="true" />
            Explore Paradoxes
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 quantum-layer">
          <p className="text-sm text-gray-600 mb-4">Looking for something specific?</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              href="/curiosity"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
            >
              Daily Curiosity →
            </Link>
            <Link
              href="/tools"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
            >
              Interactive Tools →
            </Link>
            <Link
              href="/puzzles"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
            >
              Weekly Puzzles →
            </Link>
            <Link
              href="/shop"
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors"
            >
              Shop →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

