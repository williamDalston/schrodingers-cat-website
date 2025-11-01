'use client'

import { use } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { getProductBySlug, formatPrice } from '@/lib/products'
import { 
  ArrowLeftIcon, 
  PlusIcon,
  MinusIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ShareButtons from '@/components/ShareButtons'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const product = getProductBySlug(resolvedParams.slug)
  const { addToCart, cart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) {
    notFound()
  }

  const cartItem = cart.items.find(item => item.product.id === product.id)
  const inCart = cartItem ? cartItem.quantity : 0

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, quantity)
    setShowSuccess(true)
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(false)
      setQuantity(1)
    }, 2000)
  }

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/shop"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
              <SparklesIcon className="h-48 w-48 text-primary-400 opacity-50" />
              {product.category === 'digital' && (
                <div className="absolute top-6 right-6 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  ⚡ Instant Download
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                  <span className="text-white font-bold text-2xl">Out of Stock</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                {getCategoryLabel(product.category)}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                {formatPrice(product.price, product.currency)}
              </div>
            </div>

            {product.longDescription && (
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{product.longDescription}</p>
              </div>
            )}

            {product.description && !product.longDescription && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.category === 'digital' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-green-900 mb-2">✨ What You Get:</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Instant digital delivery after purchase</li>
                  <li>• High-resolution files ready for printing</li>
                  <li>• Lifetime access to your downloads</li>
                  <li>• Compatible with all devices</li>
                </ul>
              </div>
            )}

            {/* Related Content */}
            {product.relatedContentSlugs && product.relatedContentSlugs.length > 0 && (
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                <p className="text-sm text-gray-600 mb-2">Related Content:</p>
                <div className="flex flex-wrap gap-2">
                  {product.relatedContentSlugs.map((slug, index) => (
                    <Link
                      key={index}
                      href={`/${slug}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm underline"
                    >
                      {product.relatedContent?.[index] || 'View Content'}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            {product.inStock && (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {inCart > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      You have {inCart} {inCart === 1 ? 'item' : 'items'} of this product in your cart.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || !product.inStock}
                  className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                    showSuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none`}
                >
                  {showSuccess ? (
                    <>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : isAdding ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-6 w-6" />
                      Add to Cart - {formatPrice(product.price * quantity, product.currency)}
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="w-full block text-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Cart ({cart.itemCount})
                </Link>
              </div>
            )}

            {/* Share */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-500 mb-3">Share this product:</p>
              <ShareButtons 
                title={product.title}
                description={product.description}
              />
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {product.relatedContentSlugs && product.relatedContentSlugs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Explore Related Content</h2>
              <Link
                href={`/${product.relatedContentSlugs[0]}`}
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
              >
                View Content
                <ArrowRightIcon className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

