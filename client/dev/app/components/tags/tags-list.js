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

  function ListController(TagListObservable,
                          TagObservable,
                          UserAreaObservable,
                          $log) {

    var vm = this;


    function _setSubscriptions() {
      TagListObservable.subscribe((list) => {

        try {
          vm.tags = list;
          vm.currentTag = vm.tags[0].id;
        } catch (err) {
          $log.debug(err);
          $log.info('Initializing list with no tags.');
          vm.tags = [];
          vm.currentTag = 0;

        }

      });
    }

    vm.resetTag = function (tagId) {
      TagObservable.set(tagId);
      vm.currentTag = tagId;
    };

    vm.$onInit = function () {

      _setSubscriptions();

      vm.userAreaId = UserAreaObservable.get();
      // If current tag exists, use it.
      const currentTag = TagObservable.get();
      if (currentTag) {
        vm.currentTag = currentTag;
      }
      // If current tag list exists, use it.
      const tagList = TagListObservable.get();
      if (tagList) {
        vm.tags = tagList;
      }
    };
  }

  taggerComponents.component('tagsList', {

    template: '<md-card-content flex>' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" ng-show="vm.userAreaId==0">' +
    '     <md-list> ' +
    '       <div ng-repeat="tag in vm.tags">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': tag.id==vm.currentTag}" ng-click="vm.resetTag(tag.id);">' +
    '           <div class="list-group-item-text md-subhead layout-fill">{{tag.name}}' +
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
