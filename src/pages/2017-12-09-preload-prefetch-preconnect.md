---
title: Preload, Prefetch, and Preconnect
layout: post
published: true
---

## Preload

Working on a Polymer project recently, I got to experiment with serving the content from [Firebase Hosting, which offers support for HTTP/2 and Server Push.](https://firebase.googleblog.com/2016/09/http2-comes-to-firebase-hosting.html) Server Push allows content to be delivered speculatively: as it stands, it's delivered whether or not the user has it already, and in some cases might not be required at all. To take advantage of it though, I needed to declare the assets I wanted to be pushed down. In my `firebase.json` file I declared:

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
`<link rel="prefetch" href="/font.woff2">`

Prefetch is another resource hint developers can take advantage of. Prefetch tells the browser that a resource will be needed on the next page, or navigation. Resources marked as such will be treated as a much lower-priority fetch than those with `preload`, and it's up to the browser to make the call as to whether it will load it or not. I've seen a pattern where a webfont is set to be pre-fetched so that it doesn't block rendering on the first load, but is available right away when a visitor navigates to a new page.

## Preconnect
`<link rel="preconnect" href="/page2">`

Preconnect can be used to 'warm-up' the connection to a resource in order to ["eliminate the costly DNS, TCP, and TLS roundtrips from the critical path of the actual request"](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)

---

All of these techniques can be used in an attempt to improve the performance of your site but it's a trade-off between second-guessing the behaviour of your guests, while not exhausting their bandwidth unneccessarily – especially for those on metered connections.
