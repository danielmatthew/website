---
layout: post
title: Strings in JavaScript
featured: true
tags: javascript development
---

## Escape Characters
There are some useful ways to format strings in JavaScript:
- A literal backslash would be written as `\\`
- To start a new line, `\n`
- To insert a tab, we use `\t`

## Concatenating Strings
It's possible to join two (or more strings) like so:
```js
var hello = "Hello ";
var world = "world!";

var helloWorld = hello + world;
```

This technique is useful for being able to break one long string over several lines for ease of editing:

```
var longString = "Hello, this could be a " +
  "rather long string if " +
	"allowed to run on one " +
	"line."
```

## Methods
JavaScript's String class gives us a healthy number of methods that allow us to manipulate them. These include:

| Method | Use |
| --- | --- |
| `length` | A property to describe the length of the string |
| `indexOf()` | Allows us to discover where a particular string exists |
| `charAt(index)` | Used to discover the character at the specified index. *Don't forget indexes are zero-based!* |
|`substr(start, length)` | Returns a snippet of the original string |
| `toLowerCase()` | Returns a new string that is all lower case. |
| `toUpperCase()` | Returns a new string that is in upper case. |

## Comparing Strings
By calculating the ASCII values of each character, JavaScript can help us determine if one string is equal to another.

```
var first = "Hello";
var second = "hello";

if (first === second) {
  console.log('Strings are equal');
} else {
  console.log('Strings are different');
}
```
