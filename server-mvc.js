// server-mvc.js - Simple server for serving the MVC Watch app
// Serves components from root with proper MIME types and routing

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Routes configuration
const ROUTES = {
    '/': 'index.html',
    '/index.html': 'index.html',
    '/discovery': 'discovery.html',
    '/discovery.html': 'discovery.html',
    '/buysell': 'buysell.html',
    '/buysell.html': 'buysell.html',
    '/messages': 'messages.html',
    '/messages.html': 'messages.html',
    '/account': 'account.html',
    '/account.html': 'account.html',
    '/social': 'social.html',
    '/social.html': 'social.html',
    '/member': 'member.html',
    '/member.html': 'member.html'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    console.log(`📡 ${req.method} ${pathname}`);
    
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Handle routes
    if (ROUTES[pathname]) {
        pathname = '/' + ROUTES[pathname];
    }
    
    // Determine file path
    let filePath = path.join(__dirname, pathname);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    // Handle root path
    if (pathname === '/') {
        filePath = path.join(__dirname, 'index.html');
    }
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found - serve 404
                console.log(`❌ File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Page Not Found</title>
                        <style>
                            body {
                                font-family: 'Press Start 2P', cursive;
                                background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #FFB6C1 100%);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                text-align: center;
                            }
                            .error-container {
                                background: rgba(255, 255, 255, 0.9);
                                padding: 40px;
                                border-radius: 20px;
                                border: 3px solid #000;
                                box-shadow: 5px 5px 0px #000;
                            }
                            h1 { color: #FF4500; margin-bottom: 20px; }
                            p { color: #2C3E50; margin-bottom: 30px; }
                            a {
                                background: #FF4500;
                                color: white;
                                padding: 15px 30px;
                                text-decoration: none;
                                border-radius: 10px;
                                border: 3px solid #000;
                                box-shadow: 3px 3px 0px #000;
                                display: inline-block;
                            }
                            a:hover {
                                transform: translateY(-2px);
                                box-shadow: 5px 5px 0px #000;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="error-container">
                            <h1>🎮 404</h1>
                            <p>Page not found!</p>
                            <p>This level doesn't exist yet.</p>
                            <a href="/">🏠 Go Home</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                // Server error
                console.error(`❌ Server error: ${err.code}`);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
            return;
        }
        
        // Set appropriate headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', data.length);
        
        // Add cache headers for static assets
        if (ext === '.js' || ext === '.css' || ext === '.png' || ext === '.jpg' || ext === '.svg') {
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        } else {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
        
        // Send response
        res.writeHead(200);
        res.end(data);
        
        console.log(`✅ Served: ${pathname} (${data.length} bytes)`);
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`
🎮 Watch MVC Server Running!
├── URL: http://localhost:${PORT}
├── Root: ${__dirname}
├── Routes: ${Object.keys(ROUTES).length} configured
└── MIME Types: ${Object.keys(MIME_TYPES).length} supported

📁 Available pages:
${Object.entries(ROUTES).map(([route, file]) => `   ${route} → ${file}`).join('\n')}

🚀 Server started at ${new Date().toLocaleString()}
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Watch MVC Server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down Watch MVC Server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Error handling
server.on('error', (err) => {
    console.error('❌ Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.log(`💡 Port ${PORT} is already in use. Try a different port:`);
        console.log(`   node server-mvc.js --port ${PORT + 1}`);
    }
}); 