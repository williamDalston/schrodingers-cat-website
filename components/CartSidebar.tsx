'use client'

import Link from 'next/link'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                      aria-label="Remove item"
                    >
                      Remove
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
              className="block w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 text-center transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              onClick={onClose}
              className="block w-full text-center text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

