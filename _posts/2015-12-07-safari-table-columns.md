---
title: Column Sizing and Captions in Safari
layout: post
---


**Updated 25/09/2016:** It still appears to be an issue in Safari 10.0 (macOS Sierra).

A couple of weeks ago, I encountered an odd rendering issue with Safari and column widths. I had planned to write about it, lest the afternoon I spent trying to debug it be of use to anyone who stumbles across this post. Before I could get round to it, lo and behold: I've fallen victim to it again! Safari on OSX - both Yosemite and El Capitan - does not like the following scenario:

{% highlight css %}
.col-checkbox {
  width: 28px;
}

.col-content {
  width: auto;
}

.col-action-btn {
  width: 60px;
}
{% endhighlight %}

{% highlight html %}
<table class="table table-striped">
 <caption class="sr-only">My caption to describe the table</caption>
  <colgroup>
    <col class="col-checkbox">
    <col class="col-content">
    <col class="col-action-btn">
  </colgroup>
  <thead>
  <tr>
    <th>
      <div>
        <span>
          <input type="checkbox">
        </span>
      </div>
    </th>
    <th>Two</th>
    <th>Three</th>
  </th>
</tr>
</thead>
<tbody>
  <tr>
    <td><input type="checkbox"></td>
    <td>Content</td>
    <td>Content</td>
  </tr>
</tbody>
</table>
{% endhighlight %}

Safari refuses to apply the column widths specified in the stylesheet, and instead splits the columns based on their content, flagrantly ignoring the authors instructions.

It seems to be related to the `sr-only` class applied to the `caption`. This utility class hides the element from those who can see the table contents as a whole, but provides a useful description for those using assistive technologies. Within this class, the `position: absolute` declaration used to remove the element from the document flow causes the bug. But strangely, it only happens when applied to `caption`: were one to use a `span` here, Safari will respect the column widths.

![Screenshot illustrating the table rendering bug in Safari](/public/img/src/safari-table-bug.png)

I've not been able to replicate in other desktop browsers: Chrome, Firefox, and Opera split the columns as desired, though Mobile Safari renders the table as per its desktop cousin. The Internet seems to have a scarcity of other reports, which makes me wonder if I have encountered a bug. Or maybe nobody else is combining this class with table captions, column widths - defined using classes, since the `width` attribute is obsolete - and Safari. I wonder at what point does it become a Safari / Webkit bug? I have a demo of it available on [JSBin](http://jsbin.com/sabisa/embed?html,output) and the various permutations are easily replicable.
