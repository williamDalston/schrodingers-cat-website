interface ArticleQuoteProps {
  quote: string
  author?: string
  citation?: string
}

export default function ArticleQuote({ quote, author, citation }: ArticleQuoteProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-600 p-6 md:p-8 rounded-r-lg my-8 md:my-10">
      <blockquote className="text-gray-800 italic text-lg md:text-xl font-medium leading-relaxed mb-4">
        &quot;{quote}&quot;
      </blockquote>
      {(author || citation) && (
        <div className="text-sm text-gray-600">
          {author && <span className="font-semibold">{author}</span>}
          {author && citation && <span> — </span>}
          {citation && <span className="italic">{citation}</span>}
        </div>
      )}
    </div>
  )
}

