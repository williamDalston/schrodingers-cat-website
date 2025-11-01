'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/lib/theme-context'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, isDark } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const navLinks = [
    { href: '/paradoxes', label: 'Paradoxes' },
    { href: '/articles', label: 'Articles' },
    { href: '/curiosity', label: 'Research' },
    { href: '/tools', label: 'Tools' },
    { href: '/puzzles', label: 'Puzzles' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-gray-300 backdrop-blur-xl bg-white/95 shadow-lg" aria-label="Site navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative text-white font-bold text-lg drop-shadow-sm">SC</span>
              <div className="absolute inset-0 border border-accent-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-black text-2xl text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
              Schrödinger&apos;s Cat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-lg group quantum-layer block focus-ring"
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-50 to-tertiary-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 depth-shadow-1"
                    layoutId="nav-indicator"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-accent-500 to-tertiary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 p-2.5 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 rounded-lg"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-lg text-gray-700 hover:bg-white/50 hover:text-primary-600 transition-all btn-3d"
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
          <div id="mobile-navigation" className="md:hidden py-4 space-y-2 border-t border-gray-200/50" role="navigation" aria-label="Mobile navigation">
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
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-3 flex items-center justify-between text-gray-700 hover:text-primary-600 hover:bg-white/50 rounded-lg transition-all duration-300 font-medium"
            >
              <span>Dark Mode</span>
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 px-4 pt-2">
              <a 
                href="https://www.instagram.com/schrodingerscat_restaurant?igsh=MW1uMDFpODVxbmZ5cw%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg hover:shadow-lg transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/SchrodingersCatTbilisi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg hover:shadow-lg transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
