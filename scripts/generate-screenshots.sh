#!/bin/bash

# Generate App Store Screenshots for Basedly.AI
# This script creates screenshots for different device sizes

echo "Generating App Store screenshots..."

# Create screenshots directory
mkdir -p app-store-screenshots

# Device sizes for App Store screenshots
# iPhone 6.7" (1290 x 2796)
# iPhone 6.5" (1242 x 2688)
# iPhone 5.5" (1242 x 2208)
# iPad Pro 12.9" (2048 x 2732)
# iPad Pro 11" (1668 x 2388)

# For now, we'll create placeholder screenshots
# In a real scenario, you'd use Xcode Simulator or real devices

echo "Creating placeholder screenshots..."

# iPhone screenshots
convert -size 1290x2796 xc:white -gravity center -pointsize 72 -annotate 0 "Basedly.AI\n\nSocial Discovery\n\nScreenshot 1" app-store-screenshots/iphone-6-7-1.png
convert -size 1290x2796 xc:white -gravity center -pointsize 72 -annotate 0 "Basedly.AI\n\nFashion Nooks\n\nScreenshot 2" app-store-screenshots/iphone-6-7-2.png
convert -size 1290x2796 xc:white -gravity center -pointsize 72 -annotate 0 "Basedly.AI\n\nMessaging\n\nScreenshot 3" app-store-screenshots/iphone-6-7-3.png

# iPad screenshots
convert -size 2048x2732 xc:white -gravity center -pointsize 96 -annotate 0 "Basedly.AI\n\nSocial Discovery\n\nScreenshot 1" app-store-screenshots/ipad-12-9-1.png
convert -size 2048x2732 xc:white -gravity center -pointsize 96 -annotate 0 "Basedly.AI\n\nFashion Nooks\n\nScreenshot 2" app-store-screenshots/ipad-12-9-2.png

echo "Screenshots generated in app-store-screenshots/ directory"
echo "Replace these with actual app screenshots before App Store submission" 