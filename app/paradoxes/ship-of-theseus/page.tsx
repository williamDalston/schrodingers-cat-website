import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  CubeIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function ShipOfTheseusPage() {
  const relatedProducts = [
    {
      slug: 'ship-of-theseus-poster',
      title: 'Ship of Theseus Poster',
      description: 'A beautifully designed poster exploring the identity paradox with elegant illustrations and philosophical insights.',
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
            Identity
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Ship of Theseus
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            If every part of a ship is gradually replaced, piece by piece, is it still the same ship? 
            This ancient paradox challenges our fundamental understanding of identity, continuity, and what makes something... itself.
          </p>
        </div>

        {/* Main Image Placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-96 bg-gradient-to-br from-purple-500 via-primary-500 to-accent-500 flex items-center justify-center">
            <div className="text-center p-8">
              <CubeIcon className="h-32 w-32 text-white mx-auto mb-4 opacity-80" />
              <p className="text-white text-lg font-semibold">
                [Illustration: Ship Being Gradually Replaced]
              </p>
            </div>
          </div>
        </div>

        {/* The Paradox Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4">
              <CubeIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Paradox</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-xl">
              The Ship of Theseus is one of the oldest and most enduring paradoxes in philosophy, 
              first recorded by Plutarch in the 1st century CE. It asks a deceptively simple question 
              about identity that has puzzled philosophers for over 2,000 years.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">The Scenario:</span> The ship that Theseus (the legendary king of Athens) 
                sailed to Crete is preserved in the harbor. Over the centuries, its wooden planks rot and are replaced, 
                one by one. Eventually, every single plank, sail, and rope has been replaced. Is it still the Ship of Theseus? 
                And what if someone collected all the original planks and rebuilt the ship with them—which one would be the &quot;real&quot; Ship of Theseus?
              </p>
            </div>

            <p className="mb-4 text-xl">
              This paradox reveals a fundamental tension in how we understand identity: we simultaneously believe that 
              objects can persist through change <strong>and</strong> that objects are defined by their material components. 
              These beliefs appear to be in conflict.
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">Identity Over Time</h3>
              <p className="text-gray-600 leading-relaxed">
                What makes an object the same object at different moments in time? Is it the material it&apos;s made of, 
                or something more abstract like its form, function, or history?
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Material vs. Form</h3>
              <p className="text-gray-600 leading-relaxed">
                The debate between whether identity comes from physical matter (the atoms and molecules) or from structure 
                and arrangement (the form or pattern). Both seem essential, yet they can diverge.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuity</h3>
              <p className="text-gray-600 leading-relaxed">
                The idea that gradual change preserves identity while sudden change might not. But where is the line? 
                How much change is too much? This questions whether &quot;identity&quot; is a binary (same/different) or a spectrum.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem of Persistence</h3>
              <p className="text-gray-600 leading-relaxed">
                How do objects persist through time when they&apos;re constantly changing? Your body replaces cells continuously, 
                rivers flow, mountains erode. Yet we treat them as &quot;the same&quot; thing. What grounds this sameness?
              </p>
            </div>
          </div>
        </section>

        {/* Philosophical Interpretations */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Philosophical Perspectives</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The Material View</h3>
            <p className="mb-4">
              Identity is determined by material composition. If all the original parts are replaced, it&apos;s not the same ship. 
              The original planks define the ship&apos;s identity. This view faces problems: we consider a river to be the same river 
              even though different water flows through it constantly. Similarly, your body replaces all its cells every 7-10 years, 
              yet you remain &quot;you.&quot;
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. The Form/Structure View</h3>
            <p className="mb-4">
              Identity comes from form, structure, or pattern rather than material. The ship remains the same as long as it maintains 
              its structure, function, and organization. Like a flame or a wave, what matters is the pattern, not the specific particles. 
              This view aligns with how we think about software, processes, and organizations—they persist through material changes.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. The Historical/Causal View</h3>
            <p className="mb-4">
              Identity is determined by causal continuity and historical connectedness. The ship remains the same because there&apos;s an 
              unbroken chain of causal connections linking each moment to the next. This view emphasizes the importance of continuity 
              and gradual replacement. However, it struggles with the case where original parts are reassembled—why isn&apos;t that ship 
              also the Ship of Theseus?
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. There Is No Identity (Eliminativism)</h3>
            <p className="mb-4">
              Some philosophers argue that the concept of identity over time is incoherent or simply a useful fiction. Objects don&apos;t 
              really persist—there are just temporal stages that we mistakenly treat as a single enduring object. This radical view suggests 
              that the Ship of Theseus at time T1 and time T2 are different objects that happen to be spatiotemporally continuous.
            </p>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium italic">
                &quot;Identity is a matter of convention, not fact. We decide what counts as &quot;the same&quot; based on our purposes 
                and perspectives. The paradox arises from assuming there&apos;s a single correct answer, when in reality, 
                identity is contextual and perspectival.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Modern Applications */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Modern Applications</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🧬 Human Identity</h3>
              <p className="text-gray-600 leading-relaxed">
                Your body replaces all its cells every 7-10 years. Your memories change and fade. Your personality evolves. 
                Are you the same person you were a decade ago? This connects to debates about personal identity, memory theory, 
                and what makes &quot;you&quot; you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💾 Digital Identity</h3>
              <p className="text-gray-600 leading-relaxed">
                Software is constantly updated—every line of code might change, yet we treat it as the same program. 
                A file can be copied, modified, backed up. Which copy is the &quot;original&quot;? Blockchain and digital assets 
                face similar questions about authenticity and identity in digital spaces.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🏛️ Cultural Heritage</h3>
              <p className="text-gray-600 leading-relaxed">
                Historic buildings are constantly restored—stones replaced, foundations reinforced, roofs rebuilt. 
                At what point is it still the &quot;original&quot; building? Museums face similar questions: is a restored artifact 
                still authentic? This affects how we value and preserve cultural heritage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🚗 Legal & Commercial</h3>
              <p className="text-gray-600 leading-relaxed">
                In law, property rights depend on identity: &quot;Is this the same stolen car after it&apos;s been repainted?&quot; 
                Companies merge, rebrand, and restructure—when is a corporation still the same entity? 
                These questions have real-world legal and economic consequences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🧠 Neuroscience & Consciousness</h3>
              <p className="text-gray-600 leading-relaxed">
                If consciousness is a pattern of neural activity that constantly changes, what maintains your sense of self? 
                The Ship of Theseus paradox appears in debates about split-brain patients, memory transfer, 
                and even the possibility of uploading consciousness to computers.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Today</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Artificial Intelligence:</strong> As we build AI systems that learn and evolve, 
              the question of AI identity becomes crucial. Is an AI that has been updated millions of times still the same AI? 
              Do digital beings have persistent identities?
            </p>
            <p>
              <strong className="text-white">Biotechnology & Cloning:</strong> Genetic engineering and cloning raise identity questions. 
              If we clone an organism, is it the same or different? If we modify your genes, are you still you? 
              These questions will become increasingly important as biotechnology advances.
            </p>
            <p>
              <strong className="text-white">Conservation & Restoration:</strong> Environmental conservation faces these questions: 
              if we restore an ecosystem to its historical state using different species, is it still the same ecosystem? 
              How much change is acceptable while maintaining identity?
            </p>
            <p>
              <strong className="text-white">Personal Growth & Change:</strong> On a personal level, the paradox challenges us to 
              reflect on identity and change. If you&apos;ve grown and changed significantly, are you still the same person? 
              This connects to self-acceptance, personal responsibility, and how we understand transformation.
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

