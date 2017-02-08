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
     ImageDialog) {

      /**
       * The case expressions are hardcoded, so beware of bugs caused
       * by refactored controller names.  The console warning will hopefully
       * help with debugging.
       *
       * This was originally designed to switch on the constructor
       * for the controller that was passed into this module. Although less error
       * prone than passing in the controller name as a String, that approach
       * fails once the javascript has been minified because the contructor name is
       * minified and useless.
       */
      function _makeDialog (controller) {

        switch (controller) {
          case 'AreasController':
            return Object.assign({}, ShowDialog, AreaDialog);

          case 'CollectionController':
            return Object.assign({}, ShowDialog, CollectionDialog);

          case 'TagController':
            return Object.assign({}, ShowDialog, TagDialog);

          case 'TypeController':
            return Object.assign({}, ShowDialog, ContentTypeDialog);

          case 'GroupController':
            return Object.assign({}, ShowDialog, CollectionGroupDialog);

          case 'ImageController':
            return Object.assign({}, ShowDialog, ImageDialog);

          case 'ToggleController':
            return Object.assign({}, ShowDialog, TagDialog);

          case 'TagAreaController':
            return Object.assign({}, ShowDialog, TagDialog);

          default:
            console.log('WARNING: controller not found ' + controller);
            return null;

        }
      }

      return {
        makeDialog: _makeDialog
      };
    }
  );

})();
