/*
 * grunt-fontdump
 * https://github.com/FarbDev/grunt-fontdump
 *
 * Copyright (c) 2016 Konrad Mohrfeldt
 * Licensed under the ISC license.
 */

"use strict";

var util = require("util");
var path = require("path");

require("es6-promise").polyfill();
var fontdump = require("node-fontdump");
var winston = fontdump.logger;

function create_logger(grunt) {
    var GruntLog = winston.transports.Grunt = function(options) {
        options = options || {};
        options.debug = options.debug || false;

        this.name = "grunt";
        this.level = options.level || "debug";
    };

    util.inherits(GruntLog, winston.Transport);

    GruntLog.prototype.log = function(level, message, meta, callback) {
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
    };

    return GruntLog;
}

module.exports = function(grunt) {
    // configure logger
    var GruntLog = create_logger(grunt);
    winston.remove(winston.transports.Console);
    winston.add(GruntLog);

    // configure task
    grunt.registerMultiTask("fontdump", "grunt task for node-fontdump", function() {
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            web_directory: ""
        });

        // Iterate over all specified file groups.
        Promise.all(this.files.map(function(f) {
            var src = f.orig.src[0];
            var dest = f.dest;
            var target_directory = path.dirname(dest);
            var css_file = path.basename(dest);

            grunt.file.mkdir(target_directory);

            return fontdump.dump({
                url: src,
                target_directory: target_directory,
                web_directory: options.web_directory,
                css_file: css_file
            }).then(function(dump) {
                var families = Object.keys(dump.fonts.families).join(", ");
                grunt.log.writeln(`File "${dest} created with ${families}.`);
            }).catch((err) => {
                grunt.log.error(err);
            });
        })).then(done);
    });
};
