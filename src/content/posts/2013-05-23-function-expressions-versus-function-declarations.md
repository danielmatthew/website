---
title: Function declarations versus function expressions
publishedDate: 2013-05-23
---
### Function declaration
A function declaration is written like so:
```js
function example() {}
```

A declared function is evaluated at parse-time - when the browser's Javascript engine gives it the once-over to see what it contains - and thus are loaded before any code is executed.
In practical terms, this function can now be called at anytime: perhaps in code that is defined before the function. This is due to the idea of hoisting: a facet of the language that allows variables to be 'hoisted' to the top of the scope in which it is defined, regardless of where it's placed. As it happens, a variable is created with the same name as the function.

### Function expression
A function expression looks like this:
```js
var example = function() {}
```
This kind of function is evaluated at run-time and means that `example()` can't be called until the JS engine has reached that point in your code. If it's referenced before that, you'll get an error.

In reality, they're incredibly similar functionality wise. Just make sure you're aware of how the Javascript interpreter is going to load them.

### Function constructor
This is a concept that was new to me before writing this - so perhaps the self-documentation idea does have merits!
It is possible to write:
```js
var example = new Function() {}
```
However, Mozilla's Developer Network advises against this approach because:
> it needs the function body as a string, which may prevent optimizations

In JavaScript: The Good Parts, Douglas Crockford recommends that JS authors use function expressions because
> it makes it clear _foo_ is a variable containing a function value. It is important to understand that functions are values.

Coming from a 'classical' Computer Science background, I was initially more comfortable with function declarations. In practice, I prefer the aesthetics of the function expression: it improves legibility no end. You just need to remember that you can't call the function before it's been declared!

A few things to bear in mind:

+ A function name cannot be changed, but a variable to which a function is assigned _can_ be reassigned.
+ The function name can only be used within the function's body.
