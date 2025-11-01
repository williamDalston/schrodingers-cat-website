/**
 * Quantum Consciousness Article Series
 * 
 * Based on interview with philosopher Kelvin McQueen (Chapman University)
 * A deep dive into how quantum mechanics intersects with consciousness.
 * 
 * Series Strategy:
 * - Start with primers → theories → critiques → tests
 * - End with "Reader Debate: Vote Your Favorite Theory"
 * - Timeline: 1 primer/week → 3-month series (50k+ words total)
 * 
 * SEO Keywords: "quantum consciousness," "wave function collapse," 
 * "many worlds multiverse," "Penrose microtubules," "IIT phi consciousness."
 */

export type ArticleCategory = 
  | 'primer' 
  | 'theory' 
  | 'critique' 
  | 'experiment' 
  | 'opinion'

export type ArticleLength = 'short' | 'medium' | 'long'

export type ArticleStatus = 'planned' | 'outlined' | 'draft' | 'published'

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  length: ArticleLength
  wordCount: number
  status: ArticleStatus
  angle: string
  transcriptHooks: string[]
  whyItWorks: string
  seoKeywords: string[]
  visuals?: string[]
  priority: number // 1 = highest priority
  relatedParadoxes?: string[] // Links to paradox pages
  estimatedWritingTime?: string
  content?: string // Full article content (HTML/markdown) - only when status is 'published' or 'draft'
}

export const quantumConsciousnessArticles: Article[] = [
  // ========================================
  // 1. PRIMER ARTICLES (Build Audience – Short, 1500 words)
  // ========================================
  {
    id: 'qc-primer-001',
    title: 'Why Quantum Mechanics Might Explain Your Thoughts',
    category: 'primer',
    length: 'short',
    wordCount: 1500,
    status: 'published',
    angle: 'Elevator pitch: Hard problem → Classical fails → Quantum superposition/entanglement. Infographic: Neuron network vs. quantum weirdness.',
    transcriptHooks: [
      '"How could billions of neurons give rise to the reddishness of red?"',
      'Classical physics "runs out at a certain scale."'
    ],
    whyItWorks: 'Hooks curious readers; SEO: "quantum consciousness explained." Series entry point.',
    seoKeywords: ['quantum consciousness', 'quantum mechanics', 'consciousness explained', 'hard problem of consciousness'],
    visuals: ['Neuron network vs. quantum weirdness infographic'],
    priority: 1,
    relatedParadoxes: ['schrodingers-cat'],
    estimatedWritingTime: '4-6 hours'
  },
  {
    id: 'qc-primer-002',
    title: 'The Measurement Problem: Where Quantum Weirdness Meets Reality',
    category: 'primer',
    length: 'short',
    wordCount: 1500,
    status: 'published',
    angle: 'Animate Von Neumann chain: Particle → Device → Brain → Collapse?',
    transcriptHooks: [
      '"Superposition magnifies up... brain in superposition of experiencing A or B."'
    ],
    whyItWorks: 'Core QM topic; ties to Schrödinger\'s Cat. Viral potential.',
    seoKeywords: ['measurement problem', 'wave function collapse', 'quantum measurement', 'schrodingers cat'],
    visuals: ['Animated Von Neumann chain diagram'],
    priority: 1,
    relatedParadoxes: ['schrodingers-cat'],
    estimatedWritingTime: '4-6 hours'
  },
  {
    id: 'qc-primer-003',
    title: 'Wigner\'s Friend Paradox: Two Realities, One Lab',
    category: 'primer',
    length: 'short',
    wordCount: 1500,
    status: 'planned',
    angle: 'Thought experiment comic: Inside/outside box views clash.',
    transcriptHooks: [
      '"Friend sees definite outcome; Wigner sees superposition."'
    ],
    whyItWorks: 'Mind-bending; great for Twitter threads/X posts.',
    seoKeywords: ['wigners friend', 'quantum paradox', 'quantum observer', 'multiple realities'],
    visuals: ['Inside/outside box thought experiment comic'],
    priority: 2,
    estimatedWritingTime: '4-6 hours'
  },

  // ========================================
  // 2. THEORY DEEP DIVES (Core Content – Medium, 2500 words)
  // ========================================
  {
    id: 'qc-theory-001',
    title: 'Does Consciousness Cause Wave Function Collapse? Wigner vs. Everyone',
    category: 'theory',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Pro/con debate; McQueen\'s IIT upgrade for tests.',
    transcriptHooks: [
      '"Superpositions of consciousness are unstable... bites back and causes collapse."'
    ],
    whyItWorks: 'Controversial; pits philosophy vs. physics.',
    seoKeywords: ['wave function collapse', 'consciousness collapse', 'wigner interpretation', 'quantum consciousness'],
    priority: 1,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-theory-002',
    title: 'Many Worlds: You Split Into Infinite Conscious Selves',
    category: 'theory',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Pros (solves measurement), cons (probability/Born rule). Quantum immortality sidebar.',
    transcriptHooks: [
      '"Branching into observer seeing A and seeing B... across many parallel universes."',
      '"50% of realist physicists favor it?"'
    ],
    whyItWorks: 'Multiverse hype; "50% of realist physicists favor it?" Poll readers.',
    seoKeywords: ['many worlds', 'multiverse', 'quantum immortality', 'many worlds interpretation', 'parallel universes'],
    visuals: ['Multiverse branch diagrams'],
    priority: 1,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-theory-003',
    title: 'Penrose-Hameroff: Quantum Computers Hiding in Your Microtubules',
    category: 'theory',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Orch-OR explained; mass threshold challenge.',
    transcriptHooks: [
      '"Collapse gives rise to consciousness... entanglement across neurons."'
    ],
    whyItWorks: 'Penrose celebrity; visuals of microtubules.',
    seoKeywords: ['penrose hameroff', 'orch-or', 'microtubules', 'quantum biology', 'orchestrated objective reduction'],
    visuals: ['Microtubule diagrams', 'Quantum entanglement across neurons'],
    priority: 2,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-theory-004',
    title: 'Integrated Information Theory: Math Formula for Consciousness (Φ)',
    category: 'theory',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Degrees of consciousness; quantum superposition tests.',
    transcriptHooks: [
      '"Put system in superposition of two Φ structures → collapse."'
    ],
    whyItWorks: 'Testable! Predicts quantum computing limits.',
    seoKeywords: ['integrated information theory', 'IIT', 'phi consciousness', 'consciousness formula', 'tononi'],
    priority: 1,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-theory-005',
    title: 'Quantum IIT: Consciousness at Atomic Scales?',
    category: 'theory',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Albantoni\'s work; compares neuron vs. microtubule Φ max.',
    transcriptHooks: [
      '"Replace classical probabilities with density matrices."'
    ],
    whyItWorks: 'Cutting-edge; interview Koch?',
    seoKeywords: ['quantum IIT', 'atomic consciousness', 'albantoni', 'microtubule phi', 'quantum information'],
    priority: 3,
    estimatedWritingTime: '8-10 hours'
  },

  // ========================================
  // 3. CRITIQUES & CHALLENGES (Engage Debates – Long, 3500 words)
  // ========================================
  {
    id: 'qc-critique-001',
    title: 'Many Worlds\' Fatal Flaw: Where Do Probabilities Come From?',
    category: 'critique',
    length: 'long',
    wordCount: 3500,
    status: 'planned',
    angle: 'Born rule crisis; self-locating uncertainty fix?',
    transcriptHooks: [
      '"75% A / 25% B: Same branching? Amplitudes lose meaning."',
      'McQueen\'s "one big problem"'
    ],
    whyItWorks: 'Sparks comments and debate.',
    seoKeywords: ['many worlds problem', 'born rule', 'probability problem', 'self locating uncertainty'],
    priority: 2,
    estimatedWritingTime: '12-15 hours'
  },
  {
    id: 'qc-critique-002',
    title: 'Superposition = Consciousness? Koch\'s Radical Flip',
    category: 'critique',
    length: 'long',
    wordCount: 3500,
    status: 'planned',
    angle: 'Hartmut Nevanen paper; basis problem/decoherence.',
    transcriptHooks: [
      '"Moment of superposition formation... not collapse."'
    ],
    whyItWorks: 'Fresh (2025 relevance); isotope tests sidebar.',
    seoKeywords: ['superposition consciousness', 'koch', 'quantum superposition', 'nevanen', 'basis problem'],
    priority: 2,
    estimatedWritingTime: '12-15 hours'
  },
  {
    id: 'qc-critique-003',
    title: 'Faggin\'s Quantum Fields: Inventor Says Universe Wants to Know Itself',
    category: 'critique',
    length: 'long',
    wordCount: 3500,
    status: 'planned',
    angle: 'Idealism vs. no-cloning; McQueen\'s cloning objection.',
    transcriptHooks: [
      '"Experiences as pure quantum states... but how do YOU remember yours?"'
    ],
    whyItWorks: '2.5M-view interview tie-in; philosophical fireworks.',
    seoKeywords: ['faggin quantum fields', 'quantum idealism', 'universe consciousness', 'quantum no cloning'],
    priority: 3,
    estimatedWritingTime: '12-15 hours'
  },

  // ========================================
  // 4. TESTABLE PREDICTIONS & EXPERIMENTS (Future-Focused – Interactive)
  // ========================================
  {
    id: 'qc-experiment-001',
    title: 'Can We Test Quantum Consciousness? Lab Designs Revealed',
    category: 'experiment',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'IIT superposition collapse; quantum computer breakdown.',
    transcriptHooks: [
      '"Superposition of Φ structures → deviates from Schrödinger equation."'
    ],
    whyItWorks: '"Rigorous tests"; reader experiments?',
    seoKeywords: ['quantum consciousness test', 'IIT test', 'quantum experiment', 'consciousness testing'],
    visuals: ['Lab design diagrams'],
    priority: 2,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-experiment-002',
    title: 'Lithium Isotopes: Quantum Fix for Bipolar? Brain Hack Exposed',
    category: 'experiment',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Mouse moms → human trials; spin vs. mass.',
    transcriptHooks: [
      '"Quantum differences making macroscopic phenomenal difference."'
    ],
    whyItWorks: 'Medical angle; SEO gold ("quantum mental health").',
    seoKeywords: ['lithium isotopes', 'quantum mental health', 'bipolar treatment', 'quantum biology medicine'],
    priority: 2,
    estimatedWritingTime: '8-10 hours'
  },
  {
    id: 'qc-experiment-003',
    title: 'Quantum Immortality: Russian Roulette Proves Many Worlds?',
    category: 'experiment',
    length: 'medium',
    wordCount: 2500,
    status: 'planned',
    angle: 'Tegmark\'s gun test; decrepit survival.',
    transcriptHooks: [
      '"Always a world where you survive."'
    ],
    whyItWorks: 'Existential clickbait; ethics debate.',
    seoKeywords: ['quantum immortality', 'many worlds immortality', 'russian roulette quantum', 'quantum suicide'],
    priority: 3,
    estimatedWritingTime: '8-10 hours'
  },

  // ========================================
  // 5. OPINION & ROUNDUPS (Viral/SEO – Short Lists)
  // ========================================
  {
    id: 'qc-opinion-001',
    title: 'Top 5 Quantum Consciousness Theories Ranked (By a Philosopher)',
    category: 'opinion',
    length: 'short',
    wordCount: 2000,
    status: 'planned',
    angle: '1. MWI, 2. IIT-Collapse, etc. McQueen poll.',
    transcriptHooks: [
      '"Everyone bites a bullet."'
    ],
    whyItWorks: 'Listicle; infographic.',
    seoKeywords: ['quantum consciousness theories', 'consciousness theories ranked', 'best quantum consciousness theory'],
    visuals: ['Theory ranking infographic'],
    priority: 2,
    estimatedWritingTime: '6-8 hours'
  },
  {
    id: 'qc-opinion-002',
    title: 'Quantum Brain Myths Busted: 7 Claims That Aren\'t Woo',
    category: 'opinion',
    length: 'short',
    wordCount: 2000,
    status: 'planned',
    angle: 'No "observer effect = mind over matter."',
    transcriptHooks: [
      '"Device alone enters superposition."'
    ],
    whyItWorks: 'Debunks pseudoscience; builds trust.',
    seoKeywords: ['quantum brain myths', 'quantum consciousness debunked', 'quantum woo', 'quantum pseudoscience'],
    priority: 3,
    estimatedWritingTime: '6-8 hours'
  },
  {
    id: 'qc-opinion-003',
    title: '2025 Quantum Mind Predictions: What McQueen Sees Coming',
    category: 'opinion',
    length: 'short',
    wordCount: 2000,
    status: 'planned',
    angle: 'Workshops, debates (Koch vs. Faggin?). Asencia/Tiny Blue Dot tie-in.',
    transcriptHooks: [],
    whyItWorks: 'Timely (Nov 2025); newsletter signup.',
    seoKeywords: ['quantum consciousness 2025', 'consciousness predictions', 'quantum mind future'],
    priority: 3,
    estimatedWritingTime: '6-8 hours'
  }
]

/**
 * Article #0: Series Introduction
 * "Exclusive: Kelvin McQueen's Quantum Consciousness Masterclass"
 * Full breakdown + quotes from the interview transcript
 */
export const seriesIntroduction: Article = {
  id: 'qc-series-000',
  title: 'Exclusive: Kelvin McQueen\'s Quantum Consciousness Masterclass',
  category: 'primer',
  length: 'medium',
  wordCount: 3000,
  status: 'planned',
  angle: 'Full breakdown of the interview transcript with key quotes and insights. Perfect series introduction.',
  transcriptHooks: [
    'Complete transcript breakdown with all major points',
    'Key quotes from McQueen on measurement problem, theories, critiques, and testable predictions'
  ],
  whyItWorks: 'Perfect series entry point. Readers devour exclusive expert interviews.',
  seoKeywords: ['kelvin mcqueen', 'quantum consciousness interview', 'quantum consciousness masterclass', 'philosopher interview'],
  priority: 1,
  estimatedWritingTime: '10-12 hours'
}

/**
 * Get all articles grouped by category
 */
export function getArticlesByCategory(): Record<ArticleCategory, Article[]> {
  const grouped: Record<string, Article[]> = {
    primer: [],
    theory: [],
    critique: [],
    experiment: [],
    opinion: []
  }

  quantumConsciousnessArticles.forEach(article => {
    const categoryArray = grouped[article.category]
    if (categoryArray !== undefined) {
      categoryArray.push(article)
    }
  })

  return grouped as Record<ArticleCategory, Article[]>
}

/**
 * Get articles by priority (1 = highest)
 */
export function getArticlesByPriority(): Article[] {
  return [...quantumConsciousnessArticles, seriesIntroduction].sort((a, b) => a.priority - b.priority)
}

/**
 * Get articles ready to write (planned status, sorted by priority)
 */
export function getReadyToWriteArticles(): Article[] {
  return [...quantumConsciousnessArticles, seriesIntroduction]
    .filter(article => article.status === 'planned')
    .sort((a, b) => a.priority - b.priority)
}

/**
 * Get article by ID
 */
export function getArticleById(id: string): Article | undefined {
  const allArticles = [...quantumConsciousnessArticles, seriesIntroduction]
  return allArticles.find(article => article.id === id)
}

/**
 * Series metadata and strategy
 */
export const seriesMetadata = {
  title: 'Quantum Minds: The Consciousness-Mechanics Connection',
  subtitle: 'A deep dive into how quantum mechanics intersects with consciousness',
  totalArticles: 21, // 20 + series intro
  totalWordCount: 54000, // Approximate
  estimatedMonths: 3,
  articlesPerWeek: 1,
  seoKeywords: [
    'quantum consciousness',
    'wave function collapse',
    'many worlds multiverse',
    'Penrose microtubules',
    'IIT phi consciousness'
  ],
  monetization: {
    affiliateBooks: [
      "Penrose's 'The Emperor's New Mind'",
      "Chalmers' works on consciousness"
    ],
    courses: 'QM courses',
    guestPosts: 'McQueen/Chalmers',
    social: 'X Spaces debates',
    premium: 'Patreon for "deep math" add-ons'
  },
  visuals: [
    'Quantum wavefunctions collapsing',
    'Multiverse branches',
    'Microtubule diagrams',
    'Brain scans',
    'Von Neumann chain animations'
  ],
  interactivity: [
    { tool: 'Diagrams', use: 'Von Neumann chain animation' },
    { tool: 'Quizzes', use: '"Which QM Theory Fits Your Brain?"' },
    { tool: 'Podcasts', use: 'Transcribe → audio version' }
  ]
}

