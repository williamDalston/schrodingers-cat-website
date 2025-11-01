'use client'

import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group perspective-container"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Image skeleton with shimmer */}
        <div className="h-48 skeleton relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="p-6">
          {/* Category skeleton */}
          <div className="h-4 w-20 skeleton rounded-full mb-3"></div>
          
          {/* Title skeleton */}
          <div className="h-6 w-3/4 skeleton rounded-lg mb-3"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 skeleton rounded w-full"></div>
            <div className="h-4 skeleton rounded w-5/6"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 w-24 skeleton rounded-lg"></div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`h-4 skeleton rounded ${i === lines - 1 ? 'w-5/6' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function SkeletonButton() {
  return (
    <div className="h-10 w-32 skeleton rounded-lg"></div>
  )
}

export function SkeletonStatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
    >
      <div className="inline-flex p-4 skeleton rounded-full mb-4 w-16 h-16"></div>
      <div className="h-10 w-20 skeleton rounded-lg mb-2"></div>
      <div className="h-5 w-32 skeleton rounded"></div>
    </motion.div>
  )
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  )
}

export function SkeletonProgressPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="h-40 skeleton rounded-2xl"
      />
    </div>
  )
}

