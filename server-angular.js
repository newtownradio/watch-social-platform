const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Database file path
const DB_FILE = path.join(__dirname, 'data', 'demo_requests.json');

// Initialize database file if it doesn't exist
function initializeDatabase() {
  // Create data directory if it doesn't exist
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      requests: [],
      lastId: 0
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDatabase() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { requests: [], lastId: 0 };
  }
}

// Write database
function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

// Initialize database on startup
initializeDatabase();

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false })); // Disabled for now
app.use(cors());
app.use(express.json());

const staticPath = path.join(__dirname, 'dist/watch-jewelry/browser');
app.use(express.static(staticPath));

// Health check endpoint (moved before catch-all route)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    app: 'watch-angular'
  });
});

// API endpoint to store demo requests
app.post('/api/demo-request', (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Valid email is required' 
      });
    }

    // Read current database
    const db = readDatabase();
    
    // Check if email already exists
    const existingRequest = db.requests.find(req => req.email.toLowerCase() === email.toLowerCase());
    if (existingRequest) {
      return res.status(409).json({ 
        success: false, 
        error: 'Email already registered for demo' 
      });
    }

    // Create new demo request
    const newRequest = {
      id: ++db.lastId,
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Add to database
    db.requests.push(newRequest);
    
    // Save to file
    if (writeDatabase(db)) {
      console.log('Demo request saved:', newRequest);
      res.json({ 
        success: true, 
        message: 'Demo request submitted successfully',
        requestId: newRequest.id
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save demo request' 
      });
    }
  } catch (error) {
    console.error('Error processing demo request:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// API endpoint to get all demo requests (for admin purposes)
app.get('/api/demo-requests', (req, res) => {
  try {
    const db = readDatabase();
    res.json({
      success: true,
      requests: db.requests,
      total: db.requests.length
    });
  } catch (error) {
    console.error('Error fetching demo requests:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// API endpoint to update demo request status
app.put('/api/demo-request/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const db = readDatabase();
    const request = db.requests.find(req => req.id === parseInt(id));
    
    if (!request) {
      return res.status(404).json({ 
        success: false, 
        error: 'Demo request not found' 
      });
    }

    // Update request
    if (status) request.status = status;
    if (notes) request.notes = notes;
    request.updatedAt = new Date().toISOString();

    if (writeDatabase(db)) {
      res.json({ 
        success: true, 
        message: 'Demo request updated successfully',
        request: request
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to update demo request' 
      });
    }
  } catch (error) {
    console.error('Error updating demo request:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Catch-all route for SPA - must be last
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
🎮 WATCH Angular App Running!
├── URL: http://localhost:${PORT}
├── Static Path: ${staticPath}
├── Health: http://localhost:${PORT}/health
├── API: http://localhost:${PORT}/api/demo-request
└── Database: ${DB_FILE}

🚀 Server started at ${new Date().toLocaleString()}
  `);
}); 