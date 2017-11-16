---
title: Two forms of IIFE
layout: post
---

TIL there are two ways of creating an IIFE - and there's [heated discussion](https://stackoverflow.com/questions/8774425/vs-in-javascript-closures) between parties as to why they have chosen their preferred style. Douglas Crockford prefers the second structure here, as the first ["looks like dog balls"](https://twitter.com/paul_irish/status/176187448420864000). If you use [JSLint](http://www.jslint.com/), you'll be encouraged to adopt the latter style - it suggests the parentheses that invoke the function should sit within those that contain it.

{% highlight js %}
(function(){
  function foo() {
    // I'm not polluting the global scope!
  }
})();
{% endhighlight %}

{% highlight js %}
(function(){
  function bar() {
    // Nor am I!
  }
}());
{% endhighlight %}
