# QUICK FIX: APK Branding Issue - EDUCAFRIC

## 🎯 **The Problem**
Your APK shows "hello Android" instead of the EDUCAFRIC app content.

## ⚡ **Quick Solution**

Run this **single command** to fix the branding:

```bash
cd /Users/simonabando/Downloads/EducafricPlatform-3

# Complete rebuild with forced cache clearing
rm -rf dist/ android/app/build/ android/app/src/main/assets/ && npm run build && npx cap sync android --force && cd android && ./gradlew clean && ./gradlew assembleDebug
```

## 🔧 **What This Does**

1. **Deletes old build cache** (`dist/`, `android/app/build/`, `assets/`)
2. **Rebuilds web app** with proper EDUCAFRIC branding
3. **Forces Capacitor sync** with `--force` flag
4. **Cleans Android build** completely
5. **Generates fresh APK** with correct content

## ✅ **Expected Result**

After running the command:
- ✅ **APK will show "EDUCAFRIC"** instead of "hello Android"
- ✅ **App icon** will display Educafric logo
- ✅ **Web content** will load properly

## 📱 **Testing**

1. **Install the new APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
2. **Launch app** and verify it shows EDUCAFRIC platform
3. **Check home screen** for proper Educafric icon

## 🚀 **For Play Store (AAB)**

Replace `assembleDebug` with `bundleRelease`:

```bash
rm -rf dist/ android/app/build/ android/app/src/main/assets/ && npm run build && npx cap sync android --force && cd android && ./gradlew clean && ./gradlew bundleRelease
```

**Output**: `android/app/build/outputs/bundle/release/app-release.aab`

## ⏱️ **Time Required**
- **2-3 minutes** for complete rebuild
- **Guaranteed fix** for the "hello Android" issue

This command ensures a completely fresh build with no cached artifacts that could show old content.