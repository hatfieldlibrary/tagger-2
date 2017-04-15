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

  function ListController(GroupListObservable,
                          GroupObservable,
                          UserAreaObservable,
                          $log) {

    const vm = this;

    function _setSubscriptions() {

      GroupListObservable.subscribe((categories) => {

        try {
          vm.categories = categories;
          vm.currentCategory = vm.categories[0].id;
        } catch (err) {
          $log.debug(err);
          $log.info('Initializing list with no collection groups.');
          vm.categories = [];
          vm.currentCategory = 0;

        }
      });


      GroupObservable.subscribe((id) => {
        vm.currentCategory = id;
      });

    }

    vm.resetCategory = function (catId) {
      GroupObservable.set(catId);
      vm.currentCategory = catId;
    };

    vm.$onInit = function () {

      _setSubscriptions();

      vm.userAreaId = UserAreaObservable.get();
      // If current group exists, use it.
      const currentCat = GroupObservable.get();
      if (currentCat) {
        vm.currentCategory = currentCat;
      }
      // If current group list exists, use it.
      const groupList = GroupListObservable.get();
      if (groupList) {
        vm.categories = groupList;
      }
    };

  }

  taggerComponents.component('groupsList', {

    template: ' <md-content flex="flex"> ' +
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



