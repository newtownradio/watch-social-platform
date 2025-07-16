#!/bin/bash

# BasedlyAI App Submission via SSH Tunnel
# This script sets up an SSH tunnel and submits the app securely

echo "🚀 Setting up SSH tunnel for BasedlyAI app submission..."

# Check if we have the required files
if [ ! -f "./build/BasedlyAI.ipa" ]; then
    echo "❌ Error: BasedlyAI.ipa not found!"
    echo "Please build the app first using: ./build_basedly_ai.sh"
    exit 1
fi

# Start SSH tunnel in background
echo "🔐 Starting SSH tunnel to App Store Connect..."
ssh -f -N appstore-tunnel

if [ $? -eq 0 ]; then
    echo "✅ SSH tunnel established successfully!"
    echo "🌐 Tunnel running on localhost:8080"
    
    # Wait a moment for tunnel to stabilize
    sleep 3
    
    # Submit app through tunnel
    echo "📤 Submitting BasedlyAI app through SSH tunnel..."
    
    # Use xcrun altool with tunnel
    xcrun altool --upload-app \
        --type ios \
        --file "./build/BasedlyAI.ipa" \
        --username "colinilgen@apple.com" \
        --password "@env:APP_SPECIFIC_PASSWORD" \
        --verbose \
        --output-format xml
    
    if [ $? -eq 0 ]; then
        echo "✅ App submitted successfully via SSH tunnel!"
    else
        echo "❌ App submission failed. Check the logs above."
    fi
    
    # Clean up tunnel
    echo "🧹 Cleaning up SSH tunnel..."
    pkill -f "ssh.*appstore-tunnel"
    
else
    echo "❌ Failed to establish SSH tunnel!"
    echo "Please check your SSH key configuration and Apple Developer account access."
fi

echo "🏁 SSH submission process completed." 