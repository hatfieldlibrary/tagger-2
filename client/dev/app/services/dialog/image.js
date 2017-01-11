/**
 * Created by mspalti on 1/11/17.
 */

(function () {

  'use strict';

  taggerServices.service('ImageDialog',

    function (ShowDialog,
              Upload,
              CollectionObserver,
              ThumbImageObserver) {

      return function () {

        const vm = this;

        /**
         * Closes the dialog
         */
        vm.closeDialog = function () {
          ShowDialog.hideDialog();
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
              let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
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

    });

})();

