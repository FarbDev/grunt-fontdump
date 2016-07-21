/*
 * grunt-fontdump
 * https://github.com/FarbDev/grunt-fontdump
 *
 * Copyright (c) 2016 Konrad Mohrfeldt
 * Licensed under the ISC license.
 */

"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Configuration to be run (and then tested).
        fontdump: {
            source_sans_pro: {
                files: {
                    "tmp/fonts/fonts.css": "http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic"
                }
            }
        },

        //Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        }

    });

    // Actually load this plugin"s task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin"s task(s), then test the result.
    grunt.registerTask("test", ["clean", "fontdump", "nodeunit"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);

};
