'use client'

import Link from 'next/link'
import { OlbersParadoxInteractive } from '@/components/paradoxes/OlbersParadoxInteractive'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  MoonIcon
} from '@heroicons/react/24/outline'

export default function OlbersParadoxPage() {
  const relatedProducts = [
    {
      slug: 'paradox-collection-ebook',
      title: 'Paradox Collection eBook',
      description: 'Curated collection of 50 mind-bending paradoxes including Olbers\' Paradox with detailed explanations and visual guides.',
      price: '$12',
      category: 'Digital',
    },
    {
      slug: 'mind-bending-paradoxes-wall-art',
      title: 'Mind-Bending Paradoxes Wall Art',
      description: 'Beautiful wall art featuring multiple cosmological paradoxes with stunning designs.',
      price: '$30',
      category: 'Digital',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <Link
          href="/paradoxes"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Paradox Library
        </Link>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Cosmology
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Olbers&apos; Paradox
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            If the universe is infinite and full of stars, why is the night sky dark? This simple question 
            led to profound discoveries about the nature of our cosmos and its history.
          </p>
        </div>

        {/* Interactive Demonstration */}
        <div className="mb-12">
          <OlbersParadoxInteractive />
        </div>

        {/* The Paradox Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4">
              <MoonIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Paradox</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-xl">
              In 1823, German astronomer Heinrich Olbers asked a question that should have a simple answer: 
              Why is the night sky dark? If the universe is infinite, eternal, and filled with stars, 
              then every line of sight should eventually hit a star, making the entire sky as bright as the surface of the sun.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium mb-4">
                <span className="font-bold">The Logic:</span> In an infinite universe with infinite stars:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Every direction you look should contain a star</li>
                <li>Even if stars are far away, there should be enough of them to fill the sky</li>
                <li>The combined light from all stars should make the night sky as bright as day</li>
              </ul>
              <p className="text-gray-800 font-medium mt-4">
                Yet the night sky is dark—nearly black with only scattered points of light. This is Olbers&apos; Paradox.
              </p>
            </div>

            <p className="mb-4 text-xl">
              This paradox challenged assumptions about the universe that had been held for centuries. 
              Solving it required revolutionary ideas about space, time, and the origin of the cosmos.
            </p>
          </div>
        </section>

        {/* Historical Context */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mr-4">
              <LightBulbIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Historical Context</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Although named after Olbers, this paradox was actually first proposed by English astronomer Thomas Digges in 1576, 
              and later by German astronomer Johannes Kepler in 1610. However, Olbers gave it its most famous formulation 
              and attempted solutions.
            </p>

            <p className="mb-4">
              For much of human history, the universe was thought to be eternal, infinite, and static. 
              Stars were believed to be eternal light sources distributed throughout infinite space. 
              These assumptions naturally led to the expectation of a bright night sky—which contradicted observation.
            </p>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">Early Attempted Solutions:</span> Some suggested that dust or gas between stars 
                blocks the light, but this doesn&apos;t work—the dust would heat up and eventually glow as brightly as the stars. 
                Others proposed that stars are distributed in a non-uniform way, but in an infinite universe, 
                this shouldn&apos;t matter.
              </p>
            </div>
          </div>
        </section>

        {/* The Modern Solutions */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Modern Solutions</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              The resolution of Olbers&apos; Paradox came from two revolutionary discoveries in 20th-century cosmology:
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The Universe Has a Finite Age</h3>
            <p className="mb-4">
              The universe is not eternal—it began approximately 13.8 billion years ago in the Big Bang. 
              This means we can only see stars within a finite distance (the observable universe). 
              Light from stars beyond this distance hasn&apos;t had time to reach us yet.
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <p className="text-gray-700">
                Even if there are infinite stars, we can only observe those within our light cone—the region 
                of spacetime from which light has had time to travel to us. The observable universe has a 
                finite radius of about 46.5 billion light-years, limiting how many stars we can see.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. The Universe Is Expanding</h3>
            <p className="mb-4">
              Edwin Hubble discovered in 1929 that the universe is expanding—galaxies are moving away from each other. 
              This expansion has profound effects on light from distant stars:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Redshift</h4>
                <p className="text-gray-700">
                  As space expands, light waves are stretched, shifting them toward longer wavelengths (redshift). 
                  Light from very distant stars is redshifted so much that it moves into the infrared or even 
                  microwave range—invisible to our eyes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Energy Dilution</h4>
                <p className="text-gray-700">
                  The expansion of space also dilutes the energy of light. Even if light reaches us, 
                  it has less energy than when it was emitted, making distant stars dimmer.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-600 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium">
                <strong>Combined Effect:</strong> The finite age of the universe limits how far we can see, 
                and the expansion redshifts and dims the light from distant stars. Together, these effects 
                explain why the night sky appears dark instead of uniformly bright.
              </p>
            </div>
          </div>
        </section>

        {/* Cosmic Microwave Background */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Cosmic Microwave Background</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              There&apos;s an interesting twist: the entire night sky <em>is</em> actually bright—but not with visible light. 
              It glows uniformly in microwave radiation.
            </p>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <p className="text-gray-700 mb-4">
                The <strong>Cosmic Microwave Background (CMB)</strong> is the afterglow of the Big Bang, 
                redshifted from visible light into microwaves over 13.8 billion years. If our eyes could see microwaves, 
                the entire sky would appear uniformly bright, just as Olbers predicted—but at a different wavelength 
                and temperature.
              </p>
              <p className="text-gray-700">
                This is perhaps the ultimate resolution of Olbers&apos; Paradox: the night sky <em>is</em> bright 
                with radiation, but it&apos;s the remnant light from the beginning of the universe, not from infinite stars.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Today</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Understanding the Universe:</strong> Solving Olbers&apos; Paradox helped establish 
              that the universe had a beginning (the Big Bang), is expanding, and has a finite observable size. 
              This revolutionized our understanding of cosmology.
            </p>
            <p>
              <strong className="text-white">The Age of the Universe:</strong> The finite age of the universe explains not only 
              why the night sky is dark, but also why we can see only a limited portion of it. This has implications 
              for understanding cosmic structure and evolution.
            </p>
            <p>
              <strong className="text-white">Dark Energy and Dark Matter:</strong> The expansion of the universe, 
              discovered in part through resolving Olbers&apos; Paradox, led to the discovery of dark energy 
              (which accelerates expansion) and dark matter (which shapes cosmic structure).
            </p>
            <p>
              <strong className="text-white">The Observable Universe:</strong> We now understand that we can only observe 
              a finite region of space. There may be infinite stars beyond our observable horizon, but we&apos;ll never see them— 
              their light will never reach us.
            </p>
            <p>
              <strong className="text-white">The Big Bang Theory:</strong> The resolution of Olbers&apos; Paradox provided 
              crucial evidence for the Big Bang model. If the universe were eternal and static, the sky would be bright. 
              Since it&apos;s dark, the universe must have a beginning—which supports the Big Bang theory.
            </p>
          </div>
        </section>

        {/* Related Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Related Products</h2>
            <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
              View All
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.slug || product.title}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <ShoppingBagIcon className="h-20 w-20 text-primary-400 opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary-600">{product.category}</span>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="w-full inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-center"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Explore More Paradoxes</h3>
          <p className="text-gray-700 mb-6">
            Dive deeper into mind-bending paradoxes that challenge our understanding of reality.
          </p>
          <Link
            href="/paradoxes"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Browse Paradox Library
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

