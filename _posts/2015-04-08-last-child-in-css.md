---
title: last-child in CSS
layout: post
---

The `:last-child` psuedo-selector allows the developer to target the last child element of its parent. But you need to qualify it with the element that you are targetting: something that has caught me out in the past has been applying the selector to the parent itself.

{% highlight css %}
/* Nope - this won't work and you'll feel silly */
ul:last-child {
  border-bottom: none;
}
{% endhighlight %}

It kind of makes sense, right? I want the last child of that unordered list. But no: pseudo-selectors, such as `:last-child`, `:hover`, and `:checked` work on the _state_of the specificed element.

In the common case of wanting to style the last element in a list differently, you can use the following code example:

{% highlight css %}
li {
  border-bottom: 1px solid #f3f3f3;
}

li:last-child {
  border-bottom: none;
}
{% endhighlight %}

When that list element finds itself as the `:last-child` of its parent, the browser will remove its border.