import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  ClockIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function GrandfatherParadoxPage() {
  const relatedProducts = [
    {
      slug: 'grandfather-paradox-poster',
      title: 'Grandfather Paradox Poster',
      description: 'A beautifully designed poster explaining the time travel paradox with timeline visualizations and elegant typography.',
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
            Time Travel
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Grandfather Paradox
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            What happens if you travel back in time and kill your own grandfather before your parent is born? 
            This thought experiment reveals the fundamental logical problems with backwards time travel.
          </p>
        </div>

        {/* Main Image Placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-96 bg-gradient-to-br from-accent-500 via-primary-500 to-purple-500 flex items-center justify-center">
            <div className="text-center p-8">
              <ClockIcon className="h-32 w-32 text-white mx-auto mb-4 opacity-80" />
              <p className="text-white text-lg font-semibold">
                [Illustration: Timeline Showing Grandfather Paradox Loop]
              </p>
            </div>
          </div>
        </div>

        {/* The Paradox Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4">
              <ClockIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Paradox</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-xl">
              The Grandfather Paradox is a classic thought experiment in time travel philosophy. 
              First described by science fiction writer René Barjavel in his 1943 novel &quot;Le Voyageur Imprudent&quot; 
              (The Imprudent Traveler), it demonstrates a logical contradiction inherent in the idea of backwards time travel.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">The Scenario:</span> Imagine you build a time machine and travel back in time 
                to the year 1930, before your grandfather met your grandmother. You locate your grandfather and kill him. 
                This means your parent would never be born, which means you would never be born, which means you could 
                never travel back in time to kill your grandfather in the first place.
              </p>
            </div>

            <p className="mb-4 text-xl">
              This creates an <strong>impossible logical loop</strong>: if you kill your grandfather, you prevent your own existence, 
              which prevents you from killing your grandfather, which means he lives, which means you exist, which means you can 
              kill him... and the cycle continues infinitely.
            </p>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mr-4">
              <LightBulbIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Key Concepts</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Causality</h3>
              <p className="text-gray-600 leading-relaxed">
                The principle that cause must come before effect. The Grandfather Paradox violates this fundamental 
                rule of logic, suggesting that an effect (your existence) could prevent its own cause (your grandfather&apos;s survival).
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Logical Consistency</h3>
              <p className="text-gray-600 leading-relaxed">
                The paradox highlights that backwards time travel creates contradictions: events that both happen 
                and don&apos;t happen simultaneously. Reality cannot accommodate such logical impossibilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Bootstrap Paradox</h3>
              <p className="text-gray-600 leading-relaxed">
                Related paradox where information or objects have no origin. For example, if you travel back in time 
                and give Beethoven his own compositions, where did the music originally come from?
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Self-Consistency Principle</h3>
              <p className="text-gray-600 leading-relaxed">
                Proposed by physicist Igor Novikov, this suggests that any action in the past must be consistent 
                with events that already occurred. If you travel back, you were always part of history.
              </p>
            </div>
          </div>
        </section>

        {/* Three Interpretations */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Three Main Interpretations</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Time Travel is Impossible</h3>
            <p className="mb-4">
              The simplest solution: backwards time travel violates the laws of physics and logic, so it&apos;s simply 
              impossible. The universe prevents logical contradictions by making time travel to the past fundamentally 
              unattainable. This aligns with our current understanding of general relativity, which allows time travel 
              forward but makes backwards travel extremely problematic.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Multiple Timelines / Parallel Universes</h3>
            <p className="mb-4">
              When you travel back in time, you create a new timeline or branch into a parallel universe. In this new timeline, 
              you can kill &quot;your&quot; grandfather, but it&apos;s not actually your original grandfather—just a version of him 
              in an alternate reality. Your original timeline remains unchanged, so your existence is never threatened. 
              This interpretation appears in many science fiction stories, from &quot;Back to the Future Part II&quot; to &quot;Avengers: Endgame.&quot;
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Self-Consistency (The Novikov Principle)</h3>
            <p className="mb-4">
              Proposed by Russian physicist Igor Novikov, this principle states that if time travel were possible, 
              any actions you take in the past were always part of history. You cannot create contradictions because 
              events must be self-consistent. If you try to kill your grandfather, something will always prevent you: 
              you&apos;ll miss, the gun jams, you have a change of heart, or quantum fluctuations make it impossible. 
              The universe ensures that history remains consistent with itself.
            </p>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium italic">
                &quot;The laws of physics do not permit closed timelike curves that would allow you to change the past. 
                Or if they do permit them, then any action you take in the past was always part of history.&quot; 
                — Igor Novikov
              </p>
            </div>
          </div>
        </section>

        {/* Modern Implications */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Today</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">General Relativity:</strong> Einstein&apos;s equations actually allow for 
              closed timelike curves (paths through spacetime that loop back on themselves) in certain theoretical scenarios, 
              such as near rotating black holes. Physicists debate whether nature actually permits these or if quantum 
              mechanics prevents them.
            </p>
            <p>
              <strong className="text-white">Quantum Mechanics:</strong> At the quantum level, particles can behave in ways 
              that seem to violate causality, but they don&apos;t actually allow information to travel backwards. 
              Quantum entanglement is often misunderstood as faster-than-light communication, but it cannot transmit 
              information that would create paradoxes.
            </p>
            <p>
              <strong className="text-white">Philosophy of Free Will:</strong> If the Novikov Principle is correct and 
              your actions in the past were always predetermined, does that eliminate free will? Can you choose differently 
              if the universe ensures your choices maintain consistency?
            </p>
            <p>
              <strong className="text-white">Information Paradoxes:</strong> Modern physics faces similar paradoxes, 
              such as the black hole information paradox. Understanding how information behaves in extreme conditions 
              might reveal fundamental truths about causality and time itself.
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
                key={product.slug}
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

