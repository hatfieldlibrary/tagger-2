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

  function ListController(GroupListObserver,
                          GroupObserver,
                          UserAreaObserver) {

    const vm = this;

    GroupListObserver.subscribe(function onNext() {
      vm.categories = GroupListObserver.get();
      vm.currentCategory = vm.categories[0].id;
    });

    GroupObserver.subscribe((id) => {
        vm.currentCategory = id;
    });

    vm.resetCategory = function (tagId) {
      GroupObserver.set(tagId);
      vm.currentCategory = tagId;
    };

    vm.$onInit = function () {

      vm.userAreaId = UserAreaObserver.get();
      // If current group exists, use it.
      const currentCat = GroupObserver.get();
      if (currentCat) {
        vm.currentCategory = currentCat;
      }
      // If current group list exists, use it.
      const groupList = GroupListObserver.get();
      if (groupList) {
        vm.categories = groupList;
      }
    };
  }

  taggerComponents.component('groupsList', {

    template:
    ' <md-content flex="flex"> ' +
    '   <md-list> ' +
    '     <div ng-repeat="cat in vm.categories"> ' +
    '       <md-list-item> ' +
    '         <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': cat.id==vm.currentCategory}" ng-click="vm.resetCategory(cat.id);"> ' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{cat.title}}' +
    '             <div class="md-ripple-container"></div>' +
    '           </div>' +
    '         </md-button> ' +
    '       </md-list-item> ' +
    '       <md-divider></md-divider> ' +
    '     </div> ' +
    '   </md-list> ' +
    ' </md-content>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();



