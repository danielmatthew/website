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
        livereload: true,
        debounceDelay: 500
      },
      sass: {
        files: ['public/sass/*.scss'],
        tasks: ['sass']
      },
      livereload: {
        files: ['public/**/*']
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('default', ['sass']);
};
