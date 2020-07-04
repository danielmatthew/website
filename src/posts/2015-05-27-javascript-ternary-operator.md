---
title: JavaScript's Ternary Operator

---

<p class="lead">When you've been writing code for a good while, you start looking at ways to speed up the process. Perhaps the most obvious method to achieve this is to write fewer lines of code.</p>

A typical `if/else` statement looks like this:

```js
var foo = 10,
    bar = 20,
    baz;

if (foo > bar) {
  baz = foo;
} else {
  baz = bar;
}

console.log(baz); // 20
```

Look at that: five lines of code. We can do better than that, right?

Right!

JavaScript offers a ternary operator that takes three values: `condition ? expr1 : expr2`. The above code can be condensed to the following.

```js
var foo = 10,
    bar = 20,
    baz;

baz = foo > bar ? foo : bar;

console.log(baz); // 20
```

What we're saying is that if `foo` is greater than `bar`, `baz` is assigned the value of 10. If not, `baz` is 20.

Personally, I've found that a major drawback of using syntax like this is that the code becomes harder to parse when reading through it. Your mileage may vary, but just like omitting the braces of single-line `if` statements, it takes just that extra beat of brain-power to comprehend.
