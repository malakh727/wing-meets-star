# Tag Filtering System — v2 (Modal + URL Sync + Type Filter)

## Context
The first version showed all 53 unique tags as inline pills — too cluttered. Refined requirements:
1. Tags hidden behind a modal (not all shown at once)
2. Active filters reflected in the URL (`?type=essay&tag=AI`) for shareable/bookmarkable views
3. A second filter for post type: essay | note

## What changes

### 1. Rewrite `src/components/TagFilter.tsx`

**Two filters, both URL-synced:**
- `?type=essay` or `?type=note` (omit for "all types")
- `?tag=AI` (omit for "all tags")

**Layout — always-visible filter bar:**
```
[ All ]  [ Essay ]  [ Note ]   •   [ Filter by tag ▾ ]  or  [ Tag: AI  × ]
```
- **Type toggles**: 3 pills always visible — "All" | "Essay" | "Note"
  - "All" active: neutral filled; "Essay" active: solid `#B076E8`; "Note" active: solid `#2EC4C4`
- **Tag button**: single button, reads "Filter by tag ▾" when no tag active, or "Tag: {name} ×" when active
  - Clicking × clears the tag without opening the modal
  - Clicking the label opens the tag modal

**Tag modal:**
- Backdrop overlay (`rgba(0,0,0,0.6)`), click-outside to close, ESC to close
- Centered card (`max-w-lg`, `max-h-[70vh]`, scrollable) using site surface color `#1b1b1d`, subtle border
- Header: "Filter by tag" + close ×
- Tags in `flex flex-wrap gap-2` — same ghost pill style
- Clicking a tag selects it AND closes the modal; clicking active tag deselects and closes
- RTL: modal direction flips, header text → "تصفية حسب الوسم"

**URL sync (no page reload):**
- `useEffect` on mount: read `?type` and `?tag` from `window.location.search`, set initial state
- On filter change: `window.history.pushState({}, '', buildUrl(type, tag))` — omits absent params

**Filtering logic:**
- Posts shown = posts matching BOTH active type AND active tag (null = no constraint)

**State:**
```typescript
const [activeType, setActiveType] = useState<"essay" | "note" | null>(null);
const [activeTag, setActiveTag] = useState<string | null>(null);
const [modalOpen, setModalOpen] = useState(false);
```

### 2. `src/pages/blog/index.astro` — no structural changes needed
Already passes `posts`, `allTags`; `type` already included in each `PostItem`.

### 3. `src/pages/ar/blog/index.astro` — no structural changes needed
Already passes `lang="ar"`.

## Critical files
- `src/components/TagFilter.tsx` — full rewrite

## Reuse / patterns
- Essay color `#B076E8`, note color `#2EC4C4` — already in component
- Ghost pill style `rgba(46,196,196,0.08)` bg — already in component
- `card-glow` class on list item `<a>` — keep

## Verification
1. `npm run dev` → open `/blog`
2. Filter bar shows "All / Essay / Note" + "Filter by tag ▾"
3. Click "Essay" → list filters, URL becomes `?type=essay`
4. Click "Filter by tag ▾" → modal opens with all 53 tags
5. Click a tag → modal closes, list filters, URL becomes `?type=essay&tag=AI`
6. Click × on tag button → tag cleared, URL becomes `?type=essay`
7. Reload at `?type=essay&tag=AI` → filter state restored from URL
8. Open `/ar/blog` → same behavior, RTL modal, Arabic labels
9. `npm run build` → no TypeScript errors
