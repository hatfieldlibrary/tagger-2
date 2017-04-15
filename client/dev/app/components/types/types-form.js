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
                          ContentTypeListObservable,
                          ContentTypeObservable,
                          ContentType,
                          ContentTypeUpdate,
                          ContentTypeList,
                          TaggerToast) {

    const vm = this;


    function _getTypeInfo(typeId) {
      console.log(typeId)
      const type = ContentType.query({id: typeId});
      type.$promise.then(function (data) {

        vm.contentType = data;
        vm.menu({id: vm.contentType.id, title: vm.contentType.name});
      });
    }

    vm.updateContentType = function () {

      const success = ContentTypeUpdate.update({
        id: vm.contentType.id,
        name: vm.contentType.name,
        icon: vm.contentType.icon

      });
      success.$promise.then(function (data) {
        if (data.status === 'success') {
          let types = ContentTypeList.query();
          types.$promise.then(function (list) {
            vm.types = list;
            ContentTypeListObservable.set(list);
            // Toast upon success
            TaggerToast.toast('Tag Updated');
          });

        }
      });
    };

    vm.$onInit = function () {

      ContentTypeObservable.subscribe((id) => {
        _getTypeInfo(id);
      });

      vm.userAreaId = UserAreaObservable.get();

      let typeId = ContentTypeObservable.get();
      if (typeId) {
        _getTypeInfo(typeId);
      }
    };

  }

  taggerComponents.component('typesForm', {

    bindings: {
      menu: '&'
    },
    template:
    '<md-card-content layout-padding="layout-padding" layout="column" flex="80" style="padding-left: 20px"> ' +
    ' <md-button class="md-raised md-accent large-button" ng-click="vm.updateContentType()">Update Content Type</md-button> ' +
    '   <div flex="flex" layout="column"> ' +
    '     <md-input-container> ' +
    '       <label>Type Name</label>' +
    '       <input type="text" ng-model="vm.contentType.name"/>' +
    '     </md-input-container>' +
    '     <md-input-container>' +
    '       <label>Type Icon (Fontawesome icon name:  e.g. fa-bus )</label>' +
    '       <input type="text" ng-model="vm.contentType.icon"/>' +
    '      </md-input-container>' +
    '    <div ng-if="vm.contentType.icon" layout="column">' +
    '    <div flex="30" style="padding-top: 30px">Preview:</div>' +
    '      <span style="font-size: 2rem;padding-top: 10px"><i class="fa {{vm.contentType.icon}}"></i></span>' +
    '    </div>' +
    '  </div>' +
    '  <div class="md-panel">Fontawesome Icons:' +
    '    <a href="https://fortawesome.github.io/Font-Awesome/icons/" target="_blank"> https://fortawesome.github.io/Font-Awesome/icons/</a>' +
    '  </div>' +
    '</md-card-content>',
    controller: FormController,
    controllerAs: 'vm'

  });

})();
