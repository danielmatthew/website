---
title: Why does that equal this?
layout: post
---

When looking at code written by others, you may wonder why JavaScript developers will often alias `this` as `that` within a function. Surely `this` always refers to the current object?

JavaScript has function scope. When a function is executed inside another, we no longer have access to the original value of `this`, as it has been assigned to the global scope, or if running in strict mode - [and you should](http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/) - it will be undefined.
By aliasing it, we are able to retain a reference to this original value - and save some headaches along the way. 

As for the reasoning behind this convention, [Douglas Crockford](http://www.crockford.com/javascript/private.html) states that:

> By convention we make a private **that** variable. This is used to make the object available to the private methods. This is a workaround for an error in the ECMAScript Language Specifications which causes **this** to be set incorrectly for inner functions.

However, we should be cleverer than this, and take advantage of the functionality that JavaScript gives us with `.call`, `.apply`, and `.bind`. 