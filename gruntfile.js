/*jslint node:true*/
/*global GLOBAL*/

module.exports = function (grunt) {
    'use strict';

    // config
    GLOBAL.config = grunt.file.readJSON('./config.json');

    // setup
    grunt.initConfig({
        config: GLOBAL.config,

        // build the templates
        assemble: {
            options: {
                data: '<%= config.src %><%= config.data %>*.{json,yml}',
                layoutdir: '<%= config.src %><%= config.views %>templates/',
                layout: 'base.hbs',
                helpers: '<%= config.src %><%= config.views %>helpers/*.js',
                partials: '<%= config.src %><%= config.views %>partials/**/*.hbs'
            },

            dev: {
                options: {
                    dev: true,
                    prod: false
                },

                expand: true,
                cwd: '<%= config.src %><%= config.views %>',
                src: '*.hbs',
                dest: '<%= config.dist %>'
            },

            prod: {
                options: {
                    dev: false,
                    prod: true
                },

                expand: true,
                cwd: '<%= config.src %><%= config.views %>',
                src: '*.hbs',
                dest: '<%= config.dist %>'
            }
        },

        // create server
        connect: {
            server: {
                options: {
                    port: '<%= config.ports.server %>',
                    base: '<%= config.dist %>',
                    keepalive: false
                }
            }
        },

        // stylesheets
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },

                files: [{
                    expand: true,
                    cwd: '<%= config.src %><%= config.styles %>',
                    src: '*.{scss,sass}',
                    dest: '<%= config.dist %><%= config.styles %>',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: '<%= config.src %><%= config.modules %>',
                    src: '**/*.{scss,sass}',
                    dest: '<%= config.dist %><%= config.modules %>',
                    ext: '.css'
                }]
            },

            prod: {
                options: {
                    style: 'compressed'
                },

                files: [{
                    expand: true,
                    cwd: '<%= config.src %><%= config.styles %>',
                    src: '*.{scss,sass}',
                    dest: '<%= config.dist %><%= config.styles %>',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: '<%= config.src %><%= config.modules %>',
                    src: '**/*.{scss,sass}',
                    dest: '<%= config.dist %><%= config.modules %>',
                    ext: '.css'
                }]
            }
        },

        // adds vendor-prefix for the generated CSS
        autoprefixer: {
            all: {
                expand: true,
                cwd: '<%= config.dist %><%= config.styles %>',
                src: '*.css',
                dest: '<%= config.dist %><%= config.styles %>'
            },
        },

        // lint js files
        jslint: {
            client: {
                src: ['<%= config.src %><%= config.scripts %>/**/*.js', '!' + '<%= config.src %><%= config.scripts %>/vendor/**']
            }
        },

        // clean '<%= config.dist %>' folder
        clean: {
            all: '<%= config.dist %>',
            styles: '<%= config.dist %><%= config.styles %>',
            scripts: '<%= config.dist %><%= config.scripts %>',
            views: '<%= config.dist %>*.html',
            images: '<%= config.dist %><%= config.images %>',
            config: '<%= config.src %><%= config.data %>config.json'
        },

        // copy files from src to dist
        copy: {
            config: {
                filter: 'isFile',
                src: 'config.json',
                dest: '<%= config.src %><%= config.data %>'
            },

            js: {
                expand: true,
                cwd: '<%= config.src %>',
                src: '<%= config.scripts %>/**/*.js',
                dest: '<%= config.dist %>'
            },

            server: {
                expand: true,
                cwd: '<%= config.src %>',
                src: '<%= config.server %>/**/*.*',
                dest: '<%= config.dist %>'
            },

            font: {
                expand: true,
                cwd: '<%= config.src %>',
                src: ['<%= config.fonts %>/*.{ttf,svg,woff,eot}', '!<%= config.fonts %>/*.dev.svg'],
                dest: '<%= config.dist %>'
            },

            image: {
                expand: true,
                cwd: '<%= config.src %>',
                src: '<%= config.images %>/**/*.gif',
                dest: '<%= config.dist %>'
            },

            modules: {
                expand: true,
                cwd: '<%= config.src %>',
                src: ['<%= config.modules %>/**', '!<%= config.modules %>/**/*.{sass,scss}'],
                dest: '<%= config.dist %>'
            },

            pdf: {
                expand: true,
                cwd: '<%= config.src %>',
                src: ['**/*.pdf'],
                dest: '<%= config.dist %>'
            }
        },

        // minify html output
        htmlmin: {
            options: {
                collapseWhitespace: true
            },

            all: {
                expand: true,
                cwd: '<%= config.dist %>',
                src: '**/*.html',
                dest: '<%= config.dist %>'
            }
        },

        // verify lowercase
        verifylowercase: {
            all: {
                src: ['<%= config.dist %>**']
            }
        },

        // minify images
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 0
                },

                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['*.{png}', '<%= config.images %>**/*.{jpg,png}', '!<%= config.images %>{sprites}/**/*.*'],
                    dest: '<%= config.dist %>'
                }]
            },

            content: {
                options: {
                    optimizationLevel: 0
                },

                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['<%= config.images %>evento/**'],
                    dest: '<%= config.src %>'
                }]
            },
        },

        // create sprites
        sprite: {
            footer: {
                src: '<%= config.src %><%= config.images %>sprites/footer/*.png',
                destImg: '<%= config.src %><%= config.images %>footer-sprite.png',
                imgPath: '../<%= config.images %>footer-sprite.png',
                destCSS: '<%= config.src %><%= config.styles %>sprites/footer.scss',
                cssFormat: 'css',
                engine: 'gm',
                cssOpts: {
                    cssClass: function (data) {
                        return '.main-footer .icon-' + data.name;
                    }
                }
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'sirius.hmnoc.net',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%= config.dist %>',
                dest: '/public_html/'
            }
        },

        // watch (livereload)
        watch: {
            options: {
                livereload: '<%= config.ports.watch %>'
            },

            assemble: {
                files: ['gruntfile.js', '<%= config.src %><%= config.views %>**/*.{hbs,js}', '<%= config.src %><%= config.data %>*.{json,yml}', '!<%= config.src %><%= config.data %>config.json'],
                tasks: ['views:dev']
            },

            sass: {
                files: ['<%= config.src %>/**/*.{sass,scss}'],
                tasks: ['styles:dev']
            },

            scripts: {
                files: ['<%= config.src %><%= config.scripts %>/**', '<%= config.src %><%= config.modules %>/**/*.js'],
                tasks: ['scripts']
            },

            images: {
                files: ['<%= config.src %><%= config.images %>/**/*.{gif,jpg,png}'],
                tasks: ['images:dev']
            }
        }
    });

    // modules
    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // grouped tasks
    grunt.registerTask('views:dev', ['clean:views', 'copy:config', 'assemble:dev', 'clean:config', 'htmlmin:all']);
    grunt.registerTask('views:prod', ['clean:views', 'copy:config', 'assemble:prod', 'clean:config', 'htmlmin:all']);
    grunt.registerTask('scripts', ['clean:scripts', 'jslint', 'copy']);
    grunt.registerTask('styles:dev', ['clean:styles', 'sass:dev']);
    grunt.registerTask('styles:prod', ['clean:styles', 'sass:prod']);
    grunt.registerTask('images:dev', ['clean:images', /*'sprite',*/ 'imagemin:all']);
    grunt.registerTask('images:prod', ['clean:images', /*'sprite',*/ 'imagemin:all']);

    // main tasks
    grunt.registerTask('prod', ['clean:all', 'scripts', 'styles:prod', 'views:prod', 'images:prod']);
    grunt.registerTask('dev', ['scripts', 'styles:dev', 'views:dev', 'images:dev', 'connect', 'watch']);
};
