# BasedlyAI iOS App - Updated Wed Jul 16 07:33:40 PDT 2025

## GitHub Actions Setup

To deploy to App Store Connect, add these secrets to your GitHub repository:

1. Go to your repository → Settings → Security → Secrets and variables → Actions
2. Add these secrets:
   - `APPLE_ID`: Your Apple ID email address
   - `APP_SPECIFIC_PASSWORD`: An app-specific password generated from appleid.apple.com

## How to get App-Specific Password:
1. Go to https://appleid.apple.com
2. Sign in with your Apple ID
3. Go to "Security" → "App-Specific Passwords"
4. Click "Generate Password"
5. Name it "BasedlyAI GitHub Actions"
6. Copy the generated password

## Build Process:
- Automatically builds on push to main branch
- Creates IPA file
- Uploads to App Store Connect
- Ready for TestFlight or App Store submission
# Testing with new app-specific password - Wed Jul 16 08:30:13 PDT 2025
