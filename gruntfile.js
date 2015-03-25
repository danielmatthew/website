module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		imagemin: {
			// static: {
			// 	files: {
			// 		'public/img/src/breakout.png': 'public/img/build/breakout.png'
			// 	}
			// }
			dynamic: {
				files: [{
					expand: true,
					cwd: 'public/img/src/',
					src: ['**/*.png'],
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['sass', 'imagemin']);
};
