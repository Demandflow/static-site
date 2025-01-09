const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');

// Configure marked for security
marked.setOptions({
    headerIds: false,
    mangle: false
});

// Ensure build directory exists
fs.ensureDirSync('dist');

// Copy static assets
fs.copySync('src/static', 'dist');

// Read base template
const baseTemplate = fs.readFileSync('src/templates/base.html', 'utf-8');

// Function to convert markdown to HTML
function markdownToHtml(markdown, title) {
    const content = marked(markdown);
    return baseTemplate
        .replace('{{title}}', title)
        .replace('{{content}}', content);
}

// Build content pages
const contentDir = 'src/content';
fs.ensureDirSync(contentDir);

// Create initial index.md if it doesn't exist
if (!fs.existsSync(path.join(contentDir, 'index.md'))) {
    fs.writeFileSync(
        path.join(contentDir, 'index.md'),
        `# Welcome to Your Site\n\nThis is your new website. Edit this content in \`src/content/index.md\`.`
    );
}

// Process all markdown files
function buildPages(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const sourcePath = path.join(dir, file);
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory()) {
            buildPages(sourcePath);
            return;
        }
        
        if (path.extname(file) !== '.md') return;
        
        const content = fs.readFileSync(sourcePath, 'utf-8');
        const basename = path.basename(file, '.md');
        const relativePath = path.relative(contentDir, dir);
        const targetDir = path.join('dist', relativePath);
        
        fs.ensureDirSync(targetDir);
        
        const title = basename === '404' ? 'Page Not Found' : 
            basename.charAt(0).toUpperCase() + basename.slice(1);
        const html = markdownToHtml(content, title);
        
        // Handle 404 page specially
        if (basename === '404') {
            fs.writeFileSync(path.join('dist', '404.html'), html);
        } else {
            fs.writeFileSync(
                path.join(targetDir, basename + '.html'),
                html
            );
        }
    });
}

buildPages(contentDir);

console.log('Site built successfully!'); 