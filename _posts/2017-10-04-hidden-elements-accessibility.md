---
title: Hide An Element From A Screenreader
layout: post
published: true
---

I recently discovered that it's not enough to rely on either `role="presentation"` or `aria-hidden="true"` to remove an element from the accessibility tree. Just like CSS quirks, in order to ensure an element is truly hidden from screenreaders across operating systems and browsers, you will want to double-up on the attributes:

```html
  <!-- Tested using macOS, Voiceover, and Chrome 63 -->

  <!-- Will be announced -->
  <div>I am a presentation element. I don't add anything more than a visual flourish.</div>

  <!-- Will be announced in Voiceover, but not in JAWS -->
  <div role="presentation">I am a presentation element. I don't add anything more than a visual flourish.</div>

  <!-- Voiceover will ignore this element; JAWS won't -->
  <div aria-hidden="true">I am a presentation element. I don't add anything more than a visual flourish.</div>

  <!-- Voiceover will ignore this element -->
  <div aria-hidden="true" role="presentation">I am a presentation element. I don't add anything more than a visual flourish.</div>
```

[You can view the demo at JSBin](http://output.jsbin.com/zaqiboc)
