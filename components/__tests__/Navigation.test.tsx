import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from './test-utils'
import Navigation from '../Navigation'

describe('Navigation', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  it('renders the logo and site title', () => {
    render(<Navigation />)
    
    expect(screen.getByText("Schrödinger's Cat")).toBeInTheDocument()
    expect(screen.getByText('SC')).toBeInTheDocument()
  })

  it('renders all navigation links on desktop', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Paradox Library')).toBeInTheDocument()
    expect(screen.getByText('Daily Curiosity')).toBeInTheDocument()
    expect(screen.getByText('Interactive Tools')).toBeInTheDocument()
    expect(screen.getByText('Weekly Puzzles')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button', { name: /open menu|close menu/i })
    expect(menuButton).toBeInTheDocument()
    
    // Mobile menu container should not be visible initially
    const mobileNav = screen.queryByRole('navigation', { name: /mobile navigation/i })
    expect(mobileNav).not.toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Now mobile menu should be visible
    const mobileNavAfterClick = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(mobileNavAfterClick).toBeInTheDocument()
    
    // Click again to close
    fireEvent.click(menuButton)
    
    // Mobile menu should be hidden again
    const mobileNavAfterClose = screen.queryByRole('navigation', { name: /mobile navigation/i })
    expect(mobileNavAfterClose).not.toBeInTheDocument()
  })

  it('has correct href attributes for all navigation links', () => {
    render(<Navigation />)
    
    const links = screen.getAllByRole('link')
    const hrefs = links.map(link => link.getAttribute('href'))
    
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/paradoxes')
    expect(hrefs).toContain('/curiosity')
    expect(hrefs).toContain('/tools')
    expect(hrefs).toContain('/puzzles')
    expect(hrefs).toContain('/shop')
  })
})

