---
title: Substring, Substr, and Slice.
layout: post
---

When dealing with strings in JavaScript, there are several options available when needing to return a particular section: 

## Substring
This function can accept two parameters: the first an integer between 0 and the length of the string; the second an integer between 0 and the length of the string. `substring` returns a subset of a string between one index and another, or if the second parameter is omitted, through to the end of the string. A useful feature of this implementation is that if the first parameter is larger than the second, the effect of `substring` will be as if the arguments were swapped.

## Substr
`substr` is a variant of `substring`. The difference here is that while the first parameter defines the first character, the second specifies the number of characters to return.

## Slice
Both arrays and strings boast a `slice` method. The arguments it will accept are integers to define the the start and end points of the extraction. Again, if the end point is omitted, the function will keep going until the end of the string. A benefit is that the second argument can be a negative value, which will allow the operation to begin counting from the end. On top of this, `slice` will return a new string.

### References
- [http://devdocs.io/javascript/global_objects/string/substring](http://devdocs.io/javascript/global_objects/string/substring)
- [http://devdocs.io/javascript/global_objects/string/substr](http://devdocs.io/javascript/global_objects/string/substr)
- [http://devdocs.io/javascript/global_objects/string/slice](http://devdocs.io/javascript/global_objects/string/slice)
