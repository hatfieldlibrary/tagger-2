/*
 * Copyright (c) 2016.
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
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function AreasController(DialogStrategy,
                           AreaListObserver,
                           UserAreaObserver) {

    var vm = this;

    vm.currentArea = {};

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addAreaMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteAreaMessage.html';

    /** @type {number */
    vm.currentAreaId = UserAreaObserver.get();

    /**
     * Updates the title and id in view.
     * @param id  area id
     * @param title   area title
     */
    vm.menuUpdate = (id, title) => {
      vm.currentArea.title = title;
      vm.currentArea.id = id;
    };

    vm.$onInit = () => {

      /**
       * Watch for new areas in context.  Areas are added
       * and removed in a dialog controller.  They can also
       * be reordered by the view model (see above).
       */
      AreaListObserver.subscribe((areas) => {
        vm.areas = areas;

      });
      /** @type {Array.<Object>} */
      vm.areas = AreaListObserver.get();

      /**
       * Get the dialog object for this controller.
       * Call with showDialog($event,message).
       * @type {*}
       */
      vm.dialog =  DialogStrategy.makeDialog(vm);
    }

  }

  taggerComponents.component('areasComponent', {

    templateUrl: 'templates/component/areas.html',
    controller: AreasController,
    controllerAs: 'vm'

  });

})();
