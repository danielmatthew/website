'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true,
        style: 'compressed'
      },
      dist: {
        files: {
          'public/css/styles.css':'public/sass/styles.scss'
        }
      }
    },

    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
        livereload: true
      },
      sass: {
        files: ['public/sass/*.{scss,sass}'],
        tasks: ['sass', 'postcss'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['public/sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['gruntfile.js']
      },
      livereload: {
        files: ['public/**/*'],
        options: {
          livereload: true
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/img/src/',
          src: ['**/*.jpg'],
          dest: 'public/img/build/'
        }]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('w', [
    'sass',
    'watch'
  ]);
  grunt.registerTask('default', ['postcss']);
};
