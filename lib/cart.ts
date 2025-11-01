'use client'

import { Cart, Product } from './types'

const CART_STORAGE_KEY = 'schrodingers_cat_cart'

export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0 }
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const cart = JSON.parse(stored) as Cart
      // Recalculate totals (in case prices changed)
      return calculateCartTotals(cart)
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error)
  }

  return { items: [], total: 0, itemCount: 0 }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

export function calculateCartTotals(cart: Omit<Cart, 'total' | 'itemCount'>): Cart {
  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  const itemCount = cart.items.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

  return {
    ...cart,
    total,
    itemCount,
  }
}

export function addToCart(product: Product, quantity: number = 1): Cart {
  const cart = getCart()
  const existingItemIndex = cart.items.findIndex(
    item => item.product.id === product.id
  )

  if (existingItemIndex >= 0) {
    // Update existing item quantity
    const existingItem = cart.items[existingItemIndex]
    if (existingItem) {
      existingItem.quantity += quantity
    }
  } else {
    // Add new item
    cart.items.push({ product, quantity })
  }

  const updatedCart = calculateCartTotals(cart)
  saveCart(updatedCart)
  return updatedCart
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart()
  cart.items = cart.items.filter(item => item.product.id !== productId)
  const updatedCart = calculateCartTotals(cart)
  saveCart(updatedCart)
  return updatedCart
}

export function updateCartItemQuantity(productId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(productId)
  }

  const cart = getCart()
  const item = cart.items.find(item => item.product.id === productId)
  if (item) {
    item.quantity = quantity
  }
  const updatedCart = calculateCartTotals(cart)
  saveCart(updatedCart)
  return updatedCart
}

export function clearCart(): Cart {
  const emptyCart = { items: [], total: 0, itemCount: 0 }
  saveCart(emptyCart)
  return emptyCart
}

