'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { Cart, Product } from './types'
import { 
  getCart, 
  addToCart as addItemToCart, 
  removeFromCart as removeItemFromCart,
  updateCartItemQuantity as updateItemQuantity,
  clearCart as clearCartStorage
} from './cart'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  refreshCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      setCart(getCart())
    } catch (error) {
      console.error('Error loading cart on mount:', error)
      // Fallback to empty cart if loading fails
      setCart({ items: [], total: 0, itemCount: 0 })
    }
  }, [])

  // Listen for storage changes (e.g., from other tabs)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      // Only respond to cart storage changes
      if (e.key === 'schrodingers_cat_cart') {
        try {
          setCart(getCart())
        } catch (error) {
          console.error('Error loading cart from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    try {
      const updatedCart = addItemToCart(product, quantity)
      setCart(updatedCart)
      // Trigger custom event for other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }))
      }
    } catch (error) {
      console.error('Error adding item to cart:', error)
      // Could show a toast notification here in the future
    }
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    try {
      const updatedCart = removeItemFromCart(productId)
      setCart(updatedCart)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }))
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    try {
      const updatedCart = updateItemQuantity(productId, quantity)
      setCart(updatedCart)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }))
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }, [])

  const clearCart = useCallback(() => {
    try {
      const emptyCart = clearCartStorage()
      setCart(emptyCart)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: emptyCart }))
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }, [])

  const refreshCart = useCallback(() => {
    try {
      setCart(getCart())
    } catch (error) {
      console.error('Error refreshing cart:', error)
      setCart({ items: [], total: 0, itemCount: 0 })
    }
  }, [])

  // Listen for cart updates from this tab
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleCartUpdate = (event: Event) => {
      try {
        const customEvent = event as CustomEvent<Cart>
        setCart(customEvent.detail)
      } catch (error) {
        console.error('Error handling cart update event:', error)
      }
    }

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate as EventListener)
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

