/*
 * Copyright (c) 2017.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

      const _setCollectionObservableId = (id, data) => {

        if (id === null) {
          if(data.length > 0) {
            CollectionObservable.set(data[0].Collection.id);
          }
        } else {
          CollectionObservable.set(id);
        }
      };

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
            // If the list contains data, set the collection id for the context.
            if(data.length > 0) {
              _setCollectionObservableId(id, data);
            }
            // Otherwise, set the collection id to zero.
            else {
              CollectionObservable.set(0);
            }
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

        const result = CollectionDelete.delete({id: CollectionObservable.get()});
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

