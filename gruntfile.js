'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/img/src/',
          src: ['*.{jpg,png'],
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

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({browsers: 'last 2 versions'}),
                require('cssnano')()
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

    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in: ' + time + 'ms at ' + (new Date()).toString());
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
          spawn: false,
          livereload: true
        }
      },
      livereload: {
        files: ['public/**/*'],
        options: {
          livereload: true
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

    filerev: {
        options: {
            algorithm: 'md5',
            length: 8
        },
        styles: {
            src: 'public/css/styles.css'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-filerev');


  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('css', ['postcss']);
  grunt.registerTask('rev', ['filerev']);
  grunt.registerTask('w', [
    'sass',
    'watch'
  ]);
  grunt.registerTask('default', ['postcss']);
};
