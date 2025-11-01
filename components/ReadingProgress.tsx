'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [readingTime, setReadingTime] = useState({ current: 0, total: 5 })

  useEffect(() => {
    // Calculate reading time based on content length (only once on mount)
    const content = document.querySelector('article, main')
    if (content) {
      const text = content.textContent || ''
      const wordsPerMinute = 200
      const total = Math.max(1, Math.ceil(text.split(/\s+/).length / wordsPerMinute))
      setReadingTime(prev => ({ ...prev, total }))
    }
  }, []) // Only run once on mount

  useEffect(() => {
    // Update current reading time based on scroll
    const updateReadingTime = () => {
      const progress = scrollYProgress.get()
      setReadingTime(prev => ({
        ...prev,
        current: Math.min(prev.total, Math.floor(progress * prev.total))
      }))
    }

    const unsubscribe = scrollYProgress.on('change', updateReadingTime)
    return () => unsubscribe()
  }, [scrollYProgress])

  const progressPercent = scrollYProgress.get() * 100

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progressPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 origin-left"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1 right-4 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.05 && scrollYProgress.get() < 0.95 ? 1 : 0 }}
        aria-hidden="true"
      >
        {readingTime.current} / {readingTime.total} min
      </motion.div>
    </div>
  )
}

