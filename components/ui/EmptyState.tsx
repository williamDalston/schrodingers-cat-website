'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl border border-gray-200 p-12 shadow-lg text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
        className="inline-flex p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full mb-6"
      >
        {icon}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 mb-4"
      >
        {title}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
      
      {(action || secondaryAction) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {action && (
            <Link
              href={action.href}
              className={`group inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg transition-all duration-200 ${
                action.variant === 'secondary'
                  ? 'bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:shadow-md transform hover:-translate-y-0.5'
                  : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {action.label}
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </Link>
          )}
          
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {secondaryAction.label}
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

