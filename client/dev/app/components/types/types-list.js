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

  function ListController(ContentTypeListObservable,
                          ContentTypeObservable,
                          UserAreaObservable,
                          $log) {

    let vm = this;

    vm.resetType = function (typeId) {
      ContentTypeObservable.set(typeId);
      vm.currentType = typeId;
    };

    vm.$onInit = function () {

      ContentTypeListObservable.subscribe((list) => {
        try {
          vm.types = list;
          vm.currentType = vm.types[0].id;
        } catch (err) {
          $log.debug(err);
          $log.info('Initializing list with no content types.');
          vm.types = [];
          vm.currentType = 0;

        }

      });

      vm.userAreaId = UserAreaObservable.get();

      // If current type exists, use it.
      const currentType = ContentTypeObservable.get();
      if (currentType) {
        vm.currentType = currentType;
      }

      // If current type list exists, use it.
      const typeList = ContentTypeListObservable.get();
      if (typeList) {
        vm.types = typeList;
      }
    };
  }

  taggerComponents.component('typesList', {

    template: '<md-card-content flex>' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" ng-show="vm.userAreaId==0">' +
    '     <md-list>' +
    '       <div ng-repeat="type in vm.types">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': tag.id==vm.currentType}" ng-click="vm.resetType(type.id);">' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{type.name}}' +
    '               <div class="md-ripple-container"></div>' +
    '             </div>' +
    '           </md-button>' +
    '         </md-list-item>' +
    '         <md-divider></md-divider>' +
    '       </div>' +
    '     </md-list>' +
    '   </md-content>' +
    ' </div>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();
