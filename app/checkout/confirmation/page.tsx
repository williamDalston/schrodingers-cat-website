'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, ShoppingBagIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/products'

interface Order {
  id: string
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    country?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
  }
  items: Array<{
    product: {
      id: string
      slug: string
      title: string
      price: number
      currency: string
      category: string
      digitalFile?: string
    }
    quantity: number
  }>
  total: number
  currency: string
  status: string
  createdAt: string
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!orderId) {
      // Try to load from localStorage
      const lastOrder = localStorage.getItem('last_order')
      if (lastOrder) {
        try {
          setOrder(JSON.parse(lastOrder))
        } catch (err) {
          router.push('/shop')
        }
      } else {
        router.push('/shop')
      }
    } else {
      // In production, fetch order from API using orderId
      const lastOrder = localStorage.getItem('last_order')
      if (lastOrder) {
        try {
          const parsedOrder = JSON.parse(lastOrder)
          if (parsedOrder.id === orderId) {
            setOrder(parsedOrder)
          } else {
            router.push('/shop')
          }
        } catch (err) {
          router.push('/shop')
        }
      } else {
        router.push('/shop')
      }
    }
  }, [orderId, router])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  const digitalProducts = order.items.filter(item => item.product.category === 'digital')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your order has been confirmed.
          </p>
          <p className="text-gray-500">
            Order ID: <span className="font-mono font-semibold">{order.id}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>

          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Customer Information</h3>
              <div className="text-gray-900">
                <p className="font-medium">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                <p className="text-gray-600">{order.customerInfo.email}</p>
                {order.customerInfo.address && (
                  <div className="mt-2 text-gray-600">
                    <p>{order.customerInfo.address}</p>
                    {order.customerInfo.city && (
                      <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
                    )}
                    {order.customerInfo.country && <p>{order.customerInfo.country}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <ShoppingBagIcon className="h-8 w-8 text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.product.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </p>
                      {item.product.digitalFile && (
                        <a
                          href={item.product.digitalFile}
                          download
                          onClick={() => {
                            // Track download (in production, this would be more robust)
                            if (typeof window !== 'undefined') {
                              console.log('Download started:', item.product.title)
                            }
                          }}
                          className="inline-flex items-center gap-2 mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          Download Now
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-300">
              <span className="text-xl font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(order.total, order.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Digital Products Download */}
        {digitalProducts.length > 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <ArrowDownTrayIcon className="h-6 w-6" />
              Download Your Digital Products
            </h2>
            <p className="text-green-800 mb-4">
              Your digital products are ready for download. Click the links below to download each file.
            </p>
            <div className="space-y-2">
              {digitalProducts.map((item) => (
                <a
                  key={item.product.id}
                  href={item.product.digitalFile || '#'}
                  download
                  onClick={() => {
                    // Track download
                    if (typeof window !== 'undefined') {
                      console.log('Download started:', item.product.title, 'Order:', order.id)
                    }
                  }}
                  className="block w-full px-6 py-3 bg-white border-2 border-green-300 rounded-lg hover:bg-green-100 transition-colors text-green-900 font-semibold"
                >
                  Download {item.product.title}
                </a>
              ))}
            </div>
            <p className="text-sm text-green-700 mt-4">
              💡 Tip: You can also access your downloads anytime from your account page.
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-primary-900 mb-3">What&apos;s Next?</h3>
          <ul className="space-y-2 text-primary-800">
            <li>• A confirmation email has been sent to {order.customerInfo.email}</li>
            {digitalProducts.length > 0 && (
              <li>• Download your digital products using the links above</li>
            )}
            <li>• Track your order status in your account dashboard</li>
            <li>• Explore more content and products in our shop</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="flex-1 px-6 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 text-center transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}

