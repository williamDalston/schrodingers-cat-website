'use client'

import Link from 'next/link'
import { ArrowLeftIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/shop"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Shop
          </Link>

          <div className="text-center py-16">
            <ShoppingBagIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-lg"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/shop"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Continue Shopping
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg md:text-xl text-gray-600">{cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <div key={item.product.id} className="p-6 md:p-8">
                <div className="flex gap-6">
                  <Link
                    href={`/shop/${item.product.slug}`}
                    className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex-shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <ShoppingBagIcon className="h-10 w-10 text-primary-400" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="text-xl font-bold text-gray-900 hover:text-primary-600 mb-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-gray-600 mb-2">{item.product.description}</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPrice(item.product.price, item.product.currency)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold text-lg"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-lg font-semibold min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors font-semibold text-lg"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="ml-auto text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatPrice(item.product.price * item.quantity, item.product.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={clearCart}
                className="text-sm md:text-base px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
            <div className="flex items-center justify-between text-xl mb-6">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(cart.total, 'USD')}
              </span>
            </div>
            <Link
              href="/checkout"
              className="block w-full px-8 py-4 bg-primary-600 text-white font-bold text-lg rounded-lg hover:bg-primary-700 text-center transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
