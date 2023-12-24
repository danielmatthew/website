---

title: Adding a meta tag with JavaScript
publishedDate: 2013-09-25
---

Sometimes there isn't any other option but to use JS to alter markup when one doesn't have control over the  source. One Wapple user needed help ensuring that the viewport was being controlled - and for whatever reason - it was not being implemented which resulted in a sub-par experience for the customer. I was able to conjure up a teeny script which I dropped into her site:

```js
var meta;

if (document.createElement && (meta = document.createElement('meta'))) {
  meta.name = 'viewport';
  meta.content = 'width=320';
  document.getElementsByTagName('head')[0].appendChild(meta);
}
```

Quite a straightforward slice of DOM manipulation, but it had the desired effect.
