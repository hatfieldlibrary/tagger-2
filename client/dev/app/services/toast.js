/**
 * Created by mspalti on 1/11/17.
 */


(function() {

  'use strict';

  /**
   * Using the Angular Material mdToast
   * directive. This toast service accepts a single
   * parameter containing the toast message.
   */
  taggerServices.factory('TaggerToast', ['$mdToast',

    function ($mdToast) {
      /**
       * The factory returns the Toast object literal
       * that takes a message parameter.
       * @param content  the message to show in the toast.
       */
      function _toast(content) {

        const toastPosition = {
          bottom: false,
          top: true,
          left: true,
          right: false
        };

        const getToastPosition = function () {
          return Object.keys(toastPosition)
            .filter(function (pos) {
              return toastPosition[pos];
            })
            .join(' ');
        };

        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position(getToastPosition())
            .hideDelay(3000)
        );

      }

      return _toast;

    }]);

})();
