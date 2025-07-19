#!/bin/bash

echo "🎯 Committing latest Watch updates to GitHub..."

# Check git status
echo "📊 Checking current git status..."
git status

# Add all changes
echo "�� Adding all changes..."
git add .

# Create commit with descriptive message
echo "💾 Creating commit..."
git commit -m "🎮 Update Watch site with generic gaming theme

- Replace Mario Bros characters with generic gaming personas
- Update Messages page with PixelGamer, RetroRunner, ArcadeAce, etc.
- Remove all Nintendo/Mario Bros references
- Maintain gaming aesthetic without copyright issues
- Update character names: Mario→PixelGamer, Luigi→RetroRunner, etc.
- Keep all functionality: encryption, chat, navigation
- Ensure legal compliance for commercial use

Files updated:
- ThreadSocialAI/messages.html (character names and content)
- All pages now use generic gaming theme"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Your Watch site updates are now live in the repository" 