---

title: Using Grunt to Compile Sass
---

A quick snippet from my `gruntfile.js` that illustrates how I'm using Grunt to watch my Sass directory for changes, before compiling and outputting minified CSS.

```js
grunt.initConfig({
  watch: {
    css: {
      files: ['public/sass/**/*.scss'],
      tasks: ['buildcss']
    }
  },
  sass: {
    build: {
      options: {
        style: 'compressed'
      },
      files: {
        'public/css/styles.css':'public/sass/styles.scss'
      }
    }
  }
});

grunt.registerTask('buildcss', ['sass']);
```

When coding, use `grunt watch` to keep track of changes, or run `grunt buildcss` to manually compile the files.
