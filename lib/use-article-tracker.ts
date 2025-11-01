'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Hook to track article views for progress tracking
 * Tracks when an article is viewed (minimum 30 seconds or scrolled to bottom)
 */
export function useArticleTracker(articleId: string) {
  const pathname = usePathname()

  useEffect(() => {
    // Only track if user is subscribed (has email in localStorage)
    const email = localStorage.getItem('newsletter_email')
    if (!email) return

    let startTime = Date.now()
    let hasScrolledToBottom = false
    let tracked = false

    const handleScroll = () => {
      if (hasScrolledToBottom) return

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Consider "read" if scrolled to within 100px of bottom
      if (scrollTop + windowHeight >= documentHeight - 100) {
        hasScrolledToBottom = true
        trackArticleRead()
      }
    }

    const trackArticleRead = () => {
      if (tracked) return

      const timeSpent = Date.now() - startTime
      const minReadTime = 30000 // 30 seconds minimum

      // Track if user spent at least 30 seconds OR scrolled to bottom
      if (timeSpent >= minReadTime || hasScrolledToBottom) {
        tracked = true

        // Store in localStorage to update progress later
        const readArticles = JSON.parse(
          localStorage.getItem('read_articles') || '[]'
        ) as string[]

        if (!readArticles.includes(articleId)) {
          readArticles.push(articleId)
          localStorage.setItem('read_articles', JSON.stringify(readArticles))

          // Optionally sync with backend (fire and forget)
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              // You can add articles_read field if your schema supports it
            }),
          }).catch(() => {
            // Silently fail - progress will sync on next page load
          })
        }
      }
    }

    // Track on scroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Track on minimum time spent (30 seconds)
    const timeTracker = setTimeout(() => {
      trackArticleRead()
    }, 30000)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeTracker)
    }
  }, [articleId, pathname])
}

