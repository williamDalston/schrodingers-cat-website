'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, LightBulbIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function CuriosityPage() {
  // Track page view analytics
  useEffect(() => {
    const trackView = async () => {
      const userEmail = localStorage.getItem('newsletter_email')
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'page_view',
            event_data: { page: 'curiosity' },
            user_email: userEmail,
            page_path: '/curiosity',
          }),
        })
      } catch (error) {
        console.error('Failed to track page view:', error)
      }
    }
    trackView()
  }, [])
  const curiosityEntries = [
    {
      id: 1,
      title: 'The Butterfly Effect',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'What if a butterfly flapping its wings in Brazil could cause a tornado in Texas?',
        explanation: 'The Butterfly Effect describes how tiny, seemingly insignificant events can cascade through complex systems to produce enormous, unpredictable outcomes. This concept comes from chaos theory, which studies how small changes in initial conditions can lead to vastly different results in dynamical systems.',
        example: 'Imagine you\'re late for work because you hit snooze one extra time. That delay might make you miss a bus, causing you to take a different route where you bump into an old friend. That friend shares a business idea that changes your entire career trajectory. A tiny snooze button press could literally redirect your life.',
        insight: 'The world isn\'t just complicated—it\'s inherently chaotic in the mathematical sense. This doesn\'t mean random, but rather that small input variations lead to dramatically different outputs, making long-term prediction nearly impossible for complex systems like weather, stock markets, or human societies.',
        takeaway: 'Every moment matters, because every moment is a fork in the road that leads to infinite possible futures. Your smallest action today could ripple through time in ways you\'ll never know.'
      }
    },
    {
      id: 2,
      title: 'The Infinite Hotel',
      date: 'December 2024',
      readTime: '4 min',
      content: {
        intro: 'A hotel with infinite rooms is fully booked. Can it still accept a new guest?',
        explanation: 'Hilbert\'s Hotel Paradox, proposed by German mathematician David Hilbert, demonstrates the bizarre nature of infinite sets. Even when completely full, a hotel with infinite rooms can always accommodate more guests through the counterintuitive properties of infinity.',
        example: 'When a new guest arrives, the hotel manager asks everyone to shift to the next room (guest in room 1 moves to room 2, guest in room 2 moves to room 3, and so on). This frees up room 1 for the new guest. For an infinite bus of new guests, you can move each current guest from room n to room 2n, freeing up all odd-numbered rooms.',
        insight: 'Infinity doesn\'t behave like ordinary numbers. In mathematics, different sizes of infinity exist, and operations that seem impossible with finite numbers become perfectly valid with infinite sets.',
        takeaway: 'Our intuition about space, capacity, and size completely breaks down at infinity. Sometimes, the impossible is just a matter of scale.'
      }
    },
    {
      id: 3,
      title: 'Quantum Entanglement',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'Two particles separated by galaxies can instantly "know" what happens to each other.',
        explanation: 'Quantum entanglement is a phenomenon where two particles become mysteriously linked, sharing the same quantum state. When you measure one particle, you instantly know the state of its partner—no matter how far apart they are. Einstein called this "spooky action at a distance."',
        example: 'Imagine two gloves: a left glove and a right glove. You randomly put each in a box and send one box to Mars. When you open your box on Earth and see a left glove, you instantly know the one on Mars is right-handed—without any communication.',
        insight: 'This isn\'t just quantum weirdness. Entanglement is being used right now for quantum computing, quantum cryptography, and possibly for future "quantum internet." It\'s also making physicists reconsider fundamental questions about space, time, and locality.',
        takeaway: 'The universe might be more interconnected than we can imagine. Particles billions of light-years apart might share a deeper, immediate connection that transcends distance itself.'
      }
    },
    {
      id: 4,
      title: 'The Monty Hall Problem',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'Should you stick with your first choice or switch? The answer will blow your mind.',
        explanation: 'You\'re on a game show with three doors: two goats, one car. You pick Door 1. The host opens Door 3, revealing a goat. Now you can stick with Door 1 or switch to Door 2. Should you switch? Mathematically, switching gives you a 2/3 chance of winning, while staying gives you only 1/3.',
        example: 'Try this: imagine there are 100 doors instead of 3. You pick Door 1. The host opens 98 doors with goats, leaving only Door 1 (yours) and Door 67. Would you switch? The probability is overwhelming that you should—your initial pick had a 1% chance, so Door 67 has a 99% chance of being the winner.',
        insight: 'Our brains are terrible at probability and conditional thinking. This puzzle stumped mathematicians, including Paul Erdős, one of the 20th century\'s greatest mathematicians. He refused to believe switching was better until he saw computer simulations.',
        takeaway: 'Your intuition about probability is probably wrong. When new information arrives, you need to completely recalculate your odds—not just slightly adjust them.'
      }
    },
    {
      id: 5,
      title: 'Dark Matter Mystery',
      date: 'December 2024',
      readTime: '7 min',
      content: {
        intro: '85% of all matter in the universe is invisible and mysterious. We can\'t see it, touch it, or detect it directly.',
        explanation: 'Dark matter is hypothesized matter that doesn\'t interact with light or electromagnetic radiation at all. We know it exists because galaxies spin too fast—without dark matter\'s gravitational pull, stars would fly off into space. But we have no idea what it actually is.',
        example: 'Imagine watching a playground merry-go-round spinning normally, then suddenly seeing it spin at impossible speeds without any extra visible weight or force. That\'s our universe—spinning way too fast, held together by something we can\'t detect.',
        insight: 'Dark matter might not be "stuff" at all. Some theories suggest gravity itself behaves differently at galactic scales. Or perhaps dark matter is made of as-yet-undiscovered particles. This mystery sits at the heart of our understanding of the cosmos.',
        takeaway: 'We\'ve mapped stars billions of light-years away, yet we\'re surrounded by invisible matter we barely understand. The universe is mostly unknown to us.'
      }
    },
    {
      id: 6,
      title: 'The Simulated Reality',
      date: 'December 2024',
      readTime: '8 min',
      content: {
        intro: 'There\'s a significant chance you\'re living in a computer simulation right now.',
        explanation: 'The Simulation Hypothesis, popularized by philosopher Nick Bostrom, argues that if civilizations can create realistic simulations with conscious beings, then the number of simulated minds could vastly outnumber "real" ones. Statistically, you\'re probably a simulation.',
        example: 'Imagine future humans create perfect simulated worlds with conscious inhabitants. They run billions of simulations. Meanwhile, there\'s only one "real" universe. Odds are, you\'re in one of those simulations—not the original reality.',
        insight: 'This isn\'t just science fiction. Some physicists take it seriously enough to look for potential "glitches in the Matrix"—anomalies in physics that might suggest we\'re in a simulation. Others argue consciousness can\'t be simulated, making the whole idea invalid.',
        takeaway: 'Reality might have layers we can\'t perceive. Whether you\'re "real" or simulated, your experience of being alive is equally valid and meaningful.'
      }
    },
    {
      id: 7,
      title: 'The Fermi Paradox',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'The universe is 13.8 billion years old and vast. So where is everyone?',
        explanation: 'Named after physicist Enrico Fermi, this paradox points out the contradiction between estimates of intelligent extraterrestrial life (trillions of potentially habitable planets) and the complete absence of evidence that aliens exist. If life is common, why haven\'t we detected any signs?',
        example: 'Our Milky Way alone has 100 billion stars. Even if only 0.1% have habitable planets, that\'s 100 million worlds. If intelligent life develops on even 1% of those, you get a million civilizations. Some should have spread across the galaxy by now—yet we see nothing.',
        insight: 'Possible explanations range from hopeful (we\'re too primitive to detect them) to terrifying (advanced civilizations destroy themselves) to mind-bending (we\'re a simulation and they\'re not programmed in). The "Great Filter" theory suggests something prevents most life from becoming advanced.',
        takeaway: 'Either we\'re extremely rare and special, or we\'re extremely young and naive. The silence of the cosmos might be telling us something profound about life, intelligence, and our place in the universe.'
      }
    },
    {
      id: 8,
      title: 'The Double-Slit Experiment',
      date: 'December 2024',
      readTime: '7 min',
      content: {
        intro: 'A single particle can pass through two holes simultaneously, but only when you\'re not looking.',
        explanation: 'In quantum mechanics\' most famous experiment, particles like electrons or photons are fired at a barrier with two slits. When unobserved, they create an interference pattern—behaving like waves passing through both slits. But when you measure which slit they pass through, they suddenly behave like particles, going through only one slit. The act of observation fundamentally changes reality.',
        example: 'Imagine throwing a baseball through two open windows simultaneously. Impossible, right? But at the quantum level, a single electron does exactly that—unless you try to see which window it goes through. The moment you look, it "chooses" a window like a normal particle.',
        insight: 'This isn\'t just quantum weirdness. It\'s proof that observation isn\'t passive—measuring reality actually alters it. The wave function, which describes all possible states, collapses into a single definite state when measured. This suggests reality might be probabilistic until consciousness or measurement forces it to "decide."',
        takeaway: 'Reality might exist as a cloud of possibilities until consciousness collapses it into concrete experience. Your attention doesn\'t just observe the world—it might literally create it.'
      }
    },
    {
      id: 9,
      title: 'The Boltzmann Brain',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'It\'s statistically more likely that you\'re a random brain floating in space than a real person reading this.',
        explanation: 'The Boltzmann Brain paradox, named after physicist Ludwig Boltzmann, arises from thermodynamics. In an infinite universe, random fluctuations can create complex structures. Given enough time and space, it\'s more probable that a fully-formed brain with false memories (including the memory of reading this) would spontaneously form than that the entire universe and your life actually exist as you remember.',
        example: 'Imagine the universe is eternal and infinite. Over trillions of years, random particles occasionally arrange themselves into complex patterns. Most times, it\'s just noise. But once in a trillion trillion years, particles might randomly form a complete brain with false memories. Statistically, you\'re probably that random brain, not a real person with a real history.',
        insight: 'This paradox highlights a problem with certain cosmological models. If the universe is truly random and infinite, then the most complex, unlikely structures (like entire civilizations) are less probable than simpler, isolated brains with false memories. This suggests our universe might have special initial conditions or be part of a larger multiverse.',
        takeaway: 'Either the universe had special starting conditions, or you\'re probably a random brain hallucinating reality. Both answers are equally mind-bending and suggest we\'re missing something fundamental about existence.'
      }
    },
    {
      id: 10,
      title: 'The Hard Problem of Consciousness',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'Why does information processing feel like anything at all?',
        explanation: 'The "hard problem" of consciousness, coined by philosopher David Chalmers, asks why physical processes in the brain produce subjective experience. We can explain how neurons fire and how information is processed (the "easy problems"), but we can\'t explain why those processes feel like anything. Why isn\'t the brain just a complex information processor without any inner experience?',
        example: 'Imagine two identical computers processing the same information. One has consciousness—it feels the color red, experiences pain, knows what it\'s like to be. The other is just processing data without any inner experience. What\'s the difference? From the outside, they might be identical, yet one has something the other lacks: subjective experience.',
        insight: 'This challenges materialism—the idea that everything is physical. If consciousness emerges from physical processes, why does it feel like anything? Some theories suggest consciousness is fundamental (like space or time), not emergent. Others propose it might be a property of information itself. We might need new physics to understand it.',
        takeaway: 'Your inner experience—the redness of red, the taste of chocolate, the feeling of being you—might be the greatest unsolved mystery in science. Understanding consciousness could revolutionize our view of reality itself.'
      }
    },
    {
      id: 11,
      title: 'The Prisoner\'s Dilemma',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'Rational self-interest leads to the worst possible outcome for everyone.',
        explanation: 'Two criminals are arrested and interrogated separately. Each can either betray the other or stay silent. If both stay silent, they get 1 year each. If one betrays and one stays silent, the betrayer goes free and the other gets 10 years. If both betray, they both get 5 years. Rational self-interest says betray—but this makes everyone worse off than cooperation.',
        example: 'This applies everywhere: climate change (why reduce emissions if others don\'t?), arms races (why disarm if enemies don\'t?), business competition (why not undercut prices?). In each case, cooperation benefits everyone, but individual rationality pushes toward defection.',
        insight: 'The Prisoner\'s Dilemma reveals a fundamental tension between individual and collective rationality. It explains why cooperation is so difficult and why we need institutions, trust, and repeated interactions to enable collaboration. Evolutionary game theory shows how cooperation can emerge through strategies like "tit-for-tat" in repeated games.',
        takeaway: 'Sometimes, doing what\'s best for yourself makes everyone—including you—worse off. Understanding this paradox is key to solving humanity\'s biggest collective challenges, from climate change to global cooperation.'
      }
    },
    {
      id: 12,
      title: 'Zeno\'s Paradoxes',
      date: 'December 2024',
      readTime: '4 min',
      content: {
        intro: 'Motion is impossible. You can never reach your destination.',
        explanation: 'Ancient Greek philosopher Zeno proposed several paradoxes showing motion is logically impossible. The most famous: To walk from point A to B, you must first reach the midpoint. But to reach that midpoint, you must reach its midpoint. This creates infinite midpoints, and since you can\'t complete an infinite series, you can never reach B—or even take a single step.',
        example: 'Achilles and a tortoise race. The tortoise starts ahead. To catch up, Achilles must reach where the tortoise was. But by then, the tortoise has moved. Achilles must then reach the new position, but again the tortoise moves. This continues infinitely—Achilles never catches up (even though we know he obviously does).',
        insight: 'Zeno\'s paradoxes puzzled mathematicians for over 2,000 years until calculus solved them. The key insight: infinite series can sum to finite values. You can traverse infinite points in finite time because each step takes proportionally less time. Modern physics shows space and time might be quantized (not continuous), which would also resolve the paradox.',
        takeaway: 'Sometimes logic and intuition conflict. Zeno\'s paradoxes reveal that infinity behaves counterintuitively—understanding this led to calculus, one of humanity\'s greatest mathematical achievements.'
      }
    },
    {
      id: 13,
      title: 'The Measurement Problem',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'When does a quantum particle "decide" to become real?',
        explanation: 'Quantum particles exist in superpositions—multiple states simultaneously. But when measured, they collapse into a single definite state. The measurement problem asks: what counts as measurement? Is it consciousness? Interaction with larger systems? Where is the boundary between quantum weirdness and classical reality?',
        example: 'A photon exists as a wave until it hits your eye, then becomes a particle. But when exactly does this happen? When it hits your retina? When neurons process it? When you become conscious of it? If a tree falls in a forest and no one measures it, does it exist in a quantum superposition?',
        insight: 'This isn\'t just philosophy—it matters for quantum computing, where maintaining superpositions is crucial. Different interpretations (Copenhagen, Many-Worlds, objective collapse) propose different solutions. Some suggest consciousness causes collapse; others say any interaction with the environment does; some propose spontaneous collapse at a certain scale.',
        takeaway: 'The boundary between quantum and classical reality might be blurrier than we thought. Understanding measurement could unlock quantum computing\'s full potential and reveal something profound about reality itself.'
      }
    },
    {
      id: 14,
      title: 'The Anthropic Principle',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'The universe is fine-tuned for life. Coincidence, or something deeper?',
        explanation: 'The physical constants of our universe appear perfectly calibrated for life. If gravity were slightly stronger, stars would burn out too fast. If the strong nuclear force were slightly weaker, atoms couldn\'t form. Change any constant by even 1%, and life becomes impossible. The Anthropic Principle offers two explanations: either we\'re incredibly lucky, or there are infinite universes with different constants, and we only observe one compatible with life.',
        example: 'Imagine a puddle waking up and noticing it fits perfectly in its hole. "This hole was made for me!" it thinks. But really, the hole shaped the puddle, not vice versa. Are we the puddle—observing a universe that seems designed for us, when really we\'re just shaped by its conditions?',
        insight: 'The multiverse theory (many universes with different constants) makes fine-tuning less mysterious—of course we exist in a universe compatible with life. But it raises new questions: if infinite universes exist, what does that mean for reality? The principle also connects to the Fermi Paradox—maybe life is incredibly rare because most universes don\'t permit it.',
        takeaway: 'Either we won an incomprehensible cosmic lottery, or we\'re one universe among infinite others. Both possibilities challenge our understanding of existence and our place in reality.'
      }
    },
    {
      id: 15,
      title: 'The Liar Paradox',
      date: 'December 2024',
      readTime: '4 min',
      content: {
        intro: 'This sentence is false. If it\'s true, it\'s false. If it\'s false, it\'s true.',
        explanation: 'The Liar Paradox appears when a statement refers to its own truth value. "This sentence is false" creates an infinite loop: if it\'s true, then it\'s false, but if it\'s false, then it\'s true. This simple paradox has profound implications for logic, mathematics, and computer science—it suggests truth itself might be fundamentally incomplete.',
        example: 'A Cretan says, "All Cretans are liars." If he\'s telling the truth, then all Cretans (including him) are liars, so he\'s lying. But if he\'s lying, then not all Cretans are liars, so he might be telling the truth. This creates an unsolvable logical loop.',
        insight: 'Kurt Gödel used similar self-referential logic to prove his incompleteness theorems: any mathematical system complex enough to describe arithmetic must be either incomplete (some truths can\'t be proven) or inconsistent (some statements are both true and false). This shattered the dream of complete, provable mathematical truth.',
        takeaway: 'Self-reference creates paradoxes that reveal limits to logic itself. Some truths might be fundamentally unprovable, and some questions might have no definitive answers—not because we\'re ignorant, but because reality itself is logically incomplete.'
      }
    },
    {
      id: 16,
      title: 'The Observer Effect vs. Observer Effect',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'Two different "observer effects"—one quantum, one psychological—and why they both matter.',
        explanation: 'The quantum observer effect: measuring a quantum system inevitably disturbs it, so you can\'t observe without changing. The psychological observer effect: people behave differently when they know they\'re being watched. Both reveal that observation isn\'t passive—looking at reality changes it, whether you\'re a physicist or a social scientist.',
        example: 'In quantum mechanics, measuring a particle\'s position requires bouncing photons off it, which changes its momentum. In psychology, employees work differently when supervisors are present. In both cases, the act of observation creates the reality you\'re trying to measure.',
        insight: 'These effects challenge objectivity. Can we ever truly observe reality as it is, independent of observation? Quantum mechanics suggests no—measurement creates reality. Social sciences suggest no—awareness of observation changes behavior. Both point toward a universe where observation and reality are deeply entangled.',
        takeaway: 'Pure objectivity might be impossible. Every observation is also an interaction that shapes what you observe. Understanding this helps in both quantum experiments and understanding human behavior—reality responds to being noticed.'
      }
    },
    {
      id: 17,
      title: 'The Chinese Room Argument',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'Can a computer that perfectly mimics understanding actually understand anything?',
        explanation: 'Philosopher John Searle proposed this thought experiment: imagine a room where a person who doesn\'t speak Chinese receives Chinese characters through a slot, looks them up in a rulebook, and outputs appropriate responses. From outside, it appears fluent in Chinese, but inside, there\'s no understanding—just symbol manipulation. Searle argues this proves that AI, even if it passes the Turing Test, might not have true understanding or consciousness.',
        example: 'ChatGPT can write essays about love, but does it feel love? It can discuss pain, but does it experience pain? The Chinese Room suggests these are different things—syntax (symbol manipulation) versus semantics (meaning). Perfect simulation might not be equivalent to genuine understanding.',
        insight: 'This debate rages in AI research. Some argue understanding emerges from complex computation; others say consciousness requires something beyond computation. As AI grows more sophisticated, this question becomes urgent: if an AI acts like it understands, does that matter more than whether it "actually" understands? And how would we know the difference?',
        takeaway: 'Understanding versus mimicking understanding might be the most important distinction as AI advances. The difference could determine whether we\'re creating tools or creating minds.'
      }
    },
    {
      id: 18,
      title: 'Heisenberg\'s Uncertainty Principle',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'The more precisely you know where something is, the less you can know about where it\'s going.',
        explanation: 'Werner Heisenberg discovered that certain pairs of properties (like position and momentum, or energy and time) cannot both be precisely measured simultaneously. It\'s not a limitation of our instruments—it\'s a fundamental property of quantum reality. The more accurately you measure one, the more uncertain the other becomes.',
        example: 'Think of taking a photo with your phone. In low light, you can either capture a sharp, well-lit image (slow shutter = precise position, blurry motion) or freeze fast motion (fast shutter = precise momentum, unclear position). Quantum mechanics says this isn\'t just a camera limitation—it\'s how reality works at the smallest scales.',
        insight: 'This isn\'t just quantum weirdness—it has practical implications. Electron microscopes must balance resolution and energy disturbance. Quantum cryptography relies on uncertainty: any attempt to measure quantum states disturbs them, revealing eavesdropping. The principle suggests reality itself might be fundamentally fuzzy at its core.',
        takeaway: 'Perfect precision might be impossible, not because we\'re limited, but because reality is. Uncertainty isn\'t a bug in quantum mechanics—it\'s a feature of how the universe actually works.'
      }
    },
    {
      id: 19,
      title: 'The Trolley Problem',
      date: 'December 2024',
      readTime: '4 min',
      content: {
        intro: 'Would you kill one person to save five? There\'s no right answer.',
        explanation: 'A runaway trolley is heading toward five people. You can pull a lever to divert it onto a track with one person, killing them instead. Do you pull the lever? This simple thought experiment reveals deep conflicts in moral reasoning. Utilitarians say yes (save more lives). Deontologists might say no (don\'t actively kill). Both positions have compelling arguments.',
        example: 'Variations make it harder: what if the one person is your family member? What if you must push a fat man onto the track (more active killing)? What if it\'s a choice between your child and five strangers? Each variation reveals different moral intuitions and inconsistencies in our ethical reasoning.',
        insight: 'This isn\'t just philosophy—self-driving cars face real trolley problems. Should a car swerve to avoid pedestrians even if it kills the passenger? Different cultures give different answers. The problem shows that moral reasoning isn\'t straightforward, even for seemingly simple choices.',
        takeaway: 'Ethics is messier than we want to admit. The trolley problem reveals that "doing the right thing" might be impossible to define objectively—and that\'s exactly why we need to think carefully about moral choices.'
      }
    },
    {
      id: 20,
      title: 'Occam\'s Razor and Its Limits',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'The simplest explanation is usually right. Usually. But when is it wrong?',
        explanation: 'Occam\'s Razor, attributed to William of Ockham, states that when multiple explanations fit the evidence, prefer the simplest one. This principle has guided scientific thinking for centuries. But is simplicity always truth? Sometimes, reality is genuinely complex, and the simplest explanation misses crucial details or leads us astray.',
        example: 'A magician pulls a rabbit from a hat. Simplest explanation: rabbits naturally appear in hats. Better explanation: elaborate illusion with hidden compartments. Truth isn\'t always simple. In science, evolution is more complex than creationism, but it better explains the evidence. Sometimes complexity is necessary for accuracy.',
        insight: 'Occam\'s Razor is a heuristic, not a law. It helps avoid unnecessary complexity but can also blind us to genuine complexity. Quantum mechanics isn\'t simple, but it\'s accurate. Climate models are complex, but necessary. The razor cuts both ways—simplicity is useful, but reality doesn\'t always conform to our preferences for elegant explanations.',
        takeaway: 'Prefer simplicity, but don\'t confuse it with truth. Sometimes the universe is genuinely complicated, and the best explanation requires embracing that complexity rather than shaving it away.'
      }
    },
    {
      id: 21,
      title: 'The Boltzmann Entropy Paradox',
      date: 'December 2024',
      readTime: '6 min',
      content: {
        intro: 'Why does time have a direction? The answer lies in entropy and probability.',
        explanation: 'The second law of thermodynamics says entropy (disorder) always increases. But why? The laws of physics work equally well forward and backward in time—yet we only observe entropy increasing. Boltzmann proposed that entropy isn\'t a law, but statistical probability: disorder is more likely than order, so over time, systems trend toward disorder.',
        example: 'A shuffled deck of cards is more likely than an ordered deck, not because of a law, but because there are far more ways to be shuffled than ordered. The universe started in an extremely ordered (low entropy) state and is naturally moving toward disorder. This gives time its arrow.',
        insight: 'This raises profound questions: why did the universe start in such an ordered state? Some suggest our universe is just a fluctuation in an infinite, mostly chaotic cosmos. Others propose the multiverse, where most universes are chaotic, but we observe one that started ordered. The arrow of time might be an illusion created by our low-entropy past.',
        takeaway: 'Time\'s direction might be an illusion created by probability. The universe is moving from order to disorder not because of a law, but because disorder is overwhelmingly more likely. This suggests our experience of time might be fundamentally statistical, not fundamental.'
      }
    },
    {
      id: 22,
      title: 'The Raven Paradox',
      date: 'December 2024',
      readTime: '5 min',
      content: {
        intro: 'Every non-black, non-raven thing you see is evidence that all ravens are black.',
        explanation: 'The statement "All ravens are black" is logically equivalent to "All non-black things are non-ravens." If you observe a red apple (a non-black, non-raven), this technically confirms the second statement, which means it also confirms the first—that all ravens are black. But intuitively, a red apple tells us nothing about ravens.',
        example: 'You want to test "all ravens are black." You see a raven—it\'s black. That\'s evidence. You see another raven—also black. More evidence. But then you see a green car. Logically, this green (non-black) car confirms "all non-black things are non-ravens," which confirms your raven hypothesis. But clearly, a green car is irrelevant to ravens.',
        insight: 'This paradox reveals problems with naive confirmation theory. Not all confirmations are equal. A black raven strongly confirms the hypothesis; a green car weakly confirms it (technically) but provides no real information. The paradox shows that evidence needs to be relevant, not just logically consistent.',
        takeaway: 'Logic and intuition can conflict. Just because something is technically true doesn\'t mean it\'s meaningful. Understanding evidence requires considering relevance and information content, not just logical consistency.'
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex p-5 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl mb-6 shadow-lg">
            <LightBulbIcon className="h-12 w-12 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Daily Curiosity
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your daily dose of fascinating science, thought experiments, and awe-inspiring discoveries.
          </p>
        </div>

        <div className="space-y-8">
          {curiosityEntries.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary-200 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                      Today&apos;s Curiosity
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                      Curious Entry #{entry.id}
                    </span>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span>{entry.date}</span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" aria-hidden="true" />
                      {entry.readTime}
                    </span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{entry.title}</h2>
              </div>

              <div className="p-8 md:p-10">
                <p className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
                  {entry.content.intro}
                </p>

                <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Explanation</h3>
                    <p className="leading-relaxed">{entry.content.explanation}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">A Real Example</h3>
                    <p className="leading-relaxed">{entry.content.example}</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Matters</h3>
                    <p className="leading-relaxed">{entry.content.insight}</p>
                  </section>

                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-l-4 border-primary-600 p-6 rounded-r-lg my-8">
                    <p className="text-gray-800 italic text-lg font-medium leading-relaxed">
                      &quot;{entry.content.takeaway}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want More?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Subscribe to get a fascinating curiosity delivered to your inbox every single day. Free forever.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Subscribe to Newsletter
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

