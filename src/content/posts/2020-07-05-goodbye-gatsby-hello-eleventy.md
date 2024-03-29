---
title: "Goodbye Gatsby; Hello Eleventy!"
metaDesc: Porting the website from Gatsby to Eleventy, and the friends we made along the way.
published: true
publishedDate: 2020-07-05
---

Hello there. It's been a good while since anything new content has appeared on this website, and while I've tinkered with the splash page on occasion, it's not displayed anything more than my name in a `<h1>`.

Some thoughts on 'v3':

- I've gotten rid of [Gatsby](https://www.gatsbyjs.org). It wasn't long after I upgraded to v2 that I noticed the site no longer rendered if JS was disabled; something I had appreciated in v1.
- The site now runs on [Eleventy](https://www.11ty.dev), and uses [Andy Bell's](https://twitter.com/hankchizljaw) [Hylia Starter Kit](https://hylia.website) to get me going. I expect to be hacking away at it over the next week.
- I wanted to place to display my photos. Yes, I know there's only a single photo being displayed. It's a shot of the [Molino Stucky](https://en.wikipedia.org/wiki/Molino_Stucky) in Venice. I'm using [Cloudinary](https://cloudinary.com) to host the image and apply transforms based on device DPI, orientation, and screen width.
- I want the site to feel fast. It's preconnecting to third-party origins (Cloudinary, Google Fonts, Speedcurve), and preloading the most important assets. I'm inlining the first blast of CSS, then [loading the rest asynchronously](https://www.filamentgroup.com/lab/load-css-simpler/). [Benchmarking the site on Web Page Test](https://www.webpagetest.org/result/200703_BQ_692dc3c1922a505eb90b3a3ca14c76a0/1/details/#waterfall_view_step1), it surprised me [how much slower the site performed when this wasn't done](https://www.webpagetest.org/result/200703_23_f52e3ba3fbeae8474b248fe75200090d/1/details/#waterfall_view_step1).
- Speedcurve was mentioned above. Thought I'd have a play and see how the site performs over time. Additionally, I only just found out that one doesn't need to use Chrome to play with Lighthouse: [Jeremy Keith](https://adactio.com/journal/16523) put together a bookmarklet to send the current document over to the [Lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/). In the same vein, [Lighthouse Metrics](https://lighthouse-metrics.com) seems a neat way to keep tabs on performance.
- I want to begin publishing accessibility audits of some of my favourite sites. At [Talis](https://talis.com), I've been spending a good chunk of time reviewing and improving the accessibility of our products ahead of September's <abbr title="The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018">[PSBAR](http://www.legislation.gov.uk/uksi/2018/952/contents/made)</abbr> deadline. While I've been championing accessibility internally since I started, it has felt like a struggle to get cross-functional buy-in until recently.
- When not working on improving our accessibility, the recent focus has been on relaunching our website. I am extremely grateful for [Timber](http://timber.github.io), which made working with WordPress a much more pleasurable experience. Something that irks me is that I tried hard to keep the site snappy, but as third-party plugins have been enabled to support desired functionality - "buy, don't build" is the mantra - more and more external resources get pulled in. Even the WordPress core functionality dumps a load of crap in, which has to be manually disabled via the theme's `functions.php`. _Le sigh._
