---
layout: post
title: Access URL Query Parameters With JavaScript
---

I was recently tasked with building a promotional page for [Didlr](http://didlr.com/promotions/year-of-donuts?username=dan) which needed to feature a personalised call to action. Typically, this would have been done server-side, but as visitors would be landing on the page via one of the mobile apps, we'd have to append the username when delivering the ads with our API. Thus, I would have to access this information on the client. And this is how I did it:

```js
if (queryString('username')) {
	userName = queryString('username');
} else {
	userName = 'Your username goes here';
}

function queryString(key) {
	var url = window.location.href,
		keyValues = url.split(/[\?&]+/);

	for (i = 0; i < keyValues.length; i++) {
		keyValue = keyValues[i].split('=');

		if (keyValue[0] == key) {
			return keyValue[1];
		}
	}
}
```

There is certainly more than one way to skin a cat (as the saying goes), and were I a wee bit more comfortable with regular expressions I'm guessing that my `queryString()` function could be a little more elegant.  The solution here grabs the URL, then adds items to an array when we encounter either an ampersand or a question mark. We loop over that array, and for each item contained within, we break it apart to return the value associated with the specified key.

On StackOverflow, an alternative solution is as follows:

```js
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);

  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
```
