/**
 * Created by mspalti on 1/14/17.
 */

(function () {
  'use strict';

  taggerServices.factory('SetGlobalValues',
    (CategoryList,
     CollectionObservable,
     GroupObservable,
     TagList,
     TagListObservable,
     TagObservable,
     ContentTypeList,
     ContentTypeListObserver,
     ContentTypeObserver) => {

      /**
       * Initializes global values not specific to the area.
       */
      function _initGlobals() {

          // Initialize global collection groups.
          const categories = CategoryList.query();
          categories.$promise.then(function (data) {
            CollectionObservable.set(data);
            GroupObservable.set(data[0].id);
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
              ContentTypeListObserver.set(data);
              ContentTypeObserver.set(data[0].id);
            }

          });
      }

      return {
        initializeGlobalValues: _initGlobals
      }

    })

})();
