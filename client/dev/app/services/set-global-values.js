/**
 * Created by mspalti on 1/14/17.
 */

(function () {
  'use strict';

  taggerServices.factory('SetGlobalValues',
    function (CategoryList,
     GroupListObservable,
     GroupObservable,
     TagList,
     TagListObservable,
     TagObservable,
     ContentTypeList,
     ContentTypeListObservable,
     ContentTypeObservable) {

      /**
       * Initializes global values not specific to the area.
       */
      function _initGlobals() {

        // Initialize global collection groups.
        const categories = CategoryList.query();
        categories.$promise.then(function (data) {
          if (data.length > 0) {
            GroupListObservable.set(data);
            GroupObservable.set(data[0].id);
          }
        });

        // Initialize global tags.
        const tags = TagList.query();
        tags.$promise.then(function (data) {
          if (data.length > 0) {
            TagListObservable.set(data);
            TagObservable.set(data[0].id);

          }
        });

        // Initialize global content types
        const types = ContentTypeList.query();
        types.$promise.then(function (data) {
          if (data.length > 0) {
            ContentTypeListObservable.set(data);
            ContentTypeObservable.set(data[0].id);
          }

        });
      }

      return {
        initializeGlobalValues: _initGlobals
      };

    });

})();
