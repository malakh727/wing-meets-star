---
type: "note"
title: "Why /api/... URLs Appear in Google Search Console (SSR Gotcha)"
description: "Understanding how Angular Universal's transfer cache exposes API endpoints to Google and solutions to prevent crawling."
date: "2024-01-01"
tags: ["SSR", "Angular", "Google Search Console", "SEO", "debugging"]
draft: false
---

# Why `/api/...` URLs Appear in Google Search Console (SSR Gotcha)

## 🚨 Problem

While reviewing Google Search Console (GSC), I noticed multiple URLs like:

/api/...

These URLs were flagged under:

- Soft 404
- Blocked due to other 4xx issue
- Crawled – currently not indexed

The issue:  
These are **API endpoints**, not real user-facing pages—so they shouldn't be crawled or indexed at all.

---

## 🔍 Investigation

### 1. Inspecting URLs in GSC

Using the **URL Inspection tool**, I checked how Google discovered these URLs.

- Looked at the **Referring page**
- Repeated the inspection across multiple entries to find patterns

---

### 2. Tracing the Source Page

Eventually, I identified a page where these `/api/...` URLs were being referenced.

---

### 3. Analyzing the HTML Source

Inspecting the page source (`Ctrl + U`), I found this block:

```html
<script id="ng-state" type="application/json">
```

Inside it, there was serialized JSON data that included:

```json
"links": [
  { "href": "/api/...", "rel": "self" }
]
```

## 🧠 Root Cause

The issue comes from Angular Universal, specifically:

`withHttpTransferCacheOptions`

This feature:

- Caches API responses during server-side rendering (SSR)
- Injects them into the HTML using TransferState
- Prevents duplicate API calls on the client

However…

The cached responses included a `links` field containing API URLs.

And here's the key detail:

**Googlebot can parse JSON inside `<script type="application/json">` and extract URL-like values.**

So even though these links are not visible in the UI:

- They exist in the HTML
- Google can discover them
- They get crawled and reported in GSC

## ⚠️ Why This Matters

This can lead to:

- Wasted crawl budget
- Noisy and confusing GSC reports
- Time spent debugging non-issues

## 🛠️ Possible Fixes

Depending on your setup, here are a few approaches:

1. Remove or sanitize `links` fields from API responses before injecting into TransferState
2. Filter what gets stored in TransferState (avoid caching unnecessary response fields)
3. Disable transfer cache for certain requests if they contain sensitive or irrelevant data
4. As a fallback, block `/api/` paths via robots.txt (prevents crawling but doesn't fix the root cause)

## ✅ Conclusion

The `/api/...` URLs appeared in GSC because:

- Angular Universal injected API responses into the HTML
- Those responses contained URL fields (`links`)
- Googlebot treated them as discoverable links

👉 **Result:** API endpoints were unintentionally exposed to search crawlers.

## 💡 Takeaway

Anything injected into HTML during SSR can be crawled—even if it's not visible on the page.
