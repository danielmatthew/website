---
title: 'Empty date input, Chrome, and VoiceOver'
publishedDate: 2026-10-16T20:41:27.171Z
published: true
evergreen: false
updatedDate: 2026-10-16T20:41:33.233Z
---

I encountered a curious behaviour while reviewing some work for a colleague. Now, as [documented by WebAIM](https://webaim.org/projects/screenreadersurvey11/?ref=frontenddogma.com) Chrome and VoiceOver are not the most popular screen reader pairing 

A minimal reproducible example follows:

```html
<label for="startDate">Date range start</label>
<input type="date" id="startDate" />
```

In Safari, a Webkit-powered browser, and VoiceOver on macOS 27.0 (Golden Gate), the by default the browser displays the current date as a placeholder value. The screen reader output is as follows:

1. 0, day, stepper
2. 0, month, stepper
3. 0, year, stepper

In Vivaldi, a Chromium-powered browser, and VoiceOver on macOS 27.0 (Golden Gate), the output is as follows:

1. -3.3%, Day Date range start, stepper
2. -9.1%, Month Date range start, stepper
3. -0%, Year Date range start, stepper

Weird, eh? Like the default values ("dd", “mm”, “yyyy”) are being cast to a different data type.

Setting a default value on the date input appears to offer a consistent experience across browser and screen reader combinations:

```html
<label for="startDate">Date range start</label>
<input type="date" id="startDate" value="2026-10-16" />
```

Happily, some two years after it was first raised on [the Chromium issue tracker](https://issues.chromium.org/issues/361250561) (#361250561) it appears to have been fixed and is due to be resolved in Chrome v156.
