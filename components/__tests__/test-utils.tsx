import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { CartProvider } from '@/lib/cart-context'

// Custom render function that wraps components with providers
function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { renderWithProviders as render }

