# Closet Plan - Mobile App Setup Guide

> Historical guide. This has not been validated for the current server-backed prototype. See [README.md](./README.md) for current setup and mobile limitations.

## Quick Start (Choose Your Path)

### Path A: Continue Web Development (Phase 1)
If you want to stay with web only for now:
```bash
cd C:\Users\gomat\Documents\Wardrobe
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### Path B: Build Mobile Apps (Phase 2)
If you're ready to build iOS and Android apps:

---

## Prerequisites for Mobile Development

Before building mobile apps, install these on your Windows machine:

### 1. Node.js and npm
```bash
# Download from: https://nodejs.org/
# Install version 18+ LTS
# Verify installation:
node --version    # Should show v18+
npm --version     # Should show v9+
```

### 2. For Android Development (Windows)
```bash
# Download Android Studio:
# https://developer.android.com/studio

# After installation, Android Studio will:
# - Set up Android SDK
# - Create emulator
# - Provide Android build tools
```

### 3. For iOS Development (Mac Only)
iOS development requires a Mac with XCode:
```bash
# On Mac:
xcode-select --install
# or install full XCode from App Store
```

**Windows Users:** Can build Android apps now. For iOS, you'll need:
- Option A: Rent a Mac (Macincloud, MacStadium)
- Option B: Wait and use GitHub Actions for iOS builds

---

## Project Structure

```
Closet Plan/
├── www/                           # Web app (HTML, CSS, JS)
│   ├── index.html                # Main app file
│   ├── manifest.webmanifest       # PWA configuration
│   └── assets/
│       ├── icons/                # App icons
│       └── js/
│           ├── pages/            # Page modules (Phase 2+)
│           │   ├── closet.js
│           │   └── event.js
│           └── utils/            # Utility modules
│               ├── outfit-engine.js
│               └── storage.js
│
├── ios/                           # iOS app (after: npx cap add ios)
│   └── App/                       # XCode project
│
├── android/                       # Android app (after: npx cap add android)
│   └── app/                       # Android Studio project
│
├── package.json                   # Node dependencies
├── capacitor.config.json          # Capacitor settings
│
├── PROJECT.md                     # Vision & roadmap
├── MOBILE_APP_GUIDE.md           # This guide
└── README.md                      # Setup instructions
```

---

## Step-by-Step: Set Up Mobile Development

### Step 1: Install Dependencies

```bash
# Navigate to project
cd C:\Users\gomat\Documents\Wardrobe

# Install npm dependencies
npm install

# Verify installation
npm list
```

Expected output:
```
closet-plan@1.0.0
├── @capacitor/cli
└── @capacitor/core
```

### Step 2: Verify Web App Works

```bash
# Test web version
npm run dev
# or manually:
cd www
python -m http.server 8000
# Open http://localhost:8000
```

Verify all features work:
- ✅ Add clothing items
- ✅ Take/crop photos
- ✅ Describe event
- ✅ Get outfit recommendations
- ✅ Clear session

### Step 3: Build Android App (Windows/Mac/Linux)

```bash
# Install Android platform
npx cap add android

# Sync web files to Android
npm run sync

# Open Android Studio
npm run open:android
```

**In Android Studio:**
1. Wait for Gradle to sync (may take 2-3 minutes)
2. Click "Run" (Play button) → Select emulator
3. Wait for emulator to boot and app to install
4. Test on emulator: add items, describe event, get outfits

**Troubleshooting:**
- If emulator won't start: Android Studio → AVD Manager → "Wipe Data"
- If sync fails: `npx cap sync --force`

### Step 4: Build iOS App (Mac Only)

```bash
# Install iOS platform (Mac only)
npx cap add ios

# Sync web files to iOS
npm run sync

# Open XCode
npm run open:ios
```

**In XCode:**
1. Select simulator from dropdown (iPhone 15 Pro)
2. Click "Play" (▶) button
3. Wait for simulator to boot and app to build
4. Test same features as Android

---

## Understanding the Code Structure

### Main App File: `www/index.html`
- Contains all HTML markup
- All CSS styles (inline in `<style>` tag)
- Core JavaScript logic

**Key sections:**
1. `<header>` — Title and clear button
2. `<div class="panels">` — Two-column layout
   - Left: "Add your clothes" form
   - Right: "Plan an outfit" form
3. `<section id="results">` — Outfit recommendations
4. `<div id="cropModal">` — Image crop interface

### Page Modules (Phase 2+)

If you modularize the code:

**`www/assets/js/pages/closet.js`**
- Handles adding/removing clothing items
- Photo upload and crop
- Renders closet display

**`www/assets/js/pages/event.js`**
- Handles event description input
- Generates outfit recommendations
- Shows shopping links

**`www/assets/js/utils/outfit-engine.js`**
- Core algorithm for matching outfits
- Parses event description for preferences
- Ranks combinations by formality

**`www/assets/js/utils/storage.js`**
- Session storage management
- Phase 2+: Can integrate persistent storage

### Configuration Files

**`package.json`**
- Declares npm dependencies
- Defines scripts (dev, build, sync, open:ios, open:android)

**`capacitor.config.json`**
- Capacitor project settings
- App ID: `com.closetplan.app`
- Web directory: `www/`
- Plugin configuration

**`www/manifest.webmanifest`**
- PWA configuration
- App name, icons, colors
- Home screen install config

---

## Development Workflow

### Make a Change (For Any Platform)

1. **Edit code**
   ```bash
   # Edit www/index.html or www/assets/js/*.js
   ```

2. **Test on web**
   ```bash
   npm run dev
   # or: cd www && python -m http.server 8000
   # Open http://localhost:8000
   ```

3. **Verify in browser** (using F12 dev tools)
   - Check for JavaScript errors
   - Test all functionality

4. **Push to mobile apps**
   ```bash
   npm run sync
   npm run open:ios      # or
   npm run open:android
   ```

5. **Test on simulator/emulator**
   - Run from XCode or Android Studio
   - Verify same functionality

### Publish New Version

```bash
# Update version number
# Edit package.json: "version": "1.1.0"
# Edit capacitor.config.json: "version": "1.1.0"

# Commit to git
git add -A
git commit -m "Release v1.1.0: Add new features"
git tag v1.1.0

# When ready to publish:
# iOS: Archive in XCode, upload to App Store
# Android: Build APK in Android Studio, upload to Google Play
```

---

## Adding Native Features (Phase 2+)

### Example: Use Device Camera

**Install camera plugin:**
```bash
npm install @capacitor/camera
npx cap sync
```

**Use in your code:**
```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

async function takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl
  });
  
  // image.dataUrl contains photo
  showPreview(image.dataUrl);
}
```

Then wire to UI:
```html
<button onclick="takePicture()">📷 Take Photo</button>
```

### Other Useful Plugins

- **@capacitor/preferences** — Save data between sessions
- **@capacitor/filesystem** — Read/write files
- **@capacitor/push-notifications** — Send push notifications
- **@capacitor/geolocation** — Get location (privacy-conscious)

---

## Testing Checklist

Before publishing to App Stores, test these scenarios:

### iOS Simulator
- ✅ Photo upload works
- ✅ Crop modal appears
- ✅ Event prompts populate textarea
- ✅ Outfits generate correctly
- ✅ Shopping links open Safari
- ✅ End session clears all data
- ✅ App closes cleanly

### Android Emulator
- ✅ Same as iOS
- ✅ Back button doesn't break app
- ✅ Photo gallery permission dialog appears
- ✅ App installs and launches

### Real Devices
- ✅ Test on actual iPhone and Android phone
- ✅ Camera permission dialog
- ✅ Photo gallery permission dialog
- ✅ Performance on slower network

---

## Troubleshooting

### "Gradle sync failed"
```bash
npx cap sync --force
# Then try again from Android Studio
```

### "No XCode on Windows"
- Use Android only for now
- Rent a Mac later (Macincloud)
- Or use GitHub Actions CI/CD for iOS builds

### "App crashes on startup"
1. Check browser console (F12)
2. Look for JavaScript errors
3. Fix in www/index.html
4. Test in browser first
5. Then: `npm run sync` and rebuild

### "Photos not saving"
- Phase 1: Photos stay in memory (SessionStorage)
- Clears when page closes
- This is by design for privacy
- Phase 2+: Add Preferences for persistent storage

### "Build is too slow"
- First build: 5-10 minutes (normal)
- Rebuilds: 1-2 minutes (normal)
- If >15 minutes:
  - Check internet connection
  - Restart IDE
  - `npx cap sync --force`

---

## Next Steps

### For Phase 1 (Web MVP)
1. ✅ Finish crop preview, event prompts, explanations
2. Test with 5-10 real students
3. Gather feedback
4. Iterate based on feedback

### For Phase 2 (Mobile)
1. Set up Capacitor (this guide)
2. Build iOS and Android apps
3. Test on simulators
4. Submit to App Store + Google Play
5. Wait for app store review

### For Phase 3 (Smart Matching)
1. Improve outfit algorithm based on user feedback
2. Add color coordination
3. Add fabric/material awareness
4. Test with 50+ beta users

---

## Resources

| Resource | Link |
|----------|------|
| **Capacitor Docs** | https://capacitorjs.com/docs |
| **iOS Development** | https://developer.apple.com/ |
| **Android Development** | https://developer.android.com/ |
| **GitHub** | https://github.com/gsarma1001/Wardrobe |
| **npm Packages** | https://www.npmjs.com/ |

---

## Costs

| Item | Cost | Timeline |
|------|------|----------|
| iOS Developer Account | $99/year | Before App Store |
| Android Developer Account | $25 one-time | Before Google Play |
| Mac rental (if needed) | $20-50/month | For iOS builds |
| Domain (optional) | $12/year | For website |
| Hosting (web) | Free | Vercel/Netlify |

---

## Questions?

Refer to:
1. `PROJECT.md` — Vision, roadmap, features
2. `PHASE1_COMPLETE.md` — Architecture details
3. `MOBILE_APP_GUIDE.md` — Detailed mobile setup
4. Code comments in `www/index.html`

Good luck! 🚀

