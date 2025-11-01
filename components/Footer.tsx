import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <span className="font-bold text-2xl text-white">Schrödinger&apos;s Cat</span>
            </div>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              A free exploration platform for science, paradoxes, and daily curiosity. 
              Beautifully designed content with Tbilisi soul.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-2xl">✨</span>
                <span className="text-sm font-medium text-gray-300">100% Free</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="text-2xl">🌍</span>
                <span className="text-sm font-medium text-gray-300">Made in Tbilisi</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://www.instagram.com/schrodingerscat_restaurant?igsh=MW1uMDFpODVxbmZ5cw%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-200"
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
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg hover:shadow-lg hover:scale-110 transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/paradoxes" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Paradox Library
                </Link>
              </li>
              <li>
                <Link href="/curiosity" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Daily Curiosity
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Interactive Tools
                </Link>
              </li>
              <li>
                <Link href="/puzzles" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Weekly Puzzles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  About
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-accent-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Schrödinger&apos;s Cat. Built with curiosity and ❤️ in Tbilisi.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/sitemap" className="text-gray-300 hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">All content free forever</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

