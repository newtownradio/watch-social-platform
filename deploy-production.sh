#!/bin/bash
echo "�� Deploying Watch to Production..."

# Build and push image
docker build --platform linux/amd64 -t watchregistry.azurecr.io/watch-app:latest .
az acr login --name watchregistry
docker push watchregistry.azurecr.io/watch-app:latest

# Update deployment
kubectl set image deployment/watch-app watch-app=watchregistry.azurecr.io/watch-app:latest

# Wait for rollout
kubectl rollout status deployment/watch-app

# Health check
curl -f http://172.171.149.108/health

echo "✅ Production deployment complete!"
echo "�� Access your app at: http://172.171.149.108"
