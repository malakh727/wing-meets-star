# Wing Meet Star — Project Plan

## 🌌 Project Overview

"Wing Meet Star" is a personal knowledge garden and portfolio website.

It combines:

- Blog (essays)
- Notes (short knowledge entries)
- Star Stories (creative + interactive)
- Portfolio (projects & experience)
- Multi-language support (English default, Arabic, future Japanese)

---

## 🧱 Tech Stack

- Astro (main framework)
- React (interactive components only)
- TailwindCSS
- Markdown / MDX
- GitHub Pages

---

## 🌍 Multi-language Strategy (UPDATED)

Languages:

- English → default (no prefix)
- Arabic → `/ar/`
- Japanese → `/jp/` (future)

### Routing:

English:

- `/blog`
- `/stars`

Arabic:

- `/ar/blog`
- `/ar/stars`

---

## 📁 Content Structure

/content/
essays/
en/
ar/
notes/
en/
ar/
stars/
en/
ar/

---

## 🔁 RTL / LTR Handling

- English & Japanese → `dir="ltr"`
- Arabic → `dir="rtl"`

Rules:

- Use logical CSS:
  - `margin-inline-start`
  - `padding-inline-end`

- Avoid:
  - `margin-left/right`

- Layout must switch direction dynamically
- Test Arabic early

---

## 🧩 Phases

---

## 🔹 Phase 1 — Project Setup

- Create Astro project
- Add React
- Add Tailwind
- Setup structure

---

## 🔹 Phase 2 — Layout & Pages

- BaseLayout
- Header / Footer

Pages:

- Home
- Blog
- Garden
- Stars
- Portfolio
- About

---

## 🔹 Phase 3 — Content System

- Content collections:
  - essays
  - notes
  - stars

- Dynamic routes
- Blog listing
- Post pages

---

## 🔹 Phase 4 — Multi-language Support

- Default English (no prefix)
- `/ar/` routes
- Language switcher
- Direction switching (RTL/LTR)

---

## 🔹 Phase 5 — Styling & Theme

- Dark theme
- Typography
- Card UI
- Star background

---

## 🔹 Phase 6 — Star Map (React)

- Interactive stars
- Hover effects
- Click → open story

---

## 🔹 Phase 7 — Knowledge Garden <<---

- Categories
- Internal linking
- Tag system

---

## 🔹 Phase 8 — Animations

- Subtle transitions
- Scroll animations
- Hover effects

---

## 🔹 Phase 9 — Portfolio Page

- Projects
- Skills
- Experience
- Contact

---

## 🔹 Phase 10 — SEO & Optimization

- Meta tags
- Sitemap
- RSS

---

## 🔹 Phase 11 — Deployment

- GitHub Pages
- CI/CD

---

## 🔹 Phase 12 — Enhancements

- Search
- Theme toggle
- Analytics
- Japanese support

---

## 🚀 MVP

- Homepage
- Blog system
- 3–5 posts
- English only
- Arabic-ready structure

---

## 🌱 Long-Term Vision

- Fully bilingual (EN + AR)
- Interactive knowledge map
- Advanced animations
- Portfolio for career growth

---

## ✨ Final Note

Build simple → grow gradually → connect ideas over time.
