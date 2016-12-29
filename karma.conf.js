/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files:
      [
        'client/dev/bower_components/jquery/dist/jquery.min.js',
        'client/dev/bower_components/angular/angular.min.js',
        'client/dev/bower_components/angular-resource/angular-resource.min.js',
        'client/dev/bower_components/angular-route/angular-route.min.js',
        'client/dev/bower_components/angular-messages/angular-messages.min.js',

        'client/dev/app.js',
        'client/dev/app.config.js',
        'client/dev/app.route.js',
        'client/dev/!(bower_components)/**/*.js',

        'client/dev/bower_components/angular-mocks/angular-mocks.js',

        'tests/client/**/*_test.js',

        'client/dev/**/*.html' // for templateUrl testing
      ],

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors:
    {
      'client/dev/!(bower_components)/**/*.js': ['coverage'],
      'client/dev/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor:
    {
      stripPrefix: 'client/dev/',
      moduleName: 'my.includes'
    },

    coverageReporter:
    {
      type : 'lcov',
      dir : 'unit_coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'FirefoxNightly', 'ChromeCanary', 'IE', 'Safari', 'PhantomJS'],

    captureTimeout: 120000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
