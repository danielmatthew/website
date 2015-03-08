module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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

	grunt.registerTask('default', []);
	grunt.registerTask('buildcss', ['sass']);
};
