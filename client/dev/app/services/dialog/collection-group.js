/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.factory('CollectionGroupDialog',

    function ($mdDialog,
              CategoryDelete,
              CategoryAdd,
              CategoryList,
              GroupListObservable,
              GroupObservable,
              TaggerToast) {

      const _controller = function () {

        const vm = this;

        /**
         * Gets list of collection groups.  Optionally takes
         * id parameter.
         * @param id  id of the current collection group or null.
         */
        const _getCategoryList = function (id) {
          const categories = CategoryList.query();
          categories.$promise.then(function (data) {
            GroupListObservable.set(data);
            if (id === null) {
              GroupObservable.set(data[0].id);
            } else {
              GroupObservable.set(id);
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
         * Deletes a collection group from Tagger.
         */
        vm.delete = function () {

          const result = CategoryDelete.delete({id: GroupObservable.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Collection Group Deleted');
              // After retrieving new category list, we need
              // to update the category currently in view.
              // When the parameter is null, the method will
              // use the id of the first category in the
              // list. That's what we want in the case of deletions.
              _getCategoryList(null);
              vm.closeDialog();
            }

          });

        };

        /**
         * Add a collection group to Tagger.
         * @param title
         */
        vm.add = function (title) {

          const result = CategoryAdd.save({title: title});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              TaggerToast.toast('Collection Group Added');
              // Update the category list. The
              // id parameter will be used to select
              // the newly added category for editing.
              _getCategoryList(data.id);
              // Does what you'd expect.
              vm.closeDialog();

            }

          });
        };


        vm.uploadImage = function () {
          throw new Error('Call to unimplemented function.');
        };

      } ;

      return {
        controller: _controller
      };

    });

})();
