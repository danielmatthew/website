---

title: JavaScript Constants
publishedDate: 2015-03-26
---

The new ES6 JavaScript standard finally allows developers to declare variables using the handy `const` keyword. This prevents the value from being reassigned - somewhat reassuring if that's a requirement.

That said, values declared with `const` can still be modified after the fact: they're not immutable. If you're after that particular bit of functionality, you can still fall back on the `.freeze` property that objects have access to. If you're using strict mode - and why not? - you'll receive a TypeError, unless you look to see whether the object `.isFrozen`.
