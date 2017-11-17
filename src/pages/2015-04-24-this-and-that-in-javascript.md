---
title: this and that in JavaScript
layout: post
---

<p class="lead">When looking at code written by others, you may wonder why JavaScript developers will often alias <code>this</code> as <code>that</code>, or <code>self</code>, within a function. Why is this? Surely <code>this</code> always refers to the current object?</p><p class="lead">Short story: nope.</p>

## What's `this`?

 Unlike other languages where it refers to values stored in instance properties, the `this` keyword is dynamically bound based on how a particular function is executed. Because of its shifting nature, it can be tricky to keep track of what `this` might be referring to when it is called. With a little understanding of the rules behind `this`, we can be more confident when writing our code.

There are four rules that help us figure out what `this` may be at a particular point in time, and these rules are based on the call-site of the function.

### 1: Default Binding
When our function is invoked of its own accord, _ala_:

```js
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 2
```

The call to `this.a` resolves to the global variable of the same name. If  we were running in strict mode - [and you should](http://www.nczonline.net/blog/2012/03/13/its-time-to-start-using-javascript-strict-mode/) - we would find that it would be undefined:

```js
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); // 'this' is undefined
```

### 2: Implicit Binding
When calling a function as an object method, its call site now has some context and the object in question should be used for the function's `this` binding.

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo(); // 2
```


### 3: Explicit Binding
We can use the `call()` and `apply()` utilities to force a function to use a particular object for its `this` binding. For both utilities, the first parameter is the object to use. [As we've discovered previously](/2014/01/05/call-and-apply) `call()` takes a list of parameters, while `apply()` is given an array as its second argument.

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```


#### Hard Binding
Both implicit and explicit binding lose their `this` binding when passed around. The following pattern helps ensure that this doesn't happen:

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function() {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2
```

The new `bar()` function calls `foo()` with `this` bound to our object. `bar()` can be passed around, as it is to `setTimeout()`, and yet `this` remains 2.

It might get a little tiresome wrapping functions for this purpose, so ES5 ([supported natively in IE9+, or with ES5-shim](https://kangax.github.io/compat-table/es5/)) gives us `bind()`: a utility that returns a new function that calls the original, with `this` set as required.

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

### 4: new Binding
When using `new` to create a new object, the new object is set as the `this` binding.

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

So, if the function is called:

- with `new`, `this` is the new object;
- using `call`, `apply`, or `bind`, `this` is the specified object;
- as it being a method of an object, `this` is that object;
- in standard execution, `this` is either the `global` object, or will be `undefined` if using strict mode.

## Why `that`, then?

<!-- So why use `that`? We know that JavaScript has lexical scope, and new scopes are only created when a function is called.  -->

Each function call gets its own `this` binding. When a function is executed inside another, we no longer have access to the original `this` value. By aliasing it as `that` or `self` at the top level, we can retain a reference to the original value and make it visible to inner functions.

As for the reasoning behind this convention, [Douglas Crockford](http://www.crockford.com/javascript/private.html) states that:

> ...This is a workaround for an error in the ECMAScript Language Specifications which causes `this` to be set incorrectly for inner functions.

While it's a useful trick to have in the toolbox, JavaScript does give us utilities to avoid having to use it in the first place. We can take advantage of the functionality JavaScript gives us with `call()`, `apply()`, and `bind()` in order to explicitly tell a function the context it will be running in.
