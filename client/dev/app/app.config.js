;(function(ng) {
  'use strict';

  ng.module('tagger')
    .config([
      '$locationProvider',
      function($locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

      }
    ])
    .config(function ($mdThemingProvider) {
      // configure the Angular Material theme
      $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
          'default': '500', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        .accentPalette('amber');

    }
  ).config(function($mdIconProvider) {
    $mdIconProvider.fontSet('fa', 'fontawesome');
    $mdIconProvider.icon('md-clear', '/resources/icons/ic_clear_black_24px.svg', 24);
  });

}(window.angular));
