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
 * Created by mspalti on 12/14/16.
 */
(function () {

  'use strict';

  function AreasController(UserAreaObserver,
                           AreaObserver,
                           AreaListObserver,
                           AreaLabelObserver,
                           AreaList) {

    const vm = this;

    /**
     * Watches for update to the user's area. The value is obtained in the Passport
     * OAUTH login procedure and is used here to initialize state.
     */
    UserAreaObserver.subscribe(function onNext() {

      vm.userAreaId = UserAreaObserver.get();

      if (vm.userAreaId === 0) {
        var areas = AreaList.query();
        areas.$promise.then(function (data) {
          if (data.length > 0) {
            AreaListObserver.set(data);
          }
        });
      }
      else {
        AreaObserver.set(vm.userAreaId);
      }
    });

    AreaListObserver.subscribe(function onNext() {
      const areas = AreaListObserver.get();
      if (areas.length > 0) {
        vm.areas = areas;
        if (UserAreaObserver.get() === 0) {
          vm.currentAreaId = areas[0].id;
          AreaObserver.set(vm.currentAreaId);
        }
      }

    });

    /**
     * Update the current area.
     * @param id the area id
     * @param index the position of the area in the
     *          current area array
     */
    vm.updateArea = function (id, index) {

      if (UserAreaObserver.get() === 0) { // admin user
        AreaObserver.set(id);
        vm.currentAreaId = id;
        const areas = AreaListObserver.get();
        AreaLabelObserver.set(areas[index].title);
      }
    };

  }

  taggerComponents.component('adminAreaSelector', {

    template:
    '<div ng-if="vm.userAreaId === 0">' +
    '<md-input-container class="md-no-float">' +
    '<md-select ng-model="vm.areas" placeholder="Select Area">' +
    '<md-option ng-value="area.title" ng-selected="vm.currentAreaId == area.id" ng-click="vm.updateArea(area.id, $index)" ng-repeat="area in vm.areas track by area.id">{{ area.title }}</md-option>' +
    '</md-select>' +
    '</md-input-container>' +
    '</div>',
    controller: AreasController,
    controllerAs: 'vm'
  });

})();
