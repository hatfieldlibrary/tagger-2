/**
 * Created by mspalti on 12/15/16.
 */
(function () {

  'use strict';

  function GroupController(AreaList,
                           ReorderAreas,
                           TaggerToast,
                           TaggerDialog,
                           AreaListObserver,
                           AreaObserver,
                           UserAreaObserver) {

    var vm = this;

    /** @type {Array.<Object>} */
    vm.areas = AreaListObserver.get();

    /** @type {Object} */
    vm.area = vm.areas[0];

    vm.currentArea = {};

    /** @type {string} */
    vm.addMessage = 'templates/dialog/addAreaMessage.html';

    /** @type {string} */
    vm.deleteMessage = 'templates/dialog/deleteAreaMessage.html';

    /** @type {number */
    vm.currentAreaId = UserAreaObserver.get();
    /**
     * Watch for new areas in context.  Areas are added
     * and removed in a dialog controller.  They can also
     * be reordered by the view model (see above).
     */
    AreaListObserver.subscribe(function onNext() {
      vm.areas = AreaListObserver.get();

    });

    vm.menuUpdate = function(id, title) {
      vm.currentArea.title = title;
      vm.currentArea.id = id;
    };


    function _initAreaList() {
      var areas = AreaList.query();
      areas.$promise.then(function (data) {
        if (data.length > 0) {
          AreaListObserver.set(data);
          AreaObserver.set(data[0].id);
        }
      });
    }

    /**
     * Show the $mdDialog.
     * @param $event click event object (location of event used as
     *                    animation starting point)
     * @param message  html to display in dialog
     */
    vm.showDialog = function ($event, message) {
      new TaggerDialog($event, message);
    };

    /**
     * Updates the view model's areas array
     * @param index
     */
    vm.orderAreaList = function (index) {
      vm.areas.splice(index, 1);
      // now update the database
      updatePositionsInDb();

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
    function updatePositionsInDb() {
      var order = ReorderAreas.save(
        {
          areas: vm.areas
        });
      order.$promise.then(function (data) {
        if (data.status === 'success') {
          _initAreaList();
          new TaggerToast('Area order updated.');
        }
      });
    }

    vm.$onInit = function () {
      _initAreaList();
    }


  }

  taggerComponents.component('areasComponent', {

    templateUrl: 'templates/component/areas.html',
    controller: GroupController,
    controllerAs: 'vm'

  });

})();
