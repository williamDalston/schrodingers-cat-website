import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  SkeletonCard,
  SkeletonText,
  SkeletonButton,
  SkeletonCardGrid,
} from '../ui/SkeletonLoader'

describe('SkeletonLoader components', () => {
  describe('SkeletonText', () => {
    it('renders multiple lines by default', () => {
      const { container } = render(<SkeletonText />)
      const lines = container.querySelectorAll('.space-y-2 > div')
      expect(lines).toHaveLength(3)
    })

    it('renders multiple lines when specified', () => {
      const { container } = render(<SkeletonText lines={5} />)
      const lines = container.querySelectorAll('.space-y-2 > div')
      expect(lines).toHaveLength(5)
    })
  })

  describe('SkeletonButton', () => {
    it('renders a skeleton button', () => {
      const { container } = render(<SkeletonButton />)
      const button = container.querySelector('div')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('h-10', 'w-32')
    })
  })

  describe('SkeletonCard', () => {
    it('renders a skeleton card with all elements', () => {
      const { container } = render(<SkeletonCard />)
      const card = container.querySelector('.perspective-container')
      expect(card).toBeInTheDocument()
      
      // Check for image skeleton
      const image = container.querySelector('.h-48')
      expect(image).toBeInTheDocument()
    })
  })

  describe('SkeletonCardGrid', () => {
    it('renders 3 cards by default', () => {
      const { container } = render(<SkeletonCardGrid />)
      const cards = container.querySelectorAll('.perspective-container')
      expect(cards).toHaveLength(3)
    })

    it('renders specified number of cards', () => {
      const { container } = render(<SkeletonCardGrid count={5} />)
      const cards = container.querySelectorAll('.perspective-container')
      expect(cards).toHaveLength(5)
    })
  })
})

