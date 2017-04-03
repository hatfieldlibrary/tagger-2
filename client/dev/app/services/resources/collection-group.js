/*
 * Copyright (c) 2016.
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

(function() {

  'use strict';

  /**
   * Resource for getting category (a.k.a collection group) by it's id.
   */
  taggerServices.factory('Category', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting categories for a collection.
   */
  taggerServices.factory('CategoryForCollection', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/getCollections/:collId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for getting list of all categories.
   */
  taggerServices.factory('CategoryList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting categories or a specific area.
   */
  taggerServices.factory('CategoryByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/byArea/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   *  Resource for getting summary information on categories for a specific area.
   */
  taggerServices.factory('CategoryCountByArea', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }]);
  /**
   * Resource for updating a category via POST.
   */
  taggerServices.factory('CategoryUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/update', null, {
        update: {method: 'PUT'}
      });
    }
  ]);
  /**
   * Resource for Adding a category via POST.
   */
  taggerServices.factory('CategoryAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/add');
    }
  ]);
  /**
   * Resource for deleting a category via POST.
   */
  taggerServices.factory('CategoryDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/category/delete/:id');
    }
  ]);

})();
