---

title: call() and apply()
---

- `apply()` invokes the named function with an array of arguments
- `call()` requires the arguments to be listed explicitly

The first argument in both methods allows us to specify what `this` refers to within that function.

These methods allow the user to write a method once, and then inherit it within another object - without having to rewrite the method for the new object.

A handy mnemonic to remember how to use each is as follows:

> Think of _a_ in `apply()` as an _array_ of arguments

> Think of _c_ in `call()` as _columns_ of arguments
