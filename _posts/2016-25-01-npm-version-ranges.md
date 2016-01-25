---
title: NPM101: Version Ranges
layout: post
---

{% highlight json %}
  "devDependencies": {
    "bower": "^1.6.5",
    "grunt": "~0.4.5",
    "grunt-contrib-imagemin": "~0.9.4",
    "grunt-contrib-sass": "~0.9.2",
    "grunt-contrib-watch": "~0.6.1",
    "matchdep": "~0.3.0"
  },
{% endhighlight %}

| Indicator | Name | Meaning | 
| --- | --- | --- |
| `^` | Caret range | Allows minor and patch updates |
| `~` | Tilde range | Allows patch-level changes if minor version is specified |
