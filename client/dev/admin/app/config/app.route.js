;(function(ng) {
  'use strict';

  ng.module('tagger')([
    '$routeProvider',
    function ($routeProvider) {

      $routeProvider.
      when('/partials/:name', {
        templateUrl: function (params) {
          return '/admin/partials/' + params.name;
        }
      }).when('/', {
        templateUrl: '/admin/partials/overview',
        reloadOnSearch: false
      }).otherwise({
        templateUrl: '/admin/partials/overview'
      });


    }]
  )
}(window.angular));
