#!/bin/bash

# BasedlyAI App Submission - Secure Method
# Uses Apple's official tools with proper authentication

echo "🚀 Starting secure BasedlyAI app submission..."

# Check if we have the required files
if [ ! -f "./build/BasedlyAI.ipa" ]; then
    echo "❌ Error: BasedlyAI.ipa not found!"
    echo "Please build the app first using: ./build_basedly_ai.sh"
    exit 1
fi

# Check if app-specific password is set
if [ -z "$APP_SPECIFIC_PASSWORD" ]; then
    echo "⚠️  APP_SPECIFIC_PASSWORD environment variable not set"
    echo "Please set it with: export APP_SPECIFIC_PASSWORD='your-app-specific-password'"
    echo "You can generate one at: https://appleid.apple.com/account/manage"
    exit 1
fi

echo "✅ App file found: ./build/BasedlyAI.ipa"
echo "🔐 Using app-specific password authentication"

# Method 1: Try notarytool (modern approach)
echo "📤 Attempting submission with notarytool..."
xcrun notarytool submit "./build/BasedlyAI.ipa" \
    --apple-id "colinilgen@apple.com" \
    --password "$APP_SPECIFIC_PASSWORD" \
    --team-id "V32QX8Q2VA" \
    --wait \
    --verbose

if [ $? -eq 0 ]; then
    echo "✅ App submitted successfully via notarytool!"
    
    # Staple the notarization ticket
    echo "🔒 Stapling notarization ticket to app..."
    xcrun stapler staple "./build/BasedlyAI.ipa"
    
    if [ $? -eq 0 ]; then
        echo "✅ Notarization ticket stapled successfully!"
    else
        echo "⚠️  Warning: Failed to staple notarization ticket"
    fi
    
    # Now upload to App Store Connect
    echo "📱 Uploading to App Store Connect..."
    xcrun altool --upload-app \
        --type ios \
        --file "./build/BasedlyAI.ipa" \
        --username "colinilgen@apple.com" \
        --password "$APP_SPECIFIC_PASSWORD" \
        --verbose \
        --output-format xml
    
    if [ $? -eq 0 ]; then
        echo "🎉 SUCCESS: BasedlyAI app uploaded to App Store Connect!"
        echo "📋 Next steps:"
        echo "   1. Go to App Store Connect: https://appstoreconnect.apple.com"
        echo "   2. Navigate to your app"
        echo "   3. Complete the app metadata and screenshots"
        echo "   4. Submit for review"
    else
        echo "❌ Failed to upload to App Store Connect"
    fi
    
else
    echo "❌ notarytool submission failed, trying altool..."
    
    # Method 2: Fallback to altool
    xcrun altool --upload-app \
        --type ios \
        --file "./build/BasedlyAI.ipa" \
        --username "colinilgen@apple.com" \
        --password "$APP_SPECIFIC_PASSWORD" \
        --verbose \
        --output-format xml
    
    if [ $? -eq 0 ]; then
        echo "🎉 SUCCESS: BasedlyAI app uploaded via altool!"
    else
        echo "❌ Both submission methods failed"
        echo "Please check your Apple Developer account and app-specific password"
    fi
fi

echo "🏁 Submission process completed." 