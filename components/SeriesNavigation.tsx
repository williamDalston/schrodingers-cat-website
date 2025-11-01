import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Article } from '@/lib/articles'
import { generateArticleSlug } from '@/lib/article-utils'

interface SeriesNavigationProps {
  previous?: Article
  next?: Article
}

export default function SeriesNavigation({ previous, next }: SeriesNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-6">
      {previous ? (
        <Link
          href={`/articles/${generateArticleSlug(previous.title)}`}
          className="group flex-1 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Article</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {previous.title}
          </h3>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/articles/${generateArticleSlug(next.title)}`}
          className="group flex-1 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-right"
        >
          <div className="flex items-center justify-end gap-3 text-sm text-gray-500 mb-2">
            <span>Next Article</span>
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {next.title}
          </h3>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}

