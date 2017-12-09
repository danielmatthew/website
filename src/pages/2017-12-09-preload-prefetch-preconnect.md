---
title: Preload, Prefetch, and Preconnect
layout: post
published: true
---

## Preload

Working on a Polymer project recently, I got to experiment with serving the content from [Firebase Hosting](https://firebase.googleblog.com/2016/09/http2-comes-to-firebase-hosting.html) which  supports HTTP/2 and Server Push. Server Push allows content to be delivered speculatively: as it stands, it's delivered whether or not the user has it already, and in some cases might not be required at all. To take advantage of it though, I needed to declare the assets I wanted to be pushed down. In my `firebase.json` file I declared:

```json
"headers": [{
  "key": "Link",
  "value": "<my-app.js>;rel=preload;as=script"
}]
```
which instructed Firebase to serve the file with the appropriate `Link` header. It's possible to do the same when referencing resources via a [`link`](https://html.spec.whatwg.org/multipage/links.html#external-resource-link) element too:

```html
<link rel="preload" href="foo.js" as="script">
<link rel="preload" href="bar.css" as="style">
```

If you inspect this site, you'll see that Gatsby does this for me in production. Coupled with HTTP/2 on Cloudfront, visitors should experience a fairly snappy load. Essentially, all assets for a page are transferred in a single round trip, though it does mean if you're a repeat visitor (hi mum!), I'm probably using bandwidth unneccessarily. [Addy Osmani](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) suggests that:

> Use Push when you know the precise loading order for resources and have a service worker to intercept requests that would cause cached resources to be pushed again.

I guess that's next on my to-do list with [Workbox](https://github.com/GoogleChrome/workbox).

## Prefetch
Prefetch is a resource hint that can also be used. Prefetch tells the browser that a resource will be needed on the next page, though they will be treated as a much lower-priority fetch than those with `preload`: the browser makes the call as to whether it will load it or not. A possible use-case might be to `prefetch` resources required on the next page of a shopping funnel.

## Preconnect

