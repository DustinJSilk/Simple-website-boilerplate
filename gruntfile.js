module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'src/scss/base.scss'
                }
            }
        },

        typescript: {
            base: {
                src: ['src/ts/**/*.ts'],
                dest: 'build/js/main.js',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5', //or es3 
                    keepDirectoryHierachy: true,
                    sourceMap: true,
                    declaration: true
                }
            }
        },

        copy: {
            images: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['path/images/**/*.*'], dest: 'build/images/'},
                ]
            }
        },

        watch: {
            scss: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                },
            },
            ts: {
                files: ['src/ts/**/*.ts'],
                tasks: ['typescript'],
                options: {
                    spawn: false,
                },
            },
            copyImages: {
                files: ['src/images/**'],
                tasks: ['copy.images'],
                options: {
                    spawn: false,
                },
            }
        },

        pure_grids: {
            responsive: {
                dest: 'src/scss/_pure-grid.scss',
                options: {
                    units: 24,
                    mediaQueries: {
                        sm: 'screen and (min-width: 35.5em)', // 568px 
                        md: 'screen and (min-width: 48em)',   // 768px 
                        lg: 'screen and (min-width: 64em)',   // 1024px 
                        xl: 'screen and (min-width: 80em)',    // 1280px 
                        xxl: 'screen and (min-width: 90em)'    // 1440px 
                        //xxxl: 'screen and (min-width: 120em)'    // 1920px 
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-pure-grids');

    grunt.registerTask('default', ['sass', 'typescript', 'copy', 'watch']);
    grunt.registerTask('pure', ['pure_grids']);
}