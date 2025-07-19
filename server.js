const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'ThreadSocialAI')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/status', (req, res) => {
  res.json({ message: 'Watch API is running', version: '1.0.0' });
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ThreadSocialAI', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Watch server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
}); 