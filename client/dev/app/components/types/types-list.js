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

  function ListController(ContentTypeListObserver,
                          ContentTypeObserver,
                          UserAreaObservable) {

    var vm = this;

    ContentTypeListObserver.subscribe(function onNext() {
      vm.types = ContentTypeListObserver.get();
      vm.currentType = vm.types[0].id;
    });

    vm.resetType = function (typeId) {
      ContentTypeObserver.set(typeId);
      vm.currentType = typeId;
    };

    vm.$onInit = function () {

      vm.userAreaId = UserAreaObservable.get();
      // If current type exists, use it.
      const currentType = ContentTypeObserver.get();
      if (currentType) {
        vm.currentType = currentType;
      }
      // If current type list exists, use it.
      const typeList = ContentTypeListObserver.get();
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
