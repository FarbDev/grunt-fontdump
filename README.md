# grunt-fontdump

> grunt task for node-fontdump

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you’re familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fontdump --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-fontdump");
```

## The "fontdump" task

### Overview
In your project’s Gruntfile, add a section named `fontdump` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fontdump: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.web_directory
Type: `String`
Default value: `""`

A path that is prepended to the font file names.

### Usage Examples

#### Default Options
In this example, the font family `Source Sans Pro` is downloaded from Google with two styles (normal and italic style and 400 weight). The css file is written to `fonts/source_sans_pro/fonts.css` and all font files are saved to `fonts/source_sans_pro/`.

```js
grunt.initConfig({
  fontdump: {
    source_sans_pro: {
      files: {
        "fonts/source_sans_pro/fonts.css": "http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic"
      },
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
