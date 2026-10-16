import fs from 'node:fs';
import path from 'node:path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const excludedPages = new Set(['search.astro', 'sitemap.astro']);

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (file.endsWith('.astro') || file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getFiles(pagesDir)
  .filter(file => !excludedPages.has(path.basename(file)))
  .sort((left, right) => left.localeCompare(right));

let markdownOutput = `# SEO Audit & Keyword Checklist\n\n`;
markdownOutput += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
markdownOutput += `| File Path | Focus Keyword | Title | Description |\n`;
markdownOutput += `| :--- | :--- | :--- | :--- |\n`;

function getLayoutProps(content, file) {
  const layoutMatch = content.match(/<Layout\b([\s\S]*?)>/);
  if (!layoutMatch) {
    throw new Error(`No Layout component found in ${file}`);
  }

  return layoutMatch[1];
}

function getPropValue(layoutProps, propName, content, file) {
  const propPattern = new RegExp(
    `(?:^|\\s)${propName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{\\s*([\\w$]+)\\s*\\})`,
  );
  const match = layoutProps.match(propPattern);
  if (!match) {
    throw new Error(`Missing ${propName} metadata in ${file}`);
  }

  if (match[1] !== undefined) return match[1];
  if (match[2] !== undefined) return match[2];

  const variableName = match[3].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const assignmentPattern = new RegExp(
    `\\bconst\\s+${variableName}\\s*=\\s*("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`[^\`]*\`)`,
  );
  const assignment = content.match(assignmentPattern);
  if (!assignment) {
    throw new Error(`Unable to resolve ${propName} variable in ${file}`);
  }

  const literal = assignment[1];
  if (literal.startsWith('"')) return JSON.parse(literal);
  return literal.slice(1, -1).replace(/\\(['\\])/g, '$1');
}

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const layoutProps = getLayoutProps(content, relativePath);
  const keyword = getPropValue(layoutProps, 'focusKeyword', content, relativePath);
  const title = getPropValue(layoutProps, 'title', content, relativePath);
  const description = getPropValue(layoutProps, 'description', content, relativePath);
  const escapeTableCell = value => value.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

  markdownOutput +=
    `| \`${relativePath}\` | **${escapeTableCell(keyword)}** | ` +
    `${escapeTableCell(title)} | ${escapeTableCell(description)} |\n`;
});

// Write output to a text file
const outputPath = path.join(process.cwd(), 'seo-audit.md');
fs.writeFileSync(outputPath, markdownOutput, 'utf-8');

console.log(`\n✅ SEO Audit complete! Open 'seo-audit.md' in VS Code to review your pages.\n`);