# Closet Plan

Closet Plan is a **local web prototype**, not yet a published mobile app. Add pieces of one outfit, describe an occasion, and request an AI-estimated suitability score. An estimate of 80% or higher offers an accept-or-shop choice; below 80%, shopping is optional. Scores are subjective estimates, not measured user satisfaction or guarantees.

## Run locally

Install Node.js 20 or newer. In PowerShell, set your own server-side API keys (do not put them in the code or share them in chat):

```powershell
cd C:\Users\gomat\Documents\Wardrobe
$env:OPENAI_API_KEY = "your-key"
$env:SERPAPI_API_KEY = "your-key"
npm run dev
```

Open `http://127.0.0.1:8000`. Set the environment variables again in a new terminal session. OpenAI is required for assessment; SerpApi is required only for shopping. Both services may charge for use. `OPENAI_MODEL` optionally selects an OpenAI vision model supporting structured outputs; the default is `gpt-4o-mini`. To run the automated tests, use `npm test`; tests use mock providers and do not verify live credentials.

## How it works

1. Add up to eight pieces, one by one. Add a JPEG, PNG or WebP photo, a description, or both. Adjust the crop edges and check the preview before adding each photo.
2. Describe the event and your preferences. Check the consent box before requesting an assessment.
3. Review the estimated score and explanation. If the AI cannot judge, it asks for more information rather than inventing a score.
4. Choose shopping if desired and enter a total budget. Each displayed option is **one** item added to or substituted into the existing outfit, with its listed price within budget and an AI-estimated resulting-outfit match of at least 80%. Confirm before opening a link.
5. Select **End session** to clear the current session.

Shopping searches use a generic category, not event text or photos. Only a limited sample of Google Shopping results is checked; no qualifying result does not mean no store has a match. Prices, sizes, stock, tax and shipping must be checked at the seller and can make the final cost exceed the budget. This prototype does not assemble multi-item purchases.

## Privacy and deployment

The app keeps its session in memory and has no account, database, or browser storage. Cropping happens in the browser. After consent, cropped photos, descriptions and event text are sent through the local server to OpenAI; a shopping assessment sends the event, clothing descriptions and product titles to OpenAI again. The generic clothing category is sent to SerpApi. Clicking a confirmed shopping link opens a third-party site with its own privacy practices.

OpenAI's `store: false` setting does **not** eliminate all provider retention: [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data) describes abuse-monitoring retention and eligibility for zero data retention. The server does not intentionally log request bodies, but hosting infrastructure and providers may have their own logs. Review these policies and obtain any required parental consent and safeguards before serving minors; see [OpenAI under-18 guidance](https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance).

The included server binds only to localhost. It is for local development, not public deployment: production needs HTTPS, authentication or abuse controls, rate limits, privacy/legal review, and secure secret management. GitHub Pages alone cannot run the server or keep API keys private. A Capacitor mobile build would need a securely hosted API and device testing; it is not configured or tested by this change.

Older project and mobile guides describe the previous rules-based prototype and should not be used as current setup or privacy instructions.
