/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.service('TagDialog',

    function ($rootScope,
              ShowDialog,
              TagDelete,
              TagTargetAdd,
              TagTargetRemove,
              TagAdd,
              TagList,
              TagListObserver,
              TagObserver,
              TagAreaObserver,
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
       * Handles tag deletion.
       */
      vm.deleteTag = function () {

        const result = TagDelete.save({id: TagObserver.get()});
        result.$promise.then(function (data) {
          if (data.status === 'success') {

            new TaggerToast('Tag Deleted');
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
            tagId: TagObserver.get(),
            areaId: TagAreaObserver.get()
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            new TaggerToast('Tag Added area.');
            // Broadcast successful deletion with the updated area list.
            // Not using the shared context and a  watch for this update.
            // Using event emitter communicates the update information without
            // adding this essentially local and temporary to shared context.
            $rootScope.$broadcast('addedAreaToTag', {areaTargets: result.areaTargets});
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
            tagId: TagObserver.get(),
            areaId: TagAreaObserver.get()
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            new TaggerToast('Tag removed from Area.');
            // Broadcast successful deletion with the updated area list.
            // Not using the shared context and a  watch for this update.
            // Using event emitter communicates the update information without
            // adding this essentially local and temporary to shared context.
            $rootScope.$broadcast('removedAreaFromTag', {areaTargets: result.areaTargets});
            vm.closeDialog();
          }

        });
      };

      /**
       * Adds tag to a collection area. Used with collection
       * manager view.
       */
      vm.addTagToArea = function () {
        const result = TagTargetAdd.query(
          {
            tagId: TagObserver.get(),
            areaId: AreaObserver.get()
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            new TaggerToast('Tag Added area.');
            vm.getTagList(data.id);
            vm.closeDialog();
          }
        });
      };

      /**
       * Remove tag from area. Used with collection manager view.
       */
      vm.removeTagFromArea = function () {
        const result = TagTargetRemove.query(
          {
            tagId: TagObserver.get(),
            areaId: AreaObserver.get()
          }
        );
        result.$promise.then(function (data) {
          if (data.status === 'success') {
            new TaggerToast('Tag removed from Area.');
            vm.getTagList(data.id);
            // broadcast successful deletion.
            $rootScope.$broadcast('removedFromArea');

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
            new TaggerToast('Tag Added');
            // After area update succeeds, update the view.
            vm.getTagList(data.id);
            vm.closeDialog();
          } else {
            console.log(data);
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
            TagObserver.set(tags[0].id);
          } else {
            TagObserver.set(id);
          }
          TagListObserver.set(tags);

          vm.closeDialog();
        });

      };
    }
  });

})();