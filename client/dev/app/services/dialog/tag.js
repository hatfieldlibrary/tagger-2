
/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.factory('TagDialog',

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
         * Handles tag deletion.
         */
        vm.deleteTag = function () {

          const result = TagDelete.save({id: TagObservable.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Tag Deleted');
              // after retrieving new area list, we need
              // to update the areas currently in view.
              vm.getTagList(null);
              vm.closeDialog();
            }

          });

        };

        /**
         * Adds tag to a collection area. Used with administrator view.
         */
        vm.addAreaToTag = function () {
          const result = TagTargetAdd.query(
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
        vm.removeAreaFromTag = function () {
          const result = TagTargetRemove.query(
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

        /**
         * Adds a new tag.  Used by administrative view.
         * @param name  the tag name
         */
        vm.addTag = function (name) {

          const result = TagAdd.save({name: name});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              TaggerToast.toast('Tag Added');
              // After area update succeeds, update the view.
              vm.getTagList(data.id);
              vm.closeDialog();
            } else {
              TaggerToast.toast('WARNING: Unable to add tag.');
              vm.closeDialog();
            }
          });
        };

        /**
         * Returns a list of all tags.  The id parameter
         * used to optionally set the current tag.
         * @param id  id of current tag or null
         */
        vm.getTagList = function (id) {

          const tags = TagList.query();
          tags.$promise.then(function (tags) {
            if (id === null) {
              TagObservable.set(tags[0].id);
            } else {
              TagObservable.set(id);
            }
            TagListObservable.set(tags);

          });

        };
      };

      return {
        controller: _controller
      };

    });

})();
