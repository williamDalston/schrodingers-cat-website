import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    expect(screen.getByText('Explore Science')).toBeInTheDocument()
    expect(screen.getByText('Without Limits')).toBeInTheDocument()
  })

  it('renders the subtitle with correct content', () => {
    render(<Hero />)
    
    expect(screen.getByText(/A free exploration platform/i)).toBeInTheDocument()
    expect(screen.getByText(/95% free content • 5% support what you love/i)).toBeInTheDocument()
  })

  it('renders CTA buttons with correct text', () => {
    render(<Hero />)
    
    expect(screen.getByText('Start Exploring')).toBeInTheDocument()
    expect(screen.getByText('Daily Curiosity')).toBeInTheDocument()
  })

  it('renders trust indicators', () => {
    render(<Hero />)
    
    expect(screen.getByText('No signup required')).toBeInTheDocument()
    expect(screen.getByText('No paywalls')).toBeInTheDocument()
    expect(screen.getByText('Pure exploration')).toBeInTheDocument()
  })

  it('has correct hrefs for CTA links', () => {
    render(<Hero />)
    
    const startExploringLink = screen.getByText('Start Exploring').closest('a')
    const dailyCuriosityLink = screen.getByText('Daily Curiosity').closest('a')
    
    expect(startExploringLink).toHaveAttribute('href', '/paradoxes')
    expect(dailyCuriosityLink).toHaveAttribute('href', '/curiosity')
  })

  it('renders the badge with location information', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Free Forever • Made in Tbilisi/i)).toBeInTheDocument()
  })
})

