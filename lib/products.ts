import { Product, ProductCategory } from './types'

// Product catalog data
// In production, this would come from a database

export const products: Product[] = [
  {
    id: '1',
    slug: 'schrodingers-cat-poster',
    title: 'Schrödinger\'s Cat Poster',
    description: 'Beautifully designed poster explaining the famous thought experiment with elegant typography and illustrations.',
    longDescription: `Explore the fascinating world of quantum mechanics with this beautifully designed poster featuring Schrödinger's Cat thought experiment. This iconic paradox, proposed by Erwin Schrödinger in 1935, illustrates the counterintuitive nature of quantum superposition.

The poster includes:
- Clear visual explanation of the thought experiment
- Key concepts of quantum superposition and observation
- Beautiful typography and modern design
- Perfect for classrooms, offices, or home study spaces
- High-quality print-ready design

Whether you're a physics enthusiast, student, or just curious about the mysteries of the quantum world, this poster makes complex ideas accessible and visually stunning.`,
    price: 2400, // $24.00
    currency: 'USD',
    category: 'poster',
    imageUrl: '/products/schrodingers-cat-poster.jpg',
    imageGallery: [
      '/products/schrodingers-cat-poster.jpg',
      '/products/schrodingers-cat-poster-detail.jpg',
    ],
    relatedContent: ['Paradox Library'],
    relatedContentSlugs: ['paradoxes/schrodingers-cat'],
    inStock: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    slug: 'quantum-entanglement-notebook',
    title: 'Quantum Entanglement Notebook',
    description: 'Premium notebook with quantum physics illustrations and thought-provoking quotes on each page.',
    longDescription: `Capture your thoughts, ideas, and inspirations in this premium notebook featuring quantum physics themes. Each page includes subtle illustrations and thought-provoking quotes from famous physicists and philosophers.

Features:
- 120 pages of high-quality paper
- Spiral-bound for easy writing
- Quantum entanglement-inspired cover design
- Inspirational quotes on each page
- Perfect for students, researchers, and science enthusiasts

Whether you're taking notes during lectures, journaling your thoughts, or sketching out ideas, this notebook combines functionality with beautiful design inspired by the mysteries of quantum mechanics.`,
    price: 1800, // $18.00
    currency: 'USD',
    category: 'stationery',
    imageUrl: '/products/quantum-notebook.jpg',
    relatedContent: ['Daily Curiosity'],
    relatedContentSlugs: ['curiosity'],
    inStock: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    slug: 'paradox-collection-ebook',
    title: 'Paradox Collection eBook',
    description: 'Curated collection of 50 mind-bending paradoxes with detailed explanations and visual guides.',
    longDescription: `Dive deep into the world of paradoxes with this comprehensive digital collection featuring 50 of the most fascinating paradoxes from philosophy, mathematics, physics, and logic.

What's included:
- Detailed explanations of each paradox
- Historical context and origins
- Visual diagrams and illustrations
- Real-world applications and implications
- Thought experiments and exercises
- Beautifully formatted PDF (works on all devices)

Paradoxes covered include:
- Schrödinger's Cat
- The Grandfather Paradox
- The Ship of Theseus
- Russell's Paradox
- Zeno's Paradoxes
- And 45 more mind-bending concepts

Instant digital delivery - download immediately after purchase!`,
    price: 1200, // $12.00
    currency: 'USD',
    category: 'digital',
    imageUrl: '/products/paradox-ebook.jpg',
    digitalFile: '/downloads/paradox-collection-ebook.pdf',
    relatedContent: ['Paradox Library'],
    relatedContentSlugs: ['paradoxes'],
    inStock: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    slug: 'grandfather-paradox-poster',
    title: 'Grandfather Paradox Poster',
    description: 'Visual guide to the time travel paradox that challenges our understanding of causality.',
    longDescription: `Explore the mind-bending Grandfather Paradox with this beautifully designed poster. This famous thought experiment asks: what would happen if you traveled back in time and prevented your grandfather from meeting your grandmother?

The poster features:
- Clear timeline visualization
- Multiple resolution approaches
- Beautiful typography and design
- Key concepts of temporal mechanics
- Perfect educational tool

Whether you're interested in time travel, causality, or just love a good paradox, this poster makes complex philosophical concepts accessible and visually engaging.`,
    price: 2400, // $24.00
    currency: 'USD',
    category: 'poster',
    imageUrl: '/products/grandfather-paradox-poster.jpg',
    relatedContent: ['Paradox Library'],
    relatedContentSlugs: ['paradoxes/grandfather-paradox'],
    inStock: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '5',
    slug: 'ship-of-theseus-poster',
    title: 'Ship of Theseus Poster',
    description: 'Beautiful exploration of identity and continuity through the ancient philosophical paradox.',
    longDescription: `Contemplate the nature of identity with this elegant poster exploring the Ship of Theseus paradox. If every part of a ship is gradually replaced, is it still the same ship?

This poster includes:
- Visual representation of the paradox
- Key philosophical questions
- Modern applications (biological, digital identity)
- Beautiful minimalist design
- Perfect for philosophy enthusiasts

A thought-provoking addition to any space that sparks conversation about identity, continuity, and what makes something what it is.`,
    price: 2400, // $24.00
    currency: 'USD',
    category: 'poster',
    imageUrl: '/products/ship-of-theseus-poster.jpg',
    relatedContent: ['Paradox Library'],
    relatedContentSlugs: ['paradoxes'],
    inStock: true,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    slug: 'quantum-physics-sticker-pack',
    title: 'Quantum Physics Sticker Pack',
    description: 'Set of 12 beautifully designed stickers featuring quantum physics concepts and equations.',
    longDescription: `Show off your love for quantum physics with this collection of 12 high-quality vinyl stickers. Each sticker features a different quantum concept, equation, or thought experiment.

Included designs:
- Schrödinger's Cat
- Wave-particle duality
- Quantum entanglement symbol
- Heisenberg uncertainty principle
- Planck's constant
- And 7 more unique designs

Features:
- Waterproof vinyl
- UV resistant
- Easy to apply and remove
- Perfect for laptops, water bottles, notebooks
- Instant digital delivery (print-ready files)`,
    price: 800, // $8.00
    currency: 'USD',
    category: 'digital',
    imageUrl: '/products/sticker-pack.jpg',
    digitalFile: '/downloads/quantum-sticker-pack.zip',
    relatedContent: ['Daily Curiosity'],
    relatedContentSlugs: ['curiosity'],
    inStock: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '7',
    slug: 'mind-bending-paradoxes-wall-art',
    title: 'Mind-Bending Paradoxes Wall Art',
    description: 'Set of 3 minimalist posters featuring iconic paradoxes - perfect for your study or office space.',
    longDescription: `Transform your space with this collection of 3 beautifully designed paradox posters. Each poster features a minimalist design that makes complex ideas visually stunning.

The set includes:
1. Schrödinger's Cat - Quantum superposition
2. The Grandfather Paradox - Time travel causality
3. The Ship of Theseus - Identity and continuity

Each poster is:
- 11x14 inches (A4 size)
- Print-ready high-resolution files
- Instant digital delivery
- Perfect for framing or direct printing

Create a gallery of thought-provoking ideas that will inspire conversation and curiosity in any room.`,
    price: 3000, // $30.00 (for all 3)
    currency: 'USD',
    category: 'digital',
    imageUrl: '/products/paradox-wall-art-set.jpg',
    digitalFile: '/downloads/paradox-wall-art-set.zip',
    relatedContent: ['Paradox Library'],
    relatedContentSlugs: ['paradoxes'],
    inStock: true,
    createdAt: new Date('2024-02-15'),
  },
]

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category)
}

export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}

