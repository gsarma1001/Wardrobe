# Closet Plan

Closet Plan helps high school and college students decide what to wear to an event using clothes they already own. The first version is a free, session-only web prototype. Try it for prom, homecoming, a graduation party, a cross-country banquet, a band performance, or senior sunrise.

## Use the prototype

1. Add a dress or jumpsuit, or add a top and bottom. Enter an item name, category, and dressiness. Clothing photos are optional.
2. Describe the event and any preferences. For example, “Senior sunrise on the football field. It'll be cold, and I want to wear sneakers.”
3. Choose a dress code or let the prototype infer one from the description. Add a USD budget if you want a shopping search.
4. Select **Find outfits** to see up to three combinations. Select **End session** to clear your items, photos, event details, and results.

The prototype uses rules to rank combinations. It recognizes a limited set of event and preference keywords. Shopping links open a generic search with the item type and budget. Retailers determine actual prices and availability.

## Run locally

Open `index.html` in a browser. The prototype uses HTML, CSS, and JavaScript and runs without a build step. To edit it with VS Code and Copilot, clone the Wardrobe repository and open the cloned folder.

```sh
git clone https://github.com/gsarma1001/Wardrobe.git
cd Wardrobe
code .
```

## Publish with GitHub Pages

Commit `index.html` and this `README.md` to the repository root. In **Settings → Pages**, choose **Deploy from a branch**, select the branch that contains the files, choose **/(root)**, and save. Open the published address shown in Pages settings. GitHub Pages makes the demo publicly accessible. Commit only app source and assets, and use sample clothing photos for testing.

[GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Session privacy

- Clothing photo previews and user inputs live in memory for the current session. The app has no accounts, database, analytics, photo upload endpoint, or AI service.
- The prototype has no personal photo field. Students can use typed item names without adding any photos.
- **End session** clears the current session. A phone can keep the app running in the background, so use **End session** when finished.
- A shopping provider receives the generic item type and budget when a shopper clicks its link. The link omits the student's photos, closet item names, and event description.

## Mobile roadmap

### 1. Test the published web app on phones

Open the GitHub Pages URL on iPhone and Android. Add a sample photo and a few garments, generate an outfit, and check that **End session** clears the session. Repeat after launching from the home screen. Test longer item names and opening a shopping link.

On an iPhone, use Safari's **Add to Home Screen** command and enable **Open as Web App** if shown. On Android, use Chrome's **Add to home screen** menu. Depending on install support, Chrome may offer a shortcut or an app install.

[Apple Support](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios) · [Chrome Help](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid)

### 2. Make it an installable progressive web app

- Add `manifest.webmanifest` with an app name, short name, `start_url` and `scope` set to `./`, `display` set to `standalone`, and 192×192 and 512×512 PNG icons. Use relative asset paths so the app works under GitHub Pages' `/Wardrobe/` path.
- Link the manifest in `index.html`. The current Content Security Policy starts with `default-src 'none'`. Add `manifest-src 'self'` to allow the manifest and add `'self'` to `img-src` alongside `blob:` for same-origin icons.
- Publish over HTTPS and verify the installed app launches from its icon. If you later add offline support, cache only static app files. Keep wardrobe photos, item names, event text, and results out of persistent storage.

[MDN installability guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)

### 3. Package for app stores if needed

Use Capacitor to wrap the existing web app. Create a Node project with a `package.json`, put the web files in a separate directory such as `www/`, and set Capacitor's `webDir` to that directory. Add Android, sync the web assets, and build and test in Android Studio on Windows. For a local iOS build, use macOS with Xcode. Store distribution also requires developer accounts, signing, and review.

Test photo selection, external shopping links, and session clearing again in both native builds.

[Capacitor installation](https://capacitorjs.com/docs/getting-started) · [Platform setup](https://capacitorjs.com/docs/getting-started/environment-setup)

## Product milestones

1. Confirm students can add enough clothes and find an outfit they'd actually wear.
2. Improve recommendations using student feedback and test the experience on phones.
3. Evaluate AI only if it improves outfit suggestions. Keep photos local and evaluate provider retention and request logging before sending any session details to an external service.
