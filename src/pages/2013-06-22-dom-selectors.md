---
layout: post
title: DOM Selectors 101
---

There are a variety of methods available that allow us to grab elements that are present in the Document Object Model (DOM).

{% highlight js %}
getElementById()
// Browser support: all
getElementsByClassName()
// IE9 +
getElementsByTagName()
// All
getElementsByName()
// All
querySelector()
// IE8 + 
querySelectorAll()
// IE8 +
{% endhighlight %}

The objects - in the loose sense of the word - that are returned are not arrays, but HTMLCollections. Other HTMLCollections include `document.images` and `document.forms`.