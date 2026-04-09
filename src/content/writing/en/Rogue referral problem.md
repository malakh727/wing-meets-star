---
type: "note"
title: "Rogue Referral Problem"
description: "Solutions for tracking attribution data correctly in single-page applications (SPAs) with Google Analytics and GTM."
date: "2024-01-01"
tags: ["analytics", "GTM", "Google Analytics", "SPA", "tracking", "attribution"]
draft: false
---

# Rogue referral problem

<aside>
📎 **gtm** === [**Google Tag Manager](https://tagmanager.google.com/)  
GA** ===Google Analytics

</aside>

# Jot down some text

---

> So either you ask the developers to push you the content loaded info into the dataLayer or you play with the history location. (1)

## **What is Rogue Referral? (2)**

In short, rogue referral means that Google loses user data and can’t track referral data properly.

## **But what do these mean?**

**Server-side rendering:** Server-side rendering (SSR) is when an application is able to change HTML files that are stored on a server into a fully rendered HTML page. This happens when the web browser sends the server a request for information, sending a fully rendered page directly to the client.

**Client-side rendering:** Client-side rendering is how developers are able to change their websites to fully rendered within the browser with JavaScript. A client-side rendered site creates page routes dynamically and directly within the browser, rather than creating different HTML pages per route.

**Client & server-side rendering:** Depending on the complexity of the site, websites may need to render some pages from the server and others on the client-side, and both are usually used in this case.

[**Google says**](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications#:~:text=A%20Single%20Page%20Application%20(SPA,subsequent%20content%20is%20loaded%20dynamically.)
, “a Single Page Application (SPA) is a web application or website that loads all of the resources required to navigate throughout the site on the first page load. As the user clicks links and interacts with the page, subsequent content is loaded dynamically. The application will often update the URL in the address bar to emulate traditional page navigation, but another full page request is never made.”

## \*There is two solutions: (4)

The problem is that the utm isn’t saved

![](https://miro.medium.com/max/720/1*7Ho3MTaHhi1VYtuE5aMjrQ.webp)

1. The most commonly known fix for this problem is saving the campaign data in the cookie and dragging it along throughout the whole session, which does solve the problem. However, it is cumbersome to setup, prone to errors and adds even more clutter to the Google Tag Manager (GTM) container.
   Saving the UTM each time

2. Instead of dragging the attribution data all over the place, we can remove the part which is causing the problem — the referrer.
   Just remove the Referrer

![](https://miro.medium.com/max/720/1*O7SfRg5_gIqtJdPR8Y7XrA.webp)

By adding this script

```jsx
<script>
function removeReferrer() {
console.log(‘Before removing referrer was:’, document.referrer);
Object.defineProperty(document, ‘referrer’, {
value: null,
});
console.log(‘After removing referrer:’, document.referrer);
}
setTimeout(removeReferrer, 300);
</script>
```

# Embed links

---

(1)

[Tips to track an ajax based website using GTM and Universal Analytics - David Vallejo](https://www.thyngster.com/tips-to-track-an-ajax-based-website-using-gtm-and-universal-analytics/)

(2)

[https://salt.agency/blog/rogue-referral/#:~:text=What is Rogue Referral%3F,this problem on SPA websites](https://salt.agency/blog/rogue-referral/#:~:text=What%20is%20Rogue%20Referral%3F,this%20problem%20on%20SPA%20websites).

(3)

[https://www.simoahava.com/gtm-tips/fix-rogue-referral-problem-single-page-sites/](https://www.simoahava.com/gtm-tips/fix-rogue-referral-problem-single-page-sites/)

(4)

[Easy fix for wrong Google Adwords attribution in Google Analytics (Rogue referral problem)](https://vytas-sernas.medium.com/easy-fix-for-wrong-google-adwords-attribution-in-google-analytics-rogue-referral-problem-44d813517b42)

(5)

[Single Page Application Measurement | Analytics for Web (analytics.js) | Google Developers](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications#:~:text=A%20Single%20Page%20Application%20(SPA,subsequent%20content%20is%20loaded%20dynamically.)

(6)

[How do origin and referer headers differ and what is the point](https://www.semicolonandsons.com/code_diary/web-development/how-do-origin-and-referer-headers-differ-and-what-is-the-point)
