—
title: Truthy and Falsy Values in JavaScript
layout: post
—

A common activity when writing code is to check whether a result is true or false before using it. You may have seen the following pattern: used to assign a default value to a parameter, should it be omitted.

{% highlight js %}
function chosenColour(colour) {
  colour = colour || "blue";

  // Colour related code goes here
}
{% endhighlight %}

When a non-boolean value is used in this logical OR operation, it is coerced to become one. If the value on the left is empty - or false - the value on the right will be used as a replacement.

It's possible to discover how a value will be interpreted by passing it as an argument to `Boolean()`:

{% highlight js %}
Boolean(3) // true
Boolean('foo') // true
Boolean({}) // true
Boolean([]) // true

Boolean(undefined) // false
Boolean(null) // false
Boolean(false) // false
Boolean('') // false
Boolean(NaN) // false
{% endhighlight %}
