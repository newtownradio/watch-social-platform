#!/bin/bash

echo "🚀 Opening Basedly Preview..."
echo "📍 URL: http://localhost:8000/preview.html"
echo ""

# Open the preview page in default browser
open http://localhost:8000/preview.html

echo "✅ Preview page opened in your browser!"
echo ""
echo "📱 Direct links:"
echo "   Home: http://localhost:8000"
echo "   Preview: http://localhost:8000/preview.html"
echo ""
echo "💡 If the page doesn't load, make sure the server is running:"
echo "   cd ThreadSocialAI && python3 -m http.server 8000" 