'use client'

import { motion } from 'framer-motion'
import { 
  ShareIcon, 
  ClipboardDocumentIcon, 
  CheckIcon 
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface ShareButtonsProps {
  url?: string
  title: string
  description?: string
  variant?: 'horizontal' | 'vertical' | 'compact'
}

export default function ShareButtons({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title,
  description = '',
  variant = 'horizontal'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${description}\n\n${currentUrl}`)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  const variants = {
    horizontal: 'flex flex-row gap-3',
    vertical: 'flex flex-col gap-3',
    compact: 'flex flex-row gap-2'
  }

  const buttonVariants = {
    horizontal: 'px-6 py-3',
    vertical: 'px-6 py-3 w-full',
    compact: 'px-4 py-2'
  }

  const iconVariants = {
    horizontal: 'h-5 w-5',
    vertical: 'h-5 w-5',
    compact: 'h-4 w-4'
  }

  const textVariants = {
    horizontal: 'text-base',
    vertical: 'text-base',
    compact: 'text-sm'
  }

  return (
    <div className={`share-buttons ${variants[variant]}`}>
      {/* Twitter/X */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare('twitter')}
        className={`${buttonVariants[variant]} bg-white border-2 border-gray-300 rounded-lg flex items-center gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md`}
        aria-label="Share on X (Twitter)"
      >
        <svg className={`${iconVariants[variant]} text-blue-600`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        {variant !== 'compact' && (
          <span className={`font-semibold ${textVariants[variant]} text-gray-700`}>Tweet</span>
        )}
      </motion.button>

      {/* LinkedIn */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare('linkedin')}
        className={`${buttonVariants[variant]} bg-white border-2 border-gray-300 rounded-lg flex items-center gap-2 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md`}
        aria-label="Share on LinkedIn"
      >
        <svg className={`${iconVariants[variant]} text-blue-700`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        {variant !== 'compact' && (
          <span className={`font-semibold ${textVariants[variant]} text-gray-700`}>LinkedIn</span>
        )}
      </motion.button>

      {/* Reddit */}
      {variant !== 'compact' && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare('reddit')}
          className={`${buttonVariants[variant]} bg-white border-2 border-gray-300 rounded-lg flex items-center gap-2 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 shadow-sm hover:shadow-md`}
          aria-label="Share on Reddit"
        >
          <svg className={`${iconVariants[variant]} text-orange-600`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
          <span className={`font-semibold text-base text-gray-700`}>Reddit</span>
        </motion.button>
      )}

      {/* Email */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleShare('email')}
        className={`${buttonVariants[variant]} bg-white border-2 border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md`}
        aria-label="Share via Email"
      >
        <svg className={`${iconVariants[variant]} text-gray-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {variant !== 'compact' && (
          <span className={`font-semibold ${textVariants[variant]} text-gray-700`}>Email</span>
        )}
      </motion.button>

      {/* Copy Link */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className={`${buttonVariants[variant]} bg-white border-2 border-gray-300 rounded-lg flex items-center gap-2 hover:border-green-500 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md ${
          copied ? 'border-green-500 bg-green-50' : ''
        }`}
        aria-label="Copy link"
      >
        {copied ? (
          <CheckIcon className={`${iconVariants[variant]} text-green-600`} />
        ) : (
          <ClipboardDocumentIcon className={`${iconVariants[variant]} text-gray-700`} />
        )}
        {variant !== 'compact' && (
          <span className={`font-semibold ${textVariants[variant]} ${copied ? 'text-green-600' : 'text-gray-700'}`}>
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        )}
      </motion.button>

      {/* Native Share (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && variant === 'horizontal' && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={async () => {
            try {
              await navigator.share({
                title,
                text: description,
                url: currentUrl,
              })
            } catch (err) {
              // User cancelled or error occurred
            }
          }}
          className={`${buttonVariants[variant]} bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-all duration-200 shadow-md`}
          aria-label="Share"
        >
          <ShareIcon className={`${iconVariants[variant]}`} />
          <span className="font-semibold text-base">Share</span>
        </motion.button>
      )}
    </div>
  )
}

