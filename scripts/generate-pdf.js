const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Read intro.md content
const introContent = fs.readFileSync(path.join(__dirname, '../intro.md'), 'utf8');

// Generate HTML with intro content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>10 Mind-Bending Paradoxes</title>
  <style>
    @page {
      margin: 72pt;
    }
    body {
      font-family: 'Georgia', serif;
      line-height: 1.8;
      color: #1a1a1a;
      max-width: 800px;
      margin: 0 auto;
      padding: 0;
    }
    h1 {
      font-size: 36pt;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 24pt;
      text-align: center;
      border-bottom: 3px solid #0284c7;
      padding-bottom: 24pt;
    }
    h2 {
      font-size: 24pt;
      font-weight: bold;
      margin-top: 36pt;
      margin-bottom: 18pt;
      color: #0284c7;
    }
    p {
      margin-bottom: 12pt;
      text-align: justify;
    }
    strong {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>10 Mind-Bending Paradoxes</h1>
  <div>
    ${introContent.split('\n').map(line => {
      if (line.trim() === '') return '<p>&nbsp;</p>';
      // Check if line is a title (all caps or starts with capital and ends without punctuation)
      if (/^[A-Z][A-Z\s:]+$/i.test(line.trim()) && (line.endsWith(':') || line.trim().length > 20)) {
        return `<h2>${line.trim().replace(/:/g, '')}</h2>`;
      }
      return `<p>${line}</p>`;
    }).join('\n')}
  </div>
</body>
</html>
`;

async function generatePDF() {
  console.log('Starting PDF generation...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set content and wait for it to load
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  // Generate PDF
  const outputPath = path.join(__dirname, '../public/downloads/10-mind-bending-paradoxes.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    margin: {
      top: '72pt',
      right: '72pt',
      bottom: '72pt',
      left: '72pt'
    },
    printBackground: true
  });
  
  await browser.close();
  console.log(`PDF generated successfully at: ${outputPath}`);
}

generatePDF().catch(console.error);

