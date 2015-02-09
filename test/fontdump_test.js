"use strict";

var grunt = require("grunt");

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.fontdump = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default_options: function(test) {
        test.expect(2);

        var actual = grunt.file.read("tmp/fonts/fonts.css");
        var expected = grunt.file.read("test/expected/fonts.css");
        var files_exist =
            grunt.file.exists("tmp/fonts/sourcesans pro_400_italic.ttf") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_italic.woff") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal.eot") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal.svg") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal.ttf") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal.woff");

        test.equal(actual, expected, "css file has invalid content");
        test.ok(files_exist, "missing font files");

        test.done();
    }
};
