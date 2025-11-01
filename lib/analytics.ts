/**
 * Analytics utility for tracking custom events
 */

// Define event types
export type AnalyticsEvent =
  | 'newsletter_signup'
  | 'puzzle_completed'
  | 'curiosity_read'
  | 'product_view'
  | 'product_purchase'
  | 'share'
  | 'external_link_click'

// Event parameters interface
export interface EventParams {
  event_category?: string
  event_label?: string
  value?: number
  [key: string]: any
}

/**
 * Track a custom analytics event
 */
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams): void {
  // Only track in browser environment
  if (typeof window === 'undefined') return

  // Track with Google Analytics if available
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: params?.event_category || 'user_interaction',
      event_label: params?.event_label,
      value: params?.value,
      ...params,
    })
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, params)
  }
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(_email: string): void {
  trackEvent('newsletter_signup', {
    event_category: 'engagement',
    event_label: 'newsletter_subscription',
  })
}

/**
 * Track puzzle completion
 */
export function trackPuzzleCompletion(puzzleId: string, score?: number, timeTaken?: number): void {
  trackEvent('puzzle_completed', {
    event_category: 'engagement',
    event_label: puzzleId,
    value: score,
    time_taken: timeTaken,
  })
}

/**
 * Track curiosity article read
 */
export function trackCuriosityRead(curiosityId: string): void {
  trackEvent('curiosity_read', {
    event_category: 'engagement',
    event_label: curiosityId,
  })
}

/**
 * Track product view
 */
export function trackProductView(productId: string, productName: string): void {
  trackEvent('product_view', {
    event_category: 'ecommerce',
    event_label: productName,
    product_id: productId,
  })
}

/**
 * Track product purchase
 */
export function trackProductPurchase(productId: string, productName: string, price: number): void {
  trackEvent('product_purchase', {
    event_category: 'ecommerce',
    event_label: productName,
    value: price,
    product_id: productId,
  })
}

/**
 * Track share action
 */
export function trackShare(platform: string, contentUrl: string): void {
  trackEvent('share', {
    event_category: 'social',
    event_label: platform,
    content_url: contentUrl,
  })
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, linkText: string): void {
  trackEvent('external_link_click', {
    event_category: 'navigation',
    event_label: linkText,
    destination_url: url,
  })
}

