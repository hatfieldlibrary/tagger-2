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
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function ListController(TaggerToast,
                          AreaObservable,
                          AreaList,
                          AreaListObservable,
                          AreaActionObservable,
                          ReorderAreas,
                          $log) {

    let vm = this;

    /**
     * Sets the current area in view model.
     * @param id  area id
     */
    vm.resetArea = (id) => {
      if (id !== null) {
        vm.currentAreaId = id;
        AreaActionObservable.set(id);
      }

    };

    /**
     * Updates the view model's areas array.
     *
     * @param index
     */
    vm.orderAreaList = (index) => {
      /**
       * The api will update position values
       * based on the removed position.
       */
      vm.areas.splice(index, 1);
      _updatePositionsInDb();

    };


    /**
     * Set the component subscriptions.
     * @private
     */
    function _setSubscriptions() {
      /**
       * Subscribe to be notified of changes in the area list
       * while this component is active.
       */
      AreaListObservable.subscribe((areas) => {
        vm.areas = areas;
        try {
          /**
           *  With any changes while this component is active,
           *  set the current area to the first in the list and
           *  notify subscribers.
           */
          AreaObservable.set(vm.areas[0].id);
        } catch (err) {
          $log.debug(err);
          $log.info('Setting area to zero.');
          AreaObservable.set(0);
        }
      });
    }


    /**
     * Updates the area position attribute for
     * all areas after they have been reordered
     * in the UI.  The new position attribute is
     * based on the new index positions in the areas
     * array.
     */
    function _updatePositionsInDb() {
      let order = ReorderAreas.save(
        {
          areas: vm.areas
        });
      order.$promise.then(function (data) {
        if (data.status === 'success') {
          var areas = AreaList.query();
          areas.$promise.then(function (data) {
            AreaListObservable.set(data);
            try {
              AreaObservable.set(data[0].id);
            } catch(err) {
              $log.debug(err);
              $log.info('Initializing list with no areas.');
              AreaObservable.set(0);
            }
          });
          TaggerToast.toast('Area order updated.');
        }
      });
    }


    vm.$onInit = () => {

      _setSubscriptions();

      /**
       * Get the areas list and set the application
       * area observer to the first in the list.
       */
      let areas = AreaList.query();
      areas.$promise.then(function (data) {
        vm.areas = data;
        try {
          vm.currentAreaId = data[0].id;
        } catch(err) {
          $log.info('Initializing with area id zero.');
          $log.debug(err);
          vm.currentAreaId = 0;
        }
        AreaActionObservable.set(vm.currentAreaId);
      });


    };
  }

  taggerComponents.component('areasListComponent', {

    template: ' <md-card-content flex>' +
    '<div layout="column" style="height:700px">' +
    '<md-content class="sortable-list" flex="flex">' +
    '<div class="md-caption" style="margin-top: 10px">Drag item to reorder</div>' +
    '<md-list dnd-list="vm.areas">' +
    '<md-list-item ng-repeat="area in vm.areas" dnd-draggable="area" dnd-moved="vm.orderAreaList($index)" dnd-effect-allowed="move" class="tagger-reorder-button" track by $index>' +
    '<md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': area.id==vm.currentAreaId}" ng-click="vm.resetArea(area.id);"> ' +
    '<div class="list-group-item-text md-subhead layout-fill">{{area.title}}' +
    '<div class="md-ripple-container"></div>' +
    '</div>' +
    '<md-divider></md-divider> ' +
    '</md-button>' +
    '</md-list-item>' +
    '</md-list>' +
    '</md-content>' +
    '</div>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();



