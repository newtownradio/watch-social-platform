// server-mvc.js - Simple server for serving the MVC Watch app
// Serves components from root with proper MIME types and routing

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/trade', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'trade.html'));
});

app.get('/swipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'swipe.html'));
});

app.get('/discovery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'discovery.html'));
});

app.get('/messages', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'messages.html'));
});

app.get('/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notifications.html'));
});

app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        theme: 'mario-ai'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🎮 WATCH Trading Platform Running!
├── URL: http://localhost:${PORT}
├── Theme: Mario + AI Discovery
├── Health: http://localhost:${PORT}/health
└── Features: Trade, Swipe, Discovery, Messages, Notifications, Account

🚀 Server started at ${new Date().toLocaleString()}
    `);
}); 