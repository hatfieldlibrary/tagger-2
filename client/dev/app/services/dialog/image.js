/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.factory('ImageDialog',

    function ($mdDialog,
              Upload,
              CollectionObservable,
              ThumbImageObservable) {

      const _controller = function () {

        const vm = this;

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          $mdDialog.hide();
        };

        /**
         * Upload image to Tagger's image processing service.
         * Uses ng-file-upload.
         * https://github.com/danialfarid/ng-file-upload/blob/master/README.md#full-reference
         * @param file the image file
         */
        vm.uploadImage = function (file) {

          if (file !== undefined) {
            /* jshint unused: false */
            let upload = Upload.upload({
              url: '/tagger/collection/image',
              file: file,
              fields: {id: CollectionObservable.get()}
            });
            upload.then(function (data) {
              ThumbImageObservable.set(data.config.file.name);
              vm.closeDialog();
            }).catch(function (data, status) {
              console.log('error status: ' + status);
            });
          }
        };
      };

      return {
        controller: _controller
      }

    });

})();

