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

  function AreasController(TaggerDialog,
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

    /**
     * Updates the title and id in view.
     * @param id  area id
     * @param title   area title
     */
    vm.menuUpdate = function (id, title) {
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

  }

  taggerComponents.component('areasComponent', {

    templateUrl: 'templates/component/areas.html',
    controller: AreasController,
    controllerAs: 'vm'

  });

})();
