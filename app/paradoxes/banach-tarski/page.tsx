'use client'

import Link from 'next/link'
import { BanachTarskiInteractive } from '@/components/paradoxes/BanachTarskiInteractive'
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  AcademicCapIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  CubeIcon
} from '@heroicons/react/24/outline'

export default function BanachTarskiParadoxPage() {
  const relatedProducts = [
    {
      id: 1,
      title: 'Banach-Tarski Paradox Poster',
      description: 'A beautifully designed poster explaining the mathematical paradox with elegant visualizations and mathematical notation.',
      price: '$24',
      category: 'Poster',
    },
    {
      id: 3,
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
            Mathematics
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Banach-Tarski Paradox
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A mathematical theorem that seems to violate physics: you can cut a solid sphere into pieces, 
            rearrange them using only rotation and translation, and end up with two identical spheres the same size as the original.
          </p>
        </div>

        {/* Interactive Demonstration */}
        <div className="mb-12">
          <BanachTarskiInteractive />
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
              In 1924, Polish mathematicians Stefan Banach and Alfred Tarski proved a theorem so counterintuitive 
              that it seems impossible: you can take a solid ball, decompose it into a finite number of pieces, 
              and reassemble those pieces into two balls identical to the original—without stretching, warping, or deforming anything.
            </p>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg my-8">
              <p className="text-gray-800 font-medium mb-4">
                <span className="font-bold">The Theorem:</span> Given any two bounded subsets of 3D space with non-empty interiors 
                (like two balls of different sizes), one can partition the first set into finitely many pieces and reassemble 
                them (using only rotation and translation) to form the second set.
              </p>
              <p className="text-gray-800 font-medium">
                In simpler terms: You can duplicate a solid sphere by cutting it into pieces and rearranging them. 
                The pieces can be rotated and moved, but not stretched or compressed.
              </p>
            </div>

            <p className="mb-4 text-xl">
              This violates our intuitive understanding of volume, conservation of mass, and physics itself. 
              How can you create matter from nothing? The answer lies in the strange properties of infinite sets and 
              the Axiom of Choice—a fundamental principle in set theory.
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Axiom of Choice</h3>
              <p className="text-gray-600 leading-relaxed">
                A fundamental principle in set theory that allows choosing one element from each of infinitely many sets, 
                even when there&apos;s no rule for how to choose. The Banach-Tarski paradox depends critically on this axiom.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Non-Measurable Sets</h3>
              <p className="text-gray-600 leading-relaxed">
                The pieces used in Banach-Tarski are &quot;non-measurable&quot;—they don&apos;t have a well-defined volume. 
                This allows them to be rearranged in ways that seem to violate conservation of volume.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Infinite Decomposition</h3>
              <p className="text-gray-600 leading-relaxed">
                The sphere is decomposed into infinitely complex pieces—so complex that they can&apos;t actually be constructed 
                in physical reality. The theorem is purely mathematical, not physical.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rotation and Translation Only</h3>
              <p className="text-gray-600 leading-relaxed">
                The pieces are only rotated and translated (moved)—never stretched, compressed, or distorted. 
                This makes the paradox even more surprising: how can volume be created without deformation?
              </p>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why It Works (Mathematically)</h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              The key insight is that the pieces used in the decomposition are <strong>non-measurable sets</strong>— 
              they cannot be assigned a consistent volume. This might seem like cheating, but it&apos;s mathematically valid.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Axiom of Choice</h3>
            <p className="mb-4">
              The Axiom of Choice allows us to select one element from each of infinitely many sets simultaneously, 
              even when there&apos;s no algorithmic way to make the choice. This axiom is used to construct the non-measurable 
              pieces needed for Banach-Tarski.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why It Doesn&apos;t Work in Physics</h3>
            <p className="mb-4">
              The pieces required by Banach-Tarski are so complex that they cannot be physically realized. They have:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>No well-defined boundaries</li>
              <li>Infinite complexity (fractal-like structures)</li>
              <li>No measurable volume (they violate our intuitive notion of size)</li>
              <li>Density that varies in ways that don&apos;t correspond to physical matter</li>
            </ul>

            <div className="bg-accent-50 border-l-4 border-accent-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 font-medium">
                <strong>The Bottom Line:</strong> Banach-Tarski is a valid mathematical theorem, but it describes 
                something that cannot happen in physical reality. It shows the power and strangeness of pure mathematics, 
                where logical consistency can lead to conclusions that seem physically impossible.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Explanation */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Visual Idea</h2>
          
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Start with One Sphere</h4>
                  <p className="text-gray-600">Take a solid ball in 3D space (like a billiard ball).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Decompose into Pieces</h4>
                  <p className="text-gray-600">
                    Using the Axiom of Choice, partition the sphere into finitely many non-measurable pieces. 
                    These pieces have no well-defined volume, but together they make up the sphere.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-600">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Rotate and Translate</h4>
                  <p className="text-gray-600">
                    Rotate and move the pieces (no stretching allowed). The rotations and translations are 
                    carefully chosen so that when reassembled, they form two complete spheres.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Result: Two Identical Spheres</h4>
                  <p className="text-gray-600">
                    The pieces now form two solid spheres, each identical in size to the original. 
                    Mathematically, this is valid—but physically, it&apos;s impossible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophical Implications */}
        <section className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters</h2>
          <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">The Nature of Mathematics:</strong> Banach-Tarski shows that mathematics 
              can describe things that are logically consistent but physically impossible. This raises deep questions 
              about the relationship between mathematical truth and physical reality.
            </p>
            <p>
              <strong className="text-white">The Axiom of Choice Controversy:</strong> The paradox depends on the 
              Axiom of Choice, which some mathematicians find problematic because it leads to non-constructive 
              results—things that exist mathematically but can&apos;t be explicitly constructed.
            </p>
            <p>
              <strong className="text-white">Limits of Physical Modeling:</strong> The paradox illustrates that 
              not all mathematical structures correspond to physical reality. Some mathematical objects are too 
              abstract or complex to exist in the physical world.
            </p>
            <p>
              <strong className="text-white">Conservation Laws:</strong> The paradox seems to violate conservation 
              of volume, mass, and energy. This highlights that conservation laws are physical principles, not 
              mathematical necessities. Mathematics doesn&apos;t inherently conserve anything.
            </p>
            <p>
              <strong className="text-white">The Power of Infinity:</strong> The paradox relies on the strange 
              properties of infinite sets. In finite mathematics, such duplication is impossible. Infinity enables 
              counterintuitive results that challenge our physical intuitions.
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
                key={product.id}
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
                    href="/shop"
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
