# Articles Quick Start

## 🚀 Create Your First Article in 3 Steps

### Step 1: Create the File
```bash
npm run create-article qc-primer-001
```
Or manually:
```bash
node scripts/create-article.js qc-primer-001
```

### Step 2: Write Content
Open `content/articles/qc-primer-001.md` and start writing!

Use the template guide in `.template.md` for structure.

### Step 3: Publish
In `/lib/articles.ts`, change status:
```typescript
status: 'published'  // Change from 'planned'
```

Visit `/articles/why-quantum-mechanics-might-explain-your-thoughts` to see it live!

## 📚 Full Documentation

- **Writing Guide**: `/docs/ARTICLE-WRITING-GUIDE.md`
- **Template**: `/content/articles/.template.md`
- **Content Directory**: `/content/articles/README.md`
- **Series Strategy**: `/docs/QUANTUM-CONSCIOUSNESS-SERIES.md`

## ✨ Features

- ✅ Markdown support with GFM
- ✅ Beautiful typography
- ✅ Code syntax highlighting
- ✅ Image support
- ✅ Internal linking
- ✅ SEO optimized
- ✅ Progress tracking
- ✅ Share buttons

## 🎯 Next Articles to Write

Check `/lib/articles.ts` for Priority 1 articles:
1. Series Introduction (`qc-series-000`)
2. Primer articles (3 total)
3. Theory deep dives (5 total)

---

**Need help?** See the full writing guide!

