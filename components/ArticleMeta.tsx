import { ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { Article } from '@/lib/articles'
import { getReadingTime, formatCategoryName, getCategoryColors } from '@/lib/article-utils'

interface ArticleMetaProps {
  article: Article
  showCategory?: boolean
}

export default function ArticleMeta({ article, showCategory = true }: ArticleMetaProps) {
  const readingTime = getReadingTime(article.wordCount)
  const colors = getCategoryColors(article.category)

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
      {showCategory && (
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 ${colors.bg} ${colors.text} font-semibold rounded-full border ${colors.border}`}>
          <AcademicCapIcon className="h-4 w-4" />
          {formatCategoryName(article.category)}
        </span>
      )}
      <span className="flex items-center gap-1">
        <ClockIcon className="h-4 w-4" />
        {readingTime} min read
      </span>
      <span>{article.wordCount.toLocaleString()} words</span>
      {article.length && (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          {article.length.charAt(0).toUpperCase() + article.length.slice(1)} form
        </span>
      )}
    </div>
  )
}

