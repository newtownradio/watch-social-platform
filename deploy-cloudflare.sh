#!/bin/bash

# Cloudflare Pages Deployment Script
# Deploys watch.style to Cloudflare Pages

echo "🚀 Starting Cloudflare Pages deployment for watch.style..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# Create project if it doesn't exist
echo -e "${YELLOW}📁 Setting up Cloudflare Pages project...${NC}"
wrangler pages project create watch-style --production-branch main

# Deploy to Cloudflare Pages
echo -e "${YELLOW} Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy ThreadSocialAI --project-name watch-style --branch main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Your site is live at: https://watch.style${NC}"
    echo -e "${GREEN}📊 Dashboard: https://dash.cloudflare.com/pages${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}�� Watch.style is now live on Cloudflare Pages!${NC}" 