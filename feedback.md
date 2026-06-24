# Update prompt

Read our whole conversation, extract every correction I made, every preference I stated, anything you'd do differently next time format it and add it this feedback file you'll reload in future sessions.

# Glow — Session Feedback & Preferences

Extracted from conversation on 2026-06-23. Load this at the start of every session before building any screen.

---

## Screen naming

**Rule:** Name files and STATUS entries exactly as the Figma frame is named — do not invent alternative names.

**What happened:** Screen 2 was built as `homepage.html` and logged as "Homepage". The user had named it "What are we designing?" in Figma and corrected both the file name (`what-are-we-designing.html`) and the STATUS entry manually.

**How to apply:** Before creating a file, confirm the exact Figma frame name and use it verbatim (lowercased, spaces → hyphens) as the filename. Log the same name in STATUS.

---

## Status bar

**Rule:** Do not include a status bar (time, signal, wifi, battery, notch) in any screen.

**What happened:** All three built screens shipped with a status bar. The user had to ask to have it removed retroactively from all of them.

**How to apply:** Never add a status bar element. If a Figma frame includes one, skip it silently — it's a design artifact, not a web UI element.

---

## Primary CTA — consistent position

**Rule:** All full-width primary CTA buttons must be pinned to the same absolute position across every flow screen: `position: absolute; bottom: 100px; left: 24px; right: 24px`.

**What happened:** Screen 1 had no full-width CTA (correct — the "New" button is inline inside the card). Screens 2 and 3 had the CTA in the normal document flow with inconsistent spacing. The user asked for consistent button position across the flow.

**How to apply:**

- Full-width primary CTAs (Continue, Scan, Next, etc.) → always `position: absolute; bottom: 100px; left: 24px; right: 24px; z-index: 5`.
- Add `padding-bottom: 160px` to the scroll area on any screen with a pinned CTA, so scrollable content clears it.
- Compact inline buttons (like "New" inside a card) are exempt — those stay in flow.
- Screens where layout genuinely doesn't allow it (overlays, full-bleed camera views) are also exempt — note it in STATUS.

---

## Button height

**Rule:** All full-width primary buttons must be `height: 52px`. Compact/inline buttons stay at `height: 40px`.

**What happened:** The user started to ask about button height consistency before pivoting to position consistency. The 52px standard was already established in screens 2 and 3 — maintain it everywhere.

---

## Asset filenames — no "Chica" prefix

**Rule:** All `.avif` files had a `Chica` prefix (e.g. `ChicaJaapndi.avif`) which the user removed. The correct filenames match the `.png` counterparts exactly (e.g. `Jaapndi.avif`, `Biophilic.avif`, `gallery01.avif`).

**How to apply:** When referencing any `.avif` in code or docs, never add a `Chica` prefix. The naming pattern is always: `<name>.avif` matching `<name>.png`.

---

## Asset strategy — no expiring URLs

**Rule:** Never use Figma MCP asset URLs (`https://www.figma.com/api/mcp/asset/…`) as `src` values in delivered HTML. They expire in 7 days.

**How to apply:**

1. First look for the asset in `/assets/` — if it exists, use the local path.
2. If the asset is a simple illustration composed of SVG paths, recreate it as an inline `<svg>`.
3. Only fall back to Figma URLs for images that can't be recreated and don't exist locally — and flag them clearly in STATUS as "Expiring asset — needs local copy".

---

## STATUS.html — keep it live

**Rule:** Update STATUS.html immediately after each screen is completed. Never batch updates.

**Fields to update each time:**

- Summary cards (screens built / to build counts)
- The specific screen row (file name, badge → Done, notes)

**How to apply:** After writing the screen HTML, edit STATUS before reporting back to the user.

---

## Output document

**Rule:** Maintain a `STATUS.html` file in the project root tracking every screen (filename, status badge, notes), all shared components, all assets (have vs. missing), and a prioritised build order.

**What happened:** The user explicitly requested this at the end of the first analysis pass. It became the living source of truth for the project.

---

## Back button icon — inline SVG

**Rule:** Use inline SVG for the chevron-left back button, not `<img src="assets/icons/chevron-left.svg">`.

**What happened:** The user replaced the `<img>` tag with an inline SVG path on the Scanning Room screen.

**How to apply:** On all screens, render the back button chevron as an inline `<svg width="24" height="24" viewBox="0 0 24 24">` with the path `d="M6.62132 12C6.62132 11.3375 6.8846 10.7021 7.35277 10.2334V10.2324L13.5432 4.04296C13.9337 3.65255 14.5668 3.65247 14.9573 4.04296C15.3476 4.43345 15.3476 5.06653 14.9573 5.45702L8.76683 11.6475C8.67367 11.7411 8.62132 11.8678 8.62132 12C8.62132 12.1321 8.67367 12.2589 8.76683 12.3525L14.9573 18.543C15.3476 18.9335 15.3476 19.5665 14.9573 19.957C14.5668 20.3475 13.9337 20.3474 13.5432 19.957L7.35277 13.7676V13.7666C6.8846 13.2978 6.62132 12.6625 6.62132 12Z"` with `fill` matching the screen context (white on dark, `#696361` on light).

---

## Auto-navigation screens — no CTA button

**Rule:** Screens that auto-navigate (driven by a video end event or a timer) must not include a visible CTA button. Navigation is implicit.

**What happened:** The user removed the "Continue" CTA from the Scanning Room screen, which auto-navigates on `video.ended` + 1 s delay.

**How to apply:** If a screen transitions automatically (scan complete, video end, loading), omit the `.cta` block entirely. Only add a manual CTA when the user must actively choose to proceed.

---

## Full-bleed camera/video screens

**Rule:** On any screen with a live camera or video background, the `<video>` element and the dark overlay must both fill the entire phone shell — not just the content area.

**What happened:** The Scanning Room video was initially set to `width: 402px; height: 718px` (matching the Figma content container) and the overlay was `390×650`. The user explicitly asked for both to fill the screen.

**How to apply:**

- Video: `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover`
- Overlay: same `inset: 0` — never use fixed pixel dimensions from the Figma content zone.

---

## No bottom nav on full-screen camera screens

**Rule:** Full-bleed camera/AR screens (Scanning Room and any similar full-screen video state) must not include the bottom navigation bar.

**What happened:** The user removed the bottom nav from `scanning-room.html`. It doesn't belong on immersive capture screens.

**How to apply:** Omit `.bottom-nav-wrap` entirely on any screen where the video or camera fills the phone shell. Standard flow screens (light bg, content layout) keep the nav.

---

## Auto-navigation delay — 1 second

**Rule:** When a screen auto-navigates (video ended, scan complete, timer finished), always add a 1-second pause before redirecting.

**What happened:** User asked for a delay after the video ended before going to the next page.

**How to apply:** `video.addEventListener('ended', () => { setTimeout(() => { window.location.href = 'next.html'; }, 1000); });`

---

## AR scan frame corners — white border-only

**Rule:** The AR scan frame corner brackets must be rendered as white border-only L-shapes, not orange filled pseudo-elements.

**What happened:** My original build used `::before` / `::after` filled orange bars. The user replaced them with CSS border-only corners (two sides per corner, `2.5px solid white`, `6px` outer border-radius), which looks far cleaner against the dark camera background.

**How to apply:**

```css
.corner.tl {
  top: 0;
  left: 0;
  border-top: 2.5px solid white;
  border-left: 2.5px solid white;
  border-radius: 6px 0 0 0;
}
.corner.tr {
  top: 0;
  right: 0;
  border-top: 2.5px solid white;
  border-right: 2.5px solid white;
  border-radius: 0 6px 0 0;
}
.corner.bl {
  bottom: 0;
  left: 0;
  border-bottom: 2.5px solid white;
  border-left: 2.5px solid white;
  border-radius: 0 0 0 6px;
}
.corner.br {
  bottom: 0;
  right: 0;
  border-bottom: 2.5px solid white;
  border-right: 2.5px solid white;
  border-radius: 0 0 6px 0;
}
```

Width/height: `32×26.88px` per the Figma corner containers.

---

## Chips / tags — solid fill when active

**Rule:** Active/selected chips use a solid filled background, not a semi-transparent tint.

**What happened:** The Scanning Room progress chips were built with `background: rgba(225,109,62,0.18)` (translucent). User asked to make them "filled with the main colour".

**How to apply:**

- Active done chip: `background: #cd6338; color: #fff; border: 1px solid #cd6338`
- Mood/tag chips (toggleable): active = `background: #faece6; border-color: #f6d2c3; color: #5f2e1a` (peach fill); inactive = `background: #fff; border-color: #e4d7d1; color: #b2a8a3`

---

## Slider — dynamic fill via JS, no track pseudo-element background

**Rule:** When the slider fill is set dynamically via JavaScript gradient, do not set a `background` on `::-webkit-slider-runnable-track` — it will override the JS-applied gradient on the `input` element.

**What happened:** The Set Budget slider track pseudo-element had `background: #e4d7d1` which blocked the orange fill from showing. Fix: remove `::-webkit-slider-runnable-track { background }` entirely and set the gradient directly on the `input` element.

**How to apply:**

```css
input[type="range"] {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 999px; /* no background here — set via JS */
}
/* NO ::-webkit-slider-runnable-track rule */
```

```js
slider.style.background = `linear-gradient(to right, #e16d3e 0%, #e16d3e ${pct}%, #e4d7d1 ${pct}%, #e4d7d1 100%)`;
```

---

## Preserve user edits — extend, don't replace

**Rule:** When the user has made manual edits to a screen and asks to add or change something, always preserve their version as the base. Never revert to a prior build.

**What happened:** The user modified `scanning-room.html` (white corners, simplified progress, removed CTA), then asked to "revert to the previous version… just add the video". The correct read was: keep their edited version, graft in the video and their requested changes only.

**How to apply:** When the user says "add X" or "change Y" after editing a file, read the current file state first and work from it. The phrase "revert to the previous version" in this case meant "revert from the other intermediate version I didn't like" — always clarify what the base is before overwriting.

---

## Flow screen heading size — 20px not 24px

**Rule:** Headings inside the scan/config flow screens (Step X of 5 screens) use `font-size: 20px; line-height: 28px`, not the 24px/30px token used on home-welcome.

**What happened:** All Figma flow frames (Keeping Furniture, Describe Idea, Add a Reference, Set Budget) specify 20px bold headings. The typography token table listed 24px which applies only to the home/onboarding screens.

**How to apply:** Use 20px for any screen with a Step indicator. Use 24px for full-page hero headings (home, onboarding, landing-style screens).

---

## Build flow

**Rule:** Before building any screen, always:

1. Call `get_design_context` for that specific node ID.
2. Read annotations (`data-content-annotations`, `data-development-annotations`, `data-interaction-annotations`) — they contain asset paths, interaction notes, and dev guidance.
3. Check which assets in the design exist locally in `/assets/` before deciding on inline SVG vs local file vs Figma URL.

---

## Phone shell

**Rule:** Every screen uses the same phone shell: `width: 402px; height: 874px; position: relative; overflow: hidden`. `home-welcome.html` uses `min-height: 874px` because its content scrolls beyond one screen — all other fixed-layout screens use exact `height: 874px`.

---

## Bottom navigation

**Rule:** The liquid-glass bottom nav is present on every screen. Standard CSS:

```css
.bottom-nav-wrap {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}
.bottom-nav {
  background: rgba(253, 249, 247, 0.72);
  backdrop-filter: blur(20px) saturate(1.8);
  border-radius: 100px;
  padding: 8px 24px;
  display: flex;
  gap: 24px;
  align-items: center;
  box-shadow:
    0 4px 4px rgba(0, 0, 0, 0.1),
    inset 0 2px 7.8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.6);
}
```

Active nav item label color: `#e16d3e`. Inactive icons: `filter: grayscale(0.4) opacity(0.6)`.

---

## Typography

- Headings: Plus Jakarta Sans 700, 24px / 30px, color `#696361`
- Body: Plus Jakarta Sans 400, 14px / 20px, color `#8a827f`
- Labels/caps: Plus Jakarta Sans 700, 11px, letter-spacing 1.1px, uppercase, color `#b2a8a3`
- CTA buttons: Plus Jakarta Sans 500, 16px, letter-spacing -0.128px, color `#fff`

---

## Color tokens

| Token                     | Value                 |
| ------------------------- | --------------------- |
| Primary 600 (CTA)         | `#cd6338`             |
| Primary 500 (active)      | `#e16d3e`             |
| Primary 50 (chip bg)      | `#faece6`             |
| Primary 100 (chip border) | `#f6d2c3`             |
| Neutral 900 (headings)    | `#696361`             |
| Neutral 700 (body)        | `#8a827f`             |
| Neutral 400 (muted)       | `#b2a8a3`             |
| Background warm           | `#fdf9f7` / `#fffdfd` |
| Peach card bg             | `#fcf2ee`             |
| Border muted              | `#e4d7d1`             |
