# Code Signing Guide for App Store Distribution

## Current Status
Your app is currently building without code signing for testing purposes. For App Store distribution, you'll need proper code signing.

## Step 1: Apple Developer Account Setup

### Prerequisites
- Active Apple Developer Program membership ($99/year)
- Access to App Store Connect
- Xcode installed on your Mac

### Create Certificates
1. **Distribution Certificate**:
   - Go to [Apple Developer Portal](https://developer.apple.com/account/)
   - Certificates, Identifiers & Profiles → Certificates
   - Click "+" to add new certificate
   - Choose "App Store and Ad Hoc"
   - Follow instructions to create and download

2. **Provisioning Profile**:
   - Go to Profiles section
   - Click "+" to add new profile
   - Choose "App Store"
   - Select your app's Bundle ID
   - Select the distribution certificate
   - Download the profile

## Step 2: Update Xcode Project

### Add Code Signing
1. Open `BasedlyAI.xcodeproj` in Xcode
2. Select the project in the navigator
3. Select the "BasedlyAI" target
4. Go to "Signing & Capabilities" tab
5. Check "Automatically manage signing"
6. Select your Team (Apple Developer account)
7. Set Bundle Identifier (e.g., `com.yourcompany.basedlyai`)

### Manual Signing (Alternative)
If automatic signing doesn't work:
1. Uncheck "Automatically manage signing"
2. Select your Distribution Certificate
3. Select your App Store Provisioning Profile

## Step 3: Update GitHub Actions Workflow

### Replace Current Build Commands
Update `.github/workflows/ios-deploy.yml`:

```yaml
- name: Build and Archive (with signing)
  run: |
    cd BasedlyAI
    xcodebuild -project BasedlyAI.xcodeproj -target BasedlyAI -configuration Release -archivePath BasedlyAI.xcarchive IPHONEOS_DEPLOYMENT_TARGET=18.2 archive
```

### Add Code Signing Secrets
Add these secrets to your GitHub repository:
- `DISTRIBUTION_CERTIFICATE`: Base64 encoded .p12 certificate
- `DISTRIBUTION_CERTIFICATE_PASSWORD`: Certificate password
- `PROVISIONING_PROFILE`: Base64 encoded .mobileprovision file

## Step 4: Test with TestFlight

### Upload to TestFlight First
1. Build and archive with code signing
2. Upload to App Store Connect
3. Add to TestFlight for internal testing
4. Test thoroughly before App Store submission

### TestFlight Setup
1. In App Store Connect, go to TestFlight tab
2. Upload your signed build
3. Add internal testers
4. Test all features thoroughly

## Step 5: Final App Store Submission

### When Ready for App Store
1. Ensure all testing is complete
2. Update screenshots with real app screenshots
3. Complete all App Store Connect metadata
4. Submit for review

## Important Notes:
- **Never commit certificates to Git** - use GitHub Secrets
- **Test thoroughly** before App Store submission
- **Keep certificates secure** - they're required for updates
- **Monitor expiration dates** - renew before they expire

## Troubleshooting:
- If signing fails, check certificate validity
- Ensure Bundle ID matches in all places
- Verify provisioning profile includes your device
- Check Apple Developer account status 