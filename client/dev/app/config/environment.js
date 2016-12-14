'use strict';

var taggerEnvironment = angular.module('taggerEnvironment', []);

(function() {

  /**
   * Returns settings for the application environment.
   */
  taggerEnvironment.factory('config', function() {

    return {
      // include protocol and trailing forward slash
      restHost: 'http://localhost:3000/rest/'

    };

  });

})();
