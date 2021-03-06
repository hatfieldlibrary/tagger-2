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

        const _setGroupObservableId = (id, data) => {

          if (id === null) {
            if(data.length > 0) {
              GroupObservable.set(data[0].id);
            }
          } else {
            GroupObservable.set(id);
          }
        };

        /**
         * Gets list of collection groups.  Optionally takes
         * id parameter.
         * @param id  id of the current collection group or null.
         */
        const _getCategoryList = function (id) {
          const categories = CategoryList.query();
          categories.$promise.then(function (data) {
            GroupListObservable.set(data);
            // If we have items in list, set the observable id based on context.
            if (data.length > 0) {
              _setGroupObservableId(id, data);
            }
            // Otherwise, set the id to zero.
            else {
              GroupObservable.set(0);
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
