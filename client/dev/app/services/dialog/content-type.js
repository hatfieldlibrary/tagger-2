/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.factory('ContentTypeDialog',

    function ($mdDialog,
              ContentTypeDelete,
              ContentTypeList,
              ContentTypeAdd,
              ContentTypeObservable,
              ContentTypeListObservable,
              TaggerToast) {

      const _controller = function() {

        const vm = this;

        const _setTypeObservableId = (id, data) => {

          if (id === null) {
            if(data.length > 0) {
              ContentTypeObservable.set(data[0].id);
            }
          } else {
            ContentTypeObservable.set(id);
          }
        };

        /**
         * Gets list of content types. Optionally takes id
         * parameter.
         * @param id  the id of the current content type or null.
         */
        const _getContentList = function (id) {

          const contentTypes = ContentTypeList.query();
          // Wait for callback.
          contentTypes.$promise.then(function (data) {
            ContentTypeListObservable.set(data);
            if(data.length > 0) {
              _setTypeObservableId(id, data);
            }
            else {
              ContentTypeObservable.set(0);
            }

          });

        };

        vm.closeDialog = function() {
          $mdDialog.hide();
        };

        /**
         * Deletes a content type from Tagger.
         * @param id
         */
        vm.delete = function () {

          const result = ContentTypeDelete.delete({id: ContentTypeObservable.get()});
          result.$promise.then(function (data) {
            if (data.status === 'success') {

              TaggerToast.toast('Content Type Deleted');
              // After retrieving new content type list, we need
              // to update the content types currently in view.
              // This method is designed to take an id
              // parameter.  If this param is null, it
              // uses the id of the first category in the
              // updated list. That's what we want in the
              // case of deletions.
              _getContentList(null);
              vm.closeDialog();
            }

          });
        };


        /**
         * Add content type to Tagger.
         * @param title
         */
        vm.add = function (title) {

          const result = ContentTypeAdd.save({title: title});
          result.$promise.then(function (data) {
            if (data.status === 'success') {
              TaggerToast.toast('Content Type Added');
              // Update the category list. The
              // id parameter will be used to select
              // the newly added category for editing.
              _getContentList(data.id);
              // Does what you'd expect.
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
