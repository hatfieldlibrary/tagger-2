/**
 * Created by mspalti on 1/11/17.
 */

/**
 * The show dialog service.  This service is augmented via
 * composition to obtain the component-specific controller.
 */
(function () {

  'use strict';

  taggerServices.factory('ShowDialog',

    function ($mdDialog) {

      /**
       * The show dialog function. The event param is used by
       *  $mdDialog to set the starting location of the animation.
       *
       * @param $event  the Angular event object
       * @param message  the template defining the dialog content
       */
      const _showDialog = function ($event, message) {

        let parentEl = angular.element(document.body);

        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          templateUrl: message,
          controller: this.controller,
          controllerAs: 'vm'
        });

      };

      return {
        showDialog: _showDialog
      };

    });

})();
