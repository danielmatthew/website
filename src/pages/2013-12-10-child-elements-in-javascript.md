---
layout: post
title: Finding Child Elements In JavaScript
---

There are several techniques that allow us to discover if a particular DOM element has any children - whether there are any nodes contained within. 

_Warning: Nodes are usually, but not always HTML elements: the text inside a list element, for example._

{% highlight js %}
if (element.firstChild) {
	// It has at least one
}

if (element.hasChildNodes()) {
	// Element has at least one
}

if (element.childNodes.length) {
	// Again, has at least one...
}
{% endhighlight %}

{% highlight html js %}
<div id="box">
  <h1>Hello</h1>
</div>

var box = document.getElementById('box');

console.log(box.firstChild);
// Returns NodeList

console.log(box.hasChildNodes());
// Returns true

console.log(box.childNodes)
// Returns array
{% endhighlight %}
