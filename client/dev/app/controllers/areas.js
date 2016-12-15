(function () {

  'use strict';

  /*globals taggerControllers*/

  /**
   * The controller for collection area management.
   */
  taggerControllers.controller('AreaCtrl', [

    '$rootScope',
    '$scope',
    'AreaList',
    'AreaById',
    'AreaUpdate',
    'ReorderAreas',
    'TaggerToast',
    'TaggerDialog',
    '$animate',
    'AreaListObserver',
    'AreaObserver',
    'UserAreaObserver',

    function ($rootScope,
              $scope,
              AreaList,
              AreaById,
              AreaUpdate,
              ReorderAreas,
              TaggerToast,
              TaggerDialog,
              $animate,
              AreaListObserver,
              AreaObserver,
              UserAreaObserver,
              AreaActionObserver) {

      var vm = this;

      /** @type {Array.<Object>} */
      vm.areas = AreaListObserver.get();

      /** @type {Object} */
      vm.area = vm.areas[0];

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
      /**
       * Watch for changes in the shared area index
       * and reset the area in the view model.
       */
      AreaObserver.subscribe(function onNext() {
        vm.resetArea(AreaObserver.get());
      });

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
       * Sets the current area in view model.
       * @param id  area id
       */
      vm.resetArea = function (id) {
        if (id !== null) {
          vm.currentAreaId = id;
          AreaActionObserver.set(id);

        }
        var ar = AreaById.query({id: id});
        ar.$promise.then(function (data) {
          vm.area = data;
        });
      };

      /**
       *  Updates the area information.  Updates area list
       *  upon success.
       */
      vm.updateArea = function () {
        var success = AreaUpdate.save({
          id: vm.area.id,
          title: vm.area.title,
          description: vm.area.description,
          searchUrl: vm.area.areaId,
          linkLabel: vm.area.linkLabel,
          url: vm.area.url

        });
        success.$promise.then(function (data) {
          if (data.status === 'success') {
            var areas = AreaList.query();
            areas.$promise.then(function (data) {
              vm.areas = data;

              // observer
              AreaListObserver.set(data);
            });
            // Toast upon success
            new TaggerToast('Area Updated"');
          }
        });

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
        vm.resetArea(AreaObserver.get());
      }

    }]);

})();


