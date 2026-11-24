# Closet Plan: Quick Start Guide

> Historical guide for the old prototype. Use [README.md](./README.md) for current setup and privacy details.

## What You Have

A **free, privacy-first web app** that helps high school and college students find outfits from their existing closet for specific events.

**Core flow:**
1. Add clothing items (with optional photos)
2. Describe the event
3. Get 1-3 outfit recommendations
4. Optional: search for affordable accessories
5. End session (clears everything)

---

## Try It Now

### Option 1: Local Testing
```bash
# Navigate to the project folder
cd C:\Users\gomat\Documents\Wardrobe

# Start a local web server
python -m http.server 8000

# Open in your browser
# http://localhost:8000
```

Then:
1. Add 3-5 sample items (crop a test photo if you have one)
2. Type an event description: "Homecoming dance, dressy casual, outdoor in fall"
3. Click "Find outfits"
4. Click "End session" and verify everything clears

### Option 2: GitHub Pages (Coming Soon)
Once you push to GitHub and enable Pages, it'll be live at:
`https://gsarma1001.github.io/Wardrobe/`

---

## Key Features (Phase 1)

✅ **Image Crop Preview** — Rotate and frame photos before adding (privacy first)

✅ **Event Prompts** — Buttons for Prom, Homecoming, Senior Sunrise, etc.

✅ **Smart Explanations** — Each outfit explains why it matches the event

✅ **Mobile-Friendly** — Works on iPhone and Android browsers

✅ **No Account Needed** — Pure session-based, no signup

✅ **No Data Saved** — Everything clears when session ends

---

## Next: Test With Real Students

The most important question isn't "Do you like the colors?" but:
**"Would you actually wear this outfit to that event?"**

**Who to test with:**
- High school students planning an upcoming event (homecoming, prom, senior sunrise)
- College students with a formal event coming up

**What to watch for:**
- Do they add at least 3 clothing items without frustration?
- Do they understand the outfit recommendations?
- Do they click "End session" and trust it's private?

**Red flags to fix:**
- Photo upload is confusing → simplify
- Event prompts don't match their needs → add more prompts
- Outfit explanations don't make sense → improve keyword matching

---

## Project Structure

```
Wardrobe/
├── index.html              ← The app (HTML, CSS, JavaScript all in one file)
├── README.md               ← Original documentation
├── PHASE1_COMPLETE.md      ← Feature details & architecture
├── QUICKSTART.md           ← You are here
└── .git/                   ← Git repository
```

---

## Roadmap

**Phase 1 (Current):** MVP with crop preview, event prompts, local recommendations ✓

**Phase 2:** PWA installation (home screen icon on mobile)

**Phase 3:** Smarter matching (color coordination, fabric hints, body type preferences)

**Phase 4:** Shopping integration (real prices, affiliate links, "buy this" labels)

**Phase 5:** User feedback loop (track which outfits students actually wore)

---

## Privacy Guarantees (For Your Students)

- ✅ **No account signup** — Works without creating an account
- ✅ **No photos uploaded** — Photos stay on the student's device
- ✅ **No tracking** — No analytics, no cookies, no data stored
- ✅ **Easy to clear** — "End session" deletes everything from memory
- ✅ **Private by default** — No background saves or login state

**How you maintain this:**
- Keep data in memory only (no localStorage, no IndexedDB)
- Never upload photos to a server or AI service without explicit consent
- Never send event details or personal info to third parties
- If adding an AI provider later, evaluate their data retention policy first

---

## Troubleshooting

**Q: Image crop preview doesn't appear?**
A: Make sure your browser allows file uploads. Try uploading a JPG or PNG from your computer.

**Q: Can I save my closet between sessions?**
A: Not in v1. That requires a database and accounts (privacy trade-off). Consider adding this only after students ask for it.

**Q: How do I add more event types?**
A: Edit `index.html` and add more `<button class="event-prompt secondary" data-event="...">Label</button>` lines in the event prompts section.

**Q: Can I add an AI recommendation engine?**
A: Yes, but do user testing first to understand what students need. When ready, send only clothing labels + event text (no photos) and choose a provider with clear data deletion policies.

---

## Questions?

Revisit the architecture in `PHASE1_COMPLETE.md` or the code comments in `index.html`.

Ready to test with real students? Let's go! 🚀
