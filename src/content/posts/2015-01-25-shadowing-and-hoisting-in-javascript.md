---
title: Shadowing And Hoisting In JavaScript
published: true
---

## Shadowing
To "shadow" a variable is to create a new variable with the same name as one that exists in a higher scope. In JavaScript, a new scope is created when writing a function. When resolving a variable, JavaScript starts at the innermost scope and searches outwards.

## Hoisting
Hoisting, on the other hand, is a behaviour which results in variables being raised, or 'hoisted', to the top of the scope - the function - in which they have been defined. It's recommended to declare all of your variables at the top of a function in order to avoid overwriting a value.
