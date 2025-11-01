'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  PuzzlePieceIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const retentionFeatures = [
  {
    icon: PuzzlePieceIcon,
    title: 'Weekly Puzzles',
    description: 'Challenge your mind with weekly science puzzles. Track your progress and unlock achievements.',
    href: '/puzzles',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Tracking',
    description: 'See your exploration journey with badges, streaks, and personalized learning paths.',
    href: '/progress',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: UserGroupIcon,
    title: 'Community',
    description: 'Join discussions, share insights, and connect with fellow science enthusiasts.',
    href: '/community',
    color: 'from-green-500 to-green-600',
  },
]

export default function Layer2Section() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-orange-50/20 to-blue-50/20 relative overflow-hidden perspective-container">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 glass rounded-full text-sm font-semibold text-orange-700 mb-6"
          >
            Deep Engagement
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="block">Ongoing</span>
            <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Discovery
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Weekly puzzles, progress tracking, and community discussions to deepen your understanding of complex topics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {retentionFeatures.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href={feature.href}
                className="group relative block h-full p-10 glass rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Icon with floating animation */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${feature.color} mb-8 shadow-lg relative z-10`}
                >
                  <feature.icon className="h-10 w-10 text-white" aria-hidden="true" />
                </motion.div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed relative z-10">
                  {feature.description}
                </p>

                <div className="inline-flex items-center text-primary-600 font-bold text-lg group-hover:gap-3 transition-all relative z-10">
                  Learn More
                  <ArrowRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 glass rounded-2xl border border-white/50 shadow-xl quantum-layer">
            <p className="text-lg text-gray-700 mb-3">
              <span className="font-bold">💡 Daily Email:</span> Get your curiosity delivered every morning.
            </p>
            <Link href="/newsletter" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold text-lg quantum-layer group">
              Subscribe free
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

