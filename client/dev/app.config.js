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
  ).config(['$provide', function ($provide) {
      var customDecorator = function ($delegate) {
        var d3Service = $delegate;
        /*jshint unused: false*/
        d3Service.d3().then(function (d3) {
          // this space available for building custom functions
          // on the d3 object.
        });
        return d3Service;
      };

      $provide.decorator('d3Service', customDecorator);

    }]
  ).config(function($mdIconProvider) {
    $mdIconProvider.fontSet('fa', 'fontawesome');
  });

}(window.angular));
