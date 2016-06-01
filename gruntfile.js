'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/css/styles.css':'public/sass/styles.scss'
        }
      }
    },

    watch: {
      css: {
        files: ['public/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },

    styles: {
      options: {
        processors: []
      },
      dist: {
        files: [{
            expand: true,
            cwd: 'public/',
            src: ['**/*.css'],
            dest: 'public/'
        }]
      }
    },

    rev: {
      files: {
        src: ['js/main.js', 'css/styles.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rev');

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', ['sass', 'imagemin']);
};
