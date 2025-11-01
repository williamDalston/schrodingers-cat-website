'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { products, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import type { Product, ProductCategory } from '@/lib/types'

type SortOption = 'price-low' | 'price-high' | 'name' | 'newest'

export default function ShopPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  const categories: (ProductCategory | 'all')[] = ['all', 'poster', 'digital', 'stationery', 'course']

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.title.localeCompare(b.title)
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container-spacing section-spacing">
        <Link
          href="/"
          className="link-primary inline-flex items-center mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <header className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 gradient-primary rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ShoppingBagIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">Shop</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-light">
            Support what you love. Products naturally emerge from the content you explore. 
            No pressure—just beautiful ways to support the work.
          </p>
        </header>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-4 focus-ring"
              aria-label="Search products"
            />
          </div>

          {/* Category Filters and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>

            {showFilters && (
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all focus-ring ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-md scale-105'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-primary-300'
                    }`}
                    aria-pressed={selectedCategory === category}
                  >
                    {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="input ml-auto focus-ring"
              aria-label="Sort products"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No products found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="card-hover overflow-hidden"
              >
                <Link href={`/shop/${product.slug}`}>
                  <div className="h-64 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center relative">
                    <ShoppingBagIcon className="h-20 w-20 text-primary-400 opacity-50" />
                    {product.inStock === false && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary-600">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                  <Link href={`/shop/${product.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  {product.relatedContent && product.relatedContent.length > 0 && (
                    <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                      From: <span className="font-semibold">{product.relatedContent[0]}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inStock === false}
                    className={`w-full font-semibold transition-all focus-ring ${
                      product.inStock === false
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed rounded-lg px-6 py-3'
                        : 'btn-primary'
                    }`}
                  >
                    {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 max-w-2xl mx-auto card p-6 text-center">
          <p className="text-gray-700 font-light">
            <span className="font-semibold">Our Promise:</span> Every product is carefully designed and directly connected to content you&apos;ve explored. 
            We&apos;re building this shop thoughtfully—check back soon!
          </p>
        </div>
      </div>
    </div>
  )
}
