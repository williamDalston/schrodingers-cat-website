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
    expect(screen.getByText('Subscribe Free')).toBeInTheDocument()
  })

  it('has the correct form aria-label', () => {
    render(<NewsletterCTA />)
    const form = screen.getByRole('form', { name: /newsletter subscription/i })
    expect(form).toBeInTheDocument()
  })

  it('renders the heading and subtitle', () => {
    render(<NewsletterCTA />)
    expect(screen.getByText('Stay Updated on Research')).toBeInTheDocument()
    expect(screen.getByText(/Receive weekly insights/i)).toBeInTheDocument()
  })

  it('displays email input with correct placeholder', () => {
    render(<NewsletterCTA />)
    const input = screen.getByPlaceholderText('your.email@example.com')
    expect(input).toBeInTheDocument()
  })
})
