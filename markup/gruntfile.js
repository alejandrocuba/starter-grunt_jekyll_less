/*!
 * boilerplate-grunt_jekyll_less (https://github.com/ZorphDark/boilerplate-grunt_jekyll_less.git)
 * <> by @zorphdark 2016
 */

module.exports = function(grunt) {
 	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),
 		path: {
 			base: './',
 			sources: 'sources/',
 			assets: 'dist/assets/',
 			css: {
 				source: '<%= path.sources %>css/',
 				dist: '<%= path.assets %>css/'
 			},
 			js: {
 				source: '<%= path.sources %>js/',
 				dist: '<%= path.assets %>js/'
 			},
 			html: {
 				source: '<%= path.sources %>html/',
 				dist: 'dist/html/'
 			}
 		},
 		banner: '/*!\n' +
 		' * <%= pkg.name %> (<%= pkg.homepage %>)\n' +
 		' * (c) <%= grunt.template.today("yyyy") %> <%= pkg.description %>\n' +
 		' */\n\n',

 		less: {
 			options: {
 				strictImports: true,
 				ieCompat: true,
 				cleancss: false,
 			},
 			dist: {
 				files: {
 					'<%= path.css.source %>compiled.min.css' : '<%= path.css.source %>styles.less'
 				}
 			}
 		},

 		autoprefixer: {
 			options: {
 				browsers: ['last 30 versions', 'bb 10', 'android 3', 'ie 8', 'ie 9']
 			},
 			dist: {
 				src: '<%= path.css.source %>compiled.min.css',
 				dest: '<%= path.css.source %>compiled.min.css'
 			},
 		},

 		uglify: {
 			options: {
 				mangle: false,
 				preserveComments: 'some'
 			},
 			dist: {
 				files: {
 					'<%= path.js.source %>compiled.min.js': [
   					'<%= path.js.source %>scripts.js',
 					]
 				}
 			}
 		},

 		concat : {
 			css: {
 				files: {
 					'<%= path.css.dist %>styles.min.css': [
 					  '<%= path.css.source %>compiled.min.css'
 					]
 				}
 			},
 			js: {
 				files: {
 					'<%= path.js.dist %>scripts.min.js': [
   					'<%= path.js.source %>compiled.min.js'
 					]
 				}
 			}
 		},

 		usebanner: {
 			options: {
 				banner: '<%= banner %>'
 			},
 			css: {
 				files: {
 					src: [ '<%= path.css.dist %>styles.min.css' ]
 				}
 			},
 			js: {
 				files: {
 					src: [ '<%= path.js.dist %>scripts.min.js' ]
 				}
 			}
 		},

 		jekyll: {
 			build: {
 				options: {
 					config: '<%= path.base %>_config.yml',
 					src: '<%= path.html.source %>',
 					dest: '<%= path.html.dist %>'
 				}
 			}
 		},

 		watch: {
 			options: { livereload: true },
 			css: {
 				files: ['<%= path.css.source %>**/*.less'],
 				tasks: ['css']
 			},
 			js: {
 				files: ['<%= path.js.source %>**/*.js',
 				'! <%= path.js.source %>compiled.min.js'
 				],
 				tasks: ['js']
 			},
 			html: {
 				files: ['<%= path.html.source %>**/*.*'],
 				tasks: ['html']
 			}
 		}
 	});

	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// grunt.registerTask('html', ['jekyll', 'bootlint']);
	grunt.registerTask('html', ['jekyll']);
	grunt.registerTask('css', ['less', 'autoprefixer', 'concat:css', 'usebanner:css']);
	grunt.registerTask('js', ['uglify:dist', 'concat:js', 'usebanner:js']);
	grunt.registerTask('default', ['html', 'css', 'js']);
};
