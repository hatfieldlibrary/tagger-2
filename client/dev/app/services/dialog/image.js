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

        vm.add = function() {
          throw new Error('Call to unimplemented function.');
        };

        vm.delete = function() {
          throw new Error('Call to unimplemented function.');
        };

      };

      return {
        controller: _controller
      };

    });

})();

