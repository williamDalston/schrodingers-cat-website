'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function QuantumIntro() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Statement */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-tertiary-600 rounded-3xl mb-8 shadow-2xl"
            >
              <SparklesIcon className="h-12 w-12 text-white" aria-hidden="true" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
              The Quantum Enigma
            </h2>
            <p className="text-xl md:text-2xl text-primary-700 font-semibold italic leading-relaxed max-w-3xl mx-auto">
              When Reality Refused to Behave
            </p>
          </div>
          
          {/* Opening */}
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl text-gray-800 leading-relaxed mb-8 font-light"
            >
              Picture this: A dimly lit room. Smoke curling from a forgotten cigarette. Across from you sits Richard Feynman, bongo player, safe cracker, Nobel laureate. He leans forward with eyes that have seen the mathematics of eternity. His words arrive like a confession:
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary-100 via-tertiary-50 to-accent-50 rounded-3xl p-10 md:p-12 mb-12 border-2 border-primary-200 shadow-lg"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 text-center leading-snug">
                &quot;I think I can safely say that nobody understands quantum mechanics.&quot;
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 leading-tight"
            >
              Nobody understands.<br />Nobody.
            </motion.p>
          </div>

          {/* Context */}
          <div className="mb-20 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed"
            >
              Here stands one of the architects of quantum electrodynamics, a man who could calculate the magnetic moment of an electron to ten decimal places. He tells you that understanding eludes even him. This <span className="font-semibold text-gray-900">isn&apos;t humility</span>. It&apos;s honesty.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed"
            >
              Quantum mechanics works spectacularly, infallibly, with a precision that borders on the supernatural. Yet comprehension remains perpetually out of reach. How can a theory so profoundly alien be so fundamentally true? How can we build our entire technological civilization on foundations we cannot see?
            </motion.p>
          </div>

          {/* Section Divider */}
          <div className="relative my-20">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-8 text-3xl">⚛️</span>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              When Certainty Collapsed
            </motion.h3>
            
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                In 1900, Lord Kelvin surveyed physics from his Victorian heights and declared the field nearly complete. Two small clouds, he noted, just two minor problems, remained on the otherwise clear horizon. Those clouds were the Michelson–Morley experiment&apos;s failure to detect the ether, and the ultraviolet catastrophe in blackbody radiation.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Small matters. Mere details to sweep up before physics could declare victory and go home.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-l-4 border-red-600 my-8"
              >
                <p className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                  Within three decades, those clouds had become hurricanes.<br />
                  <span className="text-red-700">They tore down everything.</span>
                </p>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Max Planck, desperate to solve the blackbody problem, introduced a mathematical trick in December 1900. Energy, he proposed, merely for computational convenience, he insisted, comes in discrete packets: quanta. He thought it a temporary fix, a scaffold to be discarded once the real solution appeared.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-2xl font-bold text-gray-900 text-center my-8"
              >
                The scaffold became the building.
              </motion.p>
            </div>
          </div>

          {/* Schrödinger's Cat */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary-500 to-tertiary-600 rounded-3xl p-2 mb-8"
            >
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                  Schrödinger&apos;s Cat:
                </h3>
                <p className="text-3xl font-bold text-primary-700">
                  A Cat Both Dead and Alive
                </p>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Erwin Schrödinger, brilliant and increasingly disturbed by the implications of the theory he&apos;d helped create, devised his famous cat thought experiment in 1935. It wasn&apos;t a celebration. It was a demonstration of how ridiculous quantum mechanics becomes when scaled to the everyday world.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200"
              >
                <p className="text-2xl font-bold text-gray-900 mb-4">The setup:</p>
                <ul className="space-y-3 text-xl text-gray-700">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🐱</span>
                    <span>One cat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📦</span>
                    <span>One sealed box</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🧪</span>
                    <span>One flask of poison</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">⚛️</span>
                    <span>One radioactive atom</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📡</span>
                    <span>One Geiger counter</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-700 leading-relaxed font-medium"
              >
                If the atom decays, the counter clicks, the flask shatters, the cat dies. If it doesn&apos;t decay, the cat lives.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-tertiary-100 to-accent-50 rounded-3xl p-8 border-2 border-tertiary-300 shadow-xl"
              >
                <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-6">
                  Quantum mechanics insists the atom exists in <span className="text-primary-700">superposition</span>, decayed and undecayed, until observed. Therefore, through the chain of causation, the cat itself must exist in superposition:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-4xl mb-2">🐱</p>
                    <p className="text-xl font-bold text-gray-900">Alive</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <p className="text-4xl mb-2">💀</p>
                    <p className="text-xl font-bold text-gray-900">Dead</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-md border-2 border-primary-500">
                    <p className="text-4xl mb-2">🐱💀</p>
                    <p className="text-xl font-bold text-primary-700">Both</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-primary-50 to-tertiary-50 rounded-2xl p-10 border-2 border-primary-300 shadow-lg"
              >
                <p className="text-2xl font-bold text-gray-900 mb-4">💡 Open the box...</p>
                <p className="text-xl text-gray-800 leading-relaxed mb-6">
                  and you collapse the wave function. The cat becomes definitely alive or definitely dead. But before observation, quantum mechanics demands the absurd: a cat that is neither alive nor dead, or rather both, suspended in a superposition that defies imagination.
                </p>
                <Link
                  href="/paradoxes/schrodingers-cat"
                  className="inline-flex items-center group bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
                >
                  Explore the Interactive Demo
                  <ArrowRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Final Reflection */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            >
              The Question Echoes Through Time
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-700 leading-relaxed mb-8"
            >
              We&apos;ve built a technological civilization on a theory we don&apos;t fully understand. Lasers, transistors, MRI machines, quantum computers—all function because quantum mechanics is correct. Yet <span className="font-bold text-gray-900">comprehension eludes us</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary-600 to-tertiary-700 rounded-3xl p-12 text-white shadow-2xl mb-12"
            >
              <p className="text-3xl md:text-4xl font-bold text-center leading-relaxed italic">
                We stand on the shores of an infinite ocean, waves of probability lapping at our feet, and we&apos;re only now beginning to understand how little we understand.
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-accent-500 via-primary-500 to-tertiary-600 rounded-3xl p-12 md:p-16 border-4 border-accent-300 shadow-2xl text-white text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block mb-6"
            >
              <SparklesIcon className="h-16 w-16" aria-hidden="true" />
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              What mysteries call to you now?
            </h3>
            <p className="text-2xl md:text-3xl leading-relaxed mb-8 font-light opacity-95">
              Because in quantum mechanics, every question is an invitation, every confusion a doorway, every impossibility a hint that reality is richer, deeper, more beautiful than we dare imagine.
            </p>
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              The universe is speaking.
            </motion.p>
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-4xl md:text-5xl font-black"
            >
              Are you listening?
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-20 pt-12 border-t-2 border-gray-200"
          >
            <p className="text-2xl font-bold text-gray-900 text-center mb-8">
              Ready to dive deeper?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/paradoxes"
                className="group bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl p-8 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <span className="text-4xl block mb-4">🧩</span>
                <h4 className="text-xl font-bold mb-2">Paradoxes</h4>
                <p className="text-primary-100">Mind-bending conundrums</p>
              </Link>
              <Link
                href="/articles"
                className="group bg-gradient-to-br from-tertiary-500 to-tertiary-600 text-white rounded-2xl p-8 hover:from-tertiary-600 hover:to-tertiary-700 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <span className="text-4xl block mb-4">📚</span>
                <h4 className="text-xl font-bold mb-2">Articles</h4>
                <p className="text-tertiary-100">Deep dives into quantum consciousness</p>
              </Link>
              <Link
                href="/curiosity"
                className="group bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-2xl p-8 hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <span className="text-4xl block mb-4">✨</span>
                <h4 className="text-xl font-bold mb-2">Daily Curiosity</h4>
                <p className="text-accent-100">Your daily dose of wonder</p>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
