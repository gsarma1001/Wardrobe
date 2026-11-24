# Building Closet Plan as a Mobile App

## Why Capacitor?

**Capacitor** lets you:
- Write once (HTML/CSS/JS), deploy to iOS, Android, and web
- Access native features (camera, storage, notifications)
- Skip learning Swift or Kotlin
- Publish to App Store and Google Play with minimal extra code

**Timeline:** 2-3 weeks to build mobile apps from your existing web code

---

## Step 1: Set Up Your Project

### Prerequisites
Install these first:

```bash
# Install Node.js (includes npm)
# Download from: https://nodejs.org/

# Verify installation
node --version    # Should be v18+
npm --version     # Should be v9+
```

### Create Mobile Project Structure

```bash
# Navigate to your Wardrobe folder
cd C:\Users\gomat\Documents\Wardrobe

# Initialize Node project
npm init -y

# Install Capacitor and dependencies
npm install @capacitor/core @capacitor/cli
npm install -D vite   # Lightweight bundler (optional for Phase 1)

# Initialize Capacitor
npx cap init Closet Plan --web-dir=www
```

This creates:
- `package.json` - Node dependencies
- `capacitor.config.json` - Capacitor settings
- `www/` - Your web app files (you'll copy index.html here)

### Set Up Web Directory

```bash
# Create www directory
mkdir www

# Copy your app to www
cp index.html www/
cp -r assets www/   # If you add images/icons later

# Create a simple package.json script
# (Add this to your package.json under "scripts")
```

**Update `package.json`:**
```json
{
  "name": "closet-plan",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "web": "npm run build && npx http-server www -p 8000",
    "sync": "npx cap sync",
    "open:ios": "npx cap open ios",
    "open:android": "npx cap open android"
  },
  "dependencies": {
    "@capacitor/core": "^5.0.0",
    "@capacitor/cli": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  }
}
```

---

## Step 2: Add Mobile Platforms

### Add iOS (macOS only; requires XCode)

```bash
npx cap add ios
```

This creates:
- `ios/App/` - Your iOS app
- `ios/App/App.xcworkspace` - XCode workspace

**To build for iOS:**
```bash
npm run sync      # Sync web files to iOS
npm run open:ios  # Opens XCode
```

Then in XCode:
1. Select `iOS Deployment Target: 14.0+`
2. Click "Play" button to build and run on simulator or device

### Add Android (Windows/Mac/Linux; requires Android Studio)

```bash
npx cap add android
```

This creates:
- `android/app/` - Your Android app
- `android/build.gradle` - Android build config

**To build for Android:**
```bash
npm run sync        # Sync web files to Android
npm run open:android # Opens Android Studio
```

Then in Android Studio:
1. Click "Run" button (▶)
2. Select emulator or connected device
3. App installs and launches

---

## Step 3: Use Native Features

### Example 1: Access Camera (Phase 2+)

Add to your `index.html` or new `src/camera.js`:

```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

async function takePictureOfClothes() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl
  });
  
  // image.dataUrl contains the photo
  showPreview(image.dataUrl);
}
```

Then wire it to your photo button:
```html
<button onclick="takePictureOfClothes()">📷 Take Photo</button>
```

### Example 2: Access Photo Gallery (Phase 2+)

```javascript
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

async function pickFromGallery() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Photos
  });
  
  showPreview(image.dataUrl);
}
```

### Example 3: Store Data Locally (Phase 2+)

```javascript
import { Preferences } from '@capacitor/preferences';

// Save outfit
async function saveOutfit(outfitData) {
  await Preferences.set({
    key: 'lastOutfit',
    value: JSON.stringify(outfitData)
  });
}

// Load outfit
async function loadOutfit() {
  const { value } = await Preferences.get({ key: 'lastOutfit' });
  return JSON.parse(value);
}
```

**Note:** Phase 1 uses SessionStorage only (clears on app close). Phase 2 can add Preferences for multi-session storage.

### Example 4: Send Push Notifications (Phase 2+)

```javascript
import { PushNotifications } from '@capacitor/push-notifications';

async function setupNotifications() {
  let permStatus = await PushNotifications.checkPermissions();
  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }
  
  if (permStatus.receive !== 'granted') {
    throw new Error('User denied notifications');
  }
  
  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push received:', notification);
  });
}
```

---

## Step 4: Configure App Details

### iOS Configuration (`ios/App/App/Info.plist`)

```xml
<key>CFBundleDisplayName</key>
<string>Closet Plan</string>

<key>CFBundleShortVersionString</key>
<string>1.0.0</string>

<key>NSCameraUsageDescription</key>
<string>Closet Plan needs camera access to photograph your clothing items.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Closet Plan needs photo library access to add images from your phone.</string>
```

### Android Configuration (`android/app/build.gradle`)

```gradle
android {
  compileSdkVersion 34
  defaultConfig {
    minSdkVersion 21
    targetSdkVersion 34
    versionCode 1
    versionName "1.0.0"
  }
}
```

### Permissions (`android/app/src/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

---

## Step 5: Create App Icons

### Icon Requirements

| Platform | Size | Format | Location |
|----------|------|--------|----------|
| iOS App Icon | 192×192 px | PNG | `ios/App/App/Assets.xcassets/` |
| Android App Icon | 192×192 px | PNG | `android/app/src/main/res/mipmap-xxxhdpi/` |
| Web Icon | 192×192 & 512×512 | PNG | `www/assets/icons/` |

### Generate Icons (Free)

1. Go to: https://www.favicon-generator.org/
2. Upload your Closet Plan logo
3. Download iOS and Android icons
4. Place in correct directories

### Create manifest.webmanifest (For PWA)

Create `www/manifest.webmanifest`:

```json
{
  "name": "Closet Plan",
  "short_name": "Closet",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#23163c",
  "background_color": "#f5f0ff",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

Link in `index.html` `<head>`:
```html
<link rel="manifest" href="manifest.webmanifest">
```

---

## Step 6: Build & Test

### Test on Web

```bash
npm run web
# Opens app at http://localhost:8000
```

### Test on iOS Simulator

```bash
npm run sync      # Sync web files to iOS
npm run open:ios  # Opens XCode
```

In XCode:
- Select "iPhone 15 Pro" simulator from top dropdown
- Click Play (▶) button
- Wait 30 seconds for simulator to boot
- App loads automatically

### Test on Android Emulator

```bash
npm run sync        # Sync web files to Android
npm run open:android # Opens Android Studio
```

In Android Studio:
- Click "Create Virtual Device" if you don't have an emulator
- Select "Pixel 6 Pro" with Android 14
- Click Play (▶) to run
- Wait 1-2 minutes for emulator to boot
- App installs and launches

---

## Step 7: Publish to App Stores

### iOS App Store

**Prerequisites:**
- Apple Developer account ($99/year)
- Mac with XCode
- App signing certificate

**Steps:**
1. In XCode, select "iOS Device" (not simulator)
2. Product → Archive
3. Click "Distribute App"
4. Select "App Store Connect"
5. Fill out app details:
   - App Name: "Closet Plan"
   - Description: "Find outfits from your closet for any event"
   - Category: "Lifestyle"
   - Privacy Policy: Link to your privacy page
   - Screenshots: 1-5 screenshots of app UI
   - Age Rating: 4+
6. Submit for review (takes 1-7 days)

### Google Play Store

**Prerequisites:**
- Google Play Developer account ($25 one-time)
- Signed Android APK or App Bundle

**Steps:**
1. In Android Studio, Build → Build Bundle(s)/APK(s) → Build Bundle(s)
2. This creates an `.aab` file (App Bundle)
3. Go to Google Play Console
4. Create new app: "Closet Plan"
5. Fill out store listing:
   - Description, screenshots, category, etc.
   - Privacy policy required
6. Upload `.aab` file to Internal Testing first
   - Test with 10-20 people
   - Collect feedback
7. Promote to Closed Testing, then Open Testing
8. After testing, promote to Production
9. Submit for review (takes 2-24 hours usually)

---

## Project Structure (Phase 2+)

```
Closet Plan/
├── www/                           # Web app files
│   ├── index.html                # Main app (single-page)
│   ├── manifest.webmanifest       # PWA config
│   └── assets/
│       ├── icons/                # App icons
│       ├── css/                  # Stylesheets (optional modularization)
│       └── js/                   # JavaScript modules
│           ├── pages/            # Page modules
│           │   ├── closet.js
│           │   ├── event.js
│           │   └── results.js
│           └── utils/            # Utility functions
│               ├── outfit-engine.js
│               └── storage.js
│
├── ios/                           # iOS app (Capacitor)
│   └── App/
│       ├── App/                  # XCode project
│       └── App.xcworkspace        # Workspace
│
├── android/                       # Android app (Capacitor)
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   └── AndroidManifest.xml
│   │   │   └── androidTest/
│   │   └── build.gradle
│   └── settings.gradle
│
├── package.json                   # Node dependencies & scripts
├── capacitor.config.json          # Capacitor config
│
├── PROJECT.md                     # This project document
├── README.md                      # Setup instructions
└── .git/                          # Git repository
```

---

## Development Workflow (Phase 2+)

### Make a Change
1. Edit `www/index.html` or `www/assets/js/*.js`
2. Test in browser: `npm run web`
3. Verify on simulator/emulator

### Push Changes to Mobile Apps
```bash
npm run sync      # Syncs www/ to ios/ and android/
```

### Test on Devices
```bash
npm run open:ios
npm run open:android
# Then run from XCode or Android Studio
```

### Version Bump Before Release
Edit `capacitor.config.json` and `package.json`:
```json
"version": "1.1.0"
```

Then:
```bash
git tag v1.1.0
git push --tags
```

---

## Common Issues & Fixes

### iOS Build Fails: "Could not find SDK"
**Fix:** 
```bash
sudo xcode-select --reset
```

### Android Emulator Won't Start
**Fix:**
1. In Android Studio, AVD Manager → "Wipe Data"
2. Try running again
3. If still fails, delete emulator and create new one

### Photos Don't Load from Camera
**Check:**
1. Permissions are requested in app
2. User granted permission
3. Use `resultType: CameraResultType.DataUrl` for base64 encoding

### App Crashes on Launch
**Debug:**
1. Check console: `npm run web` and open browser dev tools (F12)
2. Look for JavaScript errors
3. Fix errors in `www/index.html` or JS files
4. Test in browser first before rebuilding mobile apps

---

## Next: Modularize for Larger Codebase

When you move to Phase 2+, split your code into modules:

**`www/assets/js/pages/closet.js`** — Add clothes
```javascript
export function initClosetPage() {
  const form = document.getElementById('closet');
  form.addEventListener('submit', handleAddItem);
}

function handleAddItem(e) {
  // Add item logic
}
```

**`www/assets/js/pages/event.js`** — Describe event
```javascript
export function initEventPage() {
  // Event form logic
}
```

**`www/assets/js/pages/results.js`** — Show outfits
```javascript
export function showOutfits(outfits) {
  // Render outfits
}
```

**`www/assets/js/utils/outfit-engine.js`** — Recommendation logic
```javascript
export function generateOutfits(items, eventDescription) {
  // Core algorithm
}
```

**In `index.html`:**
```html
<script type="module">
  import { initClosetPage } from './assets/js/pages/closet.js';
  import { initEventPage } from './assets/js/pages/event.js';
  
  initClosetPage();
  initEventPage();
</script>
```

This keeps your code organized as it grows.

---

## Timeline: Web → Mobile App

| Phase | Timeline | What You Build |
|-------|----------|---|
| **Phase 1** | Week 1-4 | Finish MVP (crop, prompts, explanations) |
| **Phase 1.5** | Week 5-6 | User test with 10+ students |
| **Phase 2 (Mobile)** | Week 7-10 | Build Capacitor apps; test on iOS/Android |
| **Phase 2.5** | Week 11-12 | Submit to App Store + Google Play |
| **Phase 3** | Week 13-20 | Smart recommendations + user testing |
| **Phase 4** | Week 21-28 | Shopping integration + affiliate setup |

---

## Resources

- **Capacitor Docs:** https://capacitorjs.com/docs
- **iOS Development:** https://developer.apple.com/
- **Android Development:** https://developer.android.com/
- **Figma Design:** https://www.figma.com/
- **GitHub:** https://github.com/

---

## Costs (Rough)

| Item | Cost | When |
|------|------|------|
| iOS Developer Account | $99/year | Before App Store submission |
| Android Developer Account | $25 one-time | Before Google Play submission |
| MacBook (for iOS builds) | $1,200+ | Only if you don't have one; can rent on Macincloud |
| Hosting (web version) | $0 | Use Vercel or Netlify free tier |
| Domains | $12/year | Optional for Phase 1 |
| **Total Year 1** | ~$150-1,400 | Depending on hardware |

---

Good luck building! 🚀

