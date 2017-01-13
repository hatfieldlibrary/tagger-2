/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.service('ShowDialog',

    function ($mdDialog) {
      /**
       * Returns a dialog using predefined options and
       * the provided message param. The event param is used by
       *  $mdDialog to set the starting location of the animation.
       *
       * @param $event  the Angular event object
       * @param message  the template defining the dialog content
       */
      const _showDialog = function ($event, message, controller) {

        let parentEl = angular.element(document.body);

        // Show a dialog with the specified options.
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          templateUrl: message,
          controller: controller,
          controllerAs: 'vm'
        });

      };

      const _hideDialog = function () {
        $mdDialog.hide();
      };

      return {
        showDialog: _showDialog,
        hideDialog: _hideDialog,
      }

    });

})();
