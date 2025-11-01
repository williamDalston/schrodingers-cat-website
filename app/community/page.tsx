'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export default function CommunityPage() {
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

        <header className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <UserGroupIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Join discussions, share insights, and connect with fellow science enthusiasts.
          </p>
        </header>

        <div className="card p-8 shadow-sm">
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

