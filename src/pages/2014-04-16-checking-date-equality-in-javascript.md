---
title: Checking Date Equality in JavaScript
layout: post
---

Checking whether one date is equal to another is made difficult because of the way object equality works in JavaScript. Object equality isn't tested by the internal value of the object, but by identity. If the date object isn't a straight copy, it isn't considered equal. The following example will never return `true`:

{% highlight js %}
function isChristmas(dateToTest){
  var christmas = new Date("12/25/2014");
  return (dateToTest === christmas);
}

console.log(isChristmas(new Date("12/25/2014"))); // False
{% endhighlight %}

To make the `isChristmas` function work, we need to check equality in a different way. We use the `getTime` method that is available on Date object, and compare the values it returns. `getTime` returns an integer representing the number of milliseconds since midnight of the epoch: January 1st, 1970.

{% highlight js %}
function isChristmas(dateToTest){
  var christmas = new Date("12/25/2014");
  return (dateToTest.getTime() === christmas.getTime());
}

console.log(isChristmas(new Date("12/25/2014"))); // True 
{% endhighlight %}

But! If we happen to compare against a `Date` object that occurs on the same day, but a different hour, we'll run into trouble - because the time elapsed since the epoch will be different. 

A work around here might be to check our date against the year, month and day, like so: 

{% highlight js %}
function isChristmas(dateToTest){
  return (dateToTest.getFullYear() === 2014) &&
  (dateToTest.getMonth() === 11) &&
  (dateToTest.getDate() === 25);
}

console.log(isChristmas(new Date("12/25/2014 12:00"))); // True 
{% endhighlight %}

But then this is glossing over the complexities that daylight savings and timezones introduce.

TL;DR: Be aware that there are 'gotchas' when comparing dates. Use [Moment.js](http://momentjs.com) to avoid them and make your life easier.