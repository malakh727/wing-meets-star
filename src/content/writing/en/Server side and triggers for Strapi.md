---
type: "note"
title: "Server-side Rendering and Triggers for Strapi"
description: "Guide to rendering Strapi content server-side and implementing webhooks and lifecycle hooks for automation."
date: "2024-01-01"
tags: ["Strapi", "SSR", "webhooks", "lifecycle-hooks", "NextJS", "automation"]
draft: false
---

# Server side and triggers for Strapi

# 1.How to render strapi values in Server Side?

There are many blogs explaining how to render purely server side requests, but mostly they are for

NextJs and some are by using angular universal (that I believe we stopped using it)

**Are we rendering featured deals in server side?**

This link is the most recent one and explains it well adding to it how to add a webhook too

[Creating an SSG (Static Site Generation) Application with Strapi Webhooks and NextJs](https://strapi.io/blog/how-to-create-an-ssg-static-site-generation-application-with-strapi-webhooks-and-nextjs)

other resources

[Nextjs Server Side Rendering with Strapi](https://www.reddit.com/r/Strapi/comments/14atqs6/nextjs_server_side_rendering_with_strapi/)

[How to use Strapi with Angular Universal Apps](https://strapi.io/blog/how-to-strapi-with-angular-universal-apps)

---

# 2.Triggers

## a. Webhooks → Built in Strapi GUI and can be configured easily → but will be applied for all entries

docs to explain how to use it:

[Webhooks | Strapi Documentation](https://docs.strapi.io/dev-docs/backend-customization/webhooks)

[What are Webhooks and how to use them in Strapi](https://strapi.io/blog/webhooks)

## b. Lifecycles → needs to be configured in the server side of Strapi “Strapi Repository” → we can specify certain entries for the triggers → might need third party to send notifications to external apps

[Models | Strapi Documentation](https://docs.strapi.io/dev-docs/backend-customization/models#lifecycle-hooks)

[How to Use Lifecyle Hooks for Audit Logs in Strapi](https://strapi.io/blog/how-to-use-lifecyle-hooks-for-audit-logs-in-strapi)

## c. Comparisons and other resources

These recent questions on Strapi forum have some good scenarios on how the webhooks and lifecycles used

[Trigger webhook event from API](https://forum.strapi.io/t/trigger-webhook-event-from-api/35919)

[How to create webhook only for a specific content type?](https://forum.strapi.io/t/how-to-create-webhook-only-for-a-specific-content-type/30969)

This explains how to add notifications for internal strapi entries

[Implementing Webhooks in Strapi for Real-time Notifications](https://strapi.io/blog/implementing-webhooks-in-strapi-for-real-time-notifications)

### **This article has a comparison of Strapi hooks and from what I understand the webhook which one of its use case is to run CI/CD operation**

[Different types/categories of Strapi Hooks](https://strapi.io/blog/understanding-the-different-types-categories-of-strapi-hooks)
