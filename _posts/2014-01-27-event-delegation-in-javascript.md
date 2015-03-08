---
layout: post
title: Event Delegation In JavaScript
---

First, some markup:

{% highlight html %}
<ul id="list">
  <li id="item-1"></li>
  <li id="item-2"></li>
  <!-- A little while later - hope this is automated! -->
  <li id="item-99"></li>
  <li id="item-100"></li>
</ul>
{% endhighlight %}

## What is event delegation?
In the example above, it's inefficient for both the browser and the developer to write event listeners for a large number of elements - particularly if these elements are being generated dynamically. Event delegation entails attaching a single listener to the parent element, then checking the target element  as it bubbles up through the document structure.

## What are the advantages?
Writing less code, for one, and less code means fewer opportunities for bugs to arise. It also means that when elements are removed, we don't run into the risk of forgetting  rid ourselves of their event listeners. Too many of those floating around in memory - particularly in complex web applications - can cause problems for the browser. 

## How do I implement event delegation?
Here's a no-frills example:

{% highlight js %}
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target) {
    console.log(e.target.id); // Prints item id
  }
});
{% endhighlight %}

[See this example in action](http://jsfiddle.net/heQkz/)
