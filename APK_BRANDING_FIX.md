# Fix APK Branding - EDUCAFRIC

## ❌ **Issue: APK shows "hello Android" instead of Educafric**

The generated APK displays "hello Android" and no logo instead of proper EDUCAFRIC branding.

## 🔍 **Root Cause Analysis**

1. **Web assets not properly synced** to Android project
2. **Default Capacitor splash screen** showing instead of app content
3. **Build cache** containing old web assets
4. **Index.html not loading properly** in WebView

## ✅ **Complete Solution Steps**

### Step 1: Verify Current Configuration
```bash
cd /Users/simonabando/Downloads/EducafricPlatform-3

# Check current web build
ls dist/
ls dist/index.html

# Check Android assets
ls android/app/src/main/assets/public/
```

### Step 2: Clean All Build Caches
```bash
# Clean web build
rm -rf dist/

# Clean Android build
cd android
./gradlew clean
rm -rf app/build/
rm -rf app/src/main/assets/public/
cd ..

# Clean Capacitor cache
rm -rf .capacitor/
```

### Step 3: Rebuild Web Assets Fresh
```bash
# Build web application with proper branding
npm run build

# Verify index.html contains correct title
cat dist/index.html | grep -i "educafric"
```

### Step 4: Force Complete Capacitor Sync
```bash
# Remove old sync data
rm -rf android/app/src/main/assets/

# Force fresh sync
npx cap sync android --force

# Verify sync worked
ls android/app/src/main/assets/public/
cat android/app/src/main/assets/public/index.html | grep -i "educafric"
```

### Step 5: Update Android Splash Screen
Create proper splash screen configuration:

```bash
# Update splash screen to show EDUCAFRIC logo
# File: android/app/src/main/res/values/styles.xml
```

### Step 6: Rebuild APK with Fresh Assets
```bash
cd android

# Clean build completely
./gradlew clean

# Generate fresh APK
./gradlew assembleDebug

# Or generate AAB for Play Store
./gradlew bundleRelease
```

## 🎯 **Expected Results After Fix**

- ✅ **App Name**: Shows "EDUCAFRIC" instead of "hello Android"
- ✅ **App Icon**: Displays Educafric logo on home screen
- ✅ **Launch Screen**: Shows proper Educafric branding
- ✅ **Web Content**: Loads complete Educafric platform interface

## 🔧 **Alternative: Manual Asset Verification**

If the issue persists, manually verify:

```bash
# Check what's actually in the Android assets
find android/app/src/main/assets/ -name "*.html" -exec grep -l "educafric" {} \;

# Check if web build is correct
find dist/ -name "*.html" -exec grep -l "educafric" {} \;

# Compare timestamps
ls -la dist/index.html
ls -la android/app/src/main/assets/public/index.html
```

## 📱 **Testing the Fix**

1. **Install APK** on device/emulator
2. **Launch app** and verify it shows "EDUCAFRIC" 
3. **Check app icon** in launcher
4. **Verify web content** loads properly

The key is ensuring the web assets are completely rebuilt and synced fresh to Android, clearing all caches that might contain the old "hello Android" content.

## 🚀 **Quick Fix Command**

```bash
# One-line fix for the branding issue
rm -rf dist/ android/app/build/ android/app/src/main/assets/ .capacitor/ && npm run build && npx cap sync android --force && cd android && ./gradlew clean && ./gradlew bundleRelease
```

This ensures a completely fresh build with proper EDUCAFRIC branding.