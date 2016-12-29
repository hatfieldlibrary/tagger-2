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

  function GroupController(ReorderAreas,
                           TaggerToast,
                           TaggerDialog,
                           AreaListObserver,
                           UserAreaObserver) {

    var vm = this;

    /** @type {Array.<Object>} */
    vm.areas = AreaListObserver.get();

    /** @type {Object} */
    vm.area = vm.areas[0];

    vm.currentArea = {};

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addAreaMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteAreaMessage.html';

    /** @type {number */
    vm.currentAreaId = UserAreaObserver.get();
    /**
     * Watch for new areas in context.  Areas are added
     * and removed in a dialog controller.  They can also
     * be reordered by the view model (see above).
     */
    AreaListObserver.subscribe(function onNext() {
      vm.areas = AreaListObserver.get();

    });

    vm.menuUpdate = function(id, title) {
      vm.currentArea.title = title;
      vm.currentArea.id = id;
    };

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html to display in dialog
     */
    vm.showDialog = function ($event, message) {
      new TaggerDialog($event, message);
    };

    /**
     * Updates the view model's areas array
     * @param index
     */
    vm.orderAreaList = function (index) {
      vm.areas.splice(index, 1);
      // now update the database
      updatePositionsInDb();

    };

    /**
     * Updates the area position attribute for
     * all areas after they have been reordered
     * in the UI.  The new position attribute is
     * based on the new index positions in the areas
     * array. The promise callback function updates
     * the shared Data.areas array so the new order
     * is available to components.
     */
    function updatePositionsInDb() {
      var order = ReorderAreas.save(
        {
          areas: vm.areas
        });
      order.$promise.then(function (data) {
        if (data.status === 'success') {
          _initAreaList();
          new TaggerToast('Area order updated.');
        }
      });
    }

  }

  taggerComponents.component('areasComponent', {

    templateUrl: 'templates/component/areas.html',
    controller: GroupController,
    controllerAs: 'vm'

  });

})();
