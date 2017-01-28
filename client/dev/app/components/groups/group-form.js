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

  function FormController(UserAreaObservable,
                          GroupListObservable,
                          GroupObservable,
                          Category,
                          CategoryUpdate,
                          CategoryList,
                          AreaList,
                          TaggerToast) {

    const vm = this;


    function _getGroupInfo(grpId) {
      let grp = Category.query({id: grpId});
      grp.$promise.then(function (data) {
        vm.category = data;
        // parent menu callback
        vm.menu({id: vm.category.id, title: vm.category.title});
      });

    }

    function _getAreas() {

      let areas = AreaList.query();
      areas.$promise.then(function(data) {
        vm.areas = data;
      });

    }

    vm.updateGroup = function () {

      let success = CategoryUpdate.save({

        title: vm.category.title,
        url: vm.category.url,
        description: vm.category.description,
        linkLabel: vm.category.linkLabel,
        id: vm.category.id,
        areaId: vm.category.areaId

      });
      success.$promise.then(function (data) {

        if (data.status === 'success') {
          let groups = CategoryList.query();
          groups.$promise.then(function (list) {
            vm.categories = list;
            GroupListObservable.set(list);
            // Toast upon success
            TaggerToast.toast('Category Updated');
          });

        }
      });
    };

    vm.$onInit = function () {

      GroupObservable.subscribe((id) => {
        _getGroupInfo(id);
      });

      vm.userAreaId = UserAreaObservable.get();
      vm.categories = GroupListObservable.get();

      _getAreas();

      let groupId = GroupObservable.get();
      if (groupId) {
        _getGroupInfo(groupId);
      }

    };

  }

  taggerComponents.component('groupForm', {

    bindings: {
      menu: '&'
    },
    template:
    '<md-content layout-padding="layout-padding" flex="80" layout="column" style="padding-left: 20px"> ' +
    ' <md-button class="md-raised md-accent large-button" ng-click="vm.updateGroup()">Update Group</md-button> ' +
    ' <md-input-container> ' +
    '   <label>Collection Name</label> ' +
    '   <input type="text" ng-model="vm.category.title"/> ' +
    ' </md-input-container> ' +
    ' <md-input-container> ' +
    '   <label>Area (mandatory)</label> ' +
    '   <md-select ng-model="vm.category.areaId" placeholder="Select an Area (mandatory)"> ' +
    '     <md-option ng-repeat="area in vm.areas" ng-value="area.id">{{area.title}}</md-option> ' +
    '   </md-select> ' +
    ' </md-input-container> ' +
    ' <md-input-container> ' +
    '   <label>Description &nbsp;<span class="md-subhead md-default">maxuimum characters 450 (current {{vm.category.description.length}})</span></label> ' +
    '   <textarea type="textarea" ng-trim="false" ng-model="vm.category.description" maxlength="450"></textarea> ' +
    ' </md-input-container> ' +
    ' <md-input-container> ' +
    '   <label>Button Label</label> ' +
    '   <input type="text" ng-model="vm.category.linkLabel"/> ' +
    ' </md-input-container> ' +
    ' <md-input-container> ' +
    '   <label>URL</label> ' +
    '   <input type="text" ng-model="vm.category.url"/> ' +
    ' </md-input-container> ' +
    '</md-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();


