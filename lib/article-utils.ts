import { Article, quantumConsciousnessArticles, seriesIntroduction } from './articles'

/**
 * Generate a URL-friendly slug from article title
 */
export function generateArticleSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
  return allArticles.find(article => generateArticleSlug(article.title) === slug)
}

/**
 * Get all published articles
 */
export function getPublishedArticles(): Article[] {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
  return allArticles.filter(article => article.status === 'published')
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category?: Article['category']): Article[] {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
  if (!category) return allArticles
  return allArticles.filter(article => article.category === category)
}

/**
 * Get related articles (same category, excluding current article)
 */
export function getRelatedArticles(currentArticleId: string, limit: number = 3): Article[] {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
  const currentArticle = allArticles.find(a => a.id === currentArticleId)
  if (!currentArticle) return []

  return allArticles
    .filter(article => 
      article.id !== currentArticleId && 
      article.status !== 'planned' &&
      (article.category === currentArticle.category || 
       article.relatedParadoxes?.some(p => currentArticle.relatedParadoxes?.includes(p)))
    )
    .slice(0, limit)
}

/**
 * Get next/previous articles in series (by priority)
 */
export function getSeriesNavigation(currentArticleId: string): {
  previous: Article | undefined
  next: Article | undefined
} {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
    .filter(a => a.status !== 'planned')
    .sort((a, b) => a.priority - b.priority)
  
  const currentIndex = allArticles.findIndex(a => a.id === currentArticleId)
  
  return {
    previous: currentIndex > 0 ? allArticles[currentIndex - 1] : undefined,
    next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined,
  }
}

/**
 * Calculate reading time from word count
 */
export function getReadingTime(wordCount: number): number {
  // Average reading speed: 200-250 words per minute
  return Math.ceil(wordCount / 225)
}

/**
 * Format category name for display
 */
export function formatCategoryName(category: Article['category']): string {
  const names: Record<Article['category'], string> = {
    primer: 'Primer',
    theory: 'Theory Deep Dive',
    critique: 'Critique & Challenge',
    experiment: 'Experiment & Prediction',
    opinion: 'Opinion & Roundup',
  }
  return names[category]
}

/**
 * Get category color scheme
 */
export function getCategoryColors(category: Article['category']): {
  bg: string
  text: string
  border: string
} {
  const colors: Record<Article['category'], { bg: string; text: string; border: string }> = {
    primer: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    theory: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    critique: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
    },
    experiment: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    opinion: {
      bg: 'bg-pink-50',
      text: 'text-pink-700',
      border: 'border-pink-200',
    },
  }
  return colors[category]
}

