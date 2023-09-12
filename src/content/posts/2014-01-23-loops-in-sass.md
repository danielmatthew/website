---

title: Loops in Sass
---

Sass makes it dead simple to automate repetitive tasks we might encounter when writing CSS.

## Sass 'For' loop
```scss
@for $i from 1 through 100 {
  .box:nth-child(#{i}) {
    // Properties
  }
}
```

## Sass 'Each' loop
```scss
@each $member in john, paul, george, ringo {
  .bandmember.#{$member} {
    background url("images/#{$member}.png");
  }
}
```
