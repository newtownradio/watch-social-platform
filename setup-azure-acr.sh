#!/bin/bash

echo "🚀 Setting up Azure Container Registry..."

# Variables
RESOURCE_GROUP="watch-rg"
LOCATION="eastus"
ACR_NAME="watchregistry"
AKS_NAME="watch-cluster"

# Create resource group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create Azure Container Registry
az acr create --resource-group $RESOURCE_GROUP \
    --name $ACR_NAME --sku Basic

# Get ACR login server
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query "loginServer" --output tsv)

echo "✅ ACR created: $ACR_LOGIN_SERVER"

# Build and push Docker image
echo "🐳 Building and pushing Docker image..."
docker build -t $ACR_LOGIN_SERVER/watch-app:latest .
az acr login --name $ACR_NAME
docker push $ACR_LOGIN_SERVER/watch-app:latest

echo "✅ Docker image pushed to ACR" 