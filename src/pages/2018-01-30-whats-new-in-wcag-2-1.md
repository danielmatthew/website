---
title: "What's new in WCAG 2.1"
layout: post
published: false
---

## What is WCAG 2.1?
- The latest version of the Web Content Accessibility Guidelines.
- Version 2.0 published 2011(?)
- Version 3.0 AKA Silver currently in discussion
- First Working Draft (WD) published 28/02/2017
- "In-progress" updates can be viewed [here](https://w3c.github.io/wcag21/guidelines/) 
- Moved from Candidate Recommendation to Proposed Recommendation.
- Any final feedback needs to be received by 30/03/2018 on the [WCAG 2.1 Github repository](https://github.com/w3c/wcag21/issues/new).

## New success criteria in WCAG 2.1

### § Perceivable
#### 1.3.4 Identify common purpose (AA)
Each input field can be programattically determined when:
- the input field has a meaning that maps to to the HTML 5.2 autofill names
- the content is implemented using technologies with support for identifying the expected meaning for form input data.
#### 1.3.5 Identify purpose (AAA)
In content implemented using markup languages, the purpose of [components], icons, and regions can be programmatically determined.
#### 1.4.10 Reflow (AA)
Content can be presented without loss of information or functionality, and without requrieing scrolling in two dimensions
(Basically, keep everything in one dimension)
#### 1.4.11 Non-text contrast (AA)
Visual information used to indicate the state of a component, and the boundaries of a component, have a contrast ratio of 3:1.
#### 1.4.12 Text spacing (AA)
- Line height at least 1.5x font-size
- Spacing after a paragraph to be at least 2x font size
- Letter-spacing at least 0.12x font size
- Word spacing at least 0.16x font size
#### 1.4.13 Content on hover or focus (AA)
- If content can be invoked in either way, it must not obscure the content it relates to.
- Native controls (i.e. browser tooltips) are exempt

### § Operable 
#### 2.2.6 Timeouts (AAA)
Users are warned how long they have before data loss, unless the data is preserved for more than 20 hours.
#### 2.27 Animation from interactions (AAA)
Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.

iOS has an accessibility setting called 'Reduce Motion' which disables the many animations that disguise the change in states. It helps people with vertigo and motion sickness.

#### 2.4.11 Character key shortcuts (A)
If keyboard shortcuts are
#### Label in name
#### Pointer gestures
#### Pointer cancellation
#### Target size
#### Concurrent input mechanisms
#### Motion actuation
If you are taking advantage 
#### Orientation

### § Section 
#### Status changes
* "Programmatically determined": so that different user agents - a screen reader, perhaps - can get at the information 
