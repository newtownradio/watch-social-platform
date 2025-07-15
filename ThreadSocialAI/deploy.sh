#!/bin/bash

# BasedlyAI Deployment Script
echo "🚀 Starting BasedlyAI Server..."

# Check if port is available
PORT=8038
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; do
    echo "Port $PORT is in use, trying next port..."
    PORT=$((PORT + 1))
done

echo "✅ Starting server on port $PORT"
echo "🌐 Access your app at: http://localhost:$PORT"
echo "📱 For mobile testing: http://YOUR_IP:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
python3 -m http.server $PORT 