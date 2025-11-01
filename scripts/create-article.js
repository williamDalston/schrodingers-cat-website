#!/usr/bin/env node

/**
 * Utility script to create a new article markdown file
 * Usage: node scripts/create-article.js <article-id>
 * Example: node scripts/create-article.js qc-primer-004
 */

const fs = require('fs')
const path = require('path')
const { readFileSync } = require('fs')

// Get article ID from command line
const articleId = process.argv[2]

if (!articleId) {
  console.error('❌ Error: Article ID is required')
  console.log('\nUsage: node scripts/create-article.js <article-id>')
  console.log('Example: node scripts/create-article.js qc-primer-004\n')
  process.exit(1)
}

// Paths
const articlesDataPath = path.join(process.cwd(), 'lib', 'articles.ts')
const contentDir = path.join(process.cwd(), 'content', 'articles')
const templatePath = path.join(process.cwd(), 'content', 'articles', '.template.md')
const newArticlePath = path.join(contentDir, `${articleId}.md`)

// Check if article exists in articles.ts
let articleFound = false
try {
  const articlesFile = readFileSync(articlesDataPath, 'utf-8')
  articleFound = articlesFile.includes(`id: '${articleId}'`)
} catch (error) {
  console.error('❌ Error reading articles.ts:', error.message)
  process.exit(1)
}

if (!articleFound) {
  console.warn(`⚠️  Warning: Article ID "${articleId}" not found in lib/articles.ts`)
  console.log('   The file will be created, but make sure the ID matches an article.\n')
}

// Check if file already exists
if (fs.existsSync(newArticlePath)) {
  console.error(`❌ Error: Article file already exists: ${newArticlePath}`)
  console.log('   If you want to overwrite it, delete it first.\n')
  process.exit(1)
}

// Read template
let template
try {
  template = readFileSync(templatePath, 'utf-8')
} catch (error) {
  console.error('❌ Error reading template:', error.message)
  process.exit(1)
}

// Replace template title with article ID as placeholder
const articleContent = template.replace(
  '# Article Title',
  `# Article Title (${articleId})`
)

// Write new article file
try {
  fs.writeFileSync(newArticlePath, articleContent, 'utf-8')
  console.log(`✅ Created article file: ${newArticlePath}`)
  console.log(`\n📝 Next steps:`)
  console.log(`   1. Open the file and replace the title with your article title`)
  console.log(`   2. Write your article content`)
  console.log(`   3. Add images to /public/articles/[slug]/ folder if needed`)
  console.log(`   4. Update article status in lib/articles.ts to 'published' when ready`)
  console.log(`\n🎉 Happy writing!\n`)
} catch (error) {
  console.error('❌ Error creating article file:', error.message)
  process.exit(1)
}

