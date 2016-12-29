/*
 * Copyright (c) 2016.
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
 * Material design dialog and toast.
 */
(function () {

  'use strict';

  /**
   * Using the Angular Material mdToast
   * directive. This toast service accepts a single
   * parameter containing the toast message.
   */
  taggerServices.factory('TaggerToast', ['$mdToast',

    function ($mdToast) {
      /**
       * The factory returns the Toast object literal
       * that takes a message parameter.
       * @param content  the message to show in the toast.
       */
      function _toast(content) {

        const toastPosition = {
          bottom: false,
          top: true,
          left: true,
          right: false
        };

        const getToastPosition = function () {
          return Object.keys(toastPosition)
            .filter(function (pos) {
              return toastPosition[pos];
            })
            .join(' ');
        };

        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position(getToastPosition())
            .hideDelay(3000)
        );

      }

      return _toast;

    }]);

  /**
   * Using the Angular Material mdDialog directive for add, delete
   * and image upload.
   */
  taggerServices.factory('TaggerDialog', [

    'Upload',
    '$rootScope',
    '$mdDialog',

    function (UpLoad,
              $rootScope,
              $mdDialog) {
      /**
       * @param $mdDialog
       * @param $rootScope
       * @param Constant
       * @param TagAdd
       * @param TagList
       * @param TagDelete
       * @param AreaAdd
       * @param AreaList
       * @param AreaDelete
       * @param Category
       * @param CategoryList
       * @param CategoryAdd
       * @param CategoryDelete
       * @param ContentTypeList
       * @param ContentTypeAdd
       * @param ContentTypeDelete
       * @param CollectionAdd
       * @param CollectionDelete
       * @param CollectionsByArea
       * @param TagTargetRemove
       * @param TagTargetAdd
       * @param TaggerToast
       * @param Upload
       * @param AreaListObserver
       * @param AreaObserver
       * @param CollectionListObserver
       * @param CollectionObserver
       * @param TagObserver
       * @param TagListObserver
       * @param TagAreaObserver
       * @param GroupObserver
       * @param GroupListObserver
       * @param ThumbImageObserver
       * @param ContentTypeObserver
       * @param ContentTypeListObserver
       * @param AreaActionObserver
       * @constructor
       */
      function DialogController(
        $mdDialog,
        $rootScope,
        Constant,
        TagAdd,
        TagList,
        TagDelete,
        AreaAdd,
        AreaList,
        AreaDelete,
        Category,
        CategoryList,
        CategoryAdd,
        CategoryDelete,
        ContentTypeList,
        ContentTypeAdd,
        ContentTypeDelete,
        CollectionAdd,
        CollectionDelete,
        CollectionsByArea,
        TagTargetRemove,
        TagTargetAdd,
        TaggerToast,
        Upload,
        AreaListObserver,
        AreaObserver,
        CollectionListObserver,
        CollectionObserver,
        TagObserver,
        TagListObserver,
        TagAreaObserver,
        GroupObserver,
        GroupListObserver,
        ThumbImageObserver,
        ContentTypeObserver,
        ContentTypeListObserver,
        AreaActionObserver) {

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

        /**
         * Delete collection area from Tagger.  Used by administrative view.
         * @param id
         */
        vm.deleteArea = function () {

          const result = AreaDelete.save({id: AreaActionObserver.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Area Deleted');
              // after retrieving new area list, we need
              // to update the areas currently in view.
              vm.getAreaList(null);

            }

          });

        };

        /**
         * Add new area to Tagger.
         * @param title
         */
        vm.addArea = function (title) {

          const result = AreaAdd.save({title: title});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Area Added');
              // After area update succeeds, update the view.
              vm.getAreaList(data.id);
              vm.closeDialog();

            }

          });
        };

        /**
         * Get list of all areas.  Optionally takes an area
         * id parameter.
         * @param id  the id of the current area or null.
         */
        vm.getAreaList = function (id) {

          const areas = AreaList.query();
          areas.$promise.then(function (data) {

            AreaListObserver.set(data);
            if (data.length > 0) {
              if (id === null) {
                AreaActionObserver.set(data[0].id);
                AreaObserver.set(data[0].id);
              } else {
                AreaObserver.set(id);
              }
              vm.closeDialog();
            }
          });

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

        /**
         * Deletes a content type from Tagger.
         * @param id
         */
        vm.deleteContentType = function () {

          const result = ContentTypeDelete.save({id: ContentTypeObserver.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              new TaggerToast('Content Type Deleted');
              // After retrieving new content type list, we need
              // to update the content types currently in view.
              // This method is designed to take an id
              // parameter.  If this param is null, it
              // uses the id of the first category in the
              // updated list. That's what we want in the
              // case of deletions.
              vm.getContentList(null);
              vm.closeDialog();
            }

          });
        };

        /**
         * Gets list of content types. Optionally takes id
         * parameter.
         * @param id  the id of the current content type or null.
         */
        vm.getContentList = function (id) {

          // Update the shared Data service
          const contentTypes = ContentTypeList.query();
          // Wait for callback.
          contentTypes.$promise.then(function (data) {
            ContentTypeListObserver.set(data);
            if (id === null) {
              ContentTypeObserver.set(data[0].id);

            } else {
              ContentTypeObserver.set(id);
            }

          });

        };

        /**
         * Add content type to Tagger.
         * @param title
         */
        vm.addContentType = function (title) {

          const result = ContentTypeAdd.save({title: title});
          result.$promise.then(function (data) {

            if (data.status === 'success') {
              new TaggerToast('Content Type Added');
              // Update the category list. The
              // id parameter will be used to select
              // the newly added category for editing.
              vm.getContentList(data.id);
              // Does what you'd expect.
              vm.closeDialog();

            }

          });
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

        /**
         * Upload image to Tagger's image processing service.
         * @param file the image file
         */
        vm.uploadImage = function (file) {

          if (file !== undefined) {
            /* jshint unused: false */
            Upload.upload({
              url: '/tagger/collection/image',
              file: file,
              fields: {id: CollectionObserver.get()}
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
              ThumbImageObserver.set(config.file.name);
              vm.closeDialog();
              console.log('file ' + config.file.name + 'uploaded. Response: ' + data);

            }).error(function (data, status, headers, config) {
              console.log('error status: ' + status);
            });
          }
        };

      }

      /**
       * Returns a dialog using predefined options and
       * the provided message param. The event param is used by
       *  $mdDialog to set the starting location of the animation.
       *
       * @param $event  the Angular event object
       * @param message  the template defining the dialog content
       */
      const _showDialog = function ($event, message) {

        let parentEl = angular.element(document.body);

        // Show a dialog with the specified options.
        $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
          templateUrl: message,
          controller: DialogController,
          controllerAs: 'vm'
        });

      };

      return _showDialog;

    }]);

})();
