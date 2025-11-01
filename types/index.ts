// Shared type definitions for the application

export type NavLink = {
  href: string
  label: string
}

export type Product = {
  id: string
  title: string
  description: string
  price: number
  currency: string
  category: 'poster' | 'digital' | 'stationery' | 'course'
  imageUrl: string
  digitalFile?: string
  relatedContent?: string[]
  createdAt: Date
}

export type NewsletterSubscription = {
  email: string
  subscribedAt: Date
  confirmed: boolean
}

export type PuzzleCompletion = {
  puzzleId: string
  userId?: string
  completedAt: Date
  attempts: number
  solved: boolean
}

export type Paradox = {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: 'physics' | 'philosophy' | 'mathematics' | 'logic'
  relatedParadoxes?: string[]
  createdAt: Date
  updatedAt: Date
}

export type Curiosity = {
  id: string
  title: string
  content: string
  category: 'physics' | 'mathematics' | 'philosophy' | 'astronomy' | 'biology' | 'technology'
  publishedAt: Date
}

