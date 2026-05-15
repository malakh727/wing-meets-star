# Design System Specification: Wing Meets Star

## 1. Overview & Creative North Star

### The Aesthetic: "Cosmic Elegance"
This design system bridges high-precision aerospace engineering and ethereal luxury. The interface should feel like a custom-tooled instrument viewed through a high-end observatory lens — precise, deep, and quiet. It is designed for an audience that values technical mastery, exploration, and refined craftsmanship.

The visual style blends **Minimalism** with subtle **Glassmorphism**. Deep, expansive dark backgrounds are contrasted with razor-sharp thin-line geometry and atmospheric blurs. The overall emotional response should be one of quiet authority, intellectual curiosity, and timeless precision.

To break the "template" look, use **Intentional Asymmetry**: hero layouts favor a 60/40 split, and typography leverages dramatic scale shifts — pairing massive technical headlines with delicate, high-contrast serif body copy.

---

## 2. Colors

### Brand Palette

| Token | Value | Role |
| :--- | :--- | :--- |
| `primary` | `#B076E8` | Lavender — primary actions, active states, links, highlights |
| `secondary` | `#2EC4C4` | Teal — tags, borders, technical indicators, secondary actions |
| `tertiary` | `#d1cac3` | Cream — star elements, inline code, warm focal points |
| `primary-container` | `#7040b8` | Deeper lavender — gradient endpoints, pressed states |
| `on-surface` | `#e5e1e4` | Primary text |
| `on-surface-muted` | `#948f98` | Secondary text, captions |

### Surface Hierarchy

| Token | Value | Use |
| :--- | :--- | :--- |
| `surface` | `#131315` | Base canvas |
| `surface-low` | `#1b1b1d` | Low-priority containers, pre backgrounds |
| `surface-high` | `#2a2a2c` | Cards, code backgrounds |
| `surface-highest` | `#353437` | Active/floating elements, scrollbar thumb |
| `outline-variant` | `#49454d` | Ghost borders, grid lines |

### Rules
- **No 100% white.** Always use `on-surface` (`#e5e1e4`) for text.
- **No hard dividers.** Separate sections through tonal background shifts or spacing, not `<hr>` lines.
- **Primary CTAs** use a 135° linear gradient from `primary` → `primary-container`.
- **Secondary CTAs** use a transparent background with a 1px teal border and teal text.
- **Ghost borders** (when required for accessibility): `outline-variant` at 15% opacity.

---

## 3. Typography

### Fonts

| Role | Font | Notes |
| :--- | :--- | :--- |
| Display & Headlines | **Newsreader** | Literary, authoritative serif. Sharp serifs mirror the star's precise points. |
| Body, Labels, UI | **Geist** | Technical, monospaced-influenced sans. Provides "flight-instrument" clarity. |
| Code | **Geist** (monospace) | Consistent with label font. Inline code uses `tertiary` (`#d1cac3`) color... wait, teal `#2EC4C4`. |

### Type Scale

| Level | Font | Size | Weight | Tracking | Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-xl` | Newsreader | 4rem+ | 600 | -0.02em | Hero moments |
| `headline-lg` | Newsreader | 3rem | 600 | -0.02em | Page titles |
| `headline-md` | Newsreader | 1.75rem | 500 | -0.01em | Section headers |
| `body-lg` | Newsreader | 1.125rem | 400 | normal | Primary reading |
| `label-md` | Geist | 0.875rem | 500 | 0.05em | Buttons, overlines |
| `label-sm` | Geist | 0.75rem | 600 | 0.1em | Tags, micro-copy |
| `code` | Geist | 0.875em | 400 | normal | Inline code |

### Rules
- Mix typography within a single block — Geist label above a Newsreader headline is intentional.
- Use wide letter-spacing (0.05–0.12em) for uppercase labels to reinforce the technical, schematized feel.
- Tight tracking (-0.02em) on display headlines makes them feel machined.

---

## 4. Elevation & Depth

Depth is achieved through **Tonal Layering** and **Ambient Glows** — not drop shadows.

### Layering Principle
Stack surface tiers. A `surface-high` card on a `surface` background provides enough contrast to imply elevation without any shadow.

### Ambient Glows
When a component must "float", use:
- **Shadow:** `0 8px 40px rgba(46,196,196,0.05), 0 2px 16px rgba(176,118,232,0.08)` (teal + lavender)
- Applied on hover via the `.card-glow` utility class.

### Glassmorphism
For floating overlays (tooltips, modals, nav):
- Background: `rgba(28,27,29,0.90)`
- Backdrop blur: `24px`
- Border: 1px `outline-variant` at 22% opacity

### Background Glows
Hero sections use two radial ambient glows:
- Lavender: `rgba(176,118,232,0.05)` — upper-left cluster
- Teal: `rgba(46,196,196,0.05)` — lower-right cluster

---

## 5. Components

### Buttons
- **Primary:** Gradient fill `linear-gradient(135deg, #B076E8, #7040b8)`. Radius: `0.25rem`. Label: Geist, all-caps, 0.05em tracking, dark text.
- **Secondary:** Transparent background, `1px solid rgba(46,196,196,0.5)`, teal text. Radius: `0.25rem`.
- **Hover:** Subtle outer glow using the respective brand color.

### Cards
- Background: `surface-low`. Never use visible borders.
- Hover: `surface-high` + `.card-glow` box-shadow + `translateY(-2px)`.
- Left border on hover: `2px solid rgba(46,196,196,0.4)` (teal accent line).
- Titles: Newsreader. Labels/metadata: Geist.

### Tags & Chips
- Background: `rgba(46,196,196,0.08)`.
- Text: `#2EC4C4` (100% opacity teal).
- Border: `1px solid rgba(46,196,196,0.2)`.
- Radius: `0.25rem`. Font: Geist `label-sm`.

### Prose (Markdown)
- Body: Newsreader, 1.125rem, 1.85 line-height.
- Headings (h2/h3): Geist, tight tracking.
- Links: `#B076E8`, underline at 30% opacity, full opacity on hover.
- Blockquote: `2px solid rgba(46,196,196,0.4)` left border, muted text.
- Inline code: Geist, `#2EC4C4` text, `surface-high` background.
- `em`: Teal `#2EC4C4`.

### Input Fields
- Background: `surface-low`.
- Focus: 1px ghost border using `primary`.
- Error: Background shift to `error-container` (`#93000A`) at 20% opacity.
- Label: Geist `label-sm`, above the field.

### Technical Grid Overlay
Hero sections use a 24px background grid: `outline-variant` at 5% opacity. Reinforces the "astro-tech" precision feel.

---

## 6. Logo & Brand Mark

**File:** `public/assets/wing-meets-star-logo-removebg.png` (transparent, for UI use)
**File:** `public/assets/wing-meets-star-logo.png` (with background)

The logo features a 5-pointed star with a feathered wing, enclosed in a double-ring circle. The star uses a lavender-to-teal gradient, and the wing transitions from lavender to teal — directly mirroring the brand's primary and secondary colors.

---

## 7. Do's and Don'ts

### Do
- Use `secondary` (teal) for tags, borders, technical indicators, and secondary interactive elements.
- Use `primary` (lavender) for primary CTAs, active nav states, links, and highlights.
- Use `tertiary` (cream) for star/celestial decorative elements and warmth accents.
- Use gradient text (`primary` → `secondary`) for key headline words to echo the logo.
- Leverage whitespace generously — let the dark void breathe.
- Mix Newsreader + Geist within a single content block.

### Don't
- Don't use 100% white (`#FFFFFF`) for text. Always use `on-surface` (`#e5e1e4`).
- Don't use rounded corners larger than `xl` (0.75rem). The system should feel machined, not bubbly.
- Don't use structural dividers. Use tonal background shifts or spacing gaps instead.
- Don't use flat fills for primary CTAs — always gradient.
