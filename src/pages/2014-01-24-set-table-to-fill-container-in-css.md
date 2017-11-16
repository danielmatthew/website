---
layout: post
title: Ensure A Table Fills Its Containing Element
---

{% highlight css %}
table {
  table-layout: fixed; // Default is auto
}
{% endhighlight %}

I was wondering what the correct CSS property was to control this requirement. Setting a width on the table element was doing precisely zip. That is until we set the above.