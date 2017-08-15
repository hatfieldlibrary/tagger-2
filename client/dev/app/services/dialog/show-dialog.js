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
