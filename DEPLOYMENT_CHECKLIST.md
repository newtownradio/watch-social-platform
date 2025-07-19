# Watch.style Deployment Checklist

## Pre-Deployment
- [ ] Update `deploy-watch.sh` with your server details
- [ ] Ensure DNS is configured for watch.style
- [ ] Verify SSL certificate exists for watch.style
- [ ] Check server has nginx/apache installed

## Server Setup
- [ ] Upload `watch.style.conf` to `/etc/nginx/sites-available/`
- [ ] Create symlink: `ln -s /etc/nginx/sites-available/watch.style /etc/nginx/sites-enabled/`
- [ ] Test nginx config: `nginx -t`
- [ ] Reload nginx: `systemctl reload nginx`

## Deployment Steps
1. **Run deployment script:**
   ```bash
   chmod +x deploy-watch.sh
   ./deploy-watch.sh
   ```

2. **Verify deployment:**
   - Check https://watch.style loads
   - Test all pages work
   - Verify SSL certificate
   - Check mobile responsiveness

3. **Monitor logs:**
   ```bash
   tail -f /var/log/nginx/access.log
   tail -f /var/log/nginx/error.log
   ```

## Post-Deployment
- [ ] Set up monitoring (UptimeRobot, etc.)
- [ ] Configure backups
- [ ] Set up CI/CD for future updates
- [ ] Test all functionality

## Troubleshooting
- **SSL Issues:** Check certificate renewal
- **404 Errors:** Verify file permissions
- **Performance:** Enable gzip and caching
- **Mobile Issues:** Check viewport meta tags 