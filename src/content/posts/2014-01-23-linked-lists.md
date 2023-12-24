---

title: Linked Lists
publishedDate: 2014-01-23
---

<p class="message">This is one of a series based around understanding a number of core Computer Science concepts - <a href="/2014/01/22/path-to-mastery/">please read the original post for the intentions behind it</a>.</p>

A linked list is often used to implement data structures including lists, stacks, queues, and associated arrays.
It's constructed from a list of nodes which when linked together represent a sequence. Each node is built of its data and a pointer to the next node in the sequence. Elements can be inserted or removed at any position.

In JavaScript, a linked list could look like this:
```js
// A single node
var node1 = {
	data: null,
	next: null
};

// Add data to node
node1.data = 12;

// Create another node
var node2 = {
	data: null,
	next: null
};

// Link (aha!) first node to second
node1.next = node2;
```

This will soon become rather unwieldy to manually manage, so at this point we'll need to write a function that can do the grunt work for us:
- add an item
- retrieve an item
- remove an item

As above, our representation of a list will need to have properties which reveal its length and the first item in the list.

```js
function linkedList() {
  this.length = 0;
  this.head = null;
}
```

In order to add an item to the list, we will need to traverse the list until we find the desired location. If the list is empty, we create a new node and assign it to our lists `head`.

```js
add: function(data) {
  var node = {
    date: data,
    next: null
  },
    current;

  if (this.head === null) {
    this.head = node;
  } else {
    current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  this.length++;
},
```



```js
retrieve: function(index) {
  // Check index not out of bounds
  if (index > -1 && index < this.length){
    var current = this.head,
      i = 0;

    while (i++ < index){
      current = current.next;
    }

    return current.data;
  } else {
    return null;
  }
},
```


