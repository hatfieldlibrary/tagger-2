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
 * Created by mspalti on 2/17/17.
 */

(function () {

  'use strict';

  taggerServices.factory('TagAreaDialog',

    function ($rootScope,
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

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          $mdDialog.hide();
        };

        /**
         * Adds tag to a collection area. Used with administrator view.
         */
        vm.add = function () {
          const result = TagTargetAdd.save(
            {
              tagId: TagObservable.get(),
              areaId: TagAreaObservable.get()
            }
          );
          result.$promise.then(function (result) {
            if (result.status === 'success') {
              TaggerToast.toast('Tag Added area.');
              // Broadcast successful deletion with the updated area list.
              // This is inconsistent with our standard approach of using a
              // wrapped observable to notify observers.
              $rootScope.$broadcast('addedAreaToTag', {areaTargets: result.data.areaList});
              vm.closeDialog();
            }
          });
        };

        /**
         * Remove tag from area. Used with collection administrator view.
         */
        vm.delete = function () {
          const result = TagTargetRemove.delete(
            {
              tagId: TagObservable.get(),
              areaId: TagAreaObservable.get()
            }
          );
          result.$promise.then(function (result) {
            if (result.status === 'success') {
              TaggerToast.toast('Tag removed from Area.');
              // Broadcast successful deletion with the updated area list.
              // This is inconsistent with our standard approach of using a
              // wrapped observable to notify observers.
              $rootScope.$broadcast('removedAreaFromTag', {areaTargets: result.areaTargets});
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
