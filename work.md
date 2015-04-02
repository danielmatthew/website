---
layout: page
title: Work
---

A collection of work that I have undertaken over the past 12 months or so. Please feel free to ask any questions!

I like to build responsive web sites.

## Technology Stack
### Experimental
A bunch of the new hotness that I'm tinkering with:

- Ionic
- React.js
- Parse
- Framer

### Picking up steam
Keeping an eye out for projects that I can use these technologies with:

- Angular
- Ember
- Meteor
- Node

### Stalwarts
Tools that I work with day in, day out:

- HTML
- CSS
- Sass
- JavaScript
- Underscore
- Grunt
- Yeoman
- Bower
- Jekyll
- WordPress
- Git
- SVN
- Photoshop

<form action="//formspree.io/formspree@danmatthew.co.uk" method="POST">
    <input type="hidden" name="_subject" value="New website message">
    <input type="text" name="name" placeholder="Your name">
    <input type="email" name="_replyto" placeholder="Your email address" validate>
    <textarea name="message" placeholder="Your message here"></textarea>
    <input type="submit" value="Send">
</form>

### [Lanyards.co.uk](http://lanyards.co.uk)
![Lanyards](/public/img/build/lanyards.png)

For this project I took a series of supplied designs and wrote the markup and stylesheets in order to make the site responsive across multiple breakpoints.

- HTML
- Sass

### [S-no-w Escape](http://flappy.danmatthew.co.uk)
![S-no-w Escape](/public/img/build/flappy.png)

A new take on Flappy Bird using [Phaser.js](http://phaser.io)! Pilot a snowspeeder between AT-AT legs and get a high-score. Medals are awarded when you pass 10 and 20 legs, and your record is kept in local storage*.

- JS

### [Breakout](http://breakout.danmatthew.co.uk)
![Breakout](/public/img/build/breakout.png)

A Cadbury-branded Breakout clone to explore [Phaser.js](http://phaser.io/)

- JS

### [Data Visualisations](http://datavis.danmatthew.co.uk)
![Datavis](/public/img/build/datavis.png)

Experimenting with [D3.js](http://d3js.org) to map the US population density with SVG.

- D3.js
- TopoJSON

### [Freelance Design Leads](http://leads.danmatthew.co.uk)
![Freelance](/public/img/build/freelance.png)

A service for web freelancers: you get the best leads in your inbox daily, for less than a dollar.

- HTML
- CSS
- Copywriting


### [Superfluent](http://superfluent.co)
![Superfluent](/public/img/build/superfluent.png)

A home for side-projects and a testing bed for ideas.

- HTML
- Sass
- JS

### [Double Rainbow](http://hammr.co/7806257/2)
An experiment with background colour animations, text-clipping and text-fill properties.

- HTML
- Sass

### [CoStarred](http://costarred.im)
![Superfluent](/public/img/build/costarred.png)

The easy way to discover who have been in movies together. A project with [Ben Howdle](http://benhowdle.im).

- Design
- HTML
- Sass
- JavaScript

### [Album Art: _A List Apart_ "10k Apart" Entry](http://lastfm.danmatthew.co.uk)
![Last.fm](/public/img/build/lastfm.png)

A lightweight (< 10Kb) and responsive website which displays global and user-specific trending tracks.

- Design
- HTML
- Sass
- JavaScript
- jQuery

### [GymBuddy](http://gymbuddy.meteor.com)
- MeteorJS

### [RibbonWorks](http://ribbonworks.co.uk)
Converted supplied PhotoShop documents into a skeleton markup and CSS framework.

- HTML
- CSS

#### Github
Here's the full listing of projects that I've been keeping under version control on Github:

<ul>
  {% for repository in site.github.public_repositories %}
    <li>{{ repository.full_name }} </li>
  {% endfor %}
</ul>