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
        'client/dev/bower_components/rxjs/dist/rx.lite.min.js',
        'client/dev/bower_components/rx-angular/dist/rx.angular.min.js',
        'client/dev/bower_components/angular-route/angular-route.min.js',
        'client/dev/bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
        'client/dev/bower_components/angular-animate/angular-animate.min.js',
        'client/dev/bower_components/angular-resource/angular-resource.min.js',
        'client/dev/bower_components/angular-aria/angular-aria.min.js',
        'client/dev/bower_components/angular-material/angular-material.min.js',
        'client/dev/bower_components/ng-file-upload/ng-file-upload.min.js',
        'client/dev/bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js',
        'client/dev/bower_components/d3/d3.min.js',
        'client/dev/bower_components/angular-messages/angular-messages.min.js',

        'client/dev/app/modules/components.js',
        'client/dev/app/modules/constants.js',
        'client/dev/app/modules/services.js',
        'client/dev/app/modules/components.js',
        'client/dev/app/common/constants.js',
        'client/dev/app/config/environment.js',
        'client/dev/app/services/resources/area.js',
        'client/dev/app/services/resources/collection.js',
        'client/dev/app/services/resources/collection-group.js',
        'client/dev/app/services/resources/content-type.js',
        'client/dev/app/services/resources/overview.js',
        'client/dev/app/services/resources/tag.js',
        'client/dev/app/services/resources/tag-area.js',
        'client/dev/app/services/resources/user.js',
        'client/dev/app/services/toast.js',
        'client/dev/app/services/dialog/area.js',
        'client/dev/app/services/dialog/collection.js',
        'client/dev/app/services/dialog/collection-group.js',
        'client/dev/app/services/dialog/content-type.js',
        'client/dev/app/services/dialog/image.js',
        'client/dev/app/services/dialog/show-dialog.js',
        'client/dev/app/services/dialog/tag.js',
        'client/dev/app/components/overview/main.js',
        'client/dev/app/components/overview/link-types-summary.js',
        'client/dev/app/components/overview/search-options-summary.js',
        'client/dev/app/components/overview/item-types-summary.js',
        'client/dev/app/components/overview/collection-access-summary.js',
        'client/dev/app/components/tags/tag-area-selector.js',
        'client/dev/app/components/tags/tags-list.js',
        'client/dev/app/components/tags/tags-form.js',
        'client/dev/app/components/tags/tag-area-button.js',
        'client/dev/app/components/tags/main.js',
        'client/dev/app/components/types/types-list.js',
        'client/dev/app/components/types/types-form.js',
        'client/dev/app/components/types/main.js',
        'client/dev/app/components/collection/types-selector.js',
        'client/dev/app/components/collection/tags-selector.js',
        'client/dev/app/components/collection/image-upload.js',
        'client/dev/app/components/collection/area-selector.js',
        'client/dev/app/components/collection/image-link.js',
        'client/dev/app/components/collection/collection-list.js',
        'client/dev/app/components/collection/collection-form.js',
        'client/dev/app/components/collection/publication-status.js',
        'client/dev/app/components/collection/main.js',
        'client/dev/app/components/groups/main.js',
        'client/dev/app/components/groups/groups-list.js',
        'client/dev/app/components/groups/group-form.js',
        'client/dev/app/components/areas/areas-list.js',
        'client/dev/app/components/areas/area-form.js',
        'client/dev/app/components/users/main.js',
        'client/dev/app/components/visualization/d3pie.js',
        'client/dev/app/components/visualization/d3bar.js',
        'client/dev/app/components/global/admin-area-selector.js',
        'client/dev/app/components/global/auth.js',
        'client/dev/app/components/global/side-navigation.js',
        'client/dev/app/observables/current-area.js',
        'client/dev/app/observables/areas.js',
        'client/dev/app/observables/action-area.js',
        'client/dev/app/observables/publication-status.js',
        'client/dev/app/observables/current-area.js',
        'client/dev/app/observables/groups.js',
        'client/dev/app/observables/current-group.js',
        'client/dev/app/observables/collections.js',
        'client/dev/app/observables/current-collection.js',
        'client/dev/app/observables/collection-area-update.js',
        'client/dev/app/observables/tags-for-collection.js',
        'client/dev/app/observables/types-for-collection.js',
        'client/dev/app/observables/current-area-label.js',
        'client/dev/app/observables/tags.js',
        'client/dev/app/observables/tags-for-collection.js',
        'client/dev/app/observables/tags-for-area.js',
        'client/dev/app/observables/current-tag.js',
        'client/dev/app/observables/content-types.js',
        'client/dev/app/observables/current-content-type.js',
        'client/dev/app/observables/is-auth.js',
        'client/dev/app/observables/user-info.js',
        'client/dev/app/observables/user-area-id.js',
        'client/dev/app/observables/groups-for-area.js',
        'client/dev/app/observables/thumb-image.js',
        'client/dev/app/observables/total-search-options.js',
        'client/dev/app/observables/total-collection-links.js',
        'client/dev/app/observables/total-collection-types.js',
        'client/dev/app/observables/total-collections.js',
        'client/dev/app/observables/tag-area-observer.js',
        'client/dev/app/app.js',
        'client/dev/app/app.config.js',
        'client/dev/app/app.route.js',

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
      moduleName: 'templates'
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
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'FirefoxNightly', 'ChromeCanary', 'IE', 'Safari', 'PhantomJS'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    captureTimeout: 120000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
