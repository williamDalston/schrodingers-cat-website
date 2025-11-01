'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsExpanded(false)
    }
  }
  
  // Show scroll-to-top button only when scrolled down
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id="fab-menu"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 space-y-3"
            role="menu"
            aria-label="Quick actions menu"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/curiosity"
                className="flex items-center gap-3 bg-white shadow-lg rounded-full px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors focus-ring"
                aria-label="Daily Curiosity"
              >
                <QuestionMarkCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Daily Curiosity</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/puzzles"
                className="flex items-center gap-3 bg-white shadow-lg rounded-full px-4 py-3 text-gray-700 hover:text-primary-600 transition-colors focus-ring"
                aria-label="Weekly Puzzles"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Weekly Puzzles</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (isExpanded) {
                scrollToTop()
              } else {
                setIsExpanded(true)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isExpanded) {
                setIsExpanded(false)
              }
            }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 rounded-full shadow-2xl focus-ring"
            aria-label={isExpanded ? 'Scroll to top' : 'Open quick actions'}
            aria-expanded={isExpanded}
            aria-controls="fab-menu"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpIcon className="h-6 w-6" aria-hidden="true" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

