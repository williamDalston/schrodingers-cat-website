'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BookOpenIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { quantumConsciousnessArticles, seriesIntroduction, ArticleCategory } from '@/lib/articles'
import {
  generateArticleSlug,
  getReadingTime,
  formatCategoryName,
  getCategoryColors,
  getPublishedArticles,
} from '@/lib/article-utils'

const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all')
  
  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    let filtered = allArticles

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.angle.toLowerCase().includes(query) ||
        article.seoKeywords.some(keyword => keyword.toLowerCase().includes(query))
      )
    }

    // Sort by priority (1 = highest), then by title
    return filtered.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority
      return a.title.localeCompare(b.title)
    })
  }, [searchQuery, selectedCategory])

  const categories: ArticleCategory[] = ['primer', 'theory', 'critique', 'experiment', 'opinion']
  
  const publishedCount = getPublishedArticles().length
  const totalCount = allArticles.length

  return (
    <div className="min-h-screen gradient-mesh">
      <div className="container-spacing section-spacing">
        <Link
          href="/"
          className="link-primary inline-flex items-center mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-5 gradient-primary rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <BookOpenIcon className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Quantum Consciousness Series
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4 font-light">
            A deep dive into how quantum mechanics intersects with consciousness. Based on insights from philosopher Kelvin McQueen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <span className="badge-info">{publishedCount} Published</span>
            <span className="text-gray-400">•</span>
            <span className="badge">{totalCount} Total Articles</span>
            <span className="text-gray-400">•</span>
            <span className="badge">~54,000 Words</span>
          </div>
        </header>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-4 focus-ring"
              aria-label="Search articles"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FunnelIcon className="h-5 w-5" />
              <span className="font-medium">Filter:</span>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => {
              const colors = getCategoryColors(category)
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all focus-ring ${
                    selectedCategory === category
                      ? `${colors.bg} ${colors.text} border-2 ${colors.border} shadow-md scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary-300'
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {formatCategoryName(category)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedCategory !== 'all' && ` in ${formatCategoryName(selectedCategory)}`}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article, index) => {
              const colors = getCategoryColors(article.category)
              const slug = generateArticleSlug(article.title)
              const readingTime = getReadingTime(article.wordCount)

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card-hover p-6 md:p-8 relative overflow-hidden group"
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/50 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-block px-3 py-1.5 ${colors.bg} ${colors.text} text-sm font-semibold rounded-full border ${colors.border}`}>
                        {formatCategoryName(article.category)}
                      </span>
                      {article.status === 'published' && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Published
                        </span>
                      )}
                      {article.status === 'draft' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Draft
                        </span>
                      )}
                      {article.status === 'planned' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                          Planned
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.status === 'published' ? (
                        <Link href={`/articles/${slug}`} className="hover:underline">
                          {article.title}
                        </Link>
                      ) : (
                        article.title
                      )}
                    </h2>

                    {/* Angle/Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {article.angle}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {readingTime} min read
                      </span>
                      <span>{article.wordCount.toLocaleString()} words</span>
                      {article.priority === 1 && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          Priority
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    {article.status === 'published' ? (
                      <Link
                        href={`/articles/${slug}`}
                        className="link-primary inline-flex items-center font-semibold hover:gap-2 transition-all group/link focus-ring rounded-lg px-2 py-1 -ml-2"
                      >
                        Read Article
                        <svg
                          className="ml-1 h-5 w-5 group-hover/link:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="text-sm text-gray-400 italic">
                        Coming soon
                      </div>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Series Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-10 border border-primary-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Series</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This comprehensive series explores how quantum mechanics intersects with consciousness, 
            based on insights from philosopher <strong>Kelvin McQueen</strong> (Chapman University). 
            From foundational primers to deep theoretical dives, critiques, and testable predictions, 
            we cover the full spectrum of quantum consciousness research.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Series Timeline:</strong> ~3 months (1 article/week) • <strong>Total Content:</strong> ~54,000 words
          </p>
        </motion.div>
      </div>
    </div>
  )
}

