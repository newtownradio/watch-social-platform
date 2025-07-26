const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(compression());
app.use(helmet({
    contentSecurityPolicy: false // Disable CSP for now to avoid issues
}));
app.use(cors());
app.use(express.json());

// Serve static files from the Angular build
const staticPath = path.join(__dirname, 'dist/watch-jewelry/browser');
app.use(express.static(staticPath));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        app: 'watch-angular'
    });
});

// Catch-all route for SPA - must be last
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
🎮 WATCH Angular App Running!
├── URL: http://localhost:${PORT}
├── Static Path: ${staticPath}
├── Health: http://localhost:${PORT}/health
└── Ready for Azure + Cloudflare deployment

🚀 Server started at ${new Date().toLocaleString()}
    `);
}); 