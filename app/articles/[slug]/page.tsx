import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
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
      <Suspense fallback={null}>
        <ArticleTracker articleId={article.id} />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-4xl mx-auto container-spacing section-spacing">
        <Link
          href="/articles"
          className="link-primary inline-flex items-center mb-8 group focus-ring rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Header */}
        <header className="mb-12">
          <ArticleMeta article={article} />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>

          {article.angle && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              {article.angle}
            </p>
          )}

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500">Share this article:</p>
            <ShareButtons 
              title={article.title}
              description={article.angle}
            />
          </div>
        </header>

        {/* Main Content */}
        <article className="prose prose-lg md:prose-xl max-w-none card p-8 md:p-10 mb-8 shadow-sm">
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
            <div className="prose prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-24 prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-12 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:pt-2 prose-h2:leading-tight
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:leading-snug
              prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:leading-snug
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-all prose-a:rounded focus-ring
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:my-3 prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm
              prose-code:text-primary-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-800
              prose-img:rounded-xl prose-img:shadow-xl prose-img:my-10 prose-img:w-full prose-img:h-auto
              prose-hr:border-gray-300 prose-hr:my-10
              prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
              prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-gray-900
              prose-td:border prose-td:border-gray-300 prose-td:p-4 prose-td:text-gray-700">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => (
                    <img 
                      {...props} 
                      className="rounded-xl shadow-lg my-8 w-full"
                      loading="lazy"
                      alt={props.alt || 'Article image'}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a 
                      {...props} 
                      className="text-primary-600 no-underline hover:underline font-medium"
                      target={props.href?.startsWith('http') ? '_blank' : undefined}
                      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    />
                  ),
                  code: ({ node, inline, className, children, ...props }: any) => {
                    return !inline ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="text-primary-700 bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
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

