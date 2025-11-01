import { describe, it, expect } from 'vitest'
import {
  generateArticleSlug,
  getArticleBySlug,
  getPublishedArticles,
  getReadingTime,
} from '../article-utils'

describe('article-utils', () => {
  describe('generateArticleSlug', () => {
    it('converts titles to lowercase slugs', () => {
      expect(generateArticleSlug('Hello World')).toBe('hello-world')
    })

    it('handles special characters', () => {
      expect(generateArticleSlug("Why Quantum Mechanics Might Explain Your Thoughts")).toBe('why-quantum-mechanics-might-explain-your-thoughts')
      expect(generateArticleSlug("Wigner's Friend Paradox")).toBe("wigner-s-friend-paradox")
    })

    it('removes leading/trailing hyphens', () => {
      expect(generateArticleSlug('-Hello World-')).toBe('hello-world')
    })

    it('handles multiple spaces and special chars', () => {
      expect(generateArticleSlug('Hello   World!!!')).toBe('hello-world')
    })
  })

  describe('getReadingTime', () => {
    it('calculates reading time correctly', () => {
      expect(getReadingTime(1500)).toBe(7) // 1500 / 225 ≈ 6.67 → 7
      expect(getReadingTime(2500)).toBe(12) // 2500 / 225 ≈ 11.11 → 12
      expect(getReadingTime(3500)).toBe(16) // 3500 / 225 ≈ 15.56 → 16
    })

    it('rounds up correctly', () => {
      expect(getReadingTime(100)).toBe(1) // 100 / 225 = 0.44 → 1
      expect(getReadingTime(225)).toBe(1) // Exactly 225
      expect(getReadingTime(226)).toBe(2) // Just over
    })

    it('handles zero and small numbers', () => {
      expect(getReadingTime(0)).toBe(0)
      expect(getReadingTime(1)).toBe(1)
    })
  })

  describe('getPublishedArticles', () => {
    it('returns only published articles', () => {
      const published = getPublishedArticles()
      expect(published.length).toBeGreaterThan(0)
      published.forEach(article => {
        expect(article.status).toBe('published')
      })
    })

    it('includes series introduction', () => {
      const published = getPublishedArticles()
      const hasIntroduction = published.some(a => a.id === 'qc-series-000')
      expect(hasIntroduction).toBe(true)
    })
  })

  describe('getArticleBySlug', () => {
    it('finds articles by their slug', () => {
      const article = getArticleBySlug('why-quantum-mechanics-might-explain-your-thoughts')
      expect(article).toBeDefined()
      expect(article?.title).toContain('Quantum Mechanics')
    })

    it('returns undefined for non-existent slugs', () => {
      const article = getArticleBySlug('non-existent-article-slug-xyz')
      expect(article).toBeUndefined()
    })
  })
})

