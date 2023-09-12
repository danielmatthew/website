---
title: setTimeout and setInterval

---

<p class="lead">JavaScript features a couple of useful utilities that allow the developer to schedule code to run outside of the normal execution flow.</p>

## setTimeout

In order to run a function after a specific delay, we use `setTimeout()`:

```js
function doSomething(message) {
  console.log(message);
}

var myTimeout = setTimeout(doSomething, 2000, "lol");

// Two seconds later...
// lol
```

Timeouts can be cancelled using `clearTimeout()` and passing the ID of the timeout in question. In the above example, to prevent our applicating from printing `lol`, we could set up a button which called `clearTimeout(myTimeout)`.


## setInterval

If you want to call a function repeatedly, `setInterval()` is the more appropriate tool. It looks very similar:

```js
function doSomethingElse(message) {
  console.log(message);
}

var myInterval = setInterval(doSomethingElse, 5000, "See you in five...");

// Every five seconds...
// See you in five...
```

As with timeouts, we can run `clearInterval()` to call a halt to proceedings when we are done with it.

## Debouncing
Imagine a searchbox that offers suggestions as you type. On each `keydown` event, a function is run that makes a network request. If the user enters a long query quickly, the browser (and remote server!) may quickly become overwhelmed and end up feeling unresponsive.

To overcome this, we can implement `setTimeout()` in order to _debounce_ the event: we prevent it from happening too often.
Instead of calling the function on each keypress, we wait for an opportune moment - perhaps a slight pause. When events occur closer than our timeout delay, the timeout from the previous keypress is cancelled and a new one is executed.

```js
var myTextBox = document.querySelector('[type="search"]');
var myTimeout;

myTextBox.addEventListener("keydown", function() {
  clearTimeout(myTimeout);
  myTimeout = setTimeout(function() {
    // Query remote server
  }, 500);
});
```
