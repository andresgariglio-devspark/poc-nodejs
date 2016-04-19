/**
 * Created by Pablo on 2/4/2016.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.registerTask('default', ['execute:target']);

};
