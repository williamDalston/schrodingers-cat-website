# Article Writing Guide

Complete guide for writing and publishing articles in the Quantum Consciousness series.

## Quick Start

1. **Choose an article** from `/lib/articles.ts`
2. **Create the markdown file**: `node scripts/create-article.js <article-id>`
3. **Write your content** following the template
4. **Update status** to `'published'` when ready
5. **Test it** by visiting `/articles/[slug]`

## Article Lifecycle

### 1. Planned → Outlined
- Status: `'planned'` in `/lib/articles.ts`
- Action: Create markdown file, start writing outline
- Change status to: `'outlined'`

### 2. Outlined → Draft
- Status: `'outlined'`
- Action: Complete full draft, review content
- Change status to: `'draft'`

### 3. Draft → Published
- Status: `'draft'`
- Action: Final review, proofread, add images
- Change status to: `'published'`
- Article becomes live and accessible

## Writing Workflow

### Step 1: Create Article File
```bash
node scripts/create-article.js qc-primer-004
```

### Step 2: Write Content
Open `content/articles/[article-id].md` and write:

1. **Opening Hook** (First paragraph)
   - Grab attention
   - Pose a question or surprising fact
   - Reference the hard problem or key concept

2. **Introduction**
   - Set up the problem
   - Introduce key concepts
   - Preview what's coming

3. **Main Sections** (Use H2 headings)
   - Develop ideas logically
   - Include examples
   - Reference transcript hooks where relevant

4. **Conclusion**
   - Summarize key points
   - Connect back to opening
   - Suggest next steps

### Step 3: Add Visuals
1. Create/obtain images
2. Place in `/public/articles/[slug]/`
3. Reference in markdown:
   ```markdown
   ![Description](/articles/[slug]/image.jpg)
   ```

### Step 4: Update Status
In `/lib/articles.ts`, change:
```typescript
status: 'planned' // → 'outlined' → 'draft' → 'published'
```

### Step 5: Test & Publish
1. Visit `/articles/[slug]` to preview
2. Check formatting, links, images
3. Verify SEO metadata
4. When satisfied, status is already `'published'` ✅

## Content Guidelines

### Target Audience
- College-educated general audience
- Curious about science/philosophy
- Not necessarily experts in quantum mechanics
- Want accessible but substantive content

### Tone
- **Engaging**: Hook readers from the start
- **Authoritative**: Backed by research and expert quotes
- **Balanced**: Present multiple perspectives fairly
- **Accessible**: Explain complex ideas clearly
- **Curious**: Encourage further exploration

### Structure
1. **Hook** - First paragraph must grab attention
2. **Problem** - What question are we exploring?
3. **Context** - Why does this matter?
4. **Explanation** - Main content, build ideas
5. **Examples** - Concrete illustrations
6. **Implications** - Why it matters
7. **Conclusion** - Tie it all together

## Using Transcript Hooks

When quoting Kelvin McQueen:
```markdown
> "Direct quote from the interview"
> — Kelvin McQueen, Quantum Consciousness Interview
```

**Guidelines:**
- Use blockquotes for quotes
- Cite source as shown above
- Integrate quotes naturally into the narrative
- Explain context around quotes
- Don't over-quote—paraphrase when possible

## SEO Best Practices

### Keywords
Use keywords from `article.seoKeywords` naturally:
- In headings (H2/H3)
- In first paragraph
- Throughout content (but not forced)
- In image alt text

### Internal Linking
Link to:
- Related articles: `[text](/articles/[slug])`
- Related paradoxes: `[text](/paradoxes/[slug])`
- At least 2-3 internal links per article

### Meta Content
- First paragraph should be meta-description worthy
- Use keywords in first 100 words
- Make it compelling for search snippets

## Formatting Guidelines

### Headings
- `#` = Title (don't use in content)
- `##` = Major sections (H2)
- `###` = Subsections (H3)
- `####` = Sub-subsections (H4)

### Emphasis
- **Bold** for key terms and concepts
- *Italic* for emphasis and foreign terms
- `Code` for technical terms and code

### Lists
- Use bullet points for concepts
- Use numbered lists for steps/sequence
- Keep lists focused and scannable

### Code Blocks
For formulas or technical notation:
````markdown
```javascript
// Example code or formula
```
````

### Tables
Use for comparisons or data:
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## Image Guidelines

### Storage
- Location: `/public/articles/[article-slug]/`
- Formats: JPG, PNG, WebP
- Naming: Descriptive (e.g., `von-neumann-chain-diagram.jpg`)

### Usage
```markdown
![Alt text describing the image](/articles/[slug]/image-name.jpg)
```

### Requirements
- Descriptive alt text (for accessibility & SEO)
- Optimize file size (under 500KB when possible)
- Appropriate dimensions for web
- Credit sources if applicable

### Suggested Images
- Diagrams explaining concepts
- Infographics for comparisons
- Charts/graphs for data
- Thought experiment illustrations

## Word Count Targets

Check `article.wordCount` in `/lib/articles.ts`:
- **Primers**: 1,500 words
- **Theories**: 2,500 words
- **Critiques**: 3,500 words
- **Experiments**: 2,500 words
- **Opinions**: 2,000 words

**Flexibility**: ±10% is acceptable, prioritize quality over exact count.

## Quality Checklist

Before publishing, ensure:

### Content
- [ ] Meets word count target (±10%)
- [ ] All transcript hooks incorporated
- [ ] Clear structure with logical flow
- [ ] Examples and analogies included
- [ ] Conclusion ties everything together

### Technical
- [ ] No typos or grammar errors
- [ ] All links work correctly
- [ ] Images load and have alt text
- [ ] Code blocks formatted correctly
- [ ] Tables render properly

### SEO
- [ ] Keywords used naturally
- [ ] Internal links added (2-3 minimum)
- [ ] First paragraph is compelling
- [ ] Headings include keywords where natural

### Status
- [ ] Status updated to `'published'` in `/lib/articles.ts`
- [ ] Tested on article page
- [ ] Preview looks correct
- [ ] Share buttons work

## Publishing Checklist

When ready to publish:

1. **Content Complete**
   - [ ] Article fully written
   - [ ] All sections complete
   - [ ] Examples included

2. **Visuals**
   - [ ] Images added
   - [ ] Alt text included
   - [ ] Images optimized

3. **Links**
   - [ ] Internal links added
   - [ ] All links tested
   - [ ] External links open in new tab

4. **Status Update**
   - [ ] Changed to `'published'` in `/lib/articles.ts`
   - [ ] Commit changes
   - [ ] Deploy (if using CI/CD)

5. **Final Check**
   - [ ] Visit `/articles/[slug]` and verify
   - [ ] Check mobile responsiveness
   - [ ] Test share buttons
   - [ ] Verify SEO metadata

## Getting Help

- **Template**: See `/content/articles/.template.md`
- **Examples**: Review existing published articles
- **Series Strategy**: See `/docs/QUANTUM-CONSCIOUSNESS-SERIES.md`
- **Article Data**: Check `/lib/articles.ts` for article details

## Next Steps After Publishing

1. **Share** on social media
2. **Link** from related articles/paradoxes
3. **Track** engagement and reading time
4. **Update** related articles with links
5. **Plan** next article in series

---

**Happy writing!** 🚀
