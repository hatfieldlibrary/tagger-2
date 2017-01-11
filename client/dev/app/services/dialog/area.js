/**
 * Created by mspalti on 1/11/17.
 */

/**
 * Controller for the area dialog.
 */
(function () {

  'use strict';

  taggerServices.service('AreaDialog',

    function (ShowDialog,
              AreaDelete,
              AreaAdd,
              AreaActionObserver,
              AreaList,
              AreaObserver,
              AreaListObserver,
              CollectionObserver,
              TaggerToast) {

      return function() {

        const vm = this;

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          ShowDialog.hideDialog();
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

        /**
         * Add new area to Tagger.
         * @param title
         */
        vm.addArea = function (title) {

          const result = AreaAdd.save({title: title});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              new TaggerToast('Area Added');
              // After area update succeeds, update the view.
              vm.getAreaList(null);
              vm.closeDialog();

            } else {
              console.log(data);
            }

          }).catch(function(err) {
            console.log(err);
          });
        };

        /**
         * Get list of all areas.  Optionally takes an area
         * id parameter.
         * @param id  the id of the current area or null.
         */
        vm.getAreaList = function (id) {
          const areas = AreaList.query();
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

      }

    });

})();
