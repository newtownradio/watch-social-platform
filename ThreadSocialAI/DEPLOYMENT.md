# BasedlyAI Deployment Guide

## Quick Start

### Option 1: Use the Deployment Script (Recommended)
```bash
# Make the script executable (if not already)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Option 2: Manual Server Start
```bash
# Navigate to the project directory
cd ThreadSocialAI

# Start the server (will find an available port)
python3 -m http.server 8038
```

## Access Your App

Once the server is running, access your app at:
- **Local**: `http://localhost:8038` (or the port shown in terminal)
- **Mobile Testing**: `http://YOUR_IP:8038` (replace YOUR_IP with your computer's IP address)

## File Structure

```
ThreadSocialAI/
├── index.html              # Main entry point (redirects to modular version)
├── index-modular.html      # Full modular app
├── deploy.sh               # Deployment script
├── .htaccess              # Apache configuration (for production)
├── manifest.json          # PWA manifest
├── favicon.ico            # Favicon placeholder
├── output.css             # Main stylesheet
├── components/            # Modular components
│   ├── utils/            # Utility components
│   ├── ui/               # UI components
│   └── pages/            # Page components
└── assets/               # Static assets
```

## Production Deployment

### For Apache Server
1. Upload all files to your web server
2. Ensure `.htaccess` is present (handles routing and compression)
3. The app will automatically redirect to the modular version

### For Nginx Server
Add this configuration to your nginx.conf:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Enable compression
gzip on;
gzip_types text/plain text/css application/javascript application/json;
```

### For Node.js/Express
```javascript
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('ThreadSocialAI'));

// Handle SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ThreadSocialAI', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## Troubleshooting

### Port Already in Use
If you see "Address already in use" error:
1. The deployment script will automatically find an available port
2. Or manually specify a different port: `python3 -m http.server 8080`

### Directory Listing Instead of App
- Make sure you're accessing `http://localhost:PORT/index.html` or just `http://localhost:PORT/`
- The app should automatically redirect to the modular version

### 404 Errors for favicon.ico/manifest.json
- These are normal if the files don't exist
- The app will still function properly
- For production, ensure these files are present

### Mobile Responsiveness
- The app is fully responsive for all iOS devices
- Test on different screen sizes using browser dev tools
- All touch interactions are optimized for mobile

## Features Included

✅ **Fully Responsive Design** - Works on all iOS devices  
✅ **PWA Ready** - Can be installed as a web app  
✅ **Component-Based Architecture** - Modular and maintainable  
✅ **GSAP Animations** - Smooth, professional animations  
✅ **Authentication System** - Sign in/out functionality  
✅ **Real-time Search** - Live search functionality  
✅ **Navigation System** - Consistent across all pages  
✅ **Loading States** - Professional loading screens  
✅ **Error Handling** - Graceful error management  

## Next Steps for Production

1. **Replace favicon.ico** with your actual favicon
2. **Update manifest.json** with your app details
3. **Configure SSL** for HTTPS
4. **Set up CDN** for static assets
5. **Configure caching** headers
6. **Set up monitoring** and analytics
7. **Test on real devices** before launch

## Support

For deployment issues:
1. Check the browser console for JavaScript errors
2. Verify all component files are loading correctly
3. Ensure GSAP is accessible (CDN fallback included)
4. Test on different browsers and devices 