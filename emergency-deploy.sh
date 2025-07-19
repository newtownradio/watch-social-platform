#!/bin/bash

echo "🚨 Emergency deployment fix for Watch..."

# Update the discovery.html file
echo "�� Updating discovery.html with self-contained styles..."

# Copy the fixed file
cp ThreadSocialAI/discovery.html ThreadSocialAI/discovery.html.backup

# Deploy to Cloudflare Pages
echo " Deploying to Cloudflare Pages..."
wrangler pages deploy ThreadSocialAI --project-name watch-style --branch main

echo "✅ Emergency deployment complete!"
echo "🌐 Check https://watch.style in 2-3 minutes" 