import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  calculateCartTotals,
  updateCartItemQuantity,
} from '../cart'
import { Product } from '../types'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

describe('cart utilities', () => {
  beforeEach(() => {
    localStorageMock.clear()
    // @ts-ignore
    global.localStorage = localStorageMock
    global.window = global.window || {}
    global.window.localStorage = localStorageMock
  })

  describe('getCart', () => {
    it('returns empty cart when no data exists', () => {
      const cart = getCart()
      expect(cart.items).toEqual([])
      expect(cart.total).toBe(0)
      expect(cart.itemCount).toBe(0)
    })
  })

  describe('calculateCartTotals', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      slug: 'test-product',
      description: 'Test',
      price: 1000,
      currency: 'USD',
      category: 'poster',
      imageUrl: '/test.jpg',
      inStock: true,
      createdAt: new Date(),
    }

    it('calculates correct totals for single item', () => {
      const cart = calculateCartTotals({
        items: [{ product: mockProduct, quantity: 1 }],
      })

      expect(cart.total).toBe(1000)
      expect(cart.itemCount).toBe(1)
    })

    it('calculates correct totals for multiple items', () => {
      const cart = calculateCartTotals({
        items: [
          { product: mockProduct, quantity: 2 },
          { product: { ...mockProduct, id: '2', price: 500 }, quantity: 1 },
        ],
      })

      expect(cart.total).toBe(2500) // (1000 * 2) + 500
      expect(cart.itemCount).toBe(3)
    })

    it('handles zero quantities', () => {
      const cart = calculateCartTotals({
        items: [],
      })

      expect(cart.total).toBe(0)
      expect(cart.itemCount).toBe(0)
    })
  })

  describe('addToCart', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      slug: 'test-product',
      description: 'Test',
      price: 1000,
      currency: 'USD',
      category: 'poster',
      imageUrl: '/test.jpg',
      inStock: true,
      createdAt: new Date(),
    }

    it('adds a new product to empty cart', () => {
      const cart = addToCart(mockProduct)
      expect(cart.items).toHaveLength(1)
      expect(cart.items[0]?.quantity).toBe(1)
      expect(cart.total).toBe(1000)
    })

    it('increments quantity for existing product', () => {
      addToCart(mockProduct, 1)
      const cart = addToCart(mockProduct, 2)
      
      expect(cart.items).toHaveLength(1)
      expect(cart.items[0]?.quantity).toBe(3)
      expect(cart.total).toBe(3000)
    })

    it('adds multiple quantities at once', () => {
      const cart = addToCart(mockProduct, 3)
      expect(cart.items[0]?.quantity).toBe(3)
      expect(cart.total).toBe(3000)
    })
  })

  describe('removeFromCart', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      slug: 'test-product',
      description: 'Test',
      price: 1000,
      currency: 'USD',
      category: 'poster',
      imageUrl: '/test.jpg',
      inStock: true,
      createdAt: new Date(),
    }

    it('removes product from cart', () => {
      addToCart(mockProduct, 2)
      const cart = removeFromCart('1')
      
      expect(cart.items).toHaveLength(0)
      expect(cart.total).toBe(0)
    })

    it('handles removing non-existent product gracefully', () => {
      const cart = removeFromCart('999')
      expect(cart.items).toHaveLength(0)
    })
  })

  describe('clearCart', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      slug: 'test-product',
      description: 'Test',
      price: 1000,
      currency: 'USD',
      category: 'poster',
      imageUrl: '/test.jpg',
      inStock: true,
      createdAt: new Date(),
    }

    it('clears all items from cart', () => {
      addToCart(mockProduct, 5)
      const cart = clearCart()
      
      expect(cart.items).toHaveLength(0)
      expect(cart.total).toBe(0)
      expect(cart.itemCount).toBe(0)
    })
  })

  describe('updateCartItemQuantity', () => {
    const mockProduct: Product = {
      id: '1',
      title: 'Test Product',
      slug: 'test-product',
      description: 'Test',
      price: 1000,
      currency: 'USD',
      category: 'poster',
      imageUrl: '/test.jpg',
      inStock: true,
      createdAt: new Date(),
    }

    it('updates quantity of existing product', () => {
      addToCart(mockProduct, 2)
      const cart = updateCartItemQuantity('1', 5)
      
      expect(cart.items[0]?.quantity).toBe(5)
      expect(cart.total).toBe(5000)
    })

    it('removes product when quantity is 0', () => {
      addToCart(mockProduct, 2)
      const cart = updateCartItemQuantity('1', 0)
      
      expect(cart.items).toHaveLength(0)
      expect(cart.total).toBe(0)
    })

    it('removes product when quantity is negative', () => {
      addToCart(mockProduct, 2)
      const cart = updateCartItemQuantity('1', -1)
      
      expect(cart.items).toHaveLength(0)
      expect(cart.total).toBe(0)
    })

    it('handles updating non-existent product gracefully', () => {
      const cart = updateCartItemQuantity('999', 5)
      expect(cart.items).toHaveLength(0)
    })
  })
})

