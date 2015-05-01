module.exports = function(grunt) {

    // Project configuration.
    var bower = grunt.file.readJSON('bower.json');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            test:{
                files: ['js/**/*.js', 'tests/**/*Spec.js'],
                tasks: ['depconcat', 'jasmine:test']
            },
            components: {
                files: ['js/**/*.js', 'components/**/*.*'],
                tasks: ['build']
            }
        },
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> version: <%= pkg.version %> */\n'
            },
            build: {
                src: '.temp/concat.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                evil: true,
                globals: {
                    jQuery: true
                }
            },
            all: ['js/**/*.js']
        },
        jasmine: {
            test: {
                src: ['.temp/concat.js', 'templates/templates.js'],
                options: {
                    specs: 'tests/*Spec.js',
                    vendor: bower.dependenciesFiles
                }
            }
        },

        depconcat: {
            components: {
                src: ['components/**/*.js'],
                dest: 'templates/components.js'
            }
        },

        htmlConvert: {
            options: {
                base: 'components/',
                rename: function (moduleName) {
                    var name = moduleName.substr(0, moduleName.lastIndexOf('/'))
                    return name;
                }
            },
            templates: {
                src: ['components/**/*.html'],
                dest: 'templates/templates.js'
            }
        },

        concat: {
            dist: {
                files: {
                    'templates/components.scss' : 'components/**/*.scss'
                }
            }
        },

        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files : {
                    'templates/components.css' : 'templates/components.scss'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-dep-concat');
    grunt.loadNpmTasks('grunt-html-convert');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.task.registerTask('jasmintest', 'A sample task that run one test', function(testname) {
        if(arguments.length !== 0) {
            grunt.config('jasmine.test.options.specs', 'tests/'+testname+'Spec.js');
        }
        grunt.task.run('jasmine:test');
    });

    grunt.task.registerTask('watchTest', 'A sample task that run one test', function(testname) {
        if(arguments.length !== 0) {
            grunt.config('watch.test.tasks', ['depconcat', 'jasmintest:'+testname]);
        }
        grunt.task.run('depconcat');
        grunt.task.run('jshint');
        grunt.task.run('watch');
    });

    grunt.registerTask('build', ['htmlConvert', 'concat', 'sass', 'depconcat']);

};