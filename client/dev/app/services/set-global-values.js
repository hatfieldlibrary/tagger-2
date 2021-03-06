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
