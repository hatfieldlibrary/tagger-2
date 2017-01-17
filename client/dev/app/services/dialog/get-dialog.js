/**
 * Created by mspalti on 1/14/17.
 */

/**
 * Implements strategy for composing the dialog object
 * for a controller.
 */
(function () {

  'use strict';

  taggerServices.factory('GetDialog',
    (ShowDialog,
     AreaDialog,
     CollectionDialog,
     ContentTypeDialog,
     CollectionGroupDialog,
     TagDialog,
     ImageDialog) => {

      /**
       * The constructor.name property is not consistently supported in
       * browsers, so capture the constructor name using a regex.
       * @param constructor the object's constructor property
       * @returns {string}
       * @private
       */
      function _getConstructorName(constructor) {
        let result = /^function\s+([\w\$]+)\s*\(/.exec(constructor);
        return result ? result[1] : ''

      }

      /**
       * The case expressions are hardcoded, so beware of bugs caused
       * by refactored controller names.  The console warning will hopefully
       * help with debugging.
       */
      return (controller) => {

        const constructor = _getConstructorName(controller.constructor);

        switch (constructor) {
          case 'AreasController':
            return Object.assign({}, ShowDialog, AreaDialog);
            break;
          case 'CollectionController':
            return Object.assign({}, ShowDialog, CollectionDialog);
            break;
          case 'TagController':
            return Object.assign({}, ShowDialog, TagDialog);
            break;
          case 'TypeController':
            return Object.assign({}, ShowDialog, ContentTypeDialog);
            break;
          case 'GroupController':
            return Object.assign({}, ShowDialog, CollectionGroupDialog);
            break;
          case 'ImageController':
            return Object.assign({}, ShowDialog, ImageDialog);
            break;
          default:
            console.log('WARNING: controller not found ' + constructor);

        }
      }
    }
  );

})();
