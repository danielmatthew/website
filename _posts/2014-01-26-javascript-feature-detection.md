---
layout: post
title: JavaScript Feature Detection
---

Some JavaScript features just don't work in certain browsers. While it used to be a common practice to 'sniff' the user-agent string of the browser, [this is now frowned-upon](https://developer.mozilla.org/en-US/docs/Browser_Detection_and_Cross_Browser_Support). The preferred approach is for developers to implement feature detection. That is, testing the ability of the browser to carry out the desired task. If the feature is not supported, we write our code intelligently in order to cater for this eventuality.

In Mark Pilgrim's _Dive Into HTML5_, he documents a selection of techniques:
- Checking for the existence of a property on a global object
- Creating an element and checking for the property on that
- Calling a method on a generated element and examining the value it returns
- Setting a property on an element to a particular value and checking to see whether it has retained this value

A common example of the first technique is when writing an AJAX function:

{% highlight js %}
var xmlHttp;
if (window.XMLHttpRequest) {
  xmlHttp = new XMLHttpRequest();
} else {
  // Figure out which ActiveX control to set up for Internet Explorer
  var XmlHttpVersions = new Array(
  'MSXML2.XMLHTTP.6.0',
  'MSXML2.XMLHTTP.5.0',
  'MSXML2.XMLHTTP.4.0',
  'MSXML2.XMLHTTP.3.0',
  'MSXML2.XMLHTTP',
  'Microsoft.XMLHTTP');
  
  for (var i = 0; i < XmlHttpVersions.length && !xmlHttp; i++){
    try {
      xmlHttp = new ActiveXObject(XmlHttpVersions[i]);
    } catch(e) {
      // Here be dragons
    }
   }
  }
{% endhighlight %}

Thankfully, libraries such as [Modernizr](http://modernizr.com) can be implemented in order to reduce the amount of boilerplate that needs to be written. It has an API that can be queried to easily check for feature support. If they're not present, we can write a fallback so that the user's experience isn't compromised:

{% highlight js %}
// Determine if font-face is supported
if (Modernizr.fontface) {
  // Do something
} else {
  // No fancy fonts
}
{% endhighlight %}


### References
- [http://diveintohtml5.info/detect.html](http://diveintohtml5.info/detect.html)
- [http://www.quirksmode.org/js/support.html](http://www.quirksmode.org/js/support.html)
- [http://jibbering.com/faq/notes/detect-browser/](http://www.quirksmode.org/js/support.html)
- [http://msdn.microsoft.com/en-us/magazine/hh475813.aspx](http://msdn.microsoft.com/en-us/magazine/hh475813.aspx)
- [http://learn.jquery.com/code-organization/feature-browser-detection/](http://learn.jquery.com/code-organization/feature-browser-detection/)