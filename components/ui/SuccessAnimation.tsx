'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface SuccessAnimationProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SuccessAnimation({ message, size = 'md' }: SuccessAnimationProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="relative"
      >
        {/* Ripple effect */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full bg-green-500"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
            style={{ borderRadius: '50%' }}
          />
        ))}
        
        {/* Checkmark icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className={`${sizeClasses[size]} relative z-10 text-green-500`}
        >
          <CheckCircleIcon className="w-full h-full" />
        </motion.div>
      </motion.div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg font-semibold text-green-600"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

