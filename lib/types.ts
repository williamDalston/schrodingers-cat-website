/**
 * Shared types for Schrödinger's Cat website
 */

// Newsletter types
export type NewsletterSubscription = {
  id?: string
  email: string
  name?: string | null
  subscribed_at: string
  confirmed: boolean
  unsubscribed_at?: string | null
}

// Puzzle types
export type PuzzleCompletion = {
  id?: string
  email: string
  puzzle_id: string
  completed_at: string
  score?: number | null
  time_taken?: number | null
  metadata?: Record<string, any> | null
}

// User progress types
export type UserProgress = {
  id?: string
  email: string
  curiosities_read: number
  puzzles_completed: number
  last_activity: string
  total_points?: number | null
  achievements?: Record<string, any> | null
}

// Analytics types
export type AnalyticsEvent = {
  id?: string
  event_type: string
  event_data?: Record<string, any> | null
  user_email?: string | null
  session_id?: string | null
  page_path?: string | null
  user_agent?: string | null
  ip_address?: string | null
  created_at: string
}

// API response types
export type APIResponse<T> = {
  success: boolean
  message?: string
  error?: string
  data?: T
  count?: number
}

// Product types (for future shop implementation)
export type ProductCategory = 'poster' | 'digital' | 'stationery' | 'course'

export type Product = {
  id: string
  slug: string
  title: string
  description: string
  longDescription?: string
  price: number
  currency: string
  category: ProductCategory
  imageUrl: string
  imageGallery?: string[]
  digitalFile?: string
  relatedContent?: string[]
  relatedContentSlugs?: string[]
  inStock?: boolean
  createdAt: Date
}

// Cart types
export type CartItem = {
  product: Product
  quantity: number
}

export type Cart = {
  items: CartItem[]
  total: number
  itemCount: number
}

// Form status types
export type FormStatus = 'idle' | 'loading' | 'success' | 'error'
