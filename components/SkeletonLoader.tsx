export function SkeletonCard() {
  return (
    <div className="animate-pulse perspective-container">
      <div className="bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200"></div>
        
        <div className="p-6">
          {/* Category skeleton */}
          <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
          
          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded animate-pulse ${i === lines - 1 ? 'w-5/6' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function SkeletonButton() {
  return (
    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
  )
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

