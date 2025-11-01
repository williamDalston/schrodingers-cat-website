'use client'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function ParadoxesPage() {
  const paradoxes = [
    {
      id: 1,
      slug: "schrodingers-cat",
      title: "Schrödinger's Cat",
      category: "Quantum Mechanics",
      description: "The famous thought experiment where a cat in a box is simultaneously alive and dead until observed.",
      status: "published",
    },
    {
      id: 2,
      slug: "grandfather-paradox",
      title: "The Grandfather Paradox",
      category: "Time Travel",
      description: "What happens if you travel back in time and kill your own grandfather before your parent is born?",
      status: "published",
    },
    {
      id: 3,
      slug: "ship-of-theseus",
      title: "The Ship of Theseus",
      category: "Identity",
      description: "If all parts of a ship are replaced, is it still the same ship?",
      status: "published",
    },
    {
      id: 4,
      slug: "russells-paradox",
      title: "Russell's Paradox",
      category: "Mathematics & Logic",
      description: "A simple question about sets that revealed a fatal flaw in the foundations of mathematics.",
      status: "published",
    },
    {
      id: 5,
      slug: "olbers-paradox",
      title: "Olbers' Paradox",
      category: "Cosmology",
      description: "If the universe is infinite and full of stars, why is the night sky dark?",
      status: "published",
    },
    {
      id: 6,
      slug: "banach-tarski",
      title: "The Banach-Tarski Paradox",
      category: "Mathematics",
      description: "Mathematically duplicate a solid sphere by cutting it into pieces and rearranging them.",
      status: "published",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Paradox Library
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore mind-bending paradoxes that challenge our understanding of reality, time, identity, and existence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paradoxes.map((paradox) => (
            <Link
              key={paradox.id}
              href={paradox.status === 'coming-soon' ? '#' : `/paradoxes/${paradox.slug}`}
              className="group block bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300 card-3d quantum-layer relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/50 transition-all duration-300 pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                  {paradox.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {paradox.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{paradox.description}</p>
                <div className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                  {paradox.status === 'coming-soon' ? 'Coming Soon' : (
                    <>
                      Read More
                      <ArrowRightIcon className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

