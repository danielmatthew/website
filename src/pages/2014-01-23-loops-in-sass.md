---
layout: post
title: Loops in Sass
---

Sass makes it dead simple to automate repetitive tasks we might encounter when writing CSS.

## Sass 'For' loop
{% highlight sass %}
@for $i from 1 through 100 {
  .box:nth-child(#{i}) {
    // Properties
  }
}
{% endhighlight %}

## Sass 'Each' loop
{% highlight sass %}
@each $member in john, paul, george, ringo {
  .bandmember.#{$member} {
    background url("images/#{$member}.png");
  }
}
{% endhighlight %}