---
layout: post
title: Remove Child Nodes In JavaScript
---

After discovering whether an element has children, one may want to go ahead and remove them. The brutalist approach involves setting the node's `innerHTML` property to an empty string.

{% highlight html %}
<div id="box">
  <h1>Hello</h1>
</div>

var box = document.getElementById('box');
if (box.firstChild) {
  box.innerHTML = '';
}
{% endhighlight %}

Another option is to grab the `firstChild` and then remove it like so:

{% highlight js %}
while (box.firstChild) {
  box.removeChild(box.firstChild);
}
{% endhighlight %}

The results on [jsperf](http://jsperf.com/innerhtml-vs-removechild) indicate that removeChild is the faster of the two techniques, and also the more robust: the `innerHTML` technique won't work on XML markup.

But wait! As usual, there is another alternative. Check out:

{% highlight js %}
while (box.hasChildNodes()) {
	box.removeChild(box.lastChild);
}
{% endhighlight %}

It's really just a variant on the method above: ensuring that `box` still has children and removing them from the bottom instead of the top.