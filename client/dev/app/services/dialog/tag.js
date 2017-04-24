
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

  taggerServices.factory('TagDialog',

    function (
              $mdDialog,
              TagDelete,
              TagTargetAdd,
              TagTargetRemove,
              TagAdd,
              TagList,
              TagListObservable,
              TagObservable,
              TagAreaObservable,
              AreaObservable,
              TaggerToast) {

      const _controller = function () {

        const vm = this;

        const _setTagObservableId = (id, tags) => {

          if (id === null) {
            TagObservable.set(tags[0].id);
          } else {
            TagObservable.set(id);
          }
        };

        /**
         * Returns a list of all tags.  The id parameter
         * used to optionally set the current tag.
         * @param id  id of current tag or null
         */
        const _getTagList = function (id) {

          const tags = TagList.query();
          tags.$promise.then(function (tags) {

            TagListObservable.set(tags);
            if(tags.length > 0) {
              _setTagObservableId(id, tags);
            }
            else{
              TagObservable.set(0);
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
         * Handles tag deletion.
         */
        vm.delete = function () {

          const result = TagDelete.delete({id: TagObservable.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Tag Deleted');
              // after retrieving new area list, we need
              // to update the areas currently in view.
              _getTagList(null);
              vm.closeDialog();
            }

          });

        };

        /**
         * Adds a new tag.  Used by administrative view.
         * @param name  the tag name
         */
        vm.add = function (name) {

          const result = TagAdd.save({name: name});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              TaggerToast.toast('Tag Added');
              // After area update succeeds, update the view.
              _getTagList(data.id);
              vm.closeDialog();
            } else {
              TaggerToast.toast('WARNING: Unable to add tag.');
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
