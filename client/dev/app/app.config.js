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

;(function (ng) {
  'use strict';

  ng.module('tagger')
    .config([
      '$locationProvider',
      function ($locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

      }
    ])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        // configure the Angular Material theme
        $mdThemingProvider.theme('default')
          .primaryPalette('teal', {
            'default': '500', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
          })
          .accentPalette('amber');

      }]
    ).config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.fontSet('fa', 'fontawesome');
    $mdIconProvider.icon('md-clear', '/resources/icons/ic_clear_black_24px.svg', 24);
  }]);

}(window.angular));
