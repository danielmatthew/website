---
title: Accessible design guidelines
publishedDate: 2026-05-06T21:33:13.898Z
---

## Operating and Navigating  

### Don't design for mouse interactions alone  

Anything that can be done with a mouse should also work with a keyboard. Or a pointer. Or a switch. Or with eye tracking.  

### Design what keyboard interactions look like  

Design what it looks like when an element receives keyboard focus. Most interactive elements automatically receive focus. When building complex user interface controls, focus might move within it e.g. radio buttons, tabs, media player.   

### Think about the tab order  

In what order does a user tab through an interface? Don’t spring surprises on the user. Embrace the principle of KISS.  

Ensure there are no keyboard traps whereby a user reaches a dead-end. It should be possible to move through the entire page using Tab, Shift + Tab, Escape, and the arrow keys.  

### Targets should be large enough  

Make sure targets are at least 24px by 24px. Mobile interface guidelines suggest 44px by 44px. Somebody who struggles with fine motor control has a real tough time activating tiny interactive elements.  

### Skip links  

Make it easy for the user to skip past long and repetitive sections. Menus, carousels, lists: give a keyboard user a way to bypass these sections and quickly move around the page.  

### Links should be recognisable  

Don't remove link underlines from links in body text. They're a recognised convention, and an easy way to use something other than colour.  

### Naming things   

Include text labels for inputs and form elements. We can use an icon for search inputs.  

### Auto-playing content  

If content automatically plays – think audio, video, carousels – it should respect user preferences by default. It should provide a way to pause operation within the first three controls.  

## Colour  

### Colour contrast  

Text should have colour contrast of at least 4.5:1 between foreground and background. User interface components such as buttons need to offer at least 3:1 between the component and its background – in all states:  

* Default   
* Hover  
* Focus 
* Selected  
* Unselected  
* Active  

### Use of colour  

Don't use colour as the only way to communicate information.  

* Broke: invalid text input only has a red border  
* Woke: invalid text input has a red border, an obvious icon, and a useful error message telling the user how to fix the problem.  

## Typography  

### Font size  

While there's no "one-size, fits all", the browser default of 16px is a good place to start. By using fluid units such as ems, our user can set the font size to their preferences. Make sure you've thought about how text might wrap within your design: we don't want text bursting out of containers and causing horizontal scrolling.  

### Legibility  

Avoid typefaces which have ambiguity between characters such as IL1. If possible, use alternative glyphs to use the single-storey 'a', dotted or slashed zero etc.   

### Numbers  

Turn on tabular numbers to ensure each digit uses a fixed-width: this helps keep columns aligned, and helps prevent jiggling as numbers update.  

## References  

* Vox: [Accessibility checklist for UX designers  ](https://vox.publicissapient.com/home/accessibility-checklist-for-user-experience-designers)
* Vox: [Accessibility checklist for visual designers  ](https://vox.publicissapient.com/home/accessibility-checklist-for-visual-designers)
* Vox: [Reviewing a design or wireframe for accessibility compliance](https://vox.publicissapient.com/home/reviewing-a-design-for-accessibility-compliance)  
* Deque: [Designing accessible focus indicators   ](https://www.deque.com/blog/give-site-focus-tips-designing-usable-focus-indicators/)
* [Accessible Numbers ](https://accessiblenumbers.com/)
* Calculate how many of your audience have a disability: [How many people](https://design.education.gov.uk/tools/how-many-users)?  
* [Microsoft Inclusive Design toolkit](https://www.microsoft.com/design/inclusive/)  
* [Stark plugin for Figma ](https://www.getstark.co/) 
* [Colour Contrast Analyser  ](https://developer.paciellogroup.com/resources/contrastanalyser/)
* [NoCoffee](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl) – browser plugin to simulate visual impairments  
* [Accessible colour palette builder ](https://toolness.github.io/accessible-color-matrix/) 
