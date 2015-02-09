/*
 * grunt-fontdump
 * https://github.com/FarbDev/grunt-fontdump
 *
 * Copyright (c) 2015 Konrad Mohrfeldt
 * Licensed under the ISC license.
 */

"use strict";

module.exports = function(grunt) {
    var fontdump = require("node-fontdump");
    var winston = require("winston");
    var util = require("util");
    var path = require("path");
    var Promise = require("es6-promise").Promise;

    var GruntLog = winston.transports.Grunt = function(options) {
        options = options || {};
        options.debug = options.debug || false;

        this.name = "grunt";
        this.level = options.level || "info";
    };

    util.inherits(GruntLog, winston.Transport);

    GruntLog.prototype.log = function(level, msg, meta, callback) {
        var message = JSON.parse(msg).uuid;

        switch(level) {
            case "fatal":
            case "error":
            case "warn":
                grunt.log.error(message);
                break;
            case "info":
            case "debug":
                grunt.log.debug(message);
                break;
        }

        callback(null, true);
        this.emit("logged");
    };

    fontdump.log.add(GruntLog);

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask("fontdump", "grunt task for node-fontdump", function() {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            web_directory: ""
        });

        // Iterate over all specified file groups.
        var dumper = Promise.all(this.files.map(function(f) {
            var src = f.orig.src[0];
            var dest = f.dest;
            var target_directory = path.dirname(dest);
            var css_file = path.basename(dest);

            grunt.file.mkdir(target_directory);

            var dump = fontdump.fontdump.dump({
                url: src,
                target_directory: target_directory,
                web_directory: options.web_directory,
                css_file: css_file
            });

            dump.then(function(dump) {
                var families = Object.keys(dump.fonts.families).join(", ");
                grunt.log.writeln(
                    "File \"" + dest + "\" created with " + families + "."
                );
            });

            return dump;
        }));

        dumper.then(done);
    });

};
