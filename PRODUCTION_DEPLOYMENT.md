# Watch App - Production Deployment Guide

## Overview
This guide covers deploying the Watch app to production with proper security, email functionality, and user authentication.

## Prerequisites
- Node.js 18+ installed
- Docker installed
- Azure Container Registry (ACR) account
- Azure Kubernetes Service (AKS) cluster
- SMTP email service (Gmail, SendGrid, etc.)

## 1. Environment Configuration

### Create Production Environment File
Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

### Required Environment Variables
```env
NODE_ENV=production
PORT=3000
BASE_URL=https://your-domain.com
JWT_SECRET=your-super-secret-jwt-key-change-in-production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Email Configuration
For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use App Password in SMTP_PASS

For SendGrid:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 2. Security Hardening

### JWT Secret
Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Environment Variables in Kubernetes
```bash
kubectl create secret generic watch-app-secrets \
  --from-literal=JWT_SECRET=your-jwt-secret \
  --from-literal=SMTP_USER=your-email \
  --from-literal=SMTP_PASS=your-password
```

## 3. Database Setup (Future Enhancement)
Currently using in-memory storage. For production, add:
- PostgreSQL or MongoDB
- Connection pooling
- Backup strategy
- Migration scripts

## 4. Docker Build & Deploy

### Build Production Image
```bash
docker build -t watch-app:production .
docker tag watch-app:production your-registry.azurecr.io/watch-app:production
docker push your-registry.azurecr.io/watch-app:production
```

### Update Kubernetes Deployment
```bash
kubectl set image deployment/watch-app watch-app=your-registry.azurecr.io/watch-app:production
kubectl rollout status deployment/watch-app
```

## 5. SSL/TLS Configuration

### Using Let's Encrypt
```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f cluster-issuer.yaml
```

### Update Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: watch-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: watch-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: watch-service
            port:
              number: 80
```

## 6. Monitoring & Logging

### Health Checks
The app includes health check endpoints:
- `/health` - Basic health status
- `/api/status` - Detailed app status

### Logging
Configure structured logging:
```javascript
// Add to server.js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Metrics
Add Prometheus metrics:
```bash
npm install prom-client
```

## 7. Backup Strategy

### User Data
- Implement database backups
- Export user data regularly
- Test restore procedures

### Configuration
- Version control all configs
- Document all environment variables
- Backup SSL certificates

## 8. Testing Production

### Smoke Tests
```bash
# Health check
curl https://your-domain.com/health

# API status
curl https://your-domain.com/api/status

# Authentication
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@watch.com","password":"password123"}'
```

### Email Testing
1. Register new user
2. Check verification email
3. Test password reset
4. Verify email templates

## 9. Performance Optimization

### Caching
- Add Redis for session storage
- Implement API response caching
- Use CDN for static assets

### Database Optimization
- Add indexes for user queries
- Implement connection pooling
- Monitor query performance

## 10. Security Checklist

- [ ] JWT secret is strong and unique
- [ ] HTTPS enabled with valid certificate
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF protection implemented
- [ ] Security headers configured
- [ ] Regular security updates

## 11. Maintenance

### Regular Tasks
- Monitor logs for errors
- Check email delivery rates
- Update dependencies
- Review security alerts
- Backup verification

### Updates
```bash
# Update dependencies
npm audit fix
npm update

# Rebuild and deploy
docker build -t watch-app:latest .
docker push your-registry.azurecr.io/watch-app:latest
kubectl rollout restart deployment/watch-app
```

## 12. Troubleshooting

### Common Issues

**Email not sending:**
- Check SMTP credentials
- Verify firewall settings
- Check email service limits

**Authentication failing:**
- Verify JWT secret
- Check token expiration
- Validate user data

**High memory usage:**
- Monitor user sessions
- Check for memory leaks
- Optimize database queries

### Logs
```bash
# View application logs
kubectl logs -f deployment/watch-app

# View ingress logs
kubectl logs -f ingress-nginx-controller

# Check pod status
kubectl get pods -o wide
```

## Support
For production issues:
1. Check application logs
2. Verify environment configuration
3. Test endpoints individually
4. Review monitoring metrics
5. Contact development team

---

**Note:** This is a production-ready setup. Always test thoroughly in staging before deploying to production. 