/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.factory('CollectionDialog',

    function ($mdDialog,
              Constant,
              CollectionAdd,
              CollectionDelete,
              CollectionListObservable,
              CollectionsByArea,
              CollectionObservable,
              AreaObservable,
              TaggerToast) {


    const _controller = function() {

      const vm = this;


      /**
       * Returns list of collections, optionally taking a collection
       * id.
       * @param id  the collection id or null.
       */
      const _getCollectionList = function (id) {

        const result = CollectionsByArea.query({areaId: AreaObservable.get()});
        result.$promise.then(function (data) {
          if (data) {
            CollectionListObservable.set(data);
            // Deleting a category doesn't generate
            // a new id. In that case, expect the
            // id to be null. Update the view using the
            // id of the first item in the updated category
            // list.
            if (id === null) {
              CollectionObservable.set(data[0].Collection.id);

            } else {
              CollectionObservable.set(id);
            }
          } else {
            CollectionObservable.set(0);
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
       * Adds new collection to area.
       * @param title the collection's title.
       */
      vm.add = function (title) {

        const result = CollectionAdd.save(
          {
            title: title,
            areaId: AreaObservable.get(),
            browseType: Constant.defaultBrowseType,
            repoType: Constant.defaultRepoType,
            ctype: Constant.defaultCollectionType,
            published: false
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            TaggerToast.toast('Collection Added');
            // Update the collection list. The
            // id parameter will be used to select
            // the newly added category for editing.
            _getCollectionList(data.id);
            // Does what you'd expect.
            vm.closeDialog();

          }
        });
      };

      /**
       * Deletes a collection.
       */
      vm.delete = function () {

        const result = CollectionDelete.save({id: CollectionObservable.get()});
        result.$promise.then(function (data) {
          if (data.status === 'success') {

            TaggerToast.toast('Collection Deleted');
            // After retrieving new collection list, we need
            // to update the category currently in view.
            // Given a null id parameter, the getCollectionList
            // function will use the id of the first collection in the
            // updated list.
            _getCollectionList(null);
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

