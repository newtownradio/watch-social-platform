const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint for Azure
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        mvc: true,
        theme: 'mario'
    });
});

// API routes for MVC components
app.get('/api/status', (req, res) => {
    res.json({
        app: 'Watch',
        theme: 'Mario',
        architecture: 'MVC',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// Serve the main MVC landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other pages
app.get('/discovery', (req, res) => {
    res.sendFile(path.join(__dirname, 'discovery.html'));
});

app.get('/buysell', (req, res) => {
    res.sendFile(path.join(__dirname, 'buysell.html'));
});

app.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'messages.html'));
});

app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'account.html'));
});

app.get('/social', (req, res) => {
    res.sendFile(path.join(__dirname, 'social.html'));
});

app.get('/member', (req, res) => {
    res.sendFile(path.join(__dirname, 'member.html'));
});

// Catch-all route for SPA navigation
app.get('*', (req, res) => {
    // Check if it's an API request
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    // For other routes, serve the main page (SPA behavior)
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🎮 Watch MVC Server Running!
├── URL: http://localhost:${PORT}
├── Environment: ${process.env.NODE_ENV || 'development'}
├── Architecture: MVC with Mario Theme
├── Health Check: http://localhost:${PORT}/health
└── API Status: http://localhost:${PORT}/api/status

🚀 Server started at ${new Date().toLocaleString()}
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully...');
    process.exit(0);
});

module.exports = app; 