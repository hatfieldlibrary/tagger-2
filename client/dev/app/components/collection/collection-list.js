/**
 * Created by mspalti on 12/14/16.
 */

(function () {

  'use strict';

  function ListController(CollectionObserver,
                          CollectionListObserver,
                          CollectionsByArea,
                          AreaObserver) {

    const vm = this;

    AreaObserver.subscribe(function onNext() {

      _getCollections(AreaObserver.get());

    });

    CollectionObserver.subscribe(function onNext() {
      const list = CollectionListObserver.get();
      vm.collectionList = list;
      vm.collectionId = CollectionObserver.get();
    });

    vm.getCollectionById = function (id) {
      vm.collectionId = id;
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
          vm.collectionList = data;
          vm.collectionId = data[0].Collection.id;
          CollectionListObserver.set(data);
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
        const collectionList = CollectionsByArea.query(
          {
            areaId: areaId
          });

        collectionList.$promise.then(function (data) {
          vm.collectionList = data;
          CollectionListObserver.set(data);

        });
      }
    }

    vm.$onInit = function () {
      vm.collectionId = CollectionObserver.get();
      _initCollections(AreaObserver.get());

    };


  }

  taggerComponents.component('collectionList', {

    template:
    '<md-content flex style="background: transparent"> ' +
    ' <div layout="column" style="height:700px"> ' +
    '   <md-content flex="flex" style="background: transparent"> ' +
    '     <md-list> ' +
    '       <div ng-repeat="col in vm.collectionList"> ' +
    '         <md-list-item> ' +
    '           <md-button class="md-no-style md-button  md-default-theme nav-item-dimens" ng-class="{\'md-primary\': col.Collection.id==vm.collectionId}" ng-click="vm.getCollectionById(col.Collection.id);"> ' +
    '             <div class="list-group-item-text md-subhead layout-fill">{{col.Collection.title}}' +
    '               <div class="md-ripple-container"></div> ' +
    '             </div> ' +
    '           </md-button> ' +
    '         </md-list-item> ' +
    '         <md-divider></md-divider> ' +
    '       </div> ' +
    '     </md-list> ' +
    '   </md-content> ' +
    ' </div> ' +
    '</md-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();
