---
title: How to perform an accessibility design review
publishedDate: 2026-05-05T20:28:47.744Z
---

This is an adaptation of something I wrote to help designers on project I worked on between Spring 2024 and Winter 2025. Maybe you'll find it useful too!

***

## When to review?

As the saying goes, “the best time to ~~plant a tree~~ review accessibility is 20 years ago. The second best time is now”. Don't wait! Review early and often. 

It's much easier to catch critical issues early in your process before too much time, effort, or money has been invested in a solving a particular problem.

## Quick checklist

For any new component:

1. Have you annotated the headings on your feature? (Do you even annotate?)
2. Have you defined the focus/tabbing order on your feature?
3. Have you added screen reader labels for elements that are not focusable (e.g. dynamic content changes; images and their alternative text)
4. Does the text meet colour contrast requirements? (4.5:1 for body text; 3:1 for large text)
5. Do graphic objects meet colour contrast requirements (3:1)? What about elements of user interface used to identify controls?
6. With colour removed, can you still make sense of the design? You're not relying on colour, are you?
7. Can all revealable information (tooltips, accordions) be accessed with a keyboard or a mouse>
8. If a user doubles the text size, is the page still usable?
9. If the viewport is reduced in size, is everything usable without introducing horizontal scrolling?

## Basic expectations

### The design uses an accessibility-first approach

* We create better products for everyone when we consider people are are different to use.
* Consider situations for people using assistive technologies ahead of design review
  * Use Cards for Humanity and consider whether your design will meet the needs of the generated pairing
  * Use Maya Benari's Empathy Maker for another set of scenarios
  * Test your design with a random Empathy Prompt. Will it still work?
* Consider the question: "Who am I willing to exclude?" when solving a problem. For example, hiding content behind a hover interaction means a whole swathe of keyboard and touchscreen users won't be given access to the same to perform tasks. The constituents of that audience might surprise you.
* Accessibility is about removing barriers. It's better to design inclusively and not introduce them at all.

### Accessibility annotations included

Use an annotation kit or plugin – I like eBay's Include – to call out basic accessibility features:

* Page title
* Landmarks
* Headings
* Links
* Buttons
* Alternative text for images, data visualisations, and rich media
* Focus & reading order - if different from the default top-to-bottom, left-to-right flow in LTR scripts.
* Naming of UI components

### Defined interactions for custom components

* Any custom components modifying or combining interactions need clear direction on the desired keyboard and screen reader experience. For example, a Carousel:
  * Will the arrow keys operate the carousel?
  * Does the spacebar pause the carousel?
  * What interactions should be documented with testing instructions?

### Contrast meets requirements

* All text and interactive elements should meet contrast requirements
  * Text is 4.5:1
  * UI components are 3:1
* Use the Colour Contrast Analyser to check each state of the component:
  * Default (or “Resting”, as I've recently heard it called)
  * Hover
  * Focus
  * Read-only
  * Valid
  * Error
  * Loading
  * Other?

### Logical headings

* The h1 is the meaningful title of the page
* Major sections are titled with h2 
* If the design calls for h4, h5, and h6 we might want to reconsider the information architecture of the page.
* Decouple headings from styles
  * Component libraries must decouple styles and style names from heading levels
  * When heading levels are directly coupled to size, developers will use heading levels out of order to make text bigger or smaller.

### Use plain language

* Plain language makes content easier for all users to consume and understand.
* Avoid using idioms or implying jokes: this can be difficult for people who speak English as a second language.
* Avoid technical jargon.

### Vertical layout for forms

* Folks using screen magnifiers will zoom in on their screen. This means they can only see a portion of the layout. Adhering to a single column makes it easier for somebody to follow the edge of the form as they complete their task, and helps minimise content (such as validation indicators) from being missed 

### Alt text conventions

* Define alt text when the image adds meaning to the page: it could supply information, or help set the tone.
* Good alt text allows anyone who can't see the screen to describe it to somebody else. Imagine describing its contents to a friend.

### Sufficient contrast and text size

* Components should also account for somebody increasing the font size of their browser in order to make content easier to read.
* This is where text truncation as a content strategy can fall down: suddenly the last few characters of a label are now visible as “ME…”. What does that even mean? One of the few situations where someone using an assistive technology will get the better experience.

### Colour perception accommodation

* Don't use colour as the only way of conveying content: any indicator dots would benefit from some sort of shape change to help disambiguate them.

### Large target size

* Prefer large target areas to help folks with motor disabilities. The WCAG define this at 24px x 24px at AA, but measures for iOS and Android are more generous at 44 x 44 points.

### Focus states

* Included keyboard focus as a default in the design system, alongside others, e.g. Checkbox:
  * Unchecked
  * Unchecked + hover
  * Unchecked + focus
  * Checked
  * Checked + hover
  * Checked + focus
* The focus state must be obvious: both colour contrast but also dimensions. A 2px outline is a good start. Modern browsers allow focus rings to follow the border radius of an element.

### Logical focus order

* Developers can use logical properties in CSS to ensure layouts reflect the preferences including locale and language of the user.

### Responds to user preferences

* One of the challenges of designing for the web, but also the property that makes it incredibly robust, is that it is not a fixed canvas. Of course a layout might be designed for 1280 x 720, but the browser window might be a different size, the orientation might be portrait, the user might want to turn off all animations - if only to save battery - or might be consuming the website via a portable Braille device. Think about how content might reflect those preferences and ensure you've considered ways to help make it work.
