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

