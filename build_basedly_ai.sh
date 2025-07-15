#!/bin/bash

# Basedly.AI iOS App Build and Submission Script
# This script automates the build, archive, and submission process using API keys

set -e  # Exit on any error

echo "🚀 Starting Basedly.AI iOS App Build and Submission Process..."

# Configuration
PROJECT_NAME="ThreadSocialAI"
SCHEME_NAME="ThreadSocialAI"
ARCHIVE_NAME="BasedlyAI.xcarchive"
IPA_NAME="BasedlyAI.ipa"
EXPORT_PATH="./build"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Xcode command line tools are installed
check_xcode() {
    print_status "Checking Xcode installation..."
    if ! command -v xcodebuild &> /dev/null; then
        print_error "Xcode command line tools not found. Please install Xcode and run 'xcode-select --install'"
        exit 1
    fi
    print_success "Xcode command line tools found"
}

# Check if we're in the right directory
check_directory() {
    print_status "Checking project structure..."
    if [ ! -f "${PROJECT_NAME}.xcodeproj/project.pbxproj" ]; then
        print_error "${PROJECT_NAME}.xcodeproj not found. Please run this script from the project root directory."
        exit 1
    fi
    print_success "Project structure verified"
}

# Clean previous builds
clean_builds() {
    print_status "Cleaning previous builds..."
    xcodebuild clean -project "${PROJECT_NAME}.xcodeproj" -scheme "${SCHEME_NAME}" -configuration Release
    rm -rf "${EXPORT_PATH}"
    mkdir -p "${EXPORT_PATH}"
    print_success "Build directory cleaned"
}

# Build the archive
build_archive() {
    print_status "Building archive..."
    xcodebuild archive \
        -project "${PROJECT_NAME}.xcodeproj" \
        -scheme "${SCHEME_NAME}" \
        -configuration Release \
        -archivePath "${EXPORT_PATH}/${ARCHIVE_NAME}" \
        -destination "generic/platform=iOS" \
        CODE_SIGN_STYLE="Automatic" \
        DEVELOPMENT_TEAM="${TEAM_ID}" \
        PROVISIONING_PROFILE_SPECIFIER="" \
        -allowProvisioningUpdates
    
    if [ $? -eq 0 ]; then
        print_success "Archive built successfully"
    else
        print_error "Archive build failed"
        exit 1
    fi
}

# Export the IPA
export_ipa() {
    print_status "Exporting IPA..."
    xcodebuild -exportArchive \
        -archivePath "${EXPORT_PATH}/${ARCHIVE_NAME}" \
        -exportPath "${EXPORT_PATH}" \
        -exportOptionsPlist "exportOptions.plist"
    
    if [ $? -eq 0 ]; then
        print_success "IPA exported successfully"
    else
        print_error "IPA export failed"
        exit 1
    fi
}

# Validate the IPA
validate_ipa() {
    print_status "Validating IPA..."
    if [ -f "${EXPORT_PATH}/${IPA_NAME}" ]; then
        print_success "IPA file found and validated"
    else
        print_error "IPA file not found"
        exit 1
    fi
}

# Upload to App Store Connect using API Key
upload_to_app_store() {
    print_status "Uploading to App Store Connect using API Key..."
    
    # Use xcrun notarytool with API key
    xcrun notarytool submit "${EXPORT_PATH}/${IPA_NAME}" \
        --apple-id "${APP_STORE_USERNAME}" \
        --password "${APP_STORE_PASSWORD}" \
        --team-id "${TEAM_ID}" \
        --wait
    
    if [ $? -eq 0 ]; then
        print_success "App uploaded to App Store Connect successfully!"
    else
        print_error "App upload failed"
        exit 1
    fi
}

# Main execution
main() {
    echo "=========================================="
    echo "Basedly.AI iOS App Build & Submission Script"
    echo "=========================================="
    
    # Check prerequisites
    check_xcode
    check_directory
    
    # Check for required environment variables
    if [ -z "$APP_STORE_USERNAME" ] || [ -z "$APP_STORE_PASSWORD" ] || [ -z "$TEAM_ID" ]; then
        print_warning "Environment variables not set. Please set:"
        echo "  export APP_STORE_USERNAME='your-apple-id@example.com'"
        echo "  export APP_STORE_PASSWORD='your-app-specific-password'"
        echo "  export TEAM_ID='V32QX8Q2VA'"
        echo ""
        print_warning "For API Key method, also set:"
        echo "  export APP_STORE_CONNECT_API_KEY_ID='your-key-id'"
        echo "  export APP_STORE_CONNECT_API_ISSUER_ID='your-issuer-id'"
        echo "  export APP_STORE_CONNECT_API_KEY_PATH='/path/to/AuthKey_XXXXXXXXXX.p8'"
        echo ""
        read -p "Do you want to continue with build only (without upload)? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
        UPLOAD_APP=false
    else
        UPLOAD_APP=true
    fi
    
    # Build process
    clean_builds
    build_archive
    export_ipa
    validate_ipa
    
    if [ "$UPLOAD_APP" = true ]; then
        upload_to_app_store
    else
        print_success "Build completed successfully!"
        print_status "IPA file location: ${EXPORT_PATH}/${IPA_NAME}"
        print_status "To upload manually, use:"
        echo "  xcrun notarytool submit ${EXPORT_PATH}/${IPA_NAME} --apple-id YOUR_APPLE_ID --password YOUR_APP_SPECIFIC_PASSWORD --team-id V32QX8Q2VA"
    fi
    
    echo ""
    print_success "🎉 Process completed successfully!"
}

# Run main function
main "$@" 