---
title: Implementing Responsive Images
layout: post
---

I'm hoping that you'll notice the site - particularly my [work section](/work/) - is feeling a little snappier today: that's because I took it upon myself to implement a solution for responsive images.

Take a look at this screenshot (also a responsive image, fact-fans): 
<img srcset="/public/img/build/site-payload-f.jpg 1197w,
/public/img/build/site-payload-m.jpg 599w,
/public/img/build/site-payload-s.jpg 299w" src="/public/img/build/site-payload-f.jpg" alt="Before: Screenshot showing the network tab within Chrome's Developer Tools" />

Chrome's Developer Tools are telling us that a request to `/work` had the browser download 3.4 MB over 13.77 seconds - on a fast ADSL connection. That's pretty bad news for a visitor using a mobile phone on a cellular connection: whether it be the time needed for the page to finish loading, or if their provider imposes a data cap. 

I have a confession: I was being pretty lazy. The images presented were simply screencapped in OS X and uploaded. I didn't resize them or convert them from PNG-24 to a more pallatable format for the web. It's not like I needed the transparency! In fact, I could probably go further: I could crop out the drop-shadow and browser chrome, and implement those additions with CSS.

There are a few options open to a developer wishing to implement responsive images:

### The `srcset` attribute
`srcset` allows the developer to provide the browser with multiple resolutions of the same image.

{% highlight html %}
<img srcset="/public/img/build/ribbonworks-new-full.jpg 1307w,
/public/img/build/ribbonworks-new-med.jpg 654w,
/public/img/build/ribbonworks-new-small.jpg 327w" 
src="/public/img/build/ribbonworks-new-full.jpg" 
alt="Ribbonworks.co.uk" />
{& endhighlight %}

The `srcset` attribute is simply a comma-separated list of URIs and a "width descriptor", which is used by the browser as part of its decision-making process.

### The `picture` element
The new `picture` element in HTML allows the developer to implement 'art-direction': they can choose the image displayed at a particular breakpoint. My screenshots are all of a desktop browser. I could use the picture element to display these images as they appear on mobile, or tablet browsers. The syntax is a slight departure from using `img`:

{% highlight html %}
<picture>
  <source media="(max-width: 36em)" srcset="/public/img/build/ribbonworks-new-mobile-full.jpg 1307w,
/public/img/build/ribbonworks-new-mobile-med.jpg 654w,
/public/img/build/ribbonworks-new-mobile-small.jpg 327w" />
  <source srcset="/public/img/build/ribbonworks-new-full.jpg 1307w,
/public/img/build/ribbonworks-new-med.jpg 654w,
/public/img/build/ribbonworks-new-small.jpg 327w" />
  <img src="/public/img/build/ribbonworks-new-full.jpg" />
</picture>
{% endhighlight %}  

The developer provides `source` elements and an `img`. The browser evaluates the sources until the parameters provided in `media` attribute are true. The `srcset` from this `source` is then applied to the `img`.

## Processing Images
The main obstable to implementing this isn't browser support (there are multiple quality polyfills, such as [Picturefill](https://scottjehl.github.io/picturefill/)), but actually creating multiple versions of each of your images. I ended up using Photoshop and saving each file out at 50 and 25 percent. In doing so, I encountered its "Extract Assets" feature which would make the process a cinch - if its output matched my workflow.
I'd looked at ways of automating it, and found several Grunt plugins, including [grunt-responsive-images](https://www.npmjs.com/package/grunt-responsive-images), though I got turned off at the need to install Imagemagick. 
Adding this functionality to a platform such as WordPress would be seemingly trivial - again, so long as a module such as Imagemagick is installed. WordPress already has the ability to process images and create multiple sizes for different roles.  

### Results
Simply converting my portfolio images to JPEG reduced the required bandwidth down to 1.5 MB: a 42% reduction. As Kevin Bacon would say: "a no-brainer". By taking advantage of `srcset` and providing scaled-down versions of the images, the site loaded in just 2.66 seconds, and only transferred 522 KB:
<img srcset="/public/img/build/site-payload-res-f.jpg 1197w,
/public/img/build/site-payload-res-m.jpg 599w,
/public/img/build/site-payload-res-s.jpg 299w" src="/public/img/build/site-payload-res-f.jpg" alt="After: Screenshot showing the network tab within Chrome's Developer Tools" />

Worthwhile reductions methinks, and this just on a small site. If I were serving many thousands of impressions a day, I know that this would be one way to keep my bandwidth costs down, alongside making the browsing experience more tolerable for everyone.
