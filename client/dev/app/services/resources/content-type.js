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
   *  Resource for getting summary information on content types for a specific area.
   */
  taggerServices.factory('ContentTypeCount', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/byArea/count/:areaId', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for getting content type by it's id.
   */
  taggerServices.factory('ContentType', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/byId/:id', {}, {
        query: {method: 'GET', isArray: false}
      });
    }
  ]);
  /**
   * Resource for getting list of all content types.
   */
  taggerServices.factory('ContentTypeList', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/show/list', {}, {
        query: {method: 'GET', isArray: true}
      });
    }
  ]);
  /**
   * Resource for adding a content type via POST.
   */
  taggerServices.factory('ContentTypeAdd', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/add');
    }
  ]);
  /**
   * Resource for deleting a content type via POST.
   */
  taggerServices.factory('ContentTypeDelete', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/delete/:id');
    }
  ]);
  /**
   * Resource for updating a content type via POST.
   */
  taggerServices.factory('ContentTypeUpdate', ['$resource', 'config',
    function ($resource, config) {
      return $resource(config.restHost + 't/content/update', null, {
        update: {method: 'PUT'}
      });
    }
  ]);

})();
