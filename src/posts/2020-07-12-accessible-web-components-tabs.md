---
title: "Accessible Web Components: Tabs"
metaDesc: The process of creating and publishing an accessible tabbed interface web component
published: true
tags:
  - web-components
  - accessibility
  - side-projects
---


I've finally published my first NPM package: a [web component to represent a tabbed interface](https://www.npmjs.com/package/@accessible-web-components/tabs).

__Rock and roll.__

It might not be the most fashionable of side projects - or technologies - but I felt that a wrapping up the desired behaviour of a tabbed interface into a bog-standard web component might do some good. If it saves another developer spending an afternoon doing the same thing, or makes the life of the user a little easier, then I'd consider that worthwhile.

The component follows the behaviours specified in the [WAI-ARIA Authoring Practices document](https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel). It can be styled with CSS to suit its environment, and will display as a single column should there be a hitch. Alas, web components _do_ require JavaScript in order to be registered, and it certainly requires JS in order to enhance the markup with the required ARIA attributes.

It takes the following structure:

```html
<awc-tabs>
  <awc-tab>Tab 1</awc-tab>
  <awc-panel>Panel 1 content goes here…</awc-panel>
  <awc-tab>Tab 2</awc-tab>
  <awc-panel>Panel 2 content goes here…</awc-panel>
  <awc-tab>Tab 3</awc-tab>
  <awc-panel>Panel 3 content goes here…</awc-panel>
</awc-tabs>
```

While the roles of `heading` and `panel` can be added here, the component will do this at runtime. Additionally, it will add the necessary attributes to help browsers and assistive technologies make sense of it the structure.

To the 67 brave souls who have downloaded it since yesterday morning: ~~you are brave~~ thanks ~~for being my guinea pigs~~!. I've put the package level as a pre-release, at `0.0.0-alpha.3`. I don't think it's going to break your project, but there are a few more features I want to include before it goes to `0.0.1`. I guess it would help if I wrote some tests, and I can certainly improve the documentation.

---

Side projects, eh? Gotta love 'em.

Four years ago, I made the first commit in a Github repository called [Accessible Web Components](https://github.com/danielmatthew/accessible-web-components/commit/3c7089a62c9459f7be782ca4a0985f54ef0b330e).

The following year, in March 2017, I gave a [talk at HydraHack](https://pusher.com/sessions/meetup/hydrahack/web-components-and-me) about my plan to create a whole series of components. As a fellow speaker that night, I'm hopeful [Nivi's](https://twitter.com/nivims) offer of feedback still stands!

The first component – [an alert message](https://www.w3.org/TR/wai-aria-practices-1.2/#alert) – was the "Hello world!" I used to play with various frameworks. It moved across Polymer, Polymer v2, Stencil, a custom element, Vue, and finally LitElement. The [Polymer version still lives in the repository](https://github.com/danielmatthew/accessible-web-components/tree/master/alert), complete with its use of [HTML Imports](https://www.w3.org/TR/html-imports/). It's a shame that particular spec got shot down: it feels awkward defining component templates inside the JavaScript.

Then, with the plan to create a whole series of these components, I thought a monorepo would be a good idea. I installed [Lerna](https://github.com/lerna/lerna/), and spent way too much time getting its configuration _just_ so.

With Lerna just about sussed, I turned to the guidelines suggested by the [open-wc](https://open-wc.org/index.html) project when it comes to publishing. I've been using their linting and commit standards for some time, but the project has really been evolving: I've used their generator to scaffold the next component in the series.

Finally, it was time to publish. Again, it took too long figuring out how to create an organisation on NPM, such that the package name could be in the format: `@accessible-web-components/<blah>`. While it sounds trivial, I thought it worth keeping this and future components grouped together right from the start.

---

Despite it being a fairly trivial piece of software, I'm excited yet nervous at the thought of third parties using something I've written. I'm looking forward to constructive criticism to help shape it and make the web a richer, and more accessible platform.

