import Link from 'next/link'
import ShareButtons from '@/components/ShareButtons'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  BeakerIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function SchrodingersCatPage() {
  const relatedProducts = [
    {
      slug: 'schrodingers-cat-poster',
      title: 'Schrödinger\'s Cat Poster',
      description: 'Beautifully designed poster explaining the famous thought experiment with elegant typography and illustrations.',
      price: '$24',
      category: 'Poster',
    },
    {
      slug: 'paradox-collection-ebook',
      title: 'Paradox Collection eBook',
      description: 'Curated collection of 50 mind-bending paradoxes with detailed explanations and visual guides.',
      price: '$12',
      category: 'Digital',
    },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Schrödinger's Cat - A Fascinating Quantum Paradox",
    description: 'The famous thought experiment where a cat in a sealed box is simultaneously alive and dead until someone opens it.',
    image: 'https://yourdomain.com/paradox-og-schrodinger.jpg',
    datePublished: '2024-12-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: "Schrödinger's Cat",
    },
    publisher: {
      '@type': 'Organization',
      name: "Schrödinger's Cat",
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://yourdomain.com/paradoxes/schrodingers-cat',
    },
    articleSection: 'Quantum Mechanics',
    keywords: ['Schrödinger\'s cat', 'quantum mechanics', 'superposition', 'thought experiment'],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://yourdomain.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Paradox Library',
        item: 'https://yourdomain.com/paradoxes',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: "Schrödinger's Cat",
        item: 'https://yourdomain.com/paradoxes/schrodingers-cat',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
            Quantum Mechanics
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Schrödinger&apos;s Cat
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            The famous thought experiment where a cat in a sealed box is simultaneously alive and dead 
            until someone opens it. But what does this really mean for our understanding of reality?
          </p>
          
          {/* Social Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-500 mb-3">Share this paradox:</p>
            <ShareButtons 
              title="Schrödinger's Cat - A fascinating quantum mechanics thought experiment"
              description="Explore the famous paradox where a cat is simultaneously alive and dead until observed."
            />
          </div>
        </div>

        {/* Main Image Placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-96 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-500 flex items-center justify-center">
            <div className="text-center p-8">
              <BeakerIcon className="h-32 w-32 text-white mx-auto mb-4 opacity-80" aria-hidden="true" />
              <p className="text-white text-lg font-semibold">
                [Illustration: Cat in Quantum Superposition Box]
              </p>
            </div>
          </div>
        </div>

        {/* The Experiment Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4">
              <BeakerIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Experiment</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-xl">
              In 1935, Austrian physicist Erwin Schrödinger devised a thought experiment to illustrate 
              what he saw as problems with the Copenhagen interpretation of quantum mechanics.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">The Setup:</span> A cat is placed in a sealed box with a 
                radioactive substance that has a 50% chance of decaying within one hour. If it decays, 
                a Geiger counter detects it, which triggers a hammer to shatter a vial of poison, killing the cat. 
                If it doesn&apos;t decay, the cat lives.
              </p>
            </div>

            <p className="mb-4 text-xl">
              According to quantum mechanics, until the box is opened and the system is observed, 
              the radioactive substance exists in a <strong>superposition</strong> of both states: 
              decayed and not decayed. This means the cat must also exist in a superposition—simultaneously 
              alive AND dead.
            </p>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mr-4">
              <LightBulbIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Key Concepts</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quantum Superposition</h3>
              <p className="text-gray-600 leading-relaxed">
                A quantum particle can exist in multiple states simultaneously until measured. 
                It&apos;s not a lack of knowledge—it&apos;s a fundamental property of quantum reality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wave Function Collapse</h3>
              <p className="text-gray-600 leading-relaxed">
                When observed or measured, the superposition &quot;collapses&quot; into a single definite state. 
                The act of observation fundamentally changes the system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Observer Effect</h3>
              <p className="text-gray-600 leading-relaxed">
                The measurement problem: does consciousness affect quantum reality, or is it something else about the act of measurement?
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scale Question</h3>
              <p className="text-gray-600 leading-relaxed">
                Can macroscopic objects (like cats) really exist in quantum superpositions? 
                Where is the boundary between quantum and classical reality?
              </p>
            </div>
          </div>
        </section>

        {/* What It Really Means */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What It Really Means</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6 text-xl">
              Schrödinger intended this as a <strong>reductio ad absurdum</strong>—a way to show that 
              extending quantum logic to everyday objects leads to absurd conclusions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Copenhagen Interpretation</h3>
            <p className="mb-4">
              This view (championed by Niels Bohr) says quantum particles exist in probability waves until observed. 
              The mathematics works perfectly, but it implies reality is fundamentally probabilistic and observer-dependent.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Many-Worlds Interpretation</h3>
            <p className="mb-4">
              Proposed by Hugh Everett, this suggests the universe splits into parallel realities at every quantum event. 
              In one universe, the cat lives. In another, it dies. Both are equally real, and you just experience one branch.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Objective Collapse Theories</h3>
            <p className="mb-4">
              Some physicists propose that superpositions spontaneously collapse when they reach a certain mass or complexity, 
              explaining why we don&apos;t see macroscopic superpositions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Schrödinger&apos;s Point</h3>
            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium italic">
                &quot;One can even set up quite ridiculous cases. A cat is penned up in a steel chamber, 
                along with the following device... In one hour, the cat is both alive and dead. 
                This is absurd, and that was precisely Schrödinger&apos;s point.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Modern Implications */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Today</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Quantum Computing:</strong> We now build computers that maintain quantum 
              superpositions intentionally, proving the phenomenon is real at microscopic scales.
            </p>
            <p>
              <strong className="text-white">Quantum Entanglement:</strong> Einstein called it &quot;spooky action at a distance,&quot; 
              but it&apos;s been proven experimentally. Two particles can remain mysteriously connected across any distance.
            </p>
            <p>
              <strong className="text-white">Reality and Consciousness:</strong> The thought experiment raises profound questions 
              about the nature of reality itself. Does consciousness create reality, or is it all just elegant mathematics?
            </p>
          </div>
        </section>

        {/* Related Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Related Products</h2>
            <Link href="/shop" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
              View All
              <ArrowRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.slug || product.title}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <ShoppingBagIcon className="h-20 w-20 text-primary-400 opacity-50" aria-hidden="true" />
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
            <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

