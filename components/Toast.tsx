'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ 
  message, 
  type = 'success', 
  isVisible, 
  onClose,
  duration = 3000 
}: ToastProps) {
  // Auto-dismiss after duration
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isVisible, duration, onClose])

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className={`
            ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl
            flex items-center gap-3 backdrop-blur-sm
          `}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
            >
              <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
            </motion.div>
            <p className="flex-1 font-medium">{message}</p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close notification"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

