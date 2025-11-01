import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import ShareButtons from '@/components/ShareButtons'
import ArticleQuote from '@/components/ArticleQuote'
import ArticleMeta from '@/components/ArticleMeta'
import SeriesNavigation from '@/components/SeriesNavigation'
import ArticleTracker from '@/components/ArticleTracker'
import { getArticleBySlug, generateArticleSlug, getSeriesNavigation, getRelatedArticles, getPublishedArticles } from '@/lib/article-utils'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const publishedArticles = getPublishedArticles()
  return publishedArticles.map((article) => ({
    slug: generateArticleSlug(article.title),
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | Quantum Consciousness Series`,
    description: article.angle,
    keywords: article.seoKeywords.join(', '),
    openGraph: {
      title: article.title,
      description: article.angle,
      type: 'article',
      images: [
        {
          url: `/articles/${params.slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.angle,
      images: [`/articles/${params.slug}-og.jpg`],
    },
  }
}

function loadArticleContent(articleId: string): string | null {
  try {
    const contentPath = join(process.cwd(), 'content', 'articles', `${articleId}.md`)
    const content = readFileSync(contentPath, 'utf-8')
    return content
  } catch (error) {
    // Content file doesn't exist yet
    return null
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article || article.status === 'planned') {
    notFound()
  }

  const articleContent = loadArticleContent(article.id)
  const { previous, next } = getSeriesNavigation(article.id)
  const relatedArticles = getRelatedArticles(article.id, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.angle,
    image: `https://yourdomain.com/articles/${params.slug}-og.jpg`,
    datePublished: article.status === 'published' ? new Date().toISOString() : undefined,
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: "Schrödinger's Cat",
    },
    publisher: {
      '@type': 'Organization',
      name: "Schrödinger's Cat",
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png',
      },
    },
    articleSection: 'Quantum Consciousness',
    keywords: article.seoKeywords,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://yourdomain.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://yourdomain.com/articles/${params.slug}`,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <ArticleTracker articleId={article.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/articles"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <ArticleMeta article={article} />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {article.angle && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              {article.angle}
            </p>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500">Share this article:</p>
            <ShareButtons 
              title={article.title}
              description={article.angle}
            />
          </div>
        </div>

        {/* Main Content */}
        <article className="prose prose-lg md:prose-xl max-w-none bg-white rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
          {/* Article Status Banner for Drafts */}
          {article.status === 'draft' && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ This article is still in draft form. Content may be incomplete.
              </p>
            </div>
          )}

          {/* Article Content */}
          {articleContent ? (
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {articleContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center py-16 text-gray-500">
                <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Article Content</p>
                <p className="text-sm">
                  This article is ready to be written! Use the information below as your guide.
                </p>
              </div>
            </div>
          )}

            {/* Show metadata sections only if no content is available */}
            {!articleContent && (
              <>
                {/* Transcript Hooks Section */}
                {article.transcriptHooks && article.transcriptHooks.length > 0 && (
                  <section className="my-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights from McQueen Interview</h2>
                    <div className="space-y-4">
                      {article.transcriptHooks.map((hook, index) => (
                        <ArticleQuote 
                          key={index}
                          quote={hook}
                          author="Kelvin McQueen"
                          citation="Quantum Consciousness Interview"
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Why It Works Section */}
                <section className="my-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Article Works</h3>
                  <p className="text-gray-700 leading-relaxed">{article.whyItWorks}</p>
                </section>

                {/* SEO Keywords */}
                <section className="my-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">SEO Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.seoKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Visual Suggestions */}
                {article.visuals && article.visuals.length > 0 && (
                  <section className="my-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Suggested Visuals</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {article.visuals.map((visual, index) => (
                        <li key={index}>{visual}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}

            {/* Related Paradoxes - Show for all articles */}
            {article.relatedParadoxes && article.relatedParadoxes.length > 0 && (
              <section className="my-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Paradoxes</h3>
                <ul className="space-y-2">
                  {article.relatedParadoxes.map((paradoxSlug, index) => (
                    <li key={index}>
                      <Link
                        href={`/paradoxes/${paradoxSlug}`}
                        className="text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        View {paradoxSlug.replace(/-/g, ' ')} paradox →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
        </article>

        {/* Series Navigation */}
        {(previous || next) && (
          <SeriesNavigation previous={previous} next={next} />
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((related) => {
                const relatedSlug = generateArticleSlug(related.title)
                return (
                  <Link
                    key={related.id}
                    href={`/articles/${relatedSlug}`}
                    className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{related.angle}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Quantum Consciousness Content?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified when new articles in this series are published.
          </p>
          <Link
            href="/newsletter"
            className="inline-block px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Subscribe Free
          </Link>
        </div>
      </div>
    </div>
  )
}

