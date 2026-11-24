# Closet Plan: Project Vision & Roadmap

**Version:** 1.0  
**Status:** Phase 1 (MVP) in progress  
**Target Users:** High school and college students (ages 14-22)  
**Launch Date:** Q1 2024

---

## Executive Summary

**Closet Plan** solves a simple but universal student problem: *"What can I wear from my closet to this event without buying anything?"*

The app lets students add photos of their existing clothes, describe an upcoming event (prom, homecoming, senior sunrise, etc.), and get 1-3 complete outfit recommendations built from items they already own. No account required. No data stored. No tracking.

**Core value proposition:**
- Students avoid decision paralysis before events
- Students build confidence in their styling
- Students feel privacy-protected (all data stays local)
- Parents appreciate no sign-ups, accounts, or data collection

---

## Product Vision

### For Students
*I open the app, add 5 pieces from my closet, describe my event, and immediately see an outfit I'd actually wear. I don't need an account. I don't need to worry about my photos being sold. When I'm done, I close the app and it forgets everything.*

### For You (The Builder)
*A privacy-first tool that builds trust with students and their families. Start free with simple recommendations. Add smarter matching and shopping integration later based on what students actually use.*

### For the Market
*High school and college students face a trillion micro-decisions about what to wear. The winning solution will be:*
- **Fast** — no signup, no loading
- **Private** — no accounts, no data collection
- **Specific** — understands the event context
- **Helpful** — suggests real outfits from their closet, not "buy these trending pieces"

Closet Plan owns the first 60 seconds of this problem: the moment a student realizes they have nothing to wear.

---

## Target User Personas

### Persona 1: "Alexa" (Junior, All-Girls High School)
- **Age:** 17
- **Event:** Homecoming dance next Friday
- **Pain:** Has a closet full of clothes but no idea what works together
- **Solution needed:** Quick outfit ideas that she actually owns
- **Won't do:** Scroll through 20 pieces or scroll Pinterest for 30 minutes
- **Privacy concern:** Doesn't want to upload a full closet photo; prefers to add items one-by-one

### Persona 2: "Marcus" (Sophomore, State University)
- **Age:** 20
- **Event:** Fraternity formal in 2 weeks
- **Pain:** Has mostly casual clothes; not sure how to look "formal"
- **Solution needed:** Guidance on which casual pieces can work + what to buy
- **Won't do:** Watch YouTube styling videos
- **Privacy concern:** Doesn't want his school/location tied to outfit searches

### Persona 3: "Zoe" (Senior, Urban High School)
- **Age:** 18
- **Event:** Senior sunrise (casual outdoor, cold weather)
- **Pain:** Wants to look cute but be warm and comfortable
- **Solution needed:** Outfit that balances aesthetic + function
- **Won't do:** Spend money if she has options at home
- **Privacy concern:** Shares her phone; needs easy session clearing

---

## Why Mobile App > Web App

| Dimension | Web App | Mobile App | Winner |
|-----------|---------|-----------|--------|
| **Camera Access** | Limited in browser | Native access | Mobile ✅ |
| **Photo Gallery** | Requires upload dialog | Native photo picker | Mobile ✅ |
| **Home Screen** | Add to home screen (PWA) | Native app icon | Mobile ✅ |
| **Offline** | Possible but clunky | Native support | Mobile ✅ |
| **Performance** | Depends on network | Faster app launch | Mobile ✅ |
| **Push Notifications** | Limited (web push) | Full support | Mobile ✅ |
| **Fast Distribution** | Link/QR code | App stores (iOS/Android) | Web ✅ |
| **Code Reuse** | HTML/CSS/JS → Can wrap with Capacitor | Same codebase | Tie |

**Verdict:** Mobile app via **Capacitor** is best because:
1. Keeps your existing HTML/CSS/JS codebase
2. Wraps it as native iOS and Android apps
3. Unlocks camera, photo gallery, local storage, notifications
4. Can publish to App Store and Google Play
5. No need to learn Swift or Kotlin

---

## Product Architecture

### Technology Stack

```
┌─────────────────────────────────────────┐
│   iOS App (App Store)  &  Android App   │
│         (Via Capacitor)                 │
├─────────────────────────────────────────┤
│        Capacitor Plugins                │
│  (Camera, Storage, Notifications, etc)  │
├─────────────────────────────────────────┤
│    Web App (HTML/CSS/JavaScript)        │
│         (Same codebase)                 │
├─────────────────────────────────────────┤
│  Browser Engine (Safari / Chromium)     │
└─────────────────────────────────────────┘
```

**Why Capacitor?**
- Write once (HTML/CSS/JS), deploy to iOS, Android, web
- Access native phone features (camera, storage, notifications)
- No need to learn Swift/Kotlin
- Can gradually add native features

**Frontend Stack:**
- **Framework:** Vanilla JavaScript (no dependencies in Phase 1)
- **Build:** Vite (lightweight, fast) or Webpack
- **Package manager:** npm

**Data Storage (Phase 1):**
- SessionStorage only (clears on app close)
- No database, no cloud sync

**Data Storage (Phase 2+):**
- Optional: AsyncStorage or SQLite for multi-session wardrobe backup
- Optional: Cloud sync via Firebase or custom backend

---

## Feature Breakdown by Phase

### Phase 1: MVP (Sessions Only)
**Goal:** Prove students find outfit suggestions they'd actually wear

**Features:**
- ✅ Add clothing items with optional photos
- ✅ Image crop/rotate before adding (privacy first)
- ✅ Describe event with quick-prompt buttons
- ✅ Get 1-3 outfit recommendations (rules-based)
- ✅ Optional: Search for affordable accessories
- ✅ End session (clears everything)

**Non-Goals:**
- No sign-up / no accounts
- No multi-session persistence
- No AI recommendations
- No real-time price feeds
- No social features

**Success Metric:** 
*At least 60% of testers say "I would wear one of these outfits to this event"*

**Timeline:** 2-3 weeks

---

### Phase 2: Mobile App & PWA
**Goal:** Make the app installable and accessible on mobile devices

**Features:**
- Create manifest.webmanifest (web app config)
- Build mobile apps with Capacitor (iOS + Android)
- Native camera access instead of file upload
- Home screen installation
- Offline session support
- Push notifications (optional: "You have an event coming up!")

**Success Metric:**
*Users can install on home screen and open app without entering a URL*

**Timeline:** 2-3 weeks (depends on app store approval delays)

---

### Phase 3: Smart Recommendations
**Goal:** Improve outfit matching based on student feedback

**Features:**
- Color coordination suggestions
- Fabric/material awareness
- Body type & personal style preferences
- "These pants go well with this top" logic
- Remember preferences within a session
- Outfit "rating" (did you wear it?)

**Non-Goals:**
- Multi-session persistence yet

**Success Metric:**
*Users rate outfit suggestions 4+ stars; 75%+ wear at least one suggested outfit*

**Timeline:** 4-6 weeks (requires user testing & iteration)

---

### Phase 4: Shopping Integration (Monetization)
**Goal:** Help students find affordable alternatives; generate revenue

**Features:**
- Affiliate links to retailers (Amazon, Target, ASOS, Shein, Depop, etc.)
- Price feeds from APIs (optional)
- "Shop this look" buttons
- Budget-aware suggestions
- Link to used/secondhand options

**Monetization:**
- Affiliate commission on clicks/purchases
- Optional "premium" filters (color family, eco-friendly, etc.)

**Success Metric:**
*Users click affiliate links; conversion rate > 2%; revenue covers hosting*

**Timeline:** 6-8 weeks (requires retailer partnerships)

---

### Phase 5: Multi-Session Persistence & AI
**Goal:** Build habit and add intelligent recommendations

**Features:**
- Optional user accounts (email or Apple/Google sign-in)
- Save wardrobe across sessions
- Outfit history ("I wore this")
- AI recommendations (integrate OpenAI vision or similar)
- Share outfit ideas with friends (optional)
- Trending looks among users (privacy-safe aggregation)

**Monetization:**
- Free: 5 session outfits/month
- Premium: Unlimited outfits + AI recommendations + multi-friend share

**Success Metric:**
*30%+ users create accounts; 50% premium conversion among engaged users*

**Timeline:** 10-12 weeks (requires backend + AI integration)

---

## Roadmap Timeline

```
Q1 2024
├── Week 1-2: Finalize Phase 1 (crop, prompts, explanations)
├── Week 3-4: User test with 10+ real students
└── Week 5-6: Iterate based on feedback

Q2 2024
├── Week 7-8: Build Capacitor mobile apps
├── Week 9-10: Test on iOS & Android devices
├── Week 11-12: Submit to App Store + Google Play
└── Week 13-14: Monitor app store review process

Q3 2024
├── Week 15-18: Phase 3 (Smart recommendations)
├── Week 19-22: User testing + iteration
└── Week 23-24: Beta test with 50+ users

Q4 2024
├── Week 25-28: Phase 4 (Shopping integration)
├── Week 29-32: Retailer partnerships + affiliate setup
└── Week 33-36: First monetization push

Q1 2025+
├── Phase 5 (Accounts, AI, premium features)
└── Scale based on traction & user feedback
```

---

## Success Metrics (By Phase)

### Phase 1
- **Adoption:** 100+ organic downloads/users
- **Engagement:** 60%+ add at least 3 items
- **Satisfaction:** 4+ star rating; 60%+ say "would wear"
- **Retention:** 30% return within 1 week

### Phase 2
- **Installation:** 50%+ of web users install mobile app
- **Platform split:** 60% Android, 40% iOS (or ratio in your market)
- **Performance:** App launch < 2 seconds

### Phase 3
- **Rating improvement:** 4.5+ stars average
- **Wear rate:** 75%+ of users wear at least one suggestion
- **Sessions:** Avg 3+ outfit combinations per event

### Phase 4
- **Click-through:** 10%+ of users click affiliate links
- **Conversion:** 2%+ conversion rate (click → purchase)
- **Revenue:** $1-5 per active user per month (depends on AOV)

### Phase 5
- **Account conversion:** 30%+ create accounts
- **Premium adoption:** 10-20% paid subscribers
- **Churn rate:** < 5% monthly churn
- **LTV:** $50+ per user (depending on retention)

---

## Privacy & Trust

### Privacy Principles
1. **Data minimization:** Collect only what's needed for the core experience
2. **User control:** Students can delete everything anytime
3. **Local-first:** Keep data on device as long as possible
4. **Transparent:** Clear policies about what we do with data
5. **Secure:** No unencrypted data transmission; use HTTPS only

### Privacy Policy (Simple Version)
- Photos stay on your device; we never upload them without your permission
- Event descriptions are stored temporarily in memory; we delete them when you end your session
- We don't have accounts, so we don't collect names or emails (unless you opt-in for Phase 5)
- We don't share your data with anyone
- If you delete the app, all data is gone

### For Parents
- Closet Plan is not a social network; students can't share profiles
- No in-app messaging or public feeds
- No ads or tracking
- No location data collected
- No third-party data brokers

---

## Competitive Landscape

### Existing Solutions
| Product | Focus | Limitation |
|---------|-------|-----------|
| Pinterest | Inspiration boards | No personal closet integration |
| Stitch Fix | Subscription boxes | Expensive; not personalized to events |
| Rent the Runway | Formal wear rental | Only rentals; not for casual events |
| ThredUp | Resale marketplace | Requires buying things |
| Facebook Groups (e.g., "What should I wear?") | Peer advice | Requires account; privacy concerns |

### Closet Plan's Unique Position
- **For high school/college students** (not adults)
- **Free** (not subscription)
- **Privacy-first** (no accounts, no tracking)
- **Event-focused** (not general style)
- **Closet-based** (what you have, not what to buy)
- **Fast & simple** (no onboarding)

### Defensibility
- **Network effects:** More users → better recommendation data
- **Brand trust:** "The app my privacy-conscious parents approve"
- **Data advantage:** Outfit matching patterns from millions of events
- **Social proof:** "X% of my peers wear outfits from Closet Plan"

---

## Monetization Strategy

### Phase 1-2: Freemium (Free Always)
- Build user base and trust
- No ads, no paywalls
- Funded by personal savings or angel investment

### Phase 3-4: Affiliate Revenue
- Recommend affordable pieces on Amazon, Target, ASOS, Depop
- Earn 3-5% commission per purchase
- Keep app free for users

### Phase 5: Freemium Tiers
- **Free:** 10 outfit suggestions/month
- **Premium ($2.99/month or $19.99/year):** Unlimited suggestions + AI recommendations
- **Family Plan:** Recommended for group events

### Revenue Projections (Rough)
- 10K users, 1K active/month, $0.50 affiliate revenue/user = $500/month
- 100K users, 10K active/month, $1 affiliate revenue/user = $10K/month
- 1M users, 100K active/month, $2 affiliate revenue/user = $200K/month

---

## Team & Responsibilities

### Phase 1-2 (Solo/Small Team)
- **Product & Design:** You
- **Frontend:** You (HTML/CSS/JS)
- **Mobile Build:** You + Capacitor
- **Testing:** Beta users (recruited)

### Phase 3+ (Scaling)
- **Product Manager:** You or hire
- **Frontend Engineer:** 1-2 people
- **Mobile Engineer:** 1 person (Android/iOS)
- **Backend Engineer:** 1 person (if adding accounts/AI)
- **User Research:** Part-time contractor
- **QA/Testing:** 1 person

---

## Resource Requirements

### Development
- **Hardware:** MacBook (for iOS builds) or rent Mac (Macincloud, MacStadium)
- **Software:** XCode (free), Android Studio (free), Capacitor (free), Node.js (free)
- **Services:** 
  - GitHub (free or $4/month)
  - Figma (free or $12/month for design)
  - Firebase (free tier covers Phase 1-2)
  - Vercel/Netlify (free for hosting web version)

### Marketing & Launch
- **iOS App Store:** $99/year developer account
- **Google Play Store:** $25 one-time developer account
- **User research:** 10-20 beta testers (recruit from high school friends, college clubs)
- **Marketing budget:** Start with $0 (organic growth); scale to $500-1K/month if needed

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Students don't like recommendations | Product-market fit failure | Phase 1 user testing with 10+ students before scaling |
| App Store rejection (privacy concerns) | Delayed launch | Publish privacy policy early; get legal review |
| Privacy breach / data leak | Loss of trust + legal liability | Encrypt data, audit code regularly, have incident plan |
| Competitor (e.g., Google) enters market | Commoditized feature | Build in Phases 1-2 fast; establish user base early |
| Affiliate revenue dries up | Unsustainable monetization | Diversify: add freemium tier, expand partnerships |
| High churn rate | Low LTV, unsustainable growth | Focus on Phase 3 (smart recommendations) early |

---

## Success Criteria (Go/No-Go Decision Points)

### After Phase 1 Testing (Week 4)
**Go if:** 60%+ of 10+ test users say "I would wear this outfit"  
**No-go if:** <40% would wear, or core UX is confusing

### After Phase 2 Mobile Launch (Week 12)
**Go if:** 50+ downloads in first week; 4.0+ star rating  
**No-go if:** <20 downloads or rating <3.5

### After Phase 3 Beta (Week 24)
**Go if:** 50+ beta users, 30%+ retention, 4.5+ rating  
**No-go if:** Churn >40%, recommendation quality poor

### After Phase 4 Monetization (Week 36)
**Go if:** 10%+ CTR on affiliate links; 2%+ conversion rate  
**No-go if:** <5% CTR or revenue <$100/month

---

## Next Steps

1. **This week:** Finalize Phase 1 features; start user testing (5-10 students)
2. **Next week:** Collect feedback; iterate on UX
3. **Week 3:** Set up Capacitor project for mobile builds
4. **Week 4:** Build iOS + Android versions
5. **Week 5:** Submit to App Store + Google Play (while continuing iterations based on Phase 1 feedback)

---

## Appendix: Glossary

- **Affiliate revenue:** Commission from retailer when user clicks your link and buys
- **Capacitor:** Tool to wrap web apps as native iOS/Android apps
- **PWA:** Progressive Web App (installable web app on home screen)
- **Churn rate:** % of users who stop using the app each month
- **LTV:** Lifetime Value (total revenue per user over lifetime)
- **A/B test:** Showing different versions to different users to measure impact

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial vision, roadmap, 5-phase plan |

