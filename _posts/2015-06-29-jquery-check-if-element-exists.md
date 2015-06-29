---
title: Check whether a DOM element exists using jQuery
layout: post
---

A straightforward little post: if you want to detect whether a DOM element actually exists on the page (perhaps you're flying in the blind), you can write `if ($('selector').length) { // Foo }`. If the element is present, it'll evaluate to `true` and you can work from there.
