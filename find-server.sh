#!/bin/bash

echo "🔍 Diagnosing server issues..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}📡 Checking DNS resolution...${NC}"
echo "watch.style DNS:"
dig watch.style +short

echo -e "${YELLOW}🌐 Checking if site is accessible...${NC}"
curl -I https://watch.style 2>/dev/null | head -5

echo -e "${YELLOW}📁 Checking local files...${NC}"
ls -la ThreadSocialAI/*.html

echo -e "${YELLOW}🔧 Checking Cloudflare status...${NC}"
wrangler whoami 2>/dev/null || echo "Not authenticated"

echo -e "${YELLOW}�� Listing Cloudflare Pages projects...${NC}"
wrangler pages project list 2>/dev/null || echo "No projects found" 