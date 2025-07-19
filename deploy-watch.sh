#!/bin/bash

# Watch.style Deployment Script
# Deploys the web application to your existing server

echo "🚀 Starting Watch.style deployment..."

# Configuration
REMOTE_HOST="your-server.com"  # Update with your server details
REMOTE_USER="your-username"     # Update with your username
REMOTE_PATH="/var/www/watch.style"
LOCAL_PATH="./ThreadSocialAI"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Deployment Configuration:${NC}"
echo "Remote Host: $REMOTE_HOST"
echo "Remote Path: $REMOTE_PATH"
echo "Local Path: $LOCAL_PATH"

# Check if local files exist
if [ ! -d "$LOCAL_PATH" ]; then
    echo -e "${RED}❌ Error: Local path $LOCAL_PATH not found${NC}"
    exit 1
fi

# Create backup of current deployment
echo -e "${YELLOW}�� Creating backup of current deployment...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST "if [ -d $REMOTE_PATH ]; then cp -r $REMOTE_PATH ${REMOTE_PATH}_backup_$(date +%Y%m%d_%H%M%S); fi"

# Create remote directory if it doesn't exist
echo -e "${YELLOW}📁 Creating remote directory...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH"

# Sync files to server
echo -e "${YELLOW}�� Uploading files to server...${NC}"
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    $LOCAL_PATH/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded successfully${NC}"
else
    echo -e "${RED}❌ File upload failed${NC}"
    exit 1
fi

# Set proper permissions
echo -e "${YELLOW}🔐 Setting file permissions...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST "chmod -R 755 $REMOTE_PATH && chown -R www-data:www-data $REMOTE_PATH"

# Test the deployment
echo -e "${YELLOW}�� Testing deployment...${NC}"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://watch.style)

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Deployment successful! Site is live at https://watch.style${NC}"
else
    echo -e "${YELLOW}⚠️  Site returned HTTP $HTTP_STATUS - check server configuration${NC}"
fi

echo -e "${GREEN}🎉 Watch.style deployment completed!${NC}" 