#!/bin/bash

echo "🔐 Fixing Cloudflare authentication..."

# Remove existing authentication
echo "🧹 Clearing existing authentication..."
wrangler logout

# Install/update Wrangler CLI
echo "📦 Installing/updating Wrangler CLI..."
npm install -g wrangler@latest

# Login to Cloudflare
echo "🔐 Please login to Cloudflare..."
echo "This will open your browser for authentication"
wrangler login

# Test authentication
echo "✅ Testing authentication..."
wrangler whoami

echo "🎯 Authentication complete!" 