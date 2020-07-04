---

title: Variable Scope in JavaScript
---

Variables belong to a scope, and that particular scope determines where a variable can be used. Scope is delineated with `{` and `}`

A function can use a variable declared outside of it, since it is available globally:

```js
var world = "world";

function sayHello() {
  var hello = "Hello ";
  console.log(hello + world);
}

sayHello();
// Hello world
```


But trying to invoke a function's variable from outside will result in an error: `hello is not defined`.

Be careful when defining global variables - you don't want to mistakenly overwrite a value you are relying on. There are techniques to try and counter the possibility of this happening: concepts such as [closures](http://danmatthew.co.uk/2014/02/03/closures-101), or design patterns like the [module pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/).
