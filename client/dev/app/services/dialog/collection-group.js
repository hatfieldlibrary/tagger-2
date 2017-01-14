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
              GroupListObserver,
              GroupObserver,
              TaggerToast) {

      const _controller = function () {

        const vm = this;

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          $mdDialog.hide();
        };

        /**
         * Deletes a collection group from Tagger.
         */
        vm.deleteCategory = function () {

          const result = CategoryDelete.save({id: GroupObserver.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Category Deleted');
              // After retrieving new category list, we need
              // to update the category currently in view.
              // When the parameter is null, the method will
              // use the id of the first category in the
              // list. That's what we want in the case of deletions.
              vm.getCategoryList(null);
              vm.closeDialog();
            }

          });

        };

        /**
         * Add a collection group to Tagger.
         * @param title
         */
        vm.addCategory = function (title) {

          const result = CategoryAdd.save({title: title});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              new TaggerToast('Category Added');
              // Update the category list. The
              // id parameter will be used to select
              // the newly added category for editing.
              vm.getCategoryList(data.id);
              // Does what you'd expect.
              vm.closeDialog();

            }

          });
        };

        /**
         * Gets list of collection groups.  Optionally takes
         * id parameter.
         * @param id  id of the current collection group or null.
         */
        vm.getCategoryList = function (id) {

          const categories = CategoryList.query();
          categories.$promise.then(function (data) {
            GroupListObserver.set(data);
            if (id === null) {
              GroupObserver.set(data[0].id);

            } else {
              GroupObserver.set(id);

            }
          });

        };

      } ;

      return {
        controller: _controller
      }

    });

})();
