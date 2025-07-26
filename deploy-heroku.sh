#!/bin/bash

# Heroku Deployment Script for watch.style
echo "🚀 Deploying Watch Angular App to Heroku..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
APP_NAME="watch-style-app"
REMOTE_NAME="heroku"

echo -e "${YELLOW}📋 Heroku Configuration:${NC}"
echo "App Name: $APP_NAME"
echo "Remote: $REMOTE_NAME"

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Heroku CLI...${NC}"
    brew tap heroku/brew && brew install heroku
fi

# Check if logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to Heroku:${NC}"
    heroku login
fi

# Create Heroku app if it doesn't exist
echo -e "${YELLOW}📁 Creating Heroku app...${NC}"
if ! heroku apps:info --app $APP_NAME &> /dev/null; then
    heroku create $APP_NAME
    echo -e "${GREEN}✅ Heroku app created: $APP_NAME${NC}"
else
    echo -e "${GREEN}✅ Heroku app already exists: $APP_NAME${NC}"
fi

# Set up Git remote if not already configured
if ! git remote get-url $REMOTE_NAME &> /dev/null; then
    echo -e "${YELLOW}🔗 Adding Heroku remote...${NC}"
    heroku git:remote -a $APP_NAME
fi

# Deploy to Heroku
echo -e "${YELLOW} Deploying to Heroku...${NC}"
git add .
git commit -m "Deploy Angular watch app to Heroku" || true
git push $REMOTE_NAME main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    
    # Get the Heroku URL
    HEROKU_URL=$(heroku info --app $APP_NAME | grep "Web URL" | awk '{print $3}')
    echo -e "${GREEN}🌐 Your app is live at: $HEROKU_URL${NC}"
    echo -e "${GREEN}📊 Dashboard: https://dashboard.heroku.com/apps/$APP_NAME${NC}"
    
    # Test the deployment
    echo -e "${YELLOW} Testing deployment...${NC}"
    sleep 10
    curl -s "$HEROKU_URL/health" | head -1
    
    echo -e "${GREEN}🎉 Watch Angular app is now live on Heroku!${NC}"
    echo -e "${YELLOW}📝 Next: Configure Cloudflare to proxy to: $HEROKU_URL${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi 