/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
          left: false,
          right: true
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

      return {
        toast: _toast
      };

    }]);

})();
