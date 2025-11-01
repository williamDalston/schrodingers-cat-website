import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Exploring the Nature of/i)).toBeInTheDocument()
    expect(screen.getByText(/Consciousness & Reality/i)).toBeInTheDocument()
  })

  it('renders the subtitle with correct content', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Deep exploration of quantum consciousness/i)).toBeInTheDocument()
  })

  it('renders CTA buttons with correct text', () => {
    render(<Hero />)
    
    expect(screen.getByText('Explore Articles')).toBeInTheDocument()
    expect(screen.getByText('Research Library')).toBeInTheDocument()
  })

  it('renders the badge', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Quantum Mechanics & Consciousness Research/i)).toBeInTheDocument()
  })

  it('has correct hrefs for CTA links', () => {
    render(<Hero />)
    
    const exploreArticlesLink = screen.getByText('Explore Articles').closest('a')
    const researchLibraryLink = screen.getByText('Research Library').closest('a')
    
    expect(exploreArticlesLink).toHaveAttribute('href', '/paradoxes')
    expect(researchLibraryLink).toHaveAttribute('href', '/curiosity')
  })

  it('renders the interactive quantum wave component', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Interactive: Wave-Particle Duality/i)).toBeInTheDocument()
  })
})
