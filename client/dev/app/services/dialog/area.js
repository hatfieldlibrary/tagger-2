/**
 * Created by mspalti on 1/11/17.
 */

/**
 * Provides the controller method used by area dialogs.
 */
(function () {

  'use strict';

  taggerServices.factory('AreaDialog',

    function ($mdDialog,
              AreaDelete,
              AreaAdd,
              AreaActionObserver,
              AreaList,
              AreaObserver,
              AreaListObserver,
              CollectionObserver,
              TaggerToast) {


      const _controller = function () {

        const vm = this;

        /**
         * Get list of all areas.  Optionally takes an area
         * id parameter.
         * @param id  the id of the current area or null.
         */
        vm.getAreaList = function (id) {

          let areas = AreaList.query();

          areas.$promise.then(function (data) {

            AreaListObserver.set(data);
            if (data.length > 0) {
              if (id === null) {
                AreaActionObserver.set(data[0].id);
                AreaObserver.set(data[0].id);
              } else {
                AreaObserver.set(id);
              }

              vm.closeDialog();
            }
          });

        };

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          $mdDialog.hide();
        };

        /**
         * Add new area to Tagger.
         * @param title
         */
        vm.addArea = function (title) {

          let result = AreaAdd.save({title: title});

          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Area Added');
              // After area update succeeds, update the view.
              vm.getAreaList(data.id);
              vm.closeDialog();

            }

          });
        };

        /**
         * Delete collection area from Tagger.  Used by administrative view.
         * @param id
         */
        vm.deleteArea = function () {
          const result = AreaDelete.save({id: AreaActionObserver.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Area Deleted');
              // after retrieving new area list, we need
              // to update the areas currently in view.
              vm.getAreaList(null);
              CollectionObserver.set(-1);
              vm.closeDialog();

            }
          });
        };
      };

      return {

        controller: _controller

      }

    });

})();
