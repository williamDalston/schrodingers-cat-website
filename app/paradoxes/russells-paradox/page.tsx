import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  CogIcon
} from '@heroicons/react/24/outline'

export default function RussellsParadoxPage() {
  const relatedProducts = [
    {
      slug: 'paradox-collection-ebook',
      title: 'Paradox Collection eBook',
      description: 'Curated collection of 50 mind-bending paradoxes including Russell\'s Paradox with detailed explanations and visual guides.',
      price: '$12',
      category: 'Digital',
    },
    {
      slug: 'mind-bending-paradoxes-wall-art',
      title: 'Mind-Bending Paradoxes Wall Art',
      description: 'Beautiful wall art featuring multiple paradoxes including Russell\'s Paradox with elegant designs.',
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
            Mathematics & Logic
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Russell&apos;s Paradox
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A simple question about sets that revealed a fatal flaw in the foundations of mathematics—proving 
            that even the most rigorous logic can contain contradictions at its core.
          </p>
        </div>

        {/* Main Image Placeholder */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
          <div className="h-96 bg-gradient-to-br from-purple-500 via-accent-500 to-primary-500 flex items-center justify-center">
            <div className="text-center p-8">
              <CogIcon className="h-32 w-32 text-white mx-auto mb-4 opacity-80" />
              <p className="text-white text-lg font-semibold">
                [Illustration: Set Theory Venn Diagrams]
              </p>
            </div>
          </div>
        </div>

        {/* The Paradox Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-4">
              <CogIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Paradox</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4 text-xl">
              In 1901, British philosopher and mathematician Bertrand Russell discovered a paradox so fundamental 
              that it threatened to undermine the entire foundation of set theory—the mathematical language used 
              to describe everything from numbers to infinity.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium mb-4">
                <span className="font-bold">The Question:</span> Consider the set of all sets that do not contain themselves as members. 
                Does this set contain itself?
              </p>
              <p className="text-gray-800 font-medium">
                If it contains itself, then by definition it shouldn&apos;t. If it doesn&apos;t contain itself, 
                then by definition it should. This creates an impossible logical contradiction.
              </p>
            </div>

            <p className="mb-4 text-xl">
              This seemingly simple question exposed a fatal flaw in naive set theory—the idea that you can define 
              a set by any property you want. Russell&apos;s paradox showed that some properties lead to logical contradictions, 
              forcing mathematicians to rebuild the foundations of mathematics.
            </p>
          </div>
        </section>

        {/* Set Theory Primer */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mr-4">
              <LightBulbIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Understanding Sets</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              A <strong>set</strong> is a collection of objects. For example:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>The set of all even numbers: {`{2, 4, 6, 8, ...}`}</li>
              <li>The set of all fruits: {`{apple, banana, orange, ...}`}</li>
              <li>The set of all books you&apos;ve read</li>
            </ul>

            <p className="mb-4">
              Sets can contain other sets. For example, the set of all libraries contains sets of books. 
              Most sets don&apos;t contain themselves—the set of all fruits doesn&apos;t contain itself 
              (a set isn&apos;t a fruit).
            </p>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium">
                <span className="font-bold">The Strange Case:</span> But some sets might contain themselves. 
                Consider &quot;the set of all sets that can be described in fewer than 20 words.&quot; 
                This description itself is fewer than 20 words, so the set might contain itself—creating 
                a self-referential loop that leads to Russell&apos;s paradox.
              </p>
            </div>
          </div>
        </section>

        {/* The Mathematical Formulation */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Mathematical Formulation</h2>
          
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-6">
            <p className="text-lg text-gray-700 mb-4">
              Let R be the set of all sets that do not contain themselves as members:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg font-mono text-center text-xl mb-4">
              R = {`{ x | x ∉ x }`}
            </div>
            <p className="text-gray-600 italic mb-4">
              (Read as: &quot;R equals the set of all x such that x is not a member of x&quot;)
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Now ask: Is R a member of itself?
            </p>
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>If R ∈ R:</strong> Then by definition, R does not contain itself (R ∉ R). Contradiction!
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>If R ∉ R:</strong> Then R satisfies the condition for membership, so R ∈ R. Contradiction!
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg">
            This proves that such a set cannot exist—but naive set theory assumed it could. 
            This contradiction forced mathematicians to reconsider the very foundations of their field.
          </p>
        </section>

        {/* Historical Impact */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Historical Impact</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Russell discovered this paradox while working on his landmark work, <em>Principia Mathematica</em>, 
              which aimed to prove that all mathematics could be derived from logic. The paradox struck at the heart 
              of this project.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Crisis in Foundations</h3>
            <p className="mb-4">
              In the early 1900s, mathematicians believed they could create a complete, consistent foundation 
              for all mathematics. Russell&apos;s paradox, along with Gödel&apos;s later incompleteness theorems, 
              shattered this dream. It proved that:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Not every property can define a set</li>
              <li>Self-reference in mathematics can lead to contradictions</li>
              <li>Mathematical systems might be incomplete or inconsistent</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Solutions: Type Theory and Axiomatic Set Theory</h3>
            <p className="mb-4">
              To resolve the paradox, mathematicians developed two approaches:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Type Theory</h4>
                <p className="text-gray-600">
                  Russell and Alfred North Whitehead developed type theory, which prevents sets from containing themselves 
                  by organizing objects into hierarchical &quot;types.&quot; A set can only contain objects of a lower type, 
                  making self-reference impossible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Zermelo-Fraenkel Set Theory</h4>
                <p className="text-gray-600">
                  Ernst Zermelo and Abraham Fraenkel created an axiomatic system (ZF or ZFC) that restricts which 
                  properties can define sets, preventing paradoxes while maintaining most of mathematics. 
                  This became the standard foundation for modern mathematics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Implications */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Today</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Computer Science:</strong> Type systems in programming languages (like TypeScript, 
              Haskell, Rust) are directly inspired by type theory developed to solve Russell&apos;s paradox. 
              They prevent bugs by making self-referential contradictions impossible at the type level.
            </p>
            <p>
              <strong className="text-white">Logic and Philosophy:</strong> The paradox reveals that self-reference is inherently 
              problematic. This connects to Gödel&apos;s incompleteness theorems, the Liar Paradox, and limits 
              on what can be proven or known.
            </p>
            <p>
              <strong className="text-white">Database Theory:</strong> Relational databases must avoid self-referential contradictions. 
              Understanding set theory paradoxes helps design consistent data models and prevent logical errors.
            </p>
            <p>
              <strong className="text-white">Artificial Intelligence:</strong> As AI systems become more sophisticated, 
              they must handle self-reference and avoid logical contradictions. Type systems and formal logic help 
              create more reliable AI systems.
            </p>
            <p>
              <strong className="text-white">The Limits of Knowledge:</strong> Russell&apos;s paradox shows that even in 
              pure logic, some questions have no consistent answers. This suggests that knowledge itself might have 
              fundamental limits—not because we&apos;re ignorant, but because reality itself contains contradictions.
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

