;(function (ng) {
  'use strict';

  ng.module('tagger')
    .config([
      '$routeProvider',
      function ($routeProvider) {

        $routeProvider
          .when('/tagger/:name', {
            templateUrl: function (params) {
              return '/tagger/partials/' + params.name;
            }
          })
          .when('/tagger', {
            templateUrl: '/tagger/partials/overview',
            reloadOnSearch: false
          });

      }
    ]);

}(window.angular));
