---
layout: post
title: Numbers In JavaScript
featured: true
tags: javascript development
---
## The basics
Because JavaScript is a dynamically-typed language, we can declare a new number variable just as we would any other type: with the use of the `var` keyword, a name, the assignment operator, and optionally, its value.

{% highlight js %}
// Declare variable as integer
var a = 123;
// Negative number
var b = -123;
// We can use decimal points, too
var c = 1.5;
{% endhighlight %}

In JavaScript, there is no difference between number types: we can't specify that one particular number is an integer, while another is a double. As far as the specification goes, all numbers are "double-precision 64-bit format IEEE 754 values". Because operations will always return a floating-point number, the JavaScript developer needs to watch out for rounding errors when using decimals. The result may not always be what is expected, as the following illustrates: 

{% highlight js %}
0.1 + 0.2;
// 0.30000000000000004
{% endhighlight %}

Weird, huh? This is because those numbers can't be represented exactly in binary form, and those representations are truncated by the implementation. 
When dealing with operations that require a high degree of accuracy - hello financial transactions! - it's recommended to manually round the result, or shift the decimal so that £1.53 becomes 153 pence. 

Representing large monetary values in pence will eventually become unwieldy, so it's handy to know that they can be represented in scientific form. 1,000,000 will become 1E6: 1 to the power of 6.   

A further pitfall is that numbers beginning with a 0 are interpreted as octals. In a similar manner, numbers starting with `0x` will be interpreted as hexadecimal - base 16. It's a sensible idea to always sanitise user inputs and double-check strings before working with a number which may be in a different base to what is expected.

## Operators

In JavaScript, our operators include `+`, `-`, `*`, and `/`: the usual suspects. Division in Javascript can return floating point numbers
The modulo operator (`%`) is used to return the remainder after division of two operands. 15 % 10 = 5.
When it comes the order of operations, JavaScript adheres to BODMAS: operands wrapped in parentheses are always evaluated first.

It is possible to compare numbers using `<`, `>`, `<=`, `>=`, `===` (equality) and `!==` (not equal to).

## Parsing Numbers From Strings
In order to extract a number from a string, JavaScript's provides a function called `parseInt(value [, base])`. This function will work through the characters of the string until it finds a character that is not a numeral in the specified base. Thus:

{% highlight js %}
parseInt("abc123", 10); // NaN
parseInt("123abc", 10); // 123
{% endhighlight %}

When using it, it's sensible to get in the habit of adding a base as the second (optional) argument. While most implementations will deliver a decimal if you omit it, you do run the risk of ending up with an octal or hexadecimal number.

{% highlight js %}
parseInt("123abc", 2); // 1 (Only that first character is accepted in binary) 
parseInt("123abc", 8); // 83
parseInt("123abc", 16); // 11946485
parseInt("0123abc"); // 123 (Current implementation no longer interprets as an octal 
parseInt("0x123abc"); // 11946485
{% endhighlight %}

On occasions, complex strings can result in `NaN`: Not a Number. Before working on the result of a `parseInt` function, it's wise to check for the presence of `NaN` using `isNaN()`. To complicate matters, `NaN` is not equal to itself. 

{% highlight js %}
isNaN(NaN) // true
NaN === NaN // false
{% endhighlight %}

To carry out similar operations with floating-point numbers, we can use the aptly-titled `parseFloat()`.

## Methods
JavaScript comes with a robust assortment of methods to manipulate your numbers - all are name-spaced under the Math object.

| Method | Use |
| --- | --- |
| `Math.random()` | Generates a random number between its default bounds of 0 and 1. It is seeded with the current time. |
| `Math.round()` | Rounds the supplied number to the nearest whole number |
| `Math.floor()` | Rounds the number down |
| `Math.ceil()` | Rounds number up |
| `Math.pow(base, exponent)` | Returns the result of the base to the power of its exponent: eg. `Math.pow(2, 3) == 8` |
| `Math.sqrt()` | Returns the square root of the supplied argument | 