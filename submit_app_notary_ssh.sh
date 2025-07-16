#!/bin/bash

# BasedlyAI App Submission via SSH using notarytool
# Modern approach for app submission

echo "🚀 Setting up SSH tunnel for BasedlyAI app submission (notarytool)..."

# Check if we have the required files
if [ ! -f "./BasedlyAI/BasedlyAI.ipa" ]; then
    echo "❌ Error: BasedlyAI.ipa not found!"
    echo "Please build the app first using: xcodebuild -archivePath ./BasedlyAI/BasedlyAI.xcarchive -exportPath ./BasedlyAI -exportOptionsPlist exportOptions.plist"
    exit 1
fi

# Start SSH tunnel in background
echo "🔐 Starting SSH tunnel to Apple's notary service..."
ssh -f -N appstore-tunnel

if [ $? -eq 0 ]; then
    echo "✅ SSH tunnel established successfully!"
    echo "🌐 Tunnel running on localhost:8080"
    
    # Wait a moment for tunnel to stabilize
    sleep 3
    
    # Submit app using notarytool through tunnel
    echo "📤 Submitting BasedlyAI app using notarytool via SSH tunnel..."
    
    # Use notarytool with tunnel
    xcrun notarytool submit "./BasedlyAI/BasedlyAI.ipa" \
        --apple-id "colinilgen@apple.com" \
        --password "@env:APP_SPECIFIC_PASSWORD" \
        --team-id "V32QX8Q2VA" \
        --wait \
        --verbose
    
    if [ $? -eq 0 ]; then
        echo "✅ App submitted successfully via SSH tunnel using notarytool!"
        
        # Staple the notarization ticket
        echo "🔒 Stapling notarization ticket to app..."
        xcrun stapler staple "./BasedlyAI/BasedlyAI.ipa"
        
        if [ $? -eq 0 ]; then
            echo "✅ Notarization ticket stapled successfully!"
        else
            echo "⚠️  Warning: Failed to staple notarization ticket"
        fi
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

echo "🏁 SSH notarytool submission process completed." 