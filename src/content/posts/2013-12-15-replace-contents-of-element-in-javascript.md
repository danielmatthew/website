---

title: Replace Contents Of Element In JavaScript
publishedDate: 2013-12-15
---

```js
// Native
element.textContent = "Your text here"; // IE9+
element.innerHTML = content;
element.innerText = "Another example string"; // MS proprietary method; not supported in Firefox

// jQuery
.text("Your text here");
.html("<p>A message for you</p>");
```

