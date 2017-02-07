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
       * The constructor.name property is not consistently supported in
       * browsers, so capture the constructor name using a regex.
       * @param constructor the object's constructor property
       * @returns {string}
       * @private
       */
      function _getConstructorName(constructor) {
        let result = /^function\s+([\w\$]+)\s*\(/.exec(constructor);
        return result ? result[1] : '';

      }

      /**
       * The case expressions are hardcoded, so beware of bugs caused
       * by refactored controller names.  The console warning will hopefully
       * help with debugging.
       */
      function _makeDialog (controller) {

        const constructor = _getConstructorName(controller.constructor);

        switch (constructor) {
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
            console.log('WARNING: controller not found ' + constructor);
            return null;

        }
      }

      return {
        makeDialog: _makeDialog
      };
    }
  );

})();
