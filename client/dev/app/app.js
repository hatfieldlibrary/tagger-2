;(function (ng) {
  'use strict';

   ng.module('tagger', [

    'ngMaterial',
    'ngRoute',
    'ngFileUpload',
    'dndLists',
     'rx',
    'taggerContext',
    'taggerEnvironment',
    'taggerControllers',
    'taggerServices',
    'taggerDirectives'

  ]);

  /**
   * Bootstrap Angular.
   */
  ng.element(document).ready(function () {
    try {
      ng.bootstrap(document, ['tagger']);
    } catch (e) {
      console.log(e);
    }
  });

}(window.angular));
