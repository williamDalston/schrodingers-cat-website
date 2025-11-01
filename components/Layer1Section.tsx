'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpenIcon, 
  LightBulbIcon, 
  BeakerIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: BookOpenIcon,
    title: 'Paradox Library',
    description: 'Dive into mind-bending paradoxes that challenge how you think about reality, time, and existence.',
    href: '/paradoxes',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: LightBulbIcon,
    title: 'Daily Curiosity',
    description: 'Get your daily dose of fascinating science facts, thought experiments, and awe-inspiring discoveries.',
    href: '/curiosity',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: BeakerIcon,
    title: 'Interactive Tools',
    description: 'Experiment with physics simulations, visualizations, and hands-on learning experiences.',
    href: '/tools',
    color: 'from-tertiary-500 to-tertiary-600',
  },
]

export default function Layer1Section() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-primary-50/30 to-accent-50/30 relative overflow-hidden perspective-container">
      {/* Decorative elements with 3D depth */}
      <div className="absolute inset-0 opacity-20 parallax-container">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-float parallax-slow quantum-fluctuate"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl animate-float-delayed parallax-medium quantum-fluctuate"></div>
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
            className="inline-block px-4 py-2 glass rounded-full text-sm font-semibold text-primary-700 mb-6 quantum-layer depth-shadow-1"
          >
            ✨ Free Forever
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="block text-3d">Explore Without</span>
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent text-3d quantum-wave">
              Limits
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything here is completely free. No signup, no paywall, just pure scientific curiosity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
                className="group relative block h-full p-10 glass rounded-3xl border border-white/50 card-3d quantum-layer depth-shadow-2 transition-all duration-500 overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Icon with floating animation */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${feature.color} mb-8 shadow-lg relative z-10 quantum-glow`}
                >
                  <feature.icon className="h-10 w-10 text-white icon-3d" aria-hidden="true" />
                </motion.div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors relative z-10 text-3d">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed relative z-10">
                  {feature.description}
                </p>

                <div className="inline-flex items-center text-primary-600 font-bold text-lg group-hover:gap-3 transition-all relative z-10">
                  Explore
                  <ArrowRightIcon className="ml-2 h-6 w-6 icon-3d group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

