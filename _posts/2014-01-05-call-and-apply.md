---
layout: post
title: call(), apply(), and bind()
---

`apply()` invokes the function with an array of arguments

`call()` requires the arguments to be listed explicitly

The first argument in both methods allows us to specify what `this` refers to within that function.

These methods allow the user to write a method once, and then inherit it within another object - without having to rewrite the method for the new object.

A handy mnemonic to remember how to use each is as follows:
> Think of _a_ in `apply()` as an array of arguments;

> Think of _c_ in `call()` as columns of arguments

`bind()` was introduced in 2009’s ECMAScript 5 specification. It can be used to perform a _partial function application_. A new function is created that calls the original, and specifies a number of new arguments.

For example, bind can be used to create a new function that is like `add()`, but only requires one parameter, as y is always 1:

{% highlight js %}
function add(x, y) {
  return x + y;
}

var plus1 = add.bind(null, 1);
console.log(plus1(5)); // 6
{% endhighlight %}