'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/products'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string>('')

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && status === 'idle') {
      router.push('/shop')
    }
  }, [cart.items.length, router, status])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setError('Please fill in all required fields (marked with *).')
      setStatus('error')
      return
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      return
    }

    // Check if cart has physical products (need shipping address)
    const hasPhysicalProducts = cart.items.some(item => item.product.category !== 'digital')
    
    // Validate shipping address if physical products
    if (hasPhysicalProducts) {
      if (!formData.address || !formData.city || !formData.zipCode || !formData.country) {
        setError('Please provide complete shipping information for physical products.')
        setStatus('error')
        return
      }
    }

    // Validate cart still has items
    if (cart.items.length === 0) {
      setError('Your cart is empty. Please add items before checking out.')
      setStatus('error')
      router.push('/shop')
      return
    }

    try {
      // TODO: Integrate with payment processor (FanBasis/PayPal)
      // For now, simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate order ID
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

      // Store order in localStorage for order confirmation
      const order = {
        id: orderId,
        customerInfo: formData,
        items: cart.items.map(item => ({
          product: {
            id: item.product.id,
            slug: item.product.slug,
            title: item.product.title,
            price: item.product.price,
            currency: item.product.currency,
            category: item.product.category,
            digitalFile: item.product.digitalFile,
          },
          quantity: item.quantity,
        })),
        total: cart.total,
        currency: 'USD',
        status: 'completed' as const,
        createdAt: new Date().toISOString(),
      }

      try {
        localStorage.setItem('last_order', JSON.stringify(order))
      } catch (storageError) {
        console.error('Error saving order to localStorage:', storageError)
        setError('Error saving order. Please try again.')
        setStatus('error')
        return
      }

      // Clear cart
      clearCart()

      // Redirect to confirmation
      router.push(`/checkout/confirmation?orderId=${encodeURIComponent(orderId)}`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setStatus('error')
      console.error('Checkout error:', err)
    }
  }

  if (cart.items.length === 0) {
    return null // Will redirect
  }

  const digitalProducts = cart.items.filter(item => item.product.category === 'digital')
  const physicalProducts = cart.items.filter(item => item.product.category !== 'digital')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/cart"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Cart
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Customer Information</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input focus-ring"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input focus-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input focus-ring"
                    />
                  </div>
                </div>

                 {physicalProducts.length > 0 && (
                   <>
                     <div>
                       <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                         Country
                       </label>
                       <select
                         id="country"
                         name="country"
                         value={formData.country}
                         onChange={handleInputChange}
                         className="input focus-ring"
                       >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="GE">Georgia</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                         value={formData.address}
                         onChange={handleInputChange}
                         className="input focus-ring"
                         placeholder="123 Main St"
                       />
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                       <div className="sm:col-span-2">
                         <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                           City
                         </label>
                         <input
                           type="text"
                           id="city"
                           name="city"
                           value={formData.city}
                           onChange={handleInputChange}
                           className="input focus-ring"
                         />
                       </div>
                       <div>
                         <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                           ZIP / Postal Code
                         </label>
                         <input
                           type="text"
                           id="zipCode"
                           name="zipCode"
                           value={formData.zipCode}
                           onChange={handleInputChange}
                           className="input focus-ring"
                         />
                       </div>
                     </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Payment processing integration is in progress. For now, this is a demo checkout flow.
                  In production, this will integrate with FanBasis or PayPal.
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <ShoppingBagIcon className="h-6 w-6 text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 line-clamp-2">{item.product.title}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {digitalProducts.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-800 text-sm font-medium">
                    ⚡ {digitalProducts.length} digital {digitalProducts.length === 1 ? 'product' : 'products'} - instant download after purchase!
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(cart.total, 'USD')}
                  </span>
                </div>
              </div>

               <button
                 type="submit"
                 disabled={status === 'loading'}
                 className={`w-full mt-6 px-6 py-4 bg-primary-600 text-white font-bold text-lg rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-ring ${
                   status === 'loading' ? 'cursor-wait' : ''
                 }`}
               >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Complete Purchase'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing your purchase, you agree to our terms of service.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
