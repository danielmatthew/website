---
title: setTimeout and setInterval
layout: post
---

JavaScript features a couple of useful utilities that allow the developer to schedule code to run outside of the normal execution flow.

### setTimeout

In order to run a function after a specific delay, we use `setTimeout()`:

{% highlight js %}
function doSomething(message) {
  console.log(message);
}

var myTimeout = setTimeout(doSomething, 2000, "lol");

// Two seconds later...
// lol
{% endhighlight %}

Timeouts can be cancelled using `clearTimeout()` and passing the ID of the timeout in question. In the above example, to prevent our applicating from printing `lol`, we could set up a button which called `clearTimeout(myTimeout)`.


### setInterval

If you want to call a function repeatedly, `setInterval()` is the more appropriate tool. It looks very similar:

{% highlight js %}
function doSomethingElse(message) {
  console.log(message);
}

var myInterval = setInterval(doSomethingElse, 5000, "See you in five...");

// Every five seconds...
// See you in five...
{% endhighlight %}

Like with timeouts, we can run `clearInterval()` to call a halt to proceedings when we are done with it. 