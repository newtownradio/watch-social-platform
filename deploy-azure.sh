#!/bin/bash

echo "�� Deploying Watch to Azure..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Variables
RESOURCE_GROUP="watch-rg"
LOCATION="eastus"
ACR_NAME="watchregistry"
AKS_NAME="watch-cluster"
APP_NAME="watch-app"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI not found. Please install it first.${NC}"
    exit 1
fi

# Login to Azure
echo -e "${YELLOW} Logging into Azure...${NC}"
az login

# Create resource group
echo -e "${YELLOW}📁 Creating resource group...${NC}"
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Azure Container Registry
echo -e "${YELLOW}🐳 Creating Azure Container Registry...${NC}"
az acr create --resource-group $RESOURCE_GROUP \
    --name $ACR_NAME --sku Basic

# Get ACR login server
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "loginServer" --output tsv)

echo -e "${GREEN}✅ ACR created: $ACR_LOGIN_SERVER${NC}"

# Build and push Docker image
echo -e "${YELLOW}🐳 Building and pushing Docker image...${NC}"
docker build -t $ACR_LOGIN_SERVER/watch-app:latest .
az acr login --name $ACR_NAME
docker push $ACR_LOGIN_SERVER/watch-app:latest

echo -e "${GREEN}✅ Docker image pushed to ACR${NC}"

# Create AKS cluster
echo -e "${YELLOW}📦 Creating AKS cluster...${NC}"
az aks create \
    --resource-group $RESOURCE_GROUP \
    --name $AKS_NAME \
    --node-count 3 \
    --enable-addons monitoring \
    --generate-ssh-keys \
    --attach-acr $ACR_NAME

# Get credentials
echo -e "${YELLOW}🔑 Getting AKS credentials...${NC}"
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_NAME

# Create Kubernetes deployment
echo -e "${YELLOW} Deploying to Kubernetes...${NC}"
kubectl apply -f azure-deployment.yaml

# Wait for deployment
echo -e "${YELLOW}⏳ Waiting for deployment...${NC}"
kubectl rollout status deployment/watch-app

# Get external IP
echo -e "${YELLOW}🌐 Getting external IP...${NC}"
kubectl get service watch-service

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your Watch app is now running on Azure Kubernetes Service${NC}" 