import Link from 'next/link'
import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <div className="inline-flex p-5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg">
              <HeartIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              About
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Building something beautiful in Tbilisi
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Schrödinger&apos;s Cat is a free exploration platform for science, paradoxes, and daily curiosity. 
              We believe that learning should be beautiful, accessible, and free.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We create beautifully designed content that makes complex scientific concepts accessible and engaging. 
              Our 95/5 model means 95% of what we offer is completely free—because knowledge should be shared.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Built in Tbilisi</h2>
            <p className="text-gray-700 mb-6">
              Born from the digital nomad community in Georgia, we understand the challenges and opportunities 
              of building something meaningful while exploring the world. This platform is our contribution 
              to making science education more accessible and beautiful.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Philosophy</h2>
            <p className="text-gray-700 mb-6">
              We don&apos;t believe in paywalls for education. Our content is free, our tools are free, 
              and our curiosity is endless. The small shop we maintain is simply a way for those who 
              want to support the work—like backing a creator you believe in.
            </p>

            <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Questions or ideas?</span> We&apos;re always curious to hear from you. 
                Reach out through our newsletter or explore the platform to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

