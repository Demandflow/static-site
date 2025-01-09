const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files from the dist directory
app.use(express.static('dist'));

// Handle all routes
app.get('*', (req, res) => {
    let url = req.url;
    
    // Remove trailing slash except for root
    if (url.length > 1 && url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    
    // Try different file possibilities
    const possibilities = [
        path.join(__dirname, 'dist', url + '.html'),
        path.join(__dirname, 'dist', url, 'index.html'),
        path.join(__dirname, 'dist', url.replace(/\.html$/, ''), 'index.html')
    ];
    
    // Try each possibility
    for (const filePath of possibilities) {
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }
    
    // If no file found, send 404
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 