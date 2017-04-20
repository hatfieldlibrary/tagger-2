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
              AreaActionObservable,
              AreaList,
              AreaObservable,
              AreaListObservable,
              TaggerToast) {


      const _controller = function () {

        const vm = this;

        /**
         * Get list of all areas.  Updates area observers.
         * @param id  the id of the current area or null.
         */
        const _getAreaList = function () {

          let areas = AreaList.query();

          areas.$promise.then(function (data) {
            AreaListObservable.set(data);
            if (data.length > 0) {
                AreaActionObservable.set(data[0].id);
                AreaObservable.set(data[0].id);
            } else {
              AreaActionObservable.set(0);

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
        vm.add = function (title) {

          let result = AreaAdd.save({title: title});

          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Area Added');
              // After area update succeeds, update the view.
              _getAreaList();
              vm.closeDialog();

            }

          });
        };

        /**
         * Delete collection area from Tagger.  Used by administrative view.
         * @param id
         */
        vm.delete = function () {
          const result = AreaDelete.delete({areaId: AreaActionObservable.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Area Deleted');
              // after retrieving new area list, we need
              // to update the areas currently in view.
              //AreaObservable.set(-1);
              _getAreaList();
              vm.closeDialog();

            }
          });
        };

        vm.uploadImage = function () {
             throw new Error('Call to unimplemented function.');
        };

      };

      return {

        controller: _controller

      };

    });

})();
