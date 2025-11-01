import Link from 'next/link'
import { ArrowLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-5 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg">
            <UserGroupIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join discussions, share insights, and connect with fellow science enthusiasts.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re building a community space where curious minds can discuss paradoxes, 
              share insights, and learn together. Join the newsletter to be notified when it launches!
            </p>
            <div className="text-sm text-gray-500">
              Until then, explore our content and follow us for updates!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

