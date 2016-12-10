;(function (ng) {
  'use strict';

  ng.module('tagger')
    .config([
      '$routeProvider',
      function ($routeProvider) {

        $routeProvider
          .when('/tagger/:name', {
            templateUrl: function (params) {
              return '/tagger/' + params.name ;
            }
          })
          .when('/tagger/', {
            templateUrl: '/tagger/overview',
            reloadOnSearch: false
          });

      }
    ]);

}(window.angular));
