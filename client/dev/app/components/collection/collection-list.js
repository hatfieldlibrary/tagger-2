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

  function ListController(CollectionObservable,
                          CollectionListObservable,
                          CollectionsByArea,
                          CollectionAreasObservable,
                          AreaObservable) {

    const vm = this;


    vm.setCollectionById = (id) => {
      CollectionObservable.set(id);
    };

    /**
     * Set the component subscriptions.
     * @private
     */
    function _setSubscriptions() {

      AreaObservable.subscribe((area) => {
        _getCollections(area);

      });

      CollectionObservable.subscribe((collectionId) => {
        vm.collectionId = collectionId;
      });

      CollectionListObservable.subscribe(
        (collections) => {
          vm.collectionList = collections;
        });

      /**
       * Called by the area selector component. If collection
       * was removed from area, this assures that the list is
       * updated.
       */
      CollectionAreasObservable.subscribe(() => {
        let areaId = AreaObservable.get();
        _getCollections(areaId);
      });

    }

    /**
     * Update the collection list and collection id.
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
            /* Set collection list and collection id observers.
             * This updates observers only when values have changed.
             * Should have effect only when called via the
             * CollectionAreaObservableable. */
            CollectionListObservable.set(data);
            CollectionObservable.set(vm.collectionId);
          }
        });
      }
      else {
        throw new Error('Area id is undefined.');
      }
    }

    vm.$onInit = function () {

      _setSubscriptions();
      let areaId = AreaObservable.get();
      _getCollections(areaId);

    };

  }

  taggerComponents.component('collectionList', {

    template: '<md-content flex style="background: transparent">' +
    ' <div layout="column" style="height:700px">' +
    '   <md-content flex="flex" style="background: transparent">' +
    '     <md-list>' +
    '       <div ng-repeat="col in vm.collectionList">' +
    '         <md-list-item>' +
    '           <md-button class="md-no-style md-button  md-default-theme nav-item-dimens" ng-class="{\'md-primary\': col.Collection.id==vm.collectionId}" ng-click="vm.setCollectionById(col.Collection.id);">' +
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
