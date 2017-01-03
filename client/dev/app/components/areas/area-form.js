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

  function FormController(AreaUpdate,
                          AreaById,
                          AreaActionObserver,
                          AreaListObserver,
                          AreaList,
                          TaggerToast) {

    const vm = this;

    /**
     * Watch for changes in the shared area index
     * and reset the area in the view model.
     */
    AreaActionObserver.subscribe(function onNext() {
      var ar = AreaById.query({id: AreaActionObserver.get()});
      ar.$promise.then(function (data) {
        vm.area = data;
        vm.menu({id: vm.area.id, title: vm.area.title});
      });
    });

    /**
     *  Updates the area information.  Updates area list
     *  upon success.
     */
    vm.updateArea = function () {
      var success = AreaUpdate.save({
        id: vm.area.id,
        title: vm.area.title,
        description: vm.area.description,
        searchUrl: vm.area.areaId,
        linkLabel: vm.area.linkLabel,
        url: vm.area.url

      });
      success.$promise.then(function (data) {
        if (data.status === 'success') {
          var areas = AreaList.query();
          areas.$promise.then(function (data) {
            // observer
            AreaListObserver.set(data);
          });
          // Toast upon success
          new TaggerToast('Area Updated"');
        }
      });

    };

    vm.$onInit = function() {
      var ar = AreaById.query({id: AreaActionObserver.get()});
      ar.$promise.then(function (data) {
        vm.area = data;
        vm.menu({id: vm.area.id, title: vm.area.title});
      });
    }

  }

  taggerComponents.component('areaForm', {

    bindings: {
      menu: '&'
    },
    template: '<md-card-content class="md-subhead grey-text" layout-padding="layout-padding" layout="column" flex="80"> ' +
    '<md-button class="md-raised md-accent large-button" ng-click="vm.updateArea()">Update Area</md-button> ' +
    '<md-input-container> ' +
    '<label>Area Name</label> ' +
    '<input type="text" ng-model="vm.area.title"/> ' +
    '</md-input-container> ' +
    '<md-input-container> ' +
    '<label>Description  &nbsp;<span class="md-subhead md-default">maxuimum characters 450 (current {{vm.area.description.length}})</span> </label> ' +
    '<textarea type="textarea" ng-trim="false" ng-model="vm.area.description" maxlength="450"></textarea> ' +
    '</md-input-container> ' +
    '<md-input-container> ' +
    '<label>Button Label</label> ' +
    '<input type="text" ng-model="vm.area.linkLabel"/> ' +
    '</md-input-container> ' +
    '<md-input-container> ' +
    '<label>URL</label> ' +
    '<input type="text" ng-model="vm.area.url"/> ' +
    '</md-input-container> ' +
    '<md-input-container> ' +
    '<label>Search URL</label> ' +
    '<input type="text" ng-model="vm.area.searchUrl"/> ' +
    '</md-input-container> ' +
    '</md-card-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();


