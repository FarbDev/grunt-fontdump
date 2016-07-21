"use strict";

const grunt = require("grunt");

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

        const actual = grunt.file.read("tmp/fonts/fonts.css");
        const expected = grunt.file.read("test/expected/fonts.css");
        const files_exist =
            grunt.file.exists("tmp/fonts/sourcesans pro_400_italic_default.ttf") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_italic_default.woff") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal_default.eot") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal_default.svg") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal_default.ttf") &&
            grunt.file.exists("tmp/fonts/sourcesans pro_400_normal_default.woff");

        test.equal(actual, expected, "css file has invalid content");
        test.ok(files_exist, "missing font files");

        test.done();
    }
};
