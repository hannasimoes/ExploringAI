# GuideCart AI

A voice-first shopping assistant for blind, low-vision and colour-blind shoppers. You write or dictate a shopping list, point the phone camera at a product or a shelf price label, and GuideCart tells you, out loud, what it thinks the product is and how sure it is. It asks you to confirm before ticking the item off, and it can compare two prices by unit (£/kg, £/L or per item).

Built for the SEL704 *Exploring Artificial Intelligence* group project (Retail sector), Regent's University London, 2026/27.

**Live app:** https://hannasimoes.github.io/ExploringAI/

## Try it on an iPhone

1. Open the live link in **Safari**.
2. Tap **Share → Add to Home Screen**. GuideCart now opens like an app.
3. Make sure the silent switch is off and the volume is up, so you can hear the voice.
4. If you use VoiceOver, go to **Settings → Spoken results → Screen reader**, so you don't hear everything twice.

No account, no install and no app store needed.

## How it works

| Step | What happens |
|---|---|
| My list | Type items separated by commas, or dictate them. The list is saved on the phone. |
| Shop → Find product | The live camera (or a photo) captures a product. The AI reads it and says, for example, "Possibly semi-skimmed milk, 4 pints. Fairly sure. Is this the milk on your list?" The item is ticked off only after you tap **Yes**. |
| Shop → Compare prices | Read two price labels. GuideCart reads the price and pack size aloud, you confirm or correct them, and it says which is better value per kg, litre or item. It never compares weight with volume. |
| Shop → Read text | Point at a restaurant menu, a promotion sign or a supermarket leaflet. GuideCart gives a short spoken summary ("A lunch menu with 3 starters and 4 mains, from £6.50 to £15"), lists each dish or offer with its price, and can read everything aloud. |
| Live camera → Aim guide | While the camera is on, GuideCart says which way to move ("Move the phone a little to the left", "Move a little closer") and checks automatically once the product or text is lined up. |
| Live camera → Meta glasses | When turning the camera on, GuideCart asks whether to use the phone camera or Meta smart glasses. **The glasses option is a concept preview**: it shows the connection flow and head-movement guidance, but uses the phone camera. A real integration would use Meta's Wearables Device Access Toolkit in a native app. |
| Live guide (camera on) | Start shopping turns the camera on, and GuideCart talks all the time: it beeps and warns about anything close in front of you ("Stop. Trolley right in front of you."), says what's around ("Drinks shelf, right. Person, left.") and names a product you hold up, with its price and what you paid last time. With Claude Vision, a small photo goes to Claude about every 2 seconds and nothing heavy runs on the phone. |
| Test (Part 2) | Test shopping with Evian water, a Barebells protein bar and Rio Mare tuna. GuideCart knows their prices, so they need no label. Start test shopping puts them on the list and turns the camera on. |
| Home → Your assistant | GuideCart remembers what you buy (price and date, kept on the phone) and learns your patterns: price changes ("Semi-skimmed milk went up 10p"), habits ("You usually buy bread every week. Add to list?") and things you may not need ("You bought eggs 3 days ago. Still need them?"). When a product is checked, it compares today's price with your last purchase ("10p more than last week. Keep it?"). The app starts with clearly labelled sample history for demos, which can be cleared in Settings. |
| Talk to GuideCart | A voice conversation with a chat agent built with Botpress. Tap once, hear a beep and speak; GuideCart sends the question to the agent, reads the answer aloud, beeps and listens again. Say "stop", "bye" or "thank you", stay silent twice, or tap the button again to end. "Type instead" opens the written chat, and its replies are also read aloud. The agent's instructions keep replies short, never invent product details and always advise double-checking allergens. |
| Settings | Spoken results (app voice, screen reader or off), text and button size, theme, high contrast and reduced motion. |

Every button says its name aloud when tapped (in App voice mode). Every instruction is spoken and uses touch and distance ("hold the product about 30 cm from the phone, roughly the length of your forearm"), never "look at the screen".

## Architecture

- **One static web app** (`index.html`): HTML, CSS and plain JavaScript, no build step. Hosted free on GitHub Pages.
- **Screens:** Onboarding, Home, My list, Guided shopping and Accessibility settings, with a bottom tab bar.
- **AI services:**
  - **Claude Vision** (Anthropic) when the app is opened inside Claude: reads products, brands, sizes and prices from the photo and reports its confidence.
  - **Tesseract.js** OCR on the phone when opened from GitHub Pages: reads the printed text on packs and labels. Photos never leave the phone.
- **Walk mode (on-phone):** the live frame alternates between COCO-SSD object detection (about 80 kinds of common object, with positions) and MobileNet image classification filtered to about 90 everyday things (shelves, trolleys, fridges, screens, doors). An object is only mentioned once it appears in two of the last three checks, with higher score thresholds for objects the model often imagines.
- **Walk mode (Claude Vision, optional):** with an Anthropic API key saved in Settings, a small frame is sent to Claude every few seconds and Claude describes what the user is passing, reads signs and product names, and flags list items. The key is entered by the user and stored only on their phone; it is never in the code or this repository.
- **On-phone image check:** before using the AI, the app checks whether a photo is too dark, too bright or blurry, and tells the user how to fix it.
- **Speech:** the browser's built-in speech synthesis (British English voice); dictation uses the browser's speech recognition where available, with the keyboard microphone as a fallback.
- **Chat agent:** Botpress webchat, loaded from Botpress's servers; the app opens it with `window.botpress.open()`. If it can't load, the rest of the app works as normal.
- **Storage:** the list and settings are kept in the phone's browser storage. Nothing is stored on a server.

```
index.html               the whole app
manifest.webmanifest     lets the app be added to the home screen
icons/                   home-screen icons
samples/                 real product photos and listings for demos
tests/unit-price.test.mjs  arithmetic test for price comparison
```

## Security and privacy

- **Photos are never saved.** A photo stays in the phone's memory only while it is being checked, and is cleared when the user leaves the Shop screen or closes the app. Photos taken in GuideCart are not added to the phone's Photos app. As a safety net, the app checks the phone's storage at start-up and every hour: any GuideCart photo record older than 7 days, and any undated image data, is deleted. When Smarter AI is on, a photo is sent to Claude (Anthropic) to be read; GuideCart does not store it, and Anthropic's own data policy applies.
- No API key is stored in the app's code, this repository or any log. The optional key for Claude Vision is typed in by the user and kept only in their phone's browser storage.
- Photos are not saved. In GitHub Pages mode they are processed only on the phone.
- The camera is only used after the user taps a button.

## Tests

Price comparison maths (acceptance criterion A04):

```
node tests/unit-price.test.mjs
```

The test reads the functions directly from `index.html` and checks unit conversion (g/kg, ml/L), per-item packs, equal prices, incompatible units and missing data.

## Known limitations

- The AI can be wrong. GuideCart always states its confidence and asks for confirmation.
- Obstacle warnings help but don't replace a cane, guide dog or staff.
- On iPhone, the welcome is spoken when the shopper taps the blue screen (VoiceOver reads it at once); iPhone doesn't let websites speak before a tap.
- Walk mode only names what it can read or recognise; it will miss products whose names are not facing the camera, and it uses more battery.
- In GitHub Pages mode, recognition relies on printed text, so loose fruit and vegetables without a label are hard to identify. Claude Vision handles these much better.
- iPhone websites cannot vibrate or be controlled by Siri; these need a native app (a possible next phase with React Native or Swift).
- The voice depends on the phone: on iPhone it is silent while the silent switch is on.

## Credits

- Product images in `samples/`: screenshots of Ocado.com product listings, used for a non-commercial university demonstration. All product images and brands belong to their owners.
- Fonts: Atkinson Hyperlegible (Braille Institute) and Lexend, via Google Fonts.
- OCR: Tesseract.js (Apache 2.0).
- Code written with the help of Claude (Anthropic), recorded in the module's Mandatory AI Usage Log.
