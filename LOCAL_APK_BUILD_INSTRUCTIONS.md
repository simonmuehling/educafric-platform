# Local APK Build Instructions - EDUCAFRIC Version 4

## Prerequisites

### 1. Install Java 17
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# macOS (using Homebrew)
brew install openjdk@17

# Windows
# Download from: https://adoptium.net/
```

### 2. Install Android SDK
```bash
# Option 1: Android Studio (Recommended)
# Download from: https://developer.android.com/studio

# Option 2: Command Line Tools
# Download from: https://developer.android.com/studio#command-tools
```

### 3. Set Environment Variables
```bash
export JAVA_HOME=/path/to/java17
export ANDROID_HOME=/path/to/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

## Build Process

### 1. Download Project
```bash
# Download from Replit or clone from Git
# Ensure all files are present including android/ directory
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build Web Application
```bash
npm run build
```

### 4. Sync with Android
```bash
npx cap sync android
```

### 5. Build APK
```bash
cd android

# Debug APK (for testing)
./gradlew assembleDebug

# Release APK (for production)
./gradlew assembleRelease
```

### 6. Locate APKs
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Alternative: Cloud Build Services

### GitHub Actions (Automated)
1. Push code to GitHub repository
2. GitHub Actions will build APK automatically
3. Download from Actions artifacts

### Docker Build
```bash
# Build Docker image
docker build -f Dockerfile.android -t educafric-android .

# Extract APKs
docker run --rm -v $(pwd)/output:/output educafric-android
```

### Online Build Services
- **Expo EAS Build:** For React Native apps
- **AppCenter:** Microsoft's mobile development platform
- **Bitrise:** Mobile DevOps platform
- **CircleCI:** Continuous integration platform

## Troubleshooting

### Common Issues
1. **Java Version:** Ensure Java 17 is installed and JAVA_HOME is set
2. **Android SDK:** Verify ANDROID_HOME points to correct SDK location
3. **Gradle Permissions:** Run `chmod +x android/gradlew` if needed
4. **Memory Issues:** Increase heap size with `export GRADLE_OPTS="-Xmx4g"`

### Build Verification
```bash
# Check APK details
aapt dump badging app-debug.apk

# Install on device
adb install app-debug.apk
```
