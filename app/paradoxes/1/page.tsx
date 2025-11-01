import Link from 'next/link'
import { ArrowLeftIcon, ClockIcon, LightBulbIcon, BookOpenIcon } from '@heroicons/react/24/outline'

export default function SchrodingersCatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/paradoxes"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Paradox Library
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                Quantum Mechanics
              </span>
              <span className="inline-flex items-center gap-1 text-white/90 text-sm">
                <ClockIcon className="h-4 w-4" />
                10 min read
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Schrödinger&apos;s Cat
            </h1>
            <p className="text-xl text-primary-100">
              The quantum thought experiment that asks: Is something both alive and dead until you look?
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-12 prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <LightBulbIcon className="h-8 w-8 text-primary-600" />
                  The Setup
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Imagine this: You place a cat in a sealed box. Inside this box, there&apos;s a radioactive atom, a Geiger counter, a hammer, and a flask of poison. The setup is designed so that if the radioactive atom decays (which has a 50% chance of happening), the Geiger counter detects it, triggers the hammer to break the flask, and releases the poison—killing the cat.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Here&apos;s the twist: According to quantum mechanics, until you open the box and observe what happened, the radioactive atom exists in a &quot;superposition&quot;—it has both decayed AND not decayed simultaneously. This means the cat is in a state where it is BOTH alive AND dead at the same time.
                </p>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-6 my-6 rounded-r-lg">
                  <p className="text-gray-800 italic">
                    &quot;The cat is simultaneously alive and dead—until you look.&quot;
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <BookOpenIcon className="h-8 w-8 text-primary-600" />
                  Why This Was Created
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Austrian physicist Erwin Schrödinger created this thought experiment in 1935 to highlight what he saw as a problem with quantum mechanics. He wanted to show that extending quantum principles to everyday objects (like cats) leads to absurd conclusions.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Schrödinger was skeptical of the Copenhagen interpretation of quantum mechanics, which states that particles exist in superpositions of states until they&apos;re observed. His thought experiment was meant to show that this interpretation, when scaled up, becomes nonsensical.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What It Really Means</h2>
                <p className="text-lg leading-relaxed mb-4">
                  The paradox reveals several deep questions about quantum mechanics:
                </p>
                <ul className="space-y-3 text-lg leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 font-bold">•</span>
                    <span><strong>Observation creates reality?</strong> Does looking at something actually determine its state?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 font-bold">•</span>
                    <span><strong>Where does the quantum world end?</strong> At what point does the weird quantum behavior stop?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-3 font-bold">•</span>
                    <span><strong>Consciousness matters?</strong> Does human observation have special properties?</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Modern Understanding</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Today, physicists have a more nuanced understanding:
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  The superposition collapses not because of conscious observation, but through a process called &quot;decoherence.&quot; When the quantum system interacts with its environment (the box, air molecules, etc.), it loses its quantum properties and settles into a definite state—all before any human looks.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  So in reality, the cat was never truly both alive and dead. By the time the radioactive atom interacted with the detection apparatus, the quantum superposition had already collapsed. But the thought experiment remains powerful because it forces us to think deeply about the nature of reality and observation.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why It Matters</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Schrödinger&apos;s Cat isn&apos;t just a quirky physics riddle. It touches on fundamental questions about:
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Reality vs. Observation</h3>
                    <p className="text-gray-700">Does reality exist independently of us, or do we create it by observing?</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-50 to-white p-6 rounded-xl border border-accent-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Quantum to Classical</h3>
                    <p className="text-gray-700">How does the quantum world transition to our everyday, predictable reality?</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Explore More Section */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enjoyed this paradox?</h3>
                <p className="text-gray-600">
                  Explore more mind-bending paradoxes in our library.
                </p>
              </div>
              <Link
                href="/paradoxes"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>

        {/* Related Content */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Related Content</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/tools"
              className="block p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:border-primary-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Tools</h3>
              <p className="text-gray-600">Experiment with quantum simulations</p>
            </Link>
            <Link
              href="/curiosity"
              className="block p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:border-primary-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Curiosity</h3>
              <p className="text-gray-600">More fascinating science delivered daily</p>
            </Link>
            <Link
              href="/shop"
              className="block p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shop</h3>
              <p className="text-gray-600">Support the work with themed products</p>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

