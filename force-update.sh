#!/bin/bash

echo "🚀 Force updating Watch site..."

# Update files
echo "📝 Updating configuration files..."

# Update cloudflare-pages.yml
cat > cloudflare-pages.yml << 'EOF'
# Cloudflare Pages Build Configuration
name: Watch.style Deployment

# Build settings
build:
  command: echo "No build required - static files"
  output: ThreadSocialAI
  environment:
    NODE_VERSION: 18

# Environment variables
env:
  NODE_ENV: production

# Cache settings - force fresh content
headers:
  - path: /*
    headers:
      - name: Cache-Control
        value: "no-cache, no-store, must-revalidate"
      - name: Pragma
        value: "no-cache"
      - name: Expires
        value: "0"

# Custom domains
custom_domains:
  - watch.style
  - www.watch.style
EOF

# Update _headers
cat > _headers << 'EOF'
# Force fresh content
/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

# Security headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# CORS headers
/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
EOF

echo "✅ Configuration updated!"
echo "🌐 Now go to Cloudflare Pages and trigger a redeploy"
echo "�� Clear your browser cache and refresh" 