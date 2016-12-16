/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function ListController(TaggerToast,
                          AreaObserver,
                          AreaList,
                          AreaListObserver,
                          AreaActionObserver,
                          ReorderAreas) {

    var vm = this;

    AreaListObserver.subscribe(function onNext() {
         vm.areas = AreaListObserver.get();
    });

    /**
     * Sets the current area in view model.
     * @param id  area id
     */
    vm.resetArea = function (id) {
      if (id !== null) {
        vm.currentAreaId = id;
        AreaActionObserver.set(id);
      }

    };

    /**
     * Updates the view model's areas array
     * @param index
     */
    vm.orderAreaList = function (index) {
      vm.areas.splice(index, 1);
      // now update the database
      _updatePositionsInDb();

    };

    /**
     * Updates the area position attribute for
     * all areas after they have been reordered
     * in the UI.  The new position attribute is
     * based on the new index positions in the areas
     * array. The promise callback function updates
     * the shared Data.areas array so the new order
     * is available to components.
     */
    function _updatePositionsInDb() {
      var order = ReorderAreas.save(
        {
          areas: vm.areas
        });
      order.$promise.then(function (data) {
        if (data.status === 'success') {
          var areas = AreaList.query();
          areas.$promise.then(function (data) {
            AreaListObserver.set(data);
            AreaObserver.set(data[0].id);
          });
          new TaggerToast('Area order updated.');
        }
      });
    }


    vm.$onInit = function () {

      var ar = AreaList.query();
      ar.$promise.then(function (data) {
        vm.areas = data;
        vm.currentAreaId = data[0].id;
        AreaActionObserver.set(vm.currentAreaId);
      });
    }
  }

  taggerComponents.component('areasList', {

    template: ' <md-card-content flex>' +
    '<div layout="column" style="height:700px">' +
    '<md-content class="sortable-list" flex="flex">' +
    '<div class="md-caption" style="margin-top: 10px">Drag item to reorder</div>' +
    '<md-list dnd-list="vm.areas">' +
    '<md-list-item ng-repeat="area in vm.areas" dnd-draggable="area" dnd-moved="vm.orderAreaList($index, area.id)" dnd-effect-allowed="move">' +
    '<md-button class="md-no-style md-button nav-item-dimens md-default-theme" ng-class="{\'md-primary\': area.id==vm.currentAreaId}" ng-click="vm.resetArea(area.id);"> ' +
    '<div class="list-group-item-text md-subhead layout-fill">{{area.title}}' +
    '<div class="md-ripple-container"></div>' +
    '</div>' +
    '<md-divider></md-divider> ' +
    '</md-button>' +
    '</md-list-item>' +
    '</md-list>' +
    '</md-content>' +
    '</div>' +
    '</md-card-content>',
    controller: ListController,
    controllerAs: 'vm'
  });

})();



