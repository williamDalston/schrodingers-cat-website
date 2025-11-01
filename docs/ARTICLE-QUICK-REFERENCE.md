# Quantum Consciousness Articles - Quick Reference

## 🚀 Quick Start

All article data is managed in `/lib/articles.ts`. Import functions to access articles:

```typescript
import { 
  quantumConsciousnessArticles,
  seriesIntroduction,
  getArticlesByCategory,
  getArticlesByPriority,
  getReadyToWriteArticles,
  getArticleById
} from '@/lib/articles'
```

## 📊 Article Status Summary

**Total Articles**: 21 (20 + series introduction)  
**Total Word Count**: ~54,000 words  
**Estimated Timeline**: 3 months (1 article/week)

### By Category
- **Primers**: 3 articles (4,500 words) - Entry point content
- **Theories**: 5 articles (12,500 words) - Core deep dives
- **Critiques**: 3 articles (10,500 words) - Debate engagement
- **Experiments**: 3 articles (7,500 words) - Future-focused
- **Opinions**: 3 articles (6,000 words) - Viral/SEO content
- **Introduction**: 1 article (3,000 words) - Series kickoff

### By Priority
- **Priority 1** (Highest): 7 articles - Start here!
- **Priority 2**: 10 articles - Core content
- **Priority 3**: 4 articles - Nice-to-have

## 🎯 Recommended Writing Order

1. **Series Introduction** (`qc-series-000`) - Perfect entry point
2. **Primer 1**: "Why Quantum Mechanics Might Explain Your Thoughts" - Hook readers
3. **Primer 2**: "The Measurement Problem" - Core QM topic, ties to Schrödinger's Cat
4. **Theory 1**: "Does Consciousness Cause Wave Function Collapse?" - Controversial
5. **Theory 2**: "Many Worlds: Infinite Conscious Selves" - High interest
6. **Theory 4**: "Integrated Information Theory" - Testable, unique
7. Continue with remaining Priority 1 & 2 articles

## 📝 Article Template

Each article in `/lib/articles.ts` includes:
- **id**: Unique identifier
- **title**: SEO-optimized headline
- **category**: primer | theory | critique | experiment | opinion
- **length**: short | medium | long
- **wordCount**: Target word count
- **status**: planned | outlined | draft | published
- **angle**: Writing approach/hook
- **transcriptHooks**: Key quotes from McQueen interview
- **whyItWorks**: Why this article will perform well
- **seoKeywords**: Primary SEO terms
- **visuals**: Suggested visual elements
- **priority**: 1-3 (1 = highest)
- **relatedParadoxes**: Links to existing paradox pages
- **estimatedWritingTime**: Time estimate

## 🔍 Finding Articles

### Get all articles by category:
```typescript
const grouped = getArticlesByCategory()
console.log(grouped.primer) // Array of primer articles
```

### Get articles sorted by priority:
```typescript
const prioritized = getArticlesByPriority()
// Returns all articles, Priority 1 first
```

### Get ready-to-write articles:
```typescript
const ready = getReadyToWriteArticles()
// Returns all articles with status: 'planned', sorted by priority
```

### Get specific article:
```typescript
const article = getArticleById('qc-primer-001')
```

## 📈 Progress Tracking

Update article status as you work:
```typescript
// In articles.ts, change status:
status: 'outlined'  // → 'draft' → 'published'
```

## 🔗 Integration Points

### Internal Links
- Link to **Schrödinger's Cat** paradox page from measurement problem articles
- Reference related paradoxes where relevant
- Link between related articles in the series

### Products
- Penrose book affiliate links (Orch-OR articles)
- Chalmers book affiliate links (IIT articles)
- Quantum mechanics course links
- Related posters/products at natural transition points

### Engagement
- Newsletter signup CTA at end of each article
- "Which QM Theory Fits Your Brain?" quiz links
- Community discussion prompts
- Social sharing buttons

## 🎨 Visual Requirements

Each article category needs different visuals:

### Primers
- Infographics comparing concepts
- Simple diagrams
- Thought experiment illustrations

### Theories
- Complex diagrams (Von Neumann chains, microtubules)
- Theory comparison charts
- Mathematical visualizations

### Critiques
- Debate-style layouts
- Problem/argument structures
- Comparison tables

### Experiments
- Lab design diagrams
- Experimental setup illustrations
- Data visualization (when available)

### Opinions
- Ranking infographics
- Myth-busting graphics
- Timeline/prediction visuals

## 📚 Full Documentation

See `/docs/QUANTUM-CONSCIOUSNESS-SERIES.md` for:
- Complete strategy
- Publishing timeline
- SEO details
- Monetization opportunities
- Quality standards

---

**Last Updated**: Article structure created and integrated into workflow

