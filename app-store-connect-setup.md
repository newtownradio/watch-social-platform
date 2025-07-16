# App Store Connect Setup Guide for Basedly.AI

## Step 1: Access App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Sign in with your Apple Developer account
3. Click "My Apps" in the top navigation

## Step 2: Create New App
1. Click the "+" button in the top left
2. Select "New App"
3. Fill out the form:
   - **Platforms**: iOS
   - **Name**: Basedly.AI
   - **Primary Language**: English
   - **Bundle ID**: com.yourcompany.basedlyai (or your unique identifier)
   - **SKU**: basedly-ai-ios (unique identifier for your records)
   - **User Access**: Full Access (or as needed)

## Step 3: App Information
1. **App Name**: Basedly.AI
2. **Subtitle**: AI-Powered Social Discovery
3. **Description**: Copy from `app-store-metadata/description.txt`
4. **Keywords**: Copy from `app-store-metadata/keywords.txt`
5. **Support URL**: https://basedly.ai/support
6. **Marketing URL**: https://basedly.ai
7. **Privacy Policy URL**: https://basedly.ai/privacy

## Step 4: App Store Information
1. **Category**: Social Networking
2. **Content Rights**: Check "I confirm that I have all necessary rights to use this content"
3. **Age Rating**: 4+ (no objectionable content)

## Step 5: Pricing and Availability
1. **Price**: Free
2. **Availability**: All countries (or select specific regions)
3. **Release Type**: Manual (you control when it goes live)

## Step 6: Upload Build
1. Go to "TestFlight" tab
2. Click "Build" section
3. Upload the IPA file from your latest GitHub Actions build
4. Wait for processing (can take 10-30 minutes)

## Step 7: Add Screenshots
1. Go to "App Store" tab
2. Select "iOS App" in the left sidebar
3. Upload screenshots from `app-store-screenshots/` directory:
   - iPhone 6.7" (1290 x 2796)
   - iPhone 6.5" (1242 x 2688)
   - iPhone 5.5" (1242 x 2208)
   - iPad Pro 12.9" (2048 x 2732)

## Step 8: App Review Information
1. **Contact Information**: Your contact details
2. **Demo Account**: Create a test account for reviewers
3. **Notes**: Any special instructions for reviewers

## Step 9: Submit for Review
1. Ensure all required fields are completed
2. Click "Submit for Review"
3. Wait for Apple's review process (typically 1-7 days)

## Important Notes:
- Replace placeholder screenshots with actual app screenshots
- Update privacy policy and support URLs with real URLs
- Test the app thoroughly before submission
- Monitor review status in App Store Connect 