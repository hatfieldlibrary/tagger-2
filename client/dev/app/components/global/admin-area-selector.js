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
 * Created by mspalti on 12/14/16.
 */
(function () {

  'use strict';

  function AreasController(UserAreaObservable,
                           AreaObservable,
                           AreaListObservable,
                           AreaLabelObserver,
                           AreaList) {

    const vm = this;

    /**
     * Update the current area.
     * @param id the area id
     * @param index the position of the area in the
     *          current area array
     */
    vm.updateArea = function (id, index) {

      if (UserAreaObservable.get() === 0) { // admin user
        AreaObservable.set(id);
        vm.currentAreaId = id;
        const areas = AreaListObservable.get();
        AreaLabelObserver.set(areas[index].title);
      }
    };

    function _setAdminArea(areas)  {
      if (areas.length > 0) {
        if (UserAreaObservable.get() === 0) {
          vm.currentAreaId = areas[0].id;
          AreaObservable.set(vm.currentAreaId);
        }
      }
    }

    vm.$onInit = () => {

      /**
       * Watches for update to the user's area. The value is obtained in the Passport
       * OAUTH login procedure and is used here to initialize state.
       */
      UserAreaObservable.subscribe((id) => {

        vm.userAreaId = id;

        if (vm.userAreaId === 0) {
          let areas = AreaList.query();
          areas.$promise.then(function (data) {
            if (data.length > 0) {
              AreaListObservable.set(data);
              AreaLabelObserver.set(data[0].title);
              AreaObservable.set(data[0].id);
            }
          });
        }
        else {
          // TODO: This will not provide parent area information when creating a new collection. Lookup is needed.
          AreaObservable.set(vm.userAreaId);
        }
      });

      AreaListObservable.subscribe((list) => {
        vm.areas = list;
        _setAdminArea(list);

      });
    };

  }

  taggerComponents.component('adminAreaSelector', {

    template:
    '<div ng-if="vm.userAreaId === 0">' +
    '<md-input-container class="md-no-float">' +
    '<md-select ng-model="vm.currentAreaId" placeholder="Select Area">' +
    '<md-option ng-value="area.id" ng-selected="vm.currentAreaId == area.id" ng-click="vm.updateArea(area.id, $index)" ng-repeat="area in vm.areas track by $index">{{ area.title }}</md-option>' +
    '</md-select>' +
    '</md-input-container>' +
    '</div>',
    controller: AreasController,
    controllerAs: 'vm'
  });

})();
