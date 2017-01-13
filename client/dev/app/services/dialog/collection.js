/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.service('CollectionDialog',

    function (ShowDialog,
              Constant,
              CollectionAdd,
              CollectionDelete,
              CollectionListObserver,
              CollectionObserver,
              CollectionsByArea,
              AreaObserver,
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
       * Adds new collection to area.
       * @param title the collection's title.
       */
      vm.addCollection = function (title) {

        const result = CollectionAdd.save(
          {
            title: title,
            areaId: AreaObserver.get(),
            browseType: Constant.defaultBrowseType,
            repoType: Constant.defaultRepoType,
            ctype: Constant.defaultCollectionType,
            published: false
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            new TaggerToast('Collection Added');
            // Update the collection list. The
            // id parameter will be used to select
            // the newly added category for editing.
            vm.getCollectionList(data.id);
            // Does what you'd expect.
            vm.closeDialog();

          }
        });
      };

      /**
       * Deletes a collection.
       */
      vm.deleteCollection = function () {

        const result = CollectionDelete.save({id: CollectionObserver.get()});
        result.$promise.then(function (data) {
          if (data.status === 'success') {

            new TaggerToast('Collection Deleted');
            // After retrieving new collection list, we need
            // to update the category currently in view.
            // Given a null id parameter, the getCollectionList
            // function will use the id of the first collection in the
            // updated list.
            vm.getCollectionList(null);
            vm.closeDialog();

          }

        });

      };

      /**
       * Returns list of collections, optionally taking a collection
       * id.
       * @param id  the collection id or null.
       */
      vm.getCollectionList = function (id) {

        const result = CollectionsByArea.query({areaId: AreaObserver.get()});
        result.$promise.then(function (data) {
          CollectionListObserver.set(data);
          // Deleting a category doesn't generate
          // a new id. In that case, expect the
          // id to be null. Update the view using the
          // id of the first item in the updated category
          // list.
          if (id === null) {
            CollectionObserver.set(data[0].Collection.id);

          } else {
            CollectionObserver.set(id);

          }

        });

      };


      vm.$onInit = function() {
        alert()
        if (ShowDialog.hasOwnProperty('showDialog')) {
          alert()
          vm.showDialog = ShowDialog.showDialog;
        } else {
          console.log('Dialog service has no showDialog method,');
        }

        if (ShowDialog.hasOwnProperty('hideDialog')) {
          vm.hideDialog = ShowDialog.hideDialog();
        } else {
          console.log('Dialog service has no hideDialog method.');
        }
      }




    }

  });

})();
