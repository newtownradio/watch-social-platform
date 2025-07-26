#!/bin/bash

# Cloudflare DNS Setup for watch.style → Azure Proxy
echo "🌐 Setting up Cloudflare DNS for watch.style..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
DOMAIN="watch.style"
ZONE_ID=""  # You'll need to get this from Cloudflare dashboard
AZURE_ENDPOINT=""  # Your Azure endpoint (e.g., watch-app.eastus.cloudapp.azure.com)

echo -e "${YELLOW}📋 DNS Configuration:${NC}"
echo "Domain: $DOMAIN"
echo "Zone ID: $ZONE_ID"
echo "Azure Endpoint: $AZURE_ENDPOINT"

# Check if Wrangler CLI is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Wrangler CLI...${NC}"
    npm install -g wrangler
fi

# Check if logged in to Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to Cloudflare:${NC}"
    wrangler login
fi

echo -e "${YELLOW}📝 Manual DNS Setup Instructions:${NC}"
echo ""
echo "1. Go to https://dash.cloudflare.com"
echo "2. Select your domain: $DOMAIN"
echo "3. Go to DNS → Records"
echo "4. Add these records:"
echo ""
echo "   Type: A"
echo "   Name: @ (or leave blank)"
echo "   IPv4 address: 192.0.2.1 (dummy IP - Cloudflare will proxy)"
echo "   Proxy status: Proxied (orange cloud)"
echo "   TTL: Auto"
echo ""
echo "   Type: A"
echo "   Name: www"
echo "   IPv4 address: 192.0.2.1 (dummy IP - Cloudflare will proxy)"
echo "   Proxy status: Proxied (orange cloud)"
echo "   TTL: Auto"
echo ""
echo "5. Go to Rules → Transform Rules → Rewrite Rules"
echo "6. Create a new rule:"
echo "   - Name: 'Watch Style Proxy'"
echo "   - When incoming requests match: Hostname equals $DOMAIN"
echo "   - Then: Rewrite to (Custom) $AZURE_ENDPOINT"
echo ""
echo "7. Go to SSL/TLS → Overview"
echo "8. Set SSL/TLS encryption mode to: Full (strict)"
echo ""
echo "9. Go to SSL/TLS → Edge Certificates"
echo "10. Enable: Always Use HTTPS"
echo "11. Enable: Minimum TLS Version: 1.2"
echo ""

echo -e "${GREEN}✅ DNS setup instructions provided!${NC}"
echo -e "${YELLOW}⚠️  You'll need to manually configure the Azure endpoint URL${NC}"
echo -e "${YELLOW}⚠️  Get your Zone ID from Cloudflare dashboard${NC}" 