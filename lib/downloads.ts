/**
 * Digital product download utilities
 * In production, this would integrate with a secure file storage system
 * and generate time-limited, signed URLs
 */

import { Product } from './types'

/**
 * Generate a secure download URL for a digital product
 * In production, this would:
 * 1. Verify the user has purchased the product
 * 2. Generate a signed, time-limited URL
 * 3. Track downloads for analytics
 */
export function getDownloadUrl(product: Product, _orderId?: string): string {
  // For now, return the digitalFile path directly
  // In production, this would call an API endpoint that:
  // - Verifies purchase
  // - Generates signed URL from S3/CloudFront/etc.
  // - Returns temporary download link
  
  if (!product.digitalFile) {
    throw new Error(`Product ${product.id} does not have a digital file`)
  }

  // If we have an orderId, we could verify it in production
  // For now, just return the file path
  return product.digitalFile
}

/**
 * Check if a user has access to download a product
 * In production, this would check against:
 * - Order history
 * - User account purchases
 * - Subscription status
 */
export function hasDownloadAccess(productId: string, _userEmail?: string): boolean {
  // For demo purposes, check localStorage for recent orders
  if (typeof window === 'undefined') return false

  try {
    const lastOrder = localStorage.getItem('last_order')
    if (lastOrder) {
      const order = JSON.parse(lastOrder)
      const hasProduct = order.items?.some(
        (item: { product: { id: string } }) => item.product.id === productId
      )
      return hasProduct
    }
  } catch (error) {
    console.error('Error checking download access:', error)
  }

  return false
}

/**
 * Track a download for analytics
 */
export function trackDownload(productId: string, orderId?: string) {
  // In production, send to analytics service
  console.log('Download tracked:', { productId, orderId, timestamp: new Date().toISOString() })
  
  // Could send to API endpoint for server-side tracking
  // fetch('/api/analytics/track', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     event_type: 'product_download',
  //     product_id: productId,
  //     order_id: orderId,
  //   }),
  // })
}

