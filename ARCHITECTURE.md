# Closet Plan: User Flows & Information Architecture

## User Flow Diagram (Phase 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                       APP OPENS                                  │
│                (Session Initialized)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │   THREE PARALLEL PATHS        │
              │   (User can do any order)     │
              └───────────────────────────────┘
              │               │               │
      ┌───────▼────┐  ┌──────▼─────┐  ┌─────▼──────┐
      │ ADD CLOTHES │  │ ADD CLOTHES │  │  DESCRIBE  │
      │  (Repeats)  │  │  (Repeats)  │  │   EVENT    │
      └───────┬────┘  └──────┬──────┘  └─────┬──────┘
              │       Item 1-5+        Description │
              │               │               │
              └───────────────┼───────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  BOTH HAVE DATA?    │
                    │  Items ≥3 & Event?  │
                    └────────┬────────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 YES                     NO
                 │                       │
         ┌───────▼────────┐    ┌────────▼────────┐
         │  SHOW 1-3      │    │   STATUS: Add   │
         │  OUTFIT IDEAS  │    │  more items or  │
         └───────┬────────┘    │  describe event │
                 │             └─────────────────┘
                 │
         ┌───────▼──────────┐
         │  SHOW OPTIONAL   │
         │  SHOPPING LINKS  │
         │  (If budget set) │
         └───────┬──────────┘
                 │
         ┌───────▼──────────┐
         │   USER CAN:      │
         │  - Adjust items  │
         │  - Try new event │
         │  - Shop links    │
         │  - End session   │
         └───────┬──────────┘
                 │
         ┌───────▼──────────┐
         │  END SESSION     │
         │  (Clears all)    │
         └──────────────────┘
              │
              ▼
         ┌──────────────┐
         │ BACK TO TOP  │
         │ (Fresh start)│
         └──────────────┘
```

---

## Information Architecture

### Screen 1: Add Your Clothes (Left Panel)

```
┌──────────────────────────────────┐
│   ADD YOUR CLOTHES               │
├──────────────────────────────────┤
│                                  │
│  Item name: [Black trousers   ]  │
│                                  │
│  Category: [Top        ▼]        │
│            - Top                 │
│            - Bottom              │
│            - Dress or jumpsuit   │
│            - Layer               │
│            - Shoes               │
│            - Accessory           │
│                                  │
│  How dressy? [Casual          ▼]│
│              - Casual            │
│              - Dressy casual     │
│              - Formal            │
│                                  │
│  Photo: [Choose File...       ]  │
│  💡 Tip: Crop to remove faces   │
│                                  │
│  │  Preview (if selected)  │     │
│  └────────────────────────┘     │
│                                  │
│  │      + Add item       │       │
│  └───────────────────────┘       │
│                                  │
│  IN THIS SESSION                 │
│  ┌────────────────────────────┐  │
│  │ [👕] Black trousers        │  │
│  │  Bottom                    │  │
│  │  │  - Remove │             │  │
│  │                            │  │
│  │ [👔] White shirt           │  │
│  │  Top                       │  │
│  │  │  - Remove │             │  │
│  │                            │  │
│  │ [👠] Black heels          │  │
│  │  Shoes                     │  │
│  │  │  - Remove │             │  │
│  └────────────────────────────┘  │
│                                  │
│  Add a dress or top+bottom       │
│  to get started.                 │
│                                  │
└──────────────────────────────────┘
```

### Screen 2: Plan an Outfit (Right Panel)

```
┌──────────────────────────────────┐
│   PLAN AN OUTFIT                 │
├──────────────────────────────────┤
│                                  │
│  What's the event?               │
│  ┌────────────────────────────┐  │
│  │ Senior sunrise on the      │  │
│  │ football field. It'll be   │  │
│  │ cold, and I want to wear   │  │
│  │ sneakers.                  │  │
│  └────────────────────────────┘  │
│                                  │
│  Quick event types:              │
│  │ Prom │ Homecoming │ Sunrise│  │
│  │ Grad │ Banquet  │ Perform  │  │
│  │        Social        │       │
│                                  │
│  Dress code:                     │
│  [Use the event description ▼]  │
│  - Casual                        │
│  - Dressy casual                 │
│  - Formal                        │
│                                  │
│  Shopping budget (optional):     │
│  [20___________]  USD            │
│                                  │
│  │      Find outfits      │      │
│  └───────────────────────┘       │
│                                  │
│  Status: (shows updates)         │
│  "2 outfits ready."              │
│                                  │
└──────────────────────────────────┘
```

### Screen 3: Outfit Results (Full Width)

```
┌────────────────────────────────────────────────┐
│   OUTFIT IDEAS                                 │
├────────────────────────────────────────────────┤
│                                                │
│  OUTFIT 1                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ [Black   │  │ [White   │  │ [Denim   │    │
│  │  Shirt]  │  │  Trousers]  │  Jacket] │    │
│  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐                   │
│  │ [White   │  │ [Layer]  │                   │
│  │ Sneakers]│  │          │                   │
│  └──────────┘  └──────────┘                   │
│                                                │
│  Your main pieces match the casual dress       │
│  code. The extra layer helps in cooler        │
│  weather. Add sneakers to complete this       │
│  look.                                        │
│                                                │
│  ─────────────────────────────────────────    │
│                                                │
│  OUTFIT 2                                      │
│  [Similar layout]                             │
│  ...                                          │
│                                                │
│  ─────────────────────────────────────────    │
│                                                │
│  Shopping:                                     │
│  Search for simple outfit accessories         │
│  under $20. Check prices and availability     │
│  on the retailer's site.                      │
│                                                │
└────────────────────────────────────────────────┘
```

---

## Module Dependencies (Phase 2+)

```
┌─────────────────────────────────────────────┐
│          app.js (Main Entry)                │
└──────────────────┬──────────────────────────┘
                   │
       ┌───────────┼───────────┐
       │           │           │
       ▼           ▼           ▼
   pages/closet pages/event utils/
   .js            .js      outfit-engine.js
   │              │            │
   │              │      ┌──────┘
   │              │      │
   └──────────────┴──────┴────────────┐
                                      │
                                 Shared
                                 State
   
   pages/closet.js       pages/event.js
   ├─ initClosetPage()   ├─ initEventPage()
   ├─ renderCloset()     ├─ showOutfits()
   ├─ removeItem()       ├─ showShoppingLinks()
   └─ handlePhotoUpload()└─ clearResults()
   
   
   utils/outfit-engine.js
   └─ generateOutfits(items, description, dressCode)
   
   
   utils/storage.js
   ├─ saveOutfit(data)
   ├─ loadOutfits()
   ├─ saveWardrobe(items)
   ├─ loadWardrobe()
   └─ clearAll()
```

---

## Data Model (Phase 1)

### Items Array
```javascript
items = [
  {
    id: 1700000001,
    name: "Black trousers",
    category: "Bottom",
    style: 1,  // 0=Casual, 1=Dressy casual, 2=Formal
    photo: "blob:http://localhost:8000/abc123" // or null
  },
  {
    id: 1700000002,
    name: "White shirt",
    category: "Top",
    style: 1,
    photo: "blob:http://localhost:8000/def456"
  },
  // ... more items
]
```

### Outfit Result
```javascript
{
  target: 1,  // Target formality level (0, 1, or 2)
  wantsLayers: true,
  wantsSneakers: false,
  layer: { id, name, category, style, photo },
  shoe: { id, name, category, style, photo },
  outfits: [
    {
      exact: false,
      pieces: [
        { id, name, category, style, photo },  // Top
        { id, name, category, style, photo },  // Bottom
        { id, name, category, style, photo },  // Layer
        { id, name, category, style, photo },  // Shoes
      ]
    },
    // ... up to 3 outfits
  ]
}
```

---

## State Flow (Session-Only)

```
┌──────────────────────────────────┐
│   BROWSER SESSION MEMORY         │
│   (All data local, never sent)   │
├──────────────────────────────────┤
│                                  │
│  window.wardrobe = {             │
│    items: [],           ← Grows  │
│    selectedPhoto: "",   ← Updates
│    cropState: {},       ← Rotates
│    outfitEngine: {},    ← Shared │
│    storage: {}          ← Utils  │
│  }                               │
│                                  │
│  User adds item                  │
│    → items.push({...})           │
│    → Renders UI                  │
│                                  │
│  User describes event            │
│    → outfitEngine.generateOutfits│
│    → Shows results               │
│                                  │
│  User clicks "End Session"       │
│    → Clears window.wardrobe      │
│    → Revokes blob: URLs          │
│    → Clears sessionStorage       │
│    → Ready for fresh start       │
│                                  │
└──────────────────────────────────┘
```

---

## Navigation (Phase 1-2)

```
┌─────────────────────────────────────────┐
│          HEADER / NAV BAR               │
│  │ Closet Plan │  [End Session]        │
├─────────────────────────────────────────┤
│           CONTENT AREA                  │
│  ┌─────────────┐  ┌─────────────┐      │
│  │             │  │             │      │
│  │  Add Clothes│  │ Plan Outfit │      │
│  │             │  │             │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│           RESULTS (if any)              │
│  ┌─────────────────────────────────┐  │
│  │      Outfit Ideas (1-3)         │  │
│  │      Shopping Links (optional)  │  │
│  └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Responsive Layout

### Desktop (> 1024px)
```
┌─────────────────────────────────────┐
│          HEADER                     │
├──────────────────┬──────────────────┤
│                  │                  │
│   Add Clothes    │   Plan Outfit    │
│   (Left Panel)   │   (Right Panel)  │
│                  │                  │
├──────────────────┴──────────────────┤
│                                     │
│         Outfit Results (Full)       │
│                                     │
└─────────────────────────────────────┘
```

### Mobile (< 1024px)
```
┌──────────────────────┐
│      HEADER          │
├──────────────────────┤
│                      │
│   Add Clothes        │
│   (Full Width)       │
│                      │
├──────────────────────┤
│                      │
│   Plan Outfit        │
│   (Full Width)       │
│                      │
├──────────────────────┤
│                      │
│   Results            │
│   (Full Width)       │
│                      │
└──────────────────────┘
```

---

## Color & Branding

```
Primary Colors:
  - Dark Purple:   #23163c (Header background)
  - Light Purple:  #f5f0ff (Page background)
  - Accent Purple: #56369e (Buttons)

Typography:
  - Headings: Georgia serif, bold
  - Body: system-ui sans-serif (Apple/Google fonts)
  - Font size: 1rem baseline, scales with vw

Interactions:
  - Focus: 3px solid accent purple outline
  - Hover: Slight opacity change
  - Active: Button background change
  - Touch: Larger targets (44px min height)
```

---

## Accessibility

```
WCAG 2.1 AA Compliance:

Keyboard Navigation:
  ✓ Tab through all interactive elements
  ✓ Enter/Space activates buttons
  ✓ Arrow keys in select dropdowns

Screen Reader Support:
  ✓ ARIA labels on interactive elements
  ✓ Semantic HTML (button, form, fieldset)
  ✓ Image alt text
  ✓ Status announcements (role="status")

Visual:
  ✓ 4.5:1 color contrast (WCAG AA)
  ✓ 44px minimum touch targets
  ✓ Resizable text (browser zoom)
  ✓ No color-only information

Mobile:
  ✓ Touch-friendly buttons and inputs
  ✓ Readable on small screens
  ✓ No horizontal scroll required
  ✓ Camera/gallery prompts native
```

---

## Performance Targets

```
Phase 1-2 (Web):
  - Page load: < 1 second (on 4G)
  - Interaction: < 100ms response
  - Add item: < 50ms
  - Generate outfit: < 100ms
  - File size: < 50KB (gzipped)

Phase 2-3 (Mobile App):
  - App launch: < 2 seconds
  - Interactions: < 100ms
  - Photos: Max 1MB per image
  - Local storage: Up to 50MB (Capacitor)
  - Cache policies: Aggressive (rarely changes)
```

---

Good luck with your app! This architecture scales from MVP to production. 🚀

