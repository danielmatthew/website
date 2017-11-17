---
title: Each, Map, and Reduce
layout: post
---

<p class="lead">Functional programming (FP) aims to create predictable code by eliminating so-called <a href="https://programmers.stackexchange.com/questions/40297/what-is-a-side-effect">side effects</a>, bringing with it  confidence that the same code with the same arguments will produce the same results. In order to achieve this, developers rely on <i>higher-order functions</i>: functions that operate on other functions.</p>
<p class="lead">JavaScript provides the developer with a number of useful functions that can be used to apply FP principles to their development.</p>

## forEach()
`forEach()` takes an array, iterates over its values and applies the specified function on them. It can be considered an abstracted version of the basic `for` loop: we don't define a counter, check the length of the array, tell it how to increment (or decrement, for that matter), nor have to define a new variable within the loop body to store the current element.

```js
var foo = [
  'Tom',
  'Dick',
  'Harry'
];

foo.forEach(function(name) {
  return name + ' smells';
});

```

While the applied function can be created on the spot, we can also provide a function that has been written earlier in the hopes of adhering to the principle of [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

`forEach()` (and the functions mentioned below) were 'only' standardised in 2009, so aren't available in older browsers. Should you rather not write a polyfill yourself, [lodash](https://lodash.com/) (or [Underscore](http://underscorejs.org/)) provide an interface to the same functionality:

```js
var foo = [
  'Tom',
  'Dick',
  'Harry'
];

_.each(foo, function(name) {
  return name + ' smells';
});

```

Interestingly, [Ben McCormick](http://benmccormick.org/2014/11/12/underscore-vs-lodash/) tells us that the two libraries are both faster than their native counterparts in this case:

> A little research indicates that this is because native functions optimize for sparse arrays and have more weird corner cases that they handle. In any case, the performance difference is pretty startling across the board.

While the native implementation is currently only available on arrays, lodash's implementation is designed to operate on any kind of collection, including object literals and NodeLists.


## map()
The `map()` method takes an array, iterates over its contents, applies a function to all of its elements, and returns a new array with the transformed values.

```js
var foo = [
  'Tom',
  'Dick',
  'Harry',
];

// Native
var bar = foo.map(function(name) {
  return name + ' smells';
});

// lodash
var bar = _.map(foo, function() {
  return name + ' smells';
});
```

This helps streamline the process of avoiding 'side effects' - the function isn't altering our original array, so it can be used again without mishap.

## reduce()
When we want to get just a single value from an array, we can turn to `reduce()`. This method aggregates all values in a collection and returns a single value from them: whether that be a miniumum, maximum, average, or what-have-you.

`reduce()` takes a transformative function, and an intial value it should start computing with:

```js
var foo = [
  {name: 'Tom', age: 20},
  {name: 'Dick', age: 30},
  {name: 'Harry', age: 40}
];

var totalAge = function(result, person) {
  return result + person.age;
};

// Native
var total = foo.reduce(totalAge, 0); // 90

// lodash
var total = _.reduce(foo, totalAge, 10); // 100 - we started with 10 and continued summing from there.
```

## Conclusion
The functions featured above are useful additions to a developer's toolkit. That these are higher-order functions means that they allow developers to write code that is simple to comprehend. There is no mess of code dealing with initialising loops to wade through. As these functions work on the output of other functions, they can be chained together quite trivially. Here's [lodash's example for its `.chain()` function](https://lodash.com/docs#chain):

```js
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];

var youngest = _.chain(users)
  .sortBy('age')
  .map(function(chr) {
    return chr.user + ' is ' + chr.age;
  })
  .first()
  .value();
// → 'pebbles is 1'
```

Straightforward, self-documenting code.
