'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ShoppingBagIcon,
  SparklesIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const sampleProducts = [
  {
    slug: 'schrodingers-cat-poster',
    title: 'Schrödinger\'s Cat Poster',
    description: 'Beautifully designed poster explaining the famous thought experiment',
    price: '$24',
    category: 'Poster',
    relatedTo: 'paradoxes',
  },
  {
    slug: 'quantum-entanglement-notebook',
    title: 'Quantum Entanglement Notebook',
    description: 'Premium notebook with quantum physics illustrations',
    price: '$18',
    category: 'Stationery',
    relatedTo: 'curiosity',
  },
  {
    slug: 'paradox-collection-ebook',
    title: 'Paradox Collection eBook',
    description: 'Curated collection of 50 mind-bending paradoxes with explanations',
    price: '$12',
    category: 'Digital',
    relatedTo: 'paradoxes',
  },
]

export default function Layer3Section() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 via-white to-primary-50/30 relative overflow-hidden perspective-container">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl animate-float-delayed"></div>
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
            className="inline-block px-4 py-2 glass rounded-full text-sm font-semibold text-primary-700 mb-6"
          >
            🛍️ Support What You Love
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="block">Embedded</span>
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Shop
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Products emerge naturally from content. No pressure—just support what you love.
          </p>
          <p className="text-lg text-gray-500">
            95% of visitors never buy, and that&apos;s perfect. The 5% who do are supporting something they already love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="group relative glass rounded-3xl border border-white/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center relative z-10">
                  <SparklesIcon className="h-16 w-16 text-primary-500 opacity-50 icon-3d" aria-hidden="true" />
                </div>
              
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary-600">{product.category}</span>
                    <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="inline-flex items-center text-primary-600 font-bold text-lg hover:gap-2 transition-all group/link"
                  >
                    View Product
                    <ArrowRightIcon className="ml-2 h-6 w-6 group-hover/link:translate-x-2 transition-transform" aria-hidden="true" />
                  </Link>
                </div>

                {/* Subtle badge showing content connection */}
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-semibold text-gray-600 shadow-lg">
                  From {product.relatedTo}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-primary-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-gradient glow-border"
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
              Browse All Products
              <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto p-8 glass rounded-2xl border border-white/50 shadow-xl quantum-layer"
        >
          <p className="text-center text-gray-700 text-lg">
            <span className="font-bold">Our Philosophy:</span> We create beautiful content first. 
            Products are simply ways to support the work you love—like backing a creator you believe in.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

