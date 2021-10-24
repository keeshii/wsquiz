module.exports = function (grunt) {
    'use strict';

    var config = {
        APP: 'wsquiz',
        MODULE: 'wq',
        PATH: 'public',
        BOWER_PATH: 'bower_components',
        PACKAGE: grunt.file.readJSON('package.json')
    };

    grunt.initConfig({
        config: config,
        html2js: {
            options: {
                htmlmin: {
                    collapseWhitespace: true,
                    removeComments: true
                },
                base: '<%= config.PATH %>/',
                module: '<%= config.MODULE %>.templates'
            },
            main: {
                src: ['<%= config.PATH %>/src/**/*.html'],
                dest: '<%= config.PATH %>/assets/templates.temp.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: {},
                beautify: false
            },
            build: {
                files: {
                    '<%= config.PATH %>/assets/<%= config.APP %>.min.js': [
                        '<%= config.PATH %>/assets/*.temp.js',
                        '<%= config.PATH %>/src/**/*.config.js',
                        '<%= config.PATH %>/src/**/*.js',
                        '!<%= config.PATH %>/src/app.js'
                    ]
                }
            }
        },
        less: {
            app: {
                options: {
                    paths: ['assets/css'],
                    cleancss: true
                },
                files: {
                    '<%= config.PATH %>/assets/<%= config.APP %>.min.css': '<%= config.PATH %>/less/app.less'
                }
            }
        },
        replace: {
            app: {
                src: ['<%= config.PATH %>/src/app.js'],
                dest: '<%= config.PATH %>/assets/app.temp.js',
                replacements: [{
                        from: '\'<%= config.MODULE %>.common\',',
                        to: '\'<%= config.MODULE %>.common\',\'<%= config.MODULE %>.templates\','
                    }]
            }
        },
        injector: {
            options: {
                ignorePath: '<%= config.PATH %>',
                addRootSlash: false,
                transform: function (filename, index, count) {
                    var extension = filename.split('.').pop().toLowerCase();
                    switch (extension) {
                        case 'css':
                            return '<link rel="stylesheet" href="' + filename + '">';
                        case 'js':
                            return '<script src="' + filename + '" type="text/javascript"></script>';
                        case 'html':
                            return '<link rel="import" src="' + filename + '">';
                    }
                }
            },
            debug: {
                files: {
                    '<%= config.PATH %>/index.html': [
                        '<%= config.PATH %>/lib/**/angular.min.js',
                        '<%= config.PATH %>/lib/**/angular-translate.min.js',
                        '<%= config.PATH %>/lib/**/*.js',
                        '<%= config.PATH %>/src/app.js',
                        '<%= config.PATH %>/src/**/*.config.js',
                        '<%= config.PATH %>/src/**/*.provider.js',
                        '<%= config.PATH %>/src/**/*.interceptor.js',
                        '<%= config.PATH %>/src/**/*.constants.js',
                        '<%= config.PATH %>/src/**/*.factory.js',
                        '<%= config.PATH %>/src/**/*.service.js',
                        '<%= config.PATH %>/src/**/*.directive.js',
                        '<%= config.PATH %>/src/**/*.controller.js',
                        '<%= config.PATH %>/src/**/*.js',
                        '<%= config.PATH %>/lib/**/*.css',
                        '<%= config.PATH %>/assets/*.css'
                    ]
                }
            },
            production: {
                files: {
                    '<%= config.PATH %>/index.html': [
                        '<%= config.PATH %>/lib/**/angular.min.js',
                        '<%= config.PATH %>/lib/**/angular-translate.min.js',
                        '<%= config.PATH %>/lib/**/*.js',
                        '<%= config.PATH %>/assets/*.js',
                        '<%= config.PATH %>/lib/**/*.css',
                        '<%= config.PATH %>/assets/*.css'
                    ]
                }
            }
        },
        clean: {
            clean: [
                '<%= config.PATH %>/assets',
                '<%= config.PATH %>/lib'
            ],
            post_dist: [
                '<%= config.PATH %>/assets/*.temp.js',
                '<%= config.PATH %>/assets/*.temp.css'
            ]
        },
        jslint: {
            public: {
                src: [
                    '<%= config.PATH %>/src/**/*.js'
                ],
                directives: {
                    indent: 4,
                    plusplus: true,
                    unparam: true,
                    todo: true,
                    globals: [
                        'angular'
                    ]
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    errorsOnly: true, // only display errors
                    failOnError: true // defaults to true
                }
            },
            server: {
                src: [
                    './server/**/*.js'
                ],
                directives: {
                    indent: 4,
                    plusplus: true,
                    unparam: true,
                    todo: true,
                    node: true
                },
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    errorsOnly: true, // only display errors
                    failOnError: true // defaults to true
                }
            }
        },
        htmlhint: {
            options: {
                'attr-name-style': 'dash',
                /* 'id-class-value': 'dash', */
                'indent-style': 'spaces',
                'indent-num-spaces': 4,
                'tag-name-lowercase': true,
                'doctype-html5': true,
                'attr-no-duplication': true,
                'attr-value-quotes': 'double',
                'attr-value-not-empty': false,
                'id-unique': true,
                'id-class-ad-disab<%= config.APP %>': true,
                'alt-require': true,
                'href-type': 'relative',
                'disable-inline-style': true
            },
            src: ['<%= config.PATH %>/src/**/*.html', '<%= config.PATH %>/index.html']
        },
        lintspaces: {
            src: ['<%= config.PATH %>/src/**/*.html', '<%= config.PATH %>/less/**/*.less'],
            options: {
                newline: true,
                //newlineMaximum: 2,
                trailingspaces: true,
                indentation: 'spaces',
                spaces: 4
            }
        },
        lesslint: {
            src: ['<%= config.PATH %>/less/app.less'],
            options: {
                imports: ['<%= config.PATH %>/less/**/!(app).less'],
                csslint: {
                    'adjoining-classes': false,
                    'box-sizing': false,
                    'box-model': false,
                    'fallback-colors': false,
                    'gradients': false,
                    'universal-selector': false,
                    'font-sizes': false
                }
            }
        },
        copy: {
            libs: {
                expand: true,
                rename: function (dest, src) {
                    return dest + src.replace(/\.js\//g, '_js\/');
                },
                cwd: '<%= config.BOWER_PATH %>',
                dest: '<%= config.PATH %>/lib/',
                src: [
                    'angular/angular.min.js',
                    'angular/angular.min.js.map',
                    'angular-animate/angular-animate.min.js',
                    'angular-animate/angular-animate.min.js.map',
                    'angular-cookies/angular-cookies.min.js',
                    'angular-cookies/angular-cookies.min.js.map',
                    'angular-sanitize/angular-sanitize.min.js',
                    'angular-sanitize/angular-sanitize.min.js.map',
                    'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'angular-socket-io/socket.min.js',
                    'angular-socket-io/socket.min.js.map',
                    'angular-ui-router/release/angular-ui-router.min.js',
                    'angular-ui-router/release/angular-ui-router.min.js.map',
                    'angular-translate/angular-translate.min.js',
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
                    'angular-translate-handler-log/angular-translate-handler-log.min.js',
                    'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap/dist/css/bootstrap.min.css.map',
                    'bootstrap/dist/fonts/*',
                    'socket.io-client/dist/socket.io.js',
                    'socket.io-client/dist/socket.io.js.map'
                ]
            }
        },
        i18nextract: {
            default_options: {
                src: [
                    '<%= config.PATH %>/index.html',
                    '<%= config.PATH %>/src/**/*.js',
                    '<%= config.PATH %>/src/**/*.html'
                ],
                lang: ['en_US', 'pl_PL'],
                stringifyOptions: true,
                dest: '<%= config.PATH %>/languages',
                keyAsText: true,
                customRegex: [
                    '\\(' + '\\s*\'((?:\\\\.|[^\'\\\\])*)\'\\s*\\|\\s*translate(:.*?)?\\s*' + '\\)',
                    '\\(' + '\\s*"((?:\\\\.|[^"\\\\\])*)"\\s*\\|\\s*translate(:.*?)?\\s*' + '\\)'
                ]
            }
        },
        watch: {
            less: {
                files: ['<%= config.PATH %>/less/**/*.less'],
                tasks: ['less:app'],
                options: {
                    spawn: false
                }
            }
        },
        concat: {
            debug: {
                options: {
                    nonull: true,
                    process: function (src, filepath) {
                        return '// Source file: ' + filepath + '\n' + src;
                    }
                },
                files: {
                    '<%= config.PATH %>/assets/<%= config.APP %>.js': [
                        '<%= config.PATH %>/src/app.js',
                        '<%= config.PATH %>/src/**/*.config.js',
                        '<%= config.PATH %>/src/**/*.js'
                    ]
                }
            }
        },
        zip: {
            release: {
                router: function (filepath) {
                    if (filepath.match(/^public\/(src|less)\//)) {
                        return null;
                    }
                    return 'wsquiz-' + config.PACKAGE.version + '/' + filepath;
                },
                src: [
                    'public/**/**',
                    'server/**/**',
                    'Gruntfile.js',
                    'bower.json',
                    'package.json',
                    'start.js'
                ],
                dest: 'releases/wsquiz-<%= config.PACKAGE.version %>.zip'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-lintspaces');
    grunt.loadNpmTasks('grunt-lesslint');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('default', ['jslint', 'htmlhint', 'lintspaces', 'clean:clean', 'less', 'copy:libs', 'html2js', 'replace', 'uglify', 'clean:post_dist', 'injector:production']);
    grunt.registerTask('release', ['default', 'zip']);
    grunt.registerTask('debug', ['jslint', 'htmlhint', 'lintspaces', 'clean:clean', 'less', 'copy:libs', 'injector:debug']);
};
