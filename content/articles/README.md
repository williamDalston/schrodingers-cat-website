# Articles Content Directory

This directory contains markdown files for all articles in the Quantum Consciousness series.

## File Naming Convention

Articles are named using their article ID from `/lib/articles.ts`:
- Example: `qc-primer-001.md` corresponds to article with `id: 'qc-primer-001'`

## Creating a New Article

### Method 1: Using the Script (Recommended)
```bash
node scripts/create-article.js qc-primer-004
```

This will:
- Create a new markdown file based on `.template.md`
- Verify the article ID exists in `lib/articles.ts`
- Provide next steps

### Method 2: Manual Creation
1. Copy `.template.md` to a new file: `[article-id].md`
2. Replace the title placeholder with your article title
3. Write your content following the template guide
4. Update status in `/lib/articles.ts` to `'published'` when ready

## Article Status

Article visibility is controlled by the `status` field in `/lib/articles.ts`:
- `'planned'` - Shows in listing but not clickable
- `'outlined'` - Work in progress
- `'draft'` - Ready for review
- `'published'` - Live and accessible

## Markdown Features

Articles support:
- ✅ Standard markdown syntax
- ✅ GitHub Flavored Markdown (GFM) - tables, task lists, etc.
- ✅ Code blocks with syntax highlighting
- ✅ Images (store in `/public/articles/[slug]/`)
- ✅ Internal links to other articles/paradoxes
- ✅ Blockquotes for quotes

## Images

Store article images in:
```
/public/articles/[article-slug]/
```

Example:
- Article: `qc-primer-001.md`
- Slug: `why-quantum-mechanics-might-explain-your-thoughts`
- Image path: `/public/articles/why-quantum-mechanics-might-explain-your-thoughts/image.jpg`
- Markdown: `![Alt text](/articles/why-quantum-mechanics-might-explain-your-thoughts/image.jpg)`

## Quick Reference

### Check Article Slug
The slug is generated from the article title. To check it:
```typescript
import { generateArticleSlug } from '@/lib/article-utils'
console.log(generateArticleSlug('Your Article Title'))
```

### Link to Related Content

**Other Articles:**
```markdown
[Article Title](/articles/article-slug)
```

**Paradoxes:**
```markdown
[Schrödinger's Cat](/paradoxes/schrodingers-cat)
```

**External Links:**
```markdown
[Link Text](https://example.com)
```

## Best Practices

1. **Word Count**: Aim for the target word count in `/lib/articles.ts`
2. **SEO**: Use keywords naturally from `article.seoKeywords`
3. **Structure**: Follow the template structure for consistency
4. **Quotes**: Use blockquotes for McQueen interview quotes
5. **Examples**: Include concrete examples and analogies
6. **Images**: Always include descriptive alt text
7. **Links**: Add internal links to related content
8. **Proofread**: Check for typos and clarity before publishing

## Current Articles

See `/lib/articles.ts` for the complete list of articles and their status.

## Need Help?

- See `.template.md` for writing guidelines
- Check `/docs/QUANTUM-CONSCIOUSNESS-SERIES.md` for series strategy
- Review existing articles in this directory for examples

