'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, LightBulbIcon, FireIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid, LightBulbIcon as LightBulbSolid, FireIcon as FireSolid } from '@heroicons/react/24/solid'

interface Reaction {
  id: string
  icon: typeof HeartIcon
  iconSolid: typeof HeartSolid
  label: string
  color: string
  hoverColor: string
}

const reactions: Reaction[] = [
  {
    id: 'love',
    icon: HeartIcon,
    iconSolid: HeartSolid,
    label: 'Love It',
    color: 'text-red-400',
    hoverColor: 'hover:text-red-500 hover:bg-red-50',
  },
  {
    id: 'mind-blown',
    icon: LightBulbIcon,
    iconSolid: LightBulbSolid,
    label: 'Mind-Blown',
    color: 'text-yellow-400',
    hoverColor: 'hover:text-yellow-500 hover:bg-yellow-50',
  },
  {
    id: 'fascinating',
    icon: FireIcon,
    iconSolid: FireSolid,
    label: 'Fascinating',
    color: 'text-orange-400',
    hoverColor: 'hover:text-orange-500 hover:bg-orange-50',
  },
]

interface ReactionButtonsProps {
  contentId: string
  contentType: 'paradox' | 'curiosity' | 'article'
}

export default function ReactionButtons({ contentId, contentType }: ReactionButtonsProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [showThanks, setShowThanks] = useState(false)
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({
    love: Math.floor(Math.random() * 50) + 10,
    'mind-blown': Math.floor(Math.random() * 40) + 5,
    fascinating: Math.floor(Math.random() * 35) + 8,
  })

  const handleReaction = (reactionId: string) => {
    const wasSelected = selectedReaction === reactionId
    
    if (wasSelected) {
      setSelectedReaction(null)
      setReactionCounts(prev => ({
        ...prev,
        [reactionId]: Math.max(0, (prev[reactionId] || 0) - 1),
      }))
    } else {
      if (selectedReaction) {
        // Decrease previous selection
        setReactionCounts(prev => ({
          ...prev,
          [selectedReaction]: Math.max(0, (prev[selectedReaction] || 0) - 1),
        }))
      }
      setSelectedReaction(reactionId)
      setReactionCounts(prev => ({
        ...prev,
        [reactionId]: (prev[reactionId] || 0) + 1,
      }))
      setShowThanks(true)
      setTimeout(() => setShowThanks(false), 2000)
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      const key = `${contentType}-${contentId}-reaction`
      localStorage.setItem(key, wasSelected ? '' : reactionId)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3 flex-wrap">
        {reactions.map((reaction) => {
          const isSelected = selectedReaction === reaction.id
          const Icon = isSelected ? reaction.iconSolid : reaction.icon
          
          return (
            <motion.button
              key={reaction.id}
              onClick={() => handleReaction(reaction.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 focus-ring
                ${isSelected 
                  ? `${reaction.color.replace('text-', 'bg-').replace('-400', '-50')} border-current ${reaction.color}` 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }
                ${reaction.hoverColor}
              `}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${reaction.label} reaction`}
            >
              <motion.div
                animate={isSelected ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className={`h-5 w-5 ${isSelected ? 'fill-current' : ''}`} />
              </motion.div>
              <span className="text-sm font-medium">{reactionCounts[reaction.id]}</span>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute top-full left-0 mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
          >
            Thanks for your reaction! ✨
            <div className="absolute -top-1 left-6 w-2 h-2 bg-gray-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

