'use client'

import { useArticleTracker } from '@/lib/use-article-tracker'

interface ArticleTrackerProps {
  articleId: string
}

export default function ArticleTracker({ articleId }: ArticleTrackerProps) {
  useArticleTracker(articleId)
  return null // This component doesn't render anything
}

