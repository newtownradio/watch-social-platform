#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
kubectl get all -o yaml > backup_$DATE.yaml
echo "Backup created: backup_$DATE.yaml"
