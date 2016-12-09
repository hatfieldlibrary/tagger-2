;(function (ng) {
  'use strict';

  ng.module('tagger')
    .config([
      '$routeProvider',
      function ($routeProvider) {

        $routeProvider
          .when('/admin/:name', {
            templateUrl: function (params) {
              return '/admin/partials/' + params.name + '.html';
            }
          }).when('/admin/', {
          templateUrl: '/admin/partials/overview.html',
          reloadOnSearch: false
        });

      }
    ]);

}(window.angular));
