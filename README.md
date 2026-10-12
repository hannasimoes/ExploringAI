# GuideCart AI

A voice-first shopping companion that helps blind and partially sighted people shop more independently. You point your iPhone camera at a product, GuideCart asks an AI model what it can see, checks that against your shopping list and tells you out loud. It also includes features for people with colour vision deficiencies.

GuideCart is a contextual shopping assistant. It is **not** a mobility aid: it does not detect obstacles, navigate aisles or guarantee that it identifies a product correctly.

## Project structure

```
ExploringAI/
├── mobile/                 Expo (React Native + TypeScript) iPhone app
│   ├── src/app/            Screens (Expo Router: each file is a route)
│   │   ├── _layout.tsx     Navigation stack + theme
│   │   ├── index.tsx       Home – "Let's go shopping."
│   │   ├── list.tsx        My Shopping List          (Milestone 2)
│   │   ├── shop.tsx        Guided Shopping (camera)  (Milestones 3–7)
│   │   └── settings.tsx    Text size, dark mode, high contrast
│   ├── src/components/     Accessible building blocks (buttons, text, icons)
│   ├── src/settings/       User display settings + OS accessibility state
│   ├── src/theme/          Contrast-checked colours and type scale
│   └── scripts/            check-contrast.mjs (WCAG AA check)
└── backend/                Serverless AI endpoint on Vercel (Milestone 4)
```

## Architecture

```
iPhone (Expo Go)                   Vercel serverless function          OpenAI
 camera photo  ── HTTPS ──────────▶  /api/analyze                ────▶  Vision model
 + shopping list                     holds OPENAI_API_KEY               (real inference)
 ◀── JSON: products, prices, sizes ──  validates and trims the reply
 speaks result (VoiceOver-aware)
 unit-price maths is done on the phone, using only values the model actually read
```

The OpenAI key exists only as an environment variable on Vercel. It never goes into the app or into Git.

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 1 | App launches on iPhone through Expo Go | Built; waiting for a test on your iPhone |
| 2 | Shopping list: create (voice/text), edit, remove, collect, save locally | Next |
| 3 | Camera captures a real photo | |
| 4 | Photo analysed by OpenAI through the secure backend | |
| 5 | Spoken feedback for recognised products | |
| 6 | Match against the list, confirm or reject, mark collected | |
| 7 | Unit-price comparison when labels are readable | |
| 8 | Accessibility pass and VoiceOver testing | |

## Running the app on your iPhone

You need:
- A computer (Mac, Windows or Linux) with [Node.js 20 or later](https://nodejs.org) and [Git](https://git-scm.com).
- The free **Expo Go** app from the App Store on your iPhone.

Steps:

```bash
git clone https://github.com/hannasimoes/ExploringAI.git
cd ExploringAI/mobile
npm install
npx expo start
```

A QR code appears in the terminal. Open the iPhone **Camera** app, point it at the QR code and tap the banner. The app opens in Expo Go.

If it can't connect, make sure the phone and the computer are on the same Wi-Fi network. If that doesn't help (for example on university Wi-Fi), stop the server and run `npx expo start --tunnel` instead.

## Checks

```bash
cd mobile
npm run typecheck        # TypeScript
npm run check:contrast   # every colour pair meets WCAG 2.2 AA
```

## Credentials and services

| What | Where it goes | When it's needed |
|------|---------------|-------------|
| OpenAI API key | Vercel → Project → Settings → Environment Variables (`OPENAI_API_KEY`). Never in the app or in Git. | Milestone 4 |
| Vercel account (free, sign in with GitHub) | Hosts `backend/` | Milestone 4 |
| Expo Go on iPhone | App Store | Milestone 1 |

We recommend setting a monthly spending limit in the OpenAI dashboard.
