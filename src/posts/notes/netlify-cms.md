---
layout: layouts/post.njk
title: Netlify CMS
date: 2021-01-17T20:42:30.898Z
---
I've been experimenting with services such as [Contentful](https://www.contentful.com/), [Prismic](https://prismic.io/), and finally [Sanity](http://sanity.io). Currently, each post on this site is a Markdown file, and it is converted into a HTML page by 11ty when the site is built. The "content-as-a-service" platforms return data over the wire, and each record in the GraphQL response is turned into the post it represents. 

However, I think I prefer to keep each post as a file, all wrapped up on Github, so it's back to [Netlify CMS](https://www.netlifycms.org) for me.