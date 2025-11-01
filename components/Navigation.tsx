'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/cart-context'
import CartSidebar from './CartSidebar'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cart } = useCart()

  const navLinks = [
    { href: '/paradoxes', label: 'Paradox Library' },
    { href: '/articles', label: 'Articles' },
    { href: '/curiosity', label: 'Daily Curiosity' },
    { href: '/tools', label: 'Interactive Tools' },
    { href: '/puzzles', label: 'Weekly Puzzles' },
    { href: '/shop', label: 'Shop' },
  ]

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20 depth-shadow-1 backdrop-blur-xl" aria-label="Site navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative perspective-container">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity quantum-glow"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg btn-3d quantum-layer">
                <span className="text-white font-bold text-lg text-3d">SC</span>
              </div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-accent-600 transition-all text-3d">
              Schrödinger&apos;s Cat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg group quantum-layer"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 depth-shadow-1"></div>
              </Link>
            ))}
            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-4 p-2 text-gray-700 hover:text-primary-600 transition-all duration-300 rounded-lg group quantum-layer"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {cart.itemCount > 9 ? '9+' : cart.itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-white/50 hover:text-primary-600 transition-all btn-3d"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 icon-3d" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6 icon-3d" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden py-4 space-y-2 border-t border-white/20" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-white/50 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setCartOpen(true)
              }}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-white/50 rounded-lg transition-all duration-300 font-medium"
            >
              <span>Shopping Cart</span>
              {cart.itemCount > 0 && (
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount > 9 ? '9+' : cart.itemCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  )
}

