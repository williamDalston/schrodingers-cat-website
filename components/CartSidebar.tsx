'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'
import { motion, AnimatePresence } from 'framer-motion'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity } = useCart()

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle quantity update with validation
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClose()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close cart sidebar"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 id="cart-title" className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
                aria-label="Close cart"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <ShoppingBagIcon className="h-8 w-8 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      onClick={onClose}
                      className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatPrice(item.product.price, item.product.currency)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 focus-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-10 text-center" aria-label={`Quantity: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 focus-ring transition-colors text-lg font-semibold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg focus-ring transition-colors"
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.product.price * item.quantity, item.product.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(cart.total, 'USD')}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 text-center transition-colors focus-ring"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center text-gray-600 hover:text-gray-900 font-medium text-sm py-2 focus-ring rounded"
            >
              View Full Cart
            </Link>
          </div>
        )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

