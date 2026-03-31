# Design System Specification: Wing Meet Star

## 1. Overview & Creative North Star

### The Creative North Star: "The Celestial Laboratory"
This design system is not a standard SaaS template; it is a high-precision digital environment that bridges the gap between aerospace engineering and editorial prestige. We call this aesthetic "The Celestial Laboratory." It focuses on the juxtaposition of technical rigidity (the "Star") and organic, flowing intelligence (the "Wing").

To break the "template" look, we utilize **Intentional Asymmetry**. Hero layouts should favor a 60/40 split, and typography should leverage dramatic scale shifts—pairing massive technical headlines with delicate, high-contrast serif body copy. The interface should feel like a custom-tooled instrument: precise, deep, and quiet.

---

## 2. Colors

The palette is rooted in the "Deep Space" base, using tonal shifts to define boundaries rather than structural lines.

### Palette Strategy
- **Primary (`#adc6ff`):** Used for interactive technical elements.
- **Secondary (`#b9c8de`):** Used for utility icons and secondary actions.
- **Tertiary (`#E9C176`):** Our "Starlight Gold." Reserved for high-importance highlights, success states, or brand-specific editorial callouts.
- **Surface (`#131313`):** The canvas of the void.

### The "No-Line" Rule
Standard 1px solid borders for sectioning are strictly prohibited. Sectional boundaries must be defined solely through background color shifts. For instance, a main content area using `surface` might transition into a footer using `surface_container_lowest`. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following hierarchy to create "nested" depth:
1. **Base:** `surface` (#131313)
2. **Low-Priority Containers:** `surface_container_low` (#1C1B1B)
3. **Primary Cards/Modules:** `surface_container_high` (#2A2A2A)
4. **Active/Floating Elements:** `surface_container_highest` (#353534)

### The "Glass & Gradient" Rule
To add "soul," use **Glassmorphism** for floating overlays. Apply `surface_variant` at 60% opacity with a `24px` backdrop-blur. For primary CTAs, do not use flat fills; use a subtle linear gradient from `primary` (#adc6ff) to `primary_container` (#4D8EFF) at a 135-degree angle.

---

## 3. Typography

The system uses a "Technical/Humanist" dichotomy to convey both precision and wisdom.

- **Display & Headlines (Space Grotesk):** This is our "Instrument" font. It must be tracked tightly (-2%) for headlines to feel like machined parts. 
- **Body & Titles (Newsreader):** This is our "Editorial" font. It provides a human, literary contrast to the tech-heavy surroundings. Use it for storytelling and long-form insights.
- **Labels (Inter):** Reserved for data points, micro-copy, and UI controls where legibility is paramount.

| Level | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Hero moments; technical impact. |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Section headers. |
| **Title** | `title-lg` | Newsreader | 1.375rem | Article intros; pull quotes. |
| **Body** | `body-lg` | Newsreader | 1.0rem | Primary reading experience. |
| **Label** | `label-md` | Inter | 0.75rem | Buttons, tags, and data labels. |

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering** and **Ambient Glows**.

### The Layering Principle
Depth is achieved by stacking surface tiers. A `surface_container_highest` card sitting on a `surface` background provides enough contrast to imply elevation without a single pixel of shadow.

### Ambient Shadows
When a component must "float" (e.g., a dropdown), use an extra-diffused shadow:
- **X/Y:** 0, 12px
- **Blur:** 40px
- **Color:** `on_surface` (#E5E2E1) at 4% opacity. 
This mimics the way light catches cosmic dust rather than a harsh terrestrial shadow.

### The "Ghost Border" Fallback
If a border is required for accessibility, use a **Ghost Border**: `outline_variant` (#424754) at 15% opacity. This provides a "suggestion" of a boundary that disappears into the dark background.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). Radius: `DEFAULT` (0.25rem). Label: `label-md` (Inter, All-Caps, 0.05em tracking).
- **Secondary:** Ghost Border style. Background: `surface_container_high`.
- **Tertiary:** Text-only in `tertiary` (#E9C176) with a subtle underline of 1px at 50% opacity.

### Cards
Cards must never have visible borders. Separate them from the background using `surface_container_low`. Use `1.5` (0.5rem) spacing between the card edge and internal content. Use Newsreader for card titles to maintain an editorial feel.

### Input Fields
- **Default:** `surface_container_lowest` background. 
- **Focus:** 1px "Ghost Border" using `primary`.
- **Error:** Background shift to `error_container` (#93000A) at 20% opacity.

### Technical Grid Overlay
For hero sections, implement a subtle background pattern: a 24px grid using `outline_variant` at 5% opacity. This reinforces the "Astro-tech" precision.

---

## 6. Do's and Don'ts

### Do
- **Do** use `tertiary` (Starlight Gold) sparingly to draw the eye to the single most important action on the page.
- **Do** leverage whitespace (specifically spacing `12` and `16`) to let the "void" of the space black background breathe.
- **Do** mix typography within a single block—e.g., a Space Grotesk label above a Newsreader headline.

### Don't
- **Don't** use 100% opaque white (#FFFFFF) for text. Always use `on_surface` (#E5E2E1) to reduce eye strain in dark mode.
- **Don't** use rounded corners larger than `xl` (0.75rem). The system should feel "machined," not "bubbly."
- **Don't** use dividers. If two elements need separation, use a `3` (1rem) spacing gap or a tonal shift in the background.