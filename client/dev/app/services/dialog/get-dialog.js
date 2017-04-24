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
 * Created by mspalti on 1/14/17.
 */

/**
 * Implements strategy for composing the dialog object.  The
 * ShowDialog directive is decorated with its controller based on
 * the constructor name of the parent component.
 */
(function () {

  'use strict';

  taggerServices.factory('DialogStrategy',
    function (ShowDialog,
              AreaDialog,
              CollectionDialog,
              ContentTypeDialog,
              CollectionGroupDialog,
              TagDialog,
              TagAreaDialog,
              ImageDialog,
              DialogTypes) {

      /**
       * Returns object composed of the dialog and matching controller. Throws
       * error if no match found.
       *
       * @param type  a string that should match one of the predefined DialogTypes.
       * @returns {*}
       * @private
       */
      function _makeDialog(type) {

        switch (type) {
          case DialogTypes.AREA:
            return Object.assign({}, ShowDialog, AreaDialog);

          case DialogTypes.COLLECTION:
            return Object.assign({}, ShowDialog, CollectionDialog);

          case DialogTypes.TAG:
            return Object.assign({}, ShowDialog, TagDialog);

          case DialogTypes.CONTENT_TYPE:
            return Object.assign({}, ShowDialog, ContentTypeDialog);

          case DialogTypes.GROUP:
            return Object.assign({}, ShowDialog, CollectionGroupDialog);

          case DialogTypes.IMAGE:
            return Object.assign({}, ShowDialog, ImageDialog);

          case DialogTypes.TOGGLE_TAG:
            return Object.assign({}, ShowDialog, TagAreaDialog);

          case DialogTypes.TAG_AREA_SELECT:
            return Object.assign({}, ShowDialog, TagAreaDialog);

          default:
            throw new Error('WARNING: dialog controller not found for ' + type);

        }
      }

      return {
        makeDialog: _makeDialog
      };
    }
  );

})();
