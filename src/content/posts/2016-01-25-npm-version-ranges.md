---
title: npm 101 – Version Ranges

published: true
publishedDate: 2016-01-25
---

The following is a snippet from this site's `package.json`:

```json
  "devDependencies": {
    "bower": "^1.6.5",
    "grunt": "~0.4.5",
    "grunt-contrib-imagemin": "~0.9.4",
    "grunt-contrib-sass": "~0.9.2",
    "grunt-contrib-watch": "~0.6.1",
    "matchdep": "~0.3.0"
  }
```

As per the JSON spec, we've got a series of key/value pairs making up the `devDependencies` object: the name of the package we want installed for those working on the project, and the version number of that package. However, using `npm install <package>` will leave odd extra characters in the generated file. So what do they mean?

| Indicator | Name | Meaning |
| --- | --- | --- |
| `^` | Caret range | Allows minor and patch updates |
| `~` | Tilde range | Allows patch-level changes if minor version is specified |

It's possible to add configure your project to help ensure only a specific version of a package is added. Create a file called `.npmrc`, and specify `save-exact=true`. As a bonus, you can also added `save=true` to make sure that any new installs are added to your projects' `package.json`
