import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render } from './test-utils'
import NewsletterCTA from '../NewsletterCTA'

// Mock the newsletter API
global.fetch = vi.fn()

describe('NewsletterCTA', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the email input field', () => {
    render(<NewsletterCTA />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('renders the subscribe button', () => {
    render(<NewsletterCTA />)
    expect(screen.getByLabelText(/subscribe to daily curiosity/i)).toBeInTheDocument()
    expect(screen.getByText('Subscribe Free')).toBeInTheDocument()
  })

  it('has the correct form aria-label', () => {
    render(<NewsletterCTA />)
    const form = screen.getByRole('form', { name: /newsletter subscription/i })
    expect(form).toBeInTheDocument()
  })

  it('renders the heading and subtitle', () => {
    render(<NewsletterCTA />)
    expect(screen.getByText('Daily Curiosity, Delivered')).toBeInTheDocument()
    expect(screen.getByText(/get your daily dose/i)).toBeInTheDocument()
  })

  it('displays a disclaimer message', () => {
    render(<NewsletterCTA />)
    expect(screen.getByText(/join thousands exploring/i)).toBeInTheDocument()
    expect(screen.getByText(/unsubscribe anytime/i)).toBeInTheDocument()
  })
})

