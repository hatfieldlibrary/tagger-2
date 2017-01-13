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

  function ListController(CollectionObserver,
                          CollectionListObserver,
                          CollectionsByArea,
                          CollectionAreasObserver,
                          AreaObserver) {

    const vm = this;

    AreaObserver.subscribe(function onNext() {
      _getCollections(AreaObserver.get());

    });

    CollectionObserver.subscribe(function onNext() {
      vm.collectionId = CollectionObserver.get();
    });

    CollectionListObserver.subscribe(function onNext() {
      vm.collectionList = CollectionListObserver.get();
    });

    CollectionAreasObserver.subscribe(function onNext() {
         _getCollections(AreaObserver.get());
    });

    vm.getCollectionById = function (id) {
      CollectionObserver.set(id);
    };

    /**
     * Get collection list after an area change.
     * @param areaId
     * @private
     */
    function _getCollections(areaId) {

      if (areaId) {
        const collectionList = CollectionsByArea.query(
          {
            areaId: areaId
          });
        collectionList.$promise.then(function (data) {
          if (data[0]) {
            vm.collectionList = data;
            vm.collectionId = data[0].Collection.id;
            CollectionListObserver.set(data);
            CollectionObserver.set(vm.collectionId);
          }  else {
            CollectionListObserver.set([]);
            CollectionObserver.set(-1);
          }
        });
      }
    }

    /**
     * Get collection list on page initialization.
     * @param areaId
     * @private
     */
    function _initCollections(areaId) {

      if (areaId) {
        const list = CollectionsByArea.query(
          {
            areaId: areaId
          });
        list.$promise.then(function (data) {
          if (data[0]) {
            CollectionObserver.set(data[0].Collection.id);
            CollectionListObserver.set(data);
            // Verify that the selected collection id is
            // set.
            vm.collectionId = CollectionObserver.get();
          } else {
            CollectionListObserver.set([]);
            CollectionObserver.set(-1);
          }
        });
      }
    }

    vm.$onInit = function () {

      _initCollections(AreaObserver.get());

    };

  }

  taggerComponents.component('collectionList', {

    template: '<md-content flex style="background: transparent">' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" style="background: transparent">' +
    '     <md-list>' +
    '       <div ng-repeat="col in vm.collectionList">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button  md-default-theme nav-item-dimens" ng-class="{\'md-primary\': col.Collection.id==vm.collectionId}" ng-click="vm.getCollectionById(col.Collection.id);">' +
    '             <div class="list-group-item-text md-subhead layout-fill">{{col.Collection.title}}' +
    '               <div class="md-ripple-container"></div>' +
    '             </div>' +
    '           </md-button>' +
    '         </md-list-item>' +
    '         <md-divider></md-divider>' +
    '       </div>' +
    '     </md-list>' +
    '   </md-content>' +
    ' </div>' +
    '</md-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();
